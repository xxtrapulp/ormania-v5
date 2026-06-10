/**
 * Ormania content data — real @bijouterie_ormania posts (curated in v4)
 * plus store info, collections, repair services, and tools.
 */

export const STORE = {
  name: "Bijouterie Ormania",
  address: "3000 Boulevard des Laurentides",
  city: "Laval",
  region: "QC",
  postal: "H7K 3G5",
  phone: "(450) 629-2959",
  phoneHref: "tel:+14506292959",
  email: "info@ormania.ca",
  instagram: "https://www.instagram.com/bijouterie_ormania",
  instagramHandle: "@bijouterie_ormania",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=3000+Boulevard+des+Laurentides+Laval+QC+H7K+3G5",
  mapsEmbed:
    "https://www.google.com/maps?q=3000+Boulevard+des+Laurentides,+Laval,+QC+H7K+3G5&output=embed",
} as const;

/** Weekly hours — 0 = Sunday. [open, close] in 24h, null = closed. */
export const HOURS: ([number, number] | null)[] = [
  null, // Sun
  [10, 18], // Mon
  [10, 18], // Tue
  [10, 18], // Wed
  [10, 21], // Thu
  [10, 21], // Fri
  [10, 17], // Sat
];

export const HOURS_LABELS = [
  { en: "Sunday", fr: "Dimanche", hours: "Closed", hoursFr: "Fermé" },
  { en: "Monday", fr: "Lundi", hours: "10:00 – 18:00", hoursFr: "10 h – 18 h" },
  { en: "Tuesday", fr: "Mardi", hours: "10:00 – 18:00", hoursFr: "10 h – 18 h" },
  { en: "Wednesday", fr: "Mercredi", hours: "10:00 – 18:00", hoursFr: "10 h – 18 h" },
  { en: "Thursday", fr: "Jeudi", hours: "10:00 – 21:00", hoursFr: "10 h – 21 h" },
  { en: "Friday", fr: "Vendredi", hours: "10:00 – 21:00", hoursFr: "10 h – 21 h" },
  { en: "Saturday", fr: "Samedi", hours: "10:00 – 17:00", hoursFr: "10 h – 17 h" },
];

export type IGCategory =
  | "all"
  | "rings"
  | "chains"
  | "bracelets"
  | "watches"
  | "engagement"
  | "custom";

export interface IGPost {
  code: string;
  title: string;
  cat: Exclude<IGCategory, "all">;
  type: "image" | "reel";
  caption: string;
  availability: string;
  igUrl: string;
  image: string;
  /** Aspect ratio class for the masonry — reels are vertical */
  recent?: boolean;
}

