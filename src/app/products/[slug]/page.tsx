import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, type ProductLine } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PowerViewDisclosure } from "@/components/brand/PowerViewDisclosure";
import { ProductLinePage } from "@/components/sections/ProductLinePage";
import { getProductLine, isProductLineSlug, HD_PRODUCT_LINES } from "@/data/products";

/**
 * /products/[slug] - Next 16 Promise params (Pattern #66 BINDING).
 *
 * Window Fantasies is quote-based, so productLines carry no moqTiers. The
 * pricing tier table and volume calculator therefore never render. Every
 * treatment is custom Hunter Douglas, measured and installed by hand.
 *
 * Schema.org Product structured data (Pattern #45). With no published prices,
 * the offers array is empty and is simply omitted from the schema.
 *
 * Pattern #71 (no orphan grid cells):
 *  - Features grid: split into 2-col `grid-cols-1 md:grid-cols-2` for any count, paired.
 *
 * Zero em dashes (CLAUDE.md §13 BINDING).
 */

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Signature Hunter Douglas products per category, for the signature band.
 *
 * ⚠️ COMPLIANCE: every `name` and every mark written into `alt` carries its own
 * ® or ™ plus HD's official category descriptor, per the Trademark Usage rules
 * in src/data/hunterDouglas.ts. Palm Beach™ and Polysatin™ are BOTH ™, never ®.
 * Carole Fabrics is absent from HD's 2025 trademark list, so it ships with no
 * symbol on purpose. Verify any change against HD_MARKS before editing.
 *
 * The photos here are the site's own room stills, not Hunter Douglas licensed
 * photography (HD's 12 licensed photos live in /images/window-fashions/ and are
 * referenced from workItems in site.ts). That is why no <HDPhotoCredit /> renders
 * on this band: HD's attribution requirement covers THEIR photography, and
 * captioning a non-HD photo "by Hunter Douglas" would misattribute it.
 */
const signatureProducts: Record<
  string,
  { name: string; line: string; image: string; alt: string; w: number; h: number }[]
> = {
  shades: [
    { name: "Silhouette® Window Shadings", line: "S-vane sheers that float diffused light into the room with daytime privacy.", image: "/images/product-lines/silhouette.jpg", alt: "Hunter Douglas Silhouette® Window Shadings softening golden-hour light in a New England living room.", w: 2050, h: 1025 },
    { name: "Duette® Honeycomb Shades", line: "Energy-efficient cellular shades with true blackout when the room needs it dark.", image: "/images/product-lines/duette.jpg", alt: "Hunter Douglas Duette® Honeycomb Shades in a bright kitchen.", w: 900, h: 600 },
    { name: "Vignette® Modern Roman Shades", line: "Tailored modern Roman folds with no exposed cords or rings.", image: "/images/product-lines/vignette-roman.jpg", alt: "Tailored Hunter Douglas Vignette® Modern Roman Shades in a refined living room with a grand piano.", w: 2560, h: 1714 },
  ],
  blinds: [
    { name: "Parkland® Wood Blinds", line: "Classic real-wood warmth in more than fifty finishes.", image: "/images/product-lines/parkland-wood.jpg", alt: "Warm Hunter Douglas Parkland® Wood Blinds in a modern dining room.", w: 2050, h: 1025 },
    { name: "Installation by hand", line: "Every blind measured and installed by hand, cleanly, over any opening.", image: "/images/product-lines/installed-by-hand.jpg", alt: "Hunter Douglas wood blinds installed cleanly over a fireplace.", w: 2050, h: 1025 },
  ],
  shutters: [
    { name: "Heritance® Hardwood Shutters", line: "One hundred percent hardwood shutters with dovetail construction, timeless and built to last.", image: "/images/product-lines/heritance-shutter.jpg", alt: "Hunter Douglas hardwood plantation shutters in warm golden light.", w: 1025, h: 513 },
    { name: "Palm Beach™ Polysatin™ Shutters", line: "Never warps, cracks, or fades. Ideal for coastal homes, doors, and humid rooms.", image: "/images/product-lines/palmbeach-shutter.jpg", alt: "Plantation shutters framing French doors with an ocean view.", w: 1025, h: 513 },
  ],
  drapery: [
    { name: "Carole Fabrics custom drapery", line: "More than four thousand fabrics, layered over sheers or hung on their own.", image: "/images/product-lines/carole-drapery.jpg", alt: "Golden floor-length custom drapery layered over sheers in a formal New England living room.", w: 1025, h: 513 },
    { name: "Luminette® Privacy Sheers", line: "Drapery softness with the light control of a shade, for doors and wide windows.", image: "/images/product-lines/luminette-panels.jpg", alt: "Airy Hunter Douglas Luminette® Privacy Sheers with an ocean view.", w: 1025, h: 513 },
  ],
};

