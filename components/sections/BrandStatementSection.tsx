"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type Lang } from "@/lib/i18n";
import { MaskedWords, Eyebrow } from "@/components/design-system/TextReveal";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { CursorUnderline } from "@/components/effects/CursorUnderline";

export function BrandStatementSection({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const stripY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "40%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-ink"
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
        <SectionReveal className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          {/* Main statement — oversized */}
          <div className="md:col-span-8">
            <SectionReveal.Support>
              <Eyebrow text="Bijouterie Ormania — Laval" className="mb-6" />
            </SectionReveal.Support>
            {/* h2 is plain (no SectionReveal.Title wrapper) so the
                MaskedWords child has its own animation system —
                nesting the two would have caused variant collisions
                that stranded word spans at opacity: 0 mid-transition. */}
            <h2 className="font-serif text-[clamp(2rem,6vw,4.5rem)] leading-[1.08] text-ivory text-balance block">
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
          <SectionReveal.Support className="md:col-span-4 md:pb-2">
            <div className="w-12 h-px bg-gold/40 mb-4" />
            <p className="text-[0.9rem] md:text-base text-text-2 leading-relaxed">
              {lang === "fr"
                ? "Une bijouterie à Laval pour les pièces fines, les cadeaux significatifs, le travail sur mesure, les réparations, les montres et les moments de fiançailles."
                : "A Laval jewelry boutique for fine pieces, meaningful gifts, custom work, repairs, watches, and engagement moments."
              }
            </p>
            <p className="mt-3 text-[0.85rem] text-text-3">
              <CursorUnderline.Span>
                {lang === "fr" ? "En savoir plus sur Ormania" : "Learn more about Ormania"}
              </CursorUnderline.Span>
            </p>
          </SectionReveal.Support>

          {/* Gold accent line */}
          <SectionReveal.Support className="col-span-full mt-16 md:mt-24">
            <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </SectionReveal.Support>
        </SectionReveal>
      </div>
    </section>
  );
}
