/**
 * hunterDouglas.ts — the single source of truth for how Hunter Douglas brand
 * names, product marks, and warranty language may appear on this site.
 *
 * ⚠️ COMPLIANCE DATA. Window Fantasies is an independent Hunter Douglas dealer
 * operating under HD's Independent Website Waiver program. HD reviews this site
 * against a 10-point compliance form; failing it removes windowfantasies.com
 * from the hunterdouglas.com dealer locator. Getting a trademark symbol wrong is
 * itself a violation.
 *
 * WHY THIS FILE EXISTS
 * The 2026-07-31 HD compliance review failed this site on four criteria, one of
 * which was that ZERO trademark symbols existed against ~90 uses of HD marks.
 * That happened because every product name was typed by hand into prose. This
 * file makes the correct form the thing you reach for, so it cannot drift again.
 *
 * THE FIVE RULES (HD Advertising Compliance Guidelines, "Trademark Usage")
 *  1. SYMBOL — every mark carries its own ® or ™. They are not interchangeable.
 *     Palm Beach is ™. LightLock is ®. Guessing is a violation.
 *  2. CATEGORY DESCRIPTOR — the mark is not enough. It is "Silhouette® Window
 *     Shadings", never bare "Silhouette". Short forms ("Silhouette® shadings")
 *     are allowed only where space is genuinely tight.
 *  3. NO PLURALS — "Silhouettes" is expressly prohibited. Pluralize the
 *     descriptor instead: "Silhouette® Window Shadings", not "Silhouettes".
 *  4. NOT AS A GENERIC DESCRIPTOR — you may not use a mark to name a category.
 *     "a Silhouette sheer", "Duette honeycomb", "Vignette Roman shades" are all
 *     violations. The mark names HD's product, not the kind of thing it is.
 *  5. PROXIMITY — the mark must sit near the Hunter Douglas name, clearly
 *     attributing HD as the manufacturer.
 *
 * FIRST-INSTANCE RULE: HD's reviewer confirmed only the FIRST use on a page
 * needs the full treatment. Later mentions on the same page may shorten. Use
 * `hdMark()` for the first, `HD_MARKS[...].short` after.
 *
 * SOURCE: Hunter Douglas 2025 Registered Trademarks and Trademarks list (Media
 * Kit pp. 52-54) cross-referenced with the official category descriptors on
 * p13. Full transcription lives in the PRIVATE docs repo at
 * ../../../hunter-douglas-media-kit.md — never copy HD's policy prose here.
 *
 * ADDING A MARK: verify it against that transcription. If it is not on HD's
 * list, do not invent a symbol — ask HD (contact in the transcription).
 */

export type TrademarkSymbol = "®" | "™" | null;

export type HunterDouglasMark = {
  /** Bare mark, no symbol. The lookup key and the thing authors type. */
  name: string;
  /** HD's registered (®) or common-law (™) symbol. `null` = absent from HD's list. */
  symbol: TrademarkSymbol;
  /** Official category descriptor. Rule 2 — required on first instance. */
  descriptor: string;
  /** Full first-instance form: mark + symbol + descriptor. */
  full: string;
  /** Abbreviated form for tight space, per HD's "where ad space is limited". */
  short: string;
  /** True when HD forbids percentage-discount advertising (Media Kit p13). */
  restricted?: boolean;
  /** Anything an author needs to know before using this mark. */
  note?: string;
};

function mark(
  name: string,
  symbol: TrademarkSymbol,
  descriptor: string,
  opts: { short?: string; restricted?: boolean; note?: string } = {},
): HunterDouglasMark {
  const sym = symbol ?? "";
  return {
    name,
    symbol,
    descriptor,
    full: `${name}${sym} ${descriptor}`,
    short: opts.short ?? `${name}${sym}`,
    restricted: opts.restricted,
    note: opts.note,
  };
}

/**
 * Every Hunter Douglas mark this site is allowed to name.
 * Keys are lowercase-kebab of the bare mark.
 */
