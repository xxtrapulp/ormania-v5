"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect, type ReactNode } from "react";
import { Gem, Hammer, Heart, MapPin, Phone, Sparkles, Wrench, Gift, Circle, Link as LinkIcon, Search } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import { COLLECTIONS, CUSTOM_STEPS, REPAIR_SERVICES, STORE, TOOLS } from "@/lib/data";
import { track } from "@/lib/analytics";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { Reveal, RevealGroup, RevealItem, GoldDivider, SectionHeading } from "@/components/ui/Reveal";
import { Button, ResponsiveLabel } from "@/components/ui/Button";
import { IGGrid } from "@/components/ig/IGGrid";
import { IgIcon } from "@/components/ui/icons";
import { TiltCard } from "@/components/effects/TiltCard";
import { ScrollStory } from "@/components/effects/ScrollStory";
import { BlurWords, FadeLines, TypeEyebrow } from "@/components/effects/TextReveal";
import { ParallaxText } from "@/components/effects/ParallaxText";
import { useScrollEffects } from "@/hooks/useScrollEffects";

function StepItem({ children, index }: { children: ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex gap-4 items-start"
      style={{
        opacity: 1,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: `transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) ${index * 0.08}s`,
      }}
    >
      {children}
    </div>
  );
}

export function HomeSections({ lang }: { lang: Lang }) {
  const { open } = useLeadModal();
  const scrollRef = useScrollEffects();

  return (
    <div ref={scrollRef}>
      {/* ═══ FEATURED COLLECTIONS ═══ */}
      <section id="featured" className="pt-6 md:pt-12 pb-0">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-2xl mb-8 md:mb-12 mx-auto text-center">
            <TypeEyebrow text={t(lang, "collections.eyebrow")} className="block mb-3" />
            <BlurWords
              text={t(lang, "collections.title")}
              as="h2"
              className="text-balance font-serif text-[clamp(1.75rem,5.5vw,2.75rem)] leading-[1.18] text-ivory"
            />
            <FadeLines className="mt-4" stagger={0.08}>
              <p className="fade-line text-[0.95rem] md:text-base leading-relaxed text-text-2">
                {t(lang, "collections.sub")}
              </p>
            </FadeLines>
          </div>
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

      {/* ═══ SEEN ON INSTAGRAM — centerpiece ═══ */}
      <section className="pt-0 pb-6 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="eyebrow text-center mb-2 md:mb-3">{t(lang, "ig.eyebrow")}</p>
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

      {/* ═══ THE CRAFT — pinned scroll storytelling ═══ */}
      <ScrollStory
        lang={lang}
        steps={[
          { title: t(lang, "craft.step1.title"), desc: t(lang, "craft.step1.desc") },
          { title: t(lang, "craft.step2.title"), desc: t(lang, "craft.step2.desc") },
          { title: t(lang, "craft.step3.title"), desc: t(lang, "craft.step3.desc") },
          { title: t(lang, "craft.step4.title"), desc: t(lang, "craft.step4.desc") },
        ]}
      />

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* ═══ CUSTOM JEWELRY ═══ */}
      <section className="py-8 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <Reveal className="card-zoom relative rounded-2xl overflow-hidden border border-(--line) aspect-[4/5] max-h-[520px] w-full">
            <Image
              src="/instagram/ig-DRP2awpjmhB.jpg"
              alt={lang === "fr" ? "Boucles d'oreilles sur mesure en perles" : "Custom pearl earrings made at Ormania"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className="object-cover parallax-img scale-[1.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <figcaption className="absolute bottom-4 left-4 right-4 text-[0.8rem] text-text-2 italic font-serif text-[1rem]">
              {lang === "fr"
                ? "« Des boucles d'oreilles assorties à ses perles — un cadeau de 65e anniversaire. »"
                : "“Earrings made to match her pearls — a 65th birthday gift.”"}
            </figcaption>
          </Reveal>

          <div>
            <ParallaxText speed={0.4} className="max-w-xl mb-8 md:mb-12 mx-auto text-center">
              <TypeEyebrow text={t(lang, "custom.eyebrow")} className="block mb-3" />
              <BlurWords
                text={t(lang, "custom.title")}
                as="h2"
                className="text-balance font-serif text-[clamp(1.75rem,5.5vw,2.75rem)] leading-[1.18] text-ivory"
              />
              <FadeLines className="mt-4" stagger={0.08}>
                <p className="fade-line text-[0.95rem] md:text-base leading-relaxed text-text-2">
                  {t(lang, "custom.sub")}
                </p>
              </FadeLines>
            </ParallaxText>
            <div className="flex flex-col gap-4 mb-8">
              {CUSTOM_STEPS.map((s, i) => (
                <StepItem key={i} index={i}>
                  <span className="shrink-0 w-9 h-9 rounded-full border border-gold/50 text-gold font-serif text-[1rem] flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.15rem] text-ivory">{s[lang]}</h3>
                    <p className="text-[0.85rem] text-text-2 leading-relaxed">
                      {lang === "fr" ? s.descFr : s.descEn}
                    </p>
                  </div>
                </StepItem>
              ))}
            </div>
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
      <section className="py-8 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <ParallaxText speed={0.35} className="max-w-2xl mb-8 md:mb-12 mx-auto text-center">
            <TypeEyebrow text={t(lang, "repairs.eyebrow")} className="block mb-3" />
            <BlurWords
              text={t(lang, "repairs.title")}
              as="h2"
              className="text-balance font-serif text-[clamp(1.75rem,5.5vw,2.75rem)] leading-[1.18] text-ivory"
            />
            <FadeLines className="mt-4" stagger={0.08}>
              <p className="fade-line text-[0.95rem] md:text-base leading-relaxed text-text-2">
                {t(lang, "repairs.sub")}
              </p>
            </FadeLines>
          </ParallaxText>
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
      <section className="py-8 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <ParallaxText speed={0.4} className="max-w-xl mb-8 md:mb-12 mx-auto text-center">
              <TypeEyebrow text={t(lang, "engagement.eyebrow")} className="block mb-3" />
              <BlurWords
                text={t(lang, "engagement.title")}
                as="h2"
                className="text-balance font-serif text-[clamp(1.75rem,5.5vw,2.75rem)] leading-[1.18] text-ivory"
              />
              <FadeLines className="mt-4" stagger={0.08}>
                <p className="fade-line text-[0.95rem] md:text-base leading-relaxed text-text-2">
                  {t(lang, "engagement.sub")}
                </p>
              </FadeLines>
            </ParallaxText>
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
      <section className="py-6 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-2xl mb-6 md:mb-10 mx-auto text-center">
            <TypeEyebrow text={t(lang, "why.eyebrow")} className="block mb-3" />
            <BlurWords
              text={t(lang, "why.title")}
              as="h2"
              className="text-balance font-serif text-[clamp(1.75rem,5.5vw,2.75rem)] leading-[1.18] text-ivory"
            />
          </div>
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
            ].map((w, i) => (
              <RevealItem key={w.en} className="reveal-card">
                <div className="surface-card card-glow h-full p-4 md:p-5 relative">
                  <span className="absolute top-3 right-3 text-[0.6rem] tracking-[0.2em] text-gold/30 font-mono">
                    0{i + 1}
                  </span>
                  <w.icon size={22} className="text-gold mb-2.5" strokeWidth={1.5} aria-hidden />
                  <h3 className="font-serif text-[1.1rem] text-ivory leading-tight">
                    {lang === "fr" ? w.fr : w.en}
                  </h3>
                  <p className="mt-1.5 text-[0.8rem] text-text-2 leading-relaxed">
                    {lang === "fr" ? w.dFr : w.dEn}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══ TOOLS TEASER ═══ */}
      <section className="py-6 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-2xl mb-4 md:mb-8 mx-auto text-center">
            <TypeEyebrow text={t(lang, "tools.eyebrow")} className="block mb-3" />
            <BlurWords
              text={t(lang, "tools.title")}
              as="h2"
              className="text-balance font-serif text-[clamp(1.75rem,5.5vw,2.75rem)] leading-[1.18] text-ivory"
            />
          </div>
          <RevealGroup className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {TOOLS.map((tool) => {
              const Icon =
                tool.id === "gift" ? Gift :
                tool.id === "size" ? Circle :
                tool.id === "chain" ? LinkIcon :
                tool.id === "status" ? Search :
                Sparkles;
              return (
                <RevealItem key={tool.id}>
                  <Link
                    href={`/${lang}/explore#${tool.id}`}
                    onClick={() => track("tool_click", { id: tool.id })}
                    className="card-glow surface-card flex flex-col h-full p-4 md:p-5 group relative overflow-hidden"
                  >
                    {/* Top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-px ${tool.status === "live" ? "bg-gold/40" : "bg-white/8"}`} />
                    <div className="flex items-start justify-between mb-3">
                      <Icon size={20} className="text-gold/80 shrink-0" strokeWidth={1.5} aria-hidden />
                      <span
                        className={
                          "text-[0.55rem] tracking-[0.14em] uppercase px-1.5 py-0.5 rounded-full " +
                          (tool.status === "live"
                            ? "bg-gold/15 text-gold border border-gold/40"
                            : "bg-white/5 text-text-3 border border-white/10")
                        }
                      >
                        {tool.status === "live" ? t(lang, "tools.live") : t(lang, "tools.preview")}
                      </span>
                    </div>
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
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ═══ VISIT BAND ═══ */}
      <section className="relative py-10 md:py-16 border-y border-(--line)">
        <div className="mx-auto max-w-5xl px-4 md:px-8 text-center">
          <ParallaxText speed={0.25} className="max-w-2xl mb-8 md:mb-12 mx-auto text-center">
            <TypeEyebrow text={t(lang, "visit.eyebrow")} className="block mb-3" />
            <BlurWords
              text={t(lang, "visit.title")}
              as="h2"
              className="text-balance font-serif text-[clamp(1.75rem,5.5vw,2.75rem)] leading-[1.18] text-ivory"
            />
            <FadeLines className="mt-4" stagger={0.08}>
              <p className="fade-line text-[0.95rem] md:text-base leading-relaxed text-text-2">
                {`${STORE.address}, ${STORE.city}, ${STORE.region} ${STORE.postal}`}
              </p>
            </FadeLines>
          </ParallaxText>
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
