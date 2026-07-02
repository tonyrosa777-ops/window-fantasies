"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  duration?: number;
  from?: number;
  threshold?: number;
  className?: string;
}

export function ScaleIn({ children, delay = 0, duration = 0.5, from = 0.94, threshold = 0.15, className }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: from }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: from }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