export const HD_MARKS = {
  silhouette: mark("Silhouette", "®", "Window Shadings", { restricted: true }),
  duette: mark("Duette", "®", "Honeycomb Shades"),
  luminette: mark("Luminette", "®", "Privacy Sheers", { restricted: true }),
  pirouette: mark("Pirouette", "®", "Window Shadings", { restricted: true }),
  vignette: mark("Vignette", "®", "Modern Roman Shades", {
    restricted: true,
    note:
      'HD names this exact rename as an outdated-trademark case: "Vignette® window ' +
      'shadings" is retired, "Vignette® Modern Roman Shades" is current. Never ' +
      'write "Vignette Roman shades".',
  }),
  parkland: mark("Parkland", "®", "Wood Blinds"),
  heritance: mark("Heritance", "®", "Hardwood Shutters"),
  "palm-beach": mark("Palm Beach", "™", "Polysatin™ Shutters", {
    short: "Palm Beach™ shutters",
    note:
      "TRAP: ™ not ®, and Polysatin carries its own ™. Both marks are common-law. " +
      "Full form is Palm Beach™ Polysatin™ Shutters.",
  }),
  newstyle: mark("NewStyle", "®", "Hybrid Shutters"),
  powerview: mark("PowerView", "®", "Automation", {
    short: "PowerView®",
    note:
      'HD requires the name "PowerView® Automation". Do NOT write "PowerView ' +
      'Motorization". Promoting the SCHEDULING benefit additionally requires the ' +
      "POWERVIEW_APP_DISCLOSURE footnote below — that is mandatory legal copy.",
  }),
  provenance: mark("Provenance", "®", "Woven Wood Shades"),
  skyline: mark("Skyline", "®", "Gliding Window Panels", { restricted: true }),
  "modern-precious-metals": mark("Modern Precious Metals", "®", "Aluminum Blinds"),
  alustra: mark("Alustra", "®", "Collection", {
    short: "Alustra®",
    restricted: true,
    note: 'Written as "The Alustra® Collection of <product>".',
  }),
  applause: mark("Applause", "®", "Honeycomb Shades"),
  sonnette: mark("Sonnette", "®", "Cellular Roller Shades", { restricted: true }),
  somner: mark("Somner", "®", "Custom Vertical Blinds"),
  cadence: mark("Cadence", "®", "Soft Vertical Blinds"),
  everwood: mark("EverWood", "®", "Alternative Wood Blinds"),
  nantucket: mark("Nantucket", "™", "Window Shadings", {
    note: "TRAP: ™ not ®.",
  }),

  // Features and operating systems. These modify a product rather than naming
  // one, so they carry a symbol but no category descriptor of their own.
  lightlock: mark("LightLock", "®", "", {
    short: "LightLock®",
    note:
      "TRAP: ® not ™ — an earlier project reference had this wrong. Appears as " +
      "Duette® Honeycomb Shades with LightLock®.",
  }),
  literise: mark("LiteRise", "®", "", { short: "LiteRise®" }),
  ultraglide: mark("UltraGlide", "®", "", { short: "UltraGlide®" }),
  softtouch: mark("SoftTouch", "®", "", { short: "SoftTouch®" }),
  easyrise: mark("EasyRise", "™", "", { short: "EasyRise™", note: "TRAP: ™ not ®." }),
  simplelift: mark("SimpleLift", "™", "", { short: "SimpleLift™", note: "TRAP: ™ not ®." }),
  vertiglide: mark("Vertiglide", "®", "", { short: "Vertiglide®" }),
  duolite: mark("Duolite", "®", "", { short: "Duolite®" }),
  clearview: mark("ClearView", "®", "", { short: "ClearView®" }),
  architella: mark("Architella", "®", "", { short: "Architella®" }),
  aria: mark("Aria", "™", "", {
    short: "Aria™",
    note: "Listed only under Alustra® Silhouette® Window Shadings.",
  }),

  /**
   * Carole Fabrics does NOT appear in HD's 2025 registered-or-common-law list.
   * Deliberately carries no symbol — inventing one would itself be a violation.
   * A clarification request is on record with HD; update when they answer.
   */
  carole: mark("Carole Fabrics", null, "custom drapery", {
    short: "Carole Fabrics",
    note:
      "UNRESOLVED: absent from HD's 2025 trademark list. Ships with no symbol on " +
      "purpose. Do not guess ® or ™ — wait for HD's written answer.",
  }),
} as const satisfies Record<string, HunterDouglasMark>;

export type HunterDouglasMarkKey = keyof typeof HD_MARKS;

/** First-instance form: mark + symbol + category descriptor. */
export function hdMark(key: HunterDouglasMarkKey): string {
  return HD_MARKS[key].full.trim();
}

/** Abbreviated form for subsequent mentions on the same page. */
export function hdMarkShort(key: HunterDouglasMarkKey): string {
  return HD_MARKS[key].short;
}

/* ───────────────────────────── Brand & dealer language ──────────────────── */

