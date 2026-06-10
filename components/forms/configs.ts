import type { LeadType } from "@/lib/store";

export interface BiText {
  en: string;
  fr: string;
}

export type FieldType =
  | "text"
  | "tel"
  | "email"
  | "textarea"
  | "select"
  | "radio"
  | "file"
  | "date";

export interface FieldDef {
  name: string;
  label: BiText;
  type: FieldType;
  required?: boolean;
  placeholder?: BiText;
  options?: BiText[];
  /** Half-width on desktop */
  half?: boolean;
}

export interface FormConfig {
  type: LeadType;
  title: BiText;
  intro?: BiText;
  /** Each inner array is one step. Single-step forms have one array. */
  steps: FieldDef[][];
  stepTitles?: BiText[];
}

/* ── Shared field fragments ── */
const name: FieldDef = {
  name: "name",
  label: { en: "Name", fr: "Nom" },
  type: "text",
  required: true,
  half: true,
};
const phone: FieldDef = {
  name: "phone",
  label: { en: "Phone", fr: "Téléphone" },
  type: "tel",
  required: true,
  half: true,
  placeholder: { en: "(450) 555-0123", fr: "(450) 555-0123" },
};
const email: FieldDef = {
  name: "email",
  label: { en: "Email", fr: "Courriel" },
  type: "email",
  required: true,
};
const instagram: FieldDef = {
  name: "instagram",
  label: { en: "Instagram handle (optional)", fr: "Identifiant Instagram (facultatif)" },
  type: "text",
  placeholder: { en: "@yourhandle", fr: "@votrecompte" },
};
const message = (req = false): FieldDef => ({
  name: "message",
  label: { en: "Message", fr: "Message" },
  type: "textarea",
  required: req,
});
const preferredContact: FieldDef = {
  name: "preferredContact",
  label: { en: "Preferred contact method", fr: "Méthode de contact préférée" },
  type: "radio",
  required: true,
  options: [
    { en: "Phone call", fr: "Appel téléphonique" },
    { en: "Text message", fr: "Message texte" },
    { en: "Email", fr: "Courriel" },
    { en: "Instagram DM", fr: "Message Instagram" },
  ],
};

/* ── 1. Product inquiry ── */
export const productForm: FormConfig = {
  type: "product",
  title: { en: "Ask About This Piece", fr: "Demander à propos de cette pièce" },
  intro: {
    en: "Tell us which piece caught your eye — we'll confirm availability and pricing.",
    fr: "Dites-nous quelle pièce vous a charmé — nous confirmerons la disponibilité et le prix.",
  },
  steps: [
    [
      name,
      phone,
      email,
      instagram,
      {
        name: "piece",
        label: { en: "Product / piece name", fr: "Nom du produit / de la pièce" },
        type: "text",
        required: true,
      },
      message(),
      preferredContact,
    ],
  ],
};

/* ── 2. Instagram piece inquiry ── */
export const instagramForm: FormConfig = {
  type: "instagram",
  title: { en: "Ask About an Instagram Piece", fr: "Demander — pièce Instagram" },
  intro: {
    en: "Paste the link or upload a screenshot — we'll find the piece for you.",
    fr: "Collez le lien ou téléversez une capture — nous trouverons la pièce pour vous.",
  },
  stepTitles: [
    { en: "The piece", fr: "La pièce" },
    { en: "Your details", fr: "Vos coordonnées" },
  ],
  steps: [
    [
      {
        name: "igLink",
        label: { en: "Instagram post / reel link", fr: "Lien de la publication / du réel" },
        type: "text",
        placeholder: { en: "https://www.instagram.com/p/…", fr: "https://www.instagram.com/p/…" },
      },
      {
        name: "screenshot",
        label: { en: "Screenshot", fr: "Capture d'écran" },
        type: "file",
      },
      {
        name: "intent",
        label: { en: "What are you looking for?", fr: "Que recherchez-vous ?" },
        type: "radio",
        required: true,
        options: [
          { en: "The exact piece", fr: "La pièce exacte" },
          { en: "Something similar", fr: "Quelque chose de similaire" },
          { en: "Help identifying it", fr: "Aide pour l'identifier" },
        ],
      },
      message(),
    ],
    [name, phone, email, instagram, preferredContact],
  ],
};

