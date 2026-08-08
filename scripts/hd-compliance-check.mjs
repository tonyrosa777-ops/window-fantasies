#!/usr/bin/env node
/**
 * hd-compliance-check.mjs — Hunter Douglas brand-compliance gate.
 *
 * WHY THIS EXISTS
 * On 2026-07-31 Hunter Douglas failed windowfantasies.com on four of their ten
 * Independent Website Waiver criteria and gave 30 days to fix it or lose the
 * listing on the hunterdouglas.com dealer locator. The site failed not because
 * anyone decided to break a rule, but because the rules lived in a PDF nobody
 * read while copy got typed by hand across 35 files. This script moves them into
 * the build.
 *
 * WHAT IT CHECKS
 *   1. Banned phrases        — strings HD expressly prohibits in dealer advertising
 *   2. Trade-only labels     — "Centurion", "Pinnacle" and friends, never consumer-facing
 *   3. Trademark symbols     — every HD product mark carries its own correct ® or ™
 *   4. Plural marks          — "Silhouettes" and the like are expressly prohibited
 *   5. PowerView legal copy  — the scheduling benefit requires a mandatory footnote
 *   6. Required disclosures  — the HD copyright line and separate-entities disclaimer
 *   7. Legacy asset paths    — the renamed HD image directory
 *
 * WHAT IT DOES NOT CONTAIN
 * Hunter Douglas forbids a dealer publishing any portion of their compliance
 * policy, and this file lives in a PUBLIC repo. So the strings below are OUR
 * OWN obligations, phrased in our words. Do not paste HD's policy prose in here.
 * The full transcription lives in the sibling PRIVATE docs repo.
 *
 * USAGE
 *   npm run check:hd
 * Exit 0 = clean. Exit 1 = findings, printed with file:line.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const SRC = join(ROOT, "src");

const SCAN_EXT = [".ts", ".tsx"];
const SKIP_DIRS = new Set(["node_modules", ".next", "audits", ".git", "scripts"]);

/**
 * Files exempt from the phrase rules because their JOB is to name the banned
 * strings — the data layer that defines them and the gate that detects them.
 * Nothing else may be added here; an exemption is how the rule dies.
 */
const RULE_DOC_FILES = new Set([
  join("src", "data", "hunterDouglas.ts"),
]);

/* ─────────────────────────── Rules ─────────────────────────── */

