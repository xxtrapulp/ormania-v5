import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { ExploreView } from "@/components/pages/ExploreView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fr = lang === "fr";
  return {
    title: fr ? "Outils — quiz cadeau, tailles, suivi de réparation" : "Tools — Gift Finder, Ring Sizes, Repair Status",
    description: fr
      ? "Quiz cadeau, guide des tailles de bague, visualiseur de chaîne, suivi de réparation et guide d'entretien — les outils Ormania."
      : "Gift finder quiz, ring size guide, chain length visualizer, repair status lookup, and care guide — the Ormania tools.",
    alternates: {
      canonical: `https://ormania.ca/${lang}/explore/`,
      languages: {
        en: "https://ormania.ca/en/explore/",
        fr: "https://ormania.ca/fr/explore/",
      },
    },
  };
}

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "en";
  return <ExploreView lang={l} />;
}
