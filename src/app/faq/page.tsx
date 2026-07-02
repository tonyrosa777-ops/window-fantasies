import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { FaqClient } from "./FaqClient";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqPageSchema } from "@/lib/schema";

/**
 * /faq — Server Component wrapper. Accordion lives in FaqClient.tsx.
 * H1 = .hero-shimmer (CLAUDE.md §6 + §15).
 * ZERO em dashes in string literals (CLAUDE.md §13).
 */

export const metadata: Metadata = {
  title: "FAQ",
  description: `Common questions about Hunter Douglas window treatments, pricing, repairs, motorization, measuring, and the free in-home consultation at ${siteConfig.business.name}. Answers from ${siteConfig.business.founderName}.`,
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={buildFaqPageSchema()} id="faq-jsonld" />
      {/* 1. Page header */}
      <Section tone="base" className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <FadeUp>
            <Eyebrow>Frequently Asked Questions</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-h1 hero-shimmer font-display mt-4"
              style={{ maxWidth: "22ch" }}
            >
              Answers to the questions buyers ask first.
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
              Pricing, repairs, motorization, measuring, the showroom that comes to you, and the areas Jim serves. If your question is not here, call <span className="phone-display">{siteConfig.business.phoneFormatted}</span> or request a free consultation.
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* 2. FAQ accordion — CREAM band */}
      <Section tone="cream">
        <Container size="narrow">
          <FaqClient items={siteConfig.faq} tone="light" />
        </Container>
      </Section>

      {/* 3. Answer-first reassurance — DARK band */}
      <Section tone="base">
        <Container size="narrow">
          <FadeUp className="text-center">
            <p className="eyebrow" style={{ color: "var(--primary)" }}>
              Educate, do not sell
            </p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-primary)" }}>
              Straight answers, before you spend a dollar.
            </h2>
            <p
              className="mt-4 font-body mx-auto"
              style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "58ch" }}
            >
              Jim would rather you understand what you are buying than feel rushed into it. Ask him anything about cost, product, repairs, or timing. He will tell you the truth and a clear plan.
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
                Still have a question?
              </h2>
              <p
                className="mt-4 font-body"
                style={{ color: "var(--muted-on-light)", fontSize: "1.0625rem", lineHeight: 1.6 }}
              >
                Request a free in-home consultation. Jim brings the real Hunter Douglas samples to your home, answers every question, and gives you an honest installed price at your kitchen table.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button href="/request-a-consultation" variant="primary" size="lg">
                  Request a Free In-Home Consultation
                </Button>
                <Button href="/contact" variant="secondary" size="lg" tone="light">
                  Send a Quick Message
                </Button>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
