# Portfolio Rebuild — Cinematic Reel + Photo Wall (Jim-Garrity / Window Fantasies)

## Context

Anthony flagged `/portfolio` as a failure: an asymmetric CSS-columns masonry of prose-heavy cards that "reads like a bunch of product cardholder icons," not a gallery. He wants a complete rebuild: carousel-style, photo-first, metadata chips instead of paragraphs, and TikTok-style continuous novelty ("always having the next thing pop up") — grounded in second-brain research, sibling-project implementations, and live inspiration from premium interior-design portfolios.

**Research findings driving the design:**
- Premium interiors portfolios (Kelly Wearstler, Amber Interior Design — captured live in `web/audits/portfolio-inspo-2026-07-21/`) are full-bleed, photo-dominant, near-zero text. Corporate suppliers (Shade Store, Hunter Douglas's own gallery) are labeled-tile/link-list — the anti-pattern.
- Gold-standard in-house implementation: **Carlton-Soohoo-Photography** — `react-photo-album` (`RowsPhotoAlbum`, true-aspect justified rows) + **`yet-another-react-lightbox`** (Captions/Zoom plugins; keyboard, swipe, focus trap for free). JCM's hand-rolled lightbox shipped with NO keyboard support — do not hand-roll.
- Proven Embla carousel pattern in Where 2 Junk (`TestimonialsCarousel.tsx`): responsive slide widths, autoplay interval, dots, prev/next.
- Second-brain guardrails (gallery pattern #126, section-motion skill, symmetry skill): photo-first on mobile (caption sentences `hidden lg:flex`, chip always visible, visible tap cue on touch, full caption in lightbox + DOM); **no scroll-jacking** (TikTok pin-feed banned — snap carousel is the compliant novelty mechanism); metadata chip overlaid fully ON the photo (`absolute left-4 top-4`, translucent + backdrop-blur — never straddling an overflow-hidden seam); ≤3 motion layers; `once:true` reveals; content visible from SSR (no `initial:hidden` on content); reduced-motion degrades static; every image unique; portal-free lightbox handled by the library.

## New page architecture (tone rhythm: dark → cream → dark → cream → dark footer ✓)

```
// [Nav]        — dark  — chrome
// 1 Header     — dark  — existing photo header, copy tightened     → full-bleed media (#2)
// 2 The Reel   — cream — featured horizontal snap carousel          → film-strip carousel (new archetype)
// 3 The Wall   — dark  — filterable true-aspect photo wall          → justified masonry
// 4 CTA        — cream — existing closing CTA (absorbs the old      → centered stack (rationed)
//                        "fitted by hand" quote line)
// [Footer]     — dark  — chrome
```
The old standalone dark quote band is removed (band-count parity keeps perfect alternation; its one key line moves into the CTA band copy).

### Band 2 — "The Reel" (featured carousel, the TikTok-novelty mechanism)
- **Embla carousel** (`embla-carousel-react` + `embla-carousel-autoplay`), edge-to-edge, 6 featured installs.
- Desktop: large editorial landscape frames ~`h-[62vh]`, each slide ~78% viewport wide with the **next slide visibly peeking** (the "next thing always popping up" cue). Mobile: ~88vw slides, 4:5 crop, swipe-first.
- Gentle autoplay (~5s), **pauses on hover/pointer-down, stops after first user interaction, disabled under `prefers-reduced-motion`**. Native drag/swipe + prev/next arrows + dots. No scroll-jacking — page scroll is never captured.
- Per-slide: photo (curated center-crop OK for these room shots) + overlaid metadata chips (category + room, e.g. `SHADES · NURSERY`) + item name in display type. No body prose. Slow luxe hover zoom (`scale-1.05`, ~1.1s, cubic-bezier(0.22,1,0.36,1)).
- Slide click → opens the same lightbox (full uncropped frame).

### Band 3 — "The Wall" (the gallery)
- **`react-photo-album` `RowsPhotoAlbum`** (`targetRowHeight≈300`, spacing≈10) over the remaining 14 items — true aspect ratios, no crops, no orphan rows by construction, reflows cleanly under filters.
- **Filter pills** (single axis: All / Shades / Blinds / Shutters / Drapery): horizontally scrollable pill bar with live counts (JCM pattern), `AnimatePresence` cross-fade keyed on active filter.
- Tiles: photo + small overlaid category chip (all widths) + hover bottom-gradient with the item name (desktop only) + always-visible expand cue on touch (`opacity-100 lg:opacity-0 lg:group-hover:opacity-100`). Zero prose on tiles.
- Tap/click → lightbox.

### Lightbox (shared by Reel + Wall)
- **`yet-another-react-lightbox`** + Captions plugin, dynamically imported (`next/dynamic`) to protect Lighthouse ≥90.
- Caption = item name + metadata line (`Silhouette Sheer Shades — Shades · Living room`) + the existing blurb (this is where the current card prose survives, off the tiles). Prev/next arrows + swipe = in-lightbox novelty continuation.
- Keyboard, focus trap, backdrop-close, reduced-motion: handled by the library (verified in Carlton).

### Data (`src/data/site.ts`)
- Extend `WorkItem` with `room: string` (chip metadata) and `featured?: boolean` (6 reel picks). Keep `blurb` (now lightbox-only). All 20 items stay in the one plain-`.ts` module (server + client safe). No image is shown in both Reel and Wall (uniqueness within the page).

## Files

| Action | File |
|---|---|
| Rewrite | `src/app/portfolio/page.tsx` (server shell: header + bands + CTA; metadata unchanged) |
| New | `src/components/work/PortfolioReel.tsx` ("use client", Embla) |
| New | `src/components/work/PortfolioWall.tsx` ("use client", photo-album + filters + lightbox state) |
| New | `src/components/work/PortfolioLightbox.tsx` (dynamic-imported YARL wrapper) |
| Delete | `src/components/work/WorkCard.tsx` (verify no other refs first) |
| Edit | `src/data/site.ts` (`WorkItem` + `room`/`featured` fields on all 20 items) |
| Install | `embla-carousel-react`, `embla-carousel-autoplay`, `react-photo-album`, `yet-another-react-lightbox` |

Homepage is untouched (no portfolio teaser exists there today beyond nav links).

## Verification (pre-ship gate)

1. `npm run build` clean; dev server up.
2. Playwright captures (existing scratchpad scripts, slow-scroll variant) at **1440 and 390**: symmetry §5 gate by eye — no lopsided voids, chips fully visible (not seam-clipped), tone string `D L D L` + dark footer, no orphan rows at any filter selection, no text-on-gradient band without imagery.
3. Interaction checks in the browser: reel drags + autoplays + pauses on hover + stops on interaction; filter pills reflow without blank states; lightbox opens from both bands, arrows/Escape/Tab-trap work; mobile 390 — captions hidden, chip + expand cue visible, swipe works.
4. Reduced-motion pass (`-rm` capture): carousel static but fully visible, reveals instant, nothing blank (SSR-visible check).
5. Console: 0 errors/warnings at both viewports. Commit + push (auto-deploy), log to progress.md.