/** Strings that must never appear in this codebase, and what to use instead. */
const BANNED = [
  {
    re: /\bCenturion\b/i,
    why: "Trade-only Hunter Douglas designation. Never consumer-facing.",
    fix: 'Use "Authorized Hunter Douglas Dealer".',
  },
  {
    re: /\bPinnacle\s+Tier\b/i,
    why: "Trade-only Hunter Douglas designation. Never consumer-facing.",
    fix: 'Use "Authorized Hunter Douglas Dealer".',
  },
  {
    re: /\b(Showcase|Priority)\s+Dealer\b/i,
    why: "Trade-only Hunter Douglas designation. Never consumer-facing.",
    fix: 'Use "Authorized Hunter Douglas Dealer".',
  },
  {
    re: /Hunter\s+Douglas\s+(Showroom|Store|outlet|factory)\b/i,
    why: "Expressly prohibited phrase in HD dealer advertising.",
    fix: 'Describe the shop-at-home visit: "Jim brings the samples to you".',
  },
  {
    re: /Hunter\s+Douglas\s+Lifetime\s+Warranty\b/i,
    why: 'Expressly prohibited. The warranty name omits "Limited".',
    fix: 'Use "Hunter Douglas Limited Lifetime Warranty".',
  },
  {
    re: /\bguaranteed\s+for\s+life\b/i,
    why: "Unqualified lifetime guarantee. HD requires warranty claims match their policy.",
    fix: 'For the product: "backed by the Hunter Douglas Limited Lifetime Warranty". For Jim\'s labour: "Jim stands behind every install he does".',
  },
  {
    re: /\blifetime\s+guarantee\b/i,
    why: "Unqualified lifetime guarantee. HD requires warranty claims match their policy.",
    fix: 'Use "Hunter Douglas Limited Lifetime Warranty".',
  },
  {
    re: /\bPowerView\s+Motorization\b/i,
    why: "Wrong product name.",
    fix: 'Use "PowerView® Automation".',
  },
  {
    re: /\b(factory[- ]direct|wholesale pric|buy direct|lowest price|unbeatable|we won'?t be undersold|most trusted dealer)\b/i,
    why: "Expressly prohibited pricing or superiority claim.",
    fix: "Remove the claim.",
  },
  {
    // Added 2026-08-07 from HD's 2026 prohibited-statements list. The gate had
    // only the seven phrases the 2026-07-31 review made urgent; reading the full
    // 2026 list showed HD enumerates ~25. These are the rest, and they are the
    // ones a marketing-minded writer reaches for without thinking.
    re: /\b(biggest sale ever|cheapest price|discount pric|guaranteed most competitive|low price guarantee|lowest prices of the season|nobody beats our|no sales tax|only dealer|prices too low to advertise|the (?:best|better) price|warehouse pric|unbeatable guarantee)\b/i,
    why: "Expressly prohibited statement in HD's 2026 Advertising Compliance Guidelines.",
    fix: "Remove the claim. HD's sanctioned alternatives are on the Messaging Suggestions page: free quote, free in-home appointment, complimentary design consultation.",
  },
  {
    // "We are Hunter Douglas" / "Hunter Douglas <City>" both assert that the
    // dealer IS the manufacturer, which is the substance of the separate-entities
    // requirement. The city form is the local-SEO temptation on a site that
    // already runs 30 service-area pages, so it is worth its own rule.
    re: /\bwe are Hunter\s+Douglas\b|\bHunter\s+Douglas\s+(?:of\s+)?(?:Salem|Nashua|Windham|Derry|Londonderry|Manchester|Andover|Methuen|Haverhill|Lawrence|Boston|New Hampshire|Massachusetts|New England)\b/i,
    why: "Asserts the dealer is Hunter Douglas, or brands a location as Hunter Douglas. Both are expressly prohibited.",
    fix: 'Name the two companies separately: "Window Fantasies, an Authorized Hunter Douglas Dealer serving Salem, NH".',
  },
  {
    // HD reserves its own tagline. Not a temptation today, but it is exactly the
    // kind of phrase that gets lifted from HD's consumer site into dealer copy.
    re: /\bArt of Window Dressing\b/i,
    why: "HD's own trademarked tagline. Dealers may not use it or any derivation.",
    fix: "Use the site's own tagline.",
  },
  {
    re: /\b(certified install|Certified Installation)\b/i,
    why: "Implies a Hunter Douglas certification program that has no consumer-facing existence.",
    fix: 'Use "installed by hand" or "installation by Jim".',
  },
  {
    re: /\/images\/hunter-douglas\//,
    why: "Legacy asset path. The directory was renamed.",
    fix: "Use /images/window-fashions/.",
  },
  {
    // Added after a compliance re-review found this in four page titles AND in
    // the Product JSON-LD `brand`. HD allows "Hunter Douglas by [Dealer]" only
    // for Design Gallery locations and Exterior Signage Program participants,
    // with written approval. Window Fantasies is neither.
    re: /Hunter\s+Douglas\s+by\s+(?!Hunter)/i,
    why: "Asserts a Hunter Douglas brand relationship that does not exist.",
    fix: 'Name the dealer separately, e.g. "Hunter Douglas Shades | Window Fantasies".',
  },
  {
    // Same re-review: only DEALER designations are permitted consumer-facing,
    // and "Hunter Douglas authorized service center" is not one of them. The
    // service center is a real third party; keep the fact, drop the prefix.
    re: /Hunter\s+Douglas\s+authorized\s+service\s+cent(er|re)/i,
    why: "Not one of HD's three permitted consumer-facing designations.",
    fix: 'Write "the authorized service center" without the Hunter Douglas prefix.',
  },
  {
    // A dealer-side "certified installation" implies an HD certification program
    // with no consumer-facing existence. The hyphenated asset path defeated the
    // word-boundary rule above, so it gets its own.
    re: /certified[-_]install/i,
    why: "Implies a Hunter Douglas installer certification program that does not exist.",
    fix: "Rename to describe the work, e.g. installed-by-hand.",
  },
  {
    // The lookbehind matters. "<product> by Window Fantasies" claims Window
    // Fantasies MADE the product; "measured and installed by Window Fantasies"
    // states what Jim actually does and is the correct form. Only the former is
    // a violation, so "by Window Fantasies" preceded by one of Jim's actual
    // verbs passes. Without this the rule flags its own fix.
    // (JS supports variable-length lookbehind, so the alternation is fine.)
    re: /(?<!\b(?:installed|configured|measured|serviced|fitted|designed|hung)\s)\bby Window Fantasies\b/i,
    why: "Reads as Window Fantasies manufacturing the product. Hunter Douglas manufactures; Jim measures, designs, and installs.",
    fix: 'Write "measured and installed by Window Fantasies".',
  },
  {
    re: /\bworkroom\b/i,
    why: "A workroom is where treatments are fabricated. HD criterion 10 bars the dealer from fabricating product.",
    fix: "Describe the office, sample library, or by-appointment space instead.",
  },
  {
    // The site once claimed PowerView® Automation won a 2018 Red Dot Design
    // Award. It did not — the claim traced to Jim's OLD website, and Red Dot's
    // own database lists that award against the PowerView Hub Kit. HD supplied
    // the real award on 2026-08-07 (2023 Mark of Excellence). This rule exists
    // because the false claim survived a full site rebuild by being copied
    // forward, and a plausible-sounding award is exactly what gets re-added.
    re: /\bRed\s+Dot\b/i,
    why: "Unsubstantiated Hunter Douglas award claim. It traced to a previous website, not to HD.",
    fix: "Use POWERVIEW_AWARD_SENTENCE / POWERVIEW_AWARD_BULLET from src/data/hunterDouglas.ts. Any other award needs HD-supplied copy first.",
  },
  {
    // Competing window-treatment brands. HD will deny advertising naming them.
    re: /\b(Gotcha Covered|Love Is Blinds|Acadia Shutters|Covering Windows|Alta\/CBG|Levolor|Graber|Budget Blinds|3 Day Blinds|Blinds\.com|Select Blinds|The Shade Store|Smith \+ Noble)\b/i,
    why: "Competitor window-treatment brand.",
    fix: "Remove it. Cite a neutral authority (DOE, ORNL, CPSC, WCMA) instead.",
  },
];

/**
 * HD product marks and their required symbol. A mark appearing WITHOUT its
 * symbol is a violation; so is a mark carrying the WRONG symbol. The traps are
 * real: Palm Beach is ™ but LightLock is ®, and getting it backwards is itself
 * a compliance failure.
 */
const MARKS = [
  { name: "Silhouette", sym: "®" },
  { name: "Duette", sym: "®" },
  { name: "Luminette", sym: "®" },
  { name: "Pirouette", sym: "®" },
  { name: "Vignette", sym: "®" },
  { name: "Parkland", sym: "®" },
  { name: "Heritance", sym: "®" },
  { name: "NewStyle", sym: "®" },
  { name: "PowerView", sym: "®" },
  { name: "Provenance", sym: "®" },
  { name: "Skyline", sym: "®" },
  { name: "Applause", sym: "®" },
  { name: "Sonnette", sym: "®" },
  { name: "Somner", sym: "®" },
  { name: "Cadence", sym: "®" },
  { name: "EverWood", sym: "®" },
  { name: "Alustra", sym: "®" },
  { name: "Architella", sym: "®" },
  { name: "LightLock", sym: "®" },
  { name: "LiteRise", sym: "®" },
  { name: "UltraGlide", sym: "®" },
  { name: "SoftTouch", sym: "®" },
  { name: "Vertiglide", sym: "®" },
  { name: "Duolite", sym: "®" },
  // ClearView is deliberately ABSENT. HD's own trademark list prints ClearView®
  // under Silhouette®/Pirouette®/Duette® but ClearView™ under Designer Banded
  // Shades, so the correct symbol depends on which product the sentence is about.
  // This check has one symbol per mark and cannot express that, so pinning it
  // here would force a violation on whichever product lost the coin toss. The
  // per-product rule lives in the note on HD_MARKS.clearview instead.
  { name: "Modern Precious Metals", sym: "®" },
  { name: "Palm Beach", sym: "™" },
  { name: "Nantucket", sym: "™" },
  { name: "EasyRise", sym: "™" },
  { name: "SimpleLift", sym: "™" },
  { name: "Aria", sym: "™" },
  // SoftClose was held OUT of this list while HD's own two sources disagreed:
  // their 2025 trademark list printed ®, their live site and launch press release
  // printed ™. The site shipped ™ and asked. HD answered on 2026-08-07 —
  // SoftClose™ — so the mark is now enforced like any other.
  { name: "SoftClose", sym: "™" },
];

/** Marks may not be pluralized. */
const PLURALS = /\b(Silhouettes|Duettes|Luminettes|Pirouettes|Vignettes|Sonnettes|Applauses|Provenances|Parklands|Heritances)\b/;

/* ───────────────── Discount advertising (DORMANT until the first promo) ─────────────────
 *
 * The site publishes no prices and no discounts today, so none of this fires. It
 * exists because the waiver program obliges Jim to "make quarterly updates to
 * advertise Hunter Douglas promotions" — and the first promotion he posts
 * activates an entire section of HD's policy that has been inert until now.
 *
 * That is the dangerous moment. Everything else in this file guards copy that
 * already exists; these rules guard copy nobody has written yet, on a deadline,
 * probably in a hurry, possibly by someone who was not here for this project.
 *
 * HD's Discount Compliance Guidelines, in short:
 *   - RESTRICTED products may NEVER carry a percentage-off ad. Dollar amounts
 *     only ("$100 off" is fine, "20% off" is not). Most of Jim's flagship line
 *     is on this list.
 *   - Everything else is capped at 10%, 25% or 30% depending on the product.
 *   - Restricted products must be VISIBLY EXCLUDED from any "% off" promotion,
 *     with a disclaimer.
 *   - A mail-in rebate promotion requires the full rebate legal copy on the
 *     first click from the ad.
 */
const DISCOUNT_ANY = /\b\d{1,3}\s*%\s*(off|discount)|\b(percent off)\b/i;
const REBATE = /\brebate\b/i;
const REBATE_LEGAL = /mail-in rebate|rebate legal|Manufacturer'?s Certification/i;

/**
 * Percentage-off advertising is prohibited outright on these.
 *
 * SYNCED TO HD'S 2026 LIST 2026-08-07. The 2026 policy CHANGED this list, and a
 * stale copy fails in both directions — it would have allowed a percentage on a
 * newly-restricted product and blocked one on a product HD has since freed:
 *   + Aura     ADDED   (Aura® Illuminated Shades, a product line that did not
 *                       exist when the 2025 list was written)
 *   − Design Studio  REMOVED from the restricted list
 *   − Solera         REMOVED from the restricted list
 * "Architella" covers HD's "Duette® Architella® Collection" entry; plain Duette®
 * Honeycomb Shades are NOT restricted (they sit at the 25% cap below).
 */
const RESTRICTED_PRODUCTS = [
  "Alustra", "Aura", "Architella", "Luminette", "Pirouette",
  "Silhouette", "Sonnette", "Skyline", "Vignette", "PowerView",
];

/**
 * Maximum advertised percentage discount, by product. Synced to HD's 2026 list.
 *
 * ⚠️ Cadence is deliberately RETAINED at 10% even though HD's 2026 list dropped
 * it from the discount tables entirely (it appears in the 2026 trademark list as
 * Cadence® Soft Vertical Blinds, just not in the discount section). A product on
 * neither the restricted list nor a cap list is ambiguous, not unlimited. Keeping
 * the last cap HD published cannot create a violation; dropping it could. If HD
 * clarifies, update — do not "fix" this by deleting it.
 */
const DISCOUNT_CAPS = [
  { cap: 10, products: ["Cadence", "Heritance"] },
  { cap: 25, products: ["Designer Banded", "Designer Roller", "Designer Screen", "Duette", "NewStyle", "Palm Beach", "Somner"] },
  { cap: 30, products: ["Applause", "EverWood", "Modern Precious Metals", "Nantucket", "Parkland", "Provenance", "Vertical Solutions"] },
];

/**
 * Shutter minimum advertised price per square foot (2026 policy, unchanged from
 * 2025). Dormant while the site publishes no prices — which is the correct state,
 * since HD separately bars web-based price quotes on a dealer's independent site.
 * Encoded so a future promotion cannot undercut them by accident.
 */
const SHUTTER_SQFT_MINIMUMS = [
  { product: "Heritance", min: null }, // price per sq. ft. not permitted at all
  { product: "NewStyle", min: 23 },
  { product: "Palm Beach", min: 22 },
];

/** Copy promising scheduled/automatic/app-driven operation triggers HD's footnote. */
const SCHEDULING = /\b(on a schedule|schedule (?:your )?shades|shades? (?:to )?open and close automatically|programmed operation|automatic(?:ally)? (?:open|close|raise|lower)|sunrise|sunset routine)\b/i;
const POWERVIEW_FOOTNOTE = /PowerView® App is required for programmed operation/;
const POWERVIEW_COMPONENT = /PowerViewDisclosure|POWERVIEW_APP_DISCLOSURE/;

/* ─────────────────────────── Scan ─────────────────────────── */

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SCAN_EXT.some((e) => entry.endsWith(e))) out.push(full);
  }
  return out;
}

