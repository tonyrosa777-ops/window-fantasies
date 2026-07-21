import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { PortfolioReel } from "@/components/work/PortfolioReel";
import { PortfolioWall } from "@/components/work/PortfolioWall";

/**
 * /portfolio — real Hunter Douglas installs in real New England rooms.
 * Photo-first rebuild: featured Embla reel (cream) + filterable true-aspect
 * photo wall (dark) + shared lightbox. Zero prose on tiles; metadata chips
 * only, blurbs live in the lightbox. Zero em dashes (CLAUDE.md §13).
 *
 * Rhythm: [Nav D] → Header D → Reel L → Wall D → CTA L → [Footer D]
 */

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Custom Hunter Douglas shades, blinds, shutters, and drapery installed in New England homes by Jim Garrity of Window Fantasies. Measured, designed, and installed by hand.",
};

export default function PortfolioPage() {
  const { workItems } = siteConfig;
  const featured = workItems.filter((item) => item.featured);
  const wall = workItems.filter((item) => !item.featured);

  return (
    <>
      {/* 1. Header — DARK photo band */}
      <Section tone="base" bgImage="/images/headers/portfolio.jpg" bgImageAlt="A luxury living room with golden light through sheer shades." className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <FadeUp>
            <Eyebrow>Portfolio</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-h1 hero-shimmer font-display mt-4" style={{ maxWidth: "22ch" }}>
              Real installs, in real New England homes.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 font-body" style={{ color: "var(--text-secondary)", fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "60ch" }}>
              Swipe through the treatments Jim measures, designs, and installs by hand. Tap any photo for the full frame and the story behind it.
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* 2. The Reel — CREAM band, edge-to-edge featured carousel */}
      <Section tone="cream">
        <Container>
          <FadeUp className="text-center mb-10">
            <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>
              The Reel
            </p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
              Six installs worth lingering on.
            </h2>
          </FadeUp>
        </Container>
        <PortfolioReel items={featured} />
      </Section>

      {/* 3. The Wall — DARK band, filterable true-aspect photo wall */}
      <Section tone="base">
        <Container size="wide">
          <FadeUp className="text-center mb-10">
            <p className="eyebrow" style={{ color: "var(--primary)" }}>
              The Wall
            </p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-primary)" }}>
              Every room tells you what it needs.
            </h2>
          </FadeUp>
          <PortfolioWall items={wall} />
        </Container>
      </Section>

      {/* 4. CTA — CREAM, steps into the dark footer. Absorbs the old
          "fitted by hand" quote band so alternation stays D L D L D. */}
      <Section tone="cream">
        <Container size="narrow">
          <FadeUp>
            <div className="text-center">
              <h2 className="text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
                Ready to picture it in your home?
              </h2>
              <p className="mt-4 font-body" style={{ color: "var(--muted-on-light)", fontSize: "1.0625rem", lineHeight: 1.6 }}>
                Every one of these was measured, designed, and installed by Jim himself, then guaranteed for life. He brings the real samples to you, holds them in your windows, and gives you an honest installed price. Free, and no pressure.
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
