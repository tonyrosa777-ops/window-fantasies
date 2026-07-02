import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  tone?: "base" | "elevated" | "card" | "cream";
  className?: string;
  id?: string;
  style?: CSSProperties;
}

/**
 * Section wrapper that opts into the auto-applied luxury gradients via globals.css
 * attribute selectors (design-system.md §3 — NO flat backgrounds; §4 — alternate
 * dark/light bands, footer-anchored). Tones: base/elevated/card = warm dark;
 * cream = warm light band (its default text color flips to --text-on-light so
 * un-styled text reads correctly; explicit inline colors on children still win).
 */
export function Section({ children, tone = "base", className, id, style }: Props) {
  const bg =
    tone === "cream"
      ? "var(--bg-cream)"
      : tone === "card"
      ? "var(--bg-card)"
      : tone === "elevated"
      ? "var(--bg-elevated)"
      : "var(--bg-base)";
  const color = tone === "cream" ? "var(--text-on-light)" : "var(--text-primary)";
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
