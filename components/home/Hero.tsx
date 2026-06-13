"use client";

import { useRef, useState, useEffect, useId, useMemo } from "react";
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

/* === Hero image selection (Layer 1 / B2 — single signature image) === */
const HERO_IMAGE = "/instagram/ig-DEN0REXJO1E.jpg";
const HERO_IMAGE_ALT = "Ormania — fine jewelry selection";

/* === 4-beat intro timing (ms) === */
const BEAT = {
  logoStart: 0,
  logoDur: 800,        // 1a — venetian blind
  wordmarkStart: 900,  // 1b — wordmark stagger
  wordmarkDur: 900,
  imageStart: 1700,    // 1c — image cross-fade
  imageDur: 1200,
  copyStart: 2400,     // 1d — subcopy + CTAs
  copyDur: 900,
  totalMs: 3300,       // rough total before settled
};

/* Session flag TTL (30 min) — skip intro if hero played recently. */
const HERO_SESSION_TTL_MS = 30 * 60 * 1000;
const HERO_SESSION_KEY = "ormania.heroPlayed";

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

/**
 * Logo + "venetian blind" gold shutter.
 *
 * If the intro plays, the shutter wipes top-to-bottom over 0.8s, revealing
 * the brand wordmark behind it. If the intro is skipped (session flag),
 * the logo is shown immediately with no shutter.
 */
