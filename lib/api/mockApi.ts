/**
 * Mock API layer — generates realistic leads and analytics.
 * Swap this file for real backend integration when ready.
 */

import type { Lead, LeadStats, AnalyticsSummary, LeadStatus, LeadType, LeadSource } from "./types";

const NAMES = [
  "Sarah M.", "Alex T.", "Marie L.", "David R.", "Emma B.", "James K.",
  "Sophie G.", "Michael P.", "Julie C.", "Robert H.", "Laura D.", "Chris F.",
  "Nathalie V.", "Eric W.", "Amanda S.", "Philippe N.", "Jessica J.", "Thomas B.",
  "Caroline M.", "Daniel K.", "Melanie R.", "Simon L.", "Isabelle P.", "Patrick G.",
];

const PIECES = [
  "Lab-Grown Tennis Bracelet",
  "Halo Diamond Necklace",
  "Stack Your Rings",
  "Gold Chain 18\"",
  "Engagement Ring",
  "Pearl Earrings",
  "Men's Signet Ring",
  "Custom Pendant",
  "Watch Battery Service",
  "Ring Resizing",
];

const MESSAGES: Record<LeadType, string[]> = {
  product: ["Interested in this piece.", "Is this available in store?", "What's the price?"],
  instagram: ["Saw this on Instagram, is it available?", "Love this reel, do you have it?", "Can you help me find this piece?"],
  custom: ["Want to design a custom ring.", "Looking for a unique necklace.", "Can you recreate this design?"],
  repair: ["Need to resize a ring.", "Chain is broken, can you fix it?", "Watch battery needs replacing."],
  appointment: ["Would like to book a consultation.", "Can I come in this week?", "Looking for engagement ring guidance."],
  contact: ["General question about services.", "What are your hours?", "Do you offer engraving?"],
  quickAsk: ["Quick question about a piece.", "Just looking for recommendations.", "What's your price range?"],
  concierge: ["Need help choosing a gift.", "Looking for anniversary ideas.", "What would you recommend?"],
  reserve: ["Want to reserve this for viewing.", "Can I see this in person?", "Holding it for Saturday."],
  saved: ["Interested in these saved pieces.", "Can you tell me more about these?", "Comparing these options."],
  compare: ["Comparing these pieces.", "Which would you recommend?", "Help me decide between these."],
  proposal: ["Need help with a proposal ring.", "Ring size advice needed.", "Engagement timeline help."],
};

const SOURCES: LeadSource[] = [
  "hero_cta", "instagram_card", "repair_section", "custom_section",
  "engagement_section", "mobile_sticky_bar", "quick_ask", "visit_section",
];

const STATUSES: LeadStatus[] = [
  "new", "contacted", "waiting", "quoteSent", "approved",
  "inProgress", "ready", "completed", "lost",
];

const TYPES: LeadType[] = [
  "product", "instagram", "custom", "repair", "appointment",
  "contact", "quickAsk", "concierge", "reserve",
];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(daysBack: number): string {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  return d.toISOString();
}

export function generateMockLeads(count = 25): Lead[] {
  return Array.from({ length: count }).map((_, i) => {
    const type = random(TYPES);
    const status = random(STATUSES);
    const source = random(SOURCES);
    const hasImages = Math.random() > 0.6;
    const hasEmail = Math.random() > 0.4;
    const hasSimilar = type === "instagram" || type === "product";

    return {
      id: `LEAD-${1000 + i}`,
      name: random(NAMES),
      phone: `+1 (450) ${Math.floor(100 + Math.random() * 899)}-${Math.floor(1000 + Math.random() * 8999)}`,
      email: hasEmail ? `customer${i}@example.com` : undefined,
      type,
      source,
      status,
      message: random(MESSAGES[type]),
      images: hasImages ? [`/placeholder/repair-${i}.jpg`] : [],
      createdAt: randomDate(14),
      updatedAt: randomDate(7),
      notes: [],
      preferredContact: random(["phone", "text", "email", "ig"]),
      similarPreference: hasSimilar ? random(["yes", "no", "open"]) : undefined,
      relatedPiece: Math.random() > 0.5 ? random(PIECES) : undefined,
      savedPieces: type === "saved" ? [random(PIECES), random(PIECES)] : undefined,
    };
  });
}

export function getLeadStats(leads: Lead[]): LeadStats {
  return {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    pending: leads.filter((l) => ["contacted", "waiting", "quoteSent"].includes(l.status)).length,
    instagram: leads.filter((l) => l.type === "instagram").length,
    repair: leads.filter((l) => l.type === "repair").length,
    custom: leads.filter((l) => l.type === "custom").length,
    appointment: leads.filter((l) => l.type === "appointment").length,
  };
}

export function getAnalytics(leads: Lead[]): AnalyticsSummary {
  const sourceMap = new Map<string, number>();
  const pieceMap = new Map<string, number>();
  const dailyMap = new Map<string, number>();

  for (const lead of leads) {
    sourceMap.set(lead.source, (sourceMap.get(lead.source) || 0) + 1);
    if (lead.relatedPiece) {
      pieceMap.set(lead.relatedPiece, (pieceMap.get(lead.relatedPiece) || 0) + 1);
    }
    const date = lead.createdAt.split("T")[0];
    dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
  }

  return {
    topSources: Array.from(sourceMap.entries())
      .map(([source, count]) => ({ source: source as LeadSource, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6),
    topPieces: Array.from(pieceMap.entries())
      .map(([piece, count]) => ({ piece, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6),
    dailyLeads: Array.from(dailyMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)),
  };
}
