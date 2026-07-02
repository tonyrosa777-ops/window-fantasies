/**
 * StarRating — renders N filled stars in brand gold for a 1-5 rating.
 *
 * Uses the ★ / ☆ text glyphs (no SVG icon library, per CLAUDE.md icon rule).
 * Filled stars use var(--primary); empty stars use a muted border tone.
 * aria-label exposes the rating to assistive tech.
 */

interface Props {
  rating: number;
  size?: string; // CSS font-size for the glyphs
  className?: string;
}

export function StarRating({ rating, size = "1rem", className }: Props) {
  const full = Math.round(rating);
  return (
    <span
      className={className}
      role="img"
      aria-label={`${rating} out of 5 stars`}
      style={{ display: "inline-flex", gap: "0.1em", lineHeight: 1, letterSpacing: "0.05em" }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            color: i < full ? "var(--primary)" : "var(--border-dark)",
            fontSize: size,
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default StarRating;