/**
 * The ONLY consumer-facing dealer designations HD permits for a non-Gallery
 * dealer. "Centurion", "Silver Centurion", "Pinnacle Tier", "Showcase Dealer"
 * and "Priority Dealer" are TRADE-ONLY and must never appear on this site —
 * that failure is what the 2026-07-31 review flagged as criterion #8.
 */
export const HD_DEALER_DESIGNATIONS = [
  "Authorized Hunter Douglas Dealer",
  "Hunter Douglas Authorized Dealer",
  "Hunter Douglas Dealer",
] as const;

/** The designation this site uses everywhere. Import it; never retype it. */
export const HD_DEALER_DESIGNATION = HD_DEALER_DESIGNATIONS[0];

/**
 * The warranty's correct name.
 *
 * "Hunter Douglas Lifetime Warranty" (without "Limited") is an EXPRESSLY
 * PROHIBITED statement in HD's policy. So are bare "guaranteed for life" and
 * "lifetime guarantee" when applied to HD's products, because HD requires that
 * "any advertised warranties or guarantees must conform to Hunter Douglas's
 * standard policies."
 *
 * Jim's promise about HIS OWN workmanship is a separate claim and is his to
 * make — just never phrase it so it reads as HD's warranty. Use
 * JIM_WORKMANSHIP_PROMISE for that.
 */
export const HD_WARRANTY_NAME = "Hunter Douglas Limited Lifetime Warranty";

/** Required qualifier. Never state warranty coverage as absolute. */
export const HD_WARRANTY_QUALIFIER = "subject to the manufacturer's warranty terms";

/** Ready-made, compliant sentence fragment for warranty-repair copy. */
export const HD_WARRANTY_REPAIR_LINE =
  `Covered repairs are handled under the ${HD_WARRANTY_NAME}, ${HD_WARRANTY_QUALIFIER}.`;

/** Jim's own guarantee. About his labour, never about HD's product. */
export const JIM_WORKMANSHIP_PROMISE = "Jim stands behind every install he does";

/**
 * MANDATORY LEGAL COPY. HD requires this exact sentence wherever advertising
 * creative promotes the PowerView® scheduling benefit — scheduling, automation
 * on a timer, sunrise/sunset routines, phone or app control.
 *
 * Rendered by <PowerViewDisclosure /> so it cannot be paraphrased.
 */
export const POWERVIEW_APP_DISCLOSURE =
  "The PowerView® App is required for programmed operation.";

/**
 * Required attribution. HD requires a dated copyright on advertising creative.
 * Rendered site-wide in the footer.
 */
export function hdCopyrightLine(year: number): string {
  return `© ${year} Hunter Douglas. All rights reserved. All trademarks used herein are the property of Hunter Douglas or their respective owners.`;
}

/**
 * Required separate-entities disclaimer. HD: a dealer "may reference the Hunter
 * Douglas name provided the communication clearly describes the two companies
 * as separate entities."
 */
export const HD_SEPARATE_ENTITIES_DISCLAIMER =
  "Window Fantasies LLC is an independent, authorized Hunter Douglas dealer. Window Fantasies LLC and Hunter Douglas are separate companies.";

/**
 * Attribution for genuine HUNTER DOUGLAS photography — images from HD's own
 * library. "by Hunter Douglas" credits them as the photographer as well as the
 * manufacturer, which is only true for their assets.
 *
 * For a photo WE shot or generated that merely depicts an HD product, use
 * hdProductLabel() instead. Saying "by Hunter Douglas" over our own image
 * misattributes authorship to them, which HD would not want either.
 *
 * @example hdPhotoCredit("silhouette") -> "Silhouette® Window Shadings by Hunter Douglas"
 */
export function hdPhotoCredit(key: HunterDouglasMarkKey): string {
  return `${hdMark(key)} by Hunter Douglas`;
}

/**
 * Product label for OUR OWN photography of a Hunter Douglas product.
 *
 * Leads with the Hunter Douglas name so the mark sits in close proximity to it
 * and HD reads as the manufacturer, which their trademark rules require, while
 * making no claim about who took the photograph.
 *
 * This exists because the first remediation over-corrected: dropping "by Hunter
 * Douglas" from our own images was right, but dropping "Hunter Douglas"
 * altogether stripped the manufacturer attribution the adjacency rule depends
 * on. This form satisfies both rules at once.
 *
 * @example hdProductLabel("duette") -> "Hunter Douglas Duette® Honeycomb Shades"
 */
export function hdProductLabel(key: HunterDouglasMarkKey): string {
  return `Hunter Douglas ${hdMark(key)}`;
}
