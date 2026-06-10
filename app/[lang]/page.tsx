import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { Hero } from "@/components/home/Hero";
import { HomeSections } from "@/components/home/HomeSections";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fr = lang === "fr";
  return {
    title: fr
      ? "Ormania — Bijouterie fine, sur mesure et réparations à Laval"
      : "Ormania — Fine Jewelry, Custom Pieces & Repairs in Laval",
    description: fr
      ? "Bijouterie Ormania à Laval : bijoux fins, pièces sur mesure, bagues de fiançailles, montres et réparation de bijoux. Demandez-nous une pièce vue sur Instagram."
      : "Bijouterie Ormania is a Laval jewelry boutique: fine jewelry, custom pieces, engagement rings, watches, and jewelry repair. Ask us about a piece you saw on Instagram.",
    keywords: [
      "jewelry store Laval",
      "bijouterie Laval",
      "jewelry repair Laval",
      "custom jewelry Laval",
      "engagement rings Laval",
      "watch battery Laval",
      "men's jewelry Laval",
      "gold jewelry Laval",
    ],
    alternates: {
      canonical: `https://ormania.ca/${lang}/`,
      languages: { en: "https://ormania.ca/en/", fr: "https://ormania.ca/fr/" },
    },
    openGraph: {
      title: "Ormania — Jewelry made to be remembered",
      description: fr
        ? "Bijouterie fine, pièces sur mesure, réparations, montres et cadeaux intemporels à Laval."
        : "Fine jewelry, custom pieces, repairs, watches, and timeless gifts in Laval.",
      type: "website",
      images: ["https://ormania.ca/brand/ormania-logo-original.png"],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "en";

  return (
    <>
      <Hero lang={l} />
      <HomeSections lang={l} />
    </>
  );
}
