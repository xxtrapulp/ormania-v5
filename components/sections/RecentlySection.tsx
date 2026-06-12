"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type Lang } from "@/lib/i18n";
import { Eyebrow } from "@/components/design-system/TextReveal";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { useModal } from "@/components/modals/ModalSystem";
import { HorizontalScroll } from "@/components/design-system/HorizontalScroll";
import { GlassCard } from "@/components/design-system/GlassCard";
import { Heart, ArrowRight } from "lucide-react";

const RECENT_ITEMS = [
  { labelEn: "New this week", labelFr: "Nouveau cette semaine", titleEn: "Lab-Grown Tennis Bracelet", titleFr: "Bracelet tennis de lab" },
  { labelEn: "Popular in store", labelFr: "Populaire en boutique", titleEn: "Halo Diamond Necklace", titleFr: "Collier diamant halo" },
  { labelEn: "Custom piece", labelFr: "Pièce sur mesure", titleEn: "Stack Your Rings", titleFr: "Empilez vos bagues" },
  { labelEn: "Gift idea", labelFr: "Idée cadeau", titleEn: "Pearl Earrings", titleFr: "Boucles d'oreilles perle" },
  { labelEn: "Recently featured", labelFr: "Récemment en vedette", titleEn: "Gold Chain 18\"", titleFr: "Chaîne en or 18\"" },
  { labelEn: "Ask for availability", labelFr: "Demander la disponibilité", titleEn: "Engagement Ring", titleFr: "Bague de fiançailles" },
] as const;

export function RecentlySection({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const { ref, isInView } = useScrollReveal();
  const { openModal } = useModal();

  return (
    <section className="py-12 md:py-20 bg-ink">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <Eyebrow text={lang === "fr" ? "Récemment" : "Recently at Ormania"} className="mb-3" />
            <h2 className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] text-ivory">
              {lang === "fr" ? "Récemment à Ormania" : "Recently at Ormania"}
            </h2>
          </div>
          <p className="text-[0.9rem] text-text-2 max-w-sm">
            {lang === "fr"
              ? "Ce qui se passe en boutique en ce moment."
              : "What's happening in the boutique right now."
            }
          </p>
        </div>

        <div ref={ref} className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {RECENT_ITEMS.map((item, i) => (
            <motion.div
              key={item.titleEn}
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "80px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <GlassCard className="p-4 h-full group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[0.65rem] font-medium">
                    {lang === "fr" ? item.labelFr : item.labelEn}
                  </span>
                  <button className="text-text-3 hover:text-gold transition-colors">
                    <Heart size={15} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="aspect-[4/3] rounded-lg bg-ink-2 mb-3 flex items-center justify-center">
                  <span className="text-text-3 text-[0.75rem]">Image placeholder</span>
                </div>
                <h3 className="font-serif text-[0.95rem] text-ivory group-hover:text-gold transition-colors">
                  {lang === "fr" ? item.titleFr : item.titleEn}
                </h3>
                <button
                  onClick={() => openModal("product", { pieceName: lang === "fr" ? item.titleFr : item.titleEn })}
                  className="mt-2 flex items-center gap-1 text-gold text-[0.75rem] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span>{lang === "fr" ? "Demander" : "Ask About This"}</span>
                  <ArrowRight size={12} />
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden">
          <HorizontalScroll itemClassName="w-[260px]">
            {RECENT_ITEMS.map((item) => (
              <GlassCard key={item.titleEn} className="p-4 h-full">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[0.65rem] font-medium">
                    {lang === "fr" ? item.labelFr : item.labelEn}
                  </span>
                  <button className="text-text-3">
                    <Heart size={15} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="aspect-[4/3] rounded-lg bg-ink-2 mb-3 flex items-center justify-center">
                  <span className="text-text-3 text-[0.75rem]">Image</span>
                </div>
                <h3 className="font-serif text-[0.95rem] text-ivory">
                  {lang === "fr" ? item.titleFr : item.titleEn}
                </h3>
              </GlassCard>
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </section>
  );
}
