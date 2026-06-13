"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import type { IGPost } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { luxeEase } from "@/lib/motion";
import { ResponsiveIgImage } from "@/components/ui/ResponsiveIgImage";

/**
 * Premium IG showroom card — editorial, not an embedded-feed clone.
 * Reels render vertical (9:16); posts render square.
 * "Ask About This" is always visible (never hover-only).
 */
export function IGCard({ post, lang, index = 0, priority = false }: { post: IGPost; lang: Lang; index?: number; priority?: boolean }) {
  const { open } = useLeadModal();
  const reduce = useReducedMotion();

  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: luxeEase, delay: (index % 4) * 0.06 }}
      className="card-glow card-zoom relative rounded-2xl overflow-hidden border border-(--line) bg-ink-2 group"
    >
      <a
        href={post.igUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${post.title} — Instagram`}
        onClick={() => track("ig_card_click", { code: post.code })}
        className="block relative"
      >
        <div className={post.type === "reel" ? "relative aspect-[4/5]" : "relative aspect-square"}>
          <ResponsiveIgImage
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
            objectFit="cover"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

          {/* Labels */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2">
            <span className="text-[0.62rem] tracking-[0.14em] uppercase bg-ink/70 backdrop-blur px-2 py-1 rounded-full text-text-2 border border-white/10">
              {post.availability}
            </span>
            {post.type === "reel" && (
              <span className="inline-flex items-center gap-1 text-[0.62rem] tracking-[0.14em] uppercase bg-ink/70 backdrop-blur px-2 py-1 rounded-full text-gold border border-(--line)">
                <Play size={9} fill="currentColor" aria-hidden />
                {t(lang, "ig.reel")}
              </span>
            )}
          </div>

          {post.recent && (
            <span className="absolute top-10 left-2.5 text-[0.62rem] tracking-[0.1em] uppercase bg-gold text-ink px-2 py-0.5 rounded-full font-medium">
              {t(lang, "ig.recent")}
            </span>
          )}

          {/* Caption */}
          <div className="absolute bottom-0 inset-x-0 p-3 md:p-4">
            <h3 className="font-serif text-[1rem] md:text-[1.15rem] text-ivory leading-tight">
              {post.title}
            </h3>
            <p className="hidden md:block mt-1 text-[0.75rem] text-text-2 leading-snug line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {post.caption}
            </p>
          </div>
        </div>
      </a>

      {/* Always-visible CTA — compact card button (42–48px) */}
      <div className="p-2.5 md:p-3">
        <button
          onClick={() => {
            track("ig_inquiry_click", { code: post.code });
            open("instagram", { igLink: post.igUrl, intent: "The exact piece" });
          }}
          className="btn-sheen w-full min-h-11 h-11 rounded-full border border-gold/50 text-gold
            text-[0.8rem] md:text-[0.85rem] font-medium whitespace-nowrap
            transition-all duration-300 ease-(--ease-luxe)
            hover:bg-gold/10 hover:border-gold active:scale-[0.97]
            [-webkit-tap-highlight-color:transparent]"
        >
          {t(lang, "ig.ask")}
        </button>
      </div>
    </motion.article>
  );
}
