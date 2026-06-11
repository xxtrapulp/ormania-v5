"use client";

import { useRef, useLayoutEffect, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type Lang } from "@/lib/i18n";
import { ScrollStoryShader } from "./ScrollStoryShader";

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
          start: mobile ? "top 5%" : "top top",
          // Full viewport-height per slide + a resting hold on the last slide,
          // so the section stays pinned until the final step has been seen.
          end: `+=${window.innerHeight * panels.length}`,
          pin: true,
          scrub: mobile ? 0.4 : 0.8,
          anticipatePin: 1,
          snap: {
            snapTo: "labels",
            duration: { min: 0.2, max: 0.5 },
            delay: 0.05,
            ease: "power2.inOut",
          },
        },
      });

      // Each slide rests at an integer timeline position (label),
      // with the crossfade transition centered between rests.
      tl.addLabel("step0", 0);

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const at = i - 0.5;

        // Fade out previous panel
        tl.to(panels[i - 1], { opacity: 0, y: mobile ? -16 : -40, duration: 0.3 }, at);
        // Fade in current panel
        tl.fromTo(
          panel,
          { opacity: 0, y: mobile ? 16 : 40 },
          { opacity: 1, y: 0, duration: 0.3 },
          at + 0.18
        );

        // Crossfade background images
        tl.to(images[i - 1], { opacity: 0, duration: 0.35 }, at);
        tl.fromTo(
          images[i],
          { opacity: 0, scale: 1.12 },
          { opacity: 1, scale: 1.05, duration: 0.35 },
          at + 0.12
        );

        // Highlight active dot
        if (dots[i - 1]) {
          tl.to(dots[i - 1], { backgroundColor: "rgba(201,168,106,0.15)", scale: 1, duration: 0.2 }, at);
        }
        if (dots[i]) {
          tl.to(dots[i], { backgroundColor: "rgba(201,168,106,0.85)", scale: 1.4, duration: 0.2 }, at + 0.18);
        }

        tl.addLabel(`step${i}`, i);
      });

      // Hold the last slide fully visible before the pin releases —
      // no final fade-out, the section simply scrolls away naturally.
      tl.to({}, { duration: 0.6 });

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
      {/* ── WebGL flowing filament background ── */}
      <div aria-hidden className="absolute inset-0 z-[1]">
        <ScrollStoryShader />
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
        {/* Dark overlay for text contrast — slightly lighter to let shader show through */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/65 to-ink/90" />
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
            <span className="eyebrow block mb-3 md:mb-6 text-gold/70 text-[0.65rem] md:text-[0.75rem]">
              0{i + 1} / 0{steps.length}
            </span>
            <h2 className="text-balance font-serif text-[clamp(1.85rem,8vw,3.5rem)] md:text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.1] text-ivory mb-3 md:mb-6">
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
