/**
 * Ormania lead store — localStorage MVP, mirrors the Supabase-ready schema.
 * Swap the read/write functions for a real backend with no UI changes.
 */

export type LeadType =
  | "product"
  | "instagram"
  | "custom"
  | "repair"
  | "appointment"
  | "contact";

export type LeadStatus =
  | "new"
  | "contacted"
  | "waiting"
  | "quote"
  | "approved"
  | "progress"
  | "ready"
  | "done"
  | "lost";

export const LEAD_STATUSES: { id: LeadStatus; label: string; labelFr: string }[] = [
  { id: "new", label: "New", labelFr: "Nouveau" },
  { id: "contacted", label: "Contacted", labelFr: "Contacté" },
  { id: "waiting", label: "Waiting for customer", labelFr: "En attente du client" },
  { id: "quote", label: "Quote sent", labelFr: "Devis envoyé" },
  { id: "approved", label: "Approved", labelFr: "Approuvé" },
  { id: "progress", label: "In progress", labelFr: "En cours" },
  { id: "ready", label: "Ready for pickup", labelFr: "Prêt pour ramassage" },
  { id: "done", label: "Completed", labelFr: "Terminé" },
  { id: "lost", label: "Lost", labelFr: "Perdu" },
];

export interface LeadAttachment {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

export interface LeadNote {
  text: string;
  at: string;
}

export interface Lead {
  id: string;
  type: LeadType;
  status: LeadStatus;
  name: string;
  phone?: string;
  email?: string;
  instagram?: string;
  message?: string;
  preferredContact?: string;
  /** Type-specific fields collected from forms */
  extras: Record<string, string>;
  attachments: LeadAttachment[];
  notes: LeadNote[];
  createdAt: string;
  updatedAt: string;
}

const LEADS_KEY = "ormania.leads.v1";
const SEED_KEY = "ormania.seeded.v5";

function read(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LEADS_KEY) ?? "[]") as Lead[];
  } catch {
    return [];
  }
}

function write(leads: Lead[]) {
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function makeRef(type: LeadType): string {
  const prefix: Record<LeadType, string> = {
    product: "PR",
    instagram: "IG",
    custom: "CU",
    repair: "RE",
    appointment: "AP",
    contact: "CT",
  };
  const n = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ORM-${prefix[type]}-${n}`;
}

export function getLeads(): Lead[] {
  seedDemoLeads();
  return read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getLead(id: string): Lead | undefined {
  return read().find((l) => l.id === id);
}

export function createLead(
  input: Omit<Lead, "id" | "status" | "notes" | "createdAt" | "updatedAt">
): Lead {
  const now = new Date().toISOString();
  const lead: Lead = {
    ...input,
    id: makeRef(input.type),
    status: "new",
    notes: [],
    createdAt: now,
    updatedAt: now,
  };
  const leads = read();
  leads.push(lead);
  write(leads);
  return lead;
}

export function updateLead(id: string, patch: Partial<Lead>): Lead | undefined {
  const leads = read();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  leads[idx] = { ...leads[idx], ...patch, updatedAt: new Date().toISOString() };
  write(leads);
  return leads[idx];
}

export function addNote(id: string, text: string): Lead | undefined {
  const lead = getLead(id);
  if (!lead) return undefined;
  return updateLead(id, {
    notes: [...lead.notes, { text, at: new Date().toISOString() }],
  });
}

export function deleteLead(id: string) {
  write(read().filter((l) => l.id !== id));
}

/* ── Demo seed so the admin preview feels realistic ── */
export function seedDemoLeads() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(SEED_KEY)) return;
  localStorage.setItem(SEED_KEY, "1");
  if (read().length > 0) return;

  const days = (n: number) =>
    new Date(Date.now() - n * 86400000).toISOString();

  const demo: Lead[] = [
    {
      id: "ORM-IG-DEMO1",
      type: "instagram",
      status: "new",
      name: "Sarah Tremblay",
      phone: "(514) 555-0182",
      email: "sarah.t@example.com",
      instagram: "@sarah.trmb",
      message: "I saw this tennis bracelet on your page — is it still available?",
      preferredContact: "Instagram DM",
      extras: {
        igLink: "https://www.instagram.com/p/DSAifEiDouU/",
        intent: "Exact piece",
      },
      attachments: [],
      notes: [{ text: "Piece is in store — DM sent with pricing.", at: days(1) }],
      createdAt: days(1),
      updatedAt: days(1),
    },
    {
      id: "ORM-RE-DEMO2",
      type: "repair",
      status: "quote",
      name: "Marc Bélanger",
      phone: "(450) 555-0147",
      email: "marc.b@example.com",
      message: "Clasp on my gold chain broke. Also needs a polish.",
      preferredContact: "Phone",
      extras: { itemType: "Chain / necklace", problem: "Broken clasp + polish", urgency: "This week" },
      attachments: [],
      notes: [{ text: "Quoted $85 — waiting on approval.", at: days(2) }],
      createdAt: days(3),
      updatedAt: days(2),
    },
    {
      id: "ORM-CU-DEMO3",
      type: "custom",
      status: "progress",
      name: "Amira Haddad",
      phone: "(514) 555-0093",
      email: "amira.h@example.com",
      message: "Custom pearl earrings to match my mother's necklace — 65th birthday gift.",
      preferredContact: "Email",
      extras: {
        jewelryType: "Earrings",
        metal: "Yellow gold",
        stone: "Pearl",
        budget: "$800–$1,500",
        deadline: "Before Dec 15",
      },
      attachments: [],
      notes: [
        { text: "Design approved. Pearls ordered from supplier.", at: days(4) },
        { text: "CAD render sent — client loved it.", at: days(7) },
      ],
      createdAt: days(10),
      updatedAt: days(4),
    },
    {
      id: "ORM-AP-DEMO4",
      type: "appointment",
      status: "contacted",
      name: "David Nguyen",
      phone: "(438) 555-0214",
      email: "d.nguyen@example.com",
      message: "Looking at engagement rings, around 1ct.",
      preferredContact: "Text",
      extras: {
        appointmentType: "Engagement consultation",
        date: "Saturday",
        time: "Afternoon",
      },
      attachments: [],
      notes: [{ text: "Confirmed for Saturday 2pm.", at: days(1) }],
      createdAt: days(2),
      updatedAt: days(1),
    },
    {
      id: "ORM-RE-DEMO5",
      type: "repair",
      status: "ready",
      name: "Linda Rossi",
      phone: "(450) 555-0166",
      message: "Watch battery replacement — Baume & Mercier.",
      preferredContact: "Phone",
      extras: { itemType: "Watch", problem: "Battery replacement", urgency: "No rush" },
      attachments: [],
      notes: [{ text: "Battery replaced + pressure tested. Called client.", at: days(0) }],
      createdAt: days(5),
      updatedAt: days(0),
    },
  ];
  write(demo);
}

/* ── Admin passcode (demo) ── */
const PASS_KEY = "ormania.admin.pass";
export function getPasscode(): string {
  if (typeof window === "undefined") return "1234";
  return localStorage.getItem(PASS_KEY) ?? "1234";
}
export function setPasscode(p: string) {
  localStorage.setItem(PASS_KEY, p);
}
