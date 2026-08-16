/**
 * FinalCTA: Band 11 (light, cream). The closing consultation CTA. Light band so
 * it steps tone into the dark footer. H1 uses .hero-shimmer-ink (gold sweep on
 * warm ink) since this sits on a light background. Asymmetric split: copy left,
 * twilight "come home to it" photo right (design-symmetry rule F, items-center);
 * degrades to a single centered column below lg.
 */

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

/**
 * ⚠️ COMPLIANCE NOTE. "Hunter Douglas Showroom" is an expressly prohibited
 * statement in HD dealer advertising, and a headline offering "the showroom"
 * directly above a line about Hunter Douglas samples reads as exactly that.
 * The headline is data (siteConfig.cta.h1) and now correctly says "samples".
 *
 * A render-time guard that rewrote the string on the fly was removed on purpose.
 * Silently correcting bad data hides it: the page looks fine while site.ts still
 * ships the violation, and the next surface to read that same field renders it
 * anyway. Regression protection belongs in `npm run check:hd`, which fails the
 * BUILD on the banned phrase and names the file, rather than in a component that
 * quietly papers over it.
 */
export function FinalCTA() {
  const { cta, business } = siteConfig;
  const headline = cta.h1;

  return (
    <section id="final-cta" className="relative py-20 md:py-28" style={{ background: "var(--bg-cream)" }}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start gap-7">
            <h2 className="hero-shimmer-ink font-display text-h1" style={{ lineHeight: 1.12 }}>
              {headline}
            </h2>
            <p className="font-body text-base md:text-lg max-w-prose" style={{ color: "var(--muted-on-light)", lineHeight: 1.6 }}>
              {cta.subhead}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <a
                href={cta.ctaPrimary.href}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:brightness-110 hover:-translate-y-px"
                style={{ background: "var(--primary)", color: "var(--ink)" }}
              >
                {cta.ctaPrimary.label}
              </a>
              <a
                href={cta.ctaSecondary.href}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--gold-deep)_10%,transparent)]"
                style={{ border: "1px solid var(--gold-deep)", color: "var(--gold-deep)" }}
              >
                {cta.ctaSecondary.label}
              </a>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--muted-on-light)" }}>
              Call us directly · <span className="phone-display">{business.phoneFormatted}</span>
            </p>
          </div>
          <div
            className="relative rounded-2xl overflow-hidden border"
            style={{
              aspectRatio: "4 / 3",
              borderColor: "var(--border-light)",
              boxShadow: "0 24px 60px rgba(7, 7, 6, 0.16)",
            }}
          >
            <Image
              src="/images/sections/home-twilight-glow.webp"
              alt="A New England home's bay window glowing at dusk through sheer shades."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FinalCTA;
