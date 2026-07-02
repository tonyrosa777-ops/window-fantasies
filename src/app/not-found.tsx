import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { siteConfig } from "@/data/site";

/**
 * not-found.tsx — root App Router 404. Converts dead links into a recovery path
 * back to the pages that convert. Server component, renders inside root layout.
 */

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "That page moved or never existed. Here is where everything lives at Window Fantasies: products, services, and a free in-home consultation.",
  robots: { index: false, follow: true },
};

const quickLinks: { label: string; href: string; blurb: string }[] = [
  { label: "Shades, Blinds, Shutters, Drapery", href: "/products", blurb: "The full Hunter Douglas line." },
  { label: "What Jim Does", href: "/services", blurb: "Consultation, install, repairs, motorization." },
  { label: "See the Work", href: "/portfolio", blurb: "Real installs in real New England homes." },
  { label: "Service Areas", href: "/service-areas", blurb: "All of New England." },
];

export default function NotFound() {
  const { business } = siteConfig;

  return (
    <Section tone="base" id="not-found" className="min-h-[72vh] flex items-center pt-32 sm:pt-36">
      <Container size="narrow">
        <FadeUp className="text-center flex flex-col items-center gap-7">
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
            Error 404
          </p>

          <span
            aria-hidden="true"
            className="hero-shimmer font-display"
            style={{
              fontSize: "clamp(4.5rem, 18vw, 9rem)",
              lineHeight: 0.9,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            404
          </span>

          <h1 className="font-display text-h2" style={{ color: "var(--text-primary)", lineHeight: 1.15 }}>
            That page moved, or never existed.
          </h1>

          <p className="font-body text-base md:text-lg max-w-prose" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
            No trouble at all. Everything you need is one click away, or just call Jim and he will point you to it.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-1">
            <Button href="/request-a-consultation" variant="primary" size="lg">
              Request a Free Consultation
            </Button>
            <Button href="/" variant="secondary" size="lg">
              Back to Home
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-8">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col gap-1 text-left rounded-xl border p-5 transition-all duration-200 hover:-translate-y-px"
                style={{ background: "var(--bg-card)", borderColor: "rgba(246, 241, 225, 0.08)" }}
              >
                <span className="font-display text-lg transition-colors duration-200 group-hover:text-[var(--primary)]" style={{ color: "var(--text-primary)" }}>
                  {link.label}
                </span>
                <span className="font-body text-sm" style={{ color: "var(--text-secondary)" }}>
                  {link.blurb}
                </span>
              </Link>
            ))}
          </div>

          <p className="font-mono text-xs uppercase tracking-widest pt-6" style={{ color: "var(--text-muted)" }}>
            Prefer to talk? <span className="phone-display">{business.phoneFormatted}</span>
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}
