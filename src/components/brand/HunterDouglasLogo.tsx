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

   THE RULES (HD Identity Guidelines)
   1. "Never alter any elements ... Always use the original and approved art."
      → NO recolor, NO CSS filter, NO rotation, NO crop, NO opacity, NO
        mix-blend-mode, NO drop-shadow, NO hover transform. If you need the mark
        on a dark field, use `plate` — do NOT knock the art out to white.
   2. "The symbol always appears to the right of the wordmark."
      → Never mirror or re-order. Use the vertical variants when width is tight.
   3. Minimum on-screen size: 135px wide horizontal, 100px wide vertical.
      → Enforced below; smaller values are clamped up rather than silently
        shipping an undersized mark.
   4. Clear space equal to "X" on all four sides, free of other elements.
      → Enforced as padding derived from the rendered width, so it scales.

   WHY A PLATE INSTEAD OF A WHITE LOGO
   HD Gray #5B6770 on our --ink #070706 is unreadable, and recoloring their art
   is a compliance violation. HD's own guidelines show the mark on both light
   and dark tiles, so the unaltered full-color logo sits on a light plate. If
   Jim later pulls the official REVERSED art from The Link → Marketing Services
   Portal → "Hunter Douglas logo downloads", add it as a new file and a new
   variant — never by restyling this one.

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
