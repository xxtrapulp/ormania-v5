"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type Lang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  title: string;
  desc: string;
}

export function ScrollStory({ lang, steps }: { lang: Lang; steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current;
      if (!panels.length) return;

      // Set all panels except first to hidden
      gsap.set(panels.slice(1), { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (panels.length - 0.5)}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        // Fade out previous
        tl.to(panels[i - 1], { opacity: 0, y: -40, duration: 0.25 }, i - 0.75);
        // Fade in current
        tl.fromTo(panel, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25 }, i - 0.5);
      });

      // Final fade out at the end
      tl.to(panels[panels.length - 1], { opacity: 0, y: -40, duration: 0.2 });
    }, containerRef);

    return () => ctx.revert();
  }, [steps]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] bg-ink flex items-center justify-center overflow-hidden"
    >
      {/* Decorative rotating ring SVG */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 600 600" className="w-[80vmin] h-[80vmin] animate-[spin_60s_linear_infinite]">
          <circle cx="300" cy="300" r="200" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
          <circle cx="300" cy="300" r="160" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
          <circle cx="300" cy="300" r="240" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-gold" />
        </svg>
      </div>

      {/* Progress dots */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
        {steps.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gold/30 transition-colors duration-500"
            data-step={i}
          />
        ))}
      </div>

      {/* Step counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <span className="eyebrow text-gold/60">
          {lang === "fr" ? "L'Artisanat" : "The Craft"}
        </span>
      </div>

      {/* Panels */}
      <div className="relative z-[5] max-w-3xl mx-auto px-6 md:px-12 text-center">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) panelsRef.current[i] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <span className="eyebrow block mb-6 text-gold/70">
              0{i + 1} / 0{steps.length}
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.08] text-ivory mb-6">
              {step.title}
            </h2>
            <p className="text-[clamp(0.95rem,2.5vw,1.2rem)] text-text-2 leading-relaxed max-w-xl">
              {step.desc}
            </p>
            {/* Decorative line */}
            <div className="mt-10 w-16 h-px bg-gold/30" />
          </div>
        ))}
      </div>
    </section>
  );
}
