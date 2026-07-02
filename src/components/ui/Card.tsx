import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated";
  hoverable?: boolean;
}

/**
 * Self-sufficient surface (Pattern #55) — renders solid bg instead of translucent
 * overlay, safe to drop into any parent tone. Per design-system.md §5.
 */
export function Card({ children, className, variant = "default", hoverable = true }: Props) {
  const bg = variant === "elevated" ? "var(--bg-elevated)" : "var(--bg-card)";
  return (
    <div
      className={cn(
        "rounded-2xl p-6 sm:p-8 border border-[var(--border-dark)] transition-all duration-300",
        hoverable && "hover:border-[var(--primary-muted)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]",
        className
      )}
      style={{ background: bg }}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn("font-mono text-xs uppercase tracking-widest", className)}
      style={{ color: "var(--text-secondary)" }}
    >
      {children}
    </p>
  );
}
