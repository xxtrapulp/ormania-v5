"use client";

/**
 * ServicesSection — replaces the four generic Lucide-icon service cards
 * with four interactive mini-moments (Track E+ from the plan):
 *   1. Custom Design    — a gold line draws itself into a ring outline
 *   2. Restoration      — drag a slider to wipe a "polish" reveal
 *   3. Engagement       — pick stone/setting/metal, ring updates live
 *   4. Gift Curation    — pick "who is it for", routes to gift finder
 *
 * Each card has its own dedicated component in ./services/*; this
 * section file just composes them. The ServiceCardShell provides the
 * shared chrome (border, padding, hover lift, learn-more link).
 *
 * IMPORTANT: this section has NO whileInView opacity reveals or GSAP
 * triggers. Each card animates on mount with a stagger via the shell
 * (animate: opacity 1), so the cards are visible the moment the
 * user scrolls to them. This is the pattern that fixed the
 * disappearing-content bug (see e2e/disappearing-content.spec.ts).
 */

import { type Lang } from "@/lib/i18n";
import { Eyebrow } from "@/components/design-system/TextReveal";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { ServiceCardShell } from "./services/ServiceCardShell";
import { CustomDesignCard } from "./services/CustomDesignCard";
import { RestorationCard } from "./services/RestorationCard";
import { EngagementCard } from "./services/EngagementCard";
import { GiftCurationCard } from "./services/GiftCurationCard";

const STRINGS = {
  en: {
    eyebrow: "Signature Services",
    title: "Our craft, at your service.",
  },
  fr: {
    eyebrow: "Services phares",
    title: "Notre savoir-faire, à votre service.",
  },
} as const;

export function ServicesSection({ lang }: { lang: Lang }) {
  const s = STRINGS[lang];

  return (
    <section className="py-12 md:py-20 bg-ink">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionReveal className="mb-8 md:mb-10">
          <SectionReveal.Support>
            <Eyebrow text={s.eyebrow} className="mb-3" />
          </SectionReveal.Support>
          <SectionReveal.Title className="font-serif text-[clamp(1.75rem,5vw,3rem)] text-ivory block">
            {s.title}
          </SectionReveal.Title>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <ServiceCardShell
            learnMoreHref={`/${lang}/custom`}
            eyebrow="01"
            title={lang === "fr" ? "Design sur mesure" : "Custom Design"}
            subcopy={
              lang === "fr"
                ? "D'un simple trait, une pièce faite pour vous."
                : "From a single line, a piece made only for you."
            }
            lang={lang}
          >
            <CustomDesignCard />
          </ServiceCardShell>

          <ServiceCardShell
            learnMoreHref={`/${lang}/repairs`}
            eyebrow="02"
            title={lang === "fr" ? "Restauration de bijoux" : "Jewelry Restoration"}
            subcopy={
              lang === "fr"
                ? "Vos bijoux de famille retrouvent leur premier éclat."
                : "Family heirlooms returned to their first light."
            }
            lang={lang}
          >
            <RestorationCard />
          </ServiceCardShell>

          <ServiceCardShell
            learnMoreHref={`/${lang}/engagement`}
            eyebrow="03"
            title={lang === "fr" ? "Conseil pour fiançailles" : "Engagement Guidance"}
            subcopy={
              lang === "fr"
                ? "Pierre. Sertissure. Métal. Voyez votre bague prendre forme."
                : "Stone. Setting. Metal. See your ring take shape."
            }
            lang={lang}
          >
            <EngagementCard lang={lang} />
          </ServiceCardShell>

          <ServiceCardShell
            learnMoreHref={`/${lang}/explore#quiz`}
            eyebrow="04"
            title={lang === "fr" ? "Curation de cadeaux" : "Gift Curation"}
            subcopy={
              lang === "fr"
                ? "Dites-nous pour qui — on s'occupe du reste."
                : "Tell us who it's for — we'll take it from here."
            }
            lang={lang}
          >
            <GiftCurationCard lang={lang} />
          </ServiceCardShell>
        </div>
      </div>
    </section>
  );
}
