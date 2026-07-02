import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/data/site";

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
 * Pattern #69 seeded demo-mode contract preserved: blank RESEND_API_KEY → seeded success.
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

function simpleEmailHtml(p: {
  greetingName: string;
  phoneFormatted: string;
  addressLine: string;
}): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ea;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;"><tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <tr><td align="center" style="padding-bottom:20px;"><span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:3px;font-weight:bold;color:#CDAD69;">WINDOW FANTASIES</span></td></tr>
      <tr><td style="background:#ffffff;border:1px solid #e7e1d6;border-radius:14px;padding:36px;">
        <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#3a3a3a;">Hi ${p.greetingName},</p>
        <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#3a3a3a;">Thanks for reaching out. I will be in touch personally, usually within 24 hours, to set up your free in-home consultation.</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#3a3a3a;"><strong>Jim Garrity</strong><br>Window Fantasies<br>${p.phoneFormatted}</p>
      </td></tr>
      <tr><td align="center" style="padding:20px 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#9a9286;">${p.addressLine}</td></tr>
    </table>
  </td></tr></table>
</body></html>`;
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
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
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

  // 7. Demo mode — Pattern #69 preserved
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.info(
        "[CONTACT DEMO] Form submitted, RESEND_API_KEY blank, returning seeded success."
      );
    }
    return Response.json({
      success: true,
      demo: true,
      confirmation: `DEMO-${Date.now()}`,
    });
  }

  const resend = new Resend(apiKey);
  const ownerEmail = siteConfig.business.ownerEmail;
  const fromAddress = `Window Fantasies <noreply@${process.env.RESEND_DOMAIN ?? "windowfantasies.com"}>`;
  const phoneFormatted = siteConfig.business.phoneFormatted;
  const addressLine = `Window Fantasies · ${siteConfig.business.address.street}, ${siteConfig.business.address.city}, ${siteConfig.business.address.state} ${siteConfig.business.address.zip}`;
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // 8. Owner (Jim) lead notification — LOAD-BEARING. Plain text: the lead's info.
  //    IMPORTANT: resend.emails.send() returns { data, error } and does NOT throw on
  //    API errors, so we inspect `error` explicitly.
  const ownerText = [
    `New lead from ${source}`,
    ``,
    `Name: ${name}`,
    intent ? `Intent: ${intent === "service" ? "Service and Repair" : "Purchase Window Treatment"}` : null,
    phone ? `Phone: ${phone}` : null,
    email ? `Email: ${email}` : null,
    town ? `Town: ${town}` : null,
    company && !intent ? `Company: ${company}` : null,
    typedMessage ? `\nMessage:` : null,
    typedMessage || null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const ownerSend = await resend.emails.send({
    from: fromAddress,
    to: ownerEmail,
    ...(email ? { replyTo: email } : {}), // Pattern #44 — owner reply lands with the lead
    subject: `[${source}] ${name}${town ? " · " + town : ""}`,
    text: ownerText,
  });
  if (ownerSend.error) {
    // eslint-disable-next-line no-console
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

  const userSubject = "Thanks, Jim will be in touch within 24 hours.";
  const userHtml = simpleEmailHtml({ greetingName, phoneFormatted, addressLine });
  const userText = [
    `Hi ${greetingName},`,
    ``,
    `Thanks for reaching out. I will be in touch personally, usually within 24 hours, to set up your free in-home consultation.`,
    ``,
    `Jim Garrity, Window Fantasies, ${phoneFormatted}`,
  ].join("\n");

  // Only send the courtesy auto-reply when the lead gave an email address.
  if (email) {
    try {
      const userSend = await resend.emails.send({
        from: fromAddress,
        to: email,
        replyTo: ownerEmail, // Pattern #44 — lead reply lands with the owner
        subject: userSubject,
        html: userHtml,
        text: userText,
      });
      if (userSend.error) {
        // eslint-disable-next-line no-console
        console.warn("[CONTACT] Auto-reply failed:", userSend.error);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[CONTACT] Auto-reply threw:", err);
    }
  }

  return Response.json({ success: true, confirmation: `LEAD-${Date.now()}` });
}
