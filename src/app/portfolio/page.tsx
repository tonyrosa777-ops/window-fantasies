import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { WorkCard } from "@/components/work/WorkCard";

/**
 * /portfolio — real Hunter Douglas installs in real New England rooms.
 * Photo-led masonry. H1 = .hero-shimmer. Zero em dashes (CLAUDE.md §13).
 */

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Custom Hunter Douglas shades, blinds, shutters, and drapery installed in New England homes by Jim Garrity of Window Fantasies. Measured, designed, and installed by hand.",
};

export default function PortfolioPage() {
  const { workItems } = siteConfig;

  return (
    <>
      <Section tone="base" bgImage="/images/headers/portfolio.jpg" bgImageAlt="A luxury living room with golden light through sheer shades." className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <FadeUp>
            <Eyebrow>Portfolio</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-h1 hero-shimmer font-display mt-4" style={{ maxWidth: "22ch" }}>
              The window treatments Jim installs across New England.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 font-body" style={{ color: "var(--text-secondary)", fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "65ch" }}>
              A look at the custom Hunter Douglas treatments Jim measures, designs, and installs. Every one is fitted by hand for the exact window it dresses. See these in your own light at a free in-home consultation.
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* Gallery — CREAM band, photo-led masonry on white cards */}
      <Section tone="cream">
        <Container size="wide">
          <FadeUp>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-6xl mx-auto">
              {workItems.map((item) => (
                <WorkCard key={item.brand} item={item} tone="light" />
              ))}
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* Fitted by hand — DARK quote band */}
      <Section tone="base">
        <Container size="narrow">
          <FadeUp className="text-center">
            <p className="eyebrow" style={{ color: "var(--primary)" }}>
              Every one, fitted by hand
            </p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-primary)" }}>
              Custom for the exact window it dresses.
            </h2>
            <p
              className="mt-4 font-body mx-auto"
              style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "58ch" }}
            >
              No two of these rooms are alike, and neither are their treatments. Jim measures, designs, and installs each one himself, then stands behind it for life.
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* CTA — CREAM, steps into the dark footer */}
      <Section tone="cream">
        <Container size="narrow">
          <FadeUp>
            <div className="text-center">
              <h2 className="text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
                Ready to picture it in your home?
              </h2>
              <p className="mt-4 font-body" style={{ color: "var(--muted-on-light)", fontSize: "1.0625rem", lineHeight: 1.6 }}>
                Jim brings the real samples to you, holds them in your windows, and gives you an honest installed price. Free, and no pressure.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button href="/request-a-consultation" variant="primary" size="lg">
                  Request a Free Consultation
                </Button>
                <Button href="/products" variant="secondary" size="lg" tone="light">
                  Browse the Products
                </Button>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