export const IG_POSTS: IGPost[] = [
  {
    code: "DSAifEiDouU",
    title: "Lab-Grown Tennis Bracelet",
    cat: "bracelets",
    type: "image",
    caption:
      "Your new never-taking-it-off bracelet — lab-grown tennis, made to shine all season long.",
    availability: "In stock",
    igUrl: "https://www.instagram.com/p/DSAifEiDouU/",
    image: "/instagram/ig-DSAifEiDouU.jpg",
    recent: true,
  },
  {
    code: "DSdMAuPETdF",
    title: "Halo Diamond Necklace",
    cat: "chains",
    type: "reel",
    caption: "Halo diamond necklace, available in store.",
    availability: "In store",
    igUrl: "https://www.instagram.com/reel/DSdMAuPETdF/",
    image: "/instagram/ig-DSdMAuPETdF.jpg",
    recent: true,
  },
  {
    code: "DSaTiT1jgKb",
    title: "Stack Your Rings",
    cat: "rings",
    type: "reel",
    caption: "This is your sign to stack — custom jewelry, Laval.",
    availability: "In store",
    igUrl: "https://www.instagram.com/reel/DSaTiT1jgKb/",
    image: "/instagram/ig-DSaTiT1jgKb.jpg",
    recent: true,
  },
  {
    code: "DSVUrrLDrSl",
    title: "Sterling Silver & Moissanite",
    cat: "chains",
    type: "reel",
    caption: "Silver at its all-time high — S925 sterling silver moissanite pieces in store.",
    availability: "In store",
    igUrl: "https://www.instagram.com/reel/DSVUrrLDrSl/",
    image: "/instagram/ig-DSVUrrLDrSl.jpg",
    recent: true,
  },
  {
    code: "DRzvxN2kWfn",
    title: "A Gift She'll Wear Every Day",
    cat: "bracelets",
    type: "reel",
    caption: "Not sure what to get her? Start with something she'll wear every day.",
    availability: "In store",
    igUrl: "https://www.instagram.com/reel/DRzvxN2kWfn/",
    image: "/instagram/ig-DRzvxN2kWfn.jpg",
  },
  {
    code: "DRP2awpjmhB",
    title: "Custom Pearl Earrings",
    cat: "custom",
    type: "reel",
    caption: "A custom pair of earrings designed to match her pearls — a 65th birthday gift.",
    availability: "Commission",
    igUrl: "https://www.instagram.com/reel/DRP2awpjmhB/",
    image: "/instagram/ig-DRP2awpjmhB.jpg",
  },
  {
    code: "DHuHBHMuREj",
    title: "Baume & Mercier M0A10619",
    cat: "watches",
    type: "image",
    caption: "New arrival — Baume & Mercier M0A10619, in stock and ready.",
    availability: "In stock",
    igUrl: "https://www.instagram.com/p/DHuHBHMuREj/",
    image: "/instagram/ig-DHuHBHMuREj.jpg",
  },
  {
    code: "DCu5JdFO5TV",
    title: "Men's Solitaire Diamond Ring",
    cat: "engagement",
    type: "reel",
    caption: "Our men's ring collection — crafted to bring elegance to every occasion.",
    availability: "In store",
    igUrl: "https://www.instagram.com/reel/DCu5JdFO5TV/",
    image: "/instagram/ig-DCu5JdFO5TV.jpg",
  },
  {
    code: "DXxuRoEGDfb",
    title: "Natural Diamonds Festival",
    cat: "engagement",
    type: "image",
    caption: "Natural diamonds festival — engagement, wedding, gold. Best prices of the season.",
    availability: "In store",
    igUrl: "https://www.instagram.com/reel/DXxuRoEGDfb/",
    image: "/instagram/ig-DXxuRoEGDfb.jpg",
  },
  {
    code: "DEN0REXJO1E",
    title: "New Arrivals",
    cat: "rings",
    type: "image",
    caption: "Discover some of our latest arrivals today.",
    availability: "In store",
    igUrl: "https://www.instagram.com/p/DEN0REXJO1E/",
    image: "/instagram/ig-DEN0REXJO1E.jpg",
  },
  {
    code: "DCsKHizO2ob",
    title: "Cuban Link Chain",
    cat: "chains",
    type: "image",
    caption: "Nos chaînes cubaines dans une variété de tailles — Laval boutique.",
    availability: "In store",
    igUrl: "https://www.instagram.com/p/DCsKHizO2ob/",
    image: "/instagram/ig-DCsKHizO2ob.jpg",
  },
  {
    code: "DCsRV7yuwrx",
    title: "Twisted Gold Chain",
    cat: "chains",
    type: "image",
    caption: "Chaînes torsades dans une variété de tailles.",
    availability: "In store",
    igUrl: "https://www.instagram.com/p/DCsRV7yuwrx/",
    image: "/instagram/ig-DCsRV7yuwrx.jpg",
  },
  {
    code: "DDLZO-iuBM-",
    title: "$1,800 Cuban Link Chain",
    cat: "chains",
    type: "image",
    caption: "An $1,800 Cuban link — heavy, solid, and ready to wear.",
    availability: "In store",
    igUrl: "https://www.instagram.com/p/DDLZO-iuBM-/",
    image: "/instagram/ig-DDLZO-iuBM-.jpg",
  },
];

export const IG_CATEGORIES: { id: IGCategory; en: string; fr: string }[] = [
  { id: "all", en: "All", fr: "Tout" },
  { id: "rings", en: "Rings", fr: "Bagues" },
  { id: "chains", en: "Chains", fr: "Chaînes" },
  { id: "bracelets", en: "Bracelets", fr: "Bracelets" },
  { id: "watches", en: "Watches", fr: "Montres" },
  { id: "engagement", en: "Engagement", fr: "Fiançailles" },
  { id: "custom", en: "Custom", fr: "Sur mesure" },
];

export interface Collection {
  id: string;
  en: string;
  fr: string;
  descEn: string;
  descFr: string;
  image: string;
}

