"use client";

import Link from "next/link";
import Image from "next/image";
import { Gem, Hammer, Heart, MapPin, Phone, Sparkles, Wrench } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import { COLLECTIONS, CUSTOM_STEPS, REPAIR_SERVICES, STORE, TOOLS } from "@/lib/data";
import { track } from "@/lib/analytics";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { Reveal, RevealGroup, RevealItem, GoldDivider, SectionHeading } from "@/components/ui/Reveal";
import { Button, ResponsiveLabel } from "@/components/ui/Button";
import { IGGrid } from "@/components/ig/IGGrid";
import { IgIcon } from "@/components/ui/icons";
import { TiltCard } from "@/components/effects/TiltCard";
import { useScrollEffects } from "@/hooks/useScrollEffects";

export function HomeSections({ lang }: { lang: Lang }) {
  const { open } = useLeadModal();
  const scrollRef = useScrollEffects();

  return (
    <div ref={scrollRef}>
      {/* ═══ FEATURED COLLECTIONS ═══ */}
      <section id="featured" className="py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow={t(lang, "collections.eyebrow")}
            title={t(lang, "collections.title")}
            sub={t(lang, "collections.sub")}
          />
          <RevealGroup className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {COLLECTIONS.map((c) => (
              <RevealItem key={c.id} className="reveal-card">
                <TiltCard>
                  <Link
                    href={`/${lang}/collections#${c.id}`}
                    onClick={() => track("collection_card_click", { id: c.id })}
                    className="card-glow card-zoom card-tilt-inner group block relative rounded-2xl overflow-hidden border border-(--line) aspect-[4/5]"
                  >
                  <Image
                    src={c.image}
                    alt={c[lang]}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-3.5 md:p-5">
                    <h3 className="font-serif text-[1.15rem] md:text-[1.5rem] text-ivory leading-tight">
                      {c[lang]}
                    </h3>
                    <p className="hidden md:block mt-1.5 text-[0.8rem] text-text-2 leading-snug max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-(--ease-luxe) overflow-hidden">
                      {lang === "fr" ? c.descFr : c.descEn}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[0.78rem] tracking-[0.1em] uppercase text-gold">
                      {t(lang, "collections.view")}
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* ═══ SEEN ON INSTAGRAM — centerpiece ═══ */}
      <section className="py-16 md:py-28 bg-ink-2/60">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow={t(lang, "ig.eyebrow")}
            title={t(lang, "ig.title")}
            sub={t(lang, "ig.sub")}
          />
          <IGGrid lang={lang} limit={8} showFilters={false} showCtas />
          <Reveal className="mt-8 text-center">
            <Link
              href={`/${lang}/instagram`}
              onClick={() => track("ig_view_all_click")}
              className="inline-flex items-center gap-2 min-h-11 text-[0.9rem] text-gold hover:text-gold-3 transition-colors group"
            >
              {t(lang, "ig.viewAll")}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* ═══ CUSTOM JEWELRY ═══ */}
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal className="card-zoom relative rounded-2xl overflow-hidden border border-(--line) aspect-[4/5] max-h-[520px] w-full">
            <Image
              src="/instagram/ig-DRP2awpjmhB.jpg"
              alt={lang === "fr" ? "Boucles d'oreilles sur mesure en perles" : "Custom pearl earrings made at Ormania"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className="object-cover parallax-img reveal-img scale-[1.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <figcaption className="absolute bottom-4 left-4 right-4 text-[0.8rem] text-text-2 italic font-serif text-[1rem]">
              {lang === "fr"
                ? "« Des boucles d'oreilles assorties à ses perles — un cadeau de 65e anniversaire. »"
                : "“Earrings made to match her pearls — a 65th birthday gift.”"}
            </figcaption>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow={t(lang, "custom.eyebrow")}
              title={t(lang, "custom.title")}
              sub={t(lang, "custom.sub")}
            />
            <RevealGroup className="flex flex-col gap-4 mb-8">
              {CUSTOM_STEPS.map((s, i) => (
                <RevealItem key={i} className="flex gap-4 items-start">
                  <span className="shrink-0 w-9 h-9 rounded-full border border-gold/50 text-gold font-serif text-[1rem] flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.15rem] text-ivory">{s[lang]}</h3>
                    <p className="text-[0.85rem] text-text-2 leading-relaxed">
                      {lang === "fr" ? s.descFr : s.descEn}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="flex flex-col xs:flex-row gap-3 xs:gap-2.5">
              <Button
                onClick={() => {
                  track("custom_request_click", { source: "home" });
                  open("custom");
                }}
                arrow
              >
                <ResponsiveLabel
                  short={t(lang, "custom.ctaShort")}
                  full={t(lang, "custom.cta")}
                  breakpoint="sm"
                />
              </Button>
              <Button variant="secondary" href={`/${lang}/custom`}>
                <Sparkles size={16} aria-hidden />
                {lang === "fr" ? "En savoir plus" : "Learn more"}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* ═══ REPAIRS ═══ */}
      <section className="py-16 md:py-28 bg-ink-2/60">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow={t(lang, "repairs.eyebrow")}
            title={t(lang, "repairs.title")}
            sub={t(lang, "repairs.sub")}
          />
          <RevealGroup className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-9">
            {REPAIR_SERVICES.map((s) => (
              <RevealItem key={s.id} className="reveal-card">
                <button
                  onClick={() => {
                    track("repair_service_click", { id: s.id });
                    open("repair", { itemType: "", problem: lang === "fr" ? s.fr : s.en });
                  }}
                  className="card-glow card-tilt-inner w-full text-left rounded-2xl border border-(--line) bg-(--surface) p-4 md:p-5
                    transition-all duration-300 [-webkit-tap-highlight-color:transparent]"
                >
                  <Wrench size={18} className="text-gold mb-3" strokeWidth={1.5} aria-hidden />
                  <h3 className="font-serif text-[1.1rem] text-ivory leading-tight">{s[lang]}</h3>
                  <p className="mt-1 text-[0.8rem] text-text-2 leading-snug">
                    {lang === "fr" ? s.descFr : s.descEn}
                  </p>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="flex flex-col xs:flex-row justify-center gap-3 xs:gap-2.5">
            <Button
              onClick={() => {
                track("repair_request_click", { source: "home" });
                open("repair");
              }}
              arrow
            >
              <ResponsiveLabel
                short={t(lang, "repairs.ctaShort")}
                full={t(lang, "repairs.cta")}
                breakpoint="sm"
              />
            </Button>
            <Button variant="secondary" href={`/${lang}/repairs`}>
              <Hammer size={16} aria-hidden />
              {lang === "fr" ? "Voir les réparations" : "See repairs"}
            </Button>
          </Reveal>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* ═══ ENGAGEMENT ═══ */}
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading
              align="left"
              eyebrow={t(lang, "engagement.eyebrow")}
              title={t(lang, "engagement.title")}
              sub={t(lang, "engagement.sub")}
            />
            <Reveal className="flex flex-col xs:flex-row gap-3 xs:gap-2.5">
              <Button
                onClick={() => {
                  track("engagement_book_click", { source: "home" });
                  open("appointment", { appointmentType: "Engagement consultation" });
                }}
                arrow
              >
                <ResponsiveLabel
                  short={t(lang, "engagement.ctaShort")}
                  full={t(lang, "engagement.cta")}
                  breakpoint="sm"
                />
              </Button>
              <Button variant="secondary" href={`/${lang}/engagement`}>
                <Heart size={16} aria-hidden />
                {lang === "fr" ? "Guide fiançailles" : "Engagement guide"}
              </Button>
            </Reveal>
          </div>
          <Reveal className="order-1 lg:order-2 card-zoom relative rounded-2xl overflow-hidden border border-(--line) aspect-[4/5] max-h-[520px] w-full">
            <Image
              src="/instagram/ig-DXxuRoEGDfb.jpg"
              alt={lang === "fr" ? "Bagues de fiançailles en diamant" : "Diamond engagement rings at Ormania"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className="object-cover parallax-img reveal-img scale-[1.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </Reveal>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* ═══ WHY ORMANIA ═══ */}
      <section className="py-16 md:py-28 bg-ink-2/60">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow={t(lang, "why.eyebrow")}
            title={t(lang, "why.title")}
          />
          <RevealGroup className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {[
              {
                icon: Gem,
                en: "Real pieces, in store",
                fr: "Des pièces réelles, en boutique",
                dEn: "Everything on our Instagram exists — come see it in person.",
                dFr: "Tout ce qui est sur notre Instagram existe — venez le voir en personne.",
              },
              {
                icon: Hammer,
                en: "Work done in-house",
                fr: "Travail fait sur place",
                dEn: "Repairs and custom work at our own bench, not shipped away.",
                dFr: "Réparations et créations à notre propre atelier, jamais expédiées.",
              },
              {
                icon: Heart,
                en: "Family service",
                fr: "Service familial",
                dEn: "A boutique where you're a name, not a ticket number.",
                dFr: "Une boutique où vous êtes un nom, pas un numéro.",
              },
              {
                icon: MapPin,
                en: "In the heart of Laval",
                fr: "Au cœur de Laval",
                dEn: "Boulevard des Laurentides — easy parking, easy visit.",
                dFr: "Boulevard des Laurentides — stationnement et visite faciles.",
              },
            ].map((w) => (
              <RevealItem key={w.en} className="reveal-card">
                <div className="surface-card card-glow h-full p-5 md:p-6">
                  <w.icon size={20} className="text-gold mb-3" strokeWidth={1.5} aria-hidden />
                  <h3 className="font-serif text-[1.15rem] text-ivory leading-tight">
                    {lang === "fr" ? w.fr : w.en}
                  </h3>
                  <p className="mt-1.5 text-[0.82rem] text-text-2 leading-relaxed">
                    {lang === "fr" ? w.dFr : w.dEn}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* ═══ TOOLS TEASER ═══ */}
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow={t(lang, "tools.eyebrow")}
            title={t(lang, "tools.title")}
          />
          <RevealGroup className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {TOOLS.map((tool) => (
              <RevealItem key={tool.id}>
                <Link
                  href={`/${lang}/explore#${tool.id}`}
                  onClick={() => track("tool_click", { id: tool.id })}
                  className="card-glow surface-card flex flex-col h-full p-4 md:p-5 group"
                >
                  <span
                    className={
                      "self-start text-[0.6rem] tracking-[0.14em] uppercase px-2 py-0.5 rounded-full mb-3 " +
                      (tool.status === "live"
                        ? "bg-gold/15 text-gold border border-gold/40"
                        : "bg-white/5 text-text-3 border border-white/10")
                    }
                  >
                    {tool.status === "live" ? t(lang, "tools.live") : t(lang, "tools.preview")}
                  </span>
                  <h3 className="font-serif text-[1.05rem] text-ivory leading-tight">
                    {tool[lang]}
                  </h3>
                  <p className="mt-1 text-[0.78rem] text-text-2 leading-snug">
                    {lang === "fr" ? tool.descFr : tool.descEn}
                  </p>
                  <span aria-hidden className="mt-auto pt-3 text-gold text-[0.85rem] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══ VISIT BAND ═══ */}
      <section className="relative py-16 md:py-24 bg-ink-2 border-y border-(--line)">
        <div className="mx-auto max-w-5xl px-4 md:px-8 text-center">
          <SectionHeading
            eyebrow={t(lang, "visit.eyebrow")}
            title={t(lang, "visit.title")}
            sub={`${STORE.address}, ${STORE.city}, ${STORE.region} ${STORE.postal}`}
          />
          <Reveal className="flex flex-col xs:flex-row flex-wrap justify-center gap-3 xs:gap-2.5">
            <Button
              href={STORE.phoneHref}
              onClick={() => track("call_click", { source: "home_visit" })}
            >
              <Phone size={16} aria-hidden />
              <ResponsiveLabel short={t(lang, "visit.callShort")} full={STORE.phone} breakpoint="sm" />
            </Button>
            <Button
              variant="secondary"
              href={STORE.directionsUrl}
              onClick={() => track("directions_click", { source: "home_visit" })}
            >
              <MapPin size={16} aria-hidden />
              {t(lang, "visit.directionsShort")}
            </Button>
            <Button
              variant="secondary"
              href={STORE.instagram}
              onClick={() => track("instagram_click", { source: "home_visit" })}
            >
              <IgIcon className="w-4 h-4" />
              Instagram
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
