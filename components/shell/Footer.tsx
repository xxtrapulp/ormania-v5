import Link from "next/link";
import Image from "next/image";
import { t, type Lang } from "@/lib/i18n";
import { STORE } from "@/lib/data";

export function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const col = "flex flex-col gap-2.5 text-[0.875rem] text-text-2";
  const link = "hover:text-gold transition-colors duration-300 min-h-6 inline-flex items-center";

  return (
    <footer className="border-t border-(--line) bg-ink-2 mt-auto">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/brand/ormania.svg"
              alt="Ormania"
              width={156}
              height={36}
              className="h-8 w-auto mb-4"
            />
            <p className="text-[0.875rem] text-text-3 italic font-serif text-[1.05rem]">
              {t(lang, "footer.tagline")}
            </p>
          </div>

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

        <div className="mt-12 pt-6 border-t border-(--line) flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[0.78rem] text-text-3">
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
    </footer>
  );
}
