import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/data/site";
import { renderEmail, fromAddress } from "@/lib/email";

/**
 * POST /api/review
 *
 * Backs the star survey on /testimonials (components/sections/ReviewSurvey.tsx).
 * Both branches land in Jim's inbox and nowhere else:
 *   1-3 stars -> private note, flagged urgent so Jim sees it and can make it right
 *   4-5 stars -> the review text, which Jim may promote into site.ts by hand
 *
 * Nothing submitted here is persisted or published automatically. There is no
 * store and no read path, so the widget can never feed a rating-filtered average
 * back onto the page. See the ReviewSurvey interface note in site.ts.
 *
 * Hardening mirrors /api/contact (Stage 1J BUG-1..7): Zod body schema, control-char
 * sanitizer before interpolation, origin allowlist with same-origin check, in-memory
 * per-IP rate limit, honeypot checked before Zod, name defanged for the greeting.
 *
 * Both emails are branded HTML + text (2026-07-20, templates in src/lib/email.ts): the
 * owner alert to Jim AND a confirmation back to the person who filled the survey. That
 * second send did not exist before — the route alerted Jim and sent the submitter
 * nothing, which is Error #113. It fires only when `contact` looks like an email
 * address, since the survey also accepts a phone number.
 *
 * Demo mode requires an EXPLICIT opt-in (NEXT_PUBLIC_DEMO_MODE=1); a missing
 * RESEND_API_KEY is a loud 502, never a seeded success (Error #205). Lazy env read
 * inside the handler (NOT module top) per Pattern #69 + Error #58.
 */

const Body = z
  .object({
    rating: z.number().int().min(1).max(5),
    branch: z.enum(["private", "public"]),
    name: z.string().min(1).max(120),
    /** Private branch only: how Jim reaches them back. */
    contact: z.string().max(254).optional(),
    /** Public branch only. */
    town: z.string().max(120).optional(),
    message: z.string().max(5000).optional(),
  })
  // The private branch is a complaint, so it must carry a way to reach the person
  // AND say what happened, otherwise Jim cannot act on it.
  .refine(
    (d) =>
      d.branch !== "private" ||
      ((d.contact?.trim().length ?? 0) > 0 && (d.message?.trim().length ?? 0) > 0),
    { message: "A contact and a description are required so Jim can put it right." }
  )
  // Guard the branch against a spoofed client: the rating must match the branch it
  // claims, so a scripted POST cannot file a 1-star as a public review or vice versa.
  .refine((d) => (d.rating <= 3 ? d.branch === "private" : d.branch === "public"), {
    message: "Rating does not match branch.",
  });
type ReviewBody = z.infer<typeof Body>;

const ALLOWED_ORIGINS = new Set<string>([
  "https://windowfantasies.com",
  "https://www.windowfantasies.com",
  "http://localhost:3000",
  "http://localhost:3001",
]);

function stripControlChars(s: string): string {
  return s.replace(/[\r\n\t\0]/g, " ").trim();
}

/** Preserve the author's line breaks in the body, drop the injection vectors. */
function stripControlCharsMultiline(s: string): string {
  return s.replace(/\r/g, "").replace(/[\t\0]/g, " ").trim();
}

/**
 * Strip a name to a safe charset for the confirmation greeting, mirroring /api/contact.
 * Defangs a phishing payload submitted as a "name" while preserving real names like
 * "Mary O'Brien-Smith". The email templates escape HTML on top of this.
 */
