"use client";

import { motion, useReducedMotion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { Eyebrow } from "@/components/design-system/TextReveal";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { useModal } from "@/components/modals/ModalSystem";
import { MessageCircle, ArrowRight } from "lucide-react";

export function ConciergeSection({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const { ref, isInView } = useScrollReveal();
  const { openModal } = useModal();

  return (
    <section className="py-16 md:py-24 bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          ref={ref}
          className="relative overflow-hidden rounded-2xl border border-(--line) bg-ink p-8 md:p-12 lg:p-16"
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(201,168,106,0.08)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: CTA */}
            <div>
              <Eyebrow
                text={lang === "fr" ? "Besoin d'aide ?" : "Need help choosing?"}
                className="mb-3"
              />
              <h2 className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] text-ivory mb-4">
                {lang === "fr"
                  ? "Laissez Ormania vous guider."
                  : "Let Ormania guide you."
                }
              </h2>
              <p className="text-[0.95rem] text-text-2 leading-relaxed mb-6 max-w-md">
                {lang === "fr"
                  ? "Dites-nous ce que vous recherchez et la boutique pourra vous orienter vers les bonnes pièces."
                  : "Tell Ormania what you are looking for and the boutique can guide you to the right pieces."
                }
              </p>
              <button
                onClick={() => openModal("concierge")}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-ink font-medium text-[0.9rem] btn-sheen active:scale-[0.96] transition-transform"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                {lang === "fr" ? "Demander à Ormania" : "Ask Ormania"}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Right: Mini form */}
            <div className="rounded-xl border border-(--line) bg-[rgba(255,255,255,0.02)] p-5 md:p-6">
              <h3 className="font-serif text-[1rem] text-ivory mb-4">
                {lang === "fr" ? "Demande rapide" : "Quick Ask"}
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={t(lang, "form.name")}
                  className="w-full h-11 px-4 rounded-xl bg-ink-2 border border-(--line) text-ivory text-[0.9rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder={t(lang, "form.phone")}
                  className="w-full h-11 px-4 rounded-xl bg-ink-2 border border-(--line) text-ivory text-[0.9rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors"
                />
                <textarea
                  placeholder={t(lang, "form.message")}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-ink-2 border border-(--line) text-ivory text-[0.9rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors resize-none"
                />
                <button
                  onClick={() => openModal("quickAsk")}
                  className="w-full h-11 rounded-xl bg-gold/10 border border-gold/30 text-gold text-[0.85rem] font-medium active:scale-[0.97] transition-transform"
                >
                  {lang === "fr" ? "Envoyer" : "Send"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