/** Strip // and block comments so rule-explaining comments do not self-trip. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(Math.max(0, m.length - p1.length)));
}

const findings = [];
function report(file, line, rule, detail, fix) {
  findings.push({ file, line, rule, detail, fix });
}

for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  const raw = readFileSync(file, "utf8");
  const code = stripComments(raw);
  const lines = code.split("\n");
  const isRuleDoc = RULE_DOC_FILES.has(rel.split("/").join(sep));

  lines.forEach((line, i) => {
    const n = i + 1;

    if (!isRuleDoc) {
      for (const b of BANNED) {
        if (b.re.test(line)) report(rel, n, "banned-phrase", b.why, b.fix);
      }
      if (PLURALS.test(line)) {
        report(rel, n, "plural-mark", "Hunter Douglas marks may not be pluralized.",
          "Pluralize the category descriptor instead, e.g. Silhouette® Window Shadings.");
      }
      // ── Discount rules. Inert while the site advertises no discounts. ──
      const pct = /\b(\d{1,3})\s*%\s*(?:off|discount)/i.exec(line);
      if (pct) {
        const amount = Number(pct[1]);
        for (const p of RESTRICTED_PRODUCTS) {
          if (new RegExp(`\\b${p}`, "i").test(line)) {
            report(rel, n, "restricted-product-percentage-discount",
              `"${p}" is on Hunter Douglas's Restricted Product Line, which may NEVER be advertised at a percentage off.`,
              `Use a dollar-amount deduction instead ("$100 off"), or drop ${p} from this promotion and state the exclusion with a disclaimer.`);
          }
        }
        for (const { cap, products } of DISCOUNT_CAPS) {
          for (const p of products) {
            if (new RegExp(`\\b${p}`, "i").test(line) && amount > cap) {
              report(rel, n, "discount-exceeds-cap",
                `${amount}% off "${p}" exceeds Hunter Douglas's ${cap}% advertised maximum for that product.`,
                `Lower it to ${cap}% or less, or advertise a dollar amount.`);
            }
          }
        }
      }

      for (const m of MARKS) {
        // The mark, not already followed by a trademark symbol.
        const bare = new RegExp(`\\b${m.name}\\b(?![\\u00ae\\u2122])`, "g");
        if (bare.test(line)) {
          const wrong = m.sym === "®" ? "™" : "®";
          const hasWrong = new RegExp(`\\b${m.name}${wrong}`).test(line);
          report(rel, n, hasWrong ? "wrong-symbol" : "missing-symbol",
            `"${m.name}" must carry ${m.sym}.`,
            `Write ${m.name}${m.sym} plus its category descriptor. See src/data/hunterDouglas.ts.`);
        }
      }
    }
  });

  // File-level: a percentage-off promotion must visibly exclude the Restricted
  // Product Line. HD requires the exclusion stated, not merely implied by absence.
  if (!isRuleDoc && DISCOUNT_ANY.test(code) &&
      !/exclu(?:de|des|ded|sion)/i.test(code)) {
    report(rel, 0, "missing-restricted-exclusion",
      "This file advertises a percentage discount but states no exclusion.",
      "Hunter Douglas requires Restricted Products to be VISIBLY EXCLUDED from any '% off' promotion, with a disclaimer. Name the excluded lines on the page.");
  }

  // File-level: a rebate promotion requires HD's mail-in rebate legal copy.
  if (!isRuleDoc && REBATE.test(code) && !REBATE_LEGAL.test(raw)) {
    report(rel, 0, "missing-rebate-legal",
      "This file mentions a rebate but carries no rebate legal copy.",
      "Hunter Douglas requires the full mail-in rebate legal copy as the first click from the ad. Pull the current wording from Brite before publishing.");
  }

  // File-level: scheduling copy must carry HD's mandatory footnote somewhere.
  if (!isRuleDoc && SCHEDULING.test(code) &&
      !POWERVIEW_FOOTNOTE.test(raw) && !POWERVIEW_COMPONENT.test(raw)) {
    report(rel, 0, "missing-powerview-legal",
      "This file promotes the PowerView scheduling benefit.",
      "Render <PowerViewDisclosure /> (or include POWERVIEW_APP_DISCLOSURE). It is mandatory manufacturer legal copy.");
  }
}

/* ── Site-wide required disclosures must exist somewhere in the footer chain ── */
const footer = readFileSync(join(SRC, "components", "layout", "Footer.tsx"), "utf8");
if (!/hdCopyrightLine/.test(footer)) {
  report("src/components/layout/Footer.tsx", 0, "missing-disclosure",
    "The Hunter Douglas copyright and trademark attribution line is absent.",
    "Render hdCopyrightLine(year) from src/data/hunterDouglas.ts.");
}
if (!/HD_SEPARATE_ENTITIES_DISCLAIMER/.test(footer)) {
  report("src/components/layout/Footer.tsx", 0, "missing-disclosure",
    "The separate-entities disclaimer is absent.",
    "Render HD_SEPARATE_ENTITIES_DISCLAIMER from src/data/hunterDouglas.ts.");
}

