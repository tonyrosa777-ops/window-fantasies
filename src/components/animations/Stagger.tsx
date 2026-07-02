"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  threshold?: number;
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
 */
export function StaggerContainer({ children, staggerDelay = 0.1, threshold = 0.15, className }: ContainerProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
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
