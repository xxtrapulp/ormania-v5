"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { type Lang } from "@/lib/i18n";
import { Eyebrow } from "@/components/design-system/TextReveal";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { GlassCard } from "@/components/design-system/GlassCard";
import { Camera } from "lucide-react";

const TRANSFORMATIONS = [
  { en: "Broken chain → repaired", fr: "Chaîne cassée → réparée" },
  { en: "Ring resized → ready to wear", fr: "Bague redimensionnée → prête à porter" },
  { en: "Loose stone → secured", fr: "Pierre desserrée → fixée" },
  { en: "Watch battery → replaced", fr: "Pile de montre → remplacée" },
  { en: "Tarnished piece → polished", fr: "Pièce ternie → polie" },
  { en: "Clasp replaced → wearable again", fr: "Fermoir remplacé → à nouveau portable" },
] as const;

export function BeforeAfterSection({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-16 md:py-28 bg-ink">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <Eyebrow text={lang === "fr" ? "Avant / Après" : "Before / After"} className="mb-3" />
          <h2 className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] text-ivory mb-4">
            {lang === "fr"
              ? "Restauré, redimensionné, réparé, mémorisé."
              : "Restored, resized, repaired, remembered."
            }
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {TRANSFORMATIONS.map((item, i) => (
            <motion.div
              key={item.en}
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <GlassCard className="p-0 overflow-hidden group cursor-pointer">
                <BeforeAfterSlider lang={lang} label={item[lang]} />
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/40 text-gold text-[0.9rem] font-medium hover:bg-gold/10 transition-colors active:scale-[0.96]">
            <Camera size={16} strokeWidth={1.5} />
            {lang === "fr" ? "Envoyez-nous des photos de votre réparation" : "Send us photos of your repair"}
          </button>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSlider({ lang, label }: { lang: Lang; label: string }) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  };

  return (
    <div
      className="relative aspect-[4/3] cursor-ew-resize select-none"
      onMouseDown={(e) => {
        setDragging(true);
        handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
      }}
      onMouseMove={(e) => {
        if (dragging) handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
      }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchStart={(e) => {
        setDragging(true);
        handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
      }}
      onTouchMove={(e) => {
        if (dragging) handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
      }}
      onTouchEnd={() => setDragging(false)}
    >
      {/* After (full background) */}
      <div className="absolute inset-0 bg-ink-2 flex items-center justify-center">
        <span className="text-text-3 text-[0.75rem]">{lang === "fr" ? "Après" : "After"}</span>
      </div>
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 bg-ink-3 flex items-center justify-center overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <span className="text-text-3 text-[0.75rem]">{lang === "fr" ? "Avant" : "Before"}</span>
      </div>
      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-gold z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold text-ink flex items-center justify-center text-[0.7rem] font-bold shadow-lg">
          ↔
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-ink/80 to-transparent">
        <span className="text-ivory text-[0.85rem] font-serif">{label}</span>
      </div>
    </div>
  );
}
