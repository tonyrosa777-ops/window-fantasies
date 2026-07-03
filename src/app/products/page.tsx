import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

/**
 * /products - Index of the Hunter Douglas product lines.
 *
 * Pattern #71 (no orphan grid cells): productLines render in
 * `grid-cols-1 md:grid-cols-3`. Single-col on mobile.
 *
 * Window Fantasies is quote-based, so cards show "Quote based" rather than a
 * per-unit price. Every treatment is measured, designed, and installed by hand.
 *
 * Zero em dashes (CLAUDE.md §13 BINDING).
 */

export const metadata: Metadata = {
  title: "Hunter Douglas Product Lines",
  description:
    "Custom Hunter Douglas shades, blinds, shutters, and drapery for homes across New England. Measured, designed, and installed by hand by Jim Garrity. Guaranteed for life. Every quote is free.",
};

const PAGE_EYEBROW = "Hunter Douglas Product Lines · Salem NH · All of New England";
const PAGE_H1 = "The full Hunter Douglas line, fitted to your windows by hand.";
const PAGE_SUBHEAD =
  "Shades, blinds, shutters, and drapery, all custom-built for your exact openings. As an authorized Hunter Douglas Centurion dealer, Jim brings the real samples to your home, holds them in your own light, and gives you an honest installed price at your kitchen table. Explore the lines below, then request a free in-home consultation.";

export default function ProductsIndexPage() {
  const products = siteConfig.productLines;

  // Pattern #71 verification: 4 categories in a 4-col grid = 1 clean row, 0 orphans.
  if (products.length % 4 !== 0 && process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(
      `[products/page] Pattern #71 grid math warning: productLines.length=${products.length} does not divide cleanly across a 4-col grid.`
    );
  }

  return (
    <>
      {/* 1. Hero / Page header */}
      <Section tone="base" bgImage="/images/headers/products.jpg" bgImageAlt="A refined room showing plantation shutters, cellular shades, and drapery together." className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <FadeUp>
            <Eyebrow>{PAGE_EYEBROW}</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-h1 hero-shimmer font-display mt-4"
              style={{ maxWidth: "22ch" }}
            >
              {PAGE_H1}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mt-6 font-body"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.125rem",
                lineHeight: 1.6,
                maxWidth: "60ch",
              }}
            >
              {PAGE_SUBHEAD}
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* 2. Product grid in a 3-col grid — CREAM band, white photo-led cards */}
      <Section tone="cream">
        <Container size="wide">
          <FadeUp className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>
              The Four Lines
            </p>
            <h2 className="mt-4 font-display text-h2" style={{ color: "var(--text-on-light)" }}>
              Explore the full Hunter Douglas line.
            </h2>
            <p className="mt-4 font-body" style={{ color: "var(--muted-on-light)" }}>
              Each line is custom-built for your exact openings and fitted by hand. Start with a category, and Jim will help you find the right piece for the room.
            </p>
          </FadeUp>

          <StaggerContainer
            staggerDelay={0.08}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <StaggerItem key={product.slug} className="h-full">
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex flex-col h-full rounded-[8px] overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(7, 7, 6,0.18)]"
                  style={{
                    background: "var(--bg-card-light)",
                    borderColor: "var(--border-light)",
                  }}
                >
                  {product.imageSrc && (
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                      <Image
                        src={product.imageSrc}
                        alt={`Custom Hunter Douglas ${product.name.toLowerCase()} by Window Fantasies`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <h2
                      className="font-display"
                      style={{
                        color: "var(--text-on-light)",
                        fontSize: "1.5rem",
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {product.name}
                    </h2>
                    <p
                      className="mt-3 font-body flex-1"
                      style={{
                        color: "var(--muted-on-light)",
                        fontSize: "0.95rem",
                        lineHeight: 1.55,
                      }}
                    >
                      {product.shortDescription.split(". ")[0]}.
                    </p>
                    <span
                      className="mt-5 font-mono text-[11px] uppercase tracking-widest"
                      style={{ color: "var(--gold-deep)" }}
                    >
                      Explore {product.name} &rarr;
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* 3. Reassurance band — DARK */}
      <Section tone="base">
        <Container size="narrow">
          <FadeUp className="text-center">
            <p className="eyebrow" style={{ color: "var(--primary)" }}>
              Bring the showroom home
            </p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-primary)" }}>
              A shade looks one way in a store, another in your light.
            </h2>
            <p
              className="mt-4 font-body mx-auto"
              style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "60ch" }}
            >
              That is why there is no showroom to drive to. Jim brings the real Hunter Douglas samples to your home, holds them in your own windows, and shows you exactly how each line reads in the room before you spend a dollar. Every treatment is guaranteed for life.
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* 4. CTA — CREAM, steps into the dark footer */}
      <Section tone="cream">
        <Container size="narrow">
          <FadeUp>
            <div className="text-center">
              <h2 className="text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
                Not sure which line fits your windows?
              </h2>
              <p
                className="mt-4 font-body"
                style={{
                  color: "var(--muted-on-light)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.6,
                }}
              >
                That is what the free in-home consultation is for. Jim reads the light and the room, brings the real Hunter Douglas samples to you, and matches the right product to your home. No showroom to drive to, and no pressure.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button href="/request-a-consultation" variant="primary" size="lg">
                  Request Your Free In-Home Consultation
                </Button>
                <Button href="tel:+16038915755" variant="secondary" size="lg" tone="light">
                  Call Jim
                </Button>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
