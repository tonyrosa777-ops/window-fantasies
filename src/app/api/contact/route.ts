import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/data/site";
import { renderEmail, fromAddress } from "@/lib/email";

/**
 * POST /api/contact
 *
 * Hardened per Stage 1J /optimus-review BUG-1/2/3/4/7:
 *   - Zod schema validates body shape, email format, field lengths, source enum
 *   - Control-char sanitizer strips CRLF / tab / null before any string interpolation
 *   - Origin allowlist rejects cross-site POSTs (referer fallback)
 *   - In-memory per-IP rate limit (5 / 10 min) — best-effort within warm serverless instance
 *   - Honeypot field silently accepts bot submissions
 *   - Auto-reply name is alphanumeric-stripped to defang phishing payloads
 *   - Owner notification (load-bearing) and auto-reply (courtesy) use independent try/catch
 *     so auto-reply failure no longer masks a successful owner notification
 *
 * EVERY submission sends TWO branded HTML emails (2026-07-20): the lead alert to Jim and
 * a confirmation to the submitter. Both carry html + text. Templates: src/lib/email.ts.
 * Treat "Jim notified" and "submitter confirmed" as two separate acceptance criteria —
 * verifying only the first is Error #113.
 *
 * Demo mode requires an EXPLICIT opt-in (NEXT_PUBLIC_DEMO_MODE=1). A missing
 * RESEND_API_KEY is a loud 502, never a seeded success — see the note at the guard and
 * Error #205, where demo-on-missing-secret silently discarded every lead on a live site.
 * Lazy env read inside handler (NOT module top) per Pattern #69 + Error #58.
 */

const Body = z
  .object({
    name: z.string().min(1).max(120),
    // Email is optional for consultation leads (a phone number is enough for Jim
    // to call). The contact form still asks for one, but the API does not require it.
    email: z.string().email().max(254).optional().or(z.literal("")),
    phone: z.string().max(40).optional(),
    // "company" carries the consultation intent label (Purchase vs Service and Repair)
    // or the town on the consultation form.
    company: z.string().max(160).optional(),
    town: z.string().max(120).optional(),
    intent: z.enum(["purchase", "service"]).optional(),
    message: z.string().max(5000).optional(),
    source: z
      .enum(["/contact", "/request-a-consultation"])
      .optional(),
    quizResult: z.string().max(80).optional(),
    quizAnswers: z.record(z.string().max(60), z.string().max(120)).optional(),
  })
  // A submission must carry SOMETHING actionable: a way to reach the person.
  .refine((d) => (d.phone?.trim().length ?? 0) > 0 || (d.email?.trim().length ?? 0) > 0, {
    message: "A phone number or email is required so Jim can reach you.",
  });
type ContactBody = z.infer<typeof Body>;

const ALLOWED_ORIGINS = new Set<string>([
  "https://windowfantasies.com",
  "https://www.windowfantasies.com",
  "http://localhost:3000",
  "http://localhost:3001",
]);

// Strip control chars from any user-supplied string before interpolating into email
function stripControlChars(s: string): string {
  return s.replace(/[\r\n\t\0]/g, " ").trim();
}

// Strip name to safe charset (alphanumeric + space + apostrophe + hyphen + period).
// Defangs phishing payloads in the auto-reply greeting while preserving legitimate
// names like "Mary O'Brien-Smith" or "J. Edgar Hoover".
function safeName(s: string): string {
  return stripControlChars(s)
    .replace(/[^a-zA-Z0-9 '\-\.]/g, "")
    .slice(0, 120);
}

/**
 * Absolute base URL for links inside emails. An email has no page context, so every
 * href must be absolute — a relative "/products" link is dead in an inbox.
 */
function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "https://windowfantasies.com";
}

// In-memory rate limiter: 5 submissions per IP per 10 min.
// Trade-off: doesn't survive serverless cold starts, but mitigates active-session abuse.
// Production hardening (Phase 2): replace with Upstash Ratelimit + KV when keys are wired.
type RateRecord = { timestamps: number[] };
const rateStore = new Map<string, RateRecord>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = rateStore.get(ip) ?? { timestamps: [] };
  rec.timestamps = rec.timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  if (rec.timestamps.length >= RATE_MAX) return false;
  rec.timestamps.push(now);
  rateStore.set(ip, rec);
  // Opportunistic cleanup: when map grows, sweep stale records
  if (rateStore.size > 100 && Math.random() < 0.01) {
    for (const [k, v] of rateStore.entries()) {
      if (v.timestamps.every((t) => now - t >= RATE_WINDOW_MS)) {
        rateStore.delete(k);
      }
    }
  }
  return true;
}

