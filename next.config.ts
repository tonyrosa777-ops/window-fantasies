import type { NextConfig } from "next";

/**
 * Legacy-URL redirect map — windowfantasies.com.
 *
 * REPLACED 2026-07-31. This file previously contained, in its entirety, the
 * redirect map from a DIFFERENT client project (Goddu Imprint, promotional
 * products). It shipped here by copy-paste and sent visitors to routes that do
 * not exist on this site: /pens -> /products/wicked-cheap-pens, /tumblers ->
 * /products/insulated-tumblers, /polos -> /products/branded-polos. Every one of
 * those was a redirect into a 404. Window Fantasies had no redirect config at
 * all, which is the real problem this file now solves.
 *
 * CONTEXT: windowfantasies.com previously ran the Hunter Douglas Alliance dealer
 * site, hosted by HD on their own template and CMS. That site is indexed by
 * Google under a /hunter-douglas/** product taxonomy (verified against the
 * 2026-06-30 crawl in research/crawl/, which mirrors 58 live URLs). The
 * independent Next.js site replaced it at the same domain with a flatter
 * structure, so every one of those indexed URLs now 404s. These redirects
 * recover that traffic and its accumulated link equity.
 *
 * `permanent: true`  => 308, cached by browsers and Google indefinitely, and
 *                       passes SEO equity. Used where the crawl confirms the old
 *                       URL existed and the destination is unambiguous.
 * `permanent: false` => 307, temporary and uncached. Used for SPECULATIVE
 *                       mappings, so a wrong guess is never permanently cached.
 *
 * ⚠️ TO REFINE THIS MAP (Google-side step):
 *   1. Google Search Console -> Indexing -> Pages -> filter "Not found (404)".
 *   2. Export the real list of old URLs still being hit.
 *   3. Add exact rows, promote confirmed guesses to `permanent: true`, redeploy.
 *
 * NOTE ON THE /hunter-douglas/ SOURCES: these are inbound legacy paths from the
 * site HD themselves hosted, not URLs this site publishes. Nothing here creates
 * a Hunter Douglas-named URL on this domain; they all redirect AWAY to the
 * dealer's own product taxonomy. HD's restriction on the use of their name is
 * scoped to the dealer's domain, email, social handles, and business name.
 */

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Old HD dealer-site product taxonomy -> the four product lines (308) ──
      // Deep product pages roll up to their category; the new site does not have
      // a page per product line, it has a page per category.
      { source: "/hunter-douglas", destination: "/products", permanent: true },
      { source: "/hunter-douglas/shades", destination: "/products/shades", permanent: true },
      { source: "/hunter-douglas/shades/:path*", destination: "/products/shades", permanent: true },
      { source: "/hunter-douglas/blinds", destination: "/products/blinds", permanent: true },
      { source: "/hunter-douglas/blinds/:path*", destination: "/products/blinds", permanent: true },
      { source: "/hunter-douglas/shutters", destination: "/products/shutters", permanent: true },
      { source: "/hunter-douglas/shutters/:path*", destination: "/products/shutters", permanent: true },
      { source: "/hunter-douglas/drapery", destination: "/products/drapery", permanent: true },
      { source: "/hunter-douglas/drapery/:path*", destination: "/products/drapery", permanent: true },

      // ── Old HD dealer-site services taxonomy -> the new /services slugs (308) ──
      {
        source: "/more-products-services/services/window-covering-automation",
        destination: "/services/powerview-automation",
        permanent: true,
      },
      {
        source: "/more-products-services/services/blind-and-shutter-repairs",
        destination: "/services/blind-and-shade-repairs",
        permanent: true,
      },
      {
        source: "/more-products-services/services/installations-and-repairs",
        destination: "/services/installs-and-repairs",
        permanent: true,
      },
      {
        source: "/more-products-services/services/window-covering-measuring-and-installations",
        destination: "/services/measuring-and-installation",
        permanent: true,
      },
      {
        source: "/more-products-services/services/interior-design-consultations",
        destination: "/services/interior-design",
        permanent: true,
      },
      {
        source: "/more-products-services/services/free-estimates",
        destination: "/services/free-estimates",
        permanent: true,
      },
      {
        source: "/more-products-services/services/after-hours-and-in-home-consultations",
        destination: "/services/in-home-consultation",
        permanent: true,
      },
      { source: "/more-products-services", destination: "/services", permanent: true },
      { source: "/more-products-services/:path*", destination: "/services", permanent: true },

      // ── Old top-level pages whose slug changed (308) ──
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-use", destination: "/terms", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },

      // ── Common inbound guesses, safe because none collides with a real route ──
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/gallery", destination: "/portfolio", permanent: true },
      { source: "/reviews", destination: "/testimonials", permanent: true },
      { source: "/consultation", destination: "/request-a-consultation", permanent: false },
      { source: "/quote", destination: "/request-a-consultation", permanent: false },
      { source: "/get-a-quote", destination: "/request-a-consultation", permanent: false },
      { source: "/request-quote", destination: "/request-a-consultation", permanent: false },
      { source: "/free-estimate", destination: "/services/free-estimates", permanent: false },
      { source: "/powerview", destination: "/services/powerview-automation", permanent: false },
      { source: "/motorization", destination: "/services/powerview-automation", permanent: false },
      { source: "/repairs", destination: "/services/blind-and-shade-repairs", permanent: false },
      { source: "/service-area", destination: "/service-areas", permanent: false },
    ];
  },
};

export default nextConfig;
