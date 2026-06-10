"use client";

import { useRef, useLayoutEffect, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type Lang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  title: string;
  desc: string;
}

const BG_IMAGES = [
  "/instagram/ig-DRP2awpjmhB.jpg",
  "/instagram/ig-DSAifEiDouU.jpg",
  "/instagram/ig-DCsRV7yuwrx.jpg",
  "/instagram/ig-DEN0REXJO1E.jpg",
];

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
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const isMobile = useIsMobile();

  const setPanelRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) panelsRef.current[i] = el;
  }, []);

  const setImageRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) imagesRef.current[i] = el;
  }, []);

  const setDotRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) dotsRef.current[i] = el;
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current.filter(Boolean);
      const images = imagesRef.current.filter(Boolean);
      const dots = dotsRef.current.filter(Boolean);
      if (!panels.length) return;

      const mobile = window.innerWidth < 768;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Set initial states
      gsap.set(panels.slice(1), { opacity: 0, y: mobile ? 24 : 40 });
      gsap.set(images.slice(1), { opacity: 0, scale: 1.12 });
      gsap.set(images[0], { opacity: 1, scale: 1.05 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (panels.length - (mobile ? 1 : 0.5))}`,
          pin: true,
          scrub: mobile ? true : 0.8,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prevI = i - 1;

        // Fade out previous panel
        tl.to(panels[prevI], { opacity: 0, y: mobile ? -16 : -40, duration: 0.25 }, prevI + 0.25);
        // Fade in current panel
        tl.fromTo(panel, { opacity: 0, y: mobile ? 16 : 40 }, { opacity: 1, y: 0, duration: 0.25 }, prevI + 0.5);

        // Crossfade background images
        tl.to(images[prevI], { opacity: 0, duration: 0.3 }, prevI + 0.25);
        tl.fromTo(images[i], { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1.05, duration: 0.3 }, prevI + 0.35);

        // Highlight active dot
        if (dots[prevI]) {
          tl.to(dots[prevI], { backgroundColor: "rgba(201,168,106,0.15)", scale: 1, duration: 0.2 }, prevI + 0.25);
        }
        if (dots[i]) {
          tl.to(dots[i], { backgroundColor: "rgba(201,168,106,0.85)", scale: 1.4, duration: 0.2 }, prevI + 0.35);
        }
      });

      // Final fade out
      const last = panels.length - 1;
      tl.to(panels[last], { opacity: 0, y: mobile ? -16 : -40, duration: 0.2 });
      tl.to(images[last], { opacity: 0, duration: 0.2 }, "<");
      if (dots[last]) {
        tl.to(dots[last], { backgroundColor: "rgba(201,168,106,0.15)", scale: 1, duration: 0.2 }, "<");
      }

      if (!prefersReduced) {
        // Slow continuous scale on the active image
        images.forEach((img) => {
          gsap.to(img, {
            scale: 1.0,
            duration: 8,
            ease: "none",
            repeat: -1,
            yoyo: true,
            paused: true,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [steps, isMobile]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] bg-ink flex items-center justify-center overflow-hidden"
    >
      {/* ── Animated radial mesh background ── */}
      <div aria-hidden className="scrollstory-mesh absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="mesh-a absolute -inset-[50%] rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(201,168,106,0.08),transparent_60%)] blur-3xl" />
        <div className="mesh-b absolute -inset-[50%] rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(201,168,106,0.06),transparent_55%)] blur-2xl" />
      </div>

      {/* ── Crossfading background images ── */}
      <div aria-hidden className="absolute inset-0 z-[2]">
        {BG_IMAGES.map((src, i) => (
          <div
            key={src}
            ref={(el) => setImageRef(el, i)}
            className="absolute inset-0 will-change-[opacity,transform]"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/75 to-ink/95" />
      </div>

      {/* ── Decorative rotating ring SVG ── */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none z-[3]">
        <svg viewBox="0 0 600 600" className="w-[70vmin] h-[70vmin] md:w-[80vmin] md:h-[80vmin] animate-[spin_60s_linear_infinite]">
          <circle cx="300" cy="300" r="200" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
          <circle cx="300" cy="300" r="160" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
          <circle cx="300" cy="300" r="240" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-gold" />
        </svg>
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

      {/* ── Text panels ── */}
      <div className="relative z-[5] max-w-[85vw] md:max-w-3xl mx-auto px-4 md:px-12 text-center">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => setPanelRef(el, i)}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <span className="eyebrow block mb-4 md:mb-6 text-gold/70 text-[0.65rem] md:text-[0.75rem]">
              0{i + 1} / 0{steps.length}
            </span>
            <h2 className="font-serif text-[clamp(1.75rem,10vw,3.5rem)] md:text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] text-ivory mb-4 md:mb-6">
              {step.title}
            </h2>
            <p className="text-sm md:text-[clamp(0.95rem,1.4vw,1.2rem)] text-text-2 leading-relaxed max-w-[85vw] md:max-w-xl">
              {step.desc}
            </p>
            {/* Decorative line */}
            <div className="mt-6 md:mt-10 w-12 md:w-16 h-px bg-gold/30" />
          </div>
        ))}
      </div>
    </section>
  );
}
