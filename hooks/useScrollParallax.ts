"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollParallax(
  selector: string,
  yPercent = 12,
  scale = 1.08
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(selector);
      elements?.forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -yPercent, scale },
          {
            yPercent,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, yPercent, scale]);

  return containerRef;
}
