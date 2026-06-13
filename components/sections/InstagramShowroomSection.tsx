"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { Eyebrow, MaskedWords } from "@/components/design-system/TextReveal";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { TiltCard } from "@/components/effects/TiltCard";
import { useModal } from "@/components/modals/ModalSystem";
import { IG_POSTS, type IGCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Heart, Upload, Link as LinkIcon } from "lucide-react";
import { ResponsiveIgImage } from "@/components/ui/ResponsiveIgImage";

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
  const { openModal } = useModal();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);

  const filtered =
    activeFilter === "all"
      ? IG_POSTS
      : IG_POSTS.filter((p) => p.cat === activeFilter);

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-ink relative overflow-hidden">
      {/* Parallax background glow */}
      <motion.div
        aria-hidden
        className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gold/[0.03] blur-[120px] pointer-events-none"
        style={{ y: bgY, willChange: "transform" }}
      />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <SectionReveal className="text-center mb-8 md:mb-12">
          <SectionReveal.Support>
            <Eyebrow text={lang === "fr" ? "Vu sur Instagram" : "Seen on Instagram"} className="mb-3" />
          </SectionReveal.Support>
          <SectionReveal.Title as="h2" className="font-serif text-[clamp(1.75rem,5vw,3rem)] text-ivory mb-4 block">
            <MaskedWords text={lang === "fr" ? "De notre Instagram à vos mains." : "From Instagram to your hands."} />
          </SectionReveal.Title>
          <SectionReveal.Body className="text-[0.95rem] text-text-2 max-w-xl mx-auto block">
            {lang === "fr"
              ? "Vous avez vu quelque chose que vous aimez ? Téléversez une capture d'écran, collez un lien ou demandez-nous des informations."
              : "Saw something you love? Upload a screenshot, paste a post link, or ask us about a piece."
            }
          </SectionReveal.Body>
        </SectionReveal>

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
                className="cursor-pointer"
              >
                <TiltCard
                  className="rounded-xl"
                  innerClassName="rounded-xl border-gold/30 group-hover:border-gold/60 overflow-hidden"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <TiltCard.Image className="absolute inset-0">
                      <ResponsiveIgImage
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        priority={i < 4}
                        objectFit="cover"
                        className="object-cover"
                      />
                    </TiltCard.Image>
                    {/* Hover overlay */}
                    <TiltCard.Info className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                      <span className="text-ivory font-serif text-[1.1rem] text-center px-4">
                        {post.title}
                      </span>
                      <span className="text-gold text-[0.8rem]">
                        {post.availability}
                      </span>
                      <button
                        onClick={() => openModal("instagram", { pieceName: post.title })}
                        className="mt-2 px-5 py-2 rounded-full bg-gold text-ink text-[0.8rem] font-medium active:scale-[0.96] transition-transform"
                      >
                        {t(lang, "ig.ask")}
                      </button>
                    </TiltCard.Info>
                    {/* Top-right badges */}
                    <div className="absolute top-2 right-2 flex gap-1.5 z-10">
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
                    <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-ink/60 border border-(--line) flex items-center justify-center text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-gold hover:border-gold/40 z-10">
                      <Heart size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* How Instagram Inquiries Work */}
        <motion.div
          className="mt-12 md:mt-16 p-6 md:p-8 rounded-2xl border border-(--line) bg-[rgba(255,255,255,0.02)]"
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "80px" }}
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
