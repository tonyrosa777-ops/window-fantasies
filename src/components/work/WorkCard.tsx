import Image from "next/image";
import type { WorkItem } from "@/data/site";

/**
 * WorkCard - single portfolio tile for the /portfolio masonry grid.
 *
 * Renders inside a CSS multi-column layout (columns-1 md:columns-2), so the
 * outer wrapper carries `break-inside-avoid mb-6` to keep each card intact
 * across column breaks. Image dims come from the item's intrinsic w/h so the
 * responsive aspect ratio is preserved (w-full h-auto). Below-the-fold, so
 * the image lazy loads.
 *
 * BINDING (CLAUDE.md §13): ZERO em dashes in any string literal.
 */

interface Props {
  item: WorkItem;
  tone?: "dark" | "light";
}

export function WorkCard({ item, tone = "dark" }: Props) {
  const isLight = tone === "light";
  return (
    <div className="break-inside-avoid mb-6">
      <div
        className="rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1"
        style={{
          background: isLight ? "#FFFFFF" : "var(--bg-card)",
          borderColor: isLight ? "var(--border-light)" : "var(--border-dark)",
          boxShadow: isLight
            ? "0 18px 48px rgba(7, 7, 6,0.14)"
            : "0 18px 48px rgba(0,0,0,0.45)",
        }}
      >
        <Image
          src={item.image}
          alt={item.alt}
          width={item.w}
          height={item.h}
          sizes="(min-width: 768px) 45vw, 100vw"
          loading="lazy"
          className="w-full h-auto"
        />
        <div className="p-6 sm:p-7">
          <p
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: isLight ? "var(--gold-deep)" : "var(--primary)" }}
          >
            {item.category}
          </p>
          <h3
            className="font-display text-h3 mt-2"
            style={{ color: isLight ? "var(--text-on-light)" : "var(--text-primary)" }}
          >
            {item.brand}
          </h3>
          <p
            className="font-body text-sm mt-3"
            style={{ color: isLight ? "var(--muted-on-light)" : "var(--text-secondary)", lineHeight: 1.6 }}
          >
            {item.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}
