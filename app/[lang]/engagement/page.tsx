import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { EngagementView } from "@/components/pages/EngagementView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fr = lang === "fr";
  return {
    title: fr ? "Bagues de fiançailles à Laval" : "Engagement Rings in Laval",
    description: fr
      ? "Bagues de fiançailles à Laval — diamants naturels et de laboratoire, consultations privées sans pression, mise à grandeur incluse."
      : "Engagement rings in Laval — natural and lab-grown diamonds, private no-pressure consultations, resizing included.",
    alternates: {
      canonical: `https://ormania.ca/${lang}/engagement/`,
      languages: {
        en: "https://ormania.ca/en/engagement/",
        fr: "https://ormania.ca/fr/engagement/",
      },
    },
  };
}

export default async function EngagementPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "en";
  return <EngagementView lang={l} />;
}
