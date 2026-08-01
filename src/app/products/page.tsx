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
import { PowerViewDisclosure } from "@/components/brand/PowerViewDisclosure";
import { HDPhotoCredit } from "@/components/brand/HDPhotoCredit";
import { SITE_CATEGORIES, groupedByHdCategory } from "@/data/products";

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
    "Custom Hunter Douglas shades, blinds, shutters, and drapery for homes across New England. Measured, designed, and installed by hand by Jim Garrity. Backed by the Hunter Douglas Limited Lifetime Warranty. Every quote is free.",
};

const PAGE_EYEBROW = "Hunter Douglas Product Lines · Salem NH · All of New England";
const PAGE_H1 = "The full Hunter Douglas line, fitted to your windows by hand.";
const PAGE_SUBHEAD =
  "Shades, blinds, shutters, and drapery, all custom-built for your exact openings. As an Authorized Hunter Douglas Dealer, Jim brings the real samples to your home, holds them in your own light, and gives you an honest installed price at your kitchen table. Explore the lines below, then request a free in-home consultation.";

/** Display names for the four consumer-facing categories. */
const CATEGORY_LABEL: Record<string, string> = {
  shades: "Shades",
  blinds: "Blinds",
  shutters: "Shutters",
  motorization: "Motorization",
};

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
      <Section tone="base" bgImage="/images/headers/products.webp" bgImageAlt="A refined room showing plantation shutters, cellular shades, and drapery together." className="pt-32 sm:pt-36 lg:pt-40">
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

      {/* 2. Product grid in a 3-col grid - CREAM band, white photo-led cards */}
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
              Each line is custom-built for your exact openings and fitted by hand. Start with a category, and Jim will help you find the right piece for the room. Most of these lines can be fitted with{" "}
              <Link
                href="/services/powerview-automation"
                className="underline underline-offset-4"
                style={{ color: "var(--gold-deep)" }}
              >
                Hunter Douglas PowerView® Automation
              </Link>
              , so the tall and hard-to-reach windows move at the touch of a button.
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
                        alt={`Custom Hunter Douglas ${product.name.toLowerCase()}, measured and installed by Window Fantasies`}
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

          {/* Hunter Douglas MANDATORY LEGAL COPY. This band names PowerView®
              Automation and links to it, so HD's exact sentence rides along.
              tone="light": the band is CREAM, so the component paints itself
              --muted-on-light (#6E5C3F) rather than the near-white --text-muted
              that belongs on the dark bands. Verbatim, visible, never removed. */}
          <FadeUp className="mt-10 flex justify-center">
            <PowerViewDisclosure tone="light" className="text-center" />
          </FadeUp>
        </Container>
      </Section>

      {/* 2b. THE FULL CATALOGUE - DARK.
          Every Hunter Douglas line Jim sells, grouped under HD's own category
          names. The four cards above are the broad entry points; this is the
          actual catalogue, and each line has its own page. Grouping by HD's
          taxonomy rather than listing 23 tiles flat is what makes a category
          this deep browsable: "shades" alone spans Sheers & Shadings, Cellular
          Honeycomb, Roller & Solar, Roman and Woven Woods. */}
      <Section tone="base">
        <Container size="wide">
          <FadeUp className="text-center max-w-3xl mx-auto mb-12">
            <p className="eyebrow" style={{ color: "var(--primary)" }}>The full line</p>
            <h2 className="mt-4 font-display text-h2">
              Every Hunter Douglas product Jim installs.
            </h2>
            <p className="mt-4 font-body" style={{ color: "var(--text-secondary)" }}>
              Not a catalogue to order from, a starting point for the conversation.
              Jim brings the real samples to your home so you can see any of these in
              your own light before you spend a dollar.
            </p>
          </FadeUp>

          <div className="flex flex-col gap-12">
            {SITE_CATEGORIES.map((cat) => {
              const groups = groupedByHdCategory(cat);
              if (!groups.length) return null;
              return (
                <FadeUp key={cat}>
                  <h3 className="font-display text-h3 mb-6 pb-3 border-b" style={{ borderColor: "var(--border-gold)" }}>
                    {CATEGORY_LABEL[cat]}
                  </h3>
                  <div className="flex flex-col gap-8">
                    {groups.map((g) => (
                      <div key={g.hdCategory}>
                        <p className="font-mono text-[0.7rem] uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                          {g.hdCategory}
                        </p>
                        <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          {g.lines.map((line) => (
                            <StaggerItem key={line.slug} className="h-full">
                              <Link
                                href={`/products/${line.slug}`}
                                className="group flex flex-col h-full rounded-[8px] overflow-hidden border transition-all duration-300 hover:-translate-y-1"
                                style={{ background: "var(--bg-card)", borderColor: "var(--border-dark)" }}
                              >
                                {line.photos[0] ? (
                                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
                                    <Image
                                      src={line.photos[0].src}
                                      alt={line.photos[0].alt}
                                      fill
                                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                      loading="lazy"
                                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                  </div>
                                ) : null}
                                <div className="p-5 flex flex-col gap-2">
                                  <h4 className="font-display text-lg leading-tight">{line.name}</h4>
                                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                    {line.tagline}
                                  </p>
                                </div>
                              </Link>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    ))}
                  </div>
                </FadeUp>
              );
            })}
          </div>

          {/* One credit for the whole band: HD's first-instance rule, and a
              caption on all 23 tiles would read as clutter. */}
          <div className="mt-8">
            <HDPhotoCredit credit="Product photography by Hunter Douglas" />
          </div>
        </Container>
      </Section>

      {/* 3. Reassurance band - DARK */}
      <Section tone="base">
        <Container size="narrow">
          <FadeUp className="text-center">
            <p className="eyebrow" style={{ color: "var(--primary)" }}>
              Bring the samples home
            </p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-primary)" }}>
              A shade looks one way in a store, another in your light.
            </h2>
            <p
              className="mt-4 font-body mx-auto"
              style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "60ch" }}
            >
              That is why there is no store to drive to. Jim brings the real Hunter Douglas samples to your home, holds them in your own windows, and shows you exactly how each line reads in the room before you spend a dollar. Every treatment is backed by the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer&apos;s warranty terms.
            </p>
          </FadeUp>

          {/* Honest-cost anchor (shared costAnchor, site.ts) - compact strip
              inside this band so the page's tone alternation stays intact. */}
          <FadeUp delay={0.1}>
            <div
              className="mt-10 mx-auto max-w-2xl rounded-[8px] border px-6 py-6 sm:px-8 text-left"
              style={{ background: "var(--bg-card)", borderColor: "var(--border-dark)" }}
            >
              <p className="eyebrow" style={{ color: "var(--primary)" }}>
                {siteConfig.costAnchor.eyebrow}
              </p>
              <p
                className="mt-3 font-body"
                style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.65 }}
              >
                {siteConfig.costAnchor.bodyNoFigure}
              </p>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* 4. CTA - CREAM, steps into the dark footer */}
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
                That is what the free in-home consultation is for. Jim reads the light and the room, brings the real Hunter Douglas samples to you, and matches the right product to your home. No store to drive to, and no pressure.
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
