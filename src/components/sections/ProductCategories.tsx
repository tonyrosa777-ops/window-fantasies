/**
 * ProductCategories: Band 3 (light, cream). Photo-led grid of the four Hunter
 * Douglas categories: Shades, Blinds, Shutters, Drapery. Each card is a real
 * photo with a tight caption, linking to the category page.
 *
 * ⚠️ COMPLIANCE: Hunter Douglas manufactures these products, Window Fantasies
 * does not. Every line here describes what JIM does (fits, measures, installs,
 * services). Never "what we make", never a possessive "our" over an HD product.
 * The lead photo carries an HD product label; the other three do not, per HD's
 * first-instance rule.
 *
 * ⚠️ THE LABEL SAYS THE PRODUCT, NOT "by Hunter Douglas". These four tiles are
 * the site's OWN room stills that DEPICT Hunter Douglas products. They are not
 * HD's licensed photography (that lives in /images/window-fashions/ and is
 * referenced from workItems in site.ts, each carrying its own `credit`). So the
 * label here is the bare product name, exactly HD's second worked example
 * ("Parkland® Wood Blinds" under a photo): it satisfies the "clearly labeled
 * with the specific product" requirement WITHOUT claiming HD shot the picture.
 * Writing "by Hunter Douglas" on one of these would misattribute authorship,
 * which is worse than no caption. Use hdMark(), never hdPhotoCredit(), here.
 *
 * Alt text comes from productLines[].imageAlt in site.ts so the manufacturer
 * stays unambiguous ("Custom Hunter Douglas <product>, measured and installed
 * by Window Fantasies") instead of the old "<category> by Window Fantasies",
 * which read as though Window Fantasies made the product.
 */

import Link from "next/link";
import { PromotionCard } from "@/components/sections/PromotionCard";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { HDPhotoCredit } from "@/components/brand/HDPhotoCredit";
import { hdMark, hdProductLabel } from "@/data/hunterDouglas";
import { siteConfig } from "@/data/site";

export function ProductCategories() {
  const categories = siteConfig.productLines;

  return (
    <section id="product-categories" className="relative py-20 md:py-28" style={{ background: "var(--bg-cream)" }}>
      <Container size="wide">
        {/* Current HD offer, rendered INSIDE this band so the page's
            dark/light alternation is unaffected (Pattern #98). */}
        <PromotionCard tone="cream" />

        <FadeUp className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>
            What we fit
          </p>
          <h2 className="mt-4 font-display text-h2" style={{ color: "var(--text-on-light)" }}>
            Four ways to dress a window, measured and fitted by Window Fantasies.
          </h2>
          <p className="mt-4 font-body" style={{ color: "var(--muted-on-light)" }}>
            Every Hunter Douglas product is custom-built for your exact opening, and we fit it to your windows. Start with the category, and we will help you find the right piece for the room.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <StaggerItem key={cat.slug} className="h-full">
              <Link
                href={`/products/${cat.slug}`}
                className="group flex flex-col h-full rounded-[8px] overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(7, 7, 6,0.18)]"
                style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)" }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                  <Image
                    src={cat.imageSrc}
                    alt={
                      cat.imageAlt ??
                      `Custom Hunter Douglas ${cat.name.toLowerCase()}, measured and installed by Window Fantasies.`
                    }
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* HD product label on the LEAD photo only (HD first-instance
                      rule). Overlay, not a caption below, so all four cards keep
                      identical heights on the grid.

                      Product name ALONE. This still depicts Duette® Honeycomb
                      Shades; it is not HD's own photograph, so it must not read
                      "by Hunter Douglas". See the file header. */}
                  {i === 0 ? (
                    <HDPhotoCredit credit={hdProductLabel("duette")} variant="overlay" />
                  ) : null}
                </div>
                <div className="p-5 sm:p-6 flex flex-col gap-2 flex-1">
                  <h3 className="font-display" style={{ color: "var(--text-on-light)", fontSize: "1.5rem", lineHeight: 1.15 }}>
                    {cat.name}
                  </h3>
                  <p className="font-body text-sm flex-1" style={{ color: "var(--muted-on-light)", lineHeight: 1.55 }}>
                    {cat.shortDescription.split(". ")[0]}.
                  </p>
                  <span
                    className="mt-2 font-mono text-[11px] uppercase tracking-widest transition-colors"
                    style={{ color: "var(--gold-deep)" }}
                  >
                    Explore {cat.name} &rarr;
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

export default ProductCategories;
