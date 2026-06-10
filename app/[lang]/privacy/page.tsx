import type { Metadata } from "next";
import { STORE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const fr = lang === "fr";
  return (
    <div className="pt-28 md:pt-40 pb-20 mx-auto max-w-2xl px-4 md:px-8">
      <span className="eyebrow block mb-3">{fr ? "Légal" : "Legal"}</span>
      <h1 className="font-serif text-[clamp(1.9rem,6vw,2.8rem)] text-ivory mb-8">
        {fr ? "Politique de confidentialité" : "Privacy Policy"}
      </h1>
      <div className="flex flex-col gap-5 text-[0.95rem] text-text-2 leading-relaxed">
        <p>
          {fr
            ? "Les informations soumises via nos formulaires (nom, téléphone, courriel, photos) servent uniquement à répondre à votre demande. Elles ne sont jamais vendues ni partagées avec des tiers."
            : "Information submitted through our forms (name, phone, email, photos) is used only to respond to your request. It is never sold or shared with third parties."}
        </p>
        <p>
          {fr
            ? "Ce site n'utilise pas de témoins (cookies) de suivi tiers. Les préférences (langue) sont stockées localement dans votre navigateur."
            : "This site does not use third-party tracking cookies. Preferences (language) are stored locally in your browser."}
        </p>
        <p>
          {fr
            ? "Pour consulter, corriger ou supprimer vos informations, contactez-nous :"
            : "To view, correct, or delete your information, contact us:"}{" "}
          <a href={STORE.phoneHref} className="text-gold hover:text-gold-3 transition-colors">
            {STORE.phone}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
