"use client";

/**
 * ServiceCardShell — shared chrome for the 4 interactive service cards.
 *
 * Each card has the same outer layout: a top "moment" area where the
 * unique interactive lives, and a bottom info area with title + subcopy
 * + a "learn more" link to the relevant page. The shell keeps the
 * hover-lift language consistent with TiltCard (A4 from the motion
 * grammar plan) so the cards feel like the rest of the site.
 *
 * Important: the children render the interactive moment *themselves*.
 * The shell never sets `opacity: 0` or `whileInView` triggers, so if a
 * moment fails to mount the card is still readable. (This is the same
 * defensive pattern that fixed the disappearing-content bug — see
 * e2e/disappearing-content.spec.ts.)
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { luxeEase } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

export interface ServiceCardShellProps {
  /** "Learn more" destination, e.g. "/en/custom". */
  learnMoreHref: string;
  /** Title in the user's language. */
  title: string;
  /** One-sentence subcopy. */
  subcopy: string;
  /** Where the interactive moment lives (top 60% of the card). */
  children: React.ReactNode;
  /** Optional pre-title eyebrow (e.g. "01" or a small label). */
  eyebrow?: string;
  /** Lang for ARIA. */
  lang: Lang;
}

export function ServiceCardShell({
  learnMoreHref,
  title,
  subcopy,
  children,
  eyebrow,
  lang,
}: ServiceCardShellProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      // Animates on mount with a stagger; does NOT use whileInView so the
      // card is always visible by the time the user scrolls to it.
      // (This pattern replaced the opacity-0-stranding bug.)
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: luxeEase }}
      className="group relative overflow-hidden rounded-2xl border border-(--line) bg-[rgba(255,255,255,0.02)] hover:border-(--line-2) hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-500"
    >
      {/* Interactive moment — top 60% */}
      <div className="relative h-[220px] md:h-[240px] flex items-center justify-center overflow-hidden">
        {children}
      </div>

      {/* Info — bottom 40% */}
      <div className="relative p-5 md:p-6 border-t border-(--line)">
        {eyebrow && (
          <span className="eyebrow block mb-2 text-gold/80 text-[0.7rem] tracking-[0.16em]">
            {eyebrow}
          </span>
        )}
        <h3
          className="font-serif text-[1.15rem] md:text-[1.35rem] text-ivory mb-1.5 leading-tight"
          lang={lang}
        >
          {title}
        </h3>
        <p className="text-[0.85rem] md:text-[0.9rem] text-text-2 leading-relaxed mb-3">
          {subcopy}
        </p>
        <Link
          href={learnMoreHref}
          className="inline-flex items-center gap-1.5 text-gold text-[0.8rem] font-medium hover:text-gold-3 transition-colors"
          aria-label={`${title} — ${lang === "fr" ? "en savoir plus" : "learn more"}`}
        >
          <span>{lang === "fr" ? "En savoir plus" : "Learn more"}</span>
          <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
        </Link>
      </div>

      {/* Subtle gold rule that draws on hover (matches the rest of the site) */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
      />
    </motion.article>
  );
}
