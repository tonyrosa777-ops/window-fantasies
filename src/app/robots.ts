import type { MetadataRoute } from "next";

/**
 * robots.ts — generates /robots.txt at build time.
 *
 *   Allow:      /  (everything, including AI crawlers for AEO/GEO)
 *   Disallow:   /studio  (Sanity CMS admin)
 *   Disallow:   /api     (API routes)
 *   Sitemap:    /sitemap.xml
 */

export const dynamic = "force-static";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.windowfantasies.com").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
