import type { Metadata } from "next";
import { Fragment } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { RoiCalculator } from "./RoiCalculator";

/**
 * /pricing -- INTERNAL Optimus Business Solutions sales tool.
 * Shown to the client during the demo so they see what tier the demo
 * represents. Deleted before public launch; noindex + nofollow.
 *
 * Band rhythm (footer-anchored, strictly alternating):
 * // [Nav]              -- chrome
 * // Page header        -- DARK  -- orientation (internal tool framing)
 * // Three packages     -- LIGHT -- offer (peer-equal tier cards)
 * // ROI calculator     -- DARK  -- proof (interactive math)
 * // Comparison + close -- LIGHT -- decision support + honest close
 * // [Footer]           -- DARK  -- fixed bookend
 * // Tone string: D L D L D -- zero DD/LL runs, last content band opposite footer.
 */

export const metadata: Metadata = {
  title: "Pricing (Internal)",
  description:
    "Internal Optimus Business Solutions pricing overview for the Window Fantasies build. Sales tool only, removed before launch.",
  robots: { index: false, follow: false },
};

interface Tier {
  name: string;
  positioning: string;
  price: string;
  tagline: string;
  badge?: string;
  features: string[];
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    positioning: "The Digital Storefront",
    price: "$1,500",
    tagline: "The premium foundation: every page a customer needs to trust Jim and reach out.",
    features: [
      "Cinematic Movie Hero homepage, the stitched Hunter Douglas film loop",
      "Products catalog: Shades, Blinds, Shutters, Drapery",
      "Services overview",
      "About Jim story page",
      "Request-a-Consultation lead form + tap-to-call",
      "FAQ page",
      "Mobile-first build + core SEO foundation",
      "Premium black-and-gold design system",
    ],
  },
  {
    name: "Pro",
    positioning: "The Lead Engine",
    price: "$3,000",
    tagline: "Everything in Starter, plus the machinery that goes out and finds the leads. This is the live demo.",
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Professional Blog: 10 search-driven, source-cited articles",
      "Lead-Capture Quiz that lets visitors sell themselves",
      "Photo Gallery portfolio",
      "Testimonials Showcase built from real customer reviews",
      "29 town Service-Area pages across New England: per-town copy, photos, FAQs, schema",
      "PowerView Motorization page",
      "Product detail pages",
      "Full AEO/GEO optimization: answer-first content, FAQ schema, AI-crawler readiness",
    ],
  },
  {
    name: "Premium",
    positioning: "The Virtual Showroom",
    price: "$5,500",
    tagline: "Everything in Pro, plus an interactive showroom that sends Jim pre-sold leads.",
    features: [
      "Everything in Pro",
      "“See It In Your Room” Visualizer: visitors upload a photo of their own window, preview shade, shutter, and drapery styles rendered in their room, and send the favorite straight to Jim with their consultation request",
      "Pre-sold leads: the consultation arrives with the product already chosen",
      "Seasonal Content Engine: quarterly refresh with 4 new blog articles + a seasonal hero re-grade per year, year one included",
      "Priority same-week revision support for year one",
    ],
  },
];

interface ComparisonRow {
  feature: string;
  starter: boolean;
  pro: boolean;
  premium: boolean;
}

interface ComparisonGroup {
  category: string;
  rows: ComparisonRow[];
}

