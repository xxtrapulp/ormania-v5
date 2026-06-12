"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { MaskedWords, Eyebrow } from "@/components/design-system/TextReveal";
import { useScrollReveal } from "@/components/effects/useScrollReveal";

export function BrandStatementSection({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const { ref, isInView } = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const stripY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "40%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden bg-ink"
    >
      {/* Horizontal scrolling text strip with parallax */}
      <motion.div
        className="absolute top-8 left-0 right-0 overflow-hidden opacity-[0.04]"
        style={{ y: stripY, willChange: "transform" }}
      >
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={reduce ? undefined : { x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {Array(6).fill("Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania · ").map((text, i) => (
            <span key={i} className="font-serif text-[4rem] md:text-[6rem] text-ivory">
              {text}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          {/* Main statement — oversized */}
          <div className="md:col-span-8">
            <Eyebrow text="Bijouterie Ormania — Laval" className="mb-6" />
            <h2 className="font-serif text-[clamp(2rem,6vw,4.5rem)] leading-[1.08] text-ivory text-balance">
              <MaskedWords
                text={lang === "fr"
                  ? "Ormania transforme les moments de la vie en pièces que vous gardez près de vous."
                  : "Ormania turns everyday moments into pieces you keep close."
                }
                delay={0.1}
              />
            </h2>
          </div>

          {/* Supporting copy */}
          <motion.div
            className="md:col-span-4 md:pb-2"
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="w-12 h-px bg-gold/40 mb-4" />
            <p className="text-[0.9rem] md:text-base text-text-2 leading-relaxed">
              {lang === "fr"
                ? "Une bijouterie à Laval pour les pièces fines, les cadeaux significatifs, le travail sur mesure, les réparations, les montres et les moments de fiançailles."
                : "A Laval jewelry boutique for fine pieces, meaningful gifts, custom work, repairs, watches, and engagement moments."
              }
            </p>
          </motion.div>
        </div>

        {/* Gold accent line */}
        <motion.div
          className="mt-16 md:mt-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          initial={reduce ? undefined : { scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
        />
      </div>
    </section>
  );
}
