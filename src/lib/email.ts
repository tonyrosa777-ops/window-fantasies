import { siteConfig } from "@/data/site";

/**
 * Branded transactional email templates — Window Fantasies.
 *
 * Every email this site sends is branded HTML with a plain-text fallback, for BOTH
 * recipients: the submitter AND Jim. Per knowledge/patterns/transactional-emails-branded-html.md
 * (Pattern #121) the prospect-facing email must be branded HTML on a premium build;
 * Anthony extended that to the owner alert too (2026-07-20), so Jim's lead emails read
 * like the brand rather than a console dump.
 *
 * EMAIL-CLIENT CONSTRAINTS (why this file looks like 2005 HTML on purpose):
 *   - TABLE layout + INLINE styles only. Gmail/Outlook strip <style> blocks, CSS custom
 *     properties, flexbox, and grid. There is no `var(--primary)` in email.
 *   - Brand hex values are HARDCODED below, mirrored from globals.css. If the design
 *     tokens change, update BRAND here too — email cannot read the stylesheet.
 *   - Light background + dark text: better deliverability and readability than a dark
 *     shell, and dark-mode clients invert unpredictably. The brand's black shows up as
 *     the header band + footer rule, not as the body surface.
 *
 * SECURITY: every interpolated value passes through escapeHtml(). User-supplied strings
 * (name, town, message, email) reach these templates, so unescaped interpolation would
 * put attacker-controlled markup in Jim's inbox. Never interpolate raw input.
 */

/**
 * The From address for every send.
 *
 * Resend REJECTS any send whose From domain is not verified on the account
 * (403 `validation_error`: "The <domain> domain is not verified"). As of 2026-07-20 the
 * Resend account has ZERO domains registered, so `noreply@windowfantasies.com` fails on
 * every submission — verified live against the API, not assumed.
 *
 * Verifying windowfantasies.com needs DKIM/SPF records at 007names, which is gated on
 * runbook item O-1 (who holds that login). So this reads an explicit override first:
 *
 *   RESEND_FROM="Window Fantasies <onboarding@resend.dev>"
 *
 * `onboarding@resend.dev` is Resend's shared sender — it delivers immediately with no
 * domain setup, which unblocks end-to-end testing today. It is a STOPGAP, not the ship
 * state: the From line reads as resend.dev rather than the brand, and a shared domain
 * carries weaker deliverability. Once windowfantasies.com is verified, drop the override
 * and this falls back to the branded address automatically.
 */
export function fromAddress(): string {
  const override = process.env.RESEND_FROM;
  if (override) return override;
  return `Window Fantasies <noreply@${process.env.RESEND_DOMAIN ?? "windowfantasies.com"}>`;
}

/** Brand palette, mirrored from globals.css. Email cannot use CSS variables. */
const BRAND = {
  ink: "#070706",
  gold: "#CDAD69",
  goldDeep: "#89612B",
  cream: "#F8F3E2",
  parchment: "#F1E9CF",
  card: "#FFFFFF",
  border: "#E4D9BC",
  text: "#2D1F11",
  muted: "#6E5C3F",
} as const;

const FONT = "Arial, Helvetica, sans-serif";

/**
 * Escape a string for safe interpolation into email HTML.
 * Covers the five XML entities; `&` must be replaced first or it double-escapes.
 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape, then convert newlines to <br> for multi-line free text (the message body). */
function escapeMultiline(s: string): string {
  return escapeHtml(s).replace(/\r?\n/g, "<br>");
}

export type DetailRow = { label: string; value: string };
export type EmailCta = { label: string; href: string };

export type EmailShellInput = {
  /** Hidden inbox-preview line. Shows next to the subject in most clients. */
  preheader: string;
  /** Small uppercase label above the title. */
  eyebrow: string;
  /** The email's H1. */
  title: string;
  /** Intro paragraphs, plain strings (escaped here). */
  intro: string[];
  /** Optional label/value table — the lead detail block. */
  rows?: DetailRow[];
  /** Optional highlighted quote/message block (free text, newlines preserved). */
  quote?: { label: string; body: string };
  /** Optional single prominent button. */
  cta?: EmailCta;
  /** Closing paragraphs, rendered under the CTA. */
  outro?: string[];
  /** Signature block: true = Jim's sign-off, false = none (owner alerts). */
  signature?: boolean;
};

/**
 * Render the shared branded shell.
 * Structure: gold wordmark on ink → white card (eyebrow → H1 → intro → rows → quote →
 * CTA → outro → signature) → address footer.
 */