/* ── The current promotion, if one is active ────────────────────────────────
 *
 * Promotions rotate quarterly and are edited under deadline, usually by someone
 * who did not write the compliance block in src/data/promotion.ts. These are the
 * three ways a promotion goes wrong on a Hunter Douglas dealer site.
 */
const promoPath = join(SRC, "data", "promotion.ts");
if (existsSync(promoPath)) {
  const promoRaw = readFileSync(promoPath, "utf8");
  const promo = stripComments(promoRaw);
  const isActive = /active:\s*true/.test(promo);
  if (isActive) {
    // 1. No price, ever. HD bars web-published HD product price quotes, and a
    //    promotion is the likeliest place to slip one in.
    if (/\$\s?\d/.test(promo)) {
      report("src/data/promotion.ts", 0, "promotion-publishes-a-price",
        "The active promotion contains a dollar figure.",
        "Hunter Douglas bars dealers from publishing HD product prices. State the offer and route to the consultation, as HD's own promotions page does.");
    }
    // 2. A percentage on a Restricted product is prohibited outright.
    const pct = /(\d{1,3})\s*%/.exec(promo);
    if (pct) {
      for (const rp of RESTRICTED_PRODUCTS) {
        if (new RegExp(`\b${rp}`, "i").test(promo)) {
          report("src/data/promotion.ts", 0, "promotion-percentage-on-restricted-product",
            `The active promotion advertises ${pct[1]}% on "${rp}", which is on HD's Restricted Product Line.`,
            "Restricted products may never be advertised at a percentage off. Use a dollar amount, or a free-with-purchase premium.");
        }
      }
    }
    // 3. An end date HD has not published is a term we invented. HD's own page
    //    says "Limited Time" and "See a participating expert for terms".
    if (/expires|ends on|valid (?:until|through)|offer ends/i.test(promo)) {
      report("src/data/promotion.ts", 0, "promotion-states-an-end-date",
        "The active promotion states a deadline.",
        "Hunter Douglas publishes no end date on their consumer promotions page. Quoting one states a term HD did not set. Route to Jim for terms instead.");
    }
    if (!/qualifyingProducts:\s*\[[^\]]*\S/.test(promo)) {
      report("src/data/promotion.ts", 0, "promotion-names-no-products",
        "The active promotion names no qualifying products.",
        "A promotion must say what it applies to, or it misleads. Populate qualifyingProducts.");
    }
    // 5. Shutter price-per-sq-ft floors. HD sets a minimum advertised price per
    //    square foot on two shutter lines and forbids the unit outright on the
    //    third. This should never fire — the site publishes no prices at all —
    //    but a "$19 per sq ft" promotion is a specific, plausible mistake and it
    //    is cheaper to encode the floors than to remember them.
    const sqft = /\$\s?(\d+(?:\.\d+)?)\s*(?:per|\/)\s*sq(?:uare)?\.?\s*(?:ft|foot)/i.exec(promo);
    if (sqft) {
      for (const s of SHUTTER_SQFT_MINIMUMS) {
        if (!new RegExp(`\\b${s.product}`, "i").test(promo)) continue;
        if (s.min === null) {
          report("src/data/promotion.ts", 0, "promotion-sqft-price-not-permitted",
            `The active promotion advertises a per-square-foot price alongside "${s.product}".`,
            `Hunter Douglas does not permit a price per sq. ft. on ${s.product}. Remove the unit price.`);
        } else if (Number(sqft[1]) < s.min) {
          report("src/data/promotion.ts", 0, "promotion-below-sqft-minimum",
            `The active promotion advertises $${sqft[1]}/sq. ft. on "${s.product}", below HD's $${s.min} minimum.`,
            `Raise it to at least $${s.min} per sq. ft., or drop the unit price.`);
        }
      }
    }
  }
}

