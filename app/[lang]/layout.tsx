import { notFound } from "next/navigation";
import { LANGS, isLang, t, type Lang } from "@/lib/i18n";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { StickyBar } from "@/components/shell/StickyBar";
import { LeadModalProvider } from "@/components/forms/LeadModalProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { PageTransition } from "@/components/effects/PageTransition";
import { SparkleTrail } from "@/components/effects/SparkleTrail";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { SmoothAnchorProvider } from "@/components/effects/SmoothAnchorProvider";
import { Preloader } from "@/components/effects/Preloader";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { BackToTop } from "@/components/effects/BackToTop";
import { MouseSpotlight } from "@/components/effects/MouseSpotlight";
import { ModalFaviconSwap } from "@/components/effects/ModalFaviconSwap";
import { STORE, HOURS_LABELS } from "@/lib/data";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: STORE.name,
  image: "https://ormania.ca/brand/ormania-logo-original.png",
  telephone: "+1-450-629-2959",
  address: {
    "@type": "PostalAddress",
    streetAddress: STORE.address,
    addressLocality: STORE.city,
    addressRegion: STORE.region,
    postalCode: STORE.postal,
    addressCountry: "CA",
  },
  url: "https://ormania.ca",
  sameAs: [STORE.instagram],
  openingHoursSpecification: HOURS_LABELS.filter((d) => d.hours !== "Closed").map((d) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: d.en,
    opens: d.hours.split(" – ")[0],
    closes: d.hours.split(" – ")[1],
  })),
  makesOffer: [
    "Jewelry repair Laval",
    "Custom jewelry Laval",
    "Engagement rings Laval",
    "Watch battery Laval",
  ].map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s },
  })),
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const l: Lang = lang;

  return (
    <ToastProvider>
      <LeadModalProvider lang={l}>
        <a className="skip-link" href="#main">
          {t(l, "skip")}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <CustomCursor />
        <MouseSpotlight />
        <ScrollProgress />
        <GrainOverlay />
        <SparkleTrail />
        <SmoothAnchorProvider />
        <Header lang={l} />
        <PageTransition>
          <main id="main" className="flex-1">
            {children}
          </main>
        </PageTransition>
        <Footer lang={l} />
        <StickyBar lang={l} />
        <BackToTop />
        <ModalFaviconSwap />
      </LeadModalProvider>
    </ToastProvider>
  );
}
