/**
 * verify-email — the ONE command that proves the lead path is live.
 *
 *   npm run verify:email -- --to you@example.com
 *   npm run verify:email -- --to you@example.com --url https://www.windowfantasies.com
 *   npm run verify:email -- --add-domain          (registers the domain, prints DNS records)
 *
 * WHY THIS EXISTS
 * Setting RESEND_API_KEY does NOT mean email works. Resend authorizes on two
 * independent axes: the API key proves WHO IS CALLING, a verified domain proves WHAT
 * MAY GO IN THE From: HEADER. A fresh account has the first and not the second, so every
 * send 403s while the key, the build, and the dashboard all look healthy
 * (knowledge/errors/resend-key-set-but-sending-domain-unverified.md, Error #207).
 *
 * This script checks both axes, then proves the path with a real send of the REAL
 * templates — it imports src/lib/email.ts rather than re-creating the markup, so what
 * gets tested is what ships. A copy would prove nothing.
 *
 * Run it the moment DNS is configured. Nothing else needs to happen first.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// ── env ──────────────────────────────────────────────────────────────────────
// Standalone node does not load .env.local the way Next does, so parse it here.
// Values already in the real environment (e.g. Vercel) win, so this same script
// works locally and in CI without changing behaviour.
function loadEnvLocal(): void {
  const path = resolve(ROOT, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line.trim());
    if (!m) continue;
    const [, key, rawVal] = m;
    if (process.env[key]) continue;
    process.env[key] = rawVal.replace(/^["']|["']$/g, "").trim();
  }
}
loadEnvLocal();

// Imported dynamically AFTER loadEnvLocal() so the modules see a populated process.env.
// Uses the project's own @/ alias (tsx honours tsconfig paths), which keeps this script
// typechecked against the real templates rather than a drifting copy.
const { renderEmail, fromAddress } = await import("@/lib/email");
const { siteConfig } = await import("@/data/site");

// ── args ─────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const arg = (name: string): string | undefined => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const has = (name: string) => argv.includes(`--${name}`);

const TO = arg("to");
const URL_BASE = arg("url")?.replace(/\/$/, "");
const ADD_DOMAIN = has("add-domain");

// ── output helpers ───────────────────────────────────────────────────────────
const failures: string[] = [];
const warnings: string[] = [];
const pass = (m: string) => console.log(`  ✅ ${m}`);
const fail = (m: string) => { console.log(`  ❌ ${m}`); failures.push(m); };
const warn = (m: string) => { console.log(`  ⚠️  ${m}`); warnings.push(m); };
const head = (m: string) => console.log(`\n${m}\n${"─".repeat(m.length)}`);

const KEY = process.env.RESEND_API_KEY;
const api = async (path: string, init?: RequestInit) => {
  const res = await fetch(`https://api.resend.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  let body: unknown = null;
  try { body = await res.json(); } catch { /* empty body is fine */ }
  return { status: res.status, body: body as Record<string, unknown> };
};

console.log("\n╔══════════════════════════════════════════════════════╗");
console.log("║  Window Fantasies — email delivery verification      ║");
console.log("╚══════════════════════════════════════════════════════╝");

// ── 1. credentials ───────────────────────────────────────────────────────────
head("1. Credentials");
if (!KEY) {
  fail("RESEND_API_KEY is not set. Add it to .env.local (and to Vercel Production).");
} else if (!KEY.startsWith("re_")) {
  fail("RESEND_API_KEY does not start with 're_' — that is not a Resend key.");
} else {
  pass(`RESEND_API_KEY present (${KEY.slice(0, 6)}…, ${KEY.length} chars)`);
}
if (process.env.RESEND_FROM) {
  warn(`RESEND_FROM override is ACTIVE → ${process.env.RESEND_FROM}`);
  warn("That is the stopgap sender. Delete it once the real domain is verified.");
}
console.log(`  ℹ️  From address in use: ${fromAddress()}`);
console.log(`  ℹ️  Jim's lead inbox:    ${siteConfig.business.ownerEmail}`);

if (!KEY) { summary(); process.exit(1); }

