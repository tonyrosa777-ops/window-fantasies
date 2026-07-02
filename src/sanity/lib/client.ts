import { createClient, type SanityClient } from "next-sanity";

/**
 * Sanity client wiring.
 *
 * Pattern #25 demo-mode fallback: when SANITY_PROJECT_ID is blank, the
 * blog routes use seededPosts.ts instead of hitting Sanity. Consumers
 * check `isSanityConfigured` first; only call the client when true.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

export const isSanityConfigured = projectId.length > 0;

let cachedClient: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (cachedClient) return cachedClient;
  cachedClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
    perspective: "published",
  });
  return cachedClient;
}
