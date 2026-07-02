import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card, Eyebrow } from "@/components/ui/Card";
import { FadeUp } from "@/components/animations/FadeUp";
import { ContactClient } from "./ContactClient";
import { JsonLd } from "@/components/JsonLd";
import { buildContactSchema } from "@/lib/schema";

/**
 * /contact — Server Component wrapper.
 * Form lives in ContactClient.tsx (client component with react-hook-form + zod).
 * H1 = .hero-shimmer (CLAUDE.md §6 + §15).
 * ZERO em dashes in string literals (CLAUDE.md §13).
 */

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.business.founderName} at ${siteConfig.business.name}. Free in-home consultation across all of New England. Call ${siteConfig.business.phoneFormatted}.`,
};

export default function ContactPage() {
  const { business, hero } = siteConfig;
  const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${business.address.city}, ${business.address.state}`
  )}&output=embed&hl=en`;

  return (
    <>
      <JsonLd data={buildContactSchema()} id="contact-jsonld" />
      {/* 1. Page Header */}
      <Section tone="base" bgImage="/images/headers/contact.jpg" bgImageAlt="A welcoming sunroom entry with light through plantation shutters." className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <FadeUp>
            <Eyebrow>Get In Touch</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-h1 hero-shimmer font-display mt-4"
              style={{ maxWidth: "22ch" }}
            >
              One phone number. One person. Everyone gets the same Jim.
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
              {hero.trustMicrocopy} Send the form below, call, or email. Whichever is easiest. I answer every message personally.
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* 2. Form + contact info (2-col) — CREAM band; the two dark Cards step
          tone from the cream surface (Card is self-sufficient, Pattern #55) and
          this is the last content band so it stairs into the dark footer. */}
      <Section tone="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-start">
            {/* Left: form */}
            <FadeUp>
              <Card hoverable={false}>
                <h2
                  className="text-h2 font-display"
                  style={{ color: "var(--text-primary)" }}
                >
                  Send a quick note
                </h2>
                <p
                  className="mt-3 font-body"
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  Tell me a little about your windows, the rooms you have in mind, and how to reach you. I will follow up personally to set up your free in-home consultation.
                </p>
                <div className="mt-8">
                  <ContactClient />
                </div>
              </Card>
            </FadeUp>

            {/* Right: contact info + map */}
            <FadeUp delay={0.15}>
              <Card hoverable={false}>
                <h2
                  className="text-h2 font-display"
                  style={{ color: "var(--text-primary)" }}
                >
                  Direct
                </h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Phone
                    </p>
                    <a
                      href={`tel:${business.phone}`}
                      className="font-mono phone-display text-2xl hover:underline"
                      style={{ color: "var(--primary)" }}
                    >
                      {business.phoneFormatted}
                    </a>
                  </div>

                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Email
                    </p>
                    <a
                      href={`mailto:${business.email}`}
                      className="font-body hover:underline break-all"
                      style={{ color: "var(--text-primary)", fontSize: "1rem" }}
                    >
                      {business.email}
                    </a>
                  </div>

                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Office
                    </p>
                    <address
                      className="font-body not-italic"
                      style={{ color: "var(--text-primary)", fontSize: "1rem", lineHeight: 1.6 }}
                    >
                      {business.address.street}
                      <br />
                      {business.address.city}, {business.address.state} {business.address.zip}
                    </address>
                  </div>

                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Service Area
                    </p>
                    <p
                      className="font-body"
                      style={{ color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.55 }}
                    >
                      {business.serviceRadius}
                    </p>
                  </div>
                </div>

                {/* Google Maps embed */}
                <div className="mt-8">
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Find Me
                  </p>
                  <div
                    className="relative overflow-hidden rounded-lg border"
                    style={{
                      aspectRatio: "4 / 3",
                      borderColor: "var(--border-dark)",
                    }}
                  >
                    <iframe
                      src={mapEmbedSrc}
                      title={`Map of ${business.address.city}, ${business.address.state}`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                        filter: "grayscale(0.3) brightness(0.85)",
                      }}
                    />
                  </div>
                </div>
              </Card>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </>
  );
}