function safeName(s: string): string {
  return stripControlChars(s)
    .replace(/[^a-zA-Z0-9 '\-\.]/g, "")
    .slice(0, 120);
}

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
  if (rateStore.size > 100 && Math.random() < 0.01) {
    for (const [k, v] of rateStore.entries()) {
      if (v.timestamps.every((t) => now - t >= RATE_WINDOW_MS)) rateStore.delete(k);
    }
  }
  return true;
}

function getClientIp(request: Request): string {
  // Trust the platform-appended IP, not the leftmost client-spoofable xff hop.
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",").pop()!.trim();
  return "unknown";
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin") ?? request.headers.get("referer") ?? "";
  if (!origin) return false;
  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    return false;
  }
  const host = request.headers.get("host");
  if (host && originUrl.host === host) return true;
  return ALLOWED_ORIGINS.has(originUrl.origin);
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return Response.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return Response.json({ success: false, error: "Invalid content type" }, { status: 415 });
  }

  const ip = getClientIp(request);
  if (!rateLimit(ip)) {
    return Response.json({ success: false, error: "Too many requests" }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot before Zod so bot submissions with extra fields do not 400.
  if (
    raw &&
    typeof raw === "object" &&
    "website" in raw &&
    typeof (raw as Record<string, unknown>).website === "string" &&
    ((raw as Record<string, string>).website ?? "").length > 0
  ) {
    return Response.json({ success: true, confirmation: `OK-${Date.now()}` });
  }

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ success: false, error: "Invalid form data" }, { status: 400 });
  }
  const validated: ReviewBody = parsed.data;

  const rating = validated.rating;
  const branch = validated.branch;
  const name = stripControlChars(validated.name);
  const contact = validated.contact ? stripControlChars(validated.contact) : "";
  const town = validated.town ? stripControlChars(validated.town) : "";
  const message = validated.message ? stripControlCharsMultiline(validated.message) : "";
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  // Demo mode re-keyed per Error #205 — see the long note in /api/contact. Demo requires
  // an explicit opt-in; a missing key in production is a loud 502, never a silent success
  // that tells the customer "got it" while the feedback evaporates.
  const apiKey = process.env.RESEND_API_KEY;
  const demoOptIn = process.env.NEXT_PUBLIC_DEMO_MODE === "1";

  if (!apiKey) {
    if (demoOptIn && process.env.NODE_ENV !== "production") {
      console.info(
        `[REVIEW DEMO] ${rating}-star ${branch} submission from ${name}, NEXT_PUBLIC_DEMO_MODE=1 — returning seeded success.`
      );
      return Response.json({ success: true, demo: true, confirmation: `DEMO-${Date.now()}` });
    }
    console.error(
      "[REVIEW] RESEND_API_KEY is not set. Feedback NOT delivered — failing loudly rather than dropping it silently."
    );
    return Response.json(
      { success: false, error: "Email delivery is not configured. Please call directly." },
      { status: 502 }
    );
  }

  const resend = new Resend(apiKey);
  const from = fromAddress();
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // A low rating is a service recovery window, so the subject says so plainly.
  // A high one is a review Jim may want to publish.
  const subject =
    branch === "private"
      ? `[Action needed] ${rating}-star feedback from ${name}`
      : `[${rating}-star review] ${name}${town ? " · " + town : ""}`;

  const isPrivate = branch === "private";

  // Owner email — branded HTML + text fallback, same as every other send on this site.
  const ownerEmailContent = renderEmail({
    preheader: isPrivate
      ? `${rating} of 5 from ${name}. They want to be heard privately.`
      : `${rating} stars from ${name}${town ? " in " + town : ""}.`,
    eyebrow: isPrivate ? "Action needed" : "New 5-star feedback",
    title: isPrivate
      ? `${name} rated you ${rating} of 5`
      : `${name} left you a ${rating}-star review`,
    intro: isPrivate
      ? [
          `${name} rated the experience ${rating} of 5 and asked to be heard privately rather than posting publicly.`,
          "This was not posted anywhere public and nothing about it is on the site. Call them and put it right.",
        ]
      : [
          `${name} left a ${rating}-star review on the website and was offered the one-click Google link on the success screen.`,
        ],
    rows: [
      { label: "Rating", value: `${stars}  (${rating}/5)` },
      { label: "Name", value: name },
      ...(contact ? [{ label: "Contact", value: contact }] : []),
      ...(town ? [{ label: "Town", value: town }] : []),
    ],
    ...(message
      ? { quote: { label: isPrivate ? "What happened" : "Their review", body: message } }
      : {}),
    outro: isPrivate
      ? undefined
      : [
          "To publish this on the site, add it to siteConfig.testimonials in src/data/site.ts with isReal: true. Nothing is published automatically.",
        ],
    // A complaint gets no CTA — the action is "call them," not "click something."
    ...(isPrivate
      ? {}
      : { cta: { label: "See your Google reviews", href: siteConfig.business.googleReviewUrl } }),
  });

  const send = await resend.emails.send({
    from,
    to: siteConfig.business.ownerEmail,
    // Reply lands with the reviewer when they left an email address.
    ...(contact.includes("@") ? { replyTo: contact } : {}),
    subject,
    html: ownerEmailContent.html,
    text: ownerEmailContent.text,
  });

  if (send.error) {
    console.error("[REVIEW] Owner notification failed:", send.error);
    return Response.json(
      { success: false, error: "Email delivery failed. Please call directly." },
      { status: 502 }
    );
  }

  // Submitter confirmation — this route previously sent NOTHING back to the person who
  // filled the survey, which is Error #113 exactly (owner alerted, submitter ignored, so
  // the form reads as broken). Best-effort: the feedback already reached Jim above, so a
  // failure here does not fail the request. Spaced 900ms per Error #87 (Resend ~2 req/sec
  // silently 429s the second send).
  //
  // The `contact` field is free-form — the survey accepts a phone number or an email — so
  // this only fires when it actually looks like an address to send to.
  if (contact.includes("@")) {
    await sleep(900);
    const greetingName = safeName(name) || "there";

    const confirmation = renderEmail({
      preheader: isPrivate
        ? "Jim reads these himself and will call you."
        : "Thank you for the kind words.",
      eyebrow: isPrivate ? "Message received" : "Thank you",
      title: isPrivate
        ? `Thanks for telling Jim directly, ${greetingName}.`
        : `Thank you, ${greetingName}.`,
      intro: isPrivate
        ? [
            "Your message went straight to Jim and nowhere else. It was not posted publicly and it will not be.",
            "He reads these himself, usually the same day, and he will call you. Telling him directly is the only way he can put it right.",
          ]
        : [
            "Your review went straight to Jim, and he reads every one of them himself.",
            "It means a lot coming from a customer. Jim runs this business himself, so feedback like yours is what keeps the phone ringing.",
          ],
      ...(message
        ? { quote: { label: isPrivate ? "What you told Jim" : "What you wrote", body: message } }
        : {}),
      outro: isPrivate
        ? [
            `If you would rather talk right now, call Jim directly at ${siteConfig.business.phoneFormatted}. He answers his own phone.`,
          ]
        : [
            "If you have a minute, sharing it on Google helps other New England homeowners find Jim.",
          ],
      ...(isPrivate
        ? {}
        : {
            cta: {
              label: "Share it on Google",
              href: siteConfig.business.googleReviewUrl,
            },
          }),
      signature: true,
    });

    try {
      const confirmSend = await resend.emails.send({
        from,
        to: contact,
        replyTo: siteConfig.business.ownerEmail, // Pattern #44 — their reply reaches Jim
        subject: isPrivate
          ? "Jim got your message, Window Fantasies"
          : "Thank you for the review, Window Fantasies",
        html: confirmation.html,
        text: confirmation.text,
      });
      if (confirmSend.error) {
        console.warn("[REVIEW] Confirmation to submitter failed:", confirmSend.error);
      }
    } catch (err) {
      console.warn("[REVIEW] Confirmation to submitter threw:", err);
    }
  }

  return Response.json({ success: true, confirmation: `REVIEW-${Date.now()}` });
}
