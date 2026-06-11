"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Split text into words and animate each with blur-in on scroll.
 *  On mobile: skips expensive filter:blur, uses lighter opacity+y. */
export function BlurWords({
  text,
  className = "",
  as: Tag = "h2",
  stagger = 0.08,
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll(".blur-word");
    if (!words.length) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.from(words, {
        opacity: 0,
        y: isMobile ? 12 : 20,
        ...(isMobile ? {} : { filter: "blur(8px)" }),
        duration: isMobile ? 0.5 : 0.7,
        stagger: isMobile ? stagger * 0.6 : stagger,
        delay,
        ease: isMobile ? "power2.out" : "power3.out",
        scrollTrigger: {
          trigger: el,
          start: isMobile ? "top 90%" : "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [text, stagger, delay]);

  const words = text.split(" ");
  const Comp = Tag as any;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Comp ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className={`inline-block mr-[0.25em] ${isMobile ? "" : "overflow-hidden"}`}>
          <span className={`blur-word inline-block ${isMobile ? "" : "will-change-[filter,transform,opacity]"}`}>
            {word}
          </span>
        </span>
      ))}
    </Comp>
  );
}

/** Animate lines (children) with fade-up stagger on scroll. */
export function FadeLines({
  children,
  className = "",
  stagger = 0.12,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = el.querySelectorAll(".fade-line");
    if (!lines.length) return;

    const ctx = gsap.context(() => {
      gsap.from(lines, {
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Eyebrow with character-by-character type-on effect and gold pulse. */
export function TypeEyebrow({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll(".type-char");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      // Gold pulse after typing completes
      gsap.to(el, {
        color: "#c9a86a",
        duration: 0.5,
        delay: chars.length * 0.03 + 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <span ref={ref} className={`eyebrow inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <span key={i} className="type-char inline-block will-change-[opacity,transform]">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
