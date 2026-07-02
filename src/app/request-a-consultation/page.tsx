import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card, Eyebrow } from "@/components/ui/Card";
import { FadeUp } from "@/components/animations/FadeUp";
import { JsonLd } from "@/components/JsonLd";
import { buildContactSchema } from "@/lib/schema";
import { ConsultationClient } from "./ConsultationClient";

/**
 * /request-a-consultation — the primary conversion page. Free in-home
 * consultation request with an intent selector (Purchase vs Service and Repair).
 * H1 = .hero-shimmer. Zero em dashes (CLAUDE.md §13).
 */

export const metadata: Metadata = {
  title: "Request a Free In-Home Consultation",
  description: `Request your free in-home consultation with ${siteConfig.business.founderName} of ${siteConfig.business.name}. Jim brings the Hunter Douglas showroom to you, measures your windows, and gives you an honest installed price. No pressure, guaranteed for life.`,
};

const PROMISES = [
  "The consultation is free and there is no obligation",
  "Jim brings the real Hunter Douglas samples to your home",
  "He measures every window himself",
  "You get an honest installed price at your kitchen table",
  "Guaranteed for life, serviced personally by Jim",
];

export default function RequestConsultationPage() {
  const { business } = siteConfig;

  return (
    <>
      <JsonLd data={buildContactSchema()} id="consult-jsonld" />

      <Section tone="base" bgImage="/images/headers/consultation.jpg" bgImageAlt="Fabric swatches and a tape measure on a console beside a draped window." className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <FadeUp>
            <Eyebrow>Free In-Home Consultation</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-h1 hero-shimmer font-display mt-4" style={{ maxWidth: "22ch" }}>
              Let Jim bring the showroom to you.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 font-body" style={{ color: "var(--text-secondary)", fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "65ch" }}>
              Tell Jim a little about your project and how to reach you. He follows up personally, usually within 24 hours, to set up your free in-home consultation anywhere in New England. Prefer to talk now? Call{" "}
              <a href={`tel:${business.phone}`} className="phone-display hover:underline" style={{ color: "var(--primary)" }}>
                {business.phoneFormatted}
              </a>
              .
            </p>
          </FadeUp>
        </Container>
      </Section>

      <Section tone="elevated">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-start">
            <FadeUp>
              <Card hoverable={false}>
                <h2 className="text-h2 font-display" style={{ color: "var(--text-primary)" }}>
                  Request your consultation
                </h2>
                <p className="mt-3 font-body" style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6 }}>
                  No cost, no pressure, and no reCAPTCHA to fight with. Just the details Jim needs to reach you.
                </p>
                <div className="mt-8">
                  <ConsultationClient />
                </div>
              </Card>
            </FadeUp>

            <FadeUp delay={0.15}>
              <Card hoverable={false}>
                <h2 className="text-h2 font-display" style={{ color: "var(--text-primary)" }}>
                  What to expect
                </h2>
                <ul className="mt-6 space-y-4">
                  {PROMISES.map((p) => (
                    <li key={p} className="flex gap-3 font-body" style={{ color: "var(--text-primary)", fontSize: "1rem", lineHeight: 1.55 }}>
                      <span className="flex-shrink-0 mt-2" style={{ width: "6px", height: "6px", borderRadius: "999px", background: "var(--primary)" }} aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border-dark)" }}>
                  <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                    Office
                  </p>
                  <address className="font-body not-italic" style={{ color: "var(--text-primary)", fontSize: "1rem", lineHeight: 1.6 }}>
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.state} {business.address.zip}
                    <br />
                    <span style={{ color: "var(--text-secondary)" }}>By appointment. There is no walk-in showroom, Jim comes to you.</span>
                  </address>
                </div>
              </Card>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </>
  );
}
