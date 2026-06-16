"use client";

/**
 * RestorationCard — "the polish that brings it back" moment.
 *
 * A real jewelry photo from the boutique's Instagram (Cuban Link chain)
 * is shown on the left, with a soft gold "polish" gradient that wipes
 * across the image left-to-right over ~2.5s when the card scrolls
 * into view, revealing a brighter, slightly warmer version underneath.
 * A gold slider handle rides the gradient and stops at ~70% of the
 * way across, leaving the "polished" side visible to invite the user
 * to drag the handle themselves.
 *
 * On drag, the handle and the wipe position follow the pointer. On
 * release, the handle snaps back to 70%.
 *
 * Why a wipe, not a real before/after: the boutique doesn't have
 * public before/after pairs (repairs are private). The wipe is honest
 * — it's an effect, not a fake comparison. The text copy is where
 * the real story lives.
 *
 * Reduced motion: shows the post-polish state directly, no animation.
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GripVertical } from "lucide-react";

const RESTORATION_IMG = "/instagram/ig-DCsKHizO2ob.jpg"; // Cuban Link Chain
const RESTORATION_IMG_BLUR =
  "/instagram/ig-DCsKHizO2ob-480.webp"; // smaller as the blur

export function RestorationCard() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(reduce ? 0.7 : 0); // 0 = before, 1 = after
  const [dragging, setDragging] = useState(false);
  const [settled, setSettled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Animate the wipe on first scroll-in, then settle at 0.7.
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.25) {
            // Animate from 0 → 0.7, then mark settled so the user
            // can take over with drag.
            setProgress(0);
            requestAnimationFrame(() => {
              setProgress(0.7);
              setSettled(true);
            });
            io.disconnect();
            break;
          }
        }
      },
      { threshold: [0, 0.25, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  // Drag the handle to scrub the wipe.
  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      setProgress(x / rect.width);
    };
    const up = () => {
      setDragging(false);
      // Snap back to 0.7 so the "polished" side stays visible.
      setProgress(0.7);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [dragging]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-center justify-center px-4"
    >
      <div
        ref={trackRef}
        className="relative w-[260px] md:w-[280px] aspect-square rounded-xl overflow-hidden border border-(--line) select-none"
        role="img"
        aria-label="A jewelry piece with a before/after polish wipe. Drag the handle to compare."
      >
        {/* Base ("before") image */}
        <Image
          src={RESTORATION_IMG}
          alt="A Cuban link chain from Ormania's atelier"
          fill
          sizes="280px"
          className="object-cover"
          placeholder="blur"
          blurDataURL={RESTORATION_IMG_BLUR}
        />

        {/* Overlay ("after") — slightly brighter, warmer, with a subtle
            gold-tint gradient. Revealed from the left as progress grows. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
            background:
              "linear-gradient(135deg, rgba(201, 168, 106, 0.18) 0%, rgba(255, 240, 220, 0.08) 40%, rgba(255, 255, 255, 0.04) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
            // Faux "polish" — same image with a CSS filter that brightens
            // and slightly desaturates, simulating a freshly polished
            // piece. Real CSS filter, no fake "after" image needed.
            filter: "brightness(1.12) saturate(1.18) contrast(1.04)",
          }}
        >
          <Image
            src={RESTORATION_IMG}
            alt=""
            fill
            sizes="280px"
            className="object-cover"
            aria-hidden
          />
        </div>

        {/* Slider handle */}
        <motion.button
          type="button"
          aria-label="Drag to compare before and after"
          className="absolute top-0 bottom-0 z-10 flex items-center justify-center cursor-ew-resize focus-visible:outline-2 focus-visible:outline-gold"
          style={{ left: `calc(${progress * 100}% - 14px)`, width: 28 }}
          onPointerDown={(e) => {
            e.preventDefault();
            setDragging(true);
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          }}
          // Slight pulse on the handle while waiting for the user to
          // take over (before the auto-animation completes).
          animate={
            settled && !dragging && !reduce
              ? { scale: [1, 1.08, 1] }
              : { scale: 1 }
          }
          transition={
            settled && !dragging
              ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          aria-hidden={!settled && !reduce}
          tabIndex={settled ? 0 : -1}
        >
          <span className="block h-full w-[2px] bg-gold shadow-[0_0_8px_rgba(201,168,106,0.6)]" />
          <span className="absolute inset-y-0 flex items-center justify-center w-7">
            <GripVertical size={14} className="text-gold" strokeWidth={1.5} aria-hidden />
          </span>
        </motion.button>

        {/* "Before" / "After" labels — small, in opposite corners */}
        <span
          className="absolute bottom-2 left-2 text-[0.6rem] tracking-[0.18em] uppercase text-ivory/70 bg-ink/60 backdrop-blur-sm px-1.5 py-0.5 rounded-sm pointer-events-none"
          aria-hidden
        >
          Before
        </span>
        <span
          className="absolute bottom-2 right-2 text-[0.6rem] tracking-[0.18em] uppercase text-gold bg-ink/60 backdrop-blur-sm px-1.5 py-0.5 rounded-sm pointer-events-none"
          aria-hidden
        >
          After
        </span>
      </div>
    </div>
  );
}
