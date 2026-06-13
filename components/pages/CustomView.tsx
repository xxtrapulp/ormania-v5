"use client";

import { Camera } from "lucide-react";
import { CUSTOM_STEPS } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem, GoldDivider, SectionHeading } from "@/components/ui/Reveal";
import { Button, ResponsiveLabel } from "@/components/ui/Button";
import { ResponsiveIgImage } from "@/components/ui/ResponsiveIgImage";

const GALLERY = [
  { image: "/instagram/ig-DRP2awpjmhB.jpg", en: "Custom pearl earrings — a 65th birthday gift", fr: "Boucles d'oreilles en perles — cadeau de 65e anniversaire" },
  { image: "/instagram/ig-DSaTiT1jgKb.jpg", en: "Stackable rings, made to mix", fr: "Bagues superposables, faites pour se combiner" },
  { image: "/instagram/ig-DCu5JdFO5TV.jpg", en: "Men's solitaire, cut to character", fr: "Solitaire pour homme, taillé sur mesure" },
];

export function CustomView({ lang }: { lang: Lang }) {
  const { open } = useLeadModal();

  return (
    <>
      <PageHero
        eyebrow={t(lang, "custom.eyebrow")}
        title={t(lang, "custom.title")}
        sub={t(lang, "custom.sub")}
      >
        <Button
          onClick={() => {
            track("custom_request_click", { source: "custom_hero" });
            open("custom");
          }}
          arrow
        >
          <ResponsiveLabel short={t(lang, "custom.ctaShort")} full={t(lang, "custom.cta")} breakpoint="sm" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            track("custom_inspiration_click", { source: "custom_hero" });
            open("custom");
          }}
        >
          <Camera size={16} aria-hidden />
          <ResponsiveLabel
            short={lang === "fr" ? "Photos d'inspiration" : "Inspiration Photos"}
            full={lang === "fr" ? "Envoyer des photos d'inspiration" : "Send Inspiration Photos"}
            breakpoint="sm"
          />
        </Button>
      </PageHero>

      {/* Process — animated step sequence */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow={lang === "fr" ? "Le processus" : "The process"}
            title={lang === "fr" ? "De l'idée à l'écrin." : "From idea to the box."}
          />
          <RevealGroup className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {CUSTOM_STEPS.map((s, i) => (
              <RevealItem key={i}>
                <div className="card-glow surface-card h-full p-5 md:p-6 relative overflow-hidden">
                  <span
                    aria-hidden
                    className="absolute -top-3 -right-1 font-serif text-[4.5rem] leading-none text-gold/10 select-none"
                  >
                    {i + 1}
                  </span>
                  <span className="w-9 h-9 rounded-full border border-gold/50 text-gold font-serif flex items-center justify-center mb-4">
                    {i + 1}
                  </span>
                  <h3 className="font-serif text-[1.2rem] text-ivory leading-tight">{s[lang]}</h3>
                  <p className="mt-1.5 text-[0.82rem] text-text-2 leading-relaxed">
                    {lang === "fr" ? s.descFr : s.descEn}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* Emotional gallery */}
      <section className="py-12 md:py-20 bg-ink-2/60">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow={lang === "fr" ? "Pièces récentes" : "Recent commissions"}
            title={lang === "fr" ? "Faites une seule fois, pour une seule personne." : "Made once, for one person."}
          />
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
            {GALLERY.map((g, i) => (
              <RevealItem key={g.image}>
                <figure className="card-glow card-zoom relative rounded-2xl overflow-hidden border border-(--line) aspect-[4/5]">
                  <ResponsiveIgImage
                    src={g.image}
                    alt={lang === "fr" ? g.fr : g.en}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    priority={i === 0}
                    objectFit="cover"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-0 inset-x-0 p-4 font-serif italic text-[0.95rem] text-ivory leading-snug">
                    {lang === "fr" ? g.fr : g.en}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 flex flex-col xs:flex-row justify-center gap-3 xs:gap-2.5">
            <Button
              onClick={() => {
                track("custom_request_click", { source: "custom_gallery" });
                open("custom");
              }}
              arrow
            >
              <ResponsiveLabel short={t(lang, "custom.ctaShort")} full={t(lang, "custom.cta")} breakpoint="sm" />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
