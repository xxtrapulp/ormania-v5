import type { Metadata } from "next";
import { isLang, t, type Lang } from "@/lib/i18n";
import { InstagramView } from "@/components/pages/InstagramView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fr = lang === "fr";
  return {
    title: fr ? "Vu sur Instagram" : "Seen on Instagram",
    description: fr
      ? "Chaque pièce de notre fil Instagram est réelle et dans notre boutique de Laval. Demandez-nous une pièce par lien ou capture d'écran."
      : "Every piece on our Instagram feed is real and in our Laval boutique. Ask about any piece with a link or a screenshot.",
    alternates: {
      canonical: `https://ormania.ca/${lang}/instagram/`,
      languages: {
        en: "https://ormania.ca/en/instagram/",
        fr: "https://ormania.ca/fr/instagram/",
      },
    },
    openGraph: {
      title: fr ? "Vu sur Instagram — Ormania" : "Seen on Instagram — Ormania",
      images: ["https://ormania.ca/instagram/ig-DSAifEiDouU.jpg"],
    },
  };
}

export default async function InstagramPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "en";
  return <InstagramView lang={l} title={t(l, "ig.title")} />;
}
