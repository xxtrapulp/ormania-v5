"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { luxeEase } from "@/lib/motion";

const NAV = [
  { href: "", key: "nav.home" },
  { href: "collections", key: "nav.collections" },
  { href: "instagram", key: "nav.instagram" },
  { href: "custom", key: "nav.custom" },
  { href: "repairs", key: "nav.repairs" },
  { href: "engagement", key: "nav.engagement" },
  { href: "visit", key: "nav.visit" },
] as const;

export function Header({ lang }: { lang: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ormania.lang", lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const otherLang: Lang = lang === "en" ? "fr" : "en";
  const switchedPath = pathname.replace(`/${lang}`, `/${otherLang}`);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-[100] transition-all duration-500 ease-(--ease-luxe)",
          scrolled
            ? "bg-ink/90 backdrop-blur-xl border-b border-(--line) py-2"
            : "bg-gradient-to-b from-ink/80 to-transparent py-3 md:py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between gap-3">
          <Link
            href={`/${lang}`}
            aria-label="Ormania home"
            className="shrink-0 flex items-center min-h-11"
          >
            <Image
              src="/brand/ormania.svg"
              alt="Ormania"
              width={148}
              height={34}
              priority
              className="h-7 md:h-8 w-auto"
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => {
              const href = `/${lang}${item.href ? `/${item.href}` : ""}`;
              const active =
                item.href === ""
                  ? pathname === `/${lang}` || pathname === `/${lang}/`
                  : pathname.startsWith(href);
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={cn(
                    "text-[0.8rem] tracking-[0.14em] uppercase transition-colors duration-300",
                    active ? "text-gold" : "text-text-2 hover:text-ivory"
                  )}
                >
                  {t(lang, item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href={switchedPath}
              aria-label={lang === "en" ? "Passer au français" : "Switch to English"}
              className="min-h-11 min-w-11 inline-flex items-center justify-center text-[0.78rem] tracking-[0.12em] text-text-2 hover:text-gold transition-colors"
            >
              <span className={lang === "en" ? "text-gold" : ""}>EN</span>
              <span className="mx-1 text-text-3">/</span>
              <span className={lang === "fr" ? "text-gold" : ""}>FR</span>
            </Link>

            <Link
              href={`/${lang}/engagement#book`}
              onClick={() => track("nav_book_click")}
              className="hidden md:inline-flex btn-sheen items-center h-10 px-5 rounded-full bg-gold text-ink text-[0.8rem] font-medium tracking-[0.04em] transition-all duration-300 hover:bg-gold-3 hover:-translate-y-px active:scale-[0.97]"
            >
              {t(lang, "nav.book")}
            </Link>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="lg:hidden min-h-11 min-w-11 inline-flex flex-col items-center justify-center gap-[5px] text-ivory"
            >
              <span className="block w-5 h-px bg-current" />
              <span className="block w-5 h-px bg-current" />
              <span className="block w-3.5 h-px bg-current self-center translate-x-[3px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] bg-ink/98 backdrop-blur-2xl flex flex-col"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: luxeEase }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <Image
                src="/brand/ormania.svg"
                alt="Ormania"
                width={139}
                height={32}
                className="h-7 w-auto"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="min-h-11 min-w-11 inline-flex items-center justify-center text-ivory hover:text-gold transition-colors"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-1" aria-label="Mobile">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={reduce ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.45, ease: luxeEase }}
                >
                  <Link
                    href={`/${lang}${item.href ? `/${item.href}` : ""}`}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 font-serif text-[1.7rem] text-ivory hover:text-gold transition-colors"
                  >
                    {t(lang, item.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="px-8 pb-10 flex items-center justify-between text-[0.8rem] text-text-2"
              initial={reduce ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={switchedPath}
                onClick={() => setOpen(false)}
                className="min-h-11 inline-flex items-center tracking-[0.12em]"
              >
                EN / FR
              </Link>
              <Link
                href={`/${lang}/engagement#book`}
                onClick={() => setOpen(false)}
                className="text-gold min-h-11 inline-flex items-center"
              >
                {t(lang, "nav.book")} →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
