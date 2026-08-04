import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card, Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { HDPhotoCredit } from "@/components/brand/HDPhotoCredit";
import { PowerViewDisclosure } from "@/components/brand/PowerViewDisclosure";
import { POWERVIEW_APP_DISCLOSURE } from "@/data/hunterDouglas";
import { siteConfig } from "@/data/site";
import { CURRENT_PROMOTION } from "@/data/promotion";
import { PromotionCard } from "@/components/sections/PromotionCard";
import type { HDProductLine } from "@/data/products";

/**
 * ProductLinePage — one Hunter Douglas product line.
 *
 * ⚠️ COMPLIANCE SURFACE. Four HD requirements are load-bearing here:
 *
 *  1. PHOTO ATTRIBUTION. Every HD photograph on the page is labelled with the
 *     specific product it promotes. HD's reviewer confirmed only the FIRST
 *     instance in a product section needs it, so the hero photo carries an
 *     overlay credit and the gallery carries one credit for the set, rather
 *     than one per tile.
 *  2. TRADEMARK FORM. Names arrive pre-formatted from src/data/products, which
 *     is generated against HD's trademark list. Never re-type a product name
 *     into this template.
 *  3. POWERVIEW LEGAL COPY. If the line's copy promises scheduling or app
 *     control, HD's App sentence is mandatory. Detected from the content rather
 *     than hardcoded per slug, so it cannot be missed when copy changes.
 *  4. NO PRICING. Nothing on this page states or implies a price. HD bars
 *     dealer sites from publishing product price quotes; the CTA is the free
 *     in-home consultation, which is the shop-at-home experience HD sanctions.
 */

type Props = { line: HDProductLine };

const CATEGORY_LABEL: Record<string, string> = {
  shades: "Shades",
  blinds: "Blinds",
  shutters: "Shutters",
  motorization: "Motorization",
};

