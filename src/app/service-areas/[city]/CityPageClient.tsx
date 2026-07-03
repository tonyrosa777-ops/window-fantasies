"use client";

import Link from "next/link";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { siteConfig, type ServiceArea } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

/**
 * /service-areas/[city] — Client component for city detail page.
 *
 * Section composition:
 *   1. Hero (breadcrumb + H1 + subhead + 2 CTAs)
 *   2. City info (2-col: copy + trust checklist | Google Maps + info card)
 *   3. Services available in [city] (featured-1 + 2-col grid)
 *   4. City FAQ (Radix accordion, 4 auto-generated questions, +1 repair-logistics question on non-NH towns)
 *   5. Nearby areas (up to 5 links, same-state towns first)
 *   6. Final CTA
 *
 * Services grid: featured-1 full-width + the rest in `grid-cols-1 md:grid-cols-2`.
 * Nearby areas: up to 5 links rendered as a chip wrap.
 *
 * cityFaqs is mirrored in [city]/page.tsx for schema parity. Keep them in sync.
 *
 * Zero em dashes in any string literal (CLAUDE.md §13 BINDING).
 */

interface Props {
  area: ServiceArea;
}

const TRUST_CHECKLIST = [
  "Authorized Hunter Douglas Centurion dealer",
  "Guaranteed for life",
  "Measured, designed, and installed by hand",
  "Free in-home consultation, the showroom comes to you",
  "Repairs even if you bought it elsewhere",
];

const cityFaqs = (area: ServiceArea) => {
  const city = area.city;
  const faqs = [
    {
      q: `Do you serve ${city}?`,
      a: `Yes. Jim serves ${city} and all of New England from the office in Salem, NH. There is no showroom to drive to. Jim brings the real Hunter Douglas samples to your ${city} home, holds them in your own windows, and measures and installs everything by hand.`,
    },
    {
      q: `How much do Hunter Douglas window treatments cost in ${city}?`,
      a: `Hunter Douglas is a premium, fully custom product, so pricing depends on the window, the product, and the options. A single high-end shade can run around $1,600, and most homes have more than one window. That is why the in-home consultation is free: Jim measures your actual ${city} windows and gives you a real installed price at your kitchen table, with no obligation. Yes, it is an investment, and yes, it is guaranteed for life.`,
    },
    {
      q: `Do you repair blinds and shades in ${city}?`,
      a: `Yes. Hunter Douglas products are guaranteed for life, so warranty repairs are free, even on treatments you bought elsewhere or from a shop that has closed. Jim can help ${city} homeowners with cords, mechanisms, motors, and fabric. He will tell you the honest path forward, and any service fee for pickup and reinstall is disclosed upfront.`,
    },
    {
      q: `Do you have a showroom near ${city}?`,
      a: `No showroom, and that is on purpose. A shade looks completely different under store lights than it does in your ${city} home at four in the afternoon. So Jim brings the showroom to you, with the real Hunter Douglas samples, shown in your own light.`,
    },
  ];
  // Out-of-state towns get the honest repair-logistics answer (Paul persona fix).
  // Mirrored in [city]/page.tsx for FAQPage schema parity. Keep in sync.
  if (area.state !== "NH") {
    faqs.splice(3, 0, {
      q: `Do you handle repairs out here in ${city}?`,
      a: `Yes. Hunter Douglas warranty repairs are free, even in ${city}. The authorized service center is Goedecke Design in Bedford, New Hampshire, and you are welcome to drive a blind there yourself for free. If you would rather have Jim handle the pickup, the delivery, and the reinstall, he charges a flat service fee, typically $225 plus $25 per blind. You get the exact number upfront, before anything happens.`,
    });
  }
  return faqs;
};

/**
 * Same-state-first ordering for the nearby-areas chips: towns in the same
 * state as the current page come first (curated relative order preserved),
 * then out-of-state towns (also in curated order). Pure function; slugs that
 * do not resolve against siteConfig.serviceAreas are dropped.
 */
function orderNearbySameStateFirst(area: ServiceArea): string[] {
  const sameState: string[] = [];
  const outOfState: string[] = [];
  for (const slug of area.nearbyAreas) {
    const nearby = siteConfig.serviceAreas.find((a) => a.slug === slug);
    if (!nearby) continue;
    if (nearby.state === area.state) {
      sameState.push(slug);
    } else {
      outOfState.push(slug);
    }
  }
  return [...sameState, ...outOfState];
}

