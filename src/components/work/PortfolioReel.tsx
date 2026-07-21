"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { WorkItem } from "@/data/site";
import { PortfolioLightbox } from "./PortfolioLightbox";

/**
 * PortfolioReel - the featured install carousel ("the next thing always pops
 * up"). Edge-to-edge Embla strip: centered active frame with both neighbors
 * peeking, gentle autoplay that pauses on hover and stops for good on first
 * interaction, native drag/swipe. Page scroll is never captured (the
 * no-scroll-jack rule); autoplay is disabled under prefers-reduced-motion.
 * Slides are photo + metadata chips + name only; prose lives in the lightbox.
 */

const EASE_LUXE = "cubic-bezier(0.22, 1, 0.36, 1)";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm"
      style={{ background: "rgba(10, 8, 6, 0.55)", color: "var(--text-primary)" }}
    >
      {children}
    </span>
  );
}

export function PortfolioReel({ items }: { items: WorkItem[] }) {
  // Lazy init so autoplay never mounts for reduced-motion users.
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    reduced ? [] : [autoplay.current]
  );

  const [selected, setSelected] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {items.map((item, i) => (
            <div
              key={item.brand}
              className="min-w-0 flex-[0_0_88%] pl-3 sm:flex-[0_0_72%] sm:pl-4 lg:flex-[0_0_58%] lg:pl-6"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`View: ${item.brand}`}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border text-left aspect-[4/5] sm:aspect-[16/9] transition-opacity duration-500"
                style={{
                  borderColor: "var(--border-light)",
                  boxShadow: "0 24px 60px rgba(7, 7, 6, 0.18)",
                  opacity: i === selected ? 1 : 0.55,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 58vw"
                  priority={i === 0}
                  className="object-cover transition-transform duration-[1.1s] group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: EASE_LUXE }}
                />
                {/* Metadata chips: fully ON the photo, visible at all widths */}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <Chip>{item.category}</Chip>
                  <Chip>{item.room}</Chip>
                </div>
                {/* Name over a bottom scrim: one display line, not prose */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 p-5 pt-16 sm:p-6 sm:pt-20"
                  style={{ background: "linear-gradient(to top, rgba(10, 8, 6, 0.72), transparent)" }}
                >
                  <p className="font-display text-xl sm:text-2xl" style={{ color: "var(--text-primary)" }}>
                    {item.brand}
                  </p>
                </div>
                {/* Expand cue: always visible on touch, hover-reveal on desktop */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                  style={{
                    background: "rgba(10, 8, 6, 0.55)",
                    borderColor: "rgba(245, 245, 245, 0.3)",
                    color: "var(--text-primary)",
                  }}
                >
                  ⤢
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / next */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous install"
        className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-colors sm:flex hover:border-[var(--gold-deep)]"
        style={{ background: "rgba(250, 246, 238, 0.82)", borderColor: "var(--border-light)", color: "var(--text-on-light)" }}
      >
        ←
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next install"
        className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-colors sm:flex hover:border-[var(--gold-deep)]"
        style={{ background: "rgba(250, 246, 238, 0.82)", borderColor: "var(--border-light)", color: "var(--text-on-light)" }}
      >
        →
      </button>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Featured installs">
        {items.map((item, i) => (
          <button
            key={item.brand}
            type="button"
            role="tab"
            aria-selected={i === selected}
            aria-label={`Go to ${item.brand}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === selected ? "20px" : "8px",
              background: i === selected ? "var(--gold-deep)" : "color-mix(in oklab, var(--gold-deep) 30%, transparent)",
            }}
          />
        ))}
      </div>

      <PortfolioLightbox items={items} index={lightboxIndex} onClose={() => setLightboxIndex(-1)} />
    </div>
  );
}
