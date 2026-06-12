"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type Lang } from "@/lib/i18n";
import { Eyebrow } from "@/components/design-system/TextReveal";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { useModal } from "@/components/modals/ModalSystem";
import { GlassCard } from "@/components/design-system/GlassCard";
import { MapPin, Shield, Star, MessageCircle, ArrowRight } from "lucide-react";

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
  const { openModal } = useModal();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const storyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "15%"]);

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-ink-2 relative overflow-hidden">
      {/* Parallax background glow */}
      <motion.div
        aria-hidden
        className="absolute -bottom-[30%] -left-[15%] w-[70%] h-[70%] rounded-full bg-gold/[0.02] blur-[140px] pointer-events-none"
        style={{ y: glowY, willChange: "transform" }}
      />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-8 md:mb-10">
          <Eyebrow text={lang === "fr" ? "Confiance" : "Trust"} className="mb-3" />
          <h2 className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] text-ivory">
            {lang === "fr" ? "De confiance à Laval." : "Trusted in Laval."}
          </h2>
        </div>

        {/* Trust badges */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          {TRUST_POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.en}
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "80px" }}
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
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "80px" }}
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
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "80px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          style={{ y: storyY, willChange: "transform" }}
        >
          <p className="text-[0.95rem] md:text-base text-text-2 leading-relaxed max-w-2xl mx-auto mb-6">
            {lang === "fr"
              ? "Bijouterie Ormania est une boutique familiale au cœur de Laval. Depuis des années, nous aidons nos clients à marquer les moments importants de leur vie avec des bijoux qui racontent une histoire."
              : "Bijouterie Ormania is a family-owned boutique in the heart of Laval. For years, we've helped our customers mark life's important moments with jewelry that tells a story."
            }
          </p>
          <button
            onClick={() => openModal("contact")}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-ink font-medium text-[0.9rem] btn-sheen active:scale-[0.96] transition-transform"
          >
            {lang === "fr" ? "Contactez-nous" : "Contact Us"}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
