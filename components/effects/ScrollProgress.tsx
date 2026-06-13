"use client";

/**
 * ScrollProgress — per-section scroll progress rail.
 *
 * Desktop (≥ md):  2px gold vertical rail on the LEFT edge of the
 *                   viewport. Fills top → bottom with progress
 *                   through the *currently most-visible* <section>
 *                   on the page (NOT the whole page).
 *
 * Mobile (< md):   2px gold horizontal bar at the TOP of the
 *                   viewport. Same per-section progress semantics.
 *
 * Reduced motion:  Rendered as null (no rail at all).
 *
 * Mechanism:
 *   - One IntersectionObserver tracks which <main> section is
 *     currently the most visible (highest intersection ratio).
 *   - On scroll, we compute the active section's progress through
 *     the viewport manually: 0 = section top is at viewport top,
 *     1 = section bottom is at viewport bottom. This is wired to
 *     a `MotionValue` and applied to the rail's `scaleY` / `scaleX`.
 *   - We deliberately do NOT use `useScroll({ target })` because
 *     the target is a RefObject, and the active section is
 *     determined by `querySelector` at runtime (we can't ref-bind
 *     to a section we don't own). Computing the progress from
 *     getBoundingClientRect() on every frame is cheap and reliable.
 *
 * Honors `prefers-reduced-motion: reduce` — the entire component
 * returns null.
 */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";

const ACTIVE_THRESHOLD = 0.15;

function getSections(): HTMLElement[] {
  if (typeof document === "undefined") return [];
  return Array.from(document.querySelectorAll<HTMLElement>("main section"));
}

/**
 * Compute 0→1 progress of an element *through* the viewport, based
 * on the spec's `useScroll({ offset: ["start start", "end end"] })`:
 *  - 0 when the element's top hits the viewport top
 *  - 1 when the element's bottom hits the viewport bottom
 */
function computeSectionProgress(rect: DOMRect, vh: number): number {
  const span = rect.height + vh; // distance traveled from "top at top" to "bottom at bottom"
  if (span <= 0) return 0;
  const traveled = -rect.top + vh; // how far the section has scrolled past the viewport top
  // When the section's top is at the viewport top, rect.top === 0, so traveled = vh → 0
  // When the section's bottom is at the viewport bottom, rect.top === -(rect.height - vh) = vh - rect.height
  //   so traveled = -(vh - rect.height) + vh = rect.height → progress = 1
  const progress = (traveled - vh) / (rect.height - vh);
  if (!Number.isFinite(progress)) return 0;
  return Math.max(0, Math.min(1, progress));
}

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const [activeSection, setActiveSection] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const progress = useMotionValue(0);

  /* Mobile detection — run on mount, update on resize. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* IntersectionObserver: track the most-visible <main> section. */
  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;

    const sections = getSections();
    if (sections.length === 0) return;

    // Pre-select: pick the section closest to the top of the viewport
    // on first paint so we always have a target. This intentionally
    // mirrors the spec's `useScroll({ offset: ['start start'] })`
    // start condition: the section whose top is at the viewport top.
    const vh = window.innerHeight;
    let initial: HTMLElement | null = null;
    let bestTop = -Infinity;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= vh && r.bottom > 0) {
        if (r.top > bestTop) {
          bestTop = r.top;
          initial = s;
        }
      }
    }
    if (!initial) initial = sections[0];
    // Pre-selecting the active section on mount — same project-wide
    // pattern as GrainOverlay, MotionContext, Preloader, useCompare.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveSection(initial);

    const observer = new IntersectionObserver(
      (entries) => {
        let best: { el: HTMLElement; ratio: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.intersectionRatio >= ACTIVE_THRESHOLD) {
            if (!best || entry.intersectionRatio > best.ratio) {
              best = { el: entry.target as HTMLElement, ratio: entry.intersectionRatio };
            }
          }
        }
        if (best) setActiveSection(best.el);
      },
      {
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, [reduce]);

  /* Scroll listener: compute active section's progress through the
   * viewport and feed it into the MotionValue. */
  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (!activeSection) return;

    const update = () => {
      const rect = activeSection.getBoundingClientRect();
      const vh = window.innerHeight;
      progress.set(computeSectionProgress(rect, vh));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [activeSection, progress, reduce]);

  if (reduce) return null;

  if (isMobile) {
    return (
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(201,168,106,0.4) 0%, rgba(201,168,106,0.95) 50%, rgba(201,168,106,0.4) 100%)",
          scaleX: progress,
          willChange: "transform",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="fixed top-0 bottom-0 left-0 w-[2px] z-[200] pointer-events-none hidden md:block"
      style={{
        background: "rgba(201, 168, 106, 0.08)",
        willChange: "transform",
      }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 origin-top"
        style={{
          background:
            "linear-gradient(180deg, rgba(201,168,106,0.6) 0%, rgba(201,168,106,1) 50%, rgba(201,168,106,0.6) 100%)",
          scaleY: progress,
          willChange: "transform",
        }}
      />
    </div>
  );
}
