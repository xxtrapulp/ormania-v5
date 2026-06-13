/**
 * Central luxury motion system — subtle, fast, reduced-motion aware.
 * All section/card reveals share these variants for visual consistency.
 *
 * Two layers of API:
 *  1. **Named variants** (top-level exports) — used by most ad-hoc callers.
 *  2. **`variants` aggregate** — the canonical bucket every other
 *     component should import from (`import { variants } from "@/lib/motion"`).
 *     This is the single import surface for the Layer 1 / Wave 1 motion
 *     grammar (SectionReveal, TiltCard, CursorUnderline, ScrollProgress).
 */
import type { Variants, Transition } from "framer-motion";

export const luxeEase: Transition["ease"] = [0.22, 0.61, 0.36, 1];

/* ──────────────────────────────────────────────────────────────────
 * 1) Named variants (kept for backward compatibility)
 * ────────────────────────────────────────────────────────────────── */

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

/* ──────────────────────────────────────────────────────────────────
 * 2) `variants` aggregate — the single import surface for the
 *    motion-grammar layer (SectionReveal, TiltCard, CursorUnderline,
 *    ScrollProgress). Importing from this object keeps the language
 *    consistent and reduces the risk of duplicate / drifting variants.
 * ────────────────────────────────────────────────────────────────── */

/**
 * `sectionReveal` — parent for a section's stagger reveal.
 * Its direct children are expected to use one of the child variants
 * (`titleReveal`, `lineReveal`, `supportReveal`).
 */
export const sectionReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Title slides up 16px. 0.6s, luxeEase.
 * No `opacity: 0` in the hidden state — keeps elements visible by
 * default so they never strand at opacity 0 if the IntersectionObserver
 * hasn't fired yet (e.g. below-the-fold sections, hot-reload races).
 * The y-motion alone gives the reveal; the e2e selector
 * `[style*='opacity: 0']` returns zero matches.
 */
export const titleReveal: Variants = {
  hidden: { y: 16 },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: luxeEase },
  },
};

/**
 * Body line — clip-reveal (no opacity key, same reason as above).
 * The parent `sectionReveal` adds 0.05s stagger.
 */
export const lineReveal: Variants = {
  hidden: { y: 12, clipPath: "inset(0 0 100% 0)" },
  visible: {
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.55, ease: luxeEase },
  },
};

/**
 * Supporting element — scales 0.96 → 1. 0.5s, luxeEase.
 * No `opacity: 0` here either.
 */
export const supportReveal: Variants = {
  hidden: { scale: 0.96 },
  visible: {
    scale: 1,
    transition: { duration: 0.5, ease: luxeEase },
  },
};

/**
 * Card hover — used by `TiltCard` and friends. Consumers wrap with
 * `variants={cardHover}` and the parent's `whileHover="visible"`
 * propagates down.
 */
export const cardHover: Variants = {
  rest: {
    borderColor: "rgba(201, 168, 106, 0.18)",
    transition: { duration: 0.4, ease: luxeEase },
  },
  hover: {
    borderColor: "rgba(201, 168, 106, 0.45)",
    transition: { duration: 0.4, ease: luxeEase },
  },
};

/** Image scale inside a TiltCard on hover. */
export const cardImageHover: Variants = {
  rest: { scale: 1, transition: { duration: 0.6, ease: luxeEase } },
  hover: { scale: 1.04, transition: { duration: 0.6, ease: luxeEase } },
};

/** Info row slides up 6px on card hover. */
export const cardInfoHover: Variants = {
  rest: { y: 0, opacity: 0.85, transition: { duration: 0.4, ease: luxeEase } },
  hover: { y: -6, opacity: 1, transition: { duration: 0.4, ease: luxeEase } },
};

/** Button press feedback (subtle scale + quick ease). */
export const buttonPress: Variants = {
  rest: { scale: 1, transition: { duration: 0.2, ease: luxeEase } },
  hover: { scale: 1.02, transition: { duration: 0.25, ease: luxeEase } },
  tap: { scale: 0.97, transition: { duration: 0.12, ease: luxeEase } },
};

/** Backwards-compatible alias — `fadeUp` is the simplest reveal. */
export const fadeUpReveal = titleReveal;

/**
 * The single bucket other components should import from.
 */
export const variants = {
  sectionReveal,
  titleReveal,
  lineReveal,
  supportReveal,
  fadeUp,
  fadeUpReveal,
  cardHover,
  cardImageHover,
  cardInfoHover,
  buttonPress,
} as const;
