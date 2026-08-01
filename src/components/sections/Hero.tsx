"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { siteConfig } from "@/data/site";
import { TrustSignals } from "@/components/sections/TrustBar";
import { HunterDouglasLogo } from "@/components/brand/HunterDouglasLogo";
import { HDPhotoCredit } from "@/components/brand/HDPhotoCredit";

/* ═══════════════════════════════════════════════════
   Hero — Window Fantasies (Band 1).

   Full-bleed stitched cinematic movie hero over a real Hunter Douglas install
   photo, under a dual-axis dark gradient scrim. H1 = the LOCKED tagline with
   .hero-shimmer. Primary CTA goes to /request-a-consultation, secondary CTA
   goes to /quiz (both labels + hrefs render generically from siteConfig.hero).

   ⚠️ THIS BAND CARRIES TWO HUNTER DOUGLAS COMPLIANCE REQUIREMENTS.
   HD's 2026-07-31 waiver review failed this site on both. Do not remove either.

   1. THE HUNTER DOUGLAS BRAND LOGO, ABOVE THE FOLD.
      HD's criterion: "The Hunter Douglas Brand logo must be featured on the
      homepage above the fold and separate from the dealer's logo. It must be
      current and prominent." Their reviewer added: "where it can be seen upon
      first view without having to scroll."
      It sits TOP-RIGHT of the hero, diagonally opposite the Window Fantasies
      wordmark in the fixed nav (top-left) — that diagonal IS the "separate from
      the dealer's logo" requirement, so do not move the two together. It must
      remain visible without scrolling at EVERY viewport, including the short
      1536x720 scaled-laptop gate. It is `priority` because a logo that lazy-loads
      below the fold fails the criterion as surely as a missing one.

   2. PHOTO ATTRIBUTION ON THE HERO IMAGE.
      HD requires their product photography be "clearly labeled with the specific
      product it was designed to promote." The hero photo is a licensed HD image,
      so it carries an on-photo credit. HD expressly permits this overlay: "text
      boxes with acceptable information may slightly overlap the Hunter Douglas
      image." This is the FIRST instance on the page, which is what HD requires.
   ═══════════════════════════════════════════════════ */

const TRUST_CHIPS = [
  "30+ years",
  "Authorized Hunter Douglas Dealer",
  "Limited Lifetime Warranty",
  "BBB A+",
  "Retired firefighter owner",
];

/**
 * Credit for the Hunter Douglas hero imagery.
 *
 * ⚠️ Deliberately CATEGORY-level, not a named product line, for two reasons:
 *
 * 1. The hero is a stitched three-clip loop (shutters, then sheers, then
 *    drapes). No single product name is truthful across the whole thing.
 * 2. The poster frame shows real-wood plantation shutters on a bypass track.
 *    Hunter Douglas makes those as Heritance® Hardwood Shutters (real hardwood)
 *    AND NewStyle® Hybrid Shutters (wood composite, made to read as hardwood),
 *    and the two are not reliably distinguishable from a photograph.
 *
 * Naming the wrong line would be its own trademark violation, on the exact
 * criterion HD flagged. So this credits Hunter Douglas as the manufacturer and
 * describes the product honestly, inventing nothing. Upgrade it to the specific
 * line only once Hunter Douglas confirms which one this asset shows. Same
 * discipline as Carole Fabrics in src/data/hunterDouglas.ts.
 */
const HERO_PHOTO_CREDIT = "Hunter Douglas hardwood shutters";

