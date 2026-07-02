import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { StarRating } from "@/components/ui/StarRating";
import { TestimonialsClient } from "./TestimonialsClient";
import { buildTestimonialsSchema, jsonLdString } from "@/lib/schema";

/**
 * /testimonials — real, verbatim reviews from New England homeowners.
 *
 * Source of truth: siteConfig.testimonials (all isReal:true, from the Window
 * Fantasies Google, Yelp, and Facebook profiles). H1 = .hero-shimmer. ZERO em
 * dashes (CLAUDE.md §13). Schema (Review + AggregateRating) emitted from the
 * real set. Some reviews are rating-only, rendered as rating cards, never
 * fabricated.
 */

const reviews = siteConfig.testimonials.filter((t) => t.isReal);
const count = reviews.length;
const avg =
  count > 0
    ? Math.round((reviews.reduce((s, t) => s + t.rating, 0) / count) * 10) / 10
    : 0;

export const metadata: Metadata = {
  title: "Testimonials",
  description: `Rated ${avg.toFixed(1)} on Google. Read what New England homeowners and contractors say about working with ${siteConfig.business.founderName} at ${siteConfig.business.name} on their custom Hunter Douglas window treatments.`,
};

export default function TestimonialsPage() {
  const schema = buildTestimonialsSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }}
      />

      {/* 1. Hero + aggregate rating */}
      <Section tone="base" className="pt-32 sm:pt-36 lg:pt-40">
        <Container size="narrow">
          <div className="text-center flex flex-col items-center gap-6">
            <FadeUp>
              <Eyebrow>Testimonials</Eyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1
                className="text-h1 hero-shimmer font-display"
                style={{ maxWidth: "20ch" }}
              >
                What New England homeowners say about Jim.
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="flex flex-col items-center gap-2">
                <StarRating rating={avg} size="1.5rem" />
                <p
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Rated {avg.toFixed(1)} on Google, across {count} real reviews
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p
                className="font-body"
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.125rem",
                  lineHeight: 1.6,
                  maxWidth: "55ch",
                }}
              >
                Every review below is verbatim from real New England homeowners and contractors on Google, Yelp, and Facebook. No edits, no cherry-picking, nothing fabricated.
              </p>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* 2. Reviews masonry — CREAM band, white cards */}
      <Section tone="cream">
        <Container size="wide">
          <TestimonialsClient items={reviews} tone="light" />
        </Container>
      </Section>

      {/* 3. Proof-honest band — DARK */}
      <Section tone="base">
        <Container size="narrow">
          <div className="text-center">
            <p className="eyebrow" style={{ color: "var(--primary)" }}>
              Real reviews, nothing fabricated
            </p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-primary)" }}>
              A small, real, five-star record.
            </h2>
            <p
              className="mt-4 font-body mx-auto"
              style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "58ch" }}
            >
              Rated {avg.toFixed(1)} on Google, in customers' own words, across {count} verified reviews on Google, Yelp, and Facebook. No wall of invented quotes, just honest proof from real New England homeowners and contractors.
            </p>
          </div>
        </Container>
      </Section>

      {/* 4. Consultation CTA — CREAM, steps into the dark footer */}
      <Section tone="cream">
        <Container size="narrow">
          <div className="text-center">
            <h2
              className="text-h2 font-display"
              style={{ color: "var(--text-on-light)" }}
            >
              Want to be the next 5-star review?
            </h2>
            <p
              className="mt-4 font-body"
              style={{
                color: "var(--muted-on-light)",
                fontSize: "1.0625rem",
                lineHeight: 1.6,
              }}
            >
              Request a free in-home consultation. Jim brings the real Hunter Douglas samples to your home, measures your windows, and gives you an honest installed price at your kitchen table. No pressure, guaranteed for life.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/request-a-consultation" variant="primary" size="lg">
                Request a Free In-Home Consultation
              </Button>
              <Button href={`tel:${siteConfig.business.phone}`} variant="secondary" size="lg" tone="light">
                Call Jim at {siteConfig.business.phoneFormatted}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
