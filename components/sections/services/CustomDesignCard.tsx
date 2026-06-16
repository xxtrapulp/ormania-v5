"use client";

/**
 * CustomDesignCard — the "line that becomes a ring" moment.
 *
 * A thin gold line draws itself over ~2s into the outline of a
 * solitaire ring. After it draws, the ring gets a slow gold-pulse
 * glow (~6s cycle). On card hover the line redraws slightly faster.
 *
 * Reduced motion: shows the finished ring instantly, no draw, no
 * pulse. The ring is the brand thesis — drawing it once per card
 * view is the most on-brand micro-animation in the whole site.
 *
 * The ring is inline SVG with a path the browser can animate via
 * `pathLength` (Framer Motion friendly). No real 3D, no WebGL.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const RING_PATH =
  "M 30 100 C 30 60, 70 30, 110 30 C 150 30, 190 60, 190 100 C 190 140, 150 170, 110 170 C 70 170, 30 140, 30 100 Z " +
  "M 95 22 L 110 8 L 125 22"; // band + small triangle for the solitaire stone

export function CustomDesignCard() {
  const reduce = useReducedMotion();
  const [drawn, setDrawn] = useState(reduce ? true : false);
  const [hoverCount, setHoverCount] = useState(0);
  const ref = useRef<SVGSVGElement>(null);

  // Trigger the draw-on when the card enters the viewport (mount + scroll-into-view).
  // We use a manual IntersectionObserver (not framer's whileInView) because
  // pathLength is tricky to drive via variants and we want precise control
  // over the "draw once on scroll-in" semantics.
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.2) {
            setDrawn(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: [0, 0.2, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <motion.svg
      ref={ref}
      role="img"
      aria-label="A gold solitaire ring being drawn from a single line"
      viewBox="0 0 220 200"
      width="220"
      height="200"
      className="overflow-visible"
      onHoverStart={() => !reduce && setHoverCount((n) => n + 1)}
      // Subtle scale on card hover, plus a very slow drift on the
      // whole composition (1.5s peak-to-peak) to make the ring feel
      // alive without being noisy.
      animate={
        reduce
          ? undefined
          : { rotate: [0, 0.6, 0, -0.6, 0] }
      }
      transition={
        reduce
          ? undefined
          : { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {/* Soft gold halo behind the ring (gradient lives in <defs> below) */}
      <defs>
        <radialGradient id="ring-glow-static" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="rgba(201, 168, 106, 0.55)" />
          <stop offset="100%" stopColor="rgba(201, 168, 106, 0)" />
        </radialGradient>
      </defs>

      {/* Soft gold halo behind the ring */}
      <motion.ellipse
        cx="110"
        cy="105"
        rx="95"
        ry="80"
        fill="url(#ring-glow-static)"
        initial={reduce ? { opacity: 0.85 } : { opacity: 0 }}
        animate={reduce ? { opacity: 0.85 } : { opacity: drawn ? 0.85 : 0 }}
        transition={reduce ? undefined : { duration: 1.2, ease: "easeOut" }}
      />

      {/* The line that becomes the ring — animates pathLength 0 → 1 */}
      <motion.path
        d={RING_PATH}
        fill="none"
        stroke="rgba(217, 188, 133, 1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        // Key on hoverCount so each hover re-runs the draw (faster on hover).
        key={`draw-${hoverCount}`}
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={reduce ? { pathLength: 1 } : { pathLength: drawn ? 1 : 0 }}
        transition={
          reduce
            ? undefined
            : {
                pathLength: {
                  duration: hoverCount > 0 ? 1.2 : 2,
                  ease: [0.22, 0.61, 0.36, 1],
                },
              }
        }
      />

      {/* Tiny stone highlight at the top, appears after the line completes */}
      {drawn && (
        <motion.circle
          cx="110"
          cy="9"
          r="3.5"
          fill="rgba(245, 230, 200, 0.95)"
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 2, ease: "easeOut" }}
        />
      )}
    </motion.svg>
  );
}
