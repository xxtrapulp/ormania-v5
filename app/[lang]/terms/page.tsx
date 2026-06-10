import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  robots: { index: false },
};

export default async function TermsPage({
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
        {fr ? "Conditions d'utilisation" : "Terms of Use"}
      </h1>
      <div className="flex flex-col gap-5 text-[0.95rem] text-text-2 leading-relaxed">
        <p>
          {fr
            ? "Les prix et la disponibilité affichés ou discutés en ligne sont indicatifs et confirmés en boutique. Les estimations de réparation transmises par photo sont préliminaires et finalisées après inspection en personne."
            : "Prices and availability shown or discussed online are indicative and confirmed in store. Repair estimates given from photos are preliminary and finalized after in-person inspection."}
        </p>
        <p>
          {fr
            ? "Les images des pièces proviennent de notre boutique et de notre compte Instagram officiel. Toute reproduction sans autorisation est interdite."
            : "Piece images come from our boutique and our official Instagram account. Reproduction without permission is prohibited."}
        </p>
        <p>
          {fr
            ? "Une demande soumise via ce site ne constitue pas une commande ni une réservation tant qu'elle n'est pas confirmée par notre équipe."
            : "A request submitted through this site is not an order or a reservation until confirmed by our team."}
        </p>
      </div>
    </div>
  );
}