function getClientIp(request: Request): string {
  // Trust the platform-appended IP, not the leftmost client-spoofable x-forwarded-for
  // hop. On Vercel the real client IP is x-real-ip (or the RIGHTMOST xff entry), so a
  // scripted client cannot mint a fresh rate-limit bucket per request. (BUG-5)
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",").pop()!.trim();
  return "unknown";
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin") ?? request.headers.get("referer") ?? "";
  // Reject empty Origin/Referer — modern browsers (Chrome/Safari/Firefox) all set
  // Origin on fetch POST, so the empty-header population is non-browser clients
  // (curl, scripts, headless), which is the primary abuse class for a public form.
  // Stage 1J run-2 BUG-2 fix — previously waved empty Origin through.
  if (!origin) return false;
  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    return false;
  }
  // Same-origin POST is always allowed: the form fetches its own /api/contact, so a
  // legitimate request's Origin host always equals the deployment's own Host header.
  // This is the standard CSRF defense and it covers EVERY host the app is served from
  // without hardcoding each one: the *.vercel.app preview/prod aliases, windowfantasies.com
  // once DNS cuts over, and localhost.
  const host = request.headers.get("host");
  if (host && originUrl.host === host) return true;
  // Belt-and-suspenders: the explicit production allowlist (apex <-> www, proxied hosts).
  return ALLOWED_ORIGINS.has(originUrl.origin);
}

