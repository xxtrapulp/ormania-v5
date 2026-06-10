import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { RepairsView } from "@/components/pages/RepairsView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fr = lang === "fr";
  return {
    title: fr ? "Réparation de bijoux à Laval" : "Jewelry Repair in Laval",
    description: fr
      ? "Mise à grandeur, sertissage, fermoirs, polissage et piles de montre — réparations faites sur place à Laval. Demandez une estimation avec photos."
      : "Ring sizing, stone setting, clasps, polishing, and watch batteries — repairs done in-house in Laval. Request an estimate with photos.",
    alternates: {
      canonical: `https://ormania.ca/${lang}/repairs/`,
      languages: {
        en: "https://ormania.ca/en/repairs/",
        fr: "https://ormania.ca/fr/repairs/",
      },
    },
  };
}

export default async function RepairsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "en";
  return <RepairsView lang={l} />;
}
