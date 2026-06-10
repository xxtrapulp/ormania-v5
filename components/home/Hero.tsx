"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { heroStagger, heroItem, luxeEase } from "@/lib/motion";
import { ResponsiveLabel } from "@/components/ui/Button";
import { IgIcon } from "@/components/ui/icons";

/** Concentric rotating gold rings — abstract nod to ring-making, desktop ornament. */
function RingOrnament() {
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
      {/* facet sparkle */}
      <g opacity="0.9">
        <path d="M200 118 l5 14 14 5 -14 5 -5 14 -5 -14 -14 -5 14 -5z" fill="#F2C33B" opacity="0.85" />
      </g>
    </svg>
  );
}

export function Hero({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "40%"]);
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
      {/* Abstract velvet-and-gold stage with slow parallax — no photography */}
      <motion.div className="absolute inset-0" style={{ y: bgY }} aria-hidden>
        <div className="hero-velvet" />
        <div className="hero-aura-a" />
        <div className="hero-aura-b" />
      </motion.div>
      <div className="hero-lightleak" aria-hidden />
      <div className="hero-grain" aria-hidden />
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
        className="relative z-10 w-full mx-auto max-w-7xl px-5 md:px-8 pb-24 pt-32 md:py-40"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="max-w-2xl"
          variants={heroStagger}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          {/* Logo fades in first — the hero centerpiece */}
          <motion.div variants={heroItem} className="mb-8">
            <Image
              src="/brand/ormania.svg"
              alt="Bijouterie Ormania"
              width={652}
              height={150}
              priority
              className="h-16 xs:h-20 md:h-28 lg:h-32 w-auto max-w-full drop-shadow-[0_4px_28px_rgba(201,168,106,0.25)]"
            />
          </motion.div>

          <motion.span variants={heroItem} className="eyebrow block mb-4">
            {t(lang, "hero.eyebrow")}
          </motion.span>

          <motion.h1
            variants={heroItem}
            className="text-balance font-serif text-[clamp(2.5rem,9.5vw,5.25rem)] leading-[1.06] text-ivory"
          >
            {t(lang, "hero.headline.1")}{" "}
            <em className="text-gold-3 italic">{t(lang, "hero.headline.2")}</em>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-5 text-[clamp(0.95rem,2.9vw,1.15rem)] text-text-2 leading-relaxed max-w-lg"
          >
            {t(lang, "hero.sub")}
          </motion.p>

          {/* CTAs — stacked under 390px, side-by-side from xs */}
          <motion.div variants={heroItem} className="mt-8 flex flex-col xs:flex-row gap-3 xs:gap-2.5 max-w-md xs:max-w-none">
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

          <motion.div variants={heroItem} className="mt-7">
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
        <RingOrnament />
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#featured"
        aria-label={t(lang, "hero.scroll")}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-text-3 hover:text-gold transition-colors"
      >
        {t(lang, "hero.scroll")}
        <span className="scroll-cue-line block w-px h-9 bg-gradient-to-b from-gold to-transparent" />
      </motion.a>
    </section>
  );
}
