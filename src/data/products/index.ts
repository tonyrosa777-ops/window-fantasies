/**
 * The Hunter Douglas product-line catalog.
 *
 * 23 lines across three files, split only so three writers could work in
 * parallel; consumers should import from here, never from the parts.
 *
 * PROVENANCE. Every product claim traces to Hunter Douglas's own product pages,
 * captured in research/crawl/hunter-douglas/** during the 2026-06-30 crawl.
 * Every photograph is licensed HD photography pulled from their Brite dealer
 * library on 2026-08-01, assigned deterministically by
 * assets/hunter-douglas-brite/gen-product-lines.mjs and traceable to a Hunter
 * Douglas asset ID via that folder's manifest.json.
 *
 * Nothing here is invented. HD's advertising policy requires dealer claims to
 * "correlate with the product claims made by Hunter Douglas", so a fact the
 * crawl does not support was left out rather than guessed. Where HD's own pages
 * contradict themselves on a trademark symbol, the writers omitted the mark and
 * flagged it instead of picking one.
 */

import type { HDProductLine } from "./shades-sheers";
import { SHADES_SHEERS } from "./shades-sheers";
import { BLINDS_SHUTTERS } from "./blinds-shutters";
import { ROLLER_WOVEN_MOTORIZATION } from "./roller-woven-motorization";

export type { HDProductLine };

/** Every product line, in one array. */
export const HD_PRODUCT_LINES: HDProductLine[] = [
  ...SHADES_SHEERS,
  ...BLINDS_SHUTTERS,
  ...ROLLER_WOVEN_MOTORIZATION,
];

/** The four consumer-facing categories, in nav order. */
export const SITE_CATEGORIES = ["shades", "blinds", "shutters", "motorization"] as const;
export type SiteCategory = (typeof SITE_CATEGORIES)[number];

/** Lines in one consumer-facing category, richest first (most photos). */
export function linesByCategory(category: string): HDProductLine[] {
  return HD_PRODUCT_LINES.filter((l) => l.siteCategory === category).sort(
    (a, b) => b.photos.length - a.photos.length,
  );
}

/**
 * Lines grouped under HD's OWN category names, for the hub.
 * HD's taxonomy is finer than the site's four buckets: "shades" alone covers
 * Sheers & Shadings, Cellular Honeycomb, Roller & Solar, Roman and Woven Woods.
 * Showing their groupings makes a 14-line category browsable instead of a wall.
 */
export function groupedByHdCategory(category: string): { hdCategory: string; lines: HDProductLine[] }[] {
  const groups = new Map<string, HDProductLine[]>();
  for (const line of linesByCategory(category)) {
    const list = groups.get(line.hdCategory) ?? [];
    list.push(line);
    groups.set(line.hdCategory, list);
  }
  return [...groups.entries()]
    .map(([hdCategory, lines]) => ({ hdCategory, lines }))
    .sort((a, b) => b.lines.length - a.lines.length);
}

export function getProductLine(slug: string): HDProductLine | undefined {
  return HD_PRODUCT_LINES.find((l) => l.slug === slug);
}

/** True when a /products/[slug] request is a product line rather than a category. */
export function isProductLineSlug(slug: string): boolean {
  return HD_PRODUCT_LINES.some((l) => l.slug === slug);
}
