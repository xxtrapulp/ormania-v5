"use client";

/**
 * GiftCurationCard — "Who is it for?" 1-question teaser.
 *
 * Three pills (Partner / Parent / Friend) with a soft prompt. Picking
 * one reveals a short suggestion line and a "See suggestions →" link
 * that routes to the existing GiftFinder on the explore page with the
 * answer pre-applied. No new quiz engine — just a friendly on-ramp
 * into the page they already have.
 *
 * Reduced motion: reveal still works, no animation.
 */

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";

type Recipient = "partner" | "parent" | "friend";

const RECIPIENT_LABELS: Record<Lang, Record<Recipient, string>> = {
  en: { partner: "Partner", parent: "Parent", friend: "Friend" },
  fr: { partner: "Partenaire", parent: "Parent", friend: "Ami·e" },
};

const SUGGESTIONS: Record<Lang, Record<Recipient, string>> = {
  en: {
    partner: "For a partner, a piece that becomes a ritual.",
    parent: "For a parent, something she can wear every day.",
    friend: "For a friend, the gift that says 'I thought of you'.",
  },
  fr: {
    partner: "Pour un partenaire, une pièce qui devient un rituel.",
    parent: "Pour un parent, quelque chose qu'elle portera chaque jour.",
    friend: "Pour un ami·e, le cadeau qui dit 'j'ai pensé à vous'.",
  },
};

const QUERY: Record<Recipient, string> = {
  partner: "partner",
  parent: "parent",
  friend: "friend",
};

export function GiftCurationCard({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const [pick, setPick] = useState<Recipient | null>(null);

  return (
    <div className="w-full h-full flex flex-col items-stretch justify-center px-5 md:px-6 py-4 gap-3">
      <p className="text-[0.78rem] tracking-[0.14em] uppercase text-text-3 text-center">
        {lang === "fr" ? "Pour qui est-ce ?" : "Who is it for?"}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {(["partner", "parent", "friend"] as const).map((r) => {
          const active = pick === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setPick(r)}
              aria-pressed={active}
              lang={lang}
              className={`min-h-9 px-3.5 rounded-full border text-[0.8rem] transition-colors duration-200 ${
                active
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-(--line) text-text-2 hover:border-gold/40 hover:text-ivory"
              }`}
            >
              {RECIPIENT_LABELS[lang][r]}
            </button>
          );
        })}
      </div>

      {pick ? (
        <motion.div
          key={pick}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center pt-1 flex flex-col items-center gap-2"
        >
          <p className="text-[0.82rem] text-ivory/90 italic leading-snug max-w-[20ch]">
            {SUGGESTIONS[lang][pick]}
          </p>
          <Link
            href={`/${lang}/explore#quiz?for=${QUERY[pick]}`}
            className="inline-flex items-center gap-1 text-gold text-[0.78rem] font-medium hover:text-gold-3 transition-colors"
          >
            <span>
              {lang === "fr" ? "Voir les suggestions" : "See suggestions"}
            </span>
            <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden />
          </Link>
        </motion.div>
      ) : (
        <p className="text-[0.78rem] text-text-3 text-center italic">
          {lang === "fr"
            ? "On s'occupe du reste."
            : "We'll take it from here."}
        </p>
      )}
    </div>
  );
}
