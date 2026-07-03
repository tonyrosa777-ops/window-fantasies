# /optimus-review — Window Fantasies (web)
Date: 2026-07-02
Diff scope: build working tree, src/** (77 files scanned by specialists) vs base
Specialists run: 8 (all completed) — correctness, security, architecture, tests, performance, style, absolute-rules, design-system
Verifier: Opus 4.7
Raw findings: 17  Verified: 7 BUG  8 DESIGN  0 suppressed (2 consolidated as duplicates)

## Summary
BUG: 7 — must resolve before launch
DESIGN: 8 — review with owner; fix or waive
SUPPRESSED: 0 — every finding reproduced against the code

Approved client deviations in website/CLAUDE.md (no shop, no pricing tiers, consultation-form-as-primary-CTA, real Google reviews only) were honored and NOT elevated to bugs. The consultation-form primary CTA is correct per deviation #3. The hero SECONDARY CTA (phone link) is a separate, uncovered issue (BUG-6). Two duplicate pairs were consolidated, not suppressed: the layout.tsx:34 em-dash (flagged by both absolute-rules and design-system) and the SITE_URL duplication (flagged by both architecture and style).

## BUG Findings (block launch — must resolve)

### BUG-1 — [correctness] — src/app/request-a-consultation/ConsultationClient.tsx:68-85
The primary lead-capture form (the site's KEY_GOAL) reports success on every API response and silently drops the lead whenever the live route returns 429, 502, 400, or 403.

**Reproduction:** Read ConsultationClient.tsx:59-85. Confirmed onSubmit awaits fetch("/api/contact") then calls setStatus("success") and reset() unconditionally, discarding the response via `void res` (line 80), and the catch block also sets success (lines 81-84). Read the full route at src/app/api/contact/route.ts: it is fully wired to Resend and returns real error codes (403 line 148, 415 line 154, 429 line 160, 400 lines 168/185, 502 lines 252-255). The demo-mode 200 with `{ demo: true }` fires ONLY when RESEND_API_KEY is blank (lines 202-215). So the moment RESEND_API_KEY is set (the point of wiring Resend for lead capture), a rate-limited or delivery-failed submission shows the visitor "Jim will be in touch within 24 hours" (lines 87-107) while the lead never reaches Jim. This is the exact silent-lead-loss failure class CLAUDE.md's Fix-on-Sight Rule codifies (Goddu Imprint). The inline "Demo mode: treat non-200 as success until the Resend route is wired" comment (line 77) is stale.
**Suggested fix:** Branch on the response. `const res = await fetch(...); const json = await res.json().catch(() => null); if (!res.ok || json?.success === false) { setStatus("error"); setErrorMessage(json?.error ?? "Something went wrong. Please call Jim directly at " + phone); return; } setStatus("success"); reset();`. Keep the demo fallback ONLY for the 200 `{ demo: true }` response so the pre-Resend demo still shows success.
**Also flagged by:** —

---

### BUG-2 — [correctness] — src/app/contact/ContactClient.tsx:66-88
The contact form has the same defect: it treats every API response, including `!res.ok`, as success, hiding real submission failures from the visitor.

**Reproduction:** Read ContactClient.tsx:55-88. Confirmed the `if (!res.ok)` branch (lines 75-79) calls setStatus("success") + reset() + return, the fall-through res.ok branch does the same (lines 81-82), and the catch does the same (lines 83-87), so the form is provably always "success" regardless of status code. Against the live route (verified wired, see BUG-1), a 429 or 502 makes a visitor believe their message reached Jim when it did not. No error state is reachable from a server or network failure (only the pre-fetch Zod parse at lines 57-60 can set error).
**Suggested fix:** Remove the `if (!res.ok) -> success` branch. On `!res.ok` or JSON `{ success: false }`, setStatus("error") and surface a fallback-to-phone message. Treat only the route's 200 `{ demo: true }` response as a demo success.
**Also flagged by:** —

---

### BUG-3 — [design-system] — src/components/work/WorkCard.tsx:28 (systemic, ~19 files)
Pure white `#FFFFFF` is hardcoded as the light-band card background across roughly 19 files, violating the project's explicit, bolded no-white brand-constitution rule.

**Reproduction:** Read WorkCard.tsx:21-34. Confirmed line 28 sets `background: isLight ? "#FFFFFF" : "var(--bg-card)"` (cold pure white on light bands, token on dark). Read design-system.md:72, which states verbatim: "top-stop is a tinted `#FBF7E8`, **never #FFFFFF** (no-white rule)." CLAUDE.md's Homepage Section Architecture Rule reinforces "No white (or near-white) backgrounds. Never #fff." A repo grep confirmed the same `#FFFFFF` card background in ~19 files (WorkCard, PostCard:148, ProcessSteps:50, ProductCategories:38, ServiceAreaTeaser:53, SignatureProducts:61, plus pages about:73, blog:176, faq:22, products:103 and products/[slug]:322, service-areas:95 and [city]:252/566, services:68/161 and [slug]:241/326, testimonials:30). WorkCard.tsx:13 itself carries a "ZERO em dashes" binding comment, so the file is meant to self-enforce project standards. This is an unapproved deviation from the brand constitution (no white-card waiver exists in website/CLAUDE.md's deviation list).
**Suggested fix:** Add one warm light-card token to globals.css (for example `--bg-card-light: #FBF7E8;`, an elevated cream that steps up from `--cream` #F8F3E2) and replace every `background: "#FFFFFF"` card background with `var(--bg-card-light)`, mirroring the dark-side `var(--bg-card)` pattern. One token change closes all ~19 occurrences.
**Also flagged by:** —

---

### BUG-4 — [correctness] — src/app/products/[slug]/page.tsx:149 and src/app/services/[slug]/page.tsx:212
An invalid `preload` prop (next/image has no such prop; the correct one is `priority`) is passed to the product and service hero images, so the intended LCP optimization silently never applies.

**Reproduction:** Grepped both files: products/[slug]/page.tsx:149 and services/[slug]/page.tsx:212 each pass a bare `preload` prop on the hero `<Image>`. next/image supports `priority` (loading=eager + fetchpriority=high + preload link), not `preload`; `preload` is also not a valid `<img>` attribute, so it forwards to the DOM as an unknown attribute and no-ops. The hero image is the LCP element on these two page templates, so it loads without priority treatment, working against the Lighthouse >= 90 budget in CLAUDE.md Code Standards. `priority` is used correctly elsewhere in this codebase (blog pages), confirming the intended prop.
**Suggested fix:** Replace `preload` with `priority` on both hero images (products/[slug]/page.tsx:149 and services/[slug]/page.tsx:212).
**Also flagged by:** —

---

### BUG-5 — [security] — src/app/api/contact/route.ts:115-119
The contact-form rate limit derives its key from the leftmost, client-controlled `x-forwarded-for` value, so a scripted client can defeat the 5-per-10-minute cap on this load-bearing endpoint by sending a fresh header each request.

**Reproduction:** Read route.ts:115-119. Confirmed getClientIp returns `xff.split(",")[0]` (the leftmost, caller-supplied hop) and only falls back to `x-real-ip` when the header is absent. On Vercel the platform appends the real client IP to the RIGHT of any caller-sent value, so the leftmost entry is attacker-controlled and yields a new rate-limit bucket per request (keyed at line 158). The other layers do not compensate: isAllowedOrigin (lines 121-143) is satisfiable by a non-browser client setting `Origin: https://windowfantasies.com` (in ALLOWED_ORIGINS), and the honeypot (lines 172-181) is bypassed by omitting `website`. That leaves the IP limiter as the de-facto only volume control on an endpoint that sends two real Resend emails per accepted submission, so a bypass risks Resend cost, sending-domain reputation, and owner-inbox flooding. Note the code documents the limiter as best-effort with a planned Phase-2 durable store (lines 89-95), so the human may choose to bundle this with that work, but the one-line IP-derivation fix is correct and cheap to land now.
**Suggested fix:** Prefer the platform-trusted IP: `const ip = request.headers.get("x-real-ip") ?? (xff ? xff.split(",").pop()!.trim() : "unknown")`, reading the RIGHTMOST (proxy-appended) hop rather than the leftmost. Pair with the already-planned Upstash Ratelimit + KV durable store so the cap also holds across warm instances, and consider a small global daily send cap as a backstop.
**Also flagged by:** —

---

### BUG-6 — [absolute-rules] — src/data/site.ts:282 (and :1145), rendered in src/components/sections/Hero.tsx:172-184
The hero secondary CTA is a tap-to-call phone link, which Absolute Rule section 5 categorically forbids in the hero, and no approved client deviation covers it.

**Reproduction:** Read site.ts:281-282, confirmed `ctaSecondary: { label: "Call Jim", href: \`tel:+1${PHONE_TEL}\` }`, and the same at site.ts:1145 (the homepage cta block). Read Hero.tsx:172-184, confirmed the secondary anchor renders `{ctaSecondary.label} · {siteConfig.business.phoneFormatted}` as a phone link in the hero. CLAUDE.md Hero Architecture Rule (section 5) bans "Call Now" in the hero, states a phone CTA "belongs in the nav bar, not the hero," and requires "Secondary CTA is always the quiz." website/CLAUDE.md deviation #4 waives the quiz, but no deviation authorizes a phone CTA in the hero, and deviation #3 explicitly routes Jim's phone booking to the separate voice-AI product, not the site. So the waived-quiz slot was filled with the one hero destination the rule bans, and it competes with the primary consultation-form CTA. The primary CTA itself is correct (consultation form, deviation #3).
**Suggested fix:** Keep the phone in the nav bar (where section 5 places it) and change the hero ctaSecondary to an on-domain, non-phone destination, for example a scroll anchor to the consultation section or a link to the portfolio or products page. Apply to both site.ts:282 and site.ts:1145. (Avoid the exact label "See Our Work," which section 5 also names as a banned CTA phrase.) If Anthony intends the phone secondary as a deliberate extension of the no-quiz deviation, this can be waived, but it is currently uncovered.
**Also flagged by:** —

---

### BUG-7 — [absolute-rules] — src/app/layout.tsx:34 (and schema.ts:328, opengraph-image.tsx:12)
The primary site meta description contains two em dashes in human-facing copy, violating the project's own declared "Zero em dashes" standard, and two sibling string values carry the same tell.

**Reproduction:** Grepped layout.tsx: line 34 `metadata.description` contains two U+2014 em dashes (flanking the phrase "shades, blinds, shutters, drapery and motorization"), which render in SERP snippets and are extracted by AI answer engines. site.ts:247 declares the config's own standard verbatim ("Tone: educate, do not sell. Zero em dashes"), and WorkCard.tsx:13 carries a "ZERO em dashes in any string literal" binding comment, so the project intent is unambiguous and unscoped. Confirmed two sibling string values (not comments) also carry em dashes: schema.ts:328 `nameOverride: \`${siteConfig.business.name} — ${cityName}\`` (renders in JSON-LD name) and opengraph-image.tsx:12 `export const alt = \`${...name} — ${...tagline}\`` (OG alt text). Testimonials and review copy were verified em-dash clean, so this is the drift the standard guards against. Low severity, trivial fix, flagged independently by two specialists.
**Suggested fix:** Replace the em dashes with commas or a colon in layout.tsx:34 (for example "custom window treatments: shades, blinds, shutters, drapery and motorization, measured, designed and installed by hand"). Apply the same comma or colon join in schema.ts:328 and opengraph-image.tsx:12, then grep the metadata and schema exports for U+2014 to confirm none remain.
**Also flagged by:** design-system

## DESIGN Findings (review with owner — fix or waive)

### DESIGN-1 — [architecture] — src/app/blog/[slug]/page.tsx:62, sitemap.ts:13, robots.ts:14, layout.tsx:35, products/[slug]/page.tsx:439
The canonical site URL is re-derived inline in four-plus files instead of importing the `SITE_URL` constant already exported from lib/schema.ts, and the product schema hardcodes the bare domain with no env fallback at all.

**Severity:** minor refactor (single-source-of-truth / magic-string)
**Action options:**
- Fix in this commit: Import the exported `SITE_URL` from lib/schema.ts:26 (or lift it to a tiny src/lib/site-url.ts) into blog/[slug]:62, sitemap.ts:13, robots.ts:14, and layout.tsx:35, and in products/[slug]/page.tsx:439 use `const url = \`${SITE_URL}/products/${product.slug}\`` so product JSON-LD respects NEXT_PUBLIC_SITE_URL like the rest of the site (verified at :439/:463/:475/:478/:483 the bare literal is used with no fallback).
- Waive with rationale: The production domain is stable and no staging domain is in use, so the duplicated literal is low risk until a domain change is needed.

---

### DESIGN-2 — [architecture] — src/app/blog/[slug]/page.tsx:61-89 (rendered 112-116)
Article JSON-LD is built by a local `buildArticleJsonLd` inside the blog route and rendered via a raw `<script dangerouslySetInnerHTML>`, bypassing the centralized lib/schema.ts builders and the reusable JsonLd component used by seven other pages.

**Severity:** minor refactor (pattern consistency / separation of concerns)
**Action options:**
- Fix in this commit: Move Article schema into lib/schema.ts as `buildArticleSchema(post)` (reusing SITE_URL and the existing Organization/Person builders for publisher and author) and render it with `<JsonLd data={buildArticleSchema(post)} />`, matching the seven pages that already use the JsonLd component (verified inline at blog/[slug]:61-89 and JsonLd.tsx exists at src/components/JsonLd.tsx).
- Waive with rationale: The inline schema renders correct JSON-LD today; centralizing is cleanup, not a functional fix.

---

### DESIGN-3 — [architecture] — src/components/sections/CostHonesty.tsx:12-29 (also Hero.tsx TRUST_CHIPS, ProcessSteps.tsx STEPS)
Substantial marketing copy is embedded as local const arrays in homepage section components, violating the CLAUDE.md Code Standard "All copy lives in /data/site.ts, zero hard-coded strings in components."

**Severity:** subjective (maintainability / single-source-of-truth for copy)
**Action options:**
- Fix in this commit: Move these copy blocks into src/data/site.ts (for example siteConfig.costHonesty.points, siteConfig.hero.trustChips, siteConfig.processSteps) and map over siteConfig in the components, matching how Hero already consumes siteConfig.hero (verified CostHonesty POINTS at 12-29 and the eyebrow/H2/intro at 36-44 are inline; Hero uses a local TRUST_CHIPS const at line 194). This restores the whole-codebase fact-change grep discipline.
- Waive with rationale: The copy is stable homepage-only content; the team accepts these components as the source for their own strings for now.

---

### DESIGN-4 — [architecture] — src/app/blog/[slug]/page.tsx:30-32 and 93-94
The two blog routes disagree on their source of truth: the index is Sanity-aware with a seeded fallback, the detail route is seeded-only, and POST_BY_SLUG_QUERY plus four other GROQ queries are never imported, so enabling Sanity would break every article detail link.

**Severity:** subjective (latent inconsistency, currently dormant)
**Action options:**
- Fix in this commit: Route both blog routes through one lib helper (getAllPosts / getPostBySlug) that encapsulates the isSanityConfigured branch plus seeded fallback, so index and detail can never diverge, OR park the unused GROQ queries until the Sanity swap lands. Verified: blog/page.tsx:83-96 uses isSanityConfigured + getSanityClient + ALL_POSTS_QUERY with a seeded fallback; blog/[slug]:30-32 and 93-94 are seeded-only. Currently safe because isSanityConfigured is false, so this is a "resolve before wiring Sanity" item, not a live break.
- Waive with rationale: Sanity is not configured for launch, so the detail route is seeded-only and correct today; revisit before enabling the CMS.

---

### DESIGN-5 — [tests] — package.json:5
The project ships with no test framework, so the security-hardened lead-capture route (Zod schema, sanitizers, rate limiter, origin check) and its hand-patched fixes have zero regression coverage.

**Severity:** subjective (process / quality gap; CLAUDE.md declares no "no-tests" convention)
**Action options:**
- Fix in this commit: Add Vitest plus a `"test": "vitest run"` script and a focused first suite around the route's pure units (extract and test stripControlChars, safeName, rateLimit, isAllowedOrigin, and the Body schema), locking in the BUG-1/2/3/4/7 hardening the route header references. Verified package.json:5-10 defines only dev/build/start/lint and no test tooling is in dependencies.
- Waive with rationale: The build relies on browser and five-persona manual QA gates; unit tests can follow post-launch.

---

### DESIGN-6 — [performance] — src/app/api/contact/route.ts:263
A hard-coded 900ms sleep plus a serial second Resend send blocks the contact-form HTTP response on the primary conversion path, adding roughly one second of avoidable perceived latency per submit.

**Severity:** minor performance (hot path, but the form functions correctly)
**Action options:**
- Fix in this commit: After the load-bearing owner send succeeds, return success immediately and run the courtesy auto-reply out of band with Next.js `after()` (or Vercel `waitUntil`), keeping the 900ms rate-limit spacing off the response path. Verified route.ts:263 `await sleep(900)` runs before the auto-reply send (277-295) and the final response (297), all serial.
- Waive with rationale: The current serial flow is simpler and the added latency is tolerable for the submit volume expected at launch.

---

### DESIGN-7 — [performance] — src/components/layout/Nav.tsx:7
Nav (rendered in the root layout on every route) value-imports the entire ~1,212-line siteConfig object though it uses only two phone fields, dragging all site copy into every page's client bundle; several other client components do the same.

**Severity:** minor performance (bundle size vs the Lighthouse >= 90 budget)
**Action options:**
- Fix in this commit: Split the small client-needed slice into its own module (for example src/data/business.ts exporting phone and phoneFormatted), import that into the client components, and have site.ts re-export it for server components. Verified Nav.tsx:7 does `import { siteConfig } from "@/data/site"` (a value import into a "use client" component); type-only imports elsewhere are already fine. Repeat for Hero, ContactClient, ConsultationClient, and CityPageClient or pass the primitives as props.
- Waive with rationale: If measured route JS stays within the Lighthouse budget, the single-source convenience may be worth the payload until it shows up in metrics.

---

### DESIGN-8 — [security] — src/app/blog/[slug]/page.tsx:88 and 115, src/components/JsonLd.tsx:26, src/lib/schema.ts:466
JSON-LD is serialized with raw `JSON.stringify` and injected via dangerouslySetInnerHTML with no HTML-context escaping, a latent stored-XSS class on the CMS trust boundary with no live exploit path today.

**Severity:** subjective (low, latent hardening; no reachable untrusted input currently)
**Action options:**
- Fix in this commit: Escape the HTML-significant characters in one shared serializer and route every JSON-LD render through it, replacing the bodies of jsonLdString (schema.ts:466), buildArticleJsonLd (blog/[slug]:88), and JsonLd.tsx:26 with `JSON.stringify(schema).replace(/</g,"\\u003c").replace(/>/g,"\\u003e").replace(/&/g,"\\u0026").replace(/ /g,"\\u2028").replace(/ /g,"\\u2029")`. This is JSON-LD-safe and closes the `</script>` breakout regardless of future CMS content.
- Waive with rationale: Verified all schema content today is owner-authored (static site.ts plus seeded blog posts; Sanity is not configured, dynamic route params resolve against site allowlists), so there is no live XSS. Defer until the Sanity CMS is enabled with multiple editors.

## Suppressed (verifier classified as false-positive)

None. All 17 raw findings reproduced against the actual code. Two pairs were consolidated (not suppressed): the layout.tsx:34 em dash (absolute-rules + design-system, now BUG-7) and the SITE_URL / canonical-domain duplication (architecture + style, now DESIGN-1). Per the dedup rules, consolidation preserves both specialists' signal in the Also-flagged-by field rather than dropping a finding.

---

## Handoff (for project-prime.md Stage 1J)

```
[STAGE-1J-RESULT]
Status: BUG-FIXES-REQUIRED
BUGs: 7 — must fix before commit
DESIGNs: 8 — review with Anthony
Suppressed: 0
Reviewer: optimus-review verifier (Opus 4.7)
```
