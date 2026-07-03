import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { FadeUp } from "@/components/animations/FadeUp";
import { JsonLd } from "@/components/JsonLd";
import { buildContactSchema } from "@/lib/schema";
import { ConsultationClient } from "./ConsultationClient";

/**
 * /request-a-consultation - the primary conversion page. Free in-home
 * consultation request with an intent selector (Purchase vs Service and Repair).
 * H1 = .hero-shimmer. Zero em dashes (CLAUDE.md section 13).
 *
 * Band rhythm (footer-anchored alternation, dark footer):
 * // Photo header - dark  - orientation + phone escape hatch
 * // Form band    - cream - conversion (elevated form card 60% + trust rail 40%)
 * // [Footer]     - dark  - fixed bookend
 * // Tone string: D L D
 *
 * The form band is CREAM (form-dense section = documented static-gradient
 * exception, still radial + non-white via the globals.css cream selector).
 * The form itself is a self-contained elevated card inside ConsultationClient
 * so it reads on any band tone (it is also embedded on the dark quiz result).
 */

export const metadata: Metadata = {
  title: "Request a Free In-Home Consultation",
  description: `Request your free in-home consultation with ${siteConfig.business.founderName} of ${siteConfig.business.name}. Jim brings the Hunter Douglas showroom to you, measures your windows, and gives you an honest installed price. No pressure, guaranteed for life.`,
};

const NEXT_STEPS = [
  {
    numeral: "01",
    title: "Jim calls you back",
    body: "Personally, usually within a day. Not a call center, the owner.",
  },
  {
    numeral: "02",
    title: "He brings the showroom",
    body: "Real Hunter Douglas samples at your door, and he measures every window himself.",
  },
  {
    numeral: "03",
    title: "You get the honest number",
    body: "A real installed price at your kitchen table. The consultation is free and the decision stays yours.",
  },
];

const TRUST_CHIPS = ["Hunter Douglas Centurion Dealer", "Guaranteed for Life", "5.0 on Google"];

export default function RequestConsultationPage() {
  const { business } = siteConfig;

  return (
    <>
      <JsonLd data={buildContactSchema()} id="consult-jsonld" />

      {/* Photo header - dark band, tightened so the form arrives fast */}
      <Section
        tone="base"
        bgImage="/images/headers/consultation.jpg"
        bgImageAlt="Fabric swatches and a tape measure on a console beside a draped window."
        className="pt-32 sm:pt-36 lg:pt-40 pb-14 md:pb-16"
      >
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
            <p className="mt-5 font-body" style={{ color: "var(--text-secondary)", fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "65ch" }}>
              Tell Jim a little about your project and how to reach you. He follows up personally, usually within 24 hours, to set up your free in-home consultation anywhere in New England. Prefer to talk now? Call{" "}
              <a href={`tel:${business.phone}`} className="phone-display hover:underline" style={{ color: "var(--primary)" }}>
                {business.phoneFormatted}
              </a>
              .
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* Cream form band - elevated form card (60%) + trust rail (40%) */}
      <Section tone="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-start">
            {/* Form column - first on mobile and desktop */}
            <FadeUp>
              <div>
                <h2 className="text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
                  Request your consultation
                </h2>
                <p className="mt-3 font-body" style={{ color: "var(--muted-on-light)", fontSize: "1rem", lineHeight: 1.6 }}>
                  No cost, no pressure, and no reCAPTCHA to fight with. Just the details Jim needs to reach you.
                </p>
                <div className="mt-8">
                  <ConsultationClient />
                </div>
              </div>
            </FadeUp>

            {/* Trust rail */}
            <FadeUp delay={0.15}>
              <div className="lg:pt-2">
                <h2 className="text-h3 font-display" style={{ color: "var(--text-on-light)" }}>
                  What happens next
                </h2>

                <ol className="mt-6 space-y-6">
                  {NEXT_STEPS.map((step) => (
                    <li key={step.numeral} className="flex gap-4">
                      <span
                        className="font-mono text-sm font-semibold flex-shrink-0 mt-0.5"
                        style={{ color: "var(--gold-deep)", letterSpacing: "0.08em" }}
                        aria-hidden="true"
                      >
                        {step.numeral}
                      </span>
                      <div>
                        <p className="font-body font-semibold" style={{ color: "var(--text-on-light)", fontSize: "1rem", lineHeight: 1.4 }}>
                          {step.title}
                        </p>
                        <p className="mt-1 font-body" style={{ color: "var(--muted-on-light)", fontSize: "0.95rem", lineHeight: 1.55 }}>
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 flex flex-wrap gap-2">
                  {TRUST_CHIPS.map((chip) => (
                    <span
                      key={chip}
                      className="font-mono text-xs uppercase tracking-widest font-semibold rounded-full px-4 py-2"
                      style={{
                        color: "var(--gold-deep)",
                        background: "var(--cream)",
                        border: "1px solid color-mix(in oklab, var(--gold-deep) 35%, var(--border-light))",
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border-light)" }}>
                  <p className="font-mono text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "var(--gold-deep)" }}>
                    Prefer to talk now?
                  </p>
                  <a
                    href={`tel:${business.phone}`}
                    className="phone-display font-display inline-block hover:underline"
                    style={{ color: "var(--text-on-light)", fontSize: "1.75rem", lineHeight: 1.2 }}
                  >
                    {business.phoneFormatted}
                  </a>
                  <p className="mt-2 font-body" style={{ color: "var(--muted-on-light)", fontSize: "0.95rem", lineHeight: 1.55 }}>
                    Jim answers his own phone. If he is out on an install, he calls you right back.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border-light)" }}>
                  <p className="font-mono text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "var(--gold-deep)" }}>
                    Office
                  </p>
                  <address className="font-body not-italic" style={{ color: "var(--text-on-light)", fontSize: "1rem", lineHeight: 1.6 }}>
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.state} {business.address.zip}
                    <br />
                    <span style={{ color: "var(--muted-on-light)" }}>By appointment. There is no walk-in showroom, Jim comes to you.</span>
                  </address>
                </div>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </>
  );
}
