"use client";

import { useRef, useCallback, useState, type CSSProperties } from "react";

/**
 * useMagnetic — subtle cursor-following shift for primary CTAs.
 *
 * Track A3 spec (Layer 1):
 *   - Travel capped to 8px per axis (use `maxTravel` to override).
 *   - Returns to origin on `mouseleave` with a 0.4s ease-luxe snap.
 *   - Disabled on touch devices (`(hover: none)`) AND when
 *     `prefers-reduced-motion: reduce` is set.
 *
 * Implementation: writes the translate to `el.style.transform` on
 * `mousemove` and clears it (with a brief transition) on `mouseleave`.
 * On touch + reduced-motion, returns a no-op `style` so consumers can
 * spread it without affecting their Tailwind classes.
 */
export interface UseMagneticOptions {
  /** Per-axis travel cap, in CSS pixels. Default 8 (per A3 brief). */
  maxTravel?: number;
  /** How much of the cursor offset to follow. Default 0.2. */
  strength?: number;
  /**
   * Whether to attach listeners at all. Lets a parent gate on its own
   * condition (e.g. inside a feature flag). Defaults to true.
   */
  enabled?: boolean;
}

export function useMagnetic(
  optionsOrStrength: UseMagneticOptions | number = {}
) {
  // Backwards-compat: the v1 API was `useMagnetic(strength)`. Normalize.
  const options: UseMagneticOptions =
    typeof optionsOrStrength === "number"
      ? { strength: optionsOrStrength }
      : optionsOrStrength;
  const { maxTravel = 8, strength = 0.2, enabled = true } = options;
  const ref = useRef<HTMLElement>(null);
  // Detect hover-capable + motion-allowed once at mount via lazy
  // initializer (avoids the setState-in-effect lint rule). SSR returns
  // `false` so the magnetic effect is opt-in only on the client. Media
  // queries don't change at runtime in practice for desktop/tablet
  // users; if a consumer needs to react to a change in `enabled`, the
  // consumer should remount the component.
  const active = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (!enabled) return false;
    const hoverNone = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !hoverNone && !reduce;
  })[0];

  const applyTransform = useCallback(
    (dx: number, dy: number) => {
      const el = ref.current;
      if (!el) return;
      // Clamp to ±maxTravel on each axis.
      const cx = Math.max(-maxTravel, Math.min(maxTravel, dx * strength));
      const cy = Math.max(-maxTravel, Math.min(maxTravel, dy * strength));
      el.style.transform = `translate(${cx}px, ${cy}px)`;
    },
    [maxTravel, strength]
  );

  const clearTransform = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!active) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      applyTransform(e.clientX - cx, e.clientY - cy);
    },
    [active, applyTransform]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // Snap back through a brief transition; clear it after the snap so it
    // doesn't interfere with the next hover.
    el.style.transition = "transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)";
    clearTransform();
    const node = el;
    const t = window.setTimeout(() => {
      if (node.isConnected) node.style.transition = "";
    }, 400);
    return () => window.clearTimeout(t);
  }, [clearTransform]);

  // Spreadable event listeners (preferred path for new code).
  const magneticProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  // `style` is intentionally `undefined` when not active, so the
  // consumer can spread it without overriding their own classes.
  const style: CSSProperties | undefined = active
    ? ({ willChange: "transform" } as CSSProperties)
    : undefined;

  return { ref, magneticProps, active, style, handleMouseMove, handleMouseLeave };
}
