"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/sanity/lib/client";
import { schema } from "@/sanity/schemaTypes";

/**
 * Sanity Studio configuration.
 *
 * Mounted at /studio via the catch-all route in
 * app/studio/[[...tool]]/page.tsx. Env vars resolve through
 * @/sanity/lib/client so demo mode and prod share one source of truth.
 *
 * In demo mode (no NEXT_PUBLIC_SANITY_PROJECT_ID), the Studio route
 * still renders but the Sanity client returns null and the blog falls
 * back to seededPosts.ts.
 */
export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "demo-project",
  dataset: dataset || "production",
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