export default function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const { tagline } = siteConfig.business;
  const { eyebrow, subhead, trustMicrocopy, ctaPrimary, ctaSecondary, h1WithEmphasis } =
    siteConfig.hero;

  // Split tagline so the emphasized word ("hand") renders italic.
  const renderH1 = () => {
    const emphasized = new Set((h1WithEmphasis.emphasis || []).map((w) => w.toLowerCase()));
    if (emphasized.size === 0) return <span>{tagline}</span>;
    const parts = tagline.split(/(\s+)/);
    return (
      <>
        {parts.map((part, i) => {
          const wordCore = part.replace(/[^\p{L}]/gu, "").toLowerCase();
          if (wordCore && emphasized.has(wordCore)) {
            return (
              <em key={i} className="not-italic" style={{ fontStyle: "italic" }}>
                {part}
              </em>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--ink)" }}
      aria-label="Window Fantasies, the finest window treatments in New England, by hand"
    >
      {/* Layer 1: Full-bleed stitched movie hero (Part F, 2026-07-02) — 3-clip
          "Light, by hand" loop (shutters → sheers → drapes), Cinema Studio V2,
          start_image-locked on Jim's real photos. Reduced-motion falls back to
          the p04 photo (the poster's sister frame). */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 motion-reduce:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/hero-poster.webp"
        aria-hidden="true"
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
        <source src="/videos/hero-loop.webm" type="video/webm" />
      </video>
      <img
        src="/images/hero-poster.webp"
        alt="A premium New England living room dressed in Hunter Douglas hardwood shutters, warm golden-hour light raking through the open louvers."
        className="absolute inset-0 w-full h-full object-cover z-0 hidden motion-reduce:block"
        fetchPriority="high"
      />

      {/* ⚠️ HD COMPLIANCE — brand logo, above the fold, separate from the dealer
          wordmark.

          TABLET / DESKTOP (sm+) ONLY. Absolutely positioned at the hero's
          top-right, diagonally opposite the Window Fantasies wordmark in the nav.
          That diagonal IS the "separate from the dealer's logo" requirement. The
          `top` offset clears the fixed nav (h-20 / md:h-24 / lg:h-28).

          MOBILE (<sm) is handled separately, IN FLOW at the top of the copy
          column below. This absolute placement overlapped the H1 at 390px, and
          a logo sitting on top of the headline is not "prominent", it is a
          layout bug. In-flow cannot overlap anything and is still the first
          thing a visitor sees.

          The plate exists because HD Gray #5B6770 is unreadable on --ink and
          recolouring their art is a compliance violation. */}
      <motion.div
        className="hidden sm:block absolute z-20 right-6 lg:right-12"
        style={{ top: "calc(clamp(5rem, 8svh, 7rem) + clamp(0.75rem, 2svh, 1.5rem))" }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <span className="flex flex-col items-center gap-1.5">
          <HunterDouglasLogo
            variant="horizontal"
            width={200}
            plate
            priority
            className="block"
          />
          {/* The hero background is a moving video, so this line can land on a
              bright frame at any moment. It carries its own scrim rather than
              relying on the band gradient, which varies across the loop. */}
          <span
            className="font-mono uppercase tracking-widest text-center rounded-full"
            style={{
              fontSize: "0.625rem",
              color: "var(--text-primary)",
              letterSpacing: "0.14em",
              padding: "0.25rem 0.6rem",
              background: "rgba(7, 7, 6, 0.62)",
              backdropFilter: "blur(3px)",
            }}
          >
            Authorized Dealer
          </span>
        </span>
      </motion.div>


      {/* Layer 2: Dual-axis dark gradient scrim + faint gold glow behind the headline (z-5). */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(7, 7, 6,0.55) 0%, rgba(7, 7, 6,0.15) 30%, rgba(7, 7, 6,0.30) 60%, rgba(7, 7, 6,0.82) 100%)",
            "linear-gradient(to right, rgba(7, 7, 6,0.78) 0%, rgba(7, 7, 6,0.42) 35%, rgba(7, 7, 6,0.08) 62%, rgba(7, 7, 6,0) 80%)",
            "radial-gradient(ellipse 45% 40% at 26% 52%, rgba(205, 173, 105,0.10) 0%, rgba(205, 173, 105,0) 70%)",
          ].join(", "),
        }}
      />

      {/* Layer 3: Content, lower-left — 100svh centering lives on THIS wrapper so the
          trust strip below stays inside the same band without moving the fold (Error #133 gates). */}
      <div className="relative min-h-[100svh] flex items-center">
      {/* ⚠️ HD COMPLIANCE — attribution for the licensed Hunter Douglas hero
          photograph. Anchored INSIDE the 100svh wrapper, not to the outer
          <section>: the section also contains the trust-signal strip, so a
          credit anchored there lands below the fold, away from the photo it
          labels. HD requires their photography be labeled with the specific
          product, and a label the visitor never sees alongside the image does
          not satisfy that. */}
      <HDPhotoCredit credit={HERO_PHOTO_CREDIT} variant="overlay" />
      <div
        ref={ref}
        className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full"
        style={{
          paddingTop: "clamp(7.5rem, 14svh, 10rem)",
          paddingBottom: "clamp(3rem, 9svh, 8rem)",
        }}
      >
        <div className="max-w-2xl flex flex-col" style={{ gap: "clamp(0.85rem, 2.4svh, 1.75rem)" }}>
          {/* ⚠️ HD COMPLIANCE — brand logo, MOBILE (<sm) only.
              In flow at the head of the copy column, so it can never overlap the
              H1 the way an absolutely-positioned lockup did at 390px. Uses HD's
              approved horizontal art at 150px, comfortably above their 135px
              on-screen minimum. Left-aligned to the copy column, while the
              Window Fantasies wordmark sits in the nav above it, keeping the two
              marks visually separate. */}
          <motion.div
            className="sm:hidden flex items-center gap-2.5"
            initial={{ opacity: 0, y: -6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <HunterDouglasLogo variant="horizontal" width={150} plate priority className="block" />
            <span
              className="font-mono uppercase tracking-widest rounded-full whitespace-nowrap"
              style={{
                fontSize: "0.5625rem",
                color: "var(--text-primary)",
                letterSpacing: "0.12em",
                padding: "0.25rem 0.55rem",
                background: "rgba(7, 7, 6, 0.62)",
                backdropFilter: "blur(3px)",
              }}
            >
              Authorized Dealer
            </span>
          </motion.div>

          {eyebrow && (
            <motion.p
              className="eyebrow"
              style={{ color: "var(--gold-bright)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            className="hero-shimmer font-display"
            style={{
              fontSize: "clamp(2.75rem, 2.2vw + 3.4svh, 5.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              color: "var(--text-primary)",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {renderH1()}
          </motion.h1>

          {subhead && (
            <motion.p
              className="max-w-xl font-body"
              style={{
                color: "var(--text-secondary)",
                fontSize: "clamp(1rem, 0.6vw + 1.1svh, 1.3rem)",
                lineHeight: 1.5,
                textShadow: "0 1px 10px rgba(0,0,0,0.6)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {subhead}
            </motion.p>
          )}

          <motion.div
            className="flex flex-wrap gap-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <a
              href={ctaPrimary.href}
              className="inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-semibold transition-all duration-200 hover:brightness-110 hover:scale-[1.02] font-body shadow-lg"
              style={{ background: "var(--primary)", color: "var(--ink)", borderRadius: "0.5rem" }}
            >
              {ctaPrimary.label}
            </a>
            <a
              href={ctaSecondary.href}
              className="inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-semibold transition-all duration-200 hover:bg-[var(--primary)] hover:text-[var(--ink)] font-body"
              style={{
                background: "rgba(7, 7, 6,0.45)",
                backdropFilter: "blur(4px)",
                color: "var(--primary)",
                border: "1px solid var(--primary)",
                borderRadius: "0.5rem",
              }}
            >
              {ctaSecondary.label}
            </a>
          </motion.div>

          {/* Above-the-fold trust chips */}
          <motion.ul
            className="flex flex-wrap gap-x-2.5 gap-y-2 pt-1"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            {TRUST_CHIPS.map((chip) => (
              <li
                key={chip}
                className="font-mono text-[11px] uppercase tracking-widest rounded-full px-3 py-1.5 border"
                style={{
                  color: "var(--text-primary)",
                  borderColor: "var(--border-gold)",
                  background: "rgba(7, 7, 6,0.35)",
                  backdropFilter: "blur(3px)",
                }}
              >
                {chip}
              </li>
            ))}
          </motion.ul>

          {trustMicrocopy && (
            <motion.p
              className="mt-1 text-xs md:text-sm"
              style={{
                color: "var(--text-secondary)",
                letterSpacing: "0.03em",
                textShadow: "0 1px 8px rgba(0,0,0,0.6)",
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.15, duration: 0.5 }}
            >
              {trustMicrocopy}
            </motion.p>
          )}
        </div>
      </div>
      </div>

      {/* Bottom strip: six proof points — same band (Pattern #98 parity merge). */}
      <TrustSignals />
    </section>
  );
}
