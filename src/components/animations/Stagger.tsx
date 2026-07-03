"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  threshold?: number;
  /**
   * When true, skip scroll gating entirely and stagger the children in on
   * mount. Use this for above-the-fold or full-page grids that should be
   * populated the moment the route loads (e.g. the /service-areas town grid).
   */
  immediate?: boolean;
  className?: string;
}

interface ItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * IMPORTANT: the container must have a real layout box. Do NOT pass
 * `display:contents` (Tailwind `contents`) or otherwise collapse this
 * element's box. The in-view IntersectionObserver attaches to this node;
 * a box with zero area never reports as in view, so `inView` stays false
 * and every StaggerItem child is stuck at opacity:0 (the section renders
 * blank). If you need the children to be direct grid/flex items, put the
 * grid/flex classes on THIS container, not on a wrapping parent.
 *
 * TALL-CONTAINER TRAP: `threshold` is a fraction of the CONTAINER's height,
 * not the viewport's. On a container several viewports tall (a 29-card grid
 * is ~3000px), even threshold 0.15 means ~450px must be visible before
 * anything animates, so the section reads as empty/broken on load. That is
 * why the default here is a tiny 0.05 — entry detection, not depth
 * detection. Never raise the default; pass a per-use `threshold` only for
 * short containers, or pass `immediate` to skip the observer entirely.
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  threshold = 0.05,
  immediate = false,
  className,
}: ContainerProps) {
  // Hooks must run unconditionally; `skip` disables the observer when immediate.
  const { ref, inView } = useInView({ triggerOnce: true, threshold, skip: immediate });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={immediate || inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: ItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
