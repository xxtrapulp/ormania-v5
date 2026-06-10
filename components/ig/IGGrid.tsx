"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Camera, Link2 } from "lucide-react";
import { IG_POSTS, IG_CATEGORIES, type IGCategory } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { IGCard } from "./IGCard";
import { cn } from "@/lib/utils";

export function IGGrid({
  lang,
  limit,
  showFilters = true,
  showCtas = true,
}: {
  lang: Lang;
  limit?: number;
  showFilters?: boolean;
  showCtas?: boolean;
}) {
  const [cat, setCat] = useState<IGCategory>("all");
  const { open } = useLeadModal();

  const posts = IG_POSTS.filter((p) => cat === "all" || p.cat === cat).slice(
    0,
    limit ?? IG_POSTS.length
  );

  return (
    <div>
      {showFilters && (
        <div
          className="flex gap-2 overflow-x-auto pb-3 mb-5 md:mb-8 md:flex-wrap md:justify-center md:overflow-visible
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1"
          role="tablist"
          aria-label={lang === "fr" ? "Filtrer par catégorie" : "Filter by category"}
        >
          {IG_CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              onClick={() => {
                setCat(c.id);
                track("ig_filter_click", { category: c.id });
              }}
              className={cn(
                "shrink-0 min-h-11 px-4 rounded-full border text-[0.82rem] whitespace-nowrap",
                "transition-all duration-300 ease-(--ease-luxe) active:scale-[0.96]",
                "[-webkit-tap-highlight-color:transparent]",
                cat === c.id
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-(--line) text-text-2 hover:border-gold/40 hover:text-ivory"
              )}
            >
              {c[lang]}
            </button>
          ))}
        </div>
      )}

      <div className="ig-masonry">
        <AnimatePresence mode="popLayout">
          {posts.map((p, i) => (
            <IGCard key={p.code} post={p} lang={lang} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {showCtas && (
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            onClick={() => {
              track("ig_upload_cta_click");
              open("instagram");
            }}
            className="btn-sheen inline-flex items-center justify-center gap-2 rounded-full
              h-(--btn-h) px-(--btn-px) text-(length:--btn-fs) font-medium whitespace-nowrap
              bg-gold text-ink transition-all duration-300 hover:bg-gold-3 hover:-translate-y-px
              active:scale-[0.97] [-webkit-tap-highlight-color:transparent]"
          >
            <Camera size={17} strokeWidth={1.7} aria-hidden />
            {t(lang, "ig.uploadCta")}
          </button>
          <button
            onClick={() => {
              track("ig_link_cta_click");
              open("instagram");
            }}
            className="btn-sheen inline-flex items-center justify-center gap-2 rounded-full
              h-(--btn-h) px-(--btn-px) text-(length:--btn-fs) font-medium whitespace-nowrap
              border border-gold/60 text-ivory transition-all duration-300
              hover:bg-gold/10 hover:border-gold active:scale-[0.97]
              [-webkit-tap-highlight-color:transparent]"
          >
            <Link2 size={17} strokeWidth={1.7} aria-hidden />
            {t(lang, "ig.linkCta")}
          </button>
        </div>
      )}
    </div>
  );
}
