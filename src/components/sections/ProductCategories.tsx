/**
 * ProductCategories — Band 3 (light, cream). Photo-led grid of the four Hunter
 * Douglas categories: Shades, Blinds, Shutters, Drapery. Each card is a real
 * photo with a tight caption, linking to the category page.
 */

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { siteConfig } from "@/data/site";

export function ProductCategories() {
  const categories = siteConfig.productLines;

  return (
    <section id="product-categories" className="relative py-20 md:py-28" style={{ background: "var(--bg-cream)" }}>
      <Container size="wide">
        <FadeUp className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>
            What we make
          </p>
          <h2 className="mt-4 font-display text-h2" style={{ color: "var(--text-on-light)" }}>
            Four ways to dress a window, done to a Centurion standard.
          </h2>
          <p className="mt-4 font-body" style={{ color: "var(--muted-on-light)" }}>
            Every Hunter Douglas product is custom-built for your exact opening, and Jim fits it by hand. Start with the category, and he will help you find the right piece for the room.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <StaggerItem key={cat.slug} className="h-full">
              <Link
                href={`/products/${cat.slug}`}
                className="group flex flex-col h-full rounded-[8px] overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(7, 7, 6,0.18)]"
                style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)" }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                  <Image
                    src={cat.imageSrc}
                    alt={`Hunter Douglas ${cat.name} in a New England home`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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
