import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { seededPosts } from "@/data/seededPosts";

/**
 * sitemap.ts — generates /sitemap.xml at build time for Window Fantasies.
 *
 * Site URL pulled from NEXT_PUBLIC_SITE_URL with windowfantasies.com fallback.
 */

export const dynamic = "force-static";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.windowfantasies.com").replace(/\/$/, "");

const NOW = new Date();

function url(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // 1. Homepage.
  entries.push({ url: url("/"), lastModified: NOW, changeFrequency: "weekly", priority: 1.0 });

  // 2. Consultation — primary CTA destination.
  entries.push({ url: url("/request-a-consultation"), lastModified: NOW, changeFrequency: "monthly", priority: 0.95 });

  // 2b. Quiz, the secondary hero CTA destination (archetype lead funnel).
  entries.push({ url: url("/quiz"), lastModified: NOW, changeFrequency: "monthly", priority: 0.9 });

  // 3. Indexes.
  for (const path of ["/products", "/services", "/portfolio", "/service-areas", "/blog"]) {
    entries.push({ url: url(path), lastModified: NOW, changeFrequency: "monthly", priority: 0.85 });
  }

  // 4. Supporting trust pages.
  for (const path of ["/about", "/contact", "/faq", "/testimonials"]) {
    entries.push({ url: url(path), lastModified: NOW, changeFrequency: "monthly", priority: 0.7 });
  }

  // 5. Product category pages (Shades, Blinds, Shutters, Drapery).
  for (const product of siteConfig.productLines) {
    entries.push({ url: url(`/products/${product.slug}`), lastModified: NOW, changeFrequency: "monthly", priority: 0.8 });
  }

  // 6. Service detail pages.
  for (const svc of siteConfig.services) {
    entries.push({ url: url(`/services/${svc.slug}`), lastModified: NOW, changeFrequency: "monthly", priority: 0.75 });
  }

  // 7. Service-area / city detail pages.
  for (const area of siteConfig.serviceAreas) {
    const isHomeBase = area.slug === "salem-nh";
    entries.push({
      url: url(`/service-areas/${area.slug}`),
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: isHomeBase ? 0.8 : 0.7,
    });
  }

  // 8. Blog detail pages (seeded articles; Sanity-driven future).
  for (const post of seededPosts) {
    entries.push({
      url: url(`/blog/${post.slug}`),
      lastModified: post.publishedAt ? new Date(post.publishedAt) : NOW,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // 9. Legal pages.
  for (const path of ["/privacy", "/terms", "/accessibility"]) {
    entries.push({ url: url(path), lastModified: NOW, changeFrequency: "yearly", priority: 0.3 });
  }

  return entries;
}
