import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════════════
   HunterDouglasLogo — the Hunter Douglas brand logo, rendered to spec.

   ⚠️ COMPLIANCE COMPONENT. Every constraint below is a Hunter Douglas Identity
   Guideline, not a style preference. Changing them can cost Window Fantasies
   its listing on the hunterdouglas.com dealer locator.

   THE ART
   The three PNGs in /public/brand are the ORIGINAL APPROVED ART, extracted from
   the Hunter Douglas Media Kit that HD themselves sent Jim on 2026-07-31. The
   wordmark renders in HD Gray #5B6770 (verified pixel-exact against HD's
   published spec) and the symbol in HD Orange. Confirmed current on 2026-07-31
   against the live mark on hunterdouglas.com — identical wordmark letterforms,
   identical symbol geometry, identical arrangement.

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

/** Native pixel dimensions of the approved art, for correct aspect ratio. */
const ART = {
  horizontal: { src: "/brand/hunter-douglas-logo-horizontal.png", w: 829, h: 119, minWidth: 135 },
  "vertical-a": { src: "/brand/hunter-douglas-logo-vertical-a.png", w: 464, h: 407, minWidth: 100 },
  "vertical-b": { src: "/brand/hunter-douglas-logo-vertical-b.png", w: 643, h: 402, minWidth: 100 },
} as const;

export type HunterDouglasLogoVariant = keyof typeof ART;

type Props = {
  /** "horizontal" is HD's preferred lockup — use it whenever space allows. */
  variant?: HunterDouglasLogoVariant;
  /** Rendered width in px. Clamped up to HD's minimum for the variant. */
  width?: number;
  /** Light plate behind the logo, for placing the unaltered art on dark bands. */
  plate?: boolean;
  /** Prioritize the image (the hero lockup is above the fold). */
  priority?: boolean;
  className?: string;
};

export function HunterDouglasLogo({
  variant = "horizontal",
  width = 220,
  plate = false,
  priority = false,
  className,
}: Props) {
  const art = ART[variant];

  // HD minimum on-screen size. Clamp up rather than render an illegible mark —
  // an undersized logo fails the same criterion as a missing one.
  const renderWidth = Math.max(width, art.minWidth);
  const renderHeight = Math.round((renderWidth * art.h) / art.w);

  // Clear space "X" on all four sides. Proportional so it holds at every size.
  const clearSpace = Math.round(renderWidth * 0.09);

  const logo = (
    <Image
      src={art.src}
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

  if (!plate) {
    return (
      <span className={wrapperClass} style={{ padding: clearSpace }}>
        {logo}
      </span>
    );
  }

  return (
    <span
      className={wrapperClass}
      style={{
        padding: clearSpace,
        background: "var(--cream)",
        borderRadius: "0.375rem",
        // Warm hairline so the plate reads as an intentional brand tile on the
        // dark hero rather than a transparent PNG that failed to load.
        boxShadow: "0 2px 14px rgba(7, 7, 6, 0.45)",
      }}
    >
      {logo}
    </span>
  );
}
