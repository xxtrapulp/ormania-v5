/**
 * EN / FR dictionaries. Every user-facing string flows through t(lang, key)
 * so French is fully implementable. Routes: /en/* and /fr/*.
 */

export type Lang = "en" | "fr";
export const LANGS: Lang[] = ["en", "fr"];

const dict = {
  /* Nav */
  "nav.home": ["Home", "Accueil"],
  "nav.collections": ["Collections", "Collections"],
  "nav.instagram": ["Instagram", "Instagram"],
  "nav.custom": ["Custom", "Sur mesure"],
  "nav.repairs": ["Repairs", "Réparations"],
  "nav.engagement": ["Engagement", "Fiançailles"],
  "nav.visit": ["Visit", "Visite"],
  "nav.explore": ["Tools", "Outils"],
  "nav.book": ["Book Consultation", "Prendre rendez-vous"],
  "nav.bookShort": ["Book", "RDV"],
  "skip": ["Skip to content", "Aller au contenu"],

  /* Hero */
  "hero.eyebrow": ["Bijouterie Ormania — Laval", "Bijouterie Ormania — Laval"],
  "hero.headline.1": ["Jewelry made to be", "Des bijoux faits pour être"],
  "hero.headline.2": ["remembered.", "mémorables."],
  "hero.sub": [
    "Fine jewelry, custom pieces, repairs, watches, and timeless gifts — in the heart of Laval.",
    "Bijouterie fine, pièces sur mesure, réparations, montres et cadeaux intemporels — au cœur de Laval.",
  ],
  "hero.explore": ["Explore Collections", "Voir les collections"],
  "hero.exploreShort": ["Explore", "Explorer"],
  "hero.book": ["Book a Consultation", "Prendre rendez-vous"],
  "hero.bookShort": ["Book", "RDV"],
  "hero.igLink": ["Seen something on Instagram?", "Vu quelque chose sur Instagram ?"],
  "hero.scroll": ["Scroll", "Défiler"],

  /* Sticky bar */
  "mab.call": ["Call", "Appeler"],
  "mab.callShort": ["Call", "Appel"],
  "mab.directions": ["Directions", "Itinéraire"],
  "mab.directionsShort": ["Map", "Carte"],
  "mab.ig": ["Instagram", "Instagram"],
  "mab.igShort": ["IG", "IG"],
  "mab.book": ["Book", "RDV"],

  /* Sections */
  "collections.eyebrow": ["Discover", "Découvrir"],
  "collections.title": ["Our collections, ready in store.", "Nos collections, prêtes en boutique."],
  "collections.sub": [
    "From everyday pieces to heirloom commissions — browse what's at Ormania this season.",
    "Des pièces de tous les jours aux commandes d'exception — découvrez Ormania cette saison.",
  ],
  "collections.view": ["View", "Voir"],
  "ig.eyebrow": ["Seen on Instagram", "Vu sur Instagram"],
  "ig.title": ["From our Instagram to your hands.", "De notre Instagram à vos mains."],
  "ig.sub": [
    "Every piece on our feed is real and in our Laval boutique. See something you love? Ask us about it.",
    "Chaque pièce de notre fil est réelle et dans notre boutique de Laval. Un coup de cœur ? Demandez-nous.",
  ],
  "ig.ask": ["Ask About This", "Demander"],
  "ig.recent": ["Recently posted", "Publié récemment"],
  "ig.reel": ["Reel", "Réel"],
  "ig.uploadCta": ["Upload a Screenshot", "Téléverser une capture"],
  "ig.linkCta": ["Paste an Instagram Link", "Coller un lien Instagram"],
  "ig.followCta": ["Follow on Instagram", "Suivre sur Instagram"],
  "ig.viewAll": ["See the Full Showroom", "Voir tout le showroom"],

  "custom.eyebrow": ["Custom Jewelry", "Bijoux sur mesure"],
  "custom.title": ["If you can imagine it, we can make it.", "Si vous pouvez l'imaginer, nous pouvons le créer."],
  "custom.sub": [
    "From a sketch on a napkin to a screenshot from Instagram — our bench brings one-of-one pieces to life.",
    "D'un croquis sur une serviette à une capture d'écran Instagram — notre atelier donne vie à des pièces uniques.",
  ],
  "custom.cta": ["Start a Custom Request", "Démarrer une demande"],
  "custom.ctaShort": ["Start Request", "Démarrer"],

  "repairs.eyebrow": ["Repairs & Care", "Réparations et entretien"],
  "repairs.title": ["Bring it back to life.", "Redonnez-lui vie."],
  "repairs.sub": [
    "Sizing, stones, clasps, polish, watch batteries — most repairs are done in-house in Laval.",
    "Mise à grandeur, pierres, fermoirs, polissage, piles de montre — la plupart des réparations sont faites sur place à Laval.",
  ],
  "repairs.cta": ["Request a Repair Estimate", "Demander une estimation"],
  "repairs.ctaShort": ["Repair Estimate", "Estimation"],
  "repairs.photosCta": ["Send Us Photos First", "Envoyez-nous des photos"],
  "repairs.trust": [
    "Estimates from photos are preliminary — final pricing is always confirmed after in-store inspection.",
    "Les estimations à partir de photos sont préliminaires — le prix final est toujours confirmé après inspection en boutique.",
  ],
  "repairs.tracker": ["How your repair moves", "Le parcours de votre réparation"],

  "engagement.eyebrow": ["Engagement", "Fiançailles"],
  "engagement.title": ["The yes deserves Ormania.", "Le oui mérite Ormania."],
  "engagement.sub": [
    "Natural and lab-grown diamonds, private consultations, and a ring made for one story — yours.",
    "Diamants naturels et de laboratoire, consultations privées et une bague faite pour une seule histoire — la vôtre.",
  ],
  "engagement.cta": ["Book Engagement Consultation", "Consultation fiançailles"],
  "engagement.ctaShort": ["Book", "RDV"],

  "why.eyebrow": ["Why Ormania", "Pourquoi Ormania"],
  "why.title": ["A boutique, not a counter.", "Une boutique, pas un comptoir."],

  "visit.eyebrow": ["Visit Us", "Visitez-nous"],
  "visit.title": ["In the heart of Laval.", "Au cœur de Laval."],
  "visit.directions": ["Get Directions", "Itinéraire"],
  "visit.directionsShort": ["Directions", "Itinéraire"],
  "visit.call": ["Call the Boutique", "Appeler la boutique"],
  "visit.callShort": ["Call", "Appeler"],
  "visit.hours": ["Store Hours", "Heures d'ouverture"],
  "visit.open": ["Open now", "Ouvert maintenant"],
  "visit.closed": ["Closed now", "Fermé maintenant"],
  "visit.contactCta": ["Send a Message", "Envoyer un message"],

  "tools.eyebrow": ["Tools", "Outils"],
  "tools.title": ["Little helpers, big decisions.", "Petits outils, grandes décisions."],
  "tools.preview": ["Preview", "Aperçu"],
  "tools.live": ["Live", "En ligne"],
  "tools.soon": ["Coming soon", "Bientôt"],

  /* Forms — shared */
  "form.name": ["Name", "Nom"],
  "form.phone": ["Phone", "Téléphone"],
  "form.email": ["Email", "Courriel"],
  "form.instagram": ["Instagram handle", "Identifiant Instagram"],
  "form.message": ["Message", "Message"],
  "form.notes": ["Notes", "Notes"],
  "form.preferredContact": ["Preferred contact method", "Méthode de contact préférée"],
  "form.contact.phone": ["Phone call", "Appel téléphonique"],
  "form.contact.text": ["Text message", "Message texte"],
  "form.contact.email": ["Email", "Courriel"],
  "form.contact.ig": ["Instagram DM", "Message Instagram"],
  "form.continue": ["Continue", "Continuer"],
  "form.back": ["Back", "Retour"],
  "form.submit": ["Send Request", "Envoyer"],
  "form.submitting": ["Sending…", "Envoi…"],
  "form.optional": ["optional", "facultatif"],
  "form.upload": ["Add photos", "Ajouter des photos"],
  "form.uploadHint": ["JPG or PNG, up to 5 photos", "JPG ou PNG, jusqu'à 5 photos"],
  "form.remove": ["Remove", "Retirer"],
  "form.required": ["This field is required", "Ce champ est requis"],
  "form.invalidEmail": ["Enter a valid email", "Entrez un courriel valide"],
  "form.successTitle": ["Request received.", "Demande reçue."],
  "form.successBody": [
    "Thank you — we'll get back to you within one business day. Your reference number:",
    "Merci — nous vous répondrons dans un jour ouvrable. Votre numéro de référence :",
  ],
  "form.successClose": ["Done", "Terminé"],
  "form.error": ["Something went wrong. Please try again or call us.", "Une erreur est survenue. Réessayez ou appelez-nous."],
  "form.step": ["Step", "Étape"],
  "form.of": ["of", "de"],

  /* Form titles */
  "form.product.title": ["Ask About This Piece", "Demander à propos de cette pièce"],
  "form.product.piece": ["Product / piece name", "Nom du produit / de la pièce"],
  "form.ig.title": ["Instagram Piece Inquiry", "Demande — pièce Instagram"],
  "form.ig.link": ["Instagram post or reel link", "Lien de la publication ou du réel"],
  "form.ig.screenshot": ["Screenshot", "Capture d'écran"],
  "form.ig.intent": ["What are you looking for?", "Que recherchez-vous ?"],
  "form.ig.exact": ["The exact piece", "La pièce exacte"],
  "form.ig.similar": ["Something similar", "Quelque chose de similaire"],
  "form.ig.identify": ["Help identifying it", "Aide pour l'identifier"],
  "form.custom.title": ["Custom Jewelry Request", "Demande de bijou sur mesure"],
  "form.custom.type": ["Jewelry type", "Type de bijou"],
  "form.custom.metal": ["Metal preference", "Métal préféré"],
  "form.custom.stone": ["Stone preference", "Pierre préférée"],
  "form.custom.budget": ["Budget range", "Budget"],
  "form.custom.deadline": ["Deadline", "Échéance"],
  "form.custom.engraving": ["Engraving request", "Gravure souhaitée"],
  "form.custom.inspiration": ["Inspiration photos", "Photos d'inspiration"],
  "form.custom.datetime": ["Preferred appointment date / time", "Date / heure de rendez-vous préférée"],
  "form.repair.title": ["Repair Estimate Request", "Demande d'estimation de réparation"],
  "form.repair.itemType": ["Item type", "Type d'article"],
  "form.repair.problem": ["Problem description", "Description du problème"],
  "form.repair.urgency": ["Urgency", "Urgence"],
  "form.repair.photos": ["Photos of the item", "Photos de l'article"],
  "form.appt.title": ["Request an Appointment", "Demander un rendez-vous"],
  "form.appt.type": ["Appointment type", "Type de rendez-vous"],
  "form.appt.date": ["Preferred date", "Date préférée"],
  "form.appt.time": ["Preferred time", "Heure préférée"],
  "form.contact.title": ["Contact Us", "Contactez-nous"],

  /* Footer */
  "footer.tagline": ["Jewelry made to be remembered.", "Des bijoux faits pour être mémorables."],
  "footer.explore": ["Explore", "Explorer"],
  "footer.services": ["Services", "Services"],
  "footer.visit": ["Visit", "Visite"],
  "footer.privacy": ["Privacy", "Confidentialité"],
  "footer.terms": ["Terms", "Conditions"],
  "footer.staff": ["Staff", "Personnel"],
  "footer.rights": ["All rights reserved.", "Tous droits réservés."],
} as const;

export type DictKey = keyof typeof dict;

export function t(lang: Lang, key: DictKey): string {
  const entry = dict[key];
  if (!entry) return key;
  return lang === "fr" ? entry[1] : entry[0];
}

export function isLang(v: string): v is Lang {
  return v === "en" || v === "fr";
}
