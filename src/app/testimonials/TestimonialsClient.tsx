"use client";

import type { Testimonial } from "@/data/site";
import { StarRating } from "@/components/ui/StarRating";

/**
 * TestimonialsClient — real reviews (Google, Yelp, Facebook) in a masonry layout.
 *
 * Reviews vary in length (one line to a full paragraph, some rating-only), so a
 * fixed equal-height grid would either clip long ones or leave dead space under
 * short ones. A CSS multi-column masonry flows variable-height cards with no
 * orphan cells and no forced equal height (design-symmetry: masonry is the right
 * structure for UNEQUAL items).
 *
 * Each card shows the star rating, the verbatim review body, the reviewer name,
 * and a source + relative-date line. Rating-only reviews render as a rating card.
 * We do NOT invent titles, companies, industries, or review text the source does
 * not provide.
 *
 * ZERO em dashes in any rendered string (CLAUDE.md §13).
 */

interface Props {
  items: Testimonial[];
  tone?: "dark" | "light";
}

export function TestimonialsClient({ items, tone = "dark" }: Props) {
  const isLight = tone === "light";
  const cardBg = isLight ? "#FFFFFF" : "var(--bg-card)";
  const cardBorder = isLight ? "var(--border-light)" : "var(--border-dark)";
  const primaryText = isLight ? "var(--text-on-light)" : "var(--text-primary)";
  const mutedText = isLight ? "var(--muted-on-light)" : "var(--text-secondary)";
  return (
    <div
      className="[column-fill:_balance] columns-1 md:columns-2 lg:columns-3 gap-6"
    >
      {items.map((t) => (
        <figure
          key={t.id}
          className="mb-6 break-inside-avoid rounded-2xl p-6 sm:p-7 border transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
          style={{
            background: cardBg,
            borderColor: cardBorder,
          }}
        >
          <StarRating rating={t.rating} size="0.95rem" />

          {t.body ? (
            <blockquote
              className="mt-4 font-body"
              style={{
                color: primaryText,
                fontSize: "0.95rem",
                lineHeight: 1.65,
              }}
            >
              {t.body}
            </blockquote>
          ) : (
            <p
              className="mt-4 font-body italic"
              style={{
                color: mutedText,
                fontSize: "0.95rem",
                lineHeight: 1.65,
              }}
            >
              Left a {t.rating}-star rating on {t.source ?? "Google"}.
            </p>
          )}

          <figcaption
            className="mt-5 pt-4 border-t"
            style={{ borderColor: cardBorder }}
          >
            <p
              className="font-body font-medium"
              style={{ color: primaryText, fontSize: "0.95rem" }}
            >
              {t.name}
            </p>
            <p
              className="mt-1 font-mono text-xs uppercase tracking-widest"
              style={{ color: mutedText, lineHeight: 1.5 }}
            >
              {t.source ?? "Verified"} review{t.date ? ` · ${t.date}` : ""}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default TestimonialsClient;
