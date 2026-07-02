#!/usr/bin/env node
/**
 * generate-blog-images.mjs
 * Stage 1G — fal.ai blog card + header image generation.
 *
 * Reads FAL_KEY from .env.local. Generates 20 images (10 articles × 2 each)
 * to public/images/blog/[slug]-card.jpg and [slug]-header.jpg.
 *
 * Pattern #41: parameterized node script.
 * Pattern #38: never request readable text in prompts.
 * Pattern #72: each prompt visually distinct (no two should produce similar images).
 * Pattern #17 (Image Generation Rule): all prompts reviewed as a set before generation.
 *
 * Usage:
 *   node scripts/generate-blog-images.mjs              # generate all 18
 *   node scripts/generate-blog-images.mjs --slug=X     # regenerate just one
 *   node scripts/generate-blog-images.mjs --type=card  # only card or only header
 */

import { fal } from "@fal-ai/client";
import { writeFile, readFile, mkdir, access } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_BLOG_DIR = join(__dirname, "..", "public", "images", "blog");
const ENV_PATH = join(__dirname, "..", ".env.local");

// ----- Load FAL_KEY from .env.local -----
const envContents = await readFile(ENV_PATH, "utf-8");
const FAL_KEY_MATCH = envContents.match(/^FAL_KEY=(.+)$/m);
if (!FAL_KEY_MATCH || !FAL_KEY_MATCH[1].trim()) {
  console.error("⛔ FAL_KEY not set in .env.local");
  process.exit(1);
}
fal.config({ credentials: FAL_KEY_MATCH[1].trim() });
console.log("✓ FAL_KEY loaded");

// ----- Shared prompt style (design-system.md §6) -----
const STYLE_SUFFIX = "warm amber highlights, granite-cool shadows, sage green accents, slight 35mm film grain, editorial commercial photography, shallow depth of field, no people, no readable text, no logos.";