// ── 2. key validity + domain verification ────────────────────────────────────
head("2. Sending domain");
const sendingDomain = (process.env.RESEND_FROM ?? fromAddress()).split("@").pop()?.replace(/>$/, "").trim() ?? "";
const domains = await api("/domains");

if (domains.status === 401 || domains.status === 403) {
  fail(`Resend rejected the key (HTTP ${domains.status}). Generate a new one.`);
} else {
  pass("API key authenticates");
  const rows = (domains.body?.data as Array<Record<string, string>>) ?? [];
  const onSharedSender = sendingDomain === "resend.dev";
  if (!rows.length) {
    if (onSharedSender) {
      // Sending through resend.dev works with no registered domain — that is the whole
      // point of the stopgap. So this is a "not shipped yet" warning, not a send failure.
      warn("ZERO client domains registered — you are sending on Resend's shared sender.");
      console.log("     Mail WILL deliver, but the From line reads resend.dev, not the brand.");
      console.log("     Ship state: register windowfantasies.com (--add-domain), verify it in");
      console.log("     DNS, then delete RESEND_FROM so the branded address takes over.");
    } else {
      fail("ZERO domains registered on this Resend account.");
      console.log(`     Every send from @${sendingDomain} will 403 until one is verified.`);
      console.log("     Fix: resend.com → Domains → Add, then put the DKIM/SPF records in DNS.");
      console.log("     Or re-run this script with --add-domain to register it and print the records.");
    }
  } else {
    for (const d of rows) {
      const ok = d.status === "verified";
      const line = `${d.name} → ${d.status}`;
      if (ok) pass(line); else fail(`${line} (must be "verified" before it can send)`);
    }
    if (!onSharedSender && !rows.some((d) => d.status === "verified" && sendingDomain.endsWith(d.name))) {
      fail(`No VERIFIED domain matches the From address (@${sendingDomain}).`);
    }
  }
}

// ── 2b. optional: register the domain and print the DNS records ──────────────
if (ADD_DOMAIN) {
  head("2b. Registering domain (writes to your Resend account)");
  const target = process.env.RESEND_DOMAIN ?? "windowfantasies.com";
  const created = await api("/domains", { method: "POST", body: JSON.stringify({ name: target }) });
  if (created.status >= 400) {
    fail(`Could not add ${target}: ${JSON.stringify(created.body)}`);
  } else {
    pass(`Registered ${target}. Add these records at 007names, then re-run this script:`);
    const records = (created.body?.records as Array<Record<string, string>>) ?? [];
    for (const r of records) {
      console.log(`\n     TYPE:  ${r.type}\n     NAME:  ${r.name}\n     VALUE: ${r.value}${r.priority ? `\n     PRIO:  ${r.priority}` : ""}`);
    }
    console.log("\n     ⚠️  These are DKIM/SPF records on a SUBDOMAIN. They do NOT touch Jim's");
    console.log("         root MX, so his existing email keeps working. Never enable Resend's");
    console.log("         inbound/Receiving toggle — that puts an MX on the ROOT and would");
    console.log("         hijack his mail.");
  }
}

// ── 3. live send of the real templates ───────────────────────────────────────
head("3. Live send");
// An explicit RESEND_FROM means the operator has deliberately chosen a sender (the
// stopgap shared-domain path), so an unverified CLIENT domain must not block the send —
// otherwise the stopgap it exists to enable can never be exercised.
const senderOverridden = Boolean(process.env.RESEND_FROM);
const blockedFromSending = failures.some(
  (f) => !senderOverridden || f.includes("key") || f.includes("rejected")
);

