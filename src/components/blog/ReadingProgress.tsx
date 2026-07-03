"use client";

import { motion, useScroll, useReducedMotion } from "framer-motion";

/**
 * ReadingProgress — thin gold bar fixed to the top edge of the viewport,
 * filling left-to-right with window scroll progress. Article pages only.
 *
 * - Transform-only: framer-motion useScroll drives scaleX (no width/layout
 *   animation), origin-left so the fill grows from the left edge.
 * - z-40: sits one layer under the fixed nav (z-50), so the nav chrome
 *   always wins where they overlap.
 * - aria-hidden + hidden entirely under prefers-reduced-motion (the bar is
 *   pure decoration; the scrollbar already communicates position).
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-40 h-[3px] origin-left"
      style={{ scaleX: scrollYProgress, background: "var(--gold-gradient)" }}
    />
  );
}
