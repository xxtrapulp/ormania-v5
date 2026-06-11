"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { STORE } from "@/lib/data";

export function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const col = "flex flex-col gap-2 text-[0.82rem] text-text-2";
  const link = "hover:text-gold transition-colors duration-300 min-h-6 inline-flex items-center link-shimmer";

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      className="border-t border-(--line) bg-ink-2 mt-auto"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-5 md:py-7">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          <nav className={col} aria-label="Explore">
            <span className="eyebrow mb-1">{t(lang, "footer.explore")}</span>
            <Link className={link} href={`/${lang}/collections`}>{t(lang, "nav.collections")}</Link>
            <Link className={link} href={`/${lang}/instagram`}>{t(lang, "nav.instagram")}</Link>
            <Link className={link} href={`/${lang}/engagement`}>{t(lang, "nav.engagement")}</Link>
            <Link className={link} href={`/${lang}/explore`}>{t(lang, "nav.explore")}</Link>
          </nav>

          <nav className={col} aria-label="Services">
            <span className="eyebrow mb-1">{t(lang, "footer.services")}</span>
            <Link className={link} href={`/${lang}/custom`}>{t(lang, "nav.custom")}</Link>
            <Link className={link} href={`/${lang}/repairs`}>{t(lang, "nav.repairs")}</Link>
            <Link className={link} href={`/${lang}/visit`}>{t(lang, "nav.visit")}</Link>
          </nav>

          <div className={col}>
            <span className="eyebrow mb-1">{t(lang, "footer.visit")}</span>
            <a className={link} href={STORE.directionsUrl} target="_blank" rel="noopener noreferrer">
              {STORE.address}, {STORE.city}, {STORE.region} {STORE.postal}
            </a>
            <a className={link} href={STORE.phoneHref}>{STORE.phone}</a>
            <a className={link} href={STORE.instagram} target="_blank" rel="noopener noreferrer">
              {STORE.instagramHandle}
            </a>
          </div>
        </div>

        {/* Centered logo */}
        <div className="mt-5 flex flex-col items-center">
          <Image
            src="/brand/ormania.svg"
            alt="Ormania"
            width={200}
            height={48}
            className="h-7 md:h-9 w-auto opacity-60"
          />
          <p className="mt-1.5 text-[0.8rem] text-text-3 italic text-center">
            {t(lang, "footer.tagline")}
          </p>
        </div>

        <div className="mt-5 pt-2 border-t border-(--line) flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[0.75rem] text-text-3">
          <span>
            © {year} {STORE.name}. {t(lang, "footer.rights")}
          </span>
          <div className="flex items-center gap-5">
            <Link className={link} href={`/${lang}/privacy`}>{t(lang, "footer.privacy")}</Link>
            <Link className={link} href={`/${lang}/terms`}>{t(lang, "footer.terms")}</Link>
            <Link className={link} href={`/${lang}/admin`}>{t(lang, "footer.staff")}</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
