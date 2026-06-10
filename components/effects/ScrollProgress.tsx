"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const scroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scroll / docHeight : 0;
      el.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed top-0 left-0 right-0 h-px z-[200] origin-left"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(201,168,106,0.85) 20%, rgba(201,168,106,0.6) 80%, transparent 100%)",
        willChange: "transform",
      }}
    />
  );
}
