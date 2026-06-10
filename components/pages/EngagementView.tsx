"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Gem, Heart } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem, GoldDivider, SectionHeading } from "@/components/ui/Reveal";
import { Button, ResponsiveLabel } from "@/components/ui/Button";
import { luxeEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const GUIDE = {
  stones: {
    en: "Stones",
    fr: "Pierres",
    items: [
      { en: "Natural diamond", fr: "Diamant naturel", dEn: "Timeless, certified, one of a kind.", dFr: "Intemporel, certifié, unique." },
      { en: "Lab-grown diamond", fr: "Diamant de laboratoire", dEn: "Identical brilliance, friendlier budget.", dFr: "Même éclat, budget plus doux." },
      { en: "Moissanite", fr: "Moissanite", dEn: "Maximum sparkle per dollar.", dFr: "Le maximum d'éclat par dollar." },
    ],
  },
  settings: {
    en: "Settings",
    fr: "Sertis",
    items: [
      { en: "Solitaire", fr: "Solitaire", dEn: "One stone, nothing to distract from it.", dFr: "Une pierre, rien pour la distraire." },
      { en: "Halo", fr: "Halo", dEn: "A circle of light around the center.", dFr: "Un cercle de lumière autour du centre." },
      { en: "Three-stone", fr: "Trois pierres", dEn: "Past, present, and future.", dFr: "Passé, présent et futur." },
    ],
  },
  metals: {
    en: "Metals",
    fr: "Métaux",
    items: [
      { en: "Yellow gold", fr: "Or jaune", dEn: "Warm, classic, unmistakable.", dFr: "Chaleureux, classique, reconnaissable." },
      { en: "White gold", fr: "Or blanc", dEn: "Cool and contemporary.", dFr: "Froid et contemporain." },
      { en: "Rose gold", fr: "Or rose", dEn: "Romantic and distinctive.", dFr: "Romantique et distinctif." },
    ],
  },
};

const FAQ = [
  {
    qEn: "How far in advance should I start?",
    qFr: "Combien de temps à l'avance devrais-je commencer ?",
    aEn: "For a custom ring, 3–6 weeks is comfortable. In-stock rings can often be sized within days.",
    aFr: "Pour une bague sur mesure, 3 à 6 semaines est confortable. Les bagues en stock peuvent souvent être ajustées en quelques jours.",
  },
  {
    qEn: "What budget do I need?",
    qFr: "Quel budget me faut-il ?",
    aEn: "We build beautiful rings at every budget — lab-grown and moissanite open many doors. We'll always show options, never pressure.",
    aFr: "Nous créons de belles bagues pour tous les budgets — le laboratoire et la moissanite ouvrent bien des portes. Nous montrons des options, jamais de pression.",
  },
  {
    qEn: "Can I keep it a surprise?",
    qFr: "Puis-je garder la surprise ?",
    aEn: "Absolutely. We can help with discreet sizing tricks, and consultations are private.",
    aFr: "Absolument. Nous avons des astuces discrètes pour la taille, et les consultations sont privées.",
  },
  {
    qEn: "Do you resize after the proposal?",
    qFr: "Faites-vous la mise à grandeur après la demande ?",
    aEn: "Yes — one resize is on us within the first months.",
    aFr: "Oui — une mise à grandeur est offerte dans les premiers mois.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [openItem, setOpenItem] = useState(false);
  const reduce = useReducedMotion();
  return (
    <div className="border border-(--line) rounded-2xl bg-(--surface) overflow-hidden">
      <button
        onClick={() => setOpenItem(!openItem)}
        aria-expanded={openItem}
        className="w-full min-h-12 flex items-center justify-between gap-3 px-4 md:px-5 py-3.5 text-left
          [-webkit-tap-highlight-color:transparent]"
      >
        <span className="font-serif text-[1.05rem] text-ivory leading-snug">{q}</span>
        <ChevronDown
          size={17}
          aria-hidden
          className={cn(
            "shrink-0 text-gold transition-transform duration-300 ease-(--ease-luxe)",
            openItem && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {openItem && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: luxeEase }}
            className="overflow-hidden"
          >
            <p className="px-4 md:px-5 pb-4 text-[0.875rem] text-text-2 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EngagementView({ lang }: { lang: Lang }) {
  const { open } = useLeadModal();
  const bookCta = (source: string) => (
    <Button
      onClick={() => {
        track("engagement_book_click", { source });
        open("appointment", { appointmentType: "Engagement consultation" });
      }}
      arrow
    >
      <ResponsiveLabel short={t(lang, "engagement.ctaShort")} full={t(lang, "engagement.cta")} breakpoint="sm" />
    </Button>
  );

  return (
    <>
      <PageHero
        eyebrow={t(lang, "engagement.eyebrow")}
        title={t(lang, "engagement.title")}
        sub={t(lang, "engagement.sub")}
      >
        {bookCta("engagement_hero")}
      </PageHero>

      {/* Romantic editorial split */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <Reveal className="card-zoom relative rounded-2xl overflow-hidden border border-(--line) aspect-[4/5] max-h-[560px] w-full">
            <Image
              src="/instagram/ig-DCu5JdFO5TV.jpg"
              alt={lang === "fr" ? "Bague solitaire Ormania" : "Ormania solitaire ring"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          </Reveal>
          <div>
            <Reveal>
              <Heart size={20} className="text-gold mb-4" strokeWidth={1.5} aria-hidden />
              <h2 className="font-serif text-[clamp(1.6rem,4.5vw,2.4rem)] text-ivory leading-[1.15] text-balance">
                {lang === "fr"
                  ? "Une consultation privée. Zéro pression. Une bague qui lui ressemble."
                  : "A private consultation. Zero pressure. A ring that's unmistakably them."}
              </h2>
              <p className="mt-4 text-[0.95rem] text-text-2 leading-relaxed">
                {lang === "fr"
                  ? "Nous prenons le temps : votre histoire, son style, votre budget. Vous repartez avec des options claires — naturel, laboratoire ou moissanite — et un prix honnête, expliqué simplement."
                  : "We take the time: your story, their style, your budget. You leave with clear options — natural, lab-grown, or moissanite — and an honest price, explained simply."}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* Stone / setting / metal guide */}
      <section className="py-12 md:py-20 bg-ink-2/60">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow={lang === "fr" ? "Le guide" : "The guide"}
            title={lang === "fr" ? "Pierre, serti, métal." : "Stone, setting, metal."}
          />
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {Object.values(GUIDE).map((group) => (
              <RevealGroup key={group.en} className="surface-card p-5 md:p-6">
                <h3 className="eyebrow mb-4 flex items-center gap-2">
                  <Gem size={13} aria-hidden />
                  {lang === "fr" ? group.fr : group.en}
                </h3>
                <div className="flex flex-col gap-4">
                  {group.items.map((it) => (
                    <RevealItem key={it.en}>
                      <h4 className="font-serif text-[1.1rem] text-ivory">
                        {lang === "fr" ? it.fr : it.en}
                      </h4>
                      <p className="text-[0.82rem] text-text-2 leading-snug">
                        {lang === "fr" ? it.dFr : it.dEn}
                      </p>
                    </RevealItem>
                  ))}
                </div>
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* FAQ */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title={lang === "fr" ? "Les vraies questions." : "The real questions."}
          />
          <RevealGroup className="flex flex-col gap-3">
            {FAQ.map((f) => (
              <RevealItem key={f.qEn}>
                <FaqItem q={lang === "fr" ? f.qFr : f.qEn} a={lang === "fr" ? f.aFr : f.aEn} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Booking anchor — every #book link lands here */}
      <section id="book" className="py-14 md:py-20 bg-ink-2 border-y border-(--line) scroll-mt-24">
        <div className="mx-auto max-w-3xl px-4 md:px-8 text-center">
          <SectionHeading
            eyebrow={lang === "fr" ? "Prêt ?" : "Ready?"}
            title={lang === "fr" ? "Réservez votre consultation." : "Book your consultation."}
            sub={
              lang === "fr"
                ? "Sans frais, sans obligation — juste une conversation sur la bague."
                : "No fee, no obligation — just a conversation about the ring."
            }
          />
          <Reveal className="flex justify-center">{bookCta("engagement_book_section")}</Reveal>
        </div>
      </section>
    </>
  );
}