// ----- The 20 prompts (10 articles × 2 each, reviewed as a set) -----
const PROMPTS = [
  // 1. Bank branch opening
  {
    slug: "branch-opening-promotional-products-checklist",
    type: "card",
    aspect: "landscape_4_3",
    prompt: `Aerial close-up of a polished wooden bank teller counter at golden hour, neat row of identical retractable pens, a stack of insulated steel coffee tumblers, and a folded teller polo shirt arranged on the counter. Soft side window light. ${STYLE_SUFFIX}`,
  },
  {
    slug: "branch-opening-promotional-products-checklist",
    type: "header",
    aspect: "landscape_16_9",
    prompt: `Wide editorial shot of an empty modern community bank branch interior on opening day, polished marble floor reflecting overhead pendant lights, two leather teller chairs, a teller counter with a small arrangement of promotional items, sunlight streaming through floor-to-ceiling windows. ${STYLE_SUFFIX}`,
  },

  // 2. Pen pricing
  // v2 prompt: original output rendered rifle-cartridge-like shapes because grouped
  // "pens with metallic tips" reads ambiguously to the model. v2 emphasizes pen clips,
  // push-buttons, and writing-instrument context, and explicitly excludes ammunition.
  {
    slug: "branded-pen-cost-per-unit-volume-pricing",
    type: "card",
    aspect: "landscape_4_3",
    prompt: `Overhead flat-lay on a warm walnut office desk surface: identical white-bodied promotional ballpoint pens, each pen showing its silver metal pocket clip and rubber grip clearly, arranged in three groups in increasing quantity from left to right: five pens in a neat row, twenty-five pens lined up in five rows of five, and roughly one hundred pens in a loose fan shape. A blank white notepad with a pen lying diagonally across it in the foreground. Single overhead lamp from above. Office desk context with a coffee mug and a stack of paper. The pens are clearly office writing instruments with visible clips. ${STYLE_SUFFIX}`,
  },
  {
    slug: "branded-pen-cost-per-unit-volume-pricing",
    type: "header",
    aspect: "landscape_16_9",
    prompt: `Close-up macro photograph of a single high-quality retractable promotional pen lying diagonally on a blank notepad, soft sage-green and warm gold reflections on the metal barrel, sunlight from the right. ${STYLE_SUFFIX}`,
  },

  // 3. Polo shirts
  {
    slug: "polo-shirts-bank-teller-team-buying-guide",
    type: "card",
    aspect: "landscape_4_3",
    prompt: `Neatly folded stack of three deep navy polo shirts with subtle embroidered chest detail, arranged on an oak retail display table next to a wooden embroidery hoop and a spool of gold thread. Soft side window light. ${STYLE_SUFFIX}`,
  },
  // v2 prompt: original rendered an invented figurative character embroidery on the
  // chest. v2 removes any chest emblem entirely - clean unbranded shirt for vendor-neutral feel.
  {
    slug: "polo-shirts-bank-teller-team-buying-guide",
    type: "header",
    aspect: "landscape_16_9",
    prompt: `Studio still life of a folded clean deep navy teller polo shirt with completely plain unembellished chest, draped neatly over a wooden mannequin torso, an empty wooden embroidery hoop and a spool of gold thread in the soft-focus foreground on a wooden workbench, warm side-lighting from a workshop window, sage green wall behind. The polo shirt has absolutely no logo or emblem of any kind on it. ${STYLE_SUFFIX}`,
  },

  // 4. Trade show countdown
  {
    slug: "trade-show-promo-6-week-countdown",
    type: "card",
    aspect: "landscape_4_3",
    prompt: `Overhead flat-lay of a trade show planning desk: a wall calendar marked with small red dots scattered across two months, a stack of leather-bound notebooks, a measuring tape coiled loosely, three small product samples in mid-amber lighting. ${STYLE_SUFFIX}`,
  },
  {
    slug: "trade-show-promo-6-week-countdown",
    type: "header",
    aspect: "landscape_16_9",
    prompt: `Wide editorial shot of an empty trade show booth at dawn, polished concrete floor, a clean modular display backdrop in soft taupe, a tall promotional banner pole, and a row of unboxed insulated tumblers awaiting setup, warm amber sunrise light through skylights. ${STYLE_SUFFIX}`,
  },

  // 5. Tumblers vs ceramic mugs
  {
    slug: "insulated-tumblers-vs-ceramic-mugs-client-gifts",
    type: "card",
    aspect: "landscape_4_3",
    prompt: `Side-by-side studio still life on a polished marble surface: one premium brushed-steel insulated tumbler with a tight gold accent ring on the left, one matte hand-thrown ceramic mug slightly steaming on the right, soft morning window light. ${STYLE_SUFFIX}`,
  },
  {
    slug: "insulated-tumblers-vs-ceramic-mugs-client-gifts",
    type: "header",
    aspect: "landscape_16_9",
    prompt: `Overhead flat-lay on a charcoal slate board of two equally premium gift sets: left a sleek brushed-steel insulated tumbler with a brown craft gift box and twine, right a hand-thrown ceramic mug with a folded linen napkin and a sprig of dried lavender. Warm side-lighting. ${STYLE_SUFFIX}`,
  },

  // 6. Vetting vendors
  {
    slug: "how-to-vet-a-promotional-products-vendor-5-minutes",
    type: "card",
    aspect: "landscape_4_3",
    prompt: `Top-down photograph of a quiet wooden desk: an open leather folio, a vintage brass magnifying glass, a black fountain pen, three sample fabric swatches in muted navy, sage, and gold, warm window light from the left. ${STYLE_SUFFIX}`,
  },
  {
    slug: "how-to-vet-a-promotional-products-vendor-5-minutes",
    type: "header",
    aspect: "landscape_16_9",
    prompt: `Close-up of two hands holding a vintage brass loupe magnifier inspecting a folded fabric swatch on a warm walnut desk, sage green and amber fabric samples spread loosely around, single overhead pendant lamp, faces never visible, hands only as foreground props. ${STYLE_SUFFIX}`,
  },

  // 7. Pantone match
  {
    slug: "what-is-a-pantone-match-bank-brand-colors",
    type: "card",
    aspect: "landscape_4_3",
    prompt: `Studio still life on a charcoal slate surface of a fanned-out paint-chip color swatch book showing a gradient of navy, sage, and warm gold strips, alongside a printed circular color wheel and a single embroidered polo collar showing color match, warm side-lighting. ${STYLE_SUFFIX}`,
  },
  {
    slug: "what-is-a-pantone-match-bank-brand-colors",
    type: "header",
    aspect: "landscape_16_9",
    prompt: `Macro photograph of a printer's ink-mixing station: small glass jars of liquid pigments in primary colors arranged in a row, a single fine brush mixing two colors on a thick glass palette, warm overhead clamp lamp, sage green liquid in one jar foreground. ${STYLE_SUFFIX}`,
  },

  // 8. Setup fees / screen charges
  {
    slug: "setup-fees-screen-charges-surcharges-explained",
    type: "card",
    aspect: "landscape_4_3",
    prompt: `Overhead flat-lay of a screen-printing workshop: an aluminum silk-screen frame with white mesh, a wooden squeegee, three small ink-mixing cups in different muted colors, and a stack of printed sample sheets arranged on a warm walnut surface, soft window light. ${STYLE_SUFFIX}`,
  },
  {
    slug: "setup-fees-screen-charges-surcharges-explained",
    type: "header",
    aspect: "landscape_16_9",
    prompt: `Wide editorial shot of a manual screen-printing press in a small print shop at golden hour, sunlight cutting through window blinds onto the press, sage green shop towel hanging on a hook in the corner, warm amber atmosphere, granite-cool shadows. ${STYLE_SUFFIX}`,
  },

  // 9. Credit union financial literacy
  {
    slug: "credit-union-promotional-products-financial-literacy-month",
    type: "card",
    aspect: "landscape_4_3",
    prompt: `Overhead flat-lay on a warm wooden tabletop of a community financial literacy day setup: a small ceramic piggy bank, a children's coloring book opened to a blank page, a stack of magnetic bookmarks, a folded canvas tote bag, all in warm amber and sage tones. ${STYLE_SUFFIX}`,
  },
  {
    slug: "credit-union-promotional-products-financial-literacy-month",
    type: "header",
    aspect: "landscape_16_9",
    prompt: `Wide editorial shot of a small community credit union community room set up for a financial literacy event: empty round tables draped in sage green tablecloths, paper banners awaiting setup, soft pendant lighting, warm amber atmosphere, granite-cool shadows in the corners. ${STYLE_SUFFIX}`,
  },

  // 10. New-hire welcome kit
  {
    slug: "new-hire-welcome-kit-checklist",
    type: "card",
    aspect: "landscape_4_3",
    prompt: `Overhead flat-lay on a warm wooden desk of an unboxed employee welcome kit: a neatly folded plain heather-grey t-shirt, a brushed-steel insulated tumbler, a bound kraft notebook with a click pen resting on it, a blank cream greeting card propped upright, a folded natural canvas tote, and a fabric lanyard coiled beside a blank badge holder, arranged in a tidy grid. Soft morning window light from the left, sage green accent. ${STYLE_SUFFIX}`,
  },
  {
    slug: "new-hire-welcome-kit-checklist",
    type: "header",
    aspect: "landscape_16_9",
    prompt: `Wide editorial shot of a clean modern office desk prepared for a new employee's first day: an empty ergonomic chair tucked in, a closed silver laptop, and a welcome kit arranged on the desk surface with a folded apparel item, a brushed-steel tumbler, and a kraft notebook, warm sunrise light through floor-to-ceiling office windows, a small potted plant in soft focus. ${STYLE_SUFFIX}`,
  },
];