export function ProductLinePage({ line }: Props) {
  const [hero, ...gallery] = line.photos;

  // Derived, not hardcoded: if the copy promises scheduling or app control, HD's
  // App footnote is required. Deriving it means new copy cannot silently ship a
  // scheduling claim without the disclosure.
  const promotesScheduling =
    /schedule|automatic|app\b|from your phone/i.test(
      [
        line.tagline,
        ...line.body,
        ...line.features,
        ...line.faq.map((f) => f.a),
        // valueCollection copy is scanned too. It is the newest field on this
        // type and it names PowerView®, so leaving it out of the derivation
        // would be exactly the silent gap this derivation exists to prevent:
        // new copy shipping a scheduling claim with no footnote.
        line.valueCollection?.intro ?? "",
      ].join(" "),
    );
  // The writers append the exact sentence as a final body paragraph; if it is
  // already there, do not render it twice.
  const disclosureInBody = line.body.some((p) => p.includes(POWERVIEW_APP_DISCLOSURE));

  return (
    <>
      {/* Hero: the product's own photograph, full bleed under the dark scrim. */}
      <Section tone="base" bgImage={hero?.src} bgImageAlt={hero?.alt} className="pt-32 sm:pt-36 lg:pt-40">
        <Container size="wide">
          <FadeUp className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                <li><Link href="/products" className="hover:text-[var(--primary)] transition-colors">Products</Link></li>
                <li aria-hidden="true">·</li>
                <li>
                  <Link href={`/products/${line.siteCategory}`} className="hover:text-[var(--primary)] transition-colors">
                    {CATEGORY_LABEL[line.siteCategory] ?? line.siteCategory}
                  </Link>
                </li>
              </ol>
            </nav>
            <Eyebrow>{line.hdCategory} · Hunter Douglas</Eyebrow>
            <h1 className="hero-shimmer font-display text-h1 mt-4 mb-5">{line.name}</h1>
            <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {line.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/request-a-consultation" variant="primary" size="lg">
                See it in your own light
              </Button>
              <Button href="tel:+16038915755" variant="secondary" size="lg">
                Call Jim
              </Button>
            </div>
          </FadeUp>
        </Container>
        {/* FIRST instance of HD photography on this page, so it carries the credit. */}
        {hero ? <HDPhotoCredit credit={hero.credit} variant="overlay" /> : null}
      </Section>

      {/* The product itself */}
      <Section tone="cream">
        <Container size="wide">
          {/* Current HD offer, ONLY on qualifying lines, and INSIDE this band so
              the page's tone alternation is unaffected. */}
          {CURRENT_PROMOTION.active && CURRENT_PROMOTION.qualifyingSlugs.includes(line.slug) ? (
            <div className="mb-12"><PromotionCard tone="cream" /></div>
          ) : null}
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-start">
            <FadeUp>
              <div className="flex flex-col gap-5">
                {/* Keyed by index, not by content. HD's trademark rule requires each
                    paragraph to restate "Hunter Douglas <Mark>® <Descriptor>" near the
                    mark, so consecutive paragraphs routinely share their opening
                    clause. A content-prefix key collided on NewStyle® Hybrid Shutters,
                    whose first two paragraphs are byte-identical for 40 characters.
                    These arrays are static and never reordered, so the index IS stable. */}
                {line.body.map((p, i) => (
                  <p key={i} className="font-body text-base md:text-lg leading-relaxed" style={{ color: "var(--muted-on-light)" }}>
                    {p}
                  </p>
                ))}
                {promotesScheduling && !disclosureInBody ? <PowerViewDisclosure tone="light" /> : null}
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <Card>
                <Eyebrow>What you get</Eyebrow>
                <ul className="mt-5 flex flex-col gap-3">
                  {line.features.map((f) => (
                    <li key={f} className="flex gap-3 font-body text-[0.975rem] leading-relaxed" style={{ color: "var(--muted-on-light)" }}>
                      <span aria-hidden="true" style={{ color: "var(--gold-deep)" }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* Gallery. One credit for the set: HD's first-instance rule means each
          tile does not need its own label, and per-tile captions on a grid read
          as clutter. */}
      {gallery.length > 0 ? (
        <Section tone="base">
          <Container size="wide">
            <FadeUp className="text-center max-w-2xl mx-auto mb-10">
              <Eyebrow>In real rooms</Eyebrow>
              <h2 className="mt-3 font-display text-h2">{line.shortName} at home.</h2>
            </FadeUp>
            <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {gallery.map((p) => (
                <StaggerItem key={p.src}>
                  <div className="relative w-full overflow-hidden rounded-[8px] border border-[var(--border-dark)]" style={{ aspectRatio: "4 / 3" }}>
                    <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <div className="mt-5">
              <HDPhotoCredit credit={hero?.credit ?? ""} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Hunter Douglas's more-accessible-price-point selection, where the line
          has one. See the compliance block on HDProductLine.valueCollection:
          no internal grid name, no prices, fabric names bare. This band exists
          to answer "is there a Hunter Douglas option that costs less" honestly,
          without quoting a number the policy forbids us to publish. */}
      {line.valueCollection ? (
        <Section tone="cream">
          <Container size="wide">
            <FadeUp className="max-w-3xl">
              <Eyebrow>A more accessible price point</Eyebrow>
              <h2 className="mt-3 font-display text-h2" style={{ color: "var(--text-on-light)" }}>
                Real Hunter Douglas, for a tighter budget.
              </h2>
              <p className="mt-4 font-body text-base md:text-lg leading-relaxed" style={{ color: "var(--muted-on-light)" }}>
                {line.valueCollection.intro}
              </p>
            </FadeUp>
            <StaggerContainer staggerDelay={0.06} className="mt-10 flex flex-wrap justify-center gap-5">
              {line.valueCollection.fabrics.map((f) => (
                <StaggerItem
                  key={f.style}
                  className="basis-full sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(25%-0.94rem)]"
                >
                  <div
                    className="h-full rounded-[8px] border p-5 flex flex-col gap-2"
                    style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)" }}
                  >
                    <h3 className="font-display text-lg" style={{ color: "var(--text-on-light)" }}>
                      {f.style}
                    </h3>
                    <p className="font-mono text-[0.7rem] uppercase tracking-widest" style={{ color: "var(--gold-deep)" }}>
                      {f.opacity}
                    </p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "var(--muted-on-light)" }}>
                      {f.colors.join(" · ")}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <FadeUp className="mt-8 text-center">
              <Button href="/request-a-consultation" variant="primary" size="lg">
                Ask Jim to bring these samples
              </Button>
            </FadeUp>
          </Container>
        </Section>
      ) : null}

      {/* FAQ */}
      {line.faq.length > 0 ? (
        <Section tone="cream">
          <Container size="narrow">
            <FadeUp className="text-center mb-10">
              <Eyebrow>Questions Jim gets</Eyebrow>
              <h2 className="mt-3 font-display text-h2" style={{ color: "var(--text-on-light)" }}>
                About {line.shortName}.
              </h2>
            </FadeUp>
            <div className="flex flex-col gap-4">
              {line.faq.map((f) => (
                <FadeUp key={f.q}>
                  <details className="group rounded-[8px] border p-5" style={{ borderColor: "var(--border-light)", background: "var(--bg-card-light)" }}>
                    <summary className="cursor-pointer font-display text-lg" style={{ color: "var(--text-on-light)" }}>
                      {f.q}
                    </summary>
                    <p className="mt-3 font-body text-[0.975rem] leading-relaxed" style={{ color: "var(--muted-on-light)" }}>
                      {f.a}
                    </p>
                  </details>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Close. The consultation IS the shop-at-home experience HD sanctions,
          and it is the only CTA: no price, no cart, no online ordering. */}
      <Section tone="base">
        <Container size="narrow">
          <FadeUp className="text-center">
            <Eyebrow>The next step</Eyebrow>
            <h2 className="mt-3 font-display text-h2">See {line.shortName} in your own windows.</h2>
            <p className="mt-4 font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              A photograph can only tell you so much. Jim brings the real Hunter Douglas
              samples to your home, holds them in your own windows, and shows you how they
              behave in your light. The consultation is free, and you get an honest
              installed price at your kitchen table.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/request-a-consultation" variant="primary" size="lg">
                {siteConfig.hero.ctaPrimary.label}
              </Button>
              <Button href={`/products/${line.siteCategory}`} variant="secondary" size="lg">
                More {CATEGORY_LABEL[line.siteCategory]?.toLowerCase() ?? "products"}
              </Button>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