const COMPARISON: ComparisonGroup[] = [
  {
    category: "Foundation",
    rows: [
      { feature: "Cinematic Movie Hero homepage", starter: true, pro: true, premium: true },
      { feature: "Products catalog (Shades, Blinds, Shutters, Drapery)", starter: true, pro: true, premium: true },
      { feature: "Services overview", starter: true, pro: true, premium: true },
      { feature: "About Jim story page", starter: true, pro: true, premium: true },
      { feature: "FAQ page", starter: true, pro: true, premium: true },
      { feature: "Mobile-first build + core SEO foundation", starter: true, pro: true, premium: true },
      { feature: "Premium black-and-gold design system", starter: true, pro: true, premium: true },
    ],
  },
  {
    category: "Conversion",
    rows: [
      { feature: "Request-a-Consultation lead form + tap-to-call", starter: true, pro: true, premium: true },
      { feature: "Lead-Capture Quiz", starter: false, pro: true, premium: true },
      { feature: "“See It In Your Room” Visualizer", starter: false, pro: false, premium: true },
      { feature: "Pre-sold leads with the product already chosen", starter: false, pro: false, premium: true },
    ],
  },
  {
    category: "Content & Search",
    rows: [
      { feature: "Professional Blog (10 search-driven, source-cited articles)", starter: false, pro: true, premium: true },
      { feature: "29 town Service-Area pages across New England", starter: false, pro: true, premium: true },
      { feature: "Product detail pages", starter: false, pro: true, premium: true },
      { feature: "PowerView Motorization page", starter: false, pro: true, premium: true },
      { feature: "Full AEO/GEO optimization (answer-first content, FAQ schema, AI-crawler readiness)", starter: false, pro: true, premium: true },
    ],
  },
  {
    category: "Experience",
    rows: [
      { feature: "Photo Gallery portfolio", starter: false, pro: true, premium: true },
      { feature: "Testimonials Showcase (real customer reviews)", starter: false, pro: true, premium: true },
      { feature: "Seasonal Content Engine (quarterly refresh, year one included)", starter: false, pro: false, premium: true },
    ],
  },
  {
    category: "Support",
    rows: [
      { feature: "Launch walkthrough + handoff", starter: true, pro: true, premium: true },
      { feature: "Priority same-week revision support (year one)", starter: false, pro: false, premium: true },
    ],
  },
];

