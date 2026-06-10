import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { AdminView } from "@/components/pages/AdminView";

export const metadata: Metadata = {
  title: "Staff Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "en";
  return <AdminView lang={l} />;
}
