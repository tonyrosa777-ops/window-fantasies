import { POWERVIEW_APP_DISCLOSURE } from "@/data/hunterDouglas";

/* ═══════════════════════════════════════════════════════════════════════════
   PowerViewDisclosure — Hunter Douglas MANDATORY LEGAL COPY.

   ⚠️ NOT decoration. Hunter Douglas requires this exact sentence on any
   advertising creative that promotes the PowerView® scheduling benefit:

       "The PowerView® App is required for programmed operation."

   WHEN IT IS REQUIRED
   Anywhere this site tells a visitor their shades can move on a schedule, run
   automatically, react to sunrise/sunset, or be controlled from a phone or an
   app. If a section makes that promise, this component must render in it.
   Currently: /services/powerview-automation, the signature-products band, the
   PowerView quiz result, the motorization blog posts, the scheduling FAQ, and
   any service-area page that mentions scheduling.

   HOW TO USE IT
   Render it verbatim. Do not paraphrase, do not summarize into surrounding
   prose, do not hide it behind a toggle, and do not delete it because a design
   review called it clutter. It is small and low-contrast by design — that is
   how manufacturer legal copy is meant to sit — but it must be legible and
   present in the DOM, not an aria-hidden decoration.

   `npm run check:hd` fails the build if a file promotes scheduling without it.
   ═══════════════════════════════════════════════════════════════════════════ */

type Props = {
  /** "block" for a standalone footnote line; "inline" to sit under a paragraph. */
  variant?: "block" | "inline";
  /**
   * Tone of the band this sits on. **REQUIRED, deliberately — there is no default.**
   *
   * This prop has no default because a wrong default already shipped. The
   * component painted itself with --text-muted, a near-white intended for dark
   * bands, and a caller dropped it on a cream section. It rendered at a 1.02:1
   * contrast ratio: present in the DOM, in the accessibility tree, and totally
   * invisible to a human. A compliance reviewer caught it on the homepage.
   *
   * Mandatory manufacturer legal copy that cannot be read has not been disclosed.
   * Making this required means TypeScript asks every caller the one question that
   * matters, instead of silently guessing wrong.
   */
  tone: "dark" | "light";
  className?: string;
};

export function PowerViewDisclosure({ variant = "block", tone, className }: Props) {
  return (
    <p
      className={className}
      data-hd-legal="powerview-app"
      style={{
        fontSize: "0.75rem",
        lineHeight: 1.5,
        // Dark bands do NOT use --text-muted. That token is rgba(...,0.45), which
        // composites over --ink to roughly 4.08:1 at this size, under the 4.5:1
        // threshold for 12px text. Mandatory legal copy has to clear it, so this
        // uses the same 0.72 alpha the footer disclaimers use (~7:1). Light bands
        // use --muted-on-light, measured at 5.79:1 on cream.
        color: tone === "light" ? "var(--muted-on-light)" : "rgba(246, 241, 225, 0.72)",
        marginTop: variant === "block" ? "1rem" : "0.5rem",
        maxWidth: "38rem",
      }}
    >
      {POWERVIEW_APP_DISCLOSURE}
    </p>
  );
}
