import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════════════
   BbbSeal — the official BBB Accredited Business seal, linked to Window
   Fantasies' live BBB Business Profile.

   THE ART
   /public/brand/bbb-accredited-business-seal.svg is BBB's OFFICIAL brand seal,
   downloaded 2026-09-02 from BBB's own brand asset host
   (m.bbb.org/brand/seals/Accredited_Business_Seal_NoRating_RGB.svg). It is the
   full-color torch lockup reading "BBB Accredited Business" — used as supplied,
   never recolored, rotated, cropped, or filtered (BBB's identity rules mirror
   HD's: use the original approved art). A vertical variant is also in
   /public/brand for future hero/sidebar use.

   THE LINK — required, not decorative.
   BBB requires the displayed seal to link to the business's live BBB Business
   Profile so a visitor can verify the accreditation. Window Fantasies, LLC —
   Salem, NH — BBB ID 0051-9001278, A+ rated, accredited since 5/13/2025.

   THE RATING — why this seal has no "A+" baked in.
   The rating-bearing DYNAMIC seal is business-specific and is generated only
   from Jim's logged-in BBB account. This official brand seal carries no rating,
   and the "A+" is stated in the adjacent text badge, so the pairing conveys the
   full message. If Jim later pastes his dynamic-seal code, swap the <Image> src
   for that seal URL and keep this same profile link.
   ═══════════════════════════════════════════════════════════════════════════ */

const PROFILE_URL =
  "https://www.bbb.org/us/nh/salem/profile/custom-curtains/window-fantasies-llc-0051-9001278";

// Native aspect ratio of the official horizontal art (viewBox 961.567 x 368.321).
const ART = { src: "/brand/bbb-accredited-business-seal.svg", w: 962, h: 368 } as const;

type Props = {
  /** Rendered width in px. */
  width?: number;
  className?: string;
};

/**
 * Renders the official BBB Accredited Business seal on a white plate (for
 * contrast + BBB's required clear space) linked to the live BBB profile.
 */
export function BbbSeal({ width = 168, className }: Props) {
  const renderHeight = Math.round((width * ART.h) / ART.w);

  return (
    <a
      href={PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label="Window Fantasies, LLC BBB Business Profile — A+ Accredited (opens in a new tab)"
      className={`inline-flex items-center justify-center rounded-lg bg-white transition-opacity hover:opacity-90 ${className ?? ""}`}
      style={{ padding: Math.round(width * 0.08) }}
    >
      <Image
        src={ART.src}
        alt="BBB Accredited Business — A+ rating"
        width={ART.w}
        height={ART.h}
        style={{ width, height: renderHeight, display: "block" }}
        unoptimized
      />
    </a>
  );
}
