/**
 * ServiceAreaTeaser — Band 9 (light, cream). GEO entry point: all of New England.
 * A photo-backed statement plus a chip cloud of representative towns linking into
 * the service-area pages.
 */

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { siteConfig } from "@/data/site";

// A representative spread across NH, MA, ME, VT, and the Cape.
const FEATURED_SLUGS = [
  "salem-nh",
  "nashua-nh",
  "manchester-nh",
  "portsmouth-nh",
  "methuen-ma",
  "andover-ma",
  "boston-ma",
  "hyannis-ma",
  "portland-me",
  "burlington-vt",
];

export function ServiceAreaTeaser() {
  const areas = siteConfig.serviceAreas;
  const featured = FEATURED_SLUGS
    .map((slug) => areas.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <section id="service-area" className="relative py-20 md:py-28" style={{ background: "var(--bg-cream)" }}>
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeUp className="order-2 lg:order-1 flex flex-col gap-5">
            <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>
              Where Jim works
            </p>
            <h2 className="font-display text-h2" style={{ color: "var(--text-on-light)", lineHeight: 1.15 }}>
              All of New England, from the tip of the Cape to Maine and Vermont.
            </h2>
            <p className="font-body text-base md:text-lg" style={{ color: "var(--muted-on-light)", lineHeight: 1.6 }}>
              Jim travels. New Hampshire, Massachusetts, Maine, Vermont, and Cape Cod. There is no place in New England he will not go for the right project, though longer distances may carry a travel charge. He will tell you upfront.
            </p>
            <ul className="flex flex-wrap gap-2.5 pt-1">
              {featured.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-areas/${a.slug}`}
                    className="inline-flex items-center rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-200 hover:border-[var(--gold-deep)] hover:text-[var(--gold-deep)]"
                    style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)", color: "var(--text-on-light)" }}
                  >
                    {a.city}, {a.state}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="inline-flex items-center rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors"
                  style={{ background: "var(--primary)", color: "var(--ink)" }}
                >
                  See all areas &rarr;
                </Link>
              </li>
            </ul>
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 lg:order-2">
            <div
              className="relative w-full rounded-[8px] overflow-hidden border"
              style={{ aspectRatio: "4 / 3", borderColor: "var(--border-light)", boxShadow: "0 18px 48px rgba(7, 7, 6,0.15)" }}
            >
              <Image
                src="/images/hunter-douglas/p09.jpg"
                alt="Plantation shutters framing French doors with a New England ocean view."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}

export default ServiceAreaTeaser;