export async function POST(request: Request) {
  // 1. Origin allowlist
  if (!isAllowedOrigin(request)) {
    return Response.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  // 2. Content-Type guard — request.json() throws on non-JSON, but explicit check is cheaper
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return Response.json({ success: false, error: "Invalid content type" }, { status: 415 });
  }

  // 3. Rate limit
  const ip = getClientIp(request);
  if (!rateLimit(ip)) {
    return Response.json({ success: false, error: "Too many requests" }, { status: 429 });
  }

  // 4. Parse + validate body via Zod
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  // 5. Honeypot — checked BEFORE Zod so bot submissions with extra fields don't 400
  if (
    raw &&
    typeof raw === "object" &&
    "website" in raw &&
    typeof (raw as Record<string, unknown>).website === "string" &&
    ((raw as Record<string, string>).website ?? "").length > 0
  ) {
    // Silently accept — bot does not learn the honeypot tripped
    return Response.json({ success: true, confirmation: `OK-${Date.now()}` });
  }

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ success: false, error: "Invalid form data" }, { status: 400 });
  }
  const validated: ContactBody = parsed.data;

  // 6. Sanitize every interpolated field — strips control chars Zod allows through
  const name = stripControlChars(validated.name);
  const email = validated.email ? stripControlChars(validated.email) : "";
  const phone = validated.phone ? stripControlChars(validated.phone) : "";
  const town = validated.town ? stripControlChars(validated.town) : "";
  const intent = validated.intent;
  const company = validated.company ? stripControlChars(validated.company) : "";
  const source = validated.source ?? "/contact";

  // Free-text message from the lead.
  const typedMessage = validated.message ? stripControlChars(validated.message) : "";

  // 7. Demo mode — Pattern #69, re-keyed per Error #205 (Anjo Services, Jul 2026).
  //
  //    The old guard was `if (!apiKey) return success` — demo behaviour keyed on the
  //    ABSENCE OF A PRODUCTION SECRET. That is exactly backwards: the one condition
  //    meaning "this deployment is misconfigured" got interpreted as "this deployment
  //    is a demo," so a live site with an unset Vercel env var returned {ok:true} to
  //    the visitor and discarded every lead with no failure signal on either end.
  //
  //    Now: demo mode requires an EXPLICIT opt-in flag, and a missing key in production
  //    is a loud 502. A misconfigured deployment fails visibly instead of silently
  //    eating leads.
  const apiKey = process.env.RESEND_API_KEY;
  const demoOptIn = process.env.NEXT_PUBLIC_DEMO_MODE === "1";

  if (!apiKey) {
    if (demoOptIn && process.env.NODE_ENV !== "production") {
       
      console.info(
        "[CONTACT DEMO] NEXT_PUBLIC_DEMO_MODE=1 and RESEND_API_KEY blank — returning seeded success."
      );
      return Response.json({
        success: true,
        demo: true,
        confirmation: `DEMO-${Date.now()}`,
      });
    }
     
    console.error(
      "[CONTACT] RESEND_API_KEY is not set. Lead NOT delivered — failing loudly rather than dropping it silently."
    );
    return Response.json(
      { success: false, error: "Email delivery is not configured. Please call directly." },
      { status: 502 }
    );
  }

  const resend = new Resend(apiKey);
  const ownerEmail = siteConfig.business.ownerEmail;
  const from = fromAddress();
  const phoneFormatted = siteConfig.business.phoneFormatted;
  // The address footer now lives in the shared email shell (src/lib/email.ts), which
  // reads it from siteConfig directly — no local addressLine needed here anymore.
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // 8. Owner (Jim) lead notification — LOAD-BEARING, branded HTML + text fallback.
  //    IMPORTANT: resend.emails.send() returns { data, error } and does NOT throw on
  //    API errors, so we inspect `error` explicitly (Error #87).
  const intentLabel = intent
    ? intent === "service"
      ? "Service and Repair"
      : "Purchase Window Treatment"
    : "";
  const sourceLabel =
    source === "/request-a-consultation" ? "Consultation request" : "Contact form";

  // Every row is a fact Jim acts on. Phone first: he calls, he does not email back.
  const ownerRows = [
    { label: "Name", value: name },
    ...(phone ? [{ label: "Phone", value: phone }] : []),
    ...(email ? [{ label: "Email", value: email }] : []),
    ...(town ? [{ label: "Town", value: town }] : []),
    ...(intentLabel ? [{ label: "Looking for", value: intentLabel }] : []),
    ...(company && !intent ? [{ label: "Company", value: company }] : []),
    ...(validated.quizResult ? [{ label: "Quiz result", value: stripControlChars(validated.quizResult) }] : []),
    { label: "Came from", value: sourceLabel },
  ];

  const ownerEmailContent = renderEmail({
    preheader: `${name}${town ? " in " + town : ""}${phone ? " · " + phone : ""}`,
    eyebrow: "New website lead",
    title: `${name}${town ? " · " + town : ""}`,
    intro: [
      phone
        ? `${name} asked you to get in touch. Their number is below, so you can call straight from this email.`
        : `${name} asked you to get in touch. They left an email address rather than a phone number.`,
    ],
    rows: ownerRows,
    ...(typedMessage ? { quote: { label: "What they told you", body: typedMessage } } : {}),
    ...(phone ? { cta: { label: `Call ${name.split(" ")[0] || name}`, href: `tel:${phone.replace(/[^0-9+]/g, "")}` } } : {}),
  });

  const ownerSend = await resend.emails.send({
    from,
    to: ownerEmail,
    ...(email ? { replyTo: email } : {}), // Pattern #44 — owner reply lands with the lead
    subject: `[New lead] ${name}${town ? " · " + town : ""}${intentLabel ? " · " + intentLabel : ""}`,
    html: ownerEmailContent.html,
    text: ownerEmailContent.text,
  });
  if (ownerSend.error) {
     
    console.error("[CONTACT] Owner notification failed:", ownerSend.error);
    return Response.json(
      { success: false, error: "Email delivery failed. Please call directly." },
      { status: 502 }
    );
  }

  // 9. User results email — best-effort (the lead already landed above, so failure here
  //    does NOT fail the request). Spaced from the owner send to stay under Resend's
  //    2 requests/second rate limit: the two back-to-back sends were tripping a 429 on
  //    the second one, which the SDK returns as { error } (not a throw) and the old code
  //    ignored — that is why Steve got his email and the user never did.
  await sleep(900);
  const greetingName = safeName(name) || "there";
  const base = siteUrl();

  // Copy is intent-aware: a repair lead and a new-treatment lead are in different
  // situations, and a generic "thanks for reaching out" serves neither well.
  const isService = intent === "service";
  const confirmation = renderEmail({
    preheader: isService
      ? "Jim has your repair request and will call you personally."
      : "Jim has your request and will call to set up your free in-home consultation.",
    eyebrow: "Request received",
    title: `Thanks, ${greetingName}. Jim has your request.`,
    intro: isService
      ? [
          "Your repair request came through and it goes straight to Jim, not to a call center.",
          "He will call you personally, usually within 24 hours, to hear what the treatment is doing and tell you honestly whether it is a warranty fix or a service call. He repairs treatments bought anywhere, including ones another company installed.",
        ]
      : [
          "Your request came through and it goes straight to Jim, not to a call center.",
          "He will call you personally, usually within 24 hours, to set up your free in-home consultation. He brings the real Hunter Douglas samples to your home, holds them in your own windows, measures every opening himself, and gives you an honest installed price at your kitchen table.",
        ],
    ...(typedMessage ? { quote: { label: "What you told Jim", body: typedMessage } } : {}),
    outro: [
      `Prefer to talk sooner? Call Jim directly at ${phoneFormatted}. He answers his own phone.`,
    ],
    cta: isService
      ? { label: "See repair services", href: `${base}/services/installs-and-repairs` }
      : { label: "Browse the collections", href: `${base}/products` },
    signature: true,
  });

  // Only send the confirmation when the lead gave an email address. The consultation
  // form deliberately accepts a phone number alone, so a phone-only lead has no inbox
  // to confirm to — that is by design, not a gap. Jim's alert still fires either way.
  if (email) {
    try {
      const userSend = await resend.emails.send({
        from,
        to: email,
        replyTo: ownerEmail, // Pattern #44 — lead reply lands with the owner
        subject: isService
          ? "Jim has your repair request, Window Fantasies"
          : "Jim has your consultation request, Window Fantasies",
        html: confirmation.html,
        text: confirmation.text,
      });
      if (userSend.error) {
         
        console.warn("[CONTACT] Confirmation to submitter failed:", userSend.error);
      }
    } catch (err) {
       
      console.warn("[CONTACT] Confirmation to submitter threw:", err);
    }
  }

  return Response.json({ success: true, confirmation: `LEAD-${Date.now()}` });
}
