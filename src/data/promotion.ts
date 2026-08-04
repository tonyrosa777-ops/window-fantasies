/**
 * The current Hunter Douglas consumer promotion.
 *
 * WHY THIS FILE EXISTS
 * HD's Independent Website Waiver obliges the dealer to make "quarterly updates
 * to advertise Hunter Douglas promotions and any product launches". Promotions
 * rotate every quarter, so the site needs ONE place to swap them rather than
 * copy scattered across pages. Set `active: false` the day an offer ends.
 *
 * ⚠️ COMPLIANCE — read before editing. Every rule here has a source.
 *
 * 1. NO PRICES, NO PERCENTAGES, NO DOLLAR FIGURES. HD bars dealers from
 *    publishing web-based HD product price quotes. HD's own promotions page
 *    states the offer and no number; so do we.
 *
 * 2. RESTRICTED PRODUCTS MAY NEVER CARRY A "% OFF" AD. Silhouette® and
 *    Pirouette® are both on that list. This offer is legal because it is a
 *    free-with-purchase premium, not a percentage discount. If a future
 *    promotion IS a percentage, check `hd-compliance-check.mjs` — the caps and
 *    the restricted list are encoded there and the build will fail.
 *
 * 3. "FREE" OFFERS ARE SEPARATELY GOVERNED. HD: *"'At no additional cost' /
 *    'free' / 'without charge' / 'gift' offers must not deceive, must comply
 *    with applicable law, and the price of the item that must be purchased may
 *    not be marked up to recover the cost of the free item."*
 *
 * 4. TERMS COME FROM HD, NOT FROM US. HD's own page says "Limited Time" and
 *    "See a participating expert for terms" — it publishes no end date. So we
 *    publish no end date either, and route to Jim, who IS the participating
 *    expert. Never invent a deadline to manufacture urgency; a dealer site
 *    quoting an end date HD has not published is stating a term HD did not set.
 *
 * 5. PRODUCT NAME USES THE DESIGNATED FORM. HD's consumer headline reads "FREE
 *    MOTORIZATION", but the policy is explicit that the product is
 *    **PowerView® Automation** and that "PowerView Motorization" is not the
 *    designated form. HD's own social creative says "Free automation on our top
 *    shades", so `automation` is HD's word too. We use HD's creative wording
 *    plus the designated product name — accurate to the offer, correct on the mark.
 *
 * 6. CHECK THE MARKET BEFORE PUBLISHING ANYTHING FROM THE LIBRARY. Brite also
 *    carried a "Washington Gas Rebate on Cellular Shades" promotion in the same
 *    quarter. Washington Gas serves DC / Maryland / Virginia. Jim is in Salem,
 *    New Hampshire — that offer is NOT his to advertise. Regional utility
 *    rebates and Canada-only launches sit in the same library as national
 *    offers and look identical until you read them.
 *
 * SOURCE: hunterdouglas.com/promotions (HD's own consumer page) + the Q3
 * promotional creative in Brite's Marketing Resource Center, both checked
 * 2026-08-03. Re-verify every quarter — see quarterly-compliance-runbook.md.
 */

export interface SitePromotion {
  /** Kill switch. Set false the day the offer ends; the band stops rendering. */
  active: boolean;
  /** Quarter label, for the ledger. Not rendered. */
  quarter: string;
  /** Short eyebrow. */
  eyebrow: string;
  /** The offer, in HD's own consumer language. No price, no percentage. */
  headline: string;
  /** One or two sentences. What it is and what to do next. */
  body: string;
  /** Product lines that qualify, in correct first-instance trademark form. */
  qualifyingProducts: string[];
  /** Slugs of the product pages that should also show the band. */
  qualifyingSlugs: string[];
  /** HD publishes no end date, so neither do we. This mirrors their wording. */
  termsNote: string;
  cta: { label: string; href: string };
}

export const CURRENT_PROMOTION: SitePromotion = {
  active: true,
  quarter: "Q3 2026",
  eyebrow: "Hunter Douglas offer, limited time",
  headline: "Free automation on their top shades.",
  body:
    "Hunter Douglas is including PowerView® Automation at no additional cost on Silhouette® Window Shadings and Pirouette® Window Shadings for a limited time. Same shades Jim would have recommended anyway, motorized, without the usual upgrade.",
  qualifyingProducts: ["Silhouette® Window Shadings", "Pirouette® Window Shadings"],
  qualifyingSlugs: ["silhouette-window-shadings", "pirouette-window-shadings"],
  termsNote:
    "Hunter Douglas sets the terms and the end date. Ask Jim at the consultation and he will tell you exactly what applies to your windows.",
  cta: { label: "Ask Jim about this offer", href: "/request-a-consultation" },
};
