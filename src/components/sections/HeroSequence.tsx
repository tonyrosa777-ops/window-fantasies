"use client";

import { useEffect, useState } from "react";
import { HDPhotoCredit } from "@/components/brand/HDPhotoCredit";

/* ═══════════════════════════════════════════════════════════════════════════
   HeroSequence — the cinematic hero, built from Hunter Douglas's own photography.

   WHAT IT IS
   Four licensed HD product photographs, each slowly scaling (a Ken Burns push or
   pull), crossfading into the next. It gives the site the stitched multi-clip
   movie hero the design system calls for, and every frame is a real Hunter
   Douglas product in a real room.

   ⚠️ WHY THIS IS CSS AND NOT A VIDEO FILE — this is the important part.

   The obvious build is to run the four stills through ffmpeg with a zoompan
   filter and ship one MP4. Do not do that. Baking HD's photography into a new
   video file creates a DERIVATIVE of their asset, and their dealer policy is
   explicit: "Dealer(s) may not modify any Hunter Douglas owned assets... Using,
   altering or tampering with any part of our creative content is a compliance
   violation." This site already shipped one unauthorised derivative of an HD
   photo (an AI-generated hero, knowledge base Error #274) and it is the reason
   this whole remediation exists.

   Animating at RENDER TIME is categorically different. Each file is served
   byte-for-byte as HD supplied it; a CSS transform only changes how the browser
   paints it, exactly like `object-fit: cover` cropping to a viewport. Nothing
   derived is created or distributed.

   It is also just better engineering: no ~7MB video download, no video codec
   softening their photography, responsive srcset stays available, and
   prefers-reduced-motion is one media query instead of a separate asset.

   THE CREDIT TRACKS THE VISIBLE PHOTO
   HD requires their photography be "clearly labeled with the specific product it
   was designed to promote." Since the visible photo changes, a single static
   credit would be wrong for three quarters of the loop, so the credit advances
   with the slide.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * How long each photo holds before crossfading. 4s keeps all four products in
 * front of a visitor inside a realistic hero dwell window: the full rotation is
 * 16s, so someone who reads the headline and CTAs still sees three or four
 * products rather than one. The 1.2s crossfade overlaps this, so the settled
 * portion of each slide is ~2.8s.
 */
const SLIDE_MS = 4000;

type Slide = {
  src: string;
  /** Product credit. Must name the product in THIS photo. */
  credit: string;
  alt: string;
  /** Alternating push/pull so consecutive slides do not drift identically. */
  direction: "in" | "out";
  /** Transform origin, aimed at each photo's own focal point. */
  origin: string;
};

const SLIDES: Slide[] = [
  {
    src: "/images/hero/hd-hero-1-heritance-shutters.webp",
    credit: "Heritance® Hardwood Shutters by Hunter Douglas",
    alt: "A New England kitchen and dining room framed by black Hunter Douglas Heritance® Hardwood Shutters on a bi-fold track.",
    direction: "in",
    origin: "62% 50%",
  },
  {
    src: "/images/hero/hd-hero-2-aria-soft-blinds.webp",
    credit: "Aria™ Soft Blinds by Hunter Douglas",
    alt: "A warm wood-panelled living room where Hunter Douglas Aria™ Soft Blinds filter afternoon daylight over a low sectional.",
    direction: "out",
    origin: "55% 45%",
  },
  {
    src: "/images/hero/hd-hero-3-pirouette-shadings.webp",
    credit: "Pirouette® Window Shadings by Hunter Douglas",
    alt: "A calm bedroom with Hunter Douglas Pirouette® Window Shadings softening the light across the bed.",
    direction: "in",
    origin: "45% 55%",
  },
  {
    src: "/images/hero/hd-hero-4-designer-screen-shades.webp",
    credit: "Designer Screen Shades by Hunter Douglas",
    alt: "An open living room with Hunter Douglas Designer Screen Shades across a wide bank of windows.",
    direction: "out",
    origin: "58% 50%",
  },
];

export function HeroSequence() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Respect the OS setting: hold slide one, no rotation, no drift.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt=""
            // First slide is the LCP element, so it must not lazy-load.
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            className="hd-hero-slide absolute inset-0 w-full h-full object-cover"
            data-active={i === active ? "true" : "false"}
            data-direction={s.direction}
            style={{ transformOrigin: s.origin }}
          />
        ))}
      </div>

      {/* ⚠️ The credit is a SIBLING of the image stack, not a child, and both
          constraints below are compliance requirements rather than styling.

          z-20 puts it ABOVE the gradient scrim (z-5). Inside the z-0 image
          layer the scrim washed over it and the label was unreadable, which
          does not satisfy "clearly labeled".

          At sm+ the h-[100svh] wrapper anchors "bottom" to the FOLD, because the
          hero section also contains the trust strip and a credit at the section
          bottom would sit far below the photo's visible portion.

          Below sm that same fold anchor put the credit at y~804 in an 844px fold,
          which is exactly where the trust chips wrap to a third row (measured
          collision at both 375 and 390; clear at 428+). The hero content is
          intrinsically taller than the fold at those widths, so its padding-bottom
          lands off-screen and cannot reserve the strip. The photo runs the full
          section height, so the fix is to caption its true bottom edge instead of
          a mid-photo band: still an on-photo corner caption, and clear of content. */}
      <div className="absolute inset-x-0 top-0 bottom-0 sm:bottom-auto sm:h-[100svh] z-20 pointer-events-none">
        <HDPhotoCredit credit={SLIDES[active].credit} variant="overlay" />
      </div>
    </>
  );
}

/** The visible slide's alt text, for the screen-reader-facing <img> in Hero. */
export const heroSequenceAlt = SLIDES[0].alt;