/* ── 3. Custom jewelry request ── */
export const customForm: FormConfig = {
  type: "custom",
  title: { en: "Start a Custom Request", fr: "Démarrer une demande sur mesure" },
  intro: {
    en: "A sketch, a screenshot, an idea — that's all we need to begin.",
    fr: "Un croquis, une capture, une idée — c'est tout ce qu'il nous faut pour commencer.",
  },
  stepTitles: [
    { en: "The piece", fr: "La pièce" },
    { en: "Details & budget", fr: "Détails et budget" },
    { en: "You & timing", fr: "Vous et le moment" },
  ],
  steps: [
    [
      {
        name: "jewelryType",
        label: { en: "Jewelry type", fr: "Type de bijou" },
        type: "select",
        required: true,
        options: [
          { en: "Ring", fr: "Bague" },
          { en: "Necklace / chain", fr: "Collier / chaîne" },
          { en: "Bracelet", fr: "Bracelet" },
          { en: "Earrings", fr: "Boucles d'oreilles" },
          { en: "Pendant", fr: "Pendentif" },
          { en: "Other", fr: "Autre" },
        ],
      },
      {
        name: "metal",
        label: { en: "Metal preference", fr: "Métal préféré" },
        type: "select",
        half: true,
        options: [
          { en: "Yellow gold", fr: "Or jaune" },
          { en: "White gold", fr: "Or blanc" },
          { en: "Rose gold", fr: "Or rose" },
          { en: "Platinum", fr: "Platine" },
          { en: "Silver", fr: "Argent" },
          { en: "Not sure yet", fr: "Pas encore décidé" },
        ],
      },
      {
        name: "stone",
        label: { en: "Stone preference", fr: "Pierre préférée" },
        type: "select",
        half: true,
        options: [
          { en: "Natural diamond", fr: "Diamant naturel" },
          { en: "Lab-grown diamond", fr: "Diamant de laboratoire" },
          { en: "Moissanite", fr: "Moissanite" },
          { en: "Colored gemstone", fr: "Pierre de couleur" },
          { en: "Pearl", fr: "Perle" },
          { en: "No stone", fr: "Sans pierre" },
          { en: "Not sure yet", fr: "Pas encore décidé" },
        ],
      },
      {
        name: "inspiration",
        label: { en: "Inspiration photos", fr: "Photos d'inspiration" },
        type: "file",
      },
    ],
    [
      {
        name: "budget",
        label: { en: "Budget range", fr: "Budget" },
        type: "select",
        required: true,
        half: true,
        options: [
          { en: "Under $500", fr: "Moins de 500 $" },
          { en: "$500 – $1,500", fr: "500 $ – 1 500 $" },
          { en: "$1,500 – $3,000", fr: "1 500 $ – 3 000 $" },
          { en: "$3,000 – $6,000", fr: "3 000 $ – 6 000 $" },
          { en: "$6,000+", fr: "6 000 $ et plus" },
        ],
      },
      {
        name: "deadline",
        label: { en: "Deadline (optional)", fr: "Échéance (facultatif)" },
        type: "text",
        half: true,
        placeholder: { en: "e.g. before December 15", fr: "ex. avant le 15 décembre" },
      },
      {
        name: "engraving",
        label: { en: "Engraving request (optional)", fr: "Gravure souhaitée (facultatif)" },
        type: "text",
      },
      {
        name: "message",
        label: { en: "Notes", fr: "Notes" },
        type: "textarea",
      },
    ],
    [
      name,
      phone,
      email,
      {
        name: "apptDate",
        label: { en: "Preferred appointment date (optional)", fr: "Date de rendez-vous préférée (facultatif)" },
        type: "date",
        half: true,
      },
      {
        name: "apptTime",
        label: { en: "Preferred time (optional)", fr: "Heure préférée (facultatif)" },
        type: "select",
        half: true,
        options: [
          { en: "Morning", fr: "Matin" },
          { en: "Afternoon", fr: "Après-midi" },
          { en: "Evening", fr: "Soirée" },
        ],
      },
      preferredContact,
    ],
  ],
};

