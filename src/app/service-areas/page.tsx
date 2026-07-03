import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

/**
 * /service-areas — Index of the New England cities Jim serves.
 *
 * The grid uses grid-cols-2 sm:grid-cols-3, which lays out cleanly for any
 * count (short trailing rows are fine and centered by the flow). Salem is the
 * first card with a "Home base" badge but the same size as peers.
 *
 * Zero em dashes (CLAUDE.md §13 BINDING).
 */

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Custom Hunter Douglas window treatments across all of New England: New Hampshire, Massachusetts, Maine, Vermont, and Cape Cod. Jim brings the showroom to your home, measures and installs by hand, guaranteed for life.",
};

const PAGE_EYEBROW = "Service Areas. All of New England.";
const PAGE_H1 = "Custom window treatments across all of New England.";
const PAGE_SUBHEAD =
  "There is no showroom to drive to, and that is on purpose. Jim brings the real Hunter Douglas samples to your home, holds them in your own windows, and measures and installs everything by hand. From the office in Salem NH he serves New Hampshire, Massachusetts, Maine, Vermont, and Cape Cod.";

export default function ServiceAreasIndexPage() {
  const areas = siteConfig.serviceAreas;
  const totalCount = areas.length;

  return (
    <>
      {/* 1. Hero / Page header */}
      <Section tone="base" bgImage="/images/headers/service-areas.jpg" bgImageAlt="A classic New England neighborhood in early autumn at golden hour." className="pt-32 sm:pt-36 lg:pt-40">
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
          <FadeUp delay={0.3}>
            <p
              className="mt-6 font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              {totalCount} cities and towns across New England. Free in-home consultation.
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* 2. City grid — CREAM band, white cards, grid-cols-2 sm:grid-cols-3 */}
      <Section tone="cream">
        <Container size="wide">
          {/* `immediate`: this grid is ~10 viewports tall, so any scroll-gated
              threshold dead-gates it and the page loads looking empty (the
              tall-container trap documented in Stagger.tsx). Stagger in on
              mount instead; 0.02 keeps a fast alive ripple, fully populated
              well under a second. */}
          <StaggerContainer
            immediate
            staggerDelay={0.02}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
          >
            {areas.map((area) => {
              const isHomeBase = area.slug === "salem-nh";
              const firstSentence =
                area.description.split(". ")[0]?.replace(/\[DEMO COPY.*\]/i, "").trim() ?? "";
              const blurb = firstSentence.endsWith(".") ? firstSentence : `${firstSentence}.`;

              return (
                <StaggerItem key={area.slug}>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="group block h-full rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(7, 7, 6,0.14)]"
                    style={{
                      background: "var(--bg-card-light)",
                      borderColor: "var(--border-light)",
                    }}
                    aria-label={`Service area page for ${area.city}, ${area.state}`}
                  >
                    <img
                      src={`/images/towns/${area.slug}.jpg`}
                      alt={`A ${area.city}, ${area.state} home with Hunter Douglas window treatments`}
                      className="w-full aspect-[3/2] object-cover rounded-xl mb-4"
                      loading="lazy"
                    />
                    {isHomeBase && (
                      <span
                        className="inline-block font-mono text-[10px] uppercase tracking-widest mb-3 px-2 py-1 rounded"
                        style={{
                          color: "var(--ink)",
                          background: "var(--primary)",
                        }}
                      >
                        Home Base
                      </span>
                    )}
                    <h2
                      className="font-display"
                      style={{
                        color: "var(--text-on-light)",
                        fontSize: "1.25rem",
                        lineHeight: 1.25,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {area.city}, {area.state}
                    </h2>
                    <div
                      className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest"
                      style={{ color: "var(--muted-on-light)" }}
                    >
                      <span>{area.distance}</span>
                      <span aria-hidden="true">|</span>
                      <span>Pop. {Math.round(area.population / 1000)}k</span>
                    </div>
                    <p
                      className="mt-3 font-body"
                      style={{
                        color: "var(--muted-on-light)",
                        fontSize: "0.9375rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {blurb}
                    </p>
                    <p
                      className="mt-4 font-mono text-xs uppercase tracking-widest transition-colors duration-200 group-hover:text-[var(--gold-deep)]"
                      style={{ color: "var(--gold-deep)" }}
                    >
                      View {area.city} &rarr;
                    </p>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </Section>

      {/* 3. Coverage reassurance — DARK band */}
      <Section tone="base">
        <Container size="narrow">
          <FadeUp className="text-center">
            <p className="eyebrow" style={{ color: "var(--primary)" }}>
              No place he will not travel
            </p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-primary)" }}>
              From the tip of the Cape to Maine and Vermont.
            </h2>
            <p
              className="mt-4 font-body mx-auto"
              style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "60ch" }}
            >
              Jim works out of Salem, New Hampshire and serves New Hampshire, Massachusetts, Maine, Vermont, and Cape Cod. Longer trips may carry a travel charge, and he will tell you that upfront before anything happens.
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
                Not in one of these towns?
              </h2>
              <p
                className="mt-4 font-body"
                style={{
                  color: "var(--muted-on-light)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.6,
                }}
              >
                Reach out anyway. There is no place in New England Jim will not travel. If you are farther out, a longer trip may carry a travel charge, and Jim will tell you that upfront before anything happens.
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
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
