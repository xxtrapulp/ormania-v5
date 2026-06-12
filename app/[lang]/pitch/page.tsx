import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { PitchView } from "@/components/pages/PitchView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fr = lang === "fr";
  return {
    title: fr ? "Ormania — Pitch" : "Ormania — Pitch",
    description: fr
      ? "Découvrez Bijouterie Ormania : une boutique familiale à Laval spécialisée dans les bijoux sur mesure, les réparations et les pièces uniques."
      : "Discover Bijouterie Ormania: a family-owned boutique in Laval specializing in custom jewelry, repairs, and unique pieces.",
    alternates: {
      canonical: `https://ormania.ca/${lang}/pitch/`,
      languages: {
        en: "https://ormania.ca/en/pitch/",
        fr: "https://ormania.ca/fr/pitch/",
      },
    },
  };
}

export default async function PitchPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "en";
  return <PitchView lang={l} />;
}
