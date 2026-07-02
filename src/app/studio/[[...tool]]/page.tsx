"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * /studio/[[...tool]] — Sanity Studio embed route.
 *
 * Catch-all so Studio can own every nested route under /studio (vision tool,
 * structure tool, document editing, etc.). Client component because
 * NextStudio mounts Sanity Studio at runtime against the live document
 * graph.
 *
 * Demo mode (Pattern #25): when NEXT_PUBLIC_SANITY_PROJECT_ID is blank,
 * sanity.config.ts swaps in "demo-project" as a placeholder so the Studio
 * still mounts visually. Real writes require a configured project id and
 * dataset, which Stage 2 onboarding will set.
 */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