/* ── 4. Repair estimate ── */
export const repairForm: FormConfig = {
  type: "repair",
  title: { en: "Request a Repair Estimate", fr: "Demander une estimation de réparation" },
  intro: {
    en: "Photo estimates are preliminary — final pricing is confirmed after in-store inspection.",
    fr: "Les estimations par photo sont préliminaires — le prix final est confirmé après inspection en boutique.",
  },
  stepTitles: [
    { en: "The item", fr: "L'article" },
    { en: "Your details", fr: "Vos coordonnées" },
  ],
  steps: [
    [
      {
        name: "itemType",
        label: { en: "Item type", fr: "Type d'article" },
        type: "select",
        required: true,
        options: [
          { en: "Ring", fr: "Bague" },
          { en: "Chain / necklace", fr: "Chaîne / collier" },
          { en: "Bracelet", fr: "Bracelet" },
          { en: "Earrings", fr: "Boucles d'oreilles" },
          { en: "Watch", fr: "Montre" },
          { en: "Other", fr: "Autre" },
        ],
      },
      {
        name: "problem",
        label: { en: "Problem description", fr: "Description du problème" },
        type: "textarea",
        required: true,
        placeholder: {
          en: "e.g. broken clasp, loose stone, needs resizing…",
          fr: "ex. fermoir brisé, pierre lousse, mise à grandeur…",
        },
      },
      {
        name: "photos",
        label: { en: "Photos of the item", fr: "Photos de l'article" },
        type: "file",
      },
      {
        name: "urgency",
        label: { en: "Urgency", fr: "Urgence" },
        type: "radio",
        required: true,
        options: [
          { en: "No rush", fr: "Pas pressé" },
          { en: "This week", fr: "Cette semaine" },
          { en: "As soon as possible", fr: "Dès que possible" },
        ],
      },
    ],
    [name, phone, email, preferredContact],
  ],
};

/* ── 5. Appointment request ── */
export const appointmentForm: FormConfig = {
  type: "appointment",
  title: { en: "Request an Appointment", fr: "Demander un rendez-vous" },
  intro: {
    en: "Tell us when works — we'll confirm by your preferred method.",
    fr: "Dites-nous quand cela vous convient — nous confirmerons par votre méthode préférée.",
  },
  steps: [
    [
      name,
      phone,
      email,
      {
        name: "appointmentType",
        label: { en: "Appointment type", fr: "Type de rendez-vous" },
        type: "select",
        required: true,
        options: [
          { en: "Engagement consultation", fr: "Consultation fiançailles" },
          { en: "Custom jewelry consultation", fr: "Consultation sur mesure" },
          { en: "Repair drop-off", fr: "Dépôt pour réparation" },
          { en: "Watch service", fr: "Service de montre" },
          { en: "General visit", fr: "Visite générale" },
        ],
      },
      {
        name: "date",
        label: { en: "Preferred date", fr: "Date préférée" },
        type: "date",
        required: true,
        half: true,
      },
      {
        name: "time",
        label: { en: "Preferred time", fr: "Heure préférée" },
        type: "select",
        required: true,
        half: true,
        options: [
          { en: "Morning", fr: "Matin" },
          { en: "Afternoon", fr: "Après-midi" },
          { en: "Evening", fr: "Soirée" },
        ],
      },
      {
        name: "message",
        label: { en: "Notes (optional)", fr: "Notes (facultatif)" },
        type: "textarea",
      },
      preferredContact,
    ],
  ],
};

/* ── 6. General contact ── */
export const contactForm: FormConfig = {
  type: "contact",
  title: { en: "Contact Us", fr: "Contactez-nous" },
  intro: {
    en: "A question, a piece, a project — we answer everything.",
    fr: "Une question, une pièce, un projet — nous répondons à tout.",
  },
  steps: [[name, phone, email, message(true), preferredContact]],
};

export const FORM_CONFIGS = {
  product: productForm,
  instagram: instagramForm,
  custom: customForm,
  repair: repairForm,
  appointment: appointmentForm,
  contact: contactForm,
} as const;

export type FormKind = keyof typeof FORM_CONFIGS;
