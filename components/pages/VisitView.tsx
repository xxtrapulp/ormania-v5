"use client";

import { useSyncExternalStore } from "react";
import { Clock, MapPin, MessageSquare, Phone } from "lucide-react";
import { HOURS, HOURS_LABELS, STORE } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { Button, ResponsiveLabel } from "@/components/ui/Button";
import { IgIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

function computeOpenStatus(): boolean {
  const now = new Date();
  const span = HOURS[now.getDay()];
  if (!span) return false;
  const h = now.getHours() + now.getMinutes() / 60;
  return h >= span[0] && h < span[1];
}

/** Client-only open/closed status; renders as unknown (null) during SSG. */
function useOpenStatus(): boolean | null {
  return useSyncExternalStore(noopSubscribe, computeOpenStatus, () => null);
}

export function VisitView({ lang }: { lang: Lang }) {
  const { open } = useLeadModal();
  const isOpen = useOpenStatus();
  const today = new Date().getDay();

  return (
    <>
      <PageHero
        eyebrow={t(lang, "visit.eyebrow")}
        title={t(lang, "visit.title")}
        sub={`${STORE.address}, ${STORE.city}, ${STORE.region} ${STORE.postal}`}
      >
        <Button href={STORE.phoneHref} onClick={() => track("call_click", { source: "visit_hero" })}>
          <Phone size={16} aria-hidden />
          <ResponsiveLabel short={t(lang, "visit.callShort")} full={STORE.phone} breakpoint="sm" />
        </Button>
        <Button
          variant="secondary"
          href={STORE.directionsUrl}
          onClick={() => track("directions_click", { source: "visit_hero" })}
        >
          <MapPin size={16} aria-hidden />
          {t(lang, "visit.directions")}
        </Button>
      </PageHero>

      <section className="pb-16 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Open/closed status pill */}
          <Reveal className="flex justify-center mb-8">
            <span
              className={cn(
                "inline-flex items-center gap-2 min-h-11 px-5 rounded-full border text-[0.875rem]",
                isOpen === null
                  ? "border-(--line) text-text-3"
                  : isOpen
                  ? "border-emerald-500/40 text-emerald-300 bg-emerald-500/10"
                  : "border-(--line-2) text-text-2 bg-(--surface)"
              )}
              role="status"
            >
              <span
                aria-hidden
                className={cn(
                  "w-2 h-2 rounded-full",
                  isOpen ? "bg-emerald-400 animate-pulse" : "bg-text-3"
                )}
              />
              {isOpen === null ? "…" : isOpen ? t(lang, "visit.open") : t(lang, "visit.closed")}
            </span>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-5 md:gap-8">
            {/* Map card */}
            <Reveal className="surface-card overflow-hidden">
              <iframe
                src={STORE.mapsEmbed}
                title={lang === "fr" ? "Carte Google — Bijouterie Ormania" : "Google Map — Bijouterie Ormania"}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-72 md:h-96 border-0 grayscale-[0.4] contrast-[1.05]"
                allowFullScreen
              />
              <div className="p-5 flex flex-col xs:flex-row gap-3 xs:gap-2.5">
                <Button
                  full
                  href={STORE.directionsUrl}
                  onClick={() => track("directions_click", { source: "visit_map" })}
                >
                  <MapPin size={16} aria-hidden />
                  {t(lang, "visit.directionsShort")}
                </Button>
                <Button
                  variant="secondary"
                  full
                  href={STORE.instagram}
                  onClick={() => track("instagram_click", { source: "visit_map" })}
                >
                  <IgIcon className="w-4 h-4" />
                  Instagram
                </Button>
              </div>
            </Reveal>

            {/* Hours + contact card */}
            <div className="flex flex-col gap-5 md:gap-8">
              <Reveal className="surface-card p-5 md:p-7">
                <h2 className="eyebrow mb-4 flex items-center gap-2">
                  <Clock size={13} aria-hidden />
                  {t(lang, "visit.hours")}
                </h2>
                <dl className="flex flex-col">
                  {HOURS_LABELS.map((d, i) => (
                    <div
                      key={d.en}
                      className={cn(
                        "flex items-center justify-between py-2 border-b border-white/5 last:border-0 text-[0.9rem]",
                        i === today ? "text-gold" : "text-text-2"
                      )}
                    >
                      <dt className="flex items-center gap-2">
                        {i === today && (
                          <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-gold" />
                        )}
                        {lang === "fr" ? d.fr : d.en}
                      </dt>
                      <dd>{lang === "fr" ? d.hoursFr : d.hours}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal className="surface-card p-5 md:p-7" delay={0.08}>
                <h2 className="eyebrow mb-4">{lang === "fr" ? "Nous joindre" : "Reach us"}</h2>
                <a
                  href={STORE.phoneHref}
                  onClick={() => track("call_click", { source: "visit_card" })}
                  className="block font-serif text-[1.7rem] text-ivory hover:text-gold transition-colors min-h-11"
                >
                  {STORE.phone}
                </a>
                <a
                  href={STORE.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("directions_click", { source: "visit_card" })}
                  className="block mt-1 text-[0.95rem] text-text-2 hover:text-gold transition-colors min-h-11 leading-relaxed"
                >
                  {STORE.address}
                  <br />
                  {STORE.city}, {STORE.region} {STORE.postal}
                </a>
                <Button
                  className="mt-4"
                  full
                  variant="secondary"
                  onClick={() => {
                    track("contact_click", { source: "visit_card" });
                    open("contact");
                  }}
                >
                  <MessageSquare size={16} aria-hidden />
                  {t(lang, "visit.contactCta")}
                </Button>
              </Reveal>
            </div>
          </div>

          {/* Appointment band */}
          <Reveal className="mt-10 md:mt-14 text-center surface-card p-7 md:p-10">
            <SectionHeading
              eyebrow={lang === "fr" ? "Mieux encore" : "Even better"}
              title={lang === "fr" ? "Venez avec un rendez-vous." : "Come in with an appointment."}
              sub={
                lang === "fr"
                  ? "Nous préparons les pièces qui vous intéressent avant votre arrivée."
                  : "We'll have the pieces you care about ready before you walk in."
              }
            />
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  track("book_click", { source: "visit_page" });
                  open("appointment");
                }}
                arrow
              >
                {t(lang, "nav.book")}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
