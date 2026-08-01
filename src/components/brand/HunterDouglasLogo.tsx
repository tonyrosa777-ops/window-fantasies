import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════════════
   HunterDouglasLogo — the Hunter Douglas brand logo, rendered to spec.

   ⚠️ COMPLIANCE COMPONENT. Every constraint below is a Hunter Douglas Identity
   Guideline, not a style preference. Changing them can cost Window Fantasies
   its listing on the hunterdouglas.com dealer locator.

   THE ART
   The PNGs in /public/brand are HD's OFFICIAL LOGO FILES, downloaded 2026-08-01
   from Brite (hdbrite.com -> Pinnacle -> Marketing Resource Center), the source
   HD themselves direct dealers to. 2400x346, i.e. ~3x the resolution of the
   copy previously extracted from the Media Kit PDF.

   Two colourways, and picking the right one matters:
     - `hunter-douglas-logo-horizontal.png`       HD Gray #5B6770 wordmark +
                                                  orange symbol. For LIGHT bands.
     - `hunter-douglas-logo-horizontal-white.png` WHITE wordmark + orange symbol
                                                  #F08200. HD's own REVERSED art,
                                                  for DARK bands.
   The reversed file is why this component no longer paints a light "plate"
   behind the logo on the dark hero. That plate existed only because the Media
   Kit copy was the gray-on-transparent version, unreadable on --ink, and
   recolouring HD's art is a compliance violation. HD supplies the reversed
   art, so we use it instead of working around its absence.

   ⚠️ PROVENANCE — the receipt, so this is never re-litigated. A compliance
   reviewer will reasonably ask whether the white file is HD's official reversed
   art or OUR recolour of their colour art, because one is permitted and the
   other violates "never alter any elements". It is HD's own: downloaded from
   Jim's Brite dealer account as "White Hunter Douglas Logo.png", asset type
   "Logo", and recorded in assets/hunter-douglas-brite/manifest.json in the
   private docs repo with its HD asset ID. Nothing here was recoloured. If these
   files are ever replaced, replace the manifest receipt with them.

   THE RULES (HD Identity Guidelines)
   1. "Never alter any elements ... Always use the original and approved art."
      → NO recolor, NO CSS filter, NO rotation, NO crop, NO opacity, NO
        mix-blend-mode, NO drop-shadow, NO hover transform. If you need the mark
        on a dark field, use `tone="dark"`, which serves HD's OWN reversed file —
        do NOT knock the colour art out to white yourself.
   2. "The symbol always appears to the right of the wordmark."
      → Never mirror or re-order. Use the vertical variants when width is tight.
   3. Minimum on-screen size: 135px wide horizontal, 100px wide vertical.
      → Enforced below; smaller values are clamped up rather than silently
        shipping an undersized mark.
   4. Clear space equal to "X" on all four sides, free of other elements.
      → Enforced as padding derived from the rendered width, so it scales.

   (A previous block here explained why a light PLATE was used instead of a white
   logo, and told a future reader to swap in official reversed art if Jim ever
   pulled it from the dealer portal. He did, and it is in use — see PROVENANCE
   above. The plate and the `plate` prop are both gone. Rule 1 still stands
   exactly as written: if you ever need a colourway we do not have, download it
   from Brite. Never produce it by restyling a file we do.)

   Source of record: ../../../../hunter-douglas-media-kit.md (private repo).
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Native pixel dimensions of the official art, for correct aspect ratio.
 * `onDark` is HD's reversed colourway; `src` is the standard one.
 */
const ART = {
  horizontal: {
    src: "/brand/hunter-douglas-logo-horizontal.png",
    onDark: "/brand/hunter-douglas-logo-horizontal-white.png",
    w: 2400, h: 346, minWidth: 135,
  },
  "vertical-a": {
    src: "/brand/hunter-douglas-logo-vertical-a.png",
    onDark: "/brand/hunter-douglas-logo-vertical-a-white.png",
    w: 981, h: 858, minWidth: 100,
  },
} as const;

export type HunterDouglasLogoVariant = keyof typeof ART;

type Props = {
  /** "horizontal" is HD's preferred lockup — use it whenever space allows. */
  variant?: HunterDouglasLogoVariant;
  /** Rendered width in px. Clamped up to HD's minimum for the variant. */
  width?: number;
  /**
   * Tone of the band this sits on. Selects HD's own colourway:
   * "light" -> gray wordmark, "dark" -> HD's reversed white wordmark.
   * Never recolour the art to fit a band; pick the right file.
   */
  tone?: "light" | "dark";
  /** Prioritize the image (the hero lockup is above the fold). */
  priority?: boolean;
  className?: string;
};

export function HunterDouglasLogo({
  variant = "horizontal",
  width = 220,
  tone = "light",
  priority = false,
  className,
}: Props) {
  const art = ART[variant];
  const src = tone === "dark" ? art.onDark : art.src;

  // HD minimum on-screen size. Clamp up rather than render an illegible mark —
  // an undersized logo fails the same criterion as a missing one.
  const renderWidth = Math.max(width, art.minWidth);
  const renderHeight = Math.round((renderWidth * art.h) / art.w);

  // Clear space "X" on all four sides. Proportional so it holds at every size.
  const clearSpace = Math.round(renderWidth * 0.09);

  const logo = (
    <Image
      src={src}
      alt="Hunter Douglas"
      width={art.w}
      height={art.h}
      priority={priority}
      style={{
        width: renderWidth,
        height: renderHeight,
        display: "block",
        // A flex parent will happily shrink this below HD's minimum. It did:
        // a 150px mobile lockup measured 88px at a 320px viewport and 128px at
        // 360px, both under HD's 135px floor, on one of the most common phone
        // widths in the world. `flexShrink: 0` plus an explicit floor makes the
        // minimum hold no matter what container it lands in.
        minWidth: art.minWidth,
        flexShrink: 0,
      }}
      // Unoptimized: next/image's lossy pipeline re-encodes the mark. HD requires
      // the original approved art, so it ships byte-for-byte as they supplied it.
      unoptimized
    />
  );

  // Display handling, and it is fiddly for a real reason.
  //
  // An inline `display: inline-block` beats a Tailwind `hidden` in the cascade,
  // so it silently renders BOTH the horizontal and vertical variants at once
  // when a caller switches between them responsively. Moving `inline-block`
  // into the class list does not fix it either: `inline-block` and `hidden` are
  // the same specificity, so the winner is decided by stylesheet order, not by
  // the order they appear here. That is a coin flip, and it lost on mobile.
  //
  // So: when the caller supplies a className, the caller owns `display`
  // entirely. Only when there is no className do we default to inline-block.
  const wrapperClass = className ?? "inline-block";

  // Clear space is the only wrapper styling. No plate, no border, no shadow:
  // with HD's reversed art available, the mark sits directly on the band in its
  // correct colourway, which is what their identity guidelines actually ask for.
  return (
    <span className={wrapperClass} style={{ padding: clearSpace }}>
      {logo}
    </span>
  );
}
