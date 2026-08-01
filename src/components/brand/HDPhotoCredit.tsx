/* ═══════════════════════════════════════════════════════════════════════════
   HDPhotoCredit — attribution for Hunter Douglas product photography.

   ⚠️ COMPLIANCE COMPONENT. Hunter Douglas requires that their photography be
   "clearly labeled with the specific product it was designed to promote", and
   the 2026-07-31 waiver review failed this site for having zero such labels on
   the 12 licensed HD photos.

   THE FIRST-INSTANCE RULE
   HD's reviewer stated it explicitly: "when showcasing Hunter Douglas photos in
   a product section of the website, each photo does not need to be trademarked;
   only the first instance." So credit the LEAD photo of each section or page,
   not every tile in a grid. Over-crediting is not safer, it is just noisy.

   THE TWO APPROVED FORMATS — both taken from HD's own worked examples:
     overlay — a small caption box in the bottom-right corner OF the photo. HD
       expressly permits this: "text boxes with acceptable information may
       slightly overlap the Hunter Douglas image as long as the overall
       aesthetic impression of the image is not compromised." Use on full-bleed
       photography (the hero) where there is no "below".
     below — a caption directly beneath the photo. Use everywhere else; it is
       the cleaner treatment on a photo-led page.

   THE CAPTION TEXT
   Always the product's full trademarked name plus its category descriptor, then
   "by Hunter Douglas". Build it with hdPhotoCredit() from src/data/hunterDouglas.ts
   so the symbol and descriptor are correct — do not hand-type product names.

     hdPhotoCredit("silhouette") -> "Silhouette® Window Shadings by Hunter Douglas"

   Requires a positioned ancestor when variant="overlay" (the photo wrapper
   needs `position: relative`).
   ═══════════════════════════════════════════════════════════════════════════ */

type Props = {
  /** Full credit line. Build it with hdPhotoCredit(), never by hand. */
  credit: string;
  /** "overlay" sits on the photo (full-bleed); "below" sits under it. */
  variant?: "overlay" | "below";
  /**
   * Band tone, for variant="below" only. REQUIRED to get right: --text-muted is
   * a near-white for dark bands and is effectively invisible on cream/light
   * bands. An attribution nobody can read does not satisfy HD's labeling
   * requirement, so pass tone="light" on any light or cream section.
   * (variant="overlay" always sits on its own dark scrim and ignores this.)
   */
  tone?: "dark" | "light";
  className?: string;
};

export function HDPhotoCredit({ credit, variant = "below", tone = "dark", className }: Props) {
  if (variant === "overlay") {
    return (
      <span
        className={className}
        data-hd-credit
        style={{
          position: "absolute",
          right: "clamp(0.75rem, 2vw, 1.5rem)",
          bottom: "clamp(0.75rem, 2vw, 1.5rem)",
          zIndex: 20,
          maxWidth: "min(80vw, 22rem)",
          padding: "0.4rem 0.7rem",
          borderRadius: "0.25rem",
          // Legible over any photograph without obscuring it, per HD's
          // "aesthetic impression is not compromised" condition.
          background: "rgba(7, 7, 6, 0.62)",
          backdropFilter: "blur(3px)",
          color: "rgba(246, 241, 225, 0.92)",
          fontSize: "0.6875rem",
          lineHeight: 1.4,
          letterSpacing: "0.02em",
          pointerEvents: "none",
        }}
      >
        {credit}
      </span>
    );
  }

  return (
    <p
      className={className}
      data-hd-credit
      style={{
        marginTop: "0.5rem",
        fontSize: "0.6875rem",
        lineHeight: 1.5,
        letterSpacing: "0.02em",
        // --text-muted is a near-white meant for dark bands. On the cream bands
        // it composites to roughly 1:1 against the background and the credit
        // disappears entirely. An attribution nobody can read does not satisfy
        // HD's labeling requirement, so this MUST honour `tone`.
        color: tone === "light" ? "var(--muted-on-light)" : "var(--text-muted)",
      }}
    >
      {credit}
    </p>
  );
}
