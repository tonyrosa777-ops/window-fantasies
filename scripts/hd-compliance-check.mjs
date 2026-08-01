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

import { readFileSync, readdirSync, statSync } from "node:fs";
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
  { name: "ClearView", sym: "®" },
  { name: "Modern Precious Metals", sym: "®" },
  { name: "Palm Beach", sym: "™" },
  { name: "Nantucket", sym: "™" },
  { name: "EasyRise", sym: "™" },
  { name: "SimpleLift", sym: "™" },
  { name: "Aria", sym: "™" },
];

/** Marks may not be pluralized. */
const PLURALS = /\b(Silhouettes|Duettes|Luminettes|Pirouettes|Vignettes|Sonnettes|Applauses|Provenances|Parklands|Heritances)\b/;

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