export function emailShell(input: EmailShellInput): string {
  const { business } = siteConfig;
  const addressLine = `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`;

  const introHtml = input.intro
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-family:${FONT};font-size:15px;line-height:1.7;color:${BRAND.text};">${escapeHtml(p)}</p>`
    )
    .join("");

  const rowsHtml = input.rows?.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-collapse:collapse;">
        ${input.rows
          .map(
            (r) => `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid ${BRAND.border};font-family:${FONT};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.muted};white-space:nowrap;vertical-align:top;width:1%;">${escapeHtml(r.label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid ${BRAND.border};font-family:${FONT};font-size:15px;line-height:1.6;color:${BRAND.text};font-weight:bold;">${escapeHtml(r.value)}</td>
        </tr>`
          )
          .join("")}
      </table>`
    : "";

  const quoteHtml = input.quote
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
        <tr><td style="background:${BRAND.parchment};border-left:3px solid ${BRAND.gold};border-radius:0 8px 8px 0;padding:18px 20px;">
          <p style="margin:0 0 8px;font-family:${FONT};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.muted};">${escapeHtml(input.quote.label)}</p>
          <p style="margin:0;font-family:${FONT};font-size:15px;line-height:1.7;color:${BRAND.text};">${escapeMultiline(input.quote.body)}</p>
        </td></tr>
      </table>`
    : "";

  // Button is a table cell with a background, not a styled <div> — Outlook ignores
  // padding/background on inline <a>, so the <td> carries both.
  const ctaHtml = input.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
        <tr><td align="center" style="background:${BRAND.gold};border-radius:6px;">
          <a href="${escapeHtml(input.cta.href)}" style="display:inline-block;padding:14px 30px;font-family:${FONT};font-size:14px;font-weight:bold;letter-spacing:0.6px;color:${BRAND.ink};text-decoration:none;">${escapeHtml(input.cta.label)}</a>
        </td></tr>
      </table>`
    : "";

  const outroHtml =
    input.outro
      ?.map(
        (p) =>
          `<p style="margin:0 0 16px;font-family:${FONT};font-size:15px;line-height:1.7;color:${BRAND.text};">${escapeHtml(p)}</p>`
      )
      .join("") ?? "";

  const signatureHtml = input.signature
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;border-top:1px solid ${BRAND.border};">
        <tr><td style="padding-top:20px;font-family:${FONT};font-size:14px;line-height:1.7;color:${BRAND.text};">
          <strong style="color:${BRAND.goldDeep};">${escapeHtml(business.founderName)}</strong><br>
          <span style="color:${BRAND.muted};">${escapeHtml(business.name)}</span><br>
          <a href="tel:${escapeHtml(business.phone)}" style="color:${BRAND.goldDeep};text-decoration:none;font-weight:bold;">${escapeHtml(business.phoneFormatted)}</a>
        </td></tr>
      </table>`
    : "";

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(input.title)}</title></head>
<body style="margin:0;padding:0;background:${BRAND.cream};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0;">${escapeHtml(input.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cream};">
    <tr><td align="center" style="padding:0 16px 40px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td align="center" style="background:${BRAND.ink};border-radius:0 0 14px 14px;padding:26px 20px;">
          <span style="font-family:${FONT};font-size:14px;letter-spacing:4px;font-weight:bold;color:${BRAND.gold};">WINDOW FANTASIES</span><br>
          <span style="font-family:${FONT};font-size:10px;letter-spacing:2px;color:rgba(246,241,225,0.55);">CUSTOM HUNTER DOUGLAS TREATMENTS</span>
        </td></tr>

        <tr><td style="height:24px;line-height:24px;font-size:0;">&nbsp;</td></tr>

        <tr><td style="background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:14px;padding:36px 32px;">
          <p style="margin:0 0 10px;font-family:${FONT};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.goldDeep};font-weight:bold;">${escapeHtml(input.eyebrow)}</p>
          <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.3;font-weight:normal;color:${BRAND.ink};">${escapeHtml(input.title)}</h1>
          ${introHtml}
          ${rowsHtml}
          ${quoteHtml}
          ${ctaHtml}
          ${outroHtml}
          ${signatureHtml}
        </td></tr>

        <tr><td align="center" style="padding:22px 12px 0;font-family:${FONT};font-size:12px;line-height:1.7;color:${BRAND.muted};">
          ${escapeHtml(business.name)} &middot; ${escapeHtml(addressLine)}<br>
          <a href="tel:${escapeHtml(business.phone)}" style="color:${BRAND.muted};text-decoration:underline;">${escapeHtml(business.phoneFormatted)}</a>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

/** Plain-text sibling of emailShell — same content, no markup. Never omit this. */
export function emailText(input: EmailShellInput): string {
  const { business } = siteConfig;
  const parts: string[] = ["WINDOW FANTASIES", "", input.title.toUpperCase(), ""];
  parts.push(...input.intro, "");
  if (input.rows?.length) {
    parts.push(...input.rows.map((r) => `${r.label}: ${r.value}`), "");
  }
  if (input.quote) {
    parts.push(`${input.quote.label}:`, input.quote.body, "");
  }
  if (input.cta) parts.push(`${input.cta.label}: ${input.cta.href}`, "");
  if (input.outro?.length) parts.push(...input.outro, "");
  if (input.signature) {
    parts.push(
      `${business.founderName}`,
      `${business.name}`,
      `${business.phoneFormatted}`,
      ""
    );
  }
  parts.push(
    `${business.name} · ${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`
  );
  return parts.join("\n");
}

/** Build both representations at once — every send passes html AND text. */
export function renderEmail(input: EmailShellInput): { html: string; text: string } {
  return { html: emailShell(input), text: emailText(input) };
}
