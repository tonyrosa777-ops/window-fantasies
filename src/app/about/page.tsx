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
import { HDPhotoCredit } from "@/components/brand/HDPhotoCredit";
import { buildAboutSchema } from "@/lib/schema";

/**
 * /about — Founder story page.
 * Server Component. Voice = Jim first-person ("I").
 * Hero H1 uses .hero-shimmer (CLAUDE.md §6 + §15 BINDING).
 * ZERO em dashes in any string literal (CLAUDE.md §13 BINDING).
 *
 * ⚠️ COMPLIANCE, two things this page failed on 2026-07-31.
 *
 * 1. NO VISIBLE PRODUCT LABEL. Hunter Douglas requires photography showing
 *    their product be "clearly labeled with the specific product it was
 *    designed to promote", first instance per section. The header photo shows a
 *    roller shade, so it carries a <HDPhotoCredit />. The label is the BARE
 *    PRODUCT NAME, not "by Hunter Douglas": this is the site's own still that
 *    DEPICTS the product, not HD's licensed photography (that lives in
 *    /images/window-fashions/), and captioning it "by Hunter Douglas" would
 *    misattribute authorship to HD. Bare-name captions are HD's own second
 *    worked example. Note "Designer Roller Shades" correctly carries NO ® or ™:
 *    HD's 2025 list gives it none, and inventing a symbol is itself a violation.
 *    The other two photos on this page (Jim's portrait, the doorstep sample
 *    books) show no window treatment, so they need no label.
 *
 * 2. "WORKROOM" / "CRAFTSMAN WORKSPACE" LANGUAGE. HD criterion 10 requires the
 *    dealer not be fabricating any products. A workroom is where treatments are
 *    fabricated. Jim measures, designs, and installs; Hunter Douglas manufactures.
 *    Describe the office and the sample library, never a workroom or a shop.
 */

export const metadata: Metadata = {
  title: `About ${siteConfig.business.founderName}`,
  description: `Meet ${siteConfig.business.founderName}, ${siteConfig.business.founderTitle} of ${siteConfig.business.name}. An Authorized Hunter Douglas Dealer with ${siteConfig.business.yearsInBusiness}+ years measuring, designing, and installing custom window treatments by hand across all of New England.`,
};

export default function AboutPage() {
  const { about, stats, business } = siteConfig;

  return (
    <>
      <JsonLd data={buildAboutSchema()} id="about-jsonld" />
      {/* 1. Hero / Page Header */}
      <Section tone="base" bgImage="/images/headers/about.jpg" bgImageAlt="Hunter Douglas Designer Roller Shades filtering sunlight over a desk of fabric sample books in Jim's Salem office." className="pt-32 sm:pt-36 lg:pt-40">
        {/* Seam-fade (design-symmetry rule L): the dark photo header dissolves
            ~96px into the cream story band below. Transition mask only; the
            band's core tone stays clearly dark for the tone audit. */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-[1]"
          style={{ background: "linear-gradient(to bottom, transparent, var(--cream))" }}
        />
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
        {/* Hunter Douglas product label for the header photograph. Overlay, so
            it sits on its own dark scrim ON the photo it labels and stays
            legible over any part of the image. First (and only) instance on
            this page, per HD's first-instance-per-section rule. */}
        <HDPhotoCredit credit="Hunter Douglas Designer Roller Shades" variant="overlay" />
      </Section>

      {/* 2. Story (2-col: portrait left, paragraphs right) — CREAM band */}
      <Section tone="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16">
            {/* Founder portrait (3:4 aspect). Sticky on desktop so it follows the
                tall story column instead of leaving a dead void below it
                (design-symmetry §5 #3 vertical-void fix). */}
            <FadeUp className="lg:sticky lg:top-28 self-start">

              <div
                className="relative rounded-2xl overflow-hidden border"
                style={{
                  aspectRatio: "3 / 4",
                  background: "var(--bg-card-light)",
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

      {/* 4. CTA — CREAM, steps into the dark footer. Asymmetric split: copy left,
          doorstep-arrival photo right (the samples literally arrive at your door). */}
      <Section tone="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeUp>
              <h2 className="text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
                Ready to let Jim shop at home with you?
              </h2>
              <p
                className="mt-4 font-body"
                style={{ color: "var(--muted-on-light)", fontSize: "1.0625rem", lineHeight: 1.6 }}
              >
                The in-home consultation is free. I bring the real Hunter Douglas samples, hold them in your own windows, measure everything myself, and give you an honest installed price at your kitchen table. No pressure, no store to drive to, and I stand behind every install I do.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/request-a-consultation" variant="primary" size="lg">
                  Request Your Free In-Home Consultation
                </Button>
                <Button href={`tel:${siteConfig.business.phone}`} variant="secondary" size="lg" tone="light">
                  Call Jim at {siteConfig.business.phoneFormatted}
                </Button>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div
                className="relative rounded-2xl overflow-hidden border"
                style={{
                  aspectRatio: "4 / 3",
                  borderColor: "var(--border-light)",
                  boxShadow: "0 24px 60px rgba(7, 7, 6, 0.16)",
                }}
              >
                <Image
                  src="/images/sections/consultation-doorstep.jpg"
                  alt="Fabric sample books and a tool bag on the front step of a New England colonial home."
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </>
  );
}
