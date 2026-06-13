"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Camera, Check, Wrench } from "lucide-react";
import { REPAIR_SERVICES, REPAIR_STEPS } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem, GoldDivider, SectionHeading } from "@/components/ui/Reveal";
import { Button, ResponsiveLabel } from "@/components/ui/Button";
import { luxeEase } from "@/lib/motion";
import { ResponsiveIgImage } from "@/components/ui/ResponsiveIgImage";

/** Before/after comparison — “before” is a desaturated treatment of the same piece (demo asset). */
function BeforeAfter({ image, lang }: { image: string; lang: Lang }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative rounded-2xl overflow-hidden border border-(--line) aspect-[4/3] select-none">
      <ResponsiveIgImage src={image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden
      >
        <ResponsiveIgImage
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale brightness-[0.55] contrast-75 sepia-[0.25]"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-px bg-gold shadow-[0_0_12px_rgba(201,168,106,0.8)] pointer-events-none"
        style={{ left: `${pos}%` }}
        aria-hidden
      />
      <span className="absolute top-3 left-3 text-[0.62rem] tracking-[0.16em] uppercase bg-ink/75 px-2.5 py-1 rounded-full text-text-2">
        {lang === "fr" ? "Avant" : "Before"}
      </span>
      <span className="absolute top-3 right-3 text-[0.62rem] tracking-[0.16em] uppercase bg-gold px-2.5 py-1 rounded-full text-ink font-medium">
        {lang === "fr" ? "Après" : "After"}
      </span>
      <input
        type="range"
        min={2}
        max={98}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={lang === "fr" ? "Comparer avant et après" : "Compare before and after"}
        className="absolute inset-x-4 bottom-3 h-11 appearance-none bg-transparent cursor-ew-resize
          [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white/20
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:-mt-2.5
          [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-white/20
          [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-ink"
      />
    </div>
  );
}

/** Animated repair tracker — each stage lights up in sequence on scroll. */
function RepairTracker({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  return (
    <motion.ol
      initial={reduce ? undefined : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
      className="grid grid-cols-1 sm:grid-cols-7 gap-2 sm:gap-0"
      aria-label={t(lang, "repairs.tracker")}
    >
      {REPAIR_STEPS.map((s, i) => (
        <motion.li
          key={s.en}
          variants={{
            hidden: { opacity: 0.25 },
            visible: { opacity: 1, transition: { duration: 0.5, ease: luxeEase } },
          }}
          className="relative flex sm:flex-col items-center gap-3 sm:gap-2.5 sm:text-center"
        >
          {/* Connector */}
          {i < REPAIR_STEPS.length - 1 && (
            <motion.span
              aria-hidden
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 0.4, ease: luxeEase } },
              }}
              className="hidden sm:block absolute top-[14px] left-[calc(50%+18px)] right-[calc(-50%+18px)] h-px bg-gradient-to-r from-gold/70 to-gold/30 origin-left"
            />
          )}
          <motion.span
            variants={{
              hidden: { scale: 0.7, borderColor: "rgba(201,168,106,0.2)" },
              visible: {
                scale: 1,
                borderColor: "rgba(201,168,106,0.9)",
                transition: { duration: 0.45, ease: luxeEase },
              },
            }}
            className="shrink-0 w-7 h-7 rounded-full border bg-ink-2 text-gold flex items-center justify-center"
          >
            <Check size={12} strokeWidth={2.2} aria-hidden />
          </motion.span>
          <span className="text-[0.78rem] text-text-2 leading-tight sm:px-1">{s[lang]}</span>
        </motion.li>
      ))}
    </motion.ol>
  );
}

export function RepairsView({ lang }: { lang: Lang }) {
  const { open } = useLeadModal();

  return (
    <>
      <PageHero
        eyebrow={t(lang, "repairs.eyebrow")}
        title={t(lang, "repairs.title")}
        sub={t(lang, "repairs.sub")}
      >
        <Button
          onClick={() => {
            track("repair_request_click", { source: "repairs_hero" });
            open("repair");
          }}
          arrow
        >
          <ResponsiveLabel short={t(lang, "repairs.ctaShort")} full={t(lang, "repairs.cta")} breakpoint="sm" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            track("repair_photos_click", { source: "repairs_hero" });
            open("repair");
          }}
        >
          <Camera size={16} aria-hidden />
          <ResponsiveLabel
            short={lang === "fr" ? "Envoyer photos" : "Send Photos"}
            full={t(lang, "repairs.photosCta")}
            breakpoint="sm"
          />
        </Button>
      </PageHero>

      {/* Common repairs */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <RevealGroup className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {REPAIR_SERVICES.map((s) => (
              <RevealItem key={s.id}>
                <button
                  onClick={() => {
                    track("repair_service_click", { id: s.id, source: "repairs_page" });
                    open("repair", { problem: lang === "fr" ? s.fr : s.en });
                  }}
                  className="card-glow w-full h-full text-left rounded-2xl border border-(--line) bg-(--surface) p-5
                    transition-all duration-300 [-webkit-tap-highlight-color:transparent]"
                >
                  <Wrench size={18} className="text-gold mb-3" strokeWidth={1.5} aria-hidden />
                  <h3 className="font-serif text-[1.15rem] text-ivory leading-tight">{s[lang]}</h3>
                  <p className="mt-1 text-[0.82rem] text-text-2 leading-snug">
                    {lang === "fr" ? s.descFr : s.descEn}
                  </p>
                  <span className="mt-3 inline-block text-[0.78rem] text-gold">
                    {lang === "fr" ? "Demander une estimation →" : "Get an estimate →"}
                  </span>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* Tracker */}
      <section className="py-12 md:py-20 bg-ink-2/60">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <SectionHeading
            eyebrow={lang === "fr" ? "Suivi" : "Tracking"}
            title={t(lang, "repairs.tracker")}
            sub={
              lang === "fr"
                ? "Chaque réparation reçoit un numéro de référence — suivez-la de la réception au ramassage."
                : "Every repair gets a reference number — follow it from drop-off to pickup."
            }
          />
          <RepairTracker lang={lang} />
          <Reveal className="mt-10 text-center">
            <p className="text-[0.82rem] text-text-3 max-w-md mx-auto leading-relaxed">
              {t(lang, "repairs.trust")}
            </p>
          </Reveal>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* Before / after */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow={lang === "fr" ? "Notre travail" : "Our work"}
            title={lang === "fr" ? "Avant / après." : "Before / after."}
            sub={
              lang === "fr"
                ? "Glissez pour voir la différence qu'un passage à l'atelier peut faire. (Démo)"
                : "Drag to see the difference a visit to the bench can make. (Demo)"
            }
          />
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <Reveal>
              <BeforeAfter image="/instagram/ig-DCsKHizO2ob.jpg" lang={lang} />
            </Reveal>
            <Reveal delay={0.1}>
              <BeforeAfter image="/instagram/ig-DSAifEiDouU.jpg" lang={lang} />
            </Reveal>
          </div>
          <Reveal className="mt-10 flex flex-col xs:flex-row justify-center gap-3 xs:gap-2.5">
            <Button
              onClick={() => {
                track("repair_request_click", { source: "repairs_gallery" });
                open("repair");
              }}
              arrow
            >
              <ResponsiveLabel short={t(lang, "repairs.ctaShort")} full={t(lang, "repairs.cta")} breakpoint="sm" />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
