import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { CustomView } from "@/components/pages/CustomView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fr = lang === "fr";
  return {
    title: fr ? "Bijoux sur mesure à Laval" : "Custom Jewelry in Laval",
    description: fr
      ? "Bijoux sur mesure créés à notre atelier de Laval — bagues, colliers, boucles d'oreilles. Partagez votre idée, votre budget et vos photos d'inspiration."
      : "Custom jewelry made at our Laval bench — rings, necklaces, earrings. Share your idea, budget, and inspiration photos.",
    alternates: {
      canonical: `https://ormania.ca/${lang}/custom/`,
      languages: {
        en: "https://ormania.ca/en/custom/",
        fr: "https://ormania.ca/fr/custom/",
      },
    },
  };
}

export default async function CustomPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "en";
  return <CustomView lang={l} />;
}
