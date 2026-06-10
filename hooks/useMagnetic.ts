"use client";

import { useRef, useCallback } from "react";

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)";
    el.style.transform = "translate(0, 0)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 400);
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
