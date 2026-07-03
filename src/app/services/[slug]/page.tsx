import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card, Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { JsonLd } from "@/components/JsonLd";
import { buildServiceSchema } from "@/lib/schema";

/**
 * /services/[slug] - Dynamic service detail page.
 *
 * Next 16 params are async Promises (Pattern #66 BINDING).
 * H1 = .hero-shimmer (CLAUDE.md §6 + §15).
 * ZERO em dashes in string literals (CLAUDE.md §13).
 */

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = siteConfig.services.find((s) => s.slug === slug);
  if (!svc) return {};
  return {
    title: svc.name,
    description: svc.shortDescription,
  };
}

/** Service-specific "Who it's for" audience copy, keyed by the new service slugs. */
const audienceMap: Record<string, string[]> = {
  "in-home-consultation": [
    "Homeowners who want to see real Hunter Douglas samples in their own light before spending a dollar",
    "Busy families who would rather have the showroom come to them than drive to a store",
    "Anyone comparing shades, blinds, shutters, and drapery and wanting honest guidance on what fits",
    "First-time buyers who want to be educated, not sold, and told the truth about cost",
  ],
  "interior-design": [
    "Homeowners unsure which product suits a room's light, style, and how they live in it",
    "People layering treatments, like drapery over sheers, and wanting it to look intentional",
    "Anyone weighing privacy, glare, and energy savings against the look they want",
    "Homeowners who want fabric, color, and texture guidance with real samples in hand",
  ],
  "free-estimates": [
    "Homeowners who want a real installed price, not a teaser or an online guess",
    "People who want removal and disposal of old blinds included in the number upfront",
    "Buyers who want to know exactly what they are spending before they commit to anything",
    "Anyone who has questions about financing a larger whole-home project",
  ],
  "measuring-and-installation": [
    "Homeowners ordering custom Hunter Douglas built to their exact openings",
    "People who want one accountable person from measure to install, no handoffs",
    "Anyone with tricky or oversized windows that demand a precise professional measurement",
    "Buyers who want a clean, certified install and their old treatments hauled away",
  ],
  "installs-and-repairs": [
    "Homeowners with a Hunter Douglas treatment that needs a warranty repair",
    "People who bought a shade elsewhere, or from a shop that has closed, and still need it fixed",
    "Anyone who would rather have Jim handle pickup, service center delivery, and reinstall",
    "Homeowners who want the service fee disclosed upfront, before anything happens",
  ],
  "blind-and-shade-repairs": [
    "Homeowners with a broken cord, tired mechanism, or a motor that stopped responding",
    "People deciding honestly between repairing a treatment and replacing it",
    "Anyone with a Hunter Douglas product bought elsewhere that still deserves a fix",
    "Buyers who want free warranty repairs handled without the runaround",
  ],
  "powerview-automation": [
    "Homeowners who want to control shades from a phone, their voice, or a wall remote",
    "Snowbirds who want to run their New England shades from out of state",
    "Anyone with hard-to-reach or high windows that are a chore to adjust by hand",
    "People who want to cut glare and UV automatically on a schedule",
  ],
};