/**
 * PowerView® Automation availability, per line.
 *
 * HD compliance criterion 2: PowerView® Automation must be visible everywhere on
 * the site it applies, and product pages are named as the primary place. This is
 * keyed by slug because availability is a per-line fact, not a blanket one:
 *  - `shades` already carries "PowerView® Automation available across the line"
 *    in its site.ts features list, so repeating it here would double up.
 *  - `shutters` are hinged louvered panels with nothing to motorize, so claiming
 *    it there would be a false product claim.
 * That leaves blinds and drapery, both of which HD does build PowerView-capable.
 *
 * ⚠️ COMPLIANCE: every mark below carries its own ® plus HD's official category
 * descriptor, and the product is "PowerView® Automation", never "PowerView
 * Motorization". Both of these lines sit near the Hunter Douglas name (rule 5).
 * Verify any edit against HD_MARKS in src/data/hunterDouglas.ts.
 *
 * The copy stays on availability and on-command control. It makes no scheduling,
 * timing, or app claim, so it does not by itself trigger HD's app footnote, but
 * <PowerViewDisclosure /> renders with it anyway: the footnote costs one small
 * line and a missing one costs the dealer-locator listing.
 */
const powerViewByLine: Record<string, string> = {
  blinds:
    "Parkland® Wood Blinds and Skyline® Gliding Window Panels can both be fitted with Hunter Douglas PowerView® Automation, so the tall openings and the wide slider walls move at the touch of a button.",
  drapery:
    "Luminette® Privacy Sheers can be fitted with Hunter Douglas PowerView® Automation, so a whole bank of panels glides open without a wand or a cord to pull.",
};

/**
 * This route serves TWO page types off one dynamic segment: the four
 * consumer-facing CATEGORIES (shades, blinds, shutters, drapery) and the 23
 * Hunter Douglas PRODUCT LINES (silhouette-window-shadings, ...).
 *
 * Flat product URLs were chosen deliberately over nesting them under their
 * category: /products/duette-honeycomb-shades is what someone searching a
 * branded product term will match, and it is shorter than
 * /products/shades/duette-honeycomb-shades. The category pages stay as landing
 * pages for the generic terms.
 *
 * Slugs cannot collide - no product line is named "shades" - and
 * isProductLineSlug() is the discriminator everywhere below.
 */
export async function generateStaticParams() {
  return [
    ...siteConfig.productLines.map((p) => ({ slug: p.slug })),
    ...HD_PRODUCT_LINES.map((l) => ({ slug: l.slug })),
  ];
}

