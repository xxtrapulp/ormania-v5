"use client";

import { useRef, useLayoutEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type Lang } from "@/lib/i18n";
import { ScrollStoryShader } from "./ScrollStoryShader";
gsap.registerPlugin(ScrollTrigger);

interface Step {
  title: string;
  desc: string;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function ScrollStory({ lang, steps }: { lang: Lang; steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const isMobile = useIsMobile();

  const setPanelRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) panelsRef.current[i] = el;
  }, []);

  const setDotRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) dotsRef.current[i] = el;
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current.filter(Boolean);
      const dots = dotsRef.current.filter(Boolean);
      if (!panels.length) return;

      // Set initial states for panels and their children
      gsap.set(panels.slice(1), { opacity: 0 });
      panels.forEach((panel) => {
        const counter = panel.querySelector(".step-counter");
        const title = panel.querySelector("h2");
        const desc = panel.querySelector("p");
        if (counter) gsap.set(counter, { opacity: 0, scale: 0.9 });
        if (title) gsap.set(title, { opacity: 0, y: 15 });
        if (desc) gsap.set(desc, { opacity: 0, y: 10 });
      });

      const stepHeight = isMobile ? window.innerHeight * 0.65 : window.innerHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${stepHeight * panels.length}`,
          pin: true,
          pinType: isMobile ? "transform" : "fixed",
          scrub: isMobile ? 0.3 : 0.5,
          anticipatePin: 1,
          snap: {
            snapTo: "labels",
            duration: { min: 0.2, max: 0.5 },
            delay: 0.05,
            ease: "power2.inOut",
          },
        },
      });

      tl.addLabel("step0", 0);

      // First panel entrance
      const firstCounter = panels[0].querySelector(".step-counter");
      const firstTitle = panels[0].querySelector("h2");
      const firstDesc = panels[0].querySelector("p");
      if (firstCounter) tl.to(firstCounter, { opacity: 1, scale: 1, duration: 0.3 }, 0);
      if (firstTitle) tl.to(firstTitle, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.1);
      if (firstDesc) tl.to(firstDesc, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.2);

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const at = i - 0.5;

        // Fade out previous panel
        tl.to(panels[i - 1], { opacity: 0, duration: 0.3 }, at);
        // Fade in new panel
        tl.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.3 }, at + 0.18);

        // Animate in new panel's children
        const counter = panel.querySelector(".step-counter");
        const title = panel.querySelector("h2");
        const desc = panel.querySelector("p");
        if (counter) tl.fromTo(counter, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3 }, at + 0.2);
        if (title) tl.fromTo(title, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, at + 0.28);
        if (desc) tl.fromTo(desc, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, at + 0.35);

        // Dots
        if (dots[i - 1]) tl.to(dots[i - 1], { backgroundColor: "rgba(201,168,106,0.15)", scale: 1, duration: 0.2 }, at);
        if (dots[i]) tl.to(dots[i], { backgroundColor: "rgba(201,168,106,0.85)", scale: 1.4, duration: 0.2 }, at + 0.18);

        tl.addLabel(`step${i}`, i);
      });

      tl.to({}, { duration: 0.6 });
    }, containerRef);

    return () => ctx.revert();
  }, [steps, isMobile]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* ── WebGL flowing filament background ── */}
      <div aria-hidden className="absolute inset-0 z-[1]">
        <ScrollStoryShader />
      </div>

      {/* ── Progress dots (left on desktop, bottom center on mobile) ── */}
      <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-8 md:bottom-auto md:left-4 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 flex flex-row md:flex-col gap-2.5 md:gap-3">
        {steps.map((_, i) => (
          <div
            key={i}
            ref={(el) => setDotRef(el, i)}
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: i === 0 ? "rgba(201,168,106,0.85)" : "rgba(201,168,106,0.15)",
              transform: i === 0 ? "scale(1.4)" : "scale(1)",
            }}
            data-step={i}
          />
        ))}
      </div>

      {/* ── Step counter eyebrow ── */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
        <span className="eyebrow text-gold/60">
          {lang === "fr" ? "L'Artisanat" : "The Craft"}
        </span>
      </div>

      {/* ── Text panels — grid-stacked so the container keeps real height
           and text wraps naturally across the available width ── */}
      <div className="relative z-[5] w-full max-w-4xl mx-auto px-5 md:px-12 grid place-items-center text-center">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => setPanelRef(el, i)}
            className="col-start-1 row-start-1 w-full flex flex-col items-center justify-center"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <span className="step-counter eyebrow block mb-3 md:mb-6 text-gold/70 text-[0.65rem] md:text-[0.75rem]">
              0{i + 1} / 0{steps.length}
            </span>
            <h2 className="text-balance font-serif text-[clamp(1.85rem,8vw,3.5rem)] md:text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.15] text-ivory mb-3 md:mb-6">
              {step.title}
            </h2>
            <p className="w-full max-w-[34ch] xs:max-w-[44ch] md:max-w-2xl text-[0.95rem] md:text-[clamp(0.95rem,1.4vw,1.15rem)] text-text-2 leading-relaxed">
              {step.desc}
            </p>
            {/* Decorative line */}
            <div className="mt-5 md:mt-10 w-12 md:w-16 h-px bg-gold/30" />
          </div>
        ))}
      </div>
    </section>
  );
}