/** Service-specific "How it works" steps, keyed by the new service slugs. */
const processSteps: Record<string, { title: string; body: string }[]> = {
  "in-home-consultation": [
    { title: "Request your free visit", body: "Tell Jim your town, your rooms, and roughly what you are thinking. The consultation is always free and carries no obligation." },
    { title: "The showroom comes to you", body: "Jim arrives with the real Hunter Douglas samples and holds them in your own windows, so you see every color and fabric in your light." },
    { title: "Measure and educate", body: "Jim measures every opening himself and walks you through what fits the room, the light, and how you live. He sells you what you deserve." },
    { title: "Honest installed price", body: "You get a real, installed price at your kitchen table, removal of your old treatments included. No pressure, guaranteed for life." },
  ],
  "interior-design": [
    { title: "Read the room", body: "Jim looks at how the light moves through the space, the style of the home, and how you actually use the room." },
    { title: "Match the product", body: "Sheers for diffused light, cellular for a bedroom you want dark, shutters for a timeless look. The right product for the room." },
    { title: "See it in your light", body: "Fabric, color, and texture reviewed with real samples in your own windows, including layered options like drapery over sheers." },
    { title: "No design fee", body: "The guidance comes standard. It is part of the free consultation, not an add-on charge." },
  ],
  "free-estimates": [
    { title: "Measure your actual windows", body: "Pricing comes from a real measurement Jim takes at your home, not a guess online. Custom means a real number." },
    { title: "An installed number", body: "The quote is the real, installed price, and it already includes taking down and hauling away your old blinds." },
    { title: "No obligation", body: "Every quote is free and no-obligation. You will know exactly what you are spending before you commit to anything." },
    { title: "Financing questions welcome", body: "If you are planning a larger whole-home project, ask Jim about financing. He will give you straight answers on cost." },
  ],
  "measuring-and-installation": [
    { title: "Precise measurement by Jim", body: "Custom Hunter Douglas is built to your exact opening, so Jim takes every measurement personally. It has to be right the first time." },
    { title: "Built for your windows", body: "Your treatments are fabricated to your specific openings at the Hunter Douglas factory. Jim confirms the products and options with you." },
    { title: "Clean, certified install", body: "Jim installs the finished product himself. No subcontractors, no handoffs, one person accountable from measure to install." },
    { title: "Old treatments removed", body: "Jim removes and disposes of your old blinds as part of the job, and every install is guaranteed for life." },
  ],
  "installs-and-repairs": [
    { title: "Tell Jim what broke", body: "Describe the treatment and the problem. Because Hunter Douglas is guaranteed for life, the repair itself is often free under warranty." },
    { title: "Choose your path", body: "Drive the blind to the authorized service center, Goedecke Design in Bedford NH, yourself at no cost, or have Jim handle the whole thing." },
    { title: "Service and reinstall", body: "If Jim handles it, he takes the treatment down, delivers it, and reinstalls it. The flat service fee is disclosed upfront, before anything happens." },
    { title: "Back to guaranteed for life", body: "Your repaired treatment goes right back under the Hunter Douglas lifetime guarantee. You call Jim, and he answers." },
  ],
  "blind-and-shade-repairs": [
    { title: "Describe the problem", body: "Cord, mechanism, motor, or fabric. Tell Jim what happened, even if you bought it elsewhere or the original shop is long gone." },
    { title: "Repair versus replace", body: "Jim gives you honest guidance on whether a fix makes sense or a replacement is the smarter move. No pushing you toward the expensive option." },
    { title: "Free under warranty", body: "Because the products are guaranteed for life, most Hunter Douglas repairs are free under warranty. Jim handles the service center relationship." },
    { title: "Pickup and reinstall option", body: "Want it fully handled? Jim picks it up, gets it fixed, and reinstalls it for a flat service fee, disclosed to you upfront." },
  ],
  "powerview-automation": [
    { title: "Plan the automation", body: "Jim looks at which windows to motorize and how you want to control them, by phone, voice, remote, or an automatic schedule." },
    { title: "Install and configure", body: "Jim installs the PowerView motorization and sets up the schedules, scenes, and app so everything works the day he leaves." },
    { title: "Control from anywhere", body: "Adjust your shades from the couch or from Florida. Snowbirds run their New England shades from out of state, all season." },
    { title: "Learn to use it", body: "Jim teaches you how to run it, and it is all guaranteed for life. Think of it as sunglasses for your windows, on a schedule." },
  ],
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const svc = siteConfig.services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const audience = audienceMap[slug] ?? [];
  const steps = processSteps[slug] ?? [];

  // Pull up to 5 FAQs from the global FAQ list for this service.
  // Falls back to first 5 if no specific match.
  const serviceFaqs = siteConfig.faq.slice(0, 5);

  return (
    <>
      <JsonLd data={buildServiceSchema(svc)} id={`service-${svc.slug}-jsonld`} />
      {/* 1. Service Hero */}
      <Section tone="base" className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <FadeUp>
                <Eyebrow>Service</Eyebrow>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1
                  className="text-h1 hero-shimmer font-display mt-4"
                  style={{ maxWidth: "20ch" }}
                >
                  {svc.name}
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p
                  className="mt-6 font-body"
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "1.125rem",
                    lineHeight: 1.65,
                    maxWidth: "65ch",
                  }}
                >
                  {svc.longDescription}
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="mt-4">
                  <p
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: "var(--accent)" }}
                  >
                    {svc.pricingNote}
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.4}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/request-a-consultation" variant="primary" size="lg">
                    {svc.cta.label}
                  </Button>
                  <Button href="tel:+16038915755" variant="secondary" size="lg">
                    Call Jim
                  </Button>
                </div>
              </FadeUp>
            </div>

            {svc.imageSrc && (
              <FadeUp delay={0.2}>
                <Image
                  src={svc.imageSrc}
                  alt={
                    svc.imageAlt ??
                    `${svc.name} by Window Fantasies, custom Hunter Douglas window treatments`
                  }
                  width={svc.imageW}
                  height={svc.imageH}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="block mx-auto rounded-2xl border border-[var(--border-dark)] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                  style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "560px" }}
                  priority
                />
              </FadeUp>
            )}
          </div>
        </Container>
      </Section>

      {/* 2. What you get (features list) — CREAM band, white cards */}
      <Section tone="cream">
        <Container>
          <FadeUp>
            <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>What You Get</p>
            <h2 className="text-h2 font-display mt-3" style={{ color: "var(--text-on-light)" }}>
              Everything included, every charge disclosed.
            </h2>
          </FadeUp>
          {/* StaggerContainer must be the grid itself. Wrapping it in a grid
              div and giving it `display:contents` removes its layout box, which
              breaks the in-view IntersectionObserver so the cards never animate
              past opacity:0 and the whole section reads blank. */}
          <StaggerContainer
            staggerDelay={0.06}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {svc.features.map((feature, i) => (
              <StaggerItem key={i}>
                <div
                  className="h-full rounded-2xl p-6 sm:p-8 border"
                  style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)" }}
                >
                  <div className="flex gap-3">
                    <span
                      className="flex-shrink-0 mt-1"
                      style={{ color: "var(--gold-deep)", fontWeight: 700, fontSize: "1.125rem" }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span
                      className="font-body"
                      style={{
                        color: "var(--text-on-light)",
                        fontSize: "1rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* 3. Who it's for */}
      {audience.length > 0 && (
        <Section tone="base">
          <Container>
            <FadeUp>
              <Eyebrow>Who It Is For</Eyebrow>
              <h2 className="text-h2 font-display mt-3" style={{ color: "var(--text-primary)" }}>
                If this sounds like your situation, this is the line.
              </h2>
            </FadeUp>
            <ul className="mt-10 space-y-4 max-w-3xl">
              {audience.map((item, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <li className="flex gap-4">
                    <span
                      className="flex-shrink-0 mt-2"
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "999px",
                        background: "var(--accent)",
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="font-body"
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "1.0625rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                </FadeUp>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* 4. How it works (4-step) — CREAM band, white cards */}
      {steps.length > 0 && (
        <Section tone="cream">
          <Container>
            <FadeUp>
              <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>How It Works</p>
              <h2 className="text-h2 font-display mt-3" style={{ color: "var(--text-on-light)" }}>
                Four steps, fully documented.
              </h2>
            </FadeUp>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div
                    className="h-full rounded-2xl p-6 sm:p-8 border"
                    style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)" }}
                  >
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-3"
                      style={{ color: "var(--gold-deep)" }}
                    >
                      Step {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className="text-h4 font-display"
                      style={{ color: "var(--text-on-light)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="mt-3 font-body"
                      style={{
                        color: "var(--muted-on-light)",
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. FAQ — DARK band */}
      <Section tone="base">
        <Container>
          <FadeUp>
            <Eyebrow>Frequently Asked</Eyebrow>
            <h2 className="text-h2 font-display mt-3" style={{ color: "var(--text-primary)" }}>
              The questions buyers ask first.
            </h2>
          </FadeUp>
          <div className="mt-10 space-y-4 max-w-3xl">
            {serviceFaqs.map((item, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <Card hoverable={false}>
                  <h3
                    className="text-h3 font-display"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.q}
                  </h3>
                  <p
                    className="mt-4 font-body"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "1rem",
                      lineHeight: 1.65,
                      maxWidth: "65ch",
                    }}
                  >
                    {item.a}
                  </p>
                </Card>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <p
              className="mt-8 font-body text-center"
              style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
            >
              More questions? See the{" "}
              <Link href="/faq" style={{ color: "var(--primary)" }} className="hover:underline">
                full FAQ
              </Link>
              .
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* 6. Final CTA — CREAM, steps into the dark footer */}
      <Section tone="cream">
        <Container size="narrow">
          <FadeUp>
            <div className="text-center">
              <h2
                className="text-h2 font-display"
                style={{ color: "var(--text-on-light)" }}
              >
                Let Jim bring the showroom to you.
              </h2>
              <p
                className="mt-6 font-body"
                style={{ color: "var(--muted-on-light)", fontSize: "1.0625rem", lineHeight: 1.65 }}
              >
                Request a free in-home consultation. Jim brings the real Hunter Douglas samples, measures your windows, and gives you an honest installed price at your kitchen table. No pressure, no showroom to drive to, guaranteed for life.
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
