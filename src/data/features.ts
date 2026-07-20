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
   * PREMIUM flagship — the "See It In Your Room" Virtual Showroom
   * (/virtual-showroom): six real room scenes, every treatment style rendered
   * in the same room, favorite look attached to the consultation request.
   *
   * When false: the /virtual-showroom route 404s. It is also absent from the nav
   * and the sitemap, so it is unreachable and undiscoverable. The page component
   * + all 30 showroom images + ShowroomClient stay in the repo, untouched.
   * (The internal /pricing page that carried the Premium "Live demo →" link was
   * deleted 2026-07-20 — this flag is now the only Premium gate on the site.)
   *
   * ON UPGRADE (Jim buys Premium): set to `true`. To also make it publicly
   * discoverable, add a nav link in components/layout/Nav.tsx, add its URL to
   * app/sitemap.ts, and flip the page's `robots` to `{ index: true }`.
   */
  virtualShowroom: false,
} as const;
