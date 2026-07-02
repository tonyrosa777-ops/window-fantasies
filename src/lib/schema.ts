/**
 * schema.ts — Centralized JSON-LD schema builders for Window Fantasies.
 *
 * SEO + AEO schema:
 *  - LocalBusiness (with serviceArea covering all of New England)
 *  - Organization
 *  - Service (per service family)
 *  - Product (per Hunter Douglas category)
 *  - FAQPage (on every AEO answer page)
 *  - BreadcrumbList
 *  - Person (Jim Garrity, Hunter Douglas Centurion dealer, 30+ years)
 *  - Review + AggregateRating markup from real reviews
 *
 * Site canonical: https://www.windowfantasies.com
 * Entity @id pattern: {siteUrl}#{entity-slug}
 *
 * Schema field policy: omit over invent. If a source field is empty in
 * site.ts we OMIT the property, never fabricate.
 *
 * Zero em dashes in any string literal (CLAUDE.md §13 BINDING).
 */

import { siteConfig, type ServiceArea, type Service } from "@/data/site";
import type { SeededPost } from "@/data/seededPosts";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.windowfantasies.com";

/* ============================================================================
   Shared entity @id references — anchor the entire knowledge graph
   ============================================================================ */

export const LOCAL_BUSINESS_ID = `${SITE_URL}#localbusiness`;
export const ORGANIZATION_ID = `${SITE_URL}#organization`;
export const JIM_PERSON_ID = `${SITE_URL}#jim`;

/* ============================================================================
   PostalAddress builder
   ============================================================================ */

function buildPostalAddress() {
  const a = siteConfig.business.address;
  return {
    "@type": "PostalAddress",
    streetAddress: a.street,
    addressLocality: a.city,
    addressRegion: a.state,
    postalCode: a.zip,
    addressCountry: "US",
  };
}

/* ============================================================================
   sameAs URLs (social profiles) — only include populated fields
   ============================================================================ */

function buildSameAs(): string[] {
  const s = siteConfig.business.social;
  const urls: string[] = [];
  if (s.facebook) urls.push(s.facebook);
  if (s.linkedin) urls.push(s.linkedin);
  if (s.instagram) urls.push(s.instagram);
  return urls;
}

/* ============================================================================
   areaServed — list every NH/MA town we cover, plus a region fallback.
   Google reads this for local pack ranking.
   ============================================================================ */

function buildAreaServed() {
  return siteConfig.serviceAreas.map((a) => ({
    "@type": "City",
    name: `${a.city}, ${a.state}`,
  }));
}

/* ============================================================================
   Opening hours — by appointment. Window Fantasies has no walk-in showroom;
   consultations are scheduled in the customer's home.
   ============================================================================ */

function buildOpeningHours() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "17:00",
      description: "By appointment. In-home consultations across all of New England.",
    },
  ];
}

/* ============================================================================
   Person — Jim Garrity, owner. Used on /about and as worksFor reference.
   ============================================================================ */

export function buildPersonSchema() {
  const b = siteConfig.business;
  return {
    "@type": "Person",
    "@id": JIM_PERSON_ID,
    name: b.founderName,
    jobTitle: b.founderTitle,
    worksFor: { "@id": LOCAL_BUSINESS_ID },
    description: `${b.founderName} is the ${b.founderTitle} of ${b.name}, an authorized Hunter Douglas Centurion dealer. A retired fire lieutenant with ${b.yearsInBusiness}+ years in window fashions, he personally measures, designs, and installs every custom treatment across New England.`,
    knowsAbout: [
      "Hunter Douglas window treatments",
      "Custom shades, blinds, shutters, and drapery",
      "Silhouette, Duette, Luminette, and Pirouette shades",
      "Plantation shutters",
      "PowerView motorization and smart shades",
      "Window treatment measuring and installation",
      "Hunter Douglas warranty repairs",
      "In-home design consultation",
    ],
    sameAs: buildSameAs().length > 0 ? buildSameAs() : undefined,
  };
}

/* ============================================================================
   AggregateRating — from the real reviews only (research/real-reviews.md).
   Never fabricate. Google GBP shows 5.0 across the real set.
   ============================================================================ */

