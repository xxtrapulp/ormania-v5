"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MapPin, CalendarDays } from "lucide-react";
import { IgIcon } from "@/components/ui/icons";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { STORE } from "@/lib/data";
import { ResponsiveLabel } from "@/components/ui/Button";

/**
 * Mobile sticky bottom action bar — 4 equal-width actions,
 * 44px+ tap targets, safe-area padding, gold top border,
 * tap scale 0.96, short labels under 390px.
 */
export function StickyBar({ lang }: { lang: Lang }) {
  const itemCls =
    "flex flex-col items-center justify-center gap-1 min-h-11 py-1.5 rounded-xl " +
    "text-text-2 transition-all duration-300 ease-(--ease-luxe) " +
    "active:scale-[0.96] active:text-gold active:bg-gold/10 " +
    "[-webkit-tap-highlight-color:transparent]";
  const labelCls =
    "text-(length:--mab-label) font-medium tracking-[0.06em] whitespace-nowrap leading-none";
  const iconCls = "w-(--mab-icon) h-(--mab-icon)";

  return (
    <motion.nav
      aria-label="Quick contact"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 2.2, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed bottom-0 inset-x-0 z-[90] md:hidden safe-bottom
        bg-ink/92 backdrop-blur-xl border-t border-(--line-2)
        shadow-[0_-8px_32px_rgba(0,0,0,0.5)] px-2 pt-1.5"
    >
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
        <a
          href={STORE.phoneHref}
          className={itemCls}
          aria-label="Call the boutique"
          onClick={() => track("call_click", { source: "sticky_bar" })}
        >
          <Phone className={iconCls} strokeWidth={1.6} aria-hidden />
          <span className={labelCls}>
            <ResponsiveLabel short={t(lang, "mab.callShort")} full={t(lang, "mab.call")} />
          </span>
        </a>
        <a
          href={STORE.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={itemCls}
          aria-label="Get directions"
          onClick={() => track("directions_click", { source: "sticky_bar" })}
        >
          <MapPin className={iconCls} strokeWidth={1.6} aria-hidden />
          <span className={labelCls}>
            <ResponsiveLabel
              short={t(lang, "mab.directionsShort")}
              full={t(lang, "mab.directions")}
            />
          </span>
        </a>
        <a
          href={STORE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={itemCls}
          aria-label="Follow on Instagram"
          onClick={() => track("instagram_click", { source: "sticky_bar" })}
        >
          <IgIcon className={iconCls} />
          <span className={labelCls}>
            <ResponsiveLabel short={t(lang, "mab.igShort")} full={t(lang, "mab.ig")} />
          </span>
        </a>
        <Link
          href={`/${lang}/engagement#book`}
          className={`${itemCls} bg-gold text-ink active:bg-gold-3 active:text-ink`}
          aria-label="Book a consultation"
          onClick={() => track("book_click", { source: "sticky_bar" })}
        >
          <CalendarDays className={iconCls} strokeWidth={1.6} aria-hidden />
          <span className={labelCls}>{t(lang, "mab.book")}</span>
        </Link>
      </div>
    </motion.nav>
  );
}
