import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  tone?: "base" | "elevated" | "card" | "cream";
  className?: string;
  id?: string;
  style?: CSSProperties;
  /**
   * Optional full-bleed photo backdrop (interior PAGE HEADERS — design-system §6 +
   * Homepage Section Architecture Rule "interior page headers are PHOTO HEADERS").
   * When set, the photo fills the band under a dark radial overlay that preserves the
   * dark-never-flat rule and holds ≥4.5:1 text contrast; children render above it.
   */
  bgImage?: string;
  bgImageAlt?: string;
}

/**
 * Section wrapper that opts into the auto-applied luxury gradients via globals.css
 * attribute selectors (design-system.md §3 — NO flat backgrounds; §4 — alternate
 * dark/light bands, footer-anchored). Tones: base/elevated/card = warm dark;
 * cream = warm light band (its default text color flips to --text-on-light so
 * un-styled text reads correctly; explicit inline colors on children still win).
 */
export function Section({ children, tone = "base", className, id, style, bgImage, bgImageAlt }: Props) {
  const bg =
    tone === "cream"
      ? "var(--bg-cream)"
      : tone === "card"
      ? "var(--bg-card)"
      : tone === "elevated"
      ? "var(--bg-elevated)"
      : "var(--bg-base)";
  const color = tone === "cream" ? "var(--text-on-light)" : "var(--text-primary)";

  if (bgImage) {
    // Photo header: full-bleed image (LCP) + dark radial overlay + content above.
    return (
      <section
        id={id}
        className={cn("relative overflow-hidden isolate py-20 md:py-28", className)}
        style={{ background: "var(--ink)", color: "var(--text-primary)", ...style }}
      >
        <img
          src={bgImage}
          alt={bgImageAlt ?? ""}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: [
              "radial-gradient(ellipse 95% 90% at 28% 55%, rgba(7,7,6,0.88) 0%, rgba(7,7,6,0.66) 46%, rgba(7,7,6,0.42) 100%)",
              "linear-gradient(to bottom, rgba(7,7,6,0.55) 0%, rgba(7,7,6,0.22) 42%, rgba(7,7,6,0.78) 100%)",
            ].join(", "),
          }}
        />
        <div className="relative" style={{ zIndex: 2 }}>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={cn("relative py-20 md:py-28", className)}
      style={{ background: bg, color, ...style }}
    >
      {children}
    </section>
  );
}
