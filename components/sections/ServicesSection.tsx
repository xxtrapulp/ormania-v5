"use client";

import { motion, useReducedMotion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { Eyebrow } from "@/components/design-system/TextReveal";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { Gem, Wrench, Heart, Gift } from "lucide-react";

const SERVICES = [
  {
    icon: Gem,
    title: { en: "Custom Design", fr: "Design sur mesure" },
    desc: { en: "From idea to finished piece.", fr: "De l'idée à la pièce finie." },
    long: {
      en: "Bring us a sketch, a photo, or just a feeling. We guide you through materials, stones, and design until it feels exactly right.",
      fr: "Apportez-nous un croquis, une photo ou simplement une impression. Nous vous guidons à travers les matériaux, les pierres et le design jusqu'à ce que tout soit parfait.",
    },
  },
  {
    icon: Wrench,
    title: { en: "Jewelry Restoration", fr: "Restauration de bijoux" },
    desc: { en: "Repairs, resizing, polishing, and stone work.", fr: "Réparations, mise à grandeur, polissage et travail de pierres." },
    long: {
      en: "Sizing, stones, clasps, polish, watch batteries — most repairs are done in-house in Laval with care and precision.",
      fr: "Mise à grandeur, pierres, fermoirs, polissage, piles de montre — la plupart des réparations sont faites sur place à Laval avec soin et précision.",
    },
  },
  {
    icon: Heart,
    title: { en: "Engagement Guidance", fr: "Conseil pour fiançailles" },
    desc: { en: "Personal help choosing or creating the ring.", fr: "Aide personnalisée pour choisir ou créer la bague." },
    long: {
      en: "Natural and lab-grown diamonds, private consultations, and a ring made for one story — yours.",
      fr: "Diamants naturels et de laboratoire, consultations privées et une bague faite pour une seule histoire — la vôtre.",
    },
  },
  {
    icon: Gift,
    title: { en: "Gift Curation", fr: "Curation de cadeaux" },
    desc: { en: "Help finding something meaningful.", fr: "Aide pour trouver quelque chose de significatif." },
    long: {
      en: "Not sure what to choose? Tell us about the person and the occasion. We'll suggest pieces that feel personal and lasting.",
      fr: "Vous ne savez pas quoi choisir ? Parlez-nous de la personne et de l'occasion. Nous vous suggérerons des pièces qui semblent personnelles et durables.",
    },
  },
] as const;

export function ServicesSection({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-16 md:py-28 bg-ink">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Eyebrow
          text={lang === "fr" ? "Services phares" : "Signature Services"}
          className="mb-3"
        />
        <h2 className="font-serif text-[clamp(1.75rem,5vw,3rem)] text-ivory mb-12 md:mb-16">
          {lang === "fr" ? "Notre savoir-faire, à votre service." : "Our craft, at your service."}
        </h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title.en}
                className="group relative overflow-hidden rounded-2xl border border-(--line) bg-[rgba(255,255,255,0.02)] p-6 md:p-8 transition-all duration-500 hover:border-(--line-2) hover:bg-[rgba(255,255,255,0.04)]"
                initial={reduce ? undefined : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-[1.15rem] md:text-[1.35rem] text-ivory mb-1">
                      {service.title[lang]}
                    </h3>
                    <p className="text-gold text-[0.85rem] md:text-[0.95rem] mb-3">
                      {service.desc[lang]}
                    </p>
                    <p className="text-[0.85rem] md:text-[0.9rem] text-text-2 leading-relaxed">
                      {service.long[lang]}
                    </p>
                  </div>
                </div>
                {/* Subtle gold line that draws on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
