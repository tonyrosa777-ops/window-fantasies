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
 * /services - Index of the window-treatment services.
 * Server Component. Pattern #71 grid: featured-1 + grid for the rest.
 * Featured = the free in-home consultation (siteConfig.services[0]). H1 = .hero-shimmer.
 */

export const metadata: Metadata = {
  title: "Services",
  description: `Free in-home consultations, interior design guidance, measuring and certified installation, repairs, and PowerView motorization. Custom Hunter Douglas window treatments from Jim Garrity, with ${siteConfig.business.yearsInBusiness} years in window fashions across New England.`,
};

export default function ServicesPage() {
  const { services } = siteConfig;
  const featured = services[0];
  const rest = services.slice(1);

  return (
    <>
      {/* 1. Page Header */}
      <Section tone="base" bgImage="/images/headers/services.jpg" bgImageAlt="An elegant New England living room layered with sheer shades and drapery in morning light." className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <FadeUp>
            <Eyebrow>What I Do</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-h1 hero-shimmer font-display mt-4"
              style={{ maxWidth: "22ch" }}
            >
              Measured, designed, and installed by hand.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mt-6 font-body"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.125rem",
                lineHeight: 1.6,
                maxWidth: "65ch",
              }}
            >
              Everything from the first free consultation to the final install, handled by Jim himself. He brings the Hunter Douglas showroom to your home, reads the light and the room, measures every window, installs it cleanly, and services it for life. No showroom to drive to, no sales team, no subcontractors. One person, all of New England.
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* 2. Service grid: featured + 2x2 — CREAM band, white cards */}
      <Section tone="cream">
        <Container>
          <StaggerContainer staggerDelay={0.1}>
            {/* Featured card, full width */}
            <StaggerItem>
              <div
                className="mb-6 rounded-2xl p-6 sm:p-8 border"
                style={{ background: "#FFFFFF", borderColor: "var(--border-light)" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                  {/* Copy */}
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-3"
                      style={{ color: "var(--gold-deep)" }}
                    >
                      Where Every Project Starts
                    </p>
                    <h2
                      className="text-h2 font-display"
                      style={{ color: "var(--text-on-light)" }}
                    >
                      {featured.name}
                    </h2>
                    <p
                      className="mt-4 font-body"
                      style={{
                        color: "var(--muted-on-light)",
                        fontSize: "1.0625rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {featured.shortDescription}
                    </p>
                    <div className="mt-6">
                      <p
                        className="font-mono text-xs uppercase tracking-widest"
                        style={{ color: "var(--muted-on-light)" }}
                      >
                        {featured.pricingNote}
                      </p>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button href={`/services/${featured.slug}`} variant="primary" size="md">
                        See {featured.name} Details
                      </Button>
                      <Button href="/request-a-consultation" variant="secondary" size="md" tone="light">
                        Request a Free Consultation
                      </Button>
                    </div>
                  </div>
                  {/* Photo sits beside the copy */}
                  {featured.imageSrc && (
                    <Image
                      src={featured.imageSrc}
                      alt={
                        featured.imageAlt ??
                        `${featured.name} by Window Fantasies, custom Hunter Douglas window treatments`
                      }
                      width={featured.imageW}
                      height={featured.imageH}
                      sizes="(min-width: 1024px) 540px, 100vw"
                      loading="lazy"
                      className="w-full h-auto rounded-2xl border shadow-[0_24px_60px_rgba(7, 7, 6,0.18)]"
                      style={{ borderColor: "var(--border-light)" }}
                    />
                  )}
                </div>
                {/* Feature strip */}
                <ul className="mt-10 pt-8 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3" style={{ borderColor: "var(--border-light)" }}>
                  {featured.features.slice(0, 6).map((feature, i) => (
                    <li
                      key={i}
                      className="flex gap-3 font-body"
                      style={{
                        color: "var(--text-on-light)",
                        fontSize: "0.95rem",
                        lineHeight: 1.55,
                      }}
                    >
                      <span
                        className="flex-shrink-0 mt-1.5"
                        style={{ color: "var(--gold-deep)", fontWeight: 700 }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>

            {/* Remaining services in a 2-col grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {rest.map((service) => (
                <StaggerItem key={service.slug}>
                  <div
                    className="flex flex-col h-full rounded-2xl p-6 sm:p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(7, 7, 6,0.14)]"
                    style={{ background: "#FFFFFF", borderColor: "var(--border-light)" }}
                  >
                    {service.imageSrc && (
                      <Image
                        src={service.imageSrc}
                        alt={
                          service.imageAlt ??
                          `${service.name} by Window Fantasies, custom Hunter Douglas window treatments`
                        }
                        width={service.imageW}
                        height={service.imageH}
                        sizes="(min-width: 640px) 50vw, 100vw"
                        loading="lazy"
                        className="block mx-auto rounded-2xl border mb-5"
                        style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "260px", borderColor: "var(--border-light)" }}
                      />
                    )}
                    <h3
                      className="text-h3 font-display"
                      style={{ color: "var(--text-on-light)" }}
                    >
                      {service.name}
                    </h3>
                    <p
                      className="mt-3 font-body flex-1"
                      style={{
                        color: "var(--muted-on-light)",
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {service.shortDescription}
                    </p>
                    <div className="mt-4">
                      <p
                        className="font-mono text-xs uppercase tracking-widest"
                        style={{ color: "var(--muted-on-light)", lineHeight: 1.5 }}
                      >
                        {service.pricingNote}
                      </p>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-body font-medium transition-colors"
                      style={{ color: "var(--gold-deep)" }}
                    >
                      See details
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* 3. One person, the whole way — DARK reassurance band */}
      <Section tone="base">
        <Container size="narrow">
          <FadeUp className="text-center">
            <p className="eyebrow" style={{ color: "var(--primary)" }}>
              One person, the whole way
            </p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-primary)" }}>
              The person who quotes you is the person who installs it.
            </h2>
            <p
              className="mt-4 font-body mx-auto"
              style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "60ch" }}
            >
              No sales team, no subcontractors, no call center. Jim measures, designs, installs, and services every treatment himself, and stands behind it for life. When you call, you get Jim.
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
                Not sure where to start?
              </h2>
              <p
                className="mt-4 font-body"
                style={{ color: "var(--muted-on-light)", fontSize: "1.0625rem", lineHeight: 1.6 }}
              >
                Start with the free in-home consultation. Jim brings the real Hunter Douglas samples to you, reads the room, and tells you honestly what belongs on your windows. No pressure, no showroom to drive to.
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
