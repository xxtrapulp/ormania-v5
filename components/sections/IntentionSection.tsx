"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type Lang } from "@/lib/i18n";
import { Eyebrow } from "@/components/design-system/TextReveal";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { CursorUnderline } from "@/components/effects/CursorUnderline";
import { User, Crown, Sun, CircleUser, Wrench, Search } from "lucide-react";

const INTENTIONS = [
  {
    icon: User,
    title: { en: "Make it personal", fr: "Personnalisez" },
    desc: { en: "Custom jewelry, engraving, meaningful pieces.", fr: "Bijoux sur mesure, gravure, pièces significatives." },
    cta: { en: "Custom", fr: "Sur mesure" },
  },
  {
    icon: Crown,
    title: { en: "Mark a milestone", fr: "Marquez un jalon" },
    desc: { en: "Engagement, anniversary, graduation, special moments.", fr: "Fiançailles, anniversaire, remise de diplôme, moments spéciaux." },
    cta: { en: "Engagement", fr: "Fiançailles" },
  },
  {
    icon: Sun,
    title: { en: "Everyday gold", fr: "Or au quotidien" },
    desc: { en: "Chains, rings, bracelets, and daily pieces.", fr: "Chaînes, bagues, bracelets et pièces du quotidien." },
    cta: { en: "Explore", fr: "Explorer" },
  },
  {
    icon: CircleUser,
    title: { en: "Something for him", fr: "Pour lui" },
    desc: { en: "Men's rings, chains, watches, and gifts.", fr: "Bagues homme, chaînes, montres et cadeaux." },
    cta: { en: "Men's", fr: "Homme" },
  },
  {
    icon: Wrench,
    title: { en: "Repair what matters", fr: "Réparez ce qui compte" },
    desc: { en: "Resize, restore, polish, and fix the pieces you love.", fr: "Agrandir, restaurer, polir et réparer les pièces que vous aimez." },
    cta: { en: "Repair", fr: "Réparer" },
  },
  {
    icon: Search,
    title: { en: "Find a gift", fr: "Trouvez un cadeau" },
    desc: { en: "Guided gift ideas by occasion, style, and budget.", fr: "Idées de cadeaux guidées par occasion, style et budget." },
    cta: { en: "Gift Finder", fr: "Trouver" },
  },
] as const;

export function IntentionSection({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-12 md:py-20 bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionReveal className="text-center mb-8 md:mb-10">
          <SectionReveal.Support>
            <Eyebrow
              text={lang === "fr" ? "Shop par intention" : "Shop by Intention"}
              className="mb-3"
            />
          </SectionReveal.Support>
          <SectionReveal.Title className="font-serif text-[clamp(1.75rem,5vw,3rem)] text-ivory block">
            {lang === "fr" ? "Comment pouvons-nous vous aider ?" : "How can we help you?"}
          </SectionReveal.Title>
        </SectionReveal>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {INTENTIONS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title.en}
                className="group relative rounded-2xl border border-(--line) bg-ink p-5 md:p-6 transition-all duration-500 hover:border-(--line-2) hover:-translate-y-1 cursor-pointer"
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "80px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold transition-colors group-hover:bg-gold/10">
                    <Icon size={17} strokeWidth={1.5} />
                  </div>
                  <span className="text-[0.72rem] tracking-[0.2em] uppercase text-gold/70 font-medium">
                    {item.cta[lang]}
                  </span>
                </div>
                <h3 className="font-serif text-[1.1rem] md:text-[1.2rem] text-ivory mb-1">
                  {item.title[lang]}
                </h3>
                <p className="text-[0.85rem] text-text-2 leading-relaxed">
                  {item.desc[lang]}
                </p>
                <div className="mt-4 flex items-center gap-1 text-gold text-[0.8rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CursorUnderline.Span>
                    {lang === "fr" ? "Explorer" : "Explore"}
                  </CursorUnderline.Span>
                  <span aria-hidden>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
