/**
 * Plan feature gates — Window Fantasies.
 *
 * Jim Garrity purchased the PRO tier ($3,000) on 2026-07-13. Premium-tier
 * features are fully BUILT but gated OFF here so they are NOT part of the live
 * Pro site. Nothing is deleted — unlocking on an upgrade is a one-line switch:
 * flip the flag to `true` and follow the "ON UPGRADE" note at each consumer.
 *
 * Full Pro vs Premium breakdown: pro-plan-deliverables.md in the project root.
 */

/** The tier Jim is currently paying for. Drives what is live vs. gated. */
export const CURRENT_PLAN = "pro" as const;

export const features = {
  /**
   * PREMIUM flagship — the "See It In Your Room" Virtual Showroom: six real room
   * scenes, every treatment style rendered in the same room, favorite look
   * attached to the consultation request.
   *
   * ⚠️ REMOVED FROM THE REPO 2026-07-31, NOT JUST GATED. The route, its client,
   * its data file, and all 30 images are deleted. Flipping this flag no longer
   * does anything on its own.
   *
   * WHY: the feature was gated off but its source still shipped in the repo, and
   * it violated Hunter Douglas's dealer compliance policy in two ways. It named
   * HD products as generic descriptors ("Silhouette Sheers", "Duette Honeycomb")
   * rather than in their required trademarked form, and the whole surface was
   * built around the word "showroom" — HD expressly prohibits "Hunter Douglas
   * Showroom" in dealer advertising. A dormant violation is still a violation the
   * moment someone flips a flag, and HD's waiver review is what this site's
   * dealer-locator listing depends on.
   *
   * ON UPGRADE (Jim buys Premium): rebuild it compliant. Every product name must
   * carry its trademark symbol and category descriptor from src/data/hunterDouglas.ts,
   * and the feature must be named something other than a showroom (it is a
   * room visualizer). Recover the deleted source from git history at the commit
   * that removed it, then fix the naming before wiring it back up.
   */
  virtualShowroom: false,
} as const;
