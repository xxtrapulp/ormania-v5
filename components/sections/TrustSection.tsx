"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type Lang } from "@/lib/i18n";
import { Eyebrow } from "@/components/design-system/TextReveal";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { GlassCard } from "@/components/design-system/GlassCard";
import { MapPin, Shield, Star, MessageCircle } from "lucide-react";

const TRUST_POINTS = [
  { icon: MapPin, en: "Local Laval boutique", fr: "Boutique locale de Laval" },
  { icon: Shield, en: "Personalized service", fr: "Service personnalisé" },
  { icon: Star, en: "Repairs and custom work", fr: "Réparations et travail sur mesure" },
  { icon: MessageCircle, en: "Instagram inquiries welcome", fr: "Demandes Instagram bienvenues" },
] as const;

const REVIEWS = [
  {
    en: "Ormania resized my grandmother's ring and it fits perfectly. The care they took was incredible.",
    fr: "Ormania a redimensionné la bague de ma grand-mère et elle fits parfaitement. Le soin apporté était incroyable.",
    author: "Sarah M.",
    stars: 5,
  },
  {
    en: "Found my engagement ring here after searching for months. The team made it feel special.",
    fr: "J'ai trouvé ma bague de fiançailles ici après des mois de recherche. L'équipe a rendu le moment spécial.",
    author: "Alex T.",
    stars: 5,
  },
] as const;

export function TrustSection({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-16 md:py-28 bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <Eyebrow text={lang === "fr" ? "Confiance" : "Trust"} className="mb-3" />
          <h2 className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] text-ivory">
            {lang === "fr" ? "De confiance à Laval." : "Trusted in Laval."}
          </h2>
        </div>

        {/* Trust badges */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14">
          {TRUST_POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.en}
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
                className="flex items-center gap-3 p-4 rounded-xl border border-(--line) bg-ink"
              >
                <Icon size={18} strokeWidth={1.5} className="text-gold shrink-0" />
                <span className="text-[0.85rem] text-ivory">{point[lang]}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.author}
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <GlassCard className="p-5 md:p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <Star key={s} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-[0.9rem] text-ivory leading-relaxed mb-4 italic">
                  "{review[lang]}"
                </p>
                <span className="text-[0.8rem] text-text-3 font-medium">{review.author}</span>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Family boutique story */}
        <motion.div
          className="mt-10 md:mt-14 rounded-2xl border border-(--line) bg-ink p-6 md:p-10 text-center"
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="text-[0.95rem] md:text-base text-text-2 leading-relaxed max-w-2xl mx-auto">
            {lang === "fr"
              ? "Bijouterie Ormania est une boutique familiale au cœur de Laval. Depuis des années, nous aidons nos clients à marquer les moments importants de leur vie avec des bijoux qui racontent une histoire."
              : "Bijouterie Ormania is a family-owned boutique in the heart of Laval. For years, we've helped our customers mark life's important moments with jewelry that tells a story."
            }
          </p>
        </motion.div>
      </div>
    </section>
  );
}
