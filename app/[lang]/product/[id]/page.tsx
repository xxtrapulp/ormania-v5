import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IG_POSTS } from "@/lib/data";
import { isLang, type Lang } from "@/lib/i18n";
import { ProductView } from "@/components/pages/ProductView";

export function generateStaticParams() {
  return IG_POSTS.map((p) => ({ id: p.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const post = IG_POSTS.find((p) => p.code === id);
  if (!post) return {};
  return {
    title: post.title,
    description: post.caption,
    alternates: {
      canonical: `https://ormania.ca/${lang}/product/${id}/`,
      languages: {
        en: `https://ormania.ca/en/product/${id}/`,
        fr: `https://ormania.ca/fr/product/${id}/`,
      },
    },
    openGraph: {
      title: `${post.title} — Bijouterie Ormania`,
      description: post.caption,
      images: [`https://ormania.ca${post.image}`],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const l: Lang = isLang(lang) ? lang : "en";
  const post = IG_POSTS.find((p) => p.code === id);
  if (!post) notFound();
  return <ProductView post={post} lang={l} />;
}
