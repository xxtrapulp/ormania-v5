"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { STORE } from "@/lib/data";
import { IgIcon } from "@/components/ui/icons";

/** Tiny rotating gold ring ornament for footer. */
function MiniRing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={`${className} animate-[spin_12s_linear_infinite]`}
    >
      <circle cx="50" cy="50" r="46" stroke="rgba(201,168,106,0.25)" strokeWidth="0.5" strokeDasharray="3 6" />
      <circle cx="50" cy="50" r="36" stroke="rgba(217,188,133,0.3)" strokeWidth="0.75" />
      <circle cx="50" cy="50" r="24" stroke="rgba(201,168,106,0.15)" strokeWidth="1.5" />
    </svg>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const link = "hover:text-gold transition-colors duration-300 min-h-6 inline-flex items-center link-shimmer";
  const dot = "hidden md:block w-[3px] h-[3px] rounded-full bg-gold/40";

  const navLinks = [
    { href: `/${lang}/collections`, label: t(lang, "nav.collections") },
    { href: `/${lang}/instagram`, label: t(lang, "nav.instagram") },
    { href: `/${lang}/engagement`, label: t(lang, "nav.engagement") },
    { href: `/${lang}/explore`, label: t(lang, "nav.explore") },
    { href: `/${lang}/custom`, label: t(lang, "nav.custom") },
    { href: `/${lang}/repairs`, label: t(lang, "nav.repairs") },
    { href: `/${lang}/visit`, label: t(lang, "nav.visit") },
    { href: `/${lang}/pitch`, label: lang === "fr" ? "Présentation" : "Pitch" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      className="border-t border-(--line) bg-ink-2 mt-auto relative overflow-hidden"
    >
      {/* Subtle gold radial glow behind logo area */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[14rem] bg-[radial-gradient(ellipse_at_center,rgba(201,168,106,0.06)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-4 md:py-6">
        {/* Mobile: 2-column grid. Desktop: single horizontal row with gold dots. */}
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-x-4 gap-y-1 md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-0 md:gap-y-2"
        >
          {navLinks.map((l, i) => (
            <span key={l.href} className="contents">
              <Link
                className={`${link} text-[0.78rem] md:text-[0.82rem] text-text-2 py-1 md:px-3`}
                href={l.href}
              >
                {l.label}
              </Link>
              {i < navLinks.length - 1 && <span className={dot} />}
            </span>
          ))}
        </nav>

        {/* Centered logo block with ornament */}
        <div className="mt-4 flex flex-col items-center relative">
          {/* Decorative rotating ring — subtle backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none opacity-60">
            <MiniRing className="w-full h-full" />
          </div>

          <Image
            src="/brand/ormania.svg"
            alt="Ormania"
            width={200}
            height={48}
            className="relative z-10 h-6 md:h-8 w-auto opacity-60"
          />
          <p className="relative z-10 mt-1 text-[0.75rem] text-text-3 italic text-center">
            {t(lang, "footer.tagline")}
          </p>
          <div className="relative z-10 mt-2 flex items-center gap-3">
            <a
              href={STORE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-text-3 hover:text-gold transition-colors duration-300"
            >
              <IgIcon className="w-4 h-4" />
            </a>
            <a
              href={STORE.phoneHref}
              aria-label="Phone"
              className="text-text-3 hover:text-gold transition-colors duration-300 text-[0.75rem]"
            >
              {STORE.phone}
            </a>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-4 pt-2 border-t border-(--line) flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[0.72rem] text-text-3">
          <span>
            © {year} {STORE.name}. {t(lang, "footer.rights")}
          </span>
          <div className="flex items-center gap-4">
            <Link className={link} href={`/${lang}/privacy`}>{t(lang, "footer.privacy")}</Link>
            <Link className={link} href={`/${lang}/terms`}>{t(lang, "footer.terms")}</Link>
            <Link className={link} href={`/${lang}/admin`}>{t(lang, "footer.staff")}</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
