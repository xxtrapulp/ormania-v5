"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollEffects() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Parallax on images ──
      const parallaxImages = ref.current?.querySelectorAll(".parallax-img");
      parallaxImages?.forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -10, scale: 1.1 },
          {
            yPercent: 10,
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

      // ── Clip-path reveal on images ──
      const revealImages = ref.current?.querySelectorAll(".reveal-img");
      revealImages?.forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)", scale: 1.15 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Staggered card reveals ──
      const cardGrids = ref.current?.querySelectorAll(".reveal-grid");
      cardGrids?.forEach((grid) => {
        const cards = grid.querySelectorAll(".reveal-card");
        if (cards.length === 0) return;
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
