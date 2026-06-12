"use client";

import { useRef } from "react";
import { useScroll, useTransform, useReducedMotion, useMotionValue, type MotionValue } from "framer-motion";

interface UseParallaxOptions {
  speed?: number; // <1 = slower (background), >1 = faster (foreground), 1 = normal
  outputRange?: [number, number];
}

export function useParallax(options: UseParallaxOptions = {}): {
  ref: React.RefObject<HTMLDivElement | null>;
  y: MotionValue<number>;
} {
  const { speed = 0.5, outputRange } = options;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // If reduced motion, return zero motion value
  const y = reduce
    ? useMotionValue(0)
    : useTransform(
        scrollYProgress,
        [0, 1],
        outputRange || [speed * -100, speed * 100]
      );

  return { ref, y };
}