if (!TO) {
  warn("No --to address given, so no email was sent.");
  console.log("     Re-run with:  npm run verify:email -- --to you@example.com");
} else if (blockedFromSending) {
  warn(`Skipped — fix the failures above first, then re-run with --to ${TO}.`);
} else {
  // The exact two emails a real consultation lead produces.
  const lead = renderEmail({
    preheader: "VERIFICATION · sample lead",
    eyebrow: "New website lead",
    title: "Test Lead · Windham",
    intro: ["This is the email Jim receives when someone requests a consultation."],
    rows: [
      { label: "Name", value: "Test Lead" },
      { label: "Phone", value: siteConfig.business.phoneFormatted },
      { label: "Email", value: TO },
      { label: "Town", value: "Windham" },
      { label: "Looking for", value: "Purchase Window Treatment" },
      { label: "Came from", value: "Consultation request" },
    ],
    quote: { label: "What they told you", body: "Verification send from npm run verify:email." },
    cta: { label: "Call Test", href: `tel:${siteConfig.business.phone}` },
  });

  const confirm = renderEmail({
    preheader: "VERIFICATION · sample confirmation",
    eyebrow: "Request received",
    title: "Thanks, Test. Jim has your request.",
    intro: [
      "This is the confirmation the customer receives.",
      "He will call you personally, usually within 24 hours, to set up your free in-home consultation.",
    ],
    outro: [`Prefer to talk sooner? Call Jim directly at ${siteConfig.business.phoneFormatted}.`],
    cta: { label: "Browse the collections", href: "https://windowfantasies.com/products" },
    signature: true,
  });

  const sends = [
    { label: "lead alert (what Jim gets)", subject: "[VERIFY] Lead alert sample", body: lead },
    { label: "confirmation (what the customer gets)", subject: "[VERIFY] Customer confirmation sample", body: confirm },
  ];

  for (const [i, s] of sends.entries()) {
    // Space the sends: Resend allows ~2 req/sec and silently 429s the second one
    // (Error #87). The SDK returns {error} rather than throwing, so it is easy to miss.
    if (i > 0) await new Promise((r) => setTimeout(r, 900));
    const res = await api("/emails", {
      method: "POST",
      body: JSON.stringify({
        from: fromAddress(),
        to: TO,
        subject: s.subject,
        html: s.body.html,
        text: s.body.text,
      }),
    });
    if (res.status >= 400) {
      fail(`${s.label} — ${res.body?.message ?? JSON.stringify(res.body)}`);
    } else {
      pass(`${s.label} sent · id ${String(res.body?.id ?? "?").slice(0, 8)}…`);
    }
  }
  console.log(`\n  👉 Open ${TO} ON A PHONE. Both must render as branded HTML with the gold`);
  console.log("     wordmark and a working button. Plain text = the template did not apply.");
}

// ── 4. optional: prove the deployed routes, not just the API ─────────────────
if (URL_BASE) {
  head("4. Deployed routes");
  const routes = [
    {
      path: "/api/contact",
      label: "consultation form",
      body: { name: "Verify Bot", email: TO ?? "delivered@resend.dev", phone: "6035550134", town: "Windham", intent: "purchase", message: "Automated verification.", source: "/request-a-consultation" },
    },
    {
      path: "/api/review",
      label: "review survey (5-star)",
      body: { rating: 5, branch: "public", name: "Verify Bot", town: "Windham", message: "Automated verification." },
    },
  ];
  for (const r of routes) {
    const res = await fetch(`${URL_BASE}${r.path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: URL_BASE },
      body: JSON.stringify(r.body),
    });
    if (res.status === 200) pass(`${r.label} → 200`);
    else if (res.status === 502) fail(`${r.label} → 502 (route reached, SEND failed — check the domain above)`);
    else if (res.status === 403) fail(`${r.label} → 403 (origin rejected — is ${URL_BASE} in ALLOWED_ORIGINS?)`);
    else fail(`${r.label} → ${res.status}`);
  }
  console.log("\n  ℹ️  A 200 here means a REAL lead just landed in Jim's inbox. Tell him.");
}

summary();

function summary(): void {
  head("Result");
  if (failures.length) {
    console.log(`  ❌ ${failures.length} blocking issue(s):\n`);
    failures.forEach((f) => console.log(`     · ${f}`));
    console.log("\n  The lead path is NOT live. Nothing reaches Jim until these clear.");
  } else {
    console.log("  ✅ Email delivery is live.");
    if (!TO) console.log("     Re-run with --to <inbox> to prove rendering in a real client.");
  }
  if (warnings.length) {
    console.log(`\n  ⚠️  ${warnings.length} warning(s):`);
    warnings.forEach((w) => console.log(`     · ${w}`));
  }
  console.log("");
  process.exitCode = failures.length ? 1 : 0;
}
