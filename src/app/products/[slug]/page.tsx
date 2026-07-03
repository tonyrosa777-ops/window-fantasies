import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { siteConfig, type ProductLine } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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

/** Real Hunter Douglas photos that fit each category, for the signature band. */
const signatureProducts: Record<
  string,
  { name: string; line: string; image: string; alt: string; w: number; h: number }[]
> = {
  shades: [
    { name: "Silhouette", line: "S-vane sheers that float diffused light into the room with daytime privacy.", image: "/images/product-lines/silhouette.jpg", alt: "Hunter Douglas Silhouette sheer shades softening golden-hour light in a New England living room.", w: 2050, h: 1025 },
    { name: "Duette Honeycomb", line: "Energy-efficient cellular shades with true blackout when the room needs it dark.", image: "/images/product-lines/duette.jpg", alt: "Hunter Douglas Duette cellular honeycomb shades in a bright kitchen.", w: 900, h: 600 },
    { name: "Vignette Roman", line: "Tailored modern Roman folds with no exposed cords or rings.", image: "/images/product-lines/vignette-roman.jpg", alt: "Tailored Hunter Douglas Vignette Roman shades in a refined living room with a grand piano.", w: 2560, h: 1714 },
  ],
  blinds: [
    { name: "Parkland Wood Blinds", line: "Classic real-wood warmth in more than fifty finishes.", image: "/images/product-lines/parkland-wood.jpg", alt: "Warm Hunter Douglas Parkland wood blinds in a modern dining room.", w: 2050, h: 1025 },
    { name: "Certified Installation", line: "Every blind measured and installed by hand, cleanly, over any opening.", image: "/images/product-lines/certified-install.jpg", alt: "Hunter Douglas wood blinds installed cleanly over a fireplace.", w: 2050, h: 1025 },
  ],
  shutters: [
    { name: "Heritance Hardwood", line: "One hundred percent hardwood shutters with dovetail construction, timeless and built to last.", image: "/images/product-lines/heritance-shutter.jpg", alt: "Hunter Douglas hardwood plantation shutters in warm golden light.", w: 1025, h: 513 },
    { name: "Palm Beach Polysatin", line: "Never warps, cracks, or fades. Ideal for coastal homes, doors, and humid rooms.", image: "/images/product-lines/palmbeach-shutter.jpg", alt: "Plantation shutters framing French doors with an ocean view.", w: 1025, h: 513 },
  ],
  drapery: [
    { name: "Carole Custom Drapery", line: "More than four thousand fabrics, layered over sheers or hung on their own.", image: "/images/product-lines/carole-drapery.jpg", alt: "Navy custom drapery framing a city view in a modern loft.", w: 1025, h: 513 },
    { name: "Luminette Sheer Panels", line: "Drapery softness with the light control of a shade, for doors and wide windows.", image: "/images/product-lines/luminette-panels.jpg", alt: "Airy Hunter Douglas Luminette sheer vertical shades with an ocean view.", w: 1025, h: 513 },
  ],
};

export async function generateStaticParams() {
  return siteConfig.productLines.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = siteConfig.productLines.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} | Hunter Douglas by Window Fantasies`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = siteConfig.productLines.find((p) => p.slug === slug);
  if (!product) notFound();

  const hasTiers = product.moqTiers.length > 0;
  const signature = signatureProducts[slug] ?? [];
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
              <Eyebrow>Hunter Douglas Product Line · Guaranteed for Life</Eyebrow>
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
                <li>Centurion dealer</li>
                <li aria-hidden="true">·</li>
                <li>Measured &amp; installed by hand</li>
                <li aria-hidden="true">·</li>
                <li>Guaranteed for life</li>
              </ul>
            </div>

            {product.imageSrc && (
              <Image
                src={product.imageSrc}
                alt={`Custom Hunter Douglas ${product.name.toLowerCase()} by Window Fantasies`}
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

      {/* 3. FEATURES in a 2-col grid — CREAM band, white feature cards */}
      <Section tone="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
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
                Custom-built, and guaranteed for life.
              </h2>
              <p
                className="mt-4 font-body"
                style={{ color: "var(--muted-on-light)", lineHeight: 1.6, maxWidth: "50ch" }}
              >
                Every {product.name.toLowerCase()} order is measured, designed, and installed by Jim himself. No sales team, no subcontractors, one person accountable from the first sample to the final install.
              </p>

              {/* Honest-cost anchor (shared costAnchor, site.ts) — compact strip
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
            <div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-[8px] border p-5 font-body"
                    style={{
                      color: "var(--text-on-light)",
                      background: "var(--bg-card-light)",
                      borderColor: "var(--border-light)",
                      fontSize: "0.95rem",
                      lineHeight: 1.55,
                    }}
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
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. SIGNATURE PRODUCTS — DARK photo band, real HD photos for this category */}
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
                A look at the {product.name.toLowerCase()} Jim installs most across New England. See any of them in your own light at a free in-home consultation.
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

      {/* 5. FINAL CTA — CREAM, steps into the dark footer */}
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
              Request a free in-home consultation. Jim brings the real Hunter Douglas samples to your home, holds them in your windows, measures every opening, and gives you an honest installed price at your kitchen table. No pressure, guaranteed for life.
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
        brand: { "@id": "https://www.windowfantasies.com#localbusiness", name: business.name },
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
