"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroStagger, heroItem } from "@/lib/motion";

/** Compact cinematic hero band for inner pages — abstract velvet & gold, no photography. */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="relative pt-32 pb-14 md:pt-44 md:pb-20 overflow-hidden">
      <div className="hero-velvet" aria-hidden />
      <div className="hero-aura-a" aria-hidden />
      <div className="hero-grain" aria-hidden />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink"
      />
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 text-center"
        variants={heroStagger}
        initial={reduce ? false : "hidden"}
        animate="visible"
      >
        <motion.span variants={heroItem} className="eyebrow block mb-4">
          {eyebrow}
        </motion.span>
        <motion.h1
          variants={heroItem}
          className="text-balance font-serif text-[clamp(2.1rem,7vw,3.6rem)] leading-[1.08] text-ivory max-w-3xl mx-auto"
        >
          {title}
        </motion.h1>
        {sub && (
          <motion.p
            variants={heroItem}
            className="mt-4 text-[clamp(0.92rem,2.7vw,1.05rem)] text-text-2 leading-relaxed max-w-xl mx-auto"
          >
            {sub}
          </motion.p>
        )}
        {children && (
          <motion.div variants={heroItem} className="mt-7 flex flex-col xs:flex-row justify-center gap-3 xs:gap-2.5">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