console.log(`✓ ${PROMPTS.length} prompts loaded`);

// ----- CLI flags -----
const args = process.argv.slice(2);
const slugFilter = args.find((a) => a.startsWith("--slug="))?.split("=")[1];
const typeFilter = args.find((a) => a.startsWith("--type="))?.split("=")[1];
const force = args.includes("--force");

const filtered = PROMPTS.filter((p) => {
  if (slugFilter && p.slug !== slugFilter) return false;
  if (typeFilter && p.type !== typeFilter) return false;
  return true;
});

if (filtered.length === 0) {
  console.error("⛔ No prompts match the filter");
  process.exit(1);
}

console.log(`→ Generating ${filtered.length} image(s)`);

// ----- Ensure output dir exists -----
await mkdir(PUBLIC_BLOG_DIR, { recursive: true });

// ----- Generate each (sequential to keep rate-limit safe + log clarity) -----
let successCount = 0;
let skipCount = 0;
let failCount = 0;
const results = [];

for (const { slug, type, aspect, prompt } of filtered) {
  const filename = `${slug}-${type}.jpg`;
  const outPath = join(PUBLIC_BLOG_DIR, filename);

  if (existsSync(outPath) && !force) {
    console.log(`⏭  ${filename} exists (use --force to regenerate)`);
    skipCount++;
    continue;
  }

  process.stdout.write(`→ ${filename} ... `);
  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt,
        image_size: aspect,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: true,
        output_format: "jpeg",
      },
      logs: false,
    });

    const url = result.data?.images?.[0]?.url;
    if (!url) throw new Error("No image URL in response");

    const imgResponse = await fetch(url);
    if (!imgResponse.ok) throw new Error(`Image download failed: ${imgResponse.status}`);
    const buf = Buffer.from(await imgResponse.arrayBuffer());
    await writeFile(outPath, buf);

    console.log(`✓ ${(buf.byteLength / 1024).toFixed(0)} KB`);
    successCount++;
    results.push({ filename, status: "ok", bytes: buf.byteLength });
  } catch (err) {
    console.log(`✗ ${err?.message ?? err}`);
    failCount++;
    results.push({ filename, status: "fail", error: String(err?.message ?? err) });
  }
}

console.log(`\nDONE — ${successCount} generated · ${skipCount} skipped · ${failCount} failed`);
if (failCount > 0) process.exit(1);