function LogoShutter({
  playIntro,
  introStart,
}: {
  playIntro: boolean;
  introStart: number;
}) {
  const reduce = useReducedMotion();
  // We have 10 horizontal slats. Their indices drive a staggered top→bottom reveal.
  const SLATS = 10;

  if (reduce) {
    return (
      <div className="mb-6 md:mb-8">
        <Image
          src="/brand/ormania.svg"
          alt="Bijouterie Ormania"
          width={652}
          height={150}
          priority
          className="h-16 xs:h-20 md:h-24 lg:h-28 w-auto max-w-full drop-shadow-[0_4px_28px_rgba(201,168,106,0.25)]"
        />
      </div>
    );
  }

  if (!playIntro) {
    return (
      <motion.div
        className="mb-6 md:mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: luxeEase, delay: 0.05 }}
      >
        <Image
          src="/brand/ormania.svg"
          alt="Bijouterie Ormania"
          width={652}
          height={150}
          priority
          className="h-16 xs:h-20 md:h-24 lg:h-28 w-auto max-w-full drop-shadow-[0_4px_28px_rgba(201,168,106,0.25)]"
        />
      </motion.div>
    );
  }

  return (
    <div className="mb-6 md:mb-8 relative">
      {/* Slats that wipe IN (revealing the logo below) */}
      <div className="relative">
        {Array.from({ length: SLATS }).map((_, i) => {
          // Each slat covers 1/SLATS of the height. We translate it from -100% (above)
          // to 0% (settled) so it slides into place and uncovers the logo strip.
          const slatDelay = (introStart + (i * 0.55) * 10) / 1000; // 0.55s span across slats
          return (
            <motion.div
              key={`shutter-${i}`}
              aria-hidden
              className="absolute inset-x-0 h-[10%] z-10"
              style={{
                top: `${(i / SLATS) * 100}%`,
                background:
                  "linear-gradient(180deg, rgba(201,168,106,0.18) 0%, rgba(201,168,106,0.05) 100%)",
                borderTop: "1px solid rgba(201,168,106,0.45)",
                borderBottom: "1px solid rgba(201,168,106,0.18)",
                boxShadow: "inset 0 0 18px rgba(201,168,106,0.18)",
              }}
              initial={{ y: "-100%", opacity: 0.9 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: slatDelay,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            />
          );
        })}
        {/* The logo behind the slats. Always rendered so the slats reveal it in place. */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <Image
            src="/brand/ormania.svg"
            alt="Bijouterie Ormania"
            width={652}
            height={150}
            priority
            className="h-16 xs:h-20 md:h-24 lg:h-28 w-auto max-w-full drop-shadow-[0_4px_28px_rgba(201,168,106,0.25)]"
          />
        </motion.div>
      </div>
    </div>
  );
}

export function Hero({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mouse = useMousePosition();
  const [isMobile, setIsMobile] = useState(false);

  // Session id is per-tab — useId gives us a stable, unique tag for the
  // sessionStorage key so different tabs in the same browser don't share
  // the "intro already played" flag.
  const reactId = useId();
  const sessionId = useMemo(
    () => reactId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12) || "main",
    [reactId],
  );
  const sessionKey = `${HERO_SESSION_KEY}.${sessionId}`;

  // Determine whether to play the intro on first paint.
  // playIntro === true  → run the 4-beat sequence
  // playIntro === false → show settled state immediately
  const [playIntro, setPlayIntro] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect --
       We read prefers-reduced-motion + sessionStorage once at mount and
       set a single bit; the value is constant for the component lifetime.
       This pattern is used throughout the codebase (MotionContext, Preloader,
       ScrollProgress, etc.) — the React 19 plugin flags it project-wide. */
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setPlayIntro(false);
      return;
    }
    try {
      const last = sessionStorage.getItem(sessionKey);
      if (last) {
        const t = Number(last);
        if (Number.isFinite(t) && Date.now() - t < HERO_SESSION_TTL_MS) {
          setPlayIntro(false);
          return;
        }
      }
    } catch {
      /* sessionStorage unavailable */
    }
    setPlayIntro(true);
    try {
      sessionStorage.setItem(sessionKey, String(Date.now()));
    } catch {
      /* ignore */
    }
  }, [sessionKey]);

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

  // === Headline wordmark stagger ===
  // Refine the existing char-by-char reveal: 0.04s stagger, 0.4s duration each.
  // HeroTextReveal already supports baseDelay; we drive that from playIntro.
  const wordmarkBaseDelay = playIntro ? BEAT.wordmarkStart / 1000 : 0;
  const wordmarkCharMs = 40; // 0.04s

  // === Settled-state head motion variants ===
  // When we skip the intro, the rest of the hero (subcopy, CTAs) still
  // wants a tiny entrance — just opacity + y, no choreography.
  const settledItem = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: luxeEase },
  };

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Gold dust particle field */}
      <GoldDust />

      {/* === Beat 3: hero image (single signature IG photo). === */}
      {/*
        The image is layered behind the content. When the intro plays, it
        cross-fades in starting at BEAT.imageStart. After settled, a slow
        Ken Burns (scale 1.0 → 1.04 over 30s, alternate) keeps it alive
        without distraction.
      */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.0 }}
          animate={
            playIntro
              ? {
                  opacity: [0, 1],
                  scale: [1.0, 1.04],
                }
              : { opacity: 1, scale: 1.0 }
          }
          transition={
            playIntro
              ? {
                  opacity: {
                    duration: BEAT.imageDur / 1000,
                    delay: BEAT.imageStart / 1000,
                    ease: [0.22, 0.61, 0.36, 1],
                  },
                  scale: {
                    // Ken Burns — start 30s after intro settles
                    duration: 30,
                    delay: (BEAT.imageStart + BEAT.imageDur + 200) / 1000,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                }
              : { duration: 0 }
          }
          style={{
            // Subtle dark wash so foreground text remains readable.
            backgroundColor: "#0a0908",
            willChange: "transform, opacity",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={HERO_IMAGE}
              alt={HERO_IMAGE_ALT}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Velvet-gold shader overlay: dark wash + subtle radial glow */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/85"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 65%, rgba(201,168,106,0.18) 0%, rgba(10,9,8,0) 65%)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade into the page */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink z-[5]"
      />

      {/* Watermark */}
      <div
        aria-hidden
        className="absolute -bottom-6 left-0 right-0 text-center font-serif text-[22vw] md:text-[16vw] leading-none text-ivory/[0.025] select-none pointer-events-none tracking-[0.08em] z-[2]"
      >
        ORMANIA
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full mx-auto max-w-7xl px-5 md:px-8 flex flex-col items-center justify-center min-h-[100svh] py-20 md:py-0"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* === Beat 1: Logo + venetian blind shutter === */}
        <LogoShutter playIntro={playIntro} introStart={BEAT.logoStart} />

        {/* Desktop: split layout. Mobile: stacked centered. */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 lg:gap-8">
          {/* Left: text column */}
          <motion.div
            className="w-full md:w-[55%] lg:w-[52%] text-center md:text-left"
            // When playIntro, we drive every piece by its own BEAT timing,
            // not the parent stagger. Set initial="visible" so the variants
            // tree doesn't double-animate.
            variants={playIntro ? undefined : heroStagger}
            initial={playIntro ? false : "visible"}
            animate={playIntro ? false : "visible"}
          >
            <motion.span
              variants={playIntro ? undefined : heroItem}
              initial={playIntro ? { opacity: 0, y: 12 } : false}
              animate={playIntro ? { opacity: 1, y: 0 } : false}
              transition={
                playIntro
                  ? {
                      duration: 0.7,
                      delay: BEAT.logoStart / 1000 + 0.1,
                      ease: luxeEase,
                    }
                  : undefined
              }
              className="eyebrow block mb-3"
            >
              {t(lang, "hero.eyebrow")}
            </motion.span>

            <motion.div
              aria-hidden
              variants={playIntro ? undefined : heroItem}
              initial={playIntro ? { scaleX: 0, opacity: 0 } : false}
              animate={playIntro ? { scaleX: 1, opacity: 1 } : false}
              transition={
                playIntro
                  ? {
                      duration: 0.7,
                      delay: BEAT.logoStart / 1000 + 0.18,
                      ease: luxeEase,
                    }
                  : undefined
              }
              className="w-16 h-px mx-auto md:mx-0 mb-3 bg-gradient-to-r from-transparent via-gold to-transparent md:from-gold md:to-gold/30 origin-left"
            />

            {/* === Beat 2: wordmark stagger === */}
            <motion.h1
              variants={playIntro ? undefined : heroItem}
              initial={playIntro ? false : { opacity: 0, y: 28 }}
              animate={playIntro ? false : { opacity: 1, y: 0 }}
              transition={playIntro ? undefined : { duration: 0.9, ease: luxeEase }}
              className="text-balance font-serif text-[clamp(2.2rem,8vw,4.5rem)] lg:text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.12] text-ivory"
            >
              <HeroTextReveal
                parts={[
                  { text: t(lang, "hero.headline.1") },
                  { text: t(lang, "hero.headline.2"), className: "text-gold-3 italic gold-glow" },
                ]}
                baseDelay={wordmarkBaseDelay}
                charDelayMs={wordmarkCharMs}
                charDurationMs={400}
                instant={!playIntro}
              />
            </motion.h1>

            {/* === Beat 4: subcopy + CTAs fade up === */}
            <motion.p
              initial={playIntro ? { opacity: 0, y: 18 } : settledItem.initial}
              animate={
                playIntro
                  ? { opacity: 1, y: 0 }
                  : settledItem.animate
              }
              transition={
                playIntro
                  ? {
                      duration: BEAT.copyDur / 1000,
                      delay: BEAT.copyStart / 1000,
                      ease: luxeEase,
                    }
                  : { ...settledItem.transition, delay: 0.1 }
              }
              className="mt-5 text-[clamp(0.9rem,2.5vw,1.1rem)] text-text-2 leading-relaxed max-w-lg mx-auto md:mx-0"
            >
              {t(lang, "hero.sub")}
            </motion.p>

            <motion.div
              initial={playIntro ? { opacity: 0, y: 18 } : { opacity: 0, y: 18 }}
              animate={playIntro ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={
                playIntro
                  ? {
                      duration: BEAT.copyDur / 1000,
                      delay: (BEAT.copyStart + 100) / 1000,
                      ease: luxeEase,
                    }
                  : { duration: 0.7, delay: 0.15, ease: luxeEase }
              }
              className="mt-7 flex flex-col xs:flex-row justify-center md:justify-start gap-3 xs:gap-2.5 max-w-md xs:max-w-none mx-auto md:mx-0"
            >
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

            <motion.div
              initial={playIntro ? { opacity: 0 } : { opacity: 0 }}
              animate={playIntro ? { opacity: 1 } : { opacity: 1 }}
              transition={
                playIntro
                  ? {
                      duration: BEAT.copyDur / 1000,
                      delay: (BEAT.copyStart + 250) / 1000,
                    }
                  : { duration: 0.6, delay: 0.25 }
              }
              className="mt-6 flex justify-center md:justify-start"
            >
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

          {/* Right: rotating gold ring ornament — desktop only */}
          <motion.div
            aria-hidden
            className="hidden md:block md:w-[45%] lg:w-[48%] max-w-[22rem] lg:max-w-[26rem] xl:max-w-[28rem] aspect-square relative pointer-events-none"
            initial={playIntro ? { opacity: 0, scale: 0.92 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              playIntro
                ? { delay: 1.1, duration: 1.4, ease: luxeEase }
                : { duration: 0.9, ease: luxeEase, delay: 0.2 }
            }
            style={{
              y: useTransform(scrollYProgress, [0, 1], ["0%", isMobile || reduce ? "0%" : "60%"]),
              willChange: "transform",
            }}
          >
            <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.12)_0%,transparent_70%)]" />
            <ResponsiveRing mouse={{ x: mouse.normalizedX, y: mouse.normalizedY }} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#featured"
        aria-label={t(lang, "hero.scroll")}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={playIntro ? { delay: 1.8, duration: 0.8 } : { delay: 0.4, duration: 0.6 }}
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
