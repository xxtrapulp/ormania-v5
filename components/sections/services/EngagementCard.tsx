"use client";

/**
 * EngagementCard — "stone → setting → metal" mini picker.
 *
 * Three horizontal pill rows. Picking an option updates a hand-drawn
 * SVG ring above: band color from metal, stone color from stone,
 * a small head/tail silhouette of the setting style. The ring
 * preview is intentionally schematic — not a real 3D render — but
 * it gives the user immediate feedback that their choices register.
 *
 * When all three are picked, a "See similar in our showroom →"
 * link appears with the three params as URL search params, so the
 * engagement page can pre-filter on arrival.
 *
 * Reduced motion: picker still works, ring updates instantly.
 */

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";

type Stone = "natural" | "lab" | "sapphire" | "emerald";
type Setting = "solitaire" | "halo" | "pave" | "bezel";
type Metal = "platinum" | "white" | "yellow" | "rose";

const STONE_COLORS: Record<Stone, string> = {
  natural: "rgba(245, 240, 220, 0.95)", // warm white
  lab: "rgba(220, 235, 245, 0.92)", // cool white
  sapphire: "rgba(60, 90, 180, 0.95)", // deep blue
  emerald: "rgba(60, 150, 100, 0.95)", // deep green
};

const METAL_COLORS: Record<Metal, string> = {
  platinum: "rgba(220, 220, 230, 1)",
  white: "rgba(230, 215, 175, 1)", // pale gold
  yellow: "rgba(220, 175, 90, 1)", // gold
  rose: "rgba(220, 150, 130, 1)",
};

const STONE_LABELS: Record<Lang, Record<Stone, string>> = {
  en: { natural: "Natural diamond", lab: "Lab-grown diamond", sapphire: "Sapphire", emerald: "Emerald" },
  fr: { natural: "Diamant naturel", lab: "Diamant de laboratoire", sapphire: "Saphir", emerald: "Émeraude" },
};

const SETTING_LABELS: Record<Lang, Record<Setting, string>> = {
  en: { solitaire: "Solitaire", halo: "Halo", pave: "Pavé", bezel: "Bezel" },
  fr: { solitaire: "Solitaire", halo: "Halo", pave: "Pavé", bezel: "Sertissure" },
};

const METAL_LABELS: Record<Lang, Record<Metal, string>> = {
  en: { platinum: "Platinum", white: "White gold", yellow: "Yellow gold", rose: "Rose gold" },
  fr: { platinum: "Platine", white: "Or blanc", yellow: "Or jaune", rose: "Or rose" },
};

export function EngagementCard({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const [stone, setStone] = useState<Stone | null>(null);
  const [setting, setSetting] = useState<Setting | null>(null);
  const [metal, setMetal] = useState<Metal | null>(null);

  const ready = stone && setting && metal;

  const stoneColor = stone ? STONE_COLORS[stone] : "rgba(160, 160, 160, 0.5)";
  const metalColor = metal ? METAL_COLORS[metal] : "rgba(160, 160, 160, 0.5)";

  return (
    <div className="w-full h-full flex flex-col items-stretch justify-center px-3 md:px-5 py-2 gap-2">
      {/* Ring preview — top, compact */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <svg viewBox="0 0 100 70" width="100" height="70" aria-label="Ring preview" role="img">
          {/* Band */}
          <ellipse
            cx="50"
            cy="50"
            rx="30"
            ry="22"
            fill="none"
            stroke={metalColor}
            strokeWidth="3"
            className="transition-[stroke] duration-300"
          />
          {/* Setting decoration depends on setting */}
          {setting === "halo" && (
            <circle cx="50" cy="22" r="11" fill="none" stroke={metalColor} strokeWidth="1.5" />
          )}
          {setting === "pave" && (
            <>
              <circle cx="44" cy="22" r="1.5" fill={metalColor} />
              <circle cx="50" cy="19" r="1.5" fill={metalColor} />
              <circle cx="56" cy="22" r="1.5" fill={metalColor} />
            </>
          )}
          {setting === "bezel" && (
            <circle cx="50" cy="22" r="7" fill="none" stroke={metalColor} strokeWidth="1.5" />
          )}
          {/* Center stone */}
          <motion.circle
            cx="50"
            cy="22"
            r={setting === "halo" ? 6 : setting === "bezel" ? 5 : 5}
            fill={stoneColor}
            initial={false}
            animate={{ fill: stoneColor }}
            transition={{ duration: reduce ? 0 : 0.3 }}
          />
        </svg>
      </div>

      {/* Three pill rows — tight, single-line labels */}
      <PillRow
        label={lang === "fr" ? "Pierre" : "Stone"}
        options={(["natural", "lab", "sapphire", "emerald"] as const)}
        selected={stone}
        onSelect={setStone}
        labels={STONE_LABELS[lang]}
        lang={lang}
      />
      <PillRow
        label={lang === "fr" ? "Sertissure" : "Setting"}
        options={(["solitaire", "halo", "pave", "bezel"] as const)}
        selected={setting}
        onSelect={setSetting}
        labels={SETTING_LABELS[lang]}
        lang={lang}
      />
      <PillRow
        label={lang === "fr" ? "Métal" : "Metal"}
        options={(["platinum", "white", "yellow", "rose"] as const)}
        selected={metal}
        onSelect={setMetal}
        labels={METAL_LABELS[lang]}
        lang={lang}
      />

      {/* "See similar" link, fades in when all three are picked */}
      {ready && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center pt-1"
        >
          <Link
            href={`/${lang}/engagement?stone=${stone}&setting=${setting}&metal=${metal}`}
            className="inline-flex items-center gap-1 text-gold text-[0.75rem] font-medium hover:text-gold-3 transition-colors"
          >
            <span>
              {lang === "fr"
                ? "Voir des pièces similaires"
                : "See similar in our showroom"}
            </span>
            <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden />
          </Link>
        </motion.div>
      )}
    </div>
  );
}

interface PillRowProps<T extends string> {
  label: string;
  options: readonly T[];
  selected: T | null;
  onSelect: (v: T) => void;
  labels: Record<T, string>;
  lang: Lang;
}

function PillRow<T extends string>({
  label,
  options,
  selected,
  onSelect,
  labels,
  lang,
}: PillRowProps<T>) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[0.6rem] tracking-[0.14em] uppercase text-text-3 shrink-0 w-12">
        {label}
      </span>
      <div className="flex flex-wrap gap-1 flex-1">
        {options.map((opt) => {
          const active = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              aria-pressed={active}
              lang={lang}
              className={`px-2 py-0.5 rounded-full border text-[0.68rem] transition-colors duration-200 ${
                active
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-(--line) text-text-2 hover:border-gold/40 hover:text-ivory"
              }`}
            >
              {labels[opt]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