/**
 * ⚠️ COMPLIANCE: the title names the Hunter Douglas product category and names
 * the dealer SEPARATELY. It must never read "Hunter Douglas by Window
 * Fantasies": HD permits "Hunter Douglas by [Dealer Name]" only for Design
 * Gallery locations and dealers in HD's Exterior Signage Program, with written
 * HD Marketing approval. Window Fantasies is neither, so that construction
 * asserts a brand relationship that does not exist.
 *
 * The dealer name comes from the root layout's title template
 * (`%s | Window Fantasies`), so do NOT append it here or the tab double-brands.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const line = getProductLine(slug);
  if (line) {
    return {
      title: `Hunter Douglas ${line.name}`,
      description: line.tagline,
    };
  }

  const product = siteConfig.productLines.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `Hunter Douglas ${product.name}`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // Product line pages render their own template. See generateStaticParams for
  // why both types share this route.
  if (isProductLineSlug(slug)) {
    const line = getProductLine(slug)!;
    return <ProductLinePage line={line} />;
  }

  const product = siteConfig.productLines.find((p) => p.slug === slug);
  if (!product) notFound();

  const hasTiers = product.moqTiers.length > 0;
  const signature = signatureProducts[slug] ?? [];
  const powerViewNote = powerViewByLine[slug];
  const schema = buildProductSchema(product);

  // Pattern #71 features grid math: features render in 2-col, any count is OK
  // because we render in a 2-col grid that wraps. Document length and warn if
  // odd (last row orphan on desktop).
  if (product.features.length % 2 !== 0 && process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(
      `[products/${product.slug}] Pattern #71 grid math: features.length=${product.features.length} is odd. Last row in 2-col grid will have 1 orphan cell. Consider 6 features for clean rows.`
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* 1. HERO */}
      <Section tone="base" className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <Eyebrow>Hunter Douglas Product Line · Limited Lifetime Warranty</Eyebrow>
              <h1
                className="text-h1 hero-shimmer font-display mt-4"
                style={{ maxWidth: "22ch" }}
              >
                {product.name}
              </h1>
              <p
                className="mt-6 font-body"
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.125rem",
                  lineHeight: 1.65,
                  maxWidth: "60ch",
                }}
              >
                {product.shortDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  href="/request-a-consultation"
                  variant="primary"
                  size="lg"
                >
                  Request Your Free In-Home Consultation
                </Button>
                <Button href="tel:+16038915755" variant="secondary" size="lg">
                  Call Jim
                </Button>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                <li>Authorized Hunter Douglas Dealer</li>
                <li aria-hidden="true">·</li>
                <li>Measured &amp; installed by hand</li>
                <li aria-hidden="true">·</li>
                <li>Hunter Douglas Limited Lifetime Warranty</li>
              </ul>
            </div>

            {product.imageSrc && (
              <Image
                src={product.imageSrc}
                alt={product.imageAlt ?? `Custom Hunter Douglas ${product.name.toLowerCase()}, measured and installed by Window Fantasies`}
                width={product.imageW}
                height={product.imageH}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="block mx-auto rounded-2xl border border-[var(--border-dark)] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "560px" }}
                priority
              />
            )}
          </div>
        </Container>
      </Section>

      {/* 2. Pricing tier table (never renders for quote-based lines) */}
      {hasTiers && (
        <Section tone="elevated" id="pricing">
          <Container size="wide">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <Eyebrow className="mb-4">Pricing</Eyebrow>
              <h2 className="font-display text-h2" style={{ color: "var(--text-primary)" }}>
                Custom means a real, honest quote.
              </h2>
              <p
                className="mt-4 font-body"
                style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
              >
                Hunter Douglas is built for your exact windows, so pricing comes from a real measurement, not a guess. Jim gives you an installed price at your kitchen table, and it is always free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.moqTiers.map((tier, i) => {
                const isMostPopular = tier.label === "Most Popular";
                const tierLabel = tier.label ?? `Tier ${i + 1}`;

                return (
                  <div
                    key={i}
                    className="relative rounded-2xl border p-8 lg:p-10 flex flex-col transition-all duration-300"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: isMostPopular
                        ? "var(--primary)"
                        : "var(--border-dark)",
                      boxShadow: isMostPopular
                        ? "0 12px 40px rgba(201, 166, 107, 0.18)"
                        : undefined,
                    }}
                  >
                    {isMostPopular && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 inline-block font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded"
                        style={{
                          color: "var(--bg-base)",
                          background: "var(--primary)",
                        }}
                      >
                        Most Popular
                      </span>
                    )}

                    <p
                      className="font-mono text-xs uppercase tracking-widest"
                      style={{
                        color: isMostPopular ? "var(--primary)" : "var(--text-secondary)",
                      }}
                    >
                      {tierLabel}
                    </p>

                    <p
                      className="mt-4 font-display"
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "clamp(2.25rem, 4vw, 3rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {formatPriceLong(tier.pricePerUnit)}
                    </p>
                    <p
                      className="mt-1 font-mono text-xs uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      per unit
                    </p>

                    <div
                      className="mt-6 pt-6 border-t"
                      style={{ borderColor: "var(--border-dark)" }}
                    >
                      <p
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Minimum Quantity
                      </p>
                      <p
                        className="mt-2 font-display"
                        style={{
                          color: "var(--text-primary)",
                          fontSize: "1.5rem",
                          lineHeight: 1.1,
                        }}
                      >
                        {tier.quantity.toLocaleString("en-US")}+ units
                      </p>
                    </div>

                    <div
                      className="mt-4 pt-4 border-t"
                      style={{ borderColor: "var(--border-dark)" }}
                    >
                      <p
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Total at min quantity
                      </p>
                      <p
                        className="mt-2 font-body"
                        style={{
                          color: "var(--text-primary)",
                          fontSize: "1.0625rem",
                        }}
                      >
                        ${(tier.quantity * tier.pricePerUnit).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <Button
                      href="/request-a-consultation"
                      variant={isMostPopular ? "primary" : "secondary"}
                      size="md"
                      className="mt-8 w-full"
                    >
                      Request a Free Consultation
                    </Button>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* 3. FEATURES in a 2-col grid - CREAM band, white feature cards */}
      <Section tone="cream">
        <Container>
          {/* Default items-stretch (no items-start): the feature grid fills the
              full height of the taller left column via h-full + auto-rows-fr,
              so both columns bottom-align, no lopsided void (symmetry rule F/G). */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16">
            <div>
              <p className="eyebrow mb-3" style={{ color: "var(--gold-deep)" }}>
                What You Get
              </p>
              <h2
                className="font-display text-h2"
                style={{
                  color: "var(--text-on-light)",
                  maxWidth: "18ch",
                }}
              >
                Custom-built, and backed by the Hunter Douglas Limited Lifetime Warranty.
              </h2>
              <p
                className="mt-4 font-body"
                style={{ color: "var(--muted-on-light)", lineHeight: 1.6, maxWidth: "50ch" }}
              >
                Every {product.name.toLowerCase()} order is measured, designed, and installed by Jim himself. No sales team, no subcontractors, one person accountable from the first sample to the final install.
              </p>

              {powerViewNote && (
                <>
                  <p
                    className="mt-4 font-body"
                    style={{ color: "var(--muted-on-light)", lineHeight: 1.6, maxWidth: "50ch" }}
                  >
                    {powerViewNote}{" "}
                    <Link
                      href="/services/powerview-automation"
                      className="underline underline-offset-4"
                      style={{ color: "var(--gold-deep)" }}
                    >
                      See how PowerView® Automation works
                    </Link>
                    .
                  </p>
                  {/* Hunter Douglas MANDATORY LEGAL COPY, rendered with the claim
                      it belongs to. tone="light" because this is the CREAM band:
                      the component then uses --muted-on-light (#6E5C3F) instead of
                      the near-white --text-muted, which on cream renders at about
                      1:1 and is legally the same as not disclosing at all. */}
                  <PowerViewDisclosure tone="light" />
                </>
              )}

              {/* Honest-cost anchor (shared costAnchor, site.ts) - compact strip
                  inside this band so tone alternation stays intact. */}
              <div
                className="mt-8 rounded-[8px] border px-6 py-6"
                style={{
                  background: "var(--bg-card-light)",
                  borderColor: "var(--border-light)",
                }}
              >
                <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>
                  {siteConfig.costAnchor.eyebrow}
                </p>
                <p
                  className="mt-3 font-body"
                  style={{
                    color: "var(--muted-on-light)",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                  }}
                >
                  {siteConfig.costAnchor.body}
                </p>
              </div>
            </div>
            <div className="lg:h-full">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:h-full lg:auto-rows-fr">
                {product.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center rounded-[8px] border p-5 font-body"
                    style={{
                      color: "var(--text-on-light)",
                      background: "var(--bg-card-light)",
                      borderColor: "var(--border-light)",
                      fontSize: "0.95rem",
                      lineHeight: 1.55,
                    }}
                  >
                    <div className="flex gap-3">
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
                      <span>{feature}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. SIGNATURE PRODUCTS - DARK photo band, room stills for this category */}
      {signature.length > 0 && (
        <Section tone="base">
          <Container size="wide">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <p className="eyebrow" style={{ color: "var(--primary)" }}>
                Signature {product.name}
              </p>
              <h2 className="mt-4 font-display text-h2" style={{ color: "var(--text-primary)" }}>
                The pieces homeowners ask for by name.
              </h2>
              <p className="mt-4 font-body" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A look at the Hunter Douglas {product.name.toLowerCase()} Jim installs most across New England. See any of them in your own light at a free in-home consultation.
              </p>
            </div>
            <div
              className={`grid gap-6 ${signature.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
            >
              {signature.map((item) => (
                <div
                  key={item.name}
                  className="group flex flex-col rounded-[8px] overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(0,0,0,0.45)]"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-dark)" }}
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3 / 2" }}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <h3 className="font-display" style={{ color: "var(--text-primary)", fontSize: "1.35rem", lineHeight: 1.2 }}>
                      {item.name}
                    </h3>
                    <p className="font-body text-sm" style={{ color: "var(--text-secondary)", lineHeight: 1.55 }}>
                      {item.line}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. FINAL CTA - CREAM, steps into the dark footer */}
      <Section tone="cream">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
              Ready to see {product.name.toLowerCase()} in your own light?
            </h2>
            <p
              className="mt-4 font-body"
              style={{
                color: "var(--muted-on-light)",
                fontSize: "1.0625rem",
                lineHeight: 1.6,
              }}
            >
              Request a free in-home consultation. Jim brings the real Hunter Douglas samples to your home, holds them in your windows, measures every opening, and gives you an honest installed price at your kitchen table. No pressure, and Jim stands behind every install he does.
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
        </Container>
      </Section>
    </>
  );
}

/* ============================================================================
   Helpers
   ============================================================================ */

function formatPriceLong(pricePerUnit: number): string {
  if (pricePerUnit < 1) return `${Math.round(pricePerUnit * 100)}¢`;
  return `$${pricePerUnit.toFixed(2).replace(/\.00$/, "")}`;
}

function buildProductSchema(product: ProductLine) {
  const business = siteConfig.business;
  const url = `https://www.windowfantasies.com/products/${product.slug}`;

  const offers = product.moqTiers.map((tier) => ({
    "@type": "Offer",
    priceCurrency: "USD",
    price: tier.pricePerUnit.toFixed(4),
    eligibleQuantity: {
      "@type": "QuantitativeValue",
      minValue: tier.quantity,
      unitCode: "C62",
    },
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: tier.pricePerUnit.toFixed(4),
      priceCurrency: "USD",
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: tier.quantity,
        unitCode: "C62",
      },
      unitCode: "C62",
      unitText: "per unit",
    },
    availability: "https://schema.org/InStock",
    seller: { "@id": "https://www.windowfantasies.com#localbusiness" },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.name,
        description: product.shortDescription,
        image: product.imageSrc
          ? [`https://www.windowfantasies.com${product.imageSrc}`]
          : undefined,
        url,
        // ⚠️ COMPLIANCE: the brand of a Hunter Douglas product is Hunter
        // Douglas. Pointing `brand` at the dealer's LocalBusiness node is the
        // machine-readable form of claiming HD's products as our own, which is
        // exactly the assertion HD prohibits. Window Fantasies is the dealer,
        // not the brand.
        //
        // The dealer relationship belongs on `offers.seller`, which the Offer
        // objects below already carry. These lines are quote-based and publish
        // no price, so `offers` is empty and omitted, and we do NOT invent a
        // priceless Offer (or a `manufacturer`/availability value) just to hold
        // a seller reference. Omit over invent, per the policy in
        // src/lib/schema.ts. The LocalBusiness node stays in this @graph, so
        // the dealer entity is still stated on the page.
        brand: { "@type": "Brand", name: "Hunter Douglas" },
        offers: offers.length > 0 ? offers : undefined,
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.windowfantasies.com#localbusiness",
        name: business.name,
        legalName: business.legalName,
        telephone: business.phoneFormatted,
        email: business.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address.street,
          addressLocality: business.address.city,
          addressRegion: business.address.state,
          postalCode: business.address.zip,
          addressCountry: "US",
        },
        areaServed: business.serviceRadius,
      },
    ],
  };
}
