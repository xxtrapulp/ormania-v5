"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { Eyebrow, MaskedWords } from "@/components/design-system/TextReveal";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { IG_POSTS, type IGCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Heart, Upload, Link as LinkIcon } from "lucide-react";

const FILTERS: { key: IGCategory; labelEn: string; labelFr: string }[] = [
  { key: "all", labelEn: "All", labelFr: "Tout" },
  { key: "rings", labelEn: "Rings", labelFr: "Bagues" },
  { key: "chains", labelEn: "Necklaces", labelFr: "Colliers" },
  { key: "bracelets", labelEn: "Bracelets", labelFr: "Bracelets" },
  { key: "watches", labelEn: "Watches", labelFr: "Montres" },
  { key: "engagement", labelEn: "Engagement", labelFr: "Fiançailles" },
  { key: "custom", labelEn: "Custom", labelFr: "Sur mesure" },
];

export function InstagramShowroomSection({ lang }: { lang: Lang }) {
  const [activeFilter, setActiveFilter] = useState<IGCategory>("all");
  const reduce = useReducedMotion();
  const { ref, isInView } = useScrollReveal();

  const filtered =
    activeFilter === "all"
      ? IG_POSTS
      : IG_POSTS.filter((p) => p.cat === activeFilter);

  return (
    <section className="py-16 md:py-28 bg-ink relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <Eyebrow text={lang === "fr" ? "Vu sur Instagram" : "Seen on Instagram"} className="mb-3" />
          <h2 className="font-serif text-[clamp(1.75rem,5vw,3rem)] text-ivory mb-4">
            <MaskedWords text={lang === "fr" ? "De notre Instagram à vos mains." : "From Instagram to your hands."} />
          </h2>
          <p className="text-[0.95rem] text-text-2 max-w-xl mx-auto">
            {lang === "fr"
              ? "Vous avez vu quelque chose que vous aimez ? Téléversez une capture d'écran, collez un lien ou demandez-nous des informations."
              : "Saw something you love? Upload a screenshot, paste a post link, or ask us about a piece."
            }
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                "px-4 py-2 rounded-full text-[0.8rem] font-medium tracking-wide transition-all duration-300 border",
                activeFilter === f.key
                  ? "bg-gold text-ink border-gold"
                  : "bg-transparent text-text-2 border-(--line) hover:border-(--line-2) hover:text-ivory"
              )}
            >
              {lang === "fr" ? f.labelFr : f.labelEn}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div ref={ref} className="ig-masonry">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <motion.div
                key={post.code}
                layout
                initial={reduce ? undefined : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 0.61, 0.36, 1] }}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    <span className="text-ivory font-serif text-[1.1rem] text-center px-4">
                      {post.title}
                    </span>
                    <span className="text-gold text-[0.8rem]">
                      {post.availability}
                    </span>
                    <button className="mt-2 px-5 py-2 rounded-full bg-gold text-ink text-[0.8rem] font-medium active:scale-[0.96] transition-transform">
                      {t(lang, "ig.ask")}
                    </button>
                  </div>
                  {/* Top-right badges */}
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    {post.recent && (
                      <span className="px-2 py-0.5 rounded-full bg-gold/90 text-ink text-[0.65rem] font-medium">
                        {t(lang, "ig.recent")}
                      </span>
                    )}
                    {post.type === "reel" && (
                      <span className="px-2 py-0.5 rounded-full bg-ink/80 text-ivory text-[0.65rem] font-medium border border-(--line)">
                        {t(lang, "ig.reel")}
                      </span>
                    )}
                  </div>
                  {/* Bottom save button */}
                  <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-ink/60 border border-(--line) flex items-center justify-center text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-gold hover:border-gold/40">
                    <Heart size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* How Instagram Inquiries Work */}
        <motion.div
          className="mt-12 md:mt-16 p-6 md:p-8 rounded-2xl border border-(--line) bg-[rgba(255,255,255,0.02)]"
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <h3 className="font-serif text-[1.15rem] md:text-[1.35rem] text-ivory text-center mb-6">
            {lang === "fr" ? "Comment fonctionnent les demandes Instagram" : "How Instagram Inquiries Work"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Upload,
                step: "1",
                title: { en: "Screenshot a piece", fr: "Capturez une pièce" },
                desc: { en: "Find a piece you love on Ormania's Instagram and take a screenshot.", fr: "Trouvez une pièce que vous aimez sur Instagram d'Ormania et faites une capture." },
              },
              {
                icon: LinkIcon,
                step: "2",
                title: { en: "Upload or paste link", fr: "Téléversez ou collez le lien" },
                desc: { en: "Upload your screenshot here or paste the post/reel link.", fr: "Téléversez votre capture ici ou collez le lien de la publication/réel." },
              },
              {
                icon: Heart,
                step: "3",
                title: { en: "Ormania responds", fr: "Ormania répond" },
                desc: { en: "We'll contact you with availability or similar options.", fr: "Nous vous contacterons avec la disponibilité ou des options similaires." },
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="shrink-0 w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold font-serif">
                    {item.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={14} strokeWidth={1.5} className="text-gold/70" />
                      <h4 className="font-serif text-[1rem] text-ivory">{item.title[lang]}</h4>
                    </div>
                    <p className="text-[0.85rem] text-text-2 leading-relaxed">{item.desc[lang]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
