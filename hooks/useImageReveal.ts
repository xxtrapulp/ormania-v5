"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useImageReveal(
  selector: string,
  direction: "up" | "down" | "left" | "right" = "up",
  duration = 1.2
) {
  const containerRef = useRef<HTMLDivElement>(null);

  const clipFrom = {
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  };

  const clipTo = "inset(0% 0 0 0)";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(selector);
      elements?.forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: clipFrom[direction], scale: 1.15 },
          {
            clipPath: clipTo,
            scale: 1,
            duration,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, direction, duration]);

  return containerRef;
}