/* ── Portfolio items: every HD photograph labelled, and labelled consistently ──
 *
 * On 2026-08-03 the portfolio was found with EIGHT category pills contradicting
 * the photograph beneath them (a "DRAPERY" pill over Modern Precious Metals®
 * Aluminum Blinds), TWELVE invented product names, and TWELVE licensed HD photos
 * carrying no credit at all. Same root cause as the R-007 alt-text problem: the
 * metadata was written for the AI stills these files replaced.
 *
 * The missing credits were the serious half. PortfolioWall picks one credit for
 * the visible set via photos.find(p => p.credit), so filtering to any of those
 * twelve rendered ZERO Hunter Douglas attribution — a live criterion 3 failure.
 *
 * This check deliberately verifies SELF-CONSISTENCY rather than reading the Brite
 * manifest: site-image-map.json lives in the private docs repo and does not exist
 * in this repo's Vercel checkout, so a check that read it would pass locally and
 * crash the production build. Ground truth still comes from the manifest — see
 * the quarterly runbook — but what CI can enforce is that every item is credited
 * and that its category does not contradict the product it names.
 */
const siteData = readFileSync(join(SRC, "data", "site.ts"), "utf8");
const workItemBlocks = [...siteData.matchAll(/\{\s*brand:\s*"([^"]+)",([\s\S]*?)\n    \},/g)];
/** A product noun in the brand string implies its category. */
const CATEGORY_BY_NOUN = [
  { re: /\bShutters\b/i, cat: "Shutters" },
  { re: /\bBlinds\b/i, cat: "Blinds" },
  { re: /\b(Shades|Shadings|Sheers|Panels)\b/i, cat: "Shades" },
];
for (const [, brand, body] of workItemBlocks) {
  const image = (/image:\s*"([^"]+)"/.exec(body) || [, "?"])[1];
  const category = (/category:\s*"([^"]+)"/.exec(body) || [, ""])[1];
  const credit = (/credit:\s*"([^"]+)"/.exec(body) || [, ""])[1];

  if (!credit) {
    report("src/data/site.ts", 0, "portfolio-missing-credit",
      `Portfolio item "${brand}" (${image}) has no credit.`,
      'Every photograph in workItems is licensed Hunter Douglas photography. Add credit: "<Product> by Hunter Douglas". PortfolioWall shows one credit for the visible set, so an uncredited item can render a filtered view with NO attribution at all.');
  } else if (credit.replace(/[®™]/g, "").split(" by ")[0].trim() !== brand.replace(/[®™]/g, "").trim()) {
    report("src/data/site.ts", 0, "portfolio-credit-brand-mismatch",
      `Portfolio item brand "${brand}" and credit "${credit}" name different products.`,
      "The credit must name the same product as the brand. Check both against assets/hunter-douglas-brite/site-image-map.json in the docs repo.");
  }

  const implied = CATEGORY_BY_NOUN.find((c) => c.re.test(brand));
  if (implied && category && category !== implied.cat) {
    report("src/data/site.ts", 0, "portfolio-category-contradicts-product",
      `Portfolio item "${brand}" is tagged "${category}" but its name says ${implied.cat}.`,
      `The category pill renders OVER the photograph, so a wrong one misattributes Hunter Douglas's own creative. Set category: "${implied.cat}", or correct the brand if the photo is something else.`);
  }
}