function IncludedMark({ included }: { included: boolean }) {
  if (!included) {
    return <span className="sr-only">Not included</span>;
  }
  return (
    <span aria-hidden="false" role="img" aria-label="Included">
      ✅
    </span>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* 1. Page header -- DARK. Internal tool: clean dark band with the
          standard radial gradient (Section handles it), no photo. */}
      <Section tone="base" className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <FadeUp>
            <p className="eyebrow">Optimus Business Solutions · Internal</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-h1 hero-shimmer font-display mt-4" style={{ maxWidth: "24ch" }}>
              Three ways to build Window Fantasies online.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mt-6 font-body"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.125rem",
                lineHeight: 1.6,
                maxWidth: "62ch",
              }}
            >
              Same premium standard at every tier. The packages differ in how hard the site works to
              go out and win leads on its own.
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* 2. Three packages -- LIGHT. Peer-equal cards on a shared grid: equal
          width, aligned tops, equal gaps. Pro distinguished ONLY by the gold
          badge + gold border. */}
      <Section tone="cream">
        <Container size="wide">
          <FadeUp className="text-center">
            <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>
              The Packages
            </p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
              One standard, three engines.
            </h2>
          </FadeUp>
          <StaggerContainer
            staggerDelay={0.12}
            className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
          >
            {TIERS.map((tier) => {
              const isPro = tier.badge != null;
              return (
                <StaggerItem key={tier.name} className="h-full">
                  <div
                    className="relative flex h-full flex-col rounded-2xl border p-6 sm:p-8"
                    style={{
                      background: "var(--bg-card-light)",
                      borderColor: isPro ? "var(--primary)" : "var(--border-light)",
                      borderWidth: isPro ? 2 : 1,
                      boxShadow: isPro ? "0 18px 48px rgba(137, 97, 43, 0.22)" : undefined,
                    }}
                  >
                    {isPro && (
                      <span
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 font-body text-xs font-semibold uppercase tracking-widest"
                        style={{ background: "var(--gold-gradient)", color: "var(--ink)" }}
                      >
                        {tier.badge}
                      </span>
                    )}
                    <p
                      className="font-mono text-xs uppercase tracking-widest"
                      style={{ color: "var(--gold-deep)" }}
                    >
                      {tier.name}
                    </p>
                    <h3
                      className="mt-2 text-h3 font-display"
                      style={{ color: "var(--text-on-light)" }}
                    >
                      {tier.positioning}
                    </h3>
                    <p
                      className="mt-4 font-display phone-display"
                      style={{ color: "var(--text-on-light)", fontSize: "3rem", lineHeight: 1 }}
                    >
                      {tier.price}
                    </p>
                    <p
                      className="mt-4 font-body"
                      style={{ color: "var(--muted-on-light)", fontSize: "0.95rem", lineHeight: 1.6 }}
                    >
                      {tier.tagline}
                    </p>
                    <ul
                      className="mt-6 flex-1 space-y-3 border-t pt-6"
                      style={{ borderColor: "var(--border-light)" }}
                    >
                      {tier.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 font-body"
                          style={{
                            color: "var(--text-on-light)",
                            fontSize: "0.9rem",
                            lineHeight: 1.55,
                          }}
                        >
                          <span className="flex-shrink-0" aria-hidden="true">
                            ✅
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button
                        href="/request-a-consultation"
                        variant={isPro ? "primary" : "secondary"}
                        tone="light"
                        size="md"
                        className="w-full"
                      >
                        Start With This Package
                      </Button>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </Section>

      {/* 3. ROI calculator -- DARK. One idea: the math. Widget is an elevated
          graphite surface with gold accents stepping off the dark band. */}
      <Section tone="base">
        <Container>
          <FadeUp className="text-center">
            <p className="eyebrow">Do the Math</p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-primary)" }}>
              What one month of captured leads is worth.
            </h2>
            <p
              className="mt-4 font-body mx-auto"
              style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.6, maxWidth: "58ch" }}
            >
              Slide to your averages, pick a package, and see how fast the site pays for itself.
            </p>
          </FadeUp>
          <FadeUp delay={0.15} className="mt-12">
            <RoiCalculator />
          </FadeUp>
        </Container>
      </Section>

      {/* 4. Comparison chart + honest close -- LIGHT (ends light before the
          dark footer; the close lives in this band's tail per the rhythm map). */}
      <Section tone="cream">
        <Container size="wide">
          <FadeUp className="text-center">
            <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>
              Side by Side
            </p>
            <h2 className="mt-4 text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
              Every feature, every tier.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15} className="mt-12">
            <div
              className="overflow-x-auto rounded-2xl border"
              style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)" }}
            >
              <table className="w-full border-collapse font-body" style={{ minWidth: "680px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <th
                      scope="col"
                      className="px-5 py-4 text-left text-sm font-semibold"
                      style={{ color: "var(--text-on-light)" }}
                    >
                      Feature
                    </th>
                    {TIERS.map((tier) => (
                      <th
                        key={tier.name}
                        scope="col"
                        className="px-5 py-4 text-center text-sm font-semibold"
                        style={{ color: "var(--text-on-light)", width: "16%" }}
                      >
                        <span className="block">{tier.name}</span>
                        <span
                          className="block mt-0.5 font-mono text-xs font-medium"
                          style={{ color: "var(--gold-deep)" }}
                        >
                          {tier.price}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((group) => (
                    <Fragment key={group.category}>
                      <tr>
                        <th
                          scope="colgroup"
                          colSpan={4}
                          className="px-5 py-3 text-left font-mono text-xs uppercase tracking-widest"
                          style={{
                            color: "var(--gold-deep)",
                            background: "var(--parchment)",
                            borderTop: "1px solid var(--border-light)",
                            borderBottom: "1px solid var(--border-light)",
                          }}
                        >
                          {group.category}
                        </th>
                      </tr>
                      {group.rows.map((row) => (
                        <tr
                          key={row.feature}
                          style={{ borderBottom: "1px solid var(--border-light)" }}
                        >
                          <td
                            className="px-5 py-3.5 text-sm"
                            style={{ color: "var(--text-on-light)", lineHeight: 1.5 }}
                          >
                            {row.feature}
                          </td>
                          <td className="px-5 py-3.5 text-center">
                            <IncludedMark included={row.starter} />
                          </td>
                          <td className="px-5 py-3.5 text-center">
                            <IncludedMark included={row.pro} />
                          </td>
                          <td className="px-5 py-3.5 text-center">
                            <IncludedMark included={row.premium} />
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>

          {/* Honest close -- the tail of this light band (keeps the tone string
              alternating into the dark footer). */}
          <FadeUp delay={0.1} className="mt-16 text-center">
            <h2 className="text-h3 font-display" style={{ color: "var(--text-on-light)" }}>
              The demo you just walked through is the Pro package.
            </h2>
            <p
              className="mt-4 font-body mx-auto"
              style={{ color: "var(--muted-on-light)", fontSize: "1.0625rem", lineHeight: 1.6, maxWidth: "56ch" }}
            >
              Everything you clicked, every town page, the quiz, the blog, the reviews: that is the
              $3,000 build, live. Pick the tier that fits and we start from here.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/request-a-consultation" variant="primary" size="lg">
                Start With This Package
              </Button>
            </div>
            <p
              className="mt-6 font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--muted-on-light)" }}
            >
              Pricing page is an internal sales tool and comes down before launch.
            </p>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
