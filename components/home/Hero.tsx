"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { heroStagger, heroItem, luxeEase } from "@/lib/motion";
import { ResponsiveLabel } from "@/components/ui/Button";
import { IgIcon } from "@/components/ui/icons";
import { GoldDust } from "@/components/effects/GoldDust";
import { Ring3D } from "@/components/effects/Ring3D";
import { HeroTextReveal } from "@/components/effects/HeroTextReveal";
import { useMousePosition } from "@/hooks/useMousePosition";

/** Concentric rotating gold rings — abstract nod to ring-making, desktop ornament. */
function RingOrnamentSVG() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
      className="w-full h-full overflow-visible"
    >
      <g className="hero-ring">
        <circle cx="200" cy="200" r="178" stroke="rgba(201,168,106,0.28)" strokeWidth="1" strokeDasharray="2 7" />
      </g>
      <g className="hero-ring-reverse">
        <circle cx="200" cy="200" r="142" stroke="rgba(201,168,106,0.4)" strokeWidth="0.75" />
        <circle cx="200" cy="58" r="4" fill="#C9A86A" />
      </g>
      <g className="hero-ring">
        <circle cx="200" cy="200" r="104" stroke="rgba(217,188,133,0.5)" strokeWidth="1.25" strokeDasharray="60 14 24 14" />
      </g>
      <circle cx="200" cy="200" r="64" stroke="rgba(201,168,106,0.18)" strokeWidth="18" />
      <circle cx="200" cy="200" r="64" stroke="rgba(242,195,59,0.55)" strokeWidth="1" />
      <g opacity="0.9">
        <path d="M200 118 l5 14 14 5 -14 5 -5 14 -5 -14 -14 -5 14 -5z" fill="#F2C33B" opacity="0.85" />
      </g>
    </svg>
  );
}

function ResponsiveRing({ mouse }: { mouse: { x: number; y: number } }) {
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setShow3D(mql.matches);
    const handler = (e: MediaQueryListEvent) => setShow3D(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  if (!show3D) return <RingOrnamentSVG />;
  return <Ring3D mouse={mouse} className="w-full h-full" />;
}

export function Hero({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mouse = useMousePosition();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile || reduce ? "0%" : "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const btnBase =
    "btn-sheen inline-flex items-center justify-center gap-2 rounded-full font-medium " +
    "whitespace-nowrap max-w-full h-(--btn-h) text-(length:--btn-fs) px-(--btn-px) " +
    "transition-all duration-300 ease-(--ease-luxe) active:scale-[0.97] " +
    "[-webkit-tap-highlight-color:transparent] group";

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className="relative min-h-[100svh] flex items-end md:items-center overflow-hidden"
    >
      {/* Gold dust particle field */}
      <GoldDust />
      {/* Bottom fade into the page */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink"
      />

      {/* Watermark */}
      <div
        aria-hidden
        className="absolute -bottom-6 left-0 right-0 text-center font-serif text-[22vw] md:text-[16vw] leading-none text-ivory/[0.025] select-none pointer-events-none tracking-[0.08em]"
      >
        ORMANIA
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full mx-auto max-w-7xl px-5 md:px-8 pb-24 pt-32 md:py-28"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="max-w-2xl md:max-w-3xl mx-auto text-center"
          variants={heroStagger}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          {/* Logo fades in first — the hero centerpiece */}
          <motion.div variants={heroItem} className="mb-8">
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Image
                src="/brand/ormania.svg"
                alt="Bijouterie Ormania"
                width={652}
                height={150}
                priority
                className="h-16 xs:h-20 md:h-28 lg:h-32 w-auto max-w-full drop-shadow-[0_4px_28px_rgba(201,168,106,0.25)]"
              />
            </motion.div>
          </motion.div>

          <motion.span variants={heroItem} className="eyebrow block mb-4">
            {t(lang, "hero.eyebrow")}
          </motion.span>

          <motion.div
            aria-hidden
            className="w-16 h-px mx-auto mb-4 bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: luxeEase }}
          />

          <motion.h1
            variants={heroItem}
            className="text-balance font-serif text-[clamp(2.5rem,9.5vw,5.25rem)] leading-[1.12] text-ivory"
          >
            <HeroTextReveal
              parts={[
                { text: t(lang, "hero.headline.1") },
                { text: t(lang, "hero.headline.2"), className: "text-gold-3 italic gold-glow" },
              ]}
              baseDelay={0.6}
            />
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-5 text-[clamp(0.95rem,2.9vw,1.15rem)] text-text-2 leading-relaxed max-w-lg mx-auto"
          >
            {t(lang, "hero.sub")}
          </motion.p>

          {/* CTAs — stacked under 390px, side-by-side from xs */}
          <motion.div variants={heroItem} className="mt-8 flex flex-col xs:flex-row justify-center gap-3 xs:gap-2.5 max-w-md xs:max-w-none mx-auto">
            <Link
              href={`/${lang}/collections`}
              onClick={() => track("hero_explore_click")}
              className={`${btnBase} bg-gold text-ink border border-gold hover:bg-gold-3 hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(201,168,106,0.35)]`}
            >
              <ResponsiveLabel
                short={t(lang, "hero.exploreShort")}
                full={t(lang, "hero.explore")}
                breakpoint="sm"
              />
              <span aria-hidden className="inline-block transition-transform duration-300 ease-(--ease-luxe) group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={`/${lang}/engagement#book`}
              onClick={() => track("hero_book_click")}
              className={`${btnBase} bg-transparent text-ivory border border-gold/60 hover:bg-gold/10 hover:border-gold`}
            >
              <ResponsiveLabel
                short={t(lang, "hero.bookShort")}
                full={t(lang, "hero.book")}
                breakpoint="sm"
              />
            </Link>
          </motion.div>

          <motion.div variants={heroItem} className="mt-7 flex justify-center">
            <Link
              href={`/${lang}/instagram`}
              onClick={() => track("hero_ig_click")}
              className="inline-flex items-center gap-2 min-h-11 text-[0.875rem] text-text-2 hover:text-gold transition-colors duration-300"
            >
              <IgIcon className="w-[18px] h-[18px]" />
              {t(lang, "hero.igLink")}
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Rotating gold-ring ornament — desktop only */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 1.4, ease: luxeEase }}
        className="hidden lg:block absolute right-[4%] xl:right-[8%] top-1/2 -translate-y-1/2 z-[5] w-[26rem] xl:w-[30rem] aspect-square pointer-events-none"
      >
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.12)_0%,transparent_70%)]" />
        <ResponsiveRing mouse={{ x: mouse.normalizedX, y: mouse.normalizedY }} />
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#featured"
        aria-label={t(lang, "hero.scroll")}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-text-3 hover:text-gold transition-colors scroll-cue-svg"
      >
        {t(lang, "hero.scroll")}
        <svg width="2" height="36" viewBox="0 0 2 36" fill="none" aria-hidden>
          <line x1="1" y1="0" x2="1" y2="36" stroke="url(#goldGradient)" strokeWidth="2" />
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a86a" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </motion.a>
    </section>
  );
}
