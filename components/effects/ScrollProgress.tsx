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
 *   - On mount, we attach a single IntersectionObserver to all
 *     `<section>` elements in the document. Whichever section has
 *     the highest intersection ratio becomes the "active" one.
 *   - For that section, we run a `useScroll({ target, offset })`
 *     driven by motion. We then map `scrollYProgress` 0→1 onto
 *     the rail's `scaleY` (vertical) or `scaleX` (mobile).
 *   - The section ref is re-bound whenever the active section
 *     changes, which causes `useScroll` to re-target cleanly.
 *
 * The setState-in-effect call follows the project-wide pattern
 * (see GrainOverlay, MotionContext, Preloader, useCompare, etc.)
 * so the cascading-renders lint is suppressed locally.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const ACTIVE_THRESHOLD = 0.15;

function getSections(): HTMLElement[] {
  if (typeof document === "undefined") return [];
  return Array.from(document.querySelectorAll<HTMLElement>("main section"));
}

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const [activeSection, setActiveSection] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;

    const sections = getSections();
    if (sections.length === 0) return;

    // Pre-select: pick the section closest to the top of the viewport
    // on first paint, so the rail has a target immediately.
    const viewportH = window.innerHeight;
    let initial: HTMLElement | null = null;
    let bestTop = -Infinity;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= viewportH * 0.5 && r.bottom > 0) {
        if (r.top > bestTop) {
          bestTop = r.top;
          initial = s;
        }
      }
    }
    if (!initial) initial = sections[0];
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

  if (reduce) return null;

  return (
    <ScrollProgressInner
      key={isMobile ? "m" : "d"}
      activeSection={activeSection}
      isMobile={isMobile}
    />
  );
}

function ScrollProgressInner({
  activeSection,
  isMobile,
}: {
  activeSection: HTMLElement | null;
  isMobile: boolean;
}) {
  // useScroll's `target` prop is strictly a RefObject. Wrap the
  // activeSection into one — falling back to the container ref when
  // no section is active yet (e.g. during the initial mount).
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLElement | null>(null);
  activeRef.current = activeSection;
  const targetRef = (activeSection ? activeRef : containerRef) as React.RefObject<HTMLElement | null>;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
      ref={containerRef}
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
