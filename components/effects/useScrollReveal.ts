"use client";

import { useRef, useState, useEffect, type RefObject } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}): {
  ref: RefObject<HTMLDivElement | null>;
  isInView: boolean;
} {
  const { threshold = 0.05, rootMargin = "120px", once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: if element is already in viewport on mount, fire immediately
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight + 120 && rect.bottom > -120;
    if (inViewport) {
      setIsInView(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