export const COLLECTIONS: Collection[] = [
  {
    id: "chains",
    en: "Chains & Necklaces",
    fr: "Chaînes et colliers",
    descEn: "Cuban links, torsades, and diamond pieces — solid gold, ready in store.",
    descFr: "Chaînes cubaines, torsades et pièces diamantées — or massif, en boutique.",
    image: "/instagram/ig-DCsKHizO2ob.jpg",
  },
  {
    id: "rings",
    en: "Rings",
    fr: "Bagues",
    descEn: "Stackable bands, statement gold, and everyday diamonds.",
    descFr: "Jonc superposables, or affirmé et diamants de tous les jours.",
    image: "/instagram/ig-DSaTiT1jgKb.jpg",
  },
  {
    id: "bracelets",
    en: "Bracelets",
    fr: "Bracelets",
    descEn: "Tennis bracelets and gold bangles that never come off.",
    descFr: "Bracelets tennis et joncs en or qu'on ne retire jamais.",
    image: "/instagram/ig-DSAifEiDouU.jpg",
  },
  {
    id: "watches",
    en: "Watches",
    fr: "Montres",
    descEn: "Selected Swiss timepieces, batteries, and service.",
    descFr: "Montres suisses sélectionnées, piles et entretien.",
    image: "/instagram/ig-DHuHBHMuREj.jpg",
  },
  {
    id: "engagement",
    en: "Engagement",
    fr: "Fiançailles",
    descEn: "Natural and lab-grown diamonds, set to be remembered.",
    descFr: "Diamants naturels et de laboratoire, sertis pour durer.",
    image: "/instagram/ig-DXxuRoEGDfb.jpg",
  },
  {
    id: "custom",
    en: "Custom Pieces",
    fr: "Sur mesure",
    descEn: "One-of-one commissions, designed with you at the bench.",
    descFr: "Pièces uniques, conçues avec vous à l'atelier.",
    image: "/instagram/ig-DRP2awpjmhB.jpg",
  },
];

export const REPAIR_SERVICES = [
  { id: "ring-sizing", en: "Ring sizing", fr: "Mise à grandeur de bague", descEn: "Up or down, most sizings done in-house.", descFr: "Agrandir ou réduire, fait sur place." },
  { id: "chain", en: "Chain & clasp repair", fr: "Réparation de chaîne et fermoir", descEn: "Broken links, clasps, and solder work.", descFr: "Maillons brisés, fermoirs et soudure." },
  { id: "stone", en: "Stone setting & replacement", fr: "Sertissage et remplacement de pierres", descEn: "Tighten, reset, or replace stones.", descFr: "Resserrer, ressertir ou remplacer." },
  { id: "polish", en: "Polishing & rhodium", fr: "Polissage et rhodium", descEn: "Bring back the original shine.", descFr: "Retrouvez l'éclat d'origine." },
  { id: "watch", en: "Watch batteries & service", fr: "Piles et entretien de montres", descEn: "Batteries while you wait.", descFr: "Piles pendant que vous attendez." },
  { id: "appraisal", en: "Cleaning & inspection", fr: "Nettoyage et inspection", descEn: "Complimentary check of your pieces.", descFr: "Vérification gratuite de vos bijoux." },
];

export const REPAIR_STEPS = [
  { en: "Received", fr: "Reçu" },
  { en: "Inspected", fr: "Inspecté" },
  { en: "Quote Sent", fr: "Devis envoyé" },
  { en: "Approved", fr: "Approuvé" },
  { en: "In Repair", fr: "En réparation" },
  { en: "Ready for Pickup", fr: "Prêt à ramasser" },
  { en: "Picked Up", fr: "Ramassé" },
];

export const CUSTOM_STEPS = [
  { en: "Share your idea", fr: "Partagez votre idée", descEn: "Photos, sketches, a story — anything that inspires you.", descFr: "Photos, croquis, une histoire — tout ce qui vous inspire." },
  { en: "Design together", fr: "Concevons ensemble", descEn: "We refine the design, metal, and stones with you.", descFr: "Nous peaufinons le design, le métal et les pierres avec vous." },
  { en: "Crafted at the bench", fr: "Façonné à l'atelier", descEn: "Your piece is made with care, with updates along the way.", descFr: "Votre pièce est réalisée avec soin, avec des nouvelles en cours de route." },
  { en: "Made to be remembered", fr: "Fait pour être mémorable", descEn: "Pick it up in store — a piece that exists only once.", descFr: "Ramassez-la en boutique — une pièce unique au monde." },
];

export const TOOLS = [
  { id: "gift", en: "Gift Finder Quiz", fr: "Quiz cadeau", descEn: "Answer 3 questions, get a shortlist.", descFr: "3 questions, une sélection personnalisée.", status: "preview" },
  { id: "size", en: "Ring Size Guide", fr: "Guide des tailles de bague", descEn: "Find their size without asking.", descFr: "Trouvez la taille sans demander.", status: "preview" },
  { id: "chain", en: "Chain Length Visualizer", fr: "Visualiseur de longueur de chaîne", descEn: "See where each length falls.", descFr: "Visualisez chaque longueur.", status: "preview" },
  { id: "status", en: "Repair Status Lookup", fr: "Suivi de réparation", descEn: "Check your repair by reference number.", descFr: "Vérifiez votre réparation par numéro de référence.", status: "live" },
  { id: "care", en: "Jewelry Care Guide", fr: "Guide d'entretien", descEn: "Keep gold and stones looking new.", descFr: "Gardez l'or et les pierres comme neufs.", status: "preview" },
];
