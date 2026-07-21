"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { RowsPhotoAlbum, type RenderImageContext, type RenderImageProps } from "react-photo-album";
import "react-photo-album/rows.css";
import { AnimatePresence, motion } from "framer-motion";
import type { WorkItem } from "@/data/site";
import { PortfolioLightbox } from "./PortfolioLightbox";

/**
 * PortfolioWall - the filterable install wall on the dark band. True-aspect
 * justified rows (react-photo-album), so mixed-aspect photos never crop and
 * there is never an orphan row at any filter selection. Tiles are photo-first:
 * category chip at all widths, item name on a desktop hover scrim only
 * (photo-first-on-mobile rule), always-visible expand cue on touch, all prose
 * in the lightbox.
 */

type WallPhoto = WorkItem & { src: string; width: number; height: number };

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

function renderTile(
  _: RenderImageProps,
  { photo, width, height }: RenderImageContext<WallPhoto>
) {
  return (
    <div
      className="group relative h-full w-full overflow-hidden rounded-xl border"
      style={{
        aspectRatio: `${width} / ${height}`,
        borderColor: "var(--border-dark)",
        background: "var(--bg-card)",
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
      />
      {/* Category chip: fully ON the photo, visible at all widths */}
      <span
        className="absolute left-3 top-3 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm"
        style={{ background: "rgba(10, 8, 6, 0.55)", color: "var(--text-primary)" }}
      >
        {photo.category}
      </span>
      {/* Name + room: desktop hover only. Mobile stays photo-first; the full
          caption lives in the lightbox (and in alt for crawlers). */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 lg:block"
        style={{ background: "linear-gradient(to top, rgba(10, 8, 6, 0.78), transparent)" }}
      >
        <p className="font-display text-base" style={{ color: "var(--text-primary)" }}>
          {photo.brand}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(245, 245, 245, 0.7)" }}>
          {photo.room}
        </p>
      </div>
      {/* Expand cue: always visible on touch, hover-reveal on desktop */}
      <span
        aria-hidden="true"
        className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
        style={{
          background: "rgba(10, 8, 6, 0.55)",
          borderColor: "rgba(245, 245, 245, 0.3)",
          color: "var(--text-primary)",
        }}
      >
        ⤢
      </span>
    </div>
  );
}

export function PortfolioWall({ items }: { items: WorkItem[] }) {
  const categories = useMemo(() => {
    const seen = new Map<string, number>();
    for (const item of items) seen.set(item.category, (seen.get(item.category) ?? 0) + 1);
    return Array.from(seen.entries());
  }, [items]);

  const [active, setActive] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const shown = useMemo(
    () => (active === "all" ? items : items.filter((item) => item.category === active)),
    [active, items]
  );

  const photos: WallPhoto[] = useMemo(
    () => shown.map((item) => ({ ...item, src: item.image, width: item.w, height: item.h })),
    [shown]
  );

  return (
    <div>
      {/* Filter pills with live counts, scrollable on mobile */}
      <div
        className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0"
        style={{ scrollbarWidth: "none" }}
        role="tablist"
        aria-label="Filter installs by category"
      >
        <FilterPill label={`All (${items.length})`} active={active === "all"} onClick={() => setActive("all")} />
        {categories.map(([category, count]) => (
          <FilterPill
            key={category}
            label={`${category} (${count})`}
            active={active === category}
            onClick={() => setActive(category)}
          />
        ))}
      </div>

      {/* initial={false}: the wall is visible from SSR; motion only runs on
          filter CHANGE, never as a hide-on-mount (SSR-visibility rule). */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_LUXE }}
        >
          {photos.length > 0 ? (
            <RowsPhotoAlbum
              photos={photos}
              targetRowHeight={300}
              spacing={10}
              render={{ image: renderTile }}
              onClick={({ index }) => setLightboxIndex(index)}
            />
          ) : (
            <p className="py-16 text-center font-body text-sm" style={{ color: "var(--text-secondary)" }}>
              No installs in that category yet.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <PortfolioLightbox items={shown} index={lightboxIndex} onClose={() => setLightboxIndex(-1)} />
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="shrink-0 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors"
      style={
        active
          ? {
              borderColor: "var(--primary)",
              background: "color-mix(in oklab, var(--primary) 14%, transparent)",
              color: "var(--text-primary)",
            }
          : {
              borderColor: "var(--border-dark)",
              color: "var(--text-secondary)",
            }
      }
    >
      {label}
    </button>
  );
}
