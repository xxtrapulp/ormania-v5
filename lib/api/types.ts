/**
 * Shared API types — used by mock API now, ready for real backend swap later.
 */

export type LeadStatus =
  | "new"
  | "contacted"
  | "waiting"
  | "quoteSent"
  | "approved"
  | "inProgress"
  | "ready"
  | "completed"
  | "lost";

export type LeadType =
  | "product"
  | "instagram"
  | "custom"
  | "repair"
  | "appointment"
  | "contact"
  | "quickAsk"
  | "concierge"
  | "reserve"
  | "saved"
  | "compare"
  | "proposal";

export type LeadSource =
  | "hero_cta"
  | "instagram_card"
  | "screenshot_upload"
  | "repair_section"
  | "custom_section"
  | "engagement_section"
  | "mobile_sticky_bar"
  | "tools_section"
  | "visit_section"
  | "quick_ask"
  | "saved_pieces"
  | "compare_drawer"
  | "pitch_page";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  type: LeadType;
  source: LeadSource;
  status: LeadStatus;
  message?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  notes: string[];
  preferredContact: "phone" | "text" | "email" | "ig";
  similarPreference?: "yes" | "no" | "open";
  relatedPiece?: string;
  savedPieces?: string[];
}

export interface LeadStats {
  total: number;
  new: number;
  pending: number;
  instagram: number;
  repair: number;
  custom: number;
  appointment: number;
}

export interface AnalyticsSummary {
  topSources: { source: LeadSource; count: number }[];
  topPieces: { piece: string; count: number }[];
  dailyLeads: { date: string; count: number }[];
}
