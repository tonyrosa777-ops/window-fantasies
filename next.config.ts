import type { NextConfig } from "next";

/**
 * Legacy-URL redirect map (added 2026-06-26, R-078).
 *
 * Context: godduimprint.com previously ran a Distributor Central e-commerce
 * storefront, and the sister site godduprinting.com is WordPress. Both had URLs
 * indexed by Google, bookmarked, and printed on collateral. The new Next.js site
 * uses a different URL structure, so those old links 404 on the new build — a
 * real (human) portion of the 404 traffic in Steve's GA4 report.
 * See research/404-traffic-diagnosis-2026-06.md §3 Cause 2.
 *
 * `permanent: true`  => 308 (cached by browsers/Google "forever"). Use only for
 *                       mappings we are confident about — they pass SEO equity.
 * `permanent: false` => 307 (temporary, NOT cached). Use for SPECULATIVE guesses
 *                       until confirmed against Google Search Console, so a wrong
 *                       guess is never permanently cached.
 *
 * ⚠️ TO COMPLETE THIS MAP (Google-side step — see progress.md "404 cleanup"):
 *   1. Google Search Console -> Indexing -> Pages -> filter "Not found (404)".
 *   2. Export the real list of old URLs people/Google still hit.
 *   3. Add an exact `source -> destination` row for each, promote confirmed ones
 *      to `permanent: true`, and redeploy.
 * None of the sources below collide with a real new route, so they are safe to
 * ship now and refine later.
 */

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ---- Confident: classic e-commerce / homepage leftovers (308) ----
      { source: "/home", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home.html", destination: "/", permanent: true },
      { source: "/shop", destination: "/products", permanent: true },
      { source: "/shop/:path*", destination: "/products", permanent: true },
      { source: "/store", destination: "/products", permanent: true },
      { source: "/store/:path*", destination: "/products", permanent: true },
      { source: "/catalog", destination: "/products", permanent: true },
      { source: "/catalog/:path*", destination: "/products", permanent: true },
      { source: "/cart", destination: "/products", permanent: true },
      { source: "/checkout", destination: "/products", permanent: true },
      { source: "/my-account", destination: "/contact", permanent: true },
      { source: "/account", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },

      // ---- Speculative: product / quote guesses (307 until GSC-confirmed) ----
      { source: "/pens", destination: "/products/wicked-cheap-pens", permanent: false },
      { source: "/promotional-pens", destination: "/products/wicked-cheap-pens", permanent: false },
      { source: "/tumblers", destination: "/products/insulated-tumblers", permanent: false },
      { source: "/drinkware", destination: "/products/insulated-tumblers", permanent: false },
      { source: "/apparel", destination: "/products/branded-polos", permanent: false },
      { source: "/polos", destination: "/products/branded-polos", permanent: false },
      { source: "/t-shirts", destination: "/products", permanent: false },
      { source: "/products-page", destination: "/products", permanent: false },
      { source: "/quote", destination: "/contact", permanent: false },
      { source: "/request-quote", destination: "/contact", permanent: false },
      { source: "/get-a-quote", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
