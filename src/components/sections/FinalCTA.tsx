/**
 * FinalCTA — Band 11 (light, cream). The closing consultation CTA. Light band so
 * it steps tone into the dark footer. H1 uses .hero-shimmer-ink (gold sweep on
 * warm ink) since this sits on a light background.
 */

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export function FinalCTA() {
  const { cta, business } = siteConfig;

  return (
    <section id="final-cta" className="relative py-20 md:py-28" style={{ background: "var(--bg-cream)" }}>
      <Container size="narrow">
        <div className="text-center flex flex-col items-center gap-7">
          <h2 className="hero-shimmer-ink font-display text-h1" style={{ lineHeight: 1.12 }}>
            {cta.h1}
          </h2>
          <p className="font-body text-base md:text-lg max-w-prose" style={{ color: "var(--muted-on-light)", lineHeight: 1.6 }}>
            {cta.subhead}
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
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
            Call Jim directly · <span className="phone-display">{business.phoneFormatted}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}

export default FinalCTA;
