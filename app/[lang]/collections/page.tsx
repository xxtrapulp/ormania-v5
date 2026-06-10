import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { CollectionsView } from "@/components/pages/CollectionsView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fr = lang === "fr";
  return {
    title: fr ? "Collections — Bijouterie à Laval" : "Collections — Jewelry Store in Laval",
    description: fr
      ? "Chaînes en or, bagues, bracelets tennis, montres et bagues de fiançailles — en boutique à Laval."
      : "Gold chains, rings, tennis bracelets, watches, and engagement rings — in store in Laval.",
    alternates: {
      canonical: `https://ormania.ca/${lang}/collections/`,
      languages: {
        en: "https://ormania.ca/en/collections/",
        fr: "https://ormania.ca/fr/collections/",
      },
    },
  };
}

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "en";
  return <CollectionsView lang={l} />;
}
