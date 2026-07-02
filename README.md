# Window Fantasies — windowfantasies.com

Premium website for **Window Fantasies LLC** (Salem, NH) — authorized Hunter Douglas
**Centurion** dealer serving all of New England. Custom shades, blinds, shutters, and
drapery, measured, designed, and installed personally by the owner, guaranteed for life.

Built by [Optimus Business Solutions](https://github.com/tonyrosa777-ops).

## Stack

- **Next.js** (App Router) + TypeScript (strict) + Tailwind CSS 4
- **Framer Motion** scroll-triggered animation
- **Sanity** (blog content) · **Resend** (consultation-form lead routing)
- Design tokens as CSS custom properties in `src/app/globals.css`
  (black-and-gold brand system — see the design-system contract, REV 2 2026-07-02)

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build — all routes prerender
```

## Structure

- `src/app/` — routes (home, products catalog, services, portfolio, about,
  service-areas per town, blog, FAQ, testimonials, request-a-consultation, legal)
- `src/components/` — sections, UI primitives, animations
- `src/data/site.ts` — single content hub (zero hard-coded strings in components)
- `src/lib/schema.ts` — LocalBusiness / FAQPage / Review JSON-LD
