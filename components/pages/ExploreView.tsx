"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Gift, Ruler, Search, Sparkles } from "lucide-react";
import { IG_POSTS, TOOLS, type IGCategory } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";
import { getLeads, LEAD_STATUSES } from "@/lib/store";
import { track } from "@/lib/analytics";
import { PageHero } from "@/components/ui/PageHero";
import { GoldDivider } from "@/components/ui/Reveal";
import { luxeEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full min-h-12 px-4 rounded-xl bg-(--surface) border border-(--line) text-ivory text-[16px] " +
  "placeholder:text-text-3 transition-all duration-300 focus:border-gold/60 " +
  "focus:shadow-[0_0_0_3px_rgba(201,168,106,0.15)] focus:outline-none";

const pillCls = (active: boolean) =>
  cn(
    "min-h-11 px-4 rounded-full border text-[0.85rem] whitespace-nowrap transition-all duration-300",
    "active:scale-[0.96] [-webkit-tap-highlight-color:transparent]",
    active
      ? "border-gold bg-gold/15 text-gold"
      : "border-(--line) text-text-2 hover:border-gold/40 hover:text-ivory"
  );

/* ── Gift Finder Quiz ── */
function Q({
  label,
  options,
  value,
  set,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  set: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <p className="text-[0.85rem] text-text-2 font-medium mb-2.5">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o.id} onClick={() => set(o.id)} className={pillCls(value === o.id)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function GiftFinder({ lang }: { lang: Lang }) {
  const [who, setWho] = useState("");
  const [cat, setCat] = useState<IGCategory | "">("");
  const [budget, setBudget] = useState("");
  const done = who && cat && budget;
  const picks = done ? IG_POSTS.filter((p) => p.cat === cat).slice(0, 3) : [];

  return (
    <div>
      <Q
        label={lang === "fr" ? "1. Pour qui ?" : "1. Who is it for?"}
        value={who}
        set={setWho}
        options={[
          { id: "her", label: lang === "fr" ? "Pour elle" : "For her" },
          { id: "him", label: lang === "fr" ? "Pour lui" : "For him" },
          { id: "couple", label: lang === "fr" ? "Pour nous" : "For us" },
        ]}
      />
      <Q
        label={lang === "fr" ? "2. Quel style ?" : "2. What kind of piece?"}
        value={cat}
        set={(v) => setCat(v as IGCategory)}
        options={[
          { id: "chains", label: lang === "fr" ? "Chaîne" : "Chain" },
          { id: "bracelets", label: "Bracelet" },
          { id: "rings", label: lang === "fr" ? "Bague" : "Ring" },
          { id: "watches", label: lang === "fr" ? "Montre" : "Watch" },
        ]}
      />
      <Q
        label={lang === "fr" ? "3. Quel budget ?" : "3. What budget?"}
        value={budget}
        set={setBudget}
        options={[
          { id: "low", label: lang === "fr" ? "Moins de 500 $" : "Under $500" },
          { id: "mid", label: "$500 – $1,500" },
          { id: "high", label: "$1,500+" },
        ]}
      />

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: luxeEase }}
          >
            <p className="eyebrow mb-3">{lang === "fr" ? "Nos suggestions" : "Our picks"}</p>
            <div className="grid grid-cols-3 gap-2.5">
              {picks.map((p) => (
                <Link
                  key={p.code}
                  href={`/${lang}/product/${p.code}`}
                  onClick={() => track("gift_quiz_pick_click", { code: p.code })}
                  className="card-glow card-zoom relative rounded-xl overflow-hidden border border-(--line) aspect-[4/5]"
                >
                  <Image src={p.image} alt={p.title} fill sizes="33vw" loading="lazy" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <span className="absolute bottom-2 left-2 right-2 font-serif text-[0.8rem] text-ivory leading-tight">
                    {p.title}
                  </span>
                </Link>
              ))}
            </div>
            {picks.length === 0 && (
              <p className="text-text-3 text-[0.85rem]">
                {lang === "fr"
                  ? "Venez en boutique — nous avons plus de choix que notre fil Instagram."
                  : "Come see us in store — we carry more than our Instagram feed shows."}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Ring Size Guide ── */
const RING_SIZES = [
  ["5", "15.7"], ["5.5", "16.1"], ["6", "16.5"], ["6.5", "16.9"],
  ["7", "17.3"], ["7.5", "17.7"], ["8", "18.1"], ["8.5", "18.5"],
  ["9", "19.0"], ["10", "19.8"], ["11", "20.6"], ["12", "21.4"],
];

function RingSizeGuide({ lang }: { lang: Lang }) {
  return (
    <div>
      <div className="grid grid-cols-4 xs:grid-cols-6 gap-2 mb-4">
        {RING_SIZES.map(([size, mm]) => (
          <div key={size} className="surface-card text-center py-2.5 px-1">
            <span className="block font-serif text-[1.1rem] text-gold">{size}</span>
            <span className="block text-[0.65rem] text-text-3">{mm} mm</span>
          </div>
        ))}
      </div>
      <p className="text-[0.78rem] text-text-3 leading-relaxed">
        {lang === "fr"
          ? "Mesurez le diamètre intérieur d'une bague existante. En doute ? Passez en boutique — la mesure est gratuite et prend 30 secondes."
          : "Measure the inside diameter of a ring that already fits. Unsure? Drop by — sizing is free and takes 30 seconds."}
      </p>
    </div>
  );
}

/* ── Chain Length Visualizer ── */
const CHAIN_LENGTHS = [
  { len: 16, y: 64 }, { len: 18, y: 78 }, { len: 20, y: 92 },
  { len: 22, y: 106 }, { len: 24, y: 122 },
];

function ChainVisualizer({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(20);
  return (
    <div className="flex flex-col sm:flex-row gap-5 items-center">
      <svg viewBox="0 0 120 160" className="w-36 shrink-0" role="img"
        aria-label={lang === "fr" ? "Longueurs de chaîne sur un buste" : "Chain lengths on a silhouette"}>
        {/* Silhouette */}
        <path
          d="M60 8c-10 0-17 8-17 18 0 7 3 13 8 16-2 9-9 13-21 18-10 4-16 10-16 22v70h92V82c0-12-6-18-16-22-12-5-19-9-21-18 5-3 8-9 8-16 0-10-7-18-17-18z"
          fill="rgba(248,244,235,0.07)"
        />
        {CHAIN_LENGTHS.map((c) => (
          <g key={c.len}>
            <path
              d={`M38 50 Q60 ${c.y} 82 50`}
              fill="none"
              stroke={active === c.len ? "#C9A86A" : "rgba(201,168,106,0.25)"}
              strokeWidth={active === c.len ? 2 : 1}
              className="transition-all duration-300"
            />
          </g>
        ))}
      </svg>
      <div className="flex sm:flex-col flex-wrap gap-2">
        {CHAIN_LENGTHS.map((c) => (
          <button key={c.len} onClick={() => setActive(c.len)} className={pillCls(active === c.len)}>
            {c.len}&Prime;
            <span className="text-text-3 ml-1.5 text-[0.7rem]">{Math.round(c.len * 2.54)} cm</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Repair Status Lookup (live) ── */
function StatusLookup({ lang }: { lang: Lang }) {
  const [ref, setRef] = useState("");
  const [result, setResult] = useState<{ status: string; date: string } | "none" | null>(null);

  const lookup = () => {
    track("repair_status_lookup", {});
    const lead = getLeads().find((l) => l.id.toLowerCase() === ref.trim().toLowerCase());
    if (!lead) return setResult("none");
    const st = LEAD_STATUSES.find((s) => s.id === lead.status);
    setResult({
      status: lang === "fr" ? st?.labelFr ?? lead.status : st?.label ?? lead.status,
      date: new Date(lead.updatedAt).toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA"),
    });
  };

  return (
    <div>
      <form
        className="flex flex-col xs:flex-row gap-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          lookup();
        }}
      >
        <label className="flex-1">
          <span className="sr-only">{lang === "fr" ? "Numéro de référence" : "Reference number"}</span>
          <input
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="ORM-RE-XXXXX"
            className={inputCls}
          />
        </label>
        <button
          type="submit"
          className="btn-sheen min-h-12 px-6 rounded-full bg-gold text-ink text-[0.875rem] font-medium
            whitespace-nowrap transition-all duration-300 hover:bg-gold-3 active:scale-[0.97]"
        >
          <Search size={15} className="inline mr-1.5 -mt-0.5" aria-hidden />
          {lang === "fr" ? "Vérifier" : "Check"}
        </button>
      </form>
      {result && (
        <div className="mt-4 surface-card p-4" role="status">
          {result === "none" ? (
            <p className="text-[0.875rem] text-text-2">
              {lang === "fr"
                ? "Référence introuvable — vérifiez le numéro ou appelez-nous."
                : "Reference not found — double-check the number or give us a call."}
            </p>
          ) : (
            <p className="text-[0.95rem] text-ivory">
              <span className="text-gold font-medium">{result.status}</span>
              <span className="text-text-3 text-[0.8rem] ml-2">
                {lang === "fr" ? "mis à jour le" : "updated"} {result.date}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Care Guide ── */
function CareGuide({ lang }: { lang: Lang }) {
  const tips =
    lang === "fr"
      ? [
          "L'or : eau tiède, savon doux, brosse souple. Séchez bien.",
          "Diamants : évitez crèmes et parfums directement sur la pierre.",
          "Perles : dernier bijou mis, premier retiré. Jamais d'ultrasons.",
          "Argent : pochette anti-ternissement quand vous ne le portez pas.",
          "Une fois par année : inspection gratuite des sertis en boutique.",
        ]
      : [
          "Gold: warm water, mild soap, soft brush. Dry thoroughly.",
          "Diamonds: keep lotions and perfume off the stone.",
          "Pearls: last thing on, first thing off. Never ultrasonic.",
          "Silver: anti-tarnish pouch when you're not wearing it.",
          "Once a year: free setting inspection in store.",
        ];
  return (
    <ul className="flex flex-col gap-2.5">
      {tips.map((tip) => (
        <li key={tip} className="flex gap-3 text-[0.875rem] text-text-2 leading-relaxed">
          <Sparkles size={14} className="text-gold shrink-0 mt-1" aria-hidden />
          {tip}
        </li>
      ))}
    </ul>
  );
}

/* ── Page ── */
export function ExploreView({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const toolMeta: Record<string, { icon: React.ReactNode; body: React.ReactNode }> = {
    gift: { icon: <Gift size={18} aria-hidden />, body: <GiftFinder lang={lang} /> },
    size: { icon: <Ruler size={18} aria-hidden />, body: <RingSizeGuide lang={lang} /> },
    chain: { icon: <Sparkles size={18} aria-hidden />, body: <ChainVisualizer lang={lang} /> },
    status: { icon: <Search size={18} aria-hidden />, body: <StatusLookup lang={lang} /> },
    care: { icon: <Sparkles size={18} aria-hidden />, body: <CareGuide lang={lang} /> },
  };

  return (
    <>
      <PageHero
        eyebrow={t(lang, "tools.eyebrow")}
        title={t(lang, "tools.title")}
        sub={
          lang === "fr"
            ? "Des outils interactifs pour choisir, mesurer et suivre — la base de la future plateforme Ormania."
            : "Interactive helpers to choose, measure, and track — the start of the future Ormania platform."
        }
      />

      <section className="pb-16 md:pb-28">
        <div className="mx-auto max-w-4xl px-4 md:px-8 flex flex-col gap-6 md:gap-9">
          {TOOLS.map((tool, i) => (
            <motion.section
              key={tool.id}
              id={tool.id}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: luxeEase, delay: (i % 2) * 0.06 }}
              className="surface-card card-glow p-5 md:p-8 scroll-mt-28"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full border border-gold/40 text-gold flex items-center justify-center shrink-0">
                    {toolMeta[tool.id].icon}
                  </span>
                  <div>
                    <h2 className="font-serif text-[1.35rem] text-ivory leading-tight">{tool[lang]}</h2>
                    <p className="text-[0.8rem] text-text-3">{lang === "fr" ? tool.descFr : tool.descEn}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "shrink-0 text-[0.6rem] tracking-[0.14em] uppercase px-2 py-1 rounded-full",
                    tool.status === "live"
                      ? "bg-gold/15 text-gold border border-gold/40"
                      : "bg-white/5 text-text-3 border border-white/10"
                  )}
                >
                  {tool.status === "live" ? t(lang, "tools.live") : t(lang, "tools.preview")}
                </span>
              </div>
              {toolMeta[tool.id].body}
            </motion.section>
          ))}
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl mb-16" />
    </>
  );
}
