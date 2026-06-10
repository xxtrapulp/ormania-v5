import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { VisitView } from "@/components/pages/VisitView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fr = lang === "fr";
  return {
    title: fr ? "Visitez notre bijouterie à Laval" : "Visit Our Jewelry Boutique in Laval",
    description: fr
      ? "Bijouterie Ormania — 3000 Boulevard des Laurentides, Laval, QC. Heures d'ouverture, itinéraire et rendez-vous."
      : "Bijouterie Ormania — 3000 Boulevard des Laurentides, Laval, QC. Store hours, directions, and appointments.",
    alternates: {
      canonical: `https://ormania.ca/${lang}/visit/`,
      languages: {
        en: "https://ormania.ca/en/visit/",
        fr: "https://ormania.ca/fr/visit/",
      },
    },
  };
}

export default async function VisitPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "en";
  return <VisitView lang={l} />;
}
