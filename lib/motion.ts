/**
 * Central luxury motion system — subtle, fast, reduced-motion aware.
 * All section/card reveals share these variants for visual consistency.
 */
import type { Variants, Transition } from "framer-motion";

export const luxeEase: Transition["ease"] = [0.22, 0.61, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: luxeEase },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: luxeEase } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: luxeEase },
  },
};

export const drawLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: luxeEase },
  },
};

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalPanel: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: luxeEase },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 10,
    transition: { duration: 0.2, ease: luxeEase },
  },
};

export const stepSlide = (dir: 1 | -1): Variants => ({
  hidden: { opacity: 0, x: 24 * dir },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: luxeEase } },
  exit: { opacity: 0, x: -24 * dir, transition: { duration: 0.25, ease: luxeEase } },
});

export const viewport = { once: true, margin: "-80px" } as const;
