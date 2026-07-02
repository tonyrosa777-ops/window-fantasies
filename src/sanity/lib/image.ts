import imageUrlBuilder from "@sanity/image-url";

// @sanity/image-url's deep type path is not exported in some versions —
// define the minimal shape locally so the type stays correct without the import.
type SanityImageSource = { asset?: { _ref?: string; _id?: string } } | { _ref: string } | string;

import { dataset, isSanityConfigured, projectId } from "./client";

/**
 * Image URL builder. Returns null when Sanity is not configured so
 * callers can fall back to a placeholder (Pattern #25 demo mode).
 */

const builder = isSanityConfigured ? imageUrlBuilder({ projectId, dataset }) : null;

export function urlForImage(source: SanityImageSource | null | undefined): string | null {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").fit("max").url();
}

export function urlForImageWidth(
  source: SanityImageSource | null | undefined,
  width: number
): string | null {
  if (!builder || !source) return null;
  return builder.image(source).width(width).auto("format").fit("max").url();
}