export default function CityPageClient({ area }: Props) {
  const services = siteConfig.services;
  const business = siteConfig.business;
  const faqs = cityFaqs(area);

  // Nearby areas list (informational, not a grid). Same-state towns first.
  const nearbyAreas = orderNearbySameStateFirst(area).slice(0, 5);

  // Featured-1 + 2-col pattern for services: first service featured, the rest in a 2-col grid.
  const featuredService = services[0];
  const otherServices = services.filter((s) => s.slug !== featuredService.slug);

  return (
    <>
      {/* 1. HERO */}
      <Section tone="base"
        bgImage={`/images/towns/${area.slug}.jpg`}
        bgImageAlt={`A ${area.city}, ${area.state} home dressed in custom Hunter Douglas window treatments.`}
        className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          {/* Breadcrumb */}
          <FadeUp>
            <nav
              aria-label="Breadcrumb"
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              <Link
                href="/service-areas"
                className="hover:text-[var(--primary)] transition-colors"
              >
                Service Areas
              </Link>
              <span className="mx-2" aria-hidden="true">
                &rsaquo;
              </span>
              <span style={{ color: "var(--text-secondary)" }}>
                {area.city}, {area.state}
              </span>
            </nav>
          </FadeUp>

          <FadeUp delay={0.05}>
            <Eyebrow className="mt-6">
              Window Treatments. {area.city}, {area.state}. {area.distance}.
            </Eyebrow>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              className="text-h1 hero-shimmer font-display mt-4"
              style={{ maxWidth: "22ch" }}
            >
              Custom window treatments in {area.city}, {area.state}.
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
              {area.description}
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/request-a-consultation" variant="primary" size="lg">
                Request a Free In-Home Consultation
              </Button>
              <Button
                href={`tel:${business.phone}`}
                variant="secondary"
                size="lg"
              >
                Call Jim at {business.phoneFormatted}
              </Button>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* 2. CITY INFO — CREAM band, 2-col with Google Maps */}
      <Section tone="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* LEFT: copy + trust checklist */}
            <FadeUp>
              <p className="eyebrow mb-3" style={{ color: "var(--gold-deep)" }}>Your Local Dealer</p>
              <h2
                className="font-display text-h2"
                style={{
                  color: "var(--text-on-light)",
                  maxWidth: "20ch",
                }}
              >
                Your Hunter Douglas dealer for {area.city}.
              </h2>
              <p
                className="mt-6 font-body"
                style={{
                  color: "var(--text-on-light)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  maxWidth: "60ch",
                }}
              >
                I work out of an office in Salem, NH, and I serve {area.city} and the
                rest of New England myself. I measure it, I design it, and I install it,
                which means one phone number, one accountable person, and someone who
                actually knows how to fit these products to your home. No sales team, no
                subcontractors, no call center. When you call, you get Jim.
              </p>
              <p
                className="mt-4 font-body"
                style={{
                  color: "var(--muted-on-light)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  maxWidth: "60ch",
                }}
              >
                Homeowners in {area.city} rely on me for custom Hunter Douglas shades,
                blinds, shutters, drapery, and PowerView motorization, along with
                repairs even on treatments bought elsewhere. There is no showroom to
                drive to. I bring the real samples to your home, hold them in your own
                windows, and show you exactly what you are getting before you spend a
                dollar. Everyone gets the same me, and everything is guaranteed for life.
              </p>

              <ul className="mt-8 space-y-3">
                {TRUST_CHECKLIST.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-body"
                    style={{
                      color: "var(--text-on-light)",
                      fontSize: "1rem",
                      lineHeight: 1.55,
                    }}
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
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* RIGHT: Google Maps iframe + info card */}
            <FadeUp delay={0.15}>
              <div
                className="rounded-2xl overflow-hidden shadow-md h-64 sm:h-72 lg:h-80 border"
                style={{ borderColor: "var(--border-light)" }}
              >
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(area.city + ", " + area.state)}&output=embed&hl=en`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${area.city}, ${area.state} map`}
                />
              </div>

              {/* Info card below map — white on cream */}
              <div
                className="mt-6 rounded-2xl border p-6"
                style={{
                  background: "var(--bg-card-light)",
                  borderColor: "var(--border-light)",
                }}
              >
                <p
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "var(--muted-on-light)" }}
                >
                  Service Area Snapshot
                </p>
                <h3
                  className="mt-2 font-display"
                  style={{
                    color: "var(--text-on-light)",
                    fontSize: "1.35rem",
                    lineHeight: 1.25,
                  }}
                >
                  Serving {area.city}, {area.state}
                </h3>
                <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <dt
                      className="font-mono text-[10px] uppercase tracking-widest"
                      style={{ color: "var(--muted-on-light)" }}
                    >
                      Region
                    </dt>
                    <dd
                      className="mt-1 font-display"
                      style={{
                        color: "var(--gold-deep)",
                        fontSize: "1.25rem",
                      }}
                    >
                      {area.distance}
                    </dd>
                  </div>
                  <div>
                    <dt
                      className="font-mono text-[10px] uppercase tracking-widest"
                      style={{ color: "var(--muted-on-light)" }}
                    >
                      Population
                    </dt>
                    <dd
                      className="mt-1 font-display"
                      style={{
                        color: "var(--gold-deep)",
                        fontSize: "1.25rem",
                      }}
                    >
                      {area.population.toLocaleString("en-US")}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt
                      className="font-mono text-[10px] uppercase tracking-widest"
                      style={{ color: "var(--muted-on-light)" }}
                    >
                      Home Base
                    </dt>
                    <dd
                      className="mt-1 font-body"
                      style={{
                        color: "var(--text-on-light)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {business.address.street}, {business.address.city},{" "}
                      {business.address.state} {business.address.zip}
                    </dd>
                  </div>
                </dl>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* 3. SERVICES AVAILABLE IN [city] — Pattern #71 featured-1 + 2-col grid (1 + 4 = 5) */}
      <Section tone="base">
        <Container size="wide">
          <FadeUp className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <Eyebrow className="mb-4">Services Available</Eyebrow>
            <h2 className="font-display text-h2" style={{ color: "var(--text-primary)" }}>
              Services available in {area.city}.
            </h2>
            <p
              className="mt-4 font-body"
              style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
            >
              Custom window treatments, motorization, and repairs, brought to {area.city}{" "}
              and every home across {siteConfig.business.serviceRadius.toLowerCase()}.
            </p>
          </FadeUp>

          {/* Featured service (full-width) */}
          <FadeUp>
            <Link
              href={`/services/${featuredService.slug}`}
              className="group block rounded-2xl border p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-[var(--primary-muted)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-dark)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 lg:gap-10 items-start">
                <div>
                  <p
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: "var(--primary)" }}
                  >
                    Start Here
                  </p>
                  <h3
                    className="mt-3 font-display"
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "1.75rem",
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {featuredService.name}
                  </h3>
                </div>
                <div>
                  <p
                    className="font-body"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "1.0625rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {featuredService.shortDescription}
                  </p>
                  <p
                    className="mt-5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 group-hover:text-[var(--primary)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    View {featuredService.name} &rarr;
                  </p>
                </div>
              </div>
            </Link>
          </FadeUp>

          {/* 4 remaining services in 2-col grid (4/2 = 2 perfect rows, Pattern #71) */}
          <StaggerContainer
            staggerDelay={0.06}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
          >
            {otherServices.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:border-[var(--primary-muted)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-dark)",
                  }}
                >
                  <h3
                    className="font-display"
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "1.35rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="mt-3 font-body"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {service.shortDescription}
                  </p>
                  <p
                    className="mt-4 font-mono text-xs uppercase tracking-widest transition-colors duration-200 group-hover:text-[var(--primary)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    View {service.name} &rarr;
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* 4. CITY FAQ — CREAM band, Radix accordion */}
      <Section tone="cream" id="faq">
        <Container size="narrow">
          <FadeUp className="text-center mb-10 md:mb-14">
            <p className="eyebrow mb-4" style={{ color: "var(--gold-deep)" }}>Frequently Asked</p>
            <h2 className="font-display text-h2" style={{ color: "var(--text-on-light)" }}>
              {area.city} window treatments FAQ.
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <CityFaqAccordion faqs={faqs} tone="light" />
          </FadeUp>
        </Container>
      </Section>

      {/* 5. NEARBY AREAS */}
      {nearbyAreas.length > 0 && (
        <Section tone="base">
          <Container>
            <FadeUp>
              <Eyebrow className="mb-4">Nearby Service Areas</Eyebrow>
              <h2 className="font-display text-h2" style={{ color: "var(--text-primary)" }}>
                Other cities I serve nearby.
              </h2>
              <p
                className="mt-4 font-body"
                style={{ color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "60ch" }}
              >
                Have a home in a neighboring town, or family nearby who could use Jim?
                He serves all of these towns too, with the same in-home consultation and
                the same Jim on the other end of the phone.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <ul className="mt-8 flex flex-wrap gap-3">
                {nearbyAreas.map((slug) => {
                  const nearby = siteConfig.serviceAreas.find((a) => a.slug === slug);
                  if (!nearby) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/service-areas/${slug}`}
                        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-body transition-all duration-200 hover:border-[var(--primary)] hover:bg-[color-mix(in_oklab,var(--primary)_10%,transparent)]"
                        style={{
                          color: "var(--text-primary)",
                          background: "var(--bg-card)",
                          borderColor: "var(--border-dark)",
                          fontSize: "0.9375rem",
                        }}
                      >
                        <span>{nearby.city}, {nearby.state}</span>
                        <span
                          aria-hidden="true"
                          className="font-mono text-[10px] uppercase tracking-widest"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {nearby.distance}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </FadeUp>
          </Container>
        </Section>
      )}

      {/* 6. FINAL CTA — CREAM, steps into the dark footer */}
      <Section tone="cream">
        <Container size="narrow">
          <FadeUp>
            <div className="text-center">
              <h2 className="text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
                Ready to let Jim visit your {area.city} home?
              </h2>
              <p
                className="mt-4 font-body"
                style={{
                  color: "var(--muted-on-light)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.6,
                }}
              >
                The in-home consultation is free. Jim brings the real Hunter Douglas samples, measures your windows, and gives you an honest installed price at your kitchen table. No pressure, no showroom to drive to, guaranteed for life.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button href="/request-a-consultation" variant="primary" size="lg">
                  Request a Free In-Home Consultation
                </Button>
                <Button href={`tel:${business.phone}`} variant="secondary" size="lg" tone="light">
                  Call Jim at {business.phoneFormatted}
                </Button>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* City FAQ accordion (Radix)                                         */
/* ------------------------------------------------------------------ */

function CityFaqAccordion({
  faqs,
  tone = "dark",
}: {
  faqs: { q: string; a: string }[];
  tone?: "dark" | "light";
}) {
  const [openItem, setOpenItem] = useState<string>("");
  const isLight = tone === "light";
  const cardBg = isLight ? "var(--bg-card-light)" : "var(--bg-card)";
  const restBorder = isLight ? "var(--border-light)" : "var(--border-dark)";
  const triggerColor = isLight ? "var(--text-on-light)" : "var(--text-primary)";
  const bodyColor = isLight ? "var(--muted-on-light)" : "var(--text-secondary)";

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={openItem}
      onValueChange={setOpenItem}
      className="space-y-3"
    >
      {faqs.map((faq, i) => {
        const itemValue = `faq-${i}`;
        const isOpen = openItem === itemValue;
        return (
          <Accordion.Item
            key={itemValue}
            value={itemValue}
            className="rounded-2xl border overflow-hidden"
            style={{
              background: cardBg,
              borderColor: isOpen ? "var(--primary-muted)" : restBorder,
            }}
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger
                className="group flex flex-1 items-start justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:text-[var(--primary)]"
                style={{ color: triggerColor }}
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: 1.4,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 font-mono text-lg transition-transform duration-200"
                  style={{
                    color: isLight ? "var(--gold-deep)" : "var(--primary)",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                  aria-hidden="true"
                >
                  +
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content
              className="overflow-hidden data-[state=closed]:animate-none data-[state=open]:animate-none"
            >
              <div
                className="px-5 sm:px-6 pb-5 sm:pb-6 font-body"
                style={{
                  color: bodyColor,
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  maxWidth: "65ch",
                }}
              >
                {faq.a}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
