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
    restricted: true,
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
  softclose: mark("SoftClose", "™", "", {
    short: "SoftClose™",
    note:
      "✅ CONFIRMED BY HD 2026-08-07. We asked because HD's own two sources " +
      "disagreed: the 2025 trademark list printed 'SoftClose® louvers with Quick " +
      "Align™', while hunterdouglas.com printed ™ in two independent places and " +
      "HD's own launch press release said 'patented SoftClose™ Louvers'. We " +
      "shipped ™ on the reasoning that ® on an unregistered mark is improper " +
      "marking, so ™ was both better evidenced and the safe error. DSM Caroline " +
      "Villalobos answered the question directly: SoftClose™. The 2025 list's ® " +
      "was the outdated entry, and the 2026 list prints ™. Settled — this mark " +
      "is now enforced by the lint gate.",
  }),
  quickalign: mark("Quick Align", "™", "", { short: "Quick Align™" }),
  ripplefold: mark("Ripplefold", "™", "", {
    short: "Ripplefold™",
    note:
      "A Carole Fabrics drapery style. Carole is a Hunter Douglas PARTNER " +
      "COMPANY, not an HD-manufactured line — HD's own page says 'From Carole " +
      "Fabrics, a Hunter Douglas partner company'. Say partner company, never " +
      "'Hunter Douglas Carole Fabrics'.",
  }),
  vertiglide: mark("Vertiglide", "™", "", {
    short: "Vertiglide™",
    note:
      "CORRECTED 2026-08-07 from ® to ™, and this is the ONLY symbol the 2026 " +
      "trademark-list diff turned up as wrong. HD's 2025 list was internally " +
      "split — Vertiglide® ×4 against Vertiglide™ ×3 — and the site picked ®. " +
      "HD's 2026 list resolves it: ™ in all five instances, ® in none. " +
      "Improper ® marking is exactly the violation HD's trademark criterion " +
      "exists to catch, so this is a real fix, not a cosmetic one.",
  }),
  duolite: mark("Duolite", "®", "", { short: "Duolite®" }),
  clearview: mark("ClearView", "®", "", {
    short: "ClearView®",
    note:
      "⚠️ THE SYMBOL DEPENDS ON THE PRODUCT. Do not normalise it, and do not add " +
      "it to the lint gate, which allows one symbol per mark and would therefore " +
      "force a violation on whichever product lost. Copy whichever form HD's " +
      "list uses for the product you are writing about:\n" +
      "  Silhouette®  → ClearView®  (Silhouette® ClearView® Mystere™/Nouveau™/" +
      "Originale™, Silhouette® Halo® ClearView® Elan®)\n" +
      "  Duette®      → ClearView®  (Duette® ClearView® Sheer)\n" +
      "  Pirouette®   → ClearView™  (Pirouette® with ClearView™)\n" +
      "  Alustra® Pirouette® → ClearView®  (Pirouette® Alustra® ClearView® Apollo™)\n" +
      "  Designer Banded Shades → ClearView™  (Fairy Glen / Mali / Skye)\n" +
      "VERIFIED AGAINST HD'S 2026 LIST 2026-08-07, which CHANGED the Pirouette " +
      "case: the 2025 list printed ClearView® there, the 2026 list prints " +
      "ClearView™ on the standard line while keeping ® on the Alustra® one. The " +
      "site was updated to match. This is HD's own designation, inconsistent on " +
      "its face, and it stays split because copying HD is the defensible position " +
      "and inventing consistency they do not assert is not.",
  }),
  architella: mark("Architella", "®", "", {
    short: "Architella®",
    restricted: true,
    note:
      "The Duette® Architella® Collection is on HD's Restricted Product Line, so " +
      "it may never be advertised at a percentage off — dollar amounts only. " +
      "Plain Duette® Honeycomb Shades are NOT restricted (25% cap). The flag was " +
      "missing here until the 2026 list diff on 2026-08-07; the build gate always " +
      "had it, but the two lists disagreeing is its own trap.",
  }),
  aria: mark("Aria", "™", "Soft Blinds", {
    short: "Aria™",
    note:
      "CORRECTED 2026-08-01. This was first entered from the 2025 trademark list, " +
      "where Aria appears only as an Alustra® Silhouette® fabric name, so it was " +
      "given no category descriptor and hdMark() returned a bare 'Aria™' that " +
      "failed HD's descriptor rule. HD's own dealer library settles it: Aria™ " +
      "Soft Blinds is a current product line with 12 photographs and 3 videos, " +
      "filed under Horizontal Blinds. The trademark list is authoritative for the " +
      "SYMBOL; the product catalogue is authoritative for whether a product exists. " +
      "✅ CONFIRMED BY HD 2026-08-07 — DSM Caroline Villalobos named Aria™ as one " +
      "of the two marks on the 2026 trademark list, which is what the 2025 list " +
      "we had was missing.",
  }),

  /**
   * Carole Fabrics does NOT appear in HD's 2025 registered-or-common-law list.
   * Deliberately carries no symbol — inventing one would itself be a violation.
   * A clarification request is on record with HD; update when they answer.
   */
  carole: mark("Carole Fabrics", "™", "Custom Drapery and Side Panels", {
    short: "Carole Fabrics™",
    note:
      "RESOLVED 2026-08-01 by checking HD's live site, not by guessing. Carole is " +
      "absent from HD's 2025 trademark list, which is why this shipped bare — but " +
      "hunterdouglas.com titles the page 'Carole Fabrics™ Custom Drapery and Side " +
      "Panels', so both the symbol and the descriptor come straight from HD. " +
      "⚠️ Carole is a Hunter Douglas PARTNER COMPANY ('From Carole Fabrics, a " +
      "Hunter Douglas partner company' — their words). Never write 'Hunter Douglas " +
      "Carole Fabrics' or present it as an HD-manufactured line.",
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
 * The ONLY award this site may claim for PowerView® Automation, supplied by
 * Hunter Douglas on 2026-08-07 in answer to our own question.
 *
 * ⛔ THE PREVIOUS SITE CLAIMED A 2018 RED DOT DESIGN AWARD AND IT WAS WRONG.
 * That claim traced to Jim's old website rather than to anything HD published,
 * and Red Dot's own database lists the award against the PowerView Hub Kit, not
 * PowerView® Automation. It was removed during the 2026-07-31 remediation and
 * the correct wording was requested from HD. DSM Caroline Villalobos sent the
 * award copy below; these two strings are derived from it directly.
 *
 * HD's policy requires a dealer's product claims to correlate with the claims
 * Hunter Douglas itself makes, so this is exactly the kind of claim that must
 * never be written from memory or from a search result. If a newer award
 * supersedes it, replace these strings from HD-supplied copy — do not append a
 * second award found elsewhere.
 *
 * (HD's own copy uses an em dash and omits the ®; both are corrected here per
 * the site's copy rules and HD's own trademark rules.)
 */
export const POWERVIEW_AWARD_SENTENCE =
  "PowerView® Automation (Gen 3) won a 2023 Mark of Excellence Award from the Smart Home Division of the Consumer Technology Association, named Automated Shade Product of the Year.";

/** The same award, as a feature bullet. */
export const POWERVIEW_AWARD_BULLET =
  "Winner of a 2023 Mark of Excellence Award, named Automated Shade Product of the Year by the Smart Home Division of the Consumer Technology Association";

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
