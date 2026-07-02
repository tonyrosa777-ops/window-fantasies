import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { CountUp } from "@/components/animations/CountUp";
import { JsonLd } from "@/components/JsonLd";
import { buildAboutSchema } from "@/lib/schema";

/**
 * /about — Founder story page.
 * Server Component. Voice = Jim first-person ("I").
 * Hero H1 uses .hero-shimmer (CLAUDE.md §6 + §15 BINDING).
 * ZERO em dashes in any string literal (CLAUDE.md §13 BINDING).
 */

export const metadata: Metadata = {
  title: `About ${siteConfig.business.founderName}`,
  description: `Meet ${siteConfig.business.founderName}, ${siteConfig.business.founderTitle} of ${siteConfig.business.name}. An authorized Hunter Douglas Centurion dealer with ${siteConfig.business.yearsInBusiness}+ years measuring, designing, and installing custom window treatments by hand across all of New England.`,
};

export default function AboutPage() {
  const { about, stats, business } = siteConfig;

  return (
    <>
      <JsonLd data={buildAboutSchema()} id="about-jsonld" />
      {/* 1. Hero / Page Header */}
      <Section tone="base" bgImage="/images/headers/about.jpg" bgImageAlt="A sunlit craftsman workspace with fabric sample books beside a shaded window." className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <FadeUp>
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-h1 hero-shimmer font-display mt-4"
              style={{ maxWidth: "20ch" }}
            >
              {about.h1}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mt-6 font-body"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.125rem",
                maxWidth: "60ch",
              }}
            >
              {business.founderName}. {business.founderTitle}. {business.address.city}, {business.address.state}.
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* 2. Story (2-col: portrait left, paragraphs right) — CREAM band */}
      <Section tone="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
            {/* Founder portrait (3:4 aspect) */}
            {/* TODO: real Jim portrait — swap in a commissioned 4:5 photo of Jim
                (design-system.md §6). Using a tasteful HD interior for now. */}
            <FadeUp>
              <div
                className="relative rounded-2xl overflow-hidden border"
                style={{
                  aspectRatio: "3 / 4",
                  background: "#FFFFFF",
                  borderColor: "color-mix(in oklab, var(--primary) 35%, var(--border-light))",
                  boxShadow: "0 28px 70px rgba(7, 7, 6,0.20)",
                }}
              >
                <Image
                  src={about.photo.src}
                  alt={about.photo.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>
            </FadeUp>

            {/* Paragraphs + credentials */}
            <div>
              <StaggerContainer staggerDelay={0.08}>
                {about.paragraphs.map((paragraph, i) => (
                  <StaggerItem key={i}>
                    <p
                      className="font-body"
                      style={{
                        color: "var(--text-on-light)",
                        fontSize: "1.0625rem",
                        lineHeight: 1.75,
                        maxWidth: "65ch",
                        marginBottom: "1.5rem",
                      }}
                    >
                      {paragraph}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Credentials list */}
              <FadeUp delay={0.2}>
                <div className="mt-10">
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-4"
                    style={{ color: "var(--gold-deep)" }}
                  >
                    Credentials
                  </p>
                  <ul className="space-y-3">
                    {about.credentials.map((cred, i) => (
                      <li
                        key={i}
                        className="flex gap-3 font-body"
                      >
                        <span
                          className="flex-shrink-0 mt-2"
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "999px",
                            background: "var(--primary)",
                          }}
                          aria-hidden="true"
                        />
                        <div>
                          <div
                            className="font-display"
                            style={{ color: "var(--text-on-light)", fontSize: "1rem", lineHeight: 1.4 }}
                          >
                            {cred.title}
                          </div>
                          <div
                            className="font-body text-sm mt-1"
                            style={{ color: "var(--muted-on-light)", lineHeight: 1.55 }}
                          >
                            {cred.description}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Stats row */}
      <Section tone="base">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => {
              const numeric = parseFloat(stat.number.replace(/,/g, ""));
              const hasCommas = stat.number.includes(",");
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <div
                      className="font-display"
                      style={{
                        color: "var(--primary)",
                        fontSize: "clamp(3rem, 6vw, 4.5rem)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {hasCommas ? (
                        <span>{stat.number}{stat.suffix ?? ""}</span>
                      ) : (
                        <CountUp end={numeric} suffix={stat.suffix ?? ""} />
                      )}
                    </div>
                    <p
                      className="mt-4 font-body"
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        maxWidth: "32ch",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. CTA — CREAM, steps into the dark footer */}
      <Section tone="cream">
        <Container size="narrow">
          <FadeUp>
            <div className="text-center">
              <h2 className="text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
                Ready to let Jim bring the showroom to you?
              </h2>
              <p
                className="mt-4 font-body"
                style={{ color: "var(--muted-on-light)", fontSize: "1.0625rem", lineHeight: 1.6 }}
              >
                The in-home consultation is free. I bring the real Hunter Douglas samples, hold them in your own windows, measure everything myself, and give you an honest installed price at your kitchen table. No pressure, no showroom to drive to, guaranteed for life.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button href="/request-a-consultation" variant="primary" size="lg">
                  Request Your Free In-Home Consultation
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