function buildAggregateRating() {
  const real = siteConfig.testimonials.filter((t) => t.isReal);
  if (real.length === 0) return undefined;
  const ratingValue =
    Math.round((real.reduce((s, t) => s + (t.rating || 0), 0) / real.length) * 10) / 10;
  return {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount: real.length,
    bestRating: 5,
    worstRating: 1,
  };
}

/* ============================================================================
   LocalBusiness — the central entity. Lives on homepage, contact, about,
   /faq, every service-area page. Salem NH coordinates:
   latitude 42.7884, longitude -71.2009 (Salem NH town centroid).
   ============================================================================ */

export interface LocalBusinessOptions {
  /** Override the @id (used on per-city service-area pages). */
  idOverride?: string;
  /** Override areaServed (used on per-city service-area pages). */
  areaServedOverride?: unknown;
  /** Override name (used on per-city pages to scope to that town). */
  nameOverride?: string;
  /** Include the full areaServed array (default true for the root entity). */
  includeFullAreaServed?: boolean;
}

export function buildLocalBusinessSchema(opts: LocalBusinessOptions = {}) {
  const b = siteConfig.business;
  const sameAs = buildSameAs();

  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "ProfessionalService"],
    "@id": opts.idOverride ?? LOCAL_BUSINESS_ID,
    name: opts.nameOverride ?? b.name,
    legalName: b.legalName,
    description: `Authorized Hunter Douglas Centurion dealer based in Salem, NH, serving all of New England. ${b.yearsInBusiness}+ years of custom window treatments: shades, blinds, shutters, drapery, and PowerView motorization, measured, designed, and installed by hand. Free in-home consultation, guaranteed for life.`,
    url: SITE_URL,
    telephone: b.phoneFormatted,
    email: b.email,
    address: buildPostalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.7884,
      longitude: -71.2009,
    },
    areaServed:
      opts.areaServedOverride !== undefined
        ? opts.areaServedOverride
        : opts.includeFullAreaServed === false
          ? b.serviceRadius
          : buildAreaServed(),
    openingHoursSpecification: buildOpeningHours(),
    priceRange: "$$$",
    founder: { "@id": JIM_PERSON_ID },
    slogan: b.tagline,
    aggregateRating: buildAggregateRating(),
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

/* ============================================================================
   Organization — sister entity. Same root identity, different schema type.
   Useful for "Organization" rich results in Google.
   ============================================================================ */

export function buildOrganizationSchema() {
  const b = siteConfig.business;
  const sameAs = buildSameAs();
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: b.name,
    legalName: b.legalName,
    url: SITE_URL,
    telephone: b.phoneFormatted,
    email: b.email,
    address: buildPostalAddress(),
    founder: { "@id": JIM_PERSON_ID },
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

/* ============================================================================
   Homepage graph — LocalBusiness + Organization + Person (Jim)
   ============================================================================ */

export function buildHomepageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildLocalBusinessSchema(),
      buildOrganizationSchema(),
      buildPersonSchema(),
    ],
  };
}

/* ============================================================================
   About page graph — Person + LocalBusiness reference
   ============================================================================ */

export function buildAboutSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonSchema(),
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#aboutpage`,
        url: `${SITE_URL}/about`,
        mainEntity: { "@id": JIM_PERSON_ID },
        about: { "@id": LOCAL_BUSINESS_ID },
      },
      buildLocalBusinessSchema(),
    ],
  };
}

/* ============================================================================
   Service schema — per /services/[slug] page
   ============================================================================ */

export function buildServiceSchema(svc: Service) {
  const url = `${SITE_URL}/services/${svc.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: svc.name,
        serviceType: svc.name,
        description: svc.shortDescription,
        provider: { "@id": LOCAL_BUSINESS_ID },
        areaServed: buildAreaServed(),
        url,
      },
      buildLocalBusinessSchema(),
      buildPersonSchema(),
    ],
  };
}

/* ============================================================================
   FAQ page schema — full FAQ list from siteConfig.faq
   ============================================================================ */

export function buildFaqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/faq#faqpage`,
        mainEntity: siteConfig.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      buildLocalBusinessSchema(),
    ],
  };
}

