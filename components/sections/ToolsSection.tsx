"use client";

import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/design-system/TextReveal";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { useModal } from "@/components/modals/ModalSystem";
import { GlassCard } from "@/components/design-system/GlassCard";
import {
  Gift,
  Ruler,
  Link2,
  Search,
  BookOpen,
  Calendar,
  Sparkles,
  Clock,
  Watch,
  Droplets,
} from "lucide-react";

const TOOLS = [
  { icon: Gift, titleEn: "Gift Finder", titleFr: "Trouver un cadeau", status: "live" },
  { icon: Ruler, titleEn: "Ring Size Guide", titleFr: "Guide des tailles", status: "live" },
  { icon: Link2, titleEn: "Chain Length", titleFr: "Longueur de chaîne", status: "live" },
  { icon: Search, titleEn: "Repair Status", titleFr: "Statut de réparation", status: "preview" },
  { icon: BookOpen, titleEn: "Care Guide", titleFr: "Guide d'entretien", status: "live" },
  { icon: Calendar, titleEn: "Occasion Finder", titleFr: "Trouver l'occasion", status: "soon" },
  { icon: Sparkles, titleEn: "Style Finder", titleFr: "Trouver le style", status: "soon" },
  { icon: Clock, titleEn: "Gold Care Reminder", titleFr: "Rappel d'entretien", status: "soon" },
  { icon: Watch, titleEn: "Battery Reminder", titleFr: "Rappel de pile", status: "soon" },
  { icon: Droplets, titleEn: "Cleaning Reminder", titleFr: "Rappel de nettoyage", status: "soon" },
] as const;

const STATUS_LABELS = {
  live: { en: "Live", fr: "En ligne", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  preview: { en: "Preview", fr: "Aperçu", color: "bg-gold/10 text-gold border-gold/30" },
  soon: { en: "Soon", fr: "Bientôt", color: "bg-text-3/10 text-text-3 border-text-3/20" },
} as const;

export function ToolsSection({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const { ref, isInView } = useScrollReveal();
  const router = useRouter();
  const { openModal } = useModal();

  return (
    <section className="py-16 md:py-28 bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <Eyebrow text={lang === "fr" ? "Outils et guides" : "Tools & Guides"} className="mb-3" />
          <h2 className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] text-ivory">
            {lang === "fr" ? "Petits outils, grandes décisions." : "Little helpers, big decisions."}
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            const status = STATUS_LABELS[tool.status];
            return (
              <motion.div
                key={tool.titleEn}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <GlassCard
                  onClick={() => {
                    if (tool.status === "soon") return;
                    router.push(`/${lang}/explore`);
                  }}
                  className={`p-4 md:p-5 h-full flex flex-col items-center text-center group hover:shadow-[0_0_30px_rgba(201,168,106,0.08)] ${tool.status === "soon" ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold mb-3 group-hover:bg-gold/10 transition-colors">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-[0.85rem] md:text-[0.95rem] text-ivory mb-2">
                    {lang === "fr" ? tool.titleFr : tool.titleEn}
                  </h3>
                  <span className={cn("px-2 py-0.5 rounded-full text-[0.65rem] font-medium border", status.color)}>
                    {lang === "fr" ? status.fr : status.en}
                  </span>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
