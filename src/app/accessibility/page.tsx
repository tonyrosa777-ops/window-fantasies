import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { FadeUp } from "@/components/animations/FadeUp";

/**
 * /accessibility — accessibility statement. H1 = .hero-shimmer.
 * Zero em dashes (CLAUDE.md §13).
 */

export const metadata: Metadata = {
  title: "Accessibility",
  description: `The ${siteConfig.business.name} accessibility statement. We are committed to making our website usable for everyone. Contact us if you run into a barrier.`,
};

const SECTIONS: { h: string; p: string }[] = [
  {
    h: "Our commitment",
    p: "Window Fantasies is committed to making this website accessible to as many people as possible, including people who use assistive technology such as screen readers, screen magnifiers, and keyboard navigation. We aim to meet the WCAG 2.1 AA guidelines as a practical standard.",
  },
  {
    h: "What we do",
    p: "We design with clear color contrast, descriptive alternative text on images, labeled form fields, keyboard-navigable menus, and a layout that reflows on any screen size. Motion is kept restrained, and we respect the reduce-motion setting in your browser or operating system.",
  },
  {
    h: "Ongoing work",
    p: "Accessibility is not a one-time task. As we add pages and features, we review them for usability with assistive technology and fix issues as we find them. If a third-party tool on the site does not meet our standard, we work to replace or improve it.",
  },
  {
    h: "Tell us if something is hard to use",
    p: "If you run into a barrier on this site, please tell us. Call or email and we will help you directly and fix the problem. Your feedback makes the site better for everyone.",
  },
];

export default function AccessibilityPage() {
  const { business } = siteConfig;

  return (
    <>
      <Section tone="base" className="pt-32 sm:pt-36 lg:pt-40">
        <Container size="narrow">
          <FadeUp>
            <Eyebrow>Accessibility</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-h1 hero-shimmer font-display mt-4" style={{ maxWidth: "22ch" }}>
              An accessible site for everyone.
            </h1>
          </FadeUp>
        </Container>
      </Section>

      <Section tone="elevated">
        <Container size="narrow">
          <div className="space-y-10">
            {SECTIONS.map((s) => (
              <FadeUp key={s.h}>
                <h2 className="font-display text-h3" style={{ color: "var(--text-primary)" }}>
                  {s.h}
                </h2>
                <p className="mt-3 font-body" style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.7, maxWidth: "68ch" }}>
                  {s.p}
                </p>
              </FadeUp>
            ))}

            <FadeUp>
              <div className="rounded-2xl border p-6 sm:p-8" style={{ background: "var(--bg-card)", borderColor: "var(--border-dark)" }}>
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                  Contact us
                </p>
                <p className="font-body" style={{ color: "var(--text-primary)", lineHeight: 1.7 }}>
                  Call{" "}
                  <a href={`tel:${business.phone}`} className="phone-display hover:underline" style={{ color: "var(--primary)" }}>
                    {business.phoneFormatted}
                  </a>{" "}
                  or email{" "}
                  <a href={`mailto:${business.email}`} className="hover:underline" style={{ color: "var(--primary)" }}>
                    {business.email}
                  </a>
                  .
                </p>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </>
  );
}
