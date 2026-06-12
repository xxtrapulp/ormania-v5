"use client";

import { t, type Lang } from "@/lib/i18n";
import { STORE } from "@/lib/data";
import { track } from "@/lib/analytics";
import { PageHero } from "@/components/ui/PageHero";
import { IGGrid } from "@/components/ig/IGGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IgIcon } from "@/components/ui/icons";
import { InstagramShowroomSection } from "@/components/sections/InstagramShowroomSection";

export function InstagramView({ lang, title }: { lang: Lang; title: string }) {
  return (
    <>
      <PageHero
        eyebrow={t(lang, "ig.eyebrow")}
        title={title}
        sub={t(lang, "ig.sub")}
      />

      <section className="pb-16 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <IGGrid lang={lang} showFilters showCtas />

          <InstagramShowroomSection lang={lang} />

          <Reveal className="mt-14 text-center surface-card max-w-xl mx-auto p-7 md:p-10">
            <IgIcon className="w-7 h-7 text-gold mx-auto mb-4" />
            <h2 className="font-serif text-[1.5rem] text-ivory mb-2">
              {lang === "fr" ? "Vous nous suivez déjà ?" : "Already following us?"}
            </h2>
            <p className="text-[0.875rem] text-text-2 leading-relaxed mb-6">
              {lang === "fr"
                ? "Nouvelles pièces, réels et arrivages chaque semaine sur notre Instagram."
                : "New pieces, reels, and arrivals every week on our Instagram."}
            </p>
            <Button
              href={STORE.instagram}
              onClick={() => track("instagram_click", { source: "ig_page" })}
            >
              <IgIcon className="w-4 h-4" />
              {t(lang, "ig.followCta")}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