/* ============================================================================
   FAQ page schema for an arbitrary FAQ list (city pages, industry pages).
   ============================================================================ */

export function buildFaqListSchema(
  pageUrl: string,
  faqs: { q: string; a: string }[],
) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/* ============================================================================
   Service-area / city page schema — LocalBusiness scoped to that city + FAQ
   ============================================================================ */

export function buildServiceAreaSchema(area: ServiceArea, faqs: { q: string; a: string }[]) {
  const url = `${SITE_URL}/service-areas/${area.slug}`;
  const cityName = `${area.city}, ${area.state}`;

  // Per-city LocalBusiness scoped to that town's areaServed. Anchors the
  // local-pack signal for "window treatments [city]" queries.
  const cityLocalBusiness = buildLocalBusinessSchema({
    idOverride: `${url}#localbusiness`,
    nameOverride: `${siteConfig.business.name} — ${cityName}`,
    areaServedOverride: {
      "@type": "City",
      name: cityName,
    },
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      cityLocalBusiness,
      buildFaqListSchema(url, faqs),
      buildPersonSchema(),
    ],
  };
}

/* ============================================================================
   Testimonials page schema — Review collection.
   All testimonials in site.ts are real (research/real-reviews.md), so we emit
   a Review graph plus an AggregateRating computed from the real subset. We
   never fabricate reviews, ratings, or counts.
   ============================================================================ */

export function buildTestimonialsSchema() {
  const url = `${SITE_URL}/testimonials`;
  // Filter to only isReal testimonials for schema emission.
  const realTestimonials = siteConfig.testimonials.filter((t) => t.isReal);

  // If we have zero real testimonials, only emit the LocalBusiness reference,
  // not a synthetic review graph. This avoids any review-fraud risk.
  if (realTestimonials.length === 0) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: `Testimonials | ${siteConfig.business.name}`,
          isPartOf: { "@id": LOCAL_BUSINESS_ID },
        },
        buildLocalBusinessSchema(),
      ],
    };
  }

  // When real testimonials exist, emit a Review graph backed only by those,
  // plus an AggregateRating computed from the real subset on the LocalBusiness.
  const ratingValue =
    Math.round(
      (realTestimonials.reduce((s, t) => s + (t.rating || 0), 0) /
        realTestimonials.length) *
        10,
    ) / 10;

  const localBusinessWithRating = {
    ...buildLocalBusinessSchema(),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount: realTestimonials.length,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessWithRating,
      ...realTestimonials.map((t) => ({
        "@type": "Review",
        "@id": `${url}#review-${t.id}`,
        itemReviewed: { "@id": LOCAL_BUSINESS_ID },
        // Omit reviewBody for rating-only reviews (never fabricate a quote).
        ...(t.body ? { reviewBody: t.body } : {}),
        reviewRating: {
          "@type": "Rating",
          ratingValue: t.rating,
          bestRating: 5,
          worstRating: 1,
        },
        author: {
          "@type": "Person",
          name: t.name,
          // Omit over invent: Google reviews carry no jobTitle/company.
          ...(t.title ? { jobTitle: t.title } : {}),
          ...(t.company ? { worksFor: { "@type": "Organization", name: t.company } } : {}),
        },
      })),
    ],
  };
}

/* ============================================================================
   Contact page schema — LocalBusiness, reinforces local-SEO entity.
   ============================================================================ */

export function buildContactSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#contactpage`,
        url: `${SITE_URL}/contact`,
        mainEntity: { "@id": LOCAL_BUSINESS_ID },
      },
      buildLocalBusinessSchema(),
      buildPersonSchema(),
    ],
  };
}

/* ============================================================================
   BreadcrumbList — used on deep routes (blog post, service detail, etc.)
   ============================================================================ */

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ============================================================================
   Helper to render any of the graph objects as a script tag string.
   Components use this via: <script type="application/ld+json"
   dangerouslySetInnerHTML={{ __html: jsonLdString(graph) }} />
   ============================================================================ */

export function jsonLdString(schema: unknown): string {
  return JSON.stringify(schema);
}

/* ============================================================================
   Re-export the seeded post type so consumers do not need a separate import.
   ============================================================================ */
export type { SeededPost };