/* ── The brand logo must be mounted above the fold on the homepage hero ── */
const hero = readFileSync(join(SRC, "components", "sections", "Hero.tsx"), "utf8");
if (!/HunterDouglasLogo/.test(hero)) {
  report("src/components/sections/Hero.tsx", 0, "missing-brand-logo",
    "The Hunter Douglas brand logo is not mounted in the hero.",
    "HD requires it on the homepage above the fold, prominent, separate from the dealer's own wordmark. Render <HunterDouglasLogo />.");
}

/* ─────────────────────────── Output ─────────────────────────── */

if (findings.length === 0) {
  console.log("✓ Hunter Douglas compliance check passed.");
  process.exit(0);
}

const byRule = findings.reduce((acc, f) => {
  (acc[f.rule] ||= []).push(f);
  return acc;
}, {});

console.error(`\n✗ Hunter Douglas compliance: ${findings.length} finding(s)\n`);
for (const [rule, items] of Object.entries(byRule)) {
  console.error(`  ${rule} (${items.length})`);
  for (const f of items) {
    console.error(`    ${f.file}${f.line ? `:${f.line}` : ""}`);
    console.error(`      ${f.detail}`);
    console.error(`      fix: ${f.fix}`);
  }
  console.error("");
}
console.error("These are Hunter Douglas dealer-compliance requirements, not style preferences.");
console.error("Failing them risks the hunterdouglas.com dealer-locator listing.");
console.error("Reference: src/data/hunterDouglas.ts\n");
process.exit(1);
