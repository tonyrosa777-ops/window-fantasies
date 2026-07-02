"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { siteConfig } from "@/data/site";
import { TrustSignals } from "@/components/sections/TrustBar";

/* ═══════════════════════════════════════════════════
   Hero — Window Fantasies (Band 1).

   PHOTO-RICH PLACEHOLDER hero. A real Hunter Douglas install photo is the
   full-bleed background (p04, with p10/p11 as alternates), under a dual-axis
   dark gradient scrim. H1 = the LOCKED tagline with .hero-shimmer. Subhead =
   the Centurion / guaranteed-for-life trust line. Primary CTA goes to
   /request-a-consultation, secondary CTA is tap-to-call Jim. Above-the-fold
   trust chips.

   TODO Part F: swap in /videos/hero-loop.mp4 movie hero.
   Part F replaces the img background with the stitched cinematic movie hero
   (video + webm + webp poster, reduced-motion falls back to this same photo).
   ═══════════════════════════════════════════════════ */

const TRUST_CHIPS = [
  "30+ years",
  "Centurion dealer",
  "Guaranteed for life",
  "BBB A+",
  "Retired firefighter owner",
];

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
        src="/images/hunter-douglas/p04.jpg"
        alt="A premium New England living room dressed in Hunter Douglas Silhouette sheer shades, soft golden-hour light diffusing through the fabric."
        className="absolute inset-0 w-full h-full object-cover z-0 hidden motion-reduce:block"
        fetchPriority="high"
      />

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
      <div
        ref={ref}
        className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full"
        style={{
          paddingTop: "clamp(7.5rem, 14svh, 10rem)",
          paddingBottom: "clamp(3rem, 9svh, 8rem)",
        }}
      >
        <div className="max-w-2xl flex flex-col" style={{ gap: "clamp(0.85rem, 2.4svh, 1.75rem)" }}>
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
              {ctaSecondary.label} · {siteConfig.business.phoneFormatted}
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
