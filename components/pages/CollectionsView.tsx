"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { COLLECTIONS, IG_POSTS, type IGCategory } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BlurWords, FadeLines, TypeEyebrow } from "@/components/effects/TextReveal";
import { ParallaxText } from "@/components/effects/ParallaxText";
import { luxeEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function CollectionsView({ lang }: { lang: Lang }) {
  const [cat, setCat] = useState<IGCategory>("all");
  const [q, setQ] = useState("");
  const { open } = useLeadModal();
  const reduce = useReducedMotion();

  const items = IG_POSTS.filter((p) => {
    if (cat !== "all" && p.cat !== cat) return false;
    if (q && !`${p.title} ${p.caption}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <PageHero
        eyebrow={t(lang, "collections.eyebrow")}
        title={t(lang, "collections.title")}
        sub={t(lang, "collections.sub")}
      />

      <section className="pb-16 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <ParallaxText speed={0.25} className="max-w-2xl mb-10 md:mb-16 mx-auto text-center">
            <TypeEyebrow text={t(lang, "collections.eyebrow")} className="block mb-3" />
            <BlurWords
              text={t(lang, "collections.title")}
              className="text-balance font-serif text-[clamp(1.75rem,5.5vw,2.75rem)] leading-[1.12] text-ivory"
            />
            <FadeLines className="mt-4" stagger={0.08}>
              <p className="fade-line text-[0.95rem] md:text-base leading-relaxed text-text-2">
                {t(lang, "collections.sub")}
              </p>
            </FadeLines>
          </ParallaxText>

          {/* Search + filter row */}
          <Reveal>
            <div className="flex flex-col md:flex-row gap-3 md:items-center mb-7 md:mb-10">
            <label className="relative md:max-w-xs w-full">
              <span className="sr-only">{lang === "fr" ? "Rechercher" : "Search"}</span>
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-3 pointer-events-none"
                aria-hidden
              />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={lang === "fr" ? "Rechercher une pièce…" : "Search pieces…"}
                className="w-full min-h-12 pl-10 pr-4 rounded-full bg-(--surface) border border-(--line)
                  text-ivory text-[16px] placeholder:text-text-3 transition-all duration-300
                  focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(201,168,106,0.15)] focus:outline-none"
              />
            </label>
            <div
              className="flex gap-2 overflow-x-auto pb-1 md:pb-0 md:flex-wrap
                [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label={lang === "fr" ? "Filtrer par collection" : "Filter by collection"}
            >
              {[{ id: "all" as IGCategory, en: "All", fr: "Tout" }, ...COLLECTIONS.map((c) => ({ id: c.id as IGCategory, en: c.en, fr: c.fr }))].map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={cat === c.id}
                  onClick={() => {
                    setCat(c.id);
                    track("collection_filter_click", { category: c.id });
                  }}
                  className={cn(
                    "shrink-0 min-h-11 px-4 rounded-full border text-[0.82rem] whitespace-nowrap",
                    "transition-all duration-300 active:scale-[0.96] [-webkit-tap-highlight-color:transparent]",
                    cat === c.id
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-(--line) text-text-2 hover:border-gold/40 hover:text-ivory"
                  )}
                >
                  {lang === "fr" ? c.fr : c.en}
                </button>
              ))}
            </div>
            </div>
          </Reveal>

          {/* Product grid */}
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
            <AnimatePresence mode="popLayout">
              {items.map((p, i) => (
                <motion.article
                  key={p.code}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: luxeEase, delay: (i % 4) * 0.05 }}
                  className="card-glow card-zoom rounded-2xl overflow-hidden border border-(--line) bg-ink-2 flex flex-col"
                >
                  <Link
                    href={`/${lang}/product/${p.code}`}
                    onClick={() => track("product_card_click", { code: p.code })}
                    className="block relative aspect-[4/5]"
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      loading="lazy"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <span className="absolute top-2.5 left-2.5 text-[0.62rem] tracking-[0.14em] uppercase bg-ink/70 backdrop-blur px-2 py-1 rounded-full text-text-2 border border-white/10">
                      {p.availability}
                    </span>
                    <div className="absolute bottom-0 inset-x-0 p-3 md:p-4">
                      <h3 className="font-serif text-[1rem] md:text-[1.15rem] text-ivory leading-tight">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                  <div className="p-2.5 md:p-3 mt-auto">
                    <button
                      onClick={() => {
                        track("product_inquiry_click", { code: p.code });
                        open("product", { piece: p.title });
                      }}
                      className="btn-sheen w-full min-h-11 h-11 rounded-full border border-gold/50 text-gold
                        text-[0.8rem] md:text-[0.85rem] font-medium whitespace-nowrap
                        transition-all duration-300 hover:bg-gold/10 hover:border-gold active:scale-[0.97]
                        [-webkit-tap-highlight-color:transparent]"
                    >
                      {t(lang, "ig.ask")}
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {items.length === 0 && (
            <p className="text-center text-text-3 py-16">
              {lang === "fr"
                ? "Aucune pièce trouvée — essayez un autre filtre, ou demandez-nous directement."
                : "No pieces found — try another filter, or just ask us directly."}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
