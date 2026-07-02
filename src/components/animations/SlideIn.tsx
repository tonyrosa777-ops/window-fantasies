"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  className?: string;
}

export function SlideIn({ children, direction = "left", delay = 0, duration = 0.6, distance = 40, threshold = 0.15, className }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const x = direction === "left" ? -distance : distance;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
