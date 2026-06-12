"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/lib/store";
import { X, Phone, Mail, MessageCircle, Check, ArrowRight } from "lucide-react";

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  contacted: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  waiting: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  quote: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  approved: "bg-gold/15 text-gold border-gold/30",
  progress: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ready: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  done: "bg-text-3/15 text-text-3 border-text-3/20",
  lost: "bg-red-500/15 text-red-400 border-red-500/30",
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New", contacted: "Contacted", waiting: "Waiting",
  quote: "Quote Sent", approved: "Approved", progress: "In Progress",
  ready: "Ready", done: "Completed", lost: "Lost",
};

const QUICK_ACTIONS = [
  { label: "Mark Contacted", icon: Check },
  { label: "Send Quote", icon: ArrowRight },
  { label: "Add Note", icon: MessageCircle },
  { label: "Call Customer", icon: Phone },
];

export function LeadDetailPanel({
  lead,
  onClose,
}: {
  lead: Lead | null;
  onClose: () => void;
}) {
  if (!lead) return null;

  return (
    <motion.div
      className="fixed inset-y-0 right-0 z-[250] w-full sm:w-[28rem] bg-ink-2 border-l border-(--line) shadow-2xl flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-(--line)">
        <div>
          <h2 className="font-serif text-[1.1rem] text-ivory">{lead.name}</h2>
          <span className="text-[0.75rem] text-text-3 font-mono">{lead.id}</span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-text-2 hover:text-ivory transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Status badge */}
        <div className="flex items-center gap-2">
          <span className={cn("px-2.5 py-1 rounded-full text-[0.75rem] font-medium border", STATUS_COLORS[lead.status])}>
            {STATUS_LABELS[lead.status]}
          </span>
          <span className="text-[0.75rem] text-text-3">{lead.type}</span>
        </div>

        {/* Contact info */}
        <div className="rounded-xl border border-(--line) bg-ink p-4 space-y-3">
          <h3 className="text-[0.8rem] text-text-3 uppercase tracking-wide font-medium">Contact</h3>
          <div className="flex items-center gap-3 text-[0.85rem]">
            <Phone size={14} className="text-gold" />
            <span className="text-ivory">{lead.phone}</span>
          </div>
          {lead.email && (
            <div className="flex items-center gap-3 text-[0.85rem]">
              <Mail size={14} className="text-gold" />
              <span className="text-ivory">{lead.email}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-[0.85rem]">
            <MessageCircle size={14} className="text-gold" />
            <span className="text-text-2 capitalize">{lead.preferredContact}</span>
          </div>
        </div>

        {/* Message */}
        {lead.message && (
          <div className="rounded-xl border border-(--line) bg-ink p-4">
            <h3 className="text-[0.8rem] text-text-3 uppercase tracking-wide font-medium mb-2">Message</h3>
            <p className="text-[0.9rem] text-ivory leading-relaxed">{lead.message}</p>
          </div>
        )}

        {/* Extras */}
        {Object.keys(lead.extras).length > 0 && (
          <div className="rounded-xl border border-(--line) bg-ink p-4">
            <h3 className="text-[0.8rem] text-text-3 uppercase tracking-wide font-medium mb-2">Details</h3>
            {Object.entries(lead.extras).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 text-[0.85rem]">
                <span className="text-text-3 capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                <span className="text-ivory">{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* Attachments */}
        {lead.attachments.length > 0 && (
          <div>
            <h3 className="text-[0.8rem] text-text-3 uppercase tracking-wide font-medium mb-2">Photos ({lead.attachments.length})</h3>
            <div className="grid grid-cols-3 gap-2">
              {lead.attachments.map((a, i) => (
                <div key={i} className="aspect-square rounded-lg bg-ink-3 border border-(--line) flex items-center justify-center">
                  <span className="text-[0.65rem] text-text-3">{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div>
          <h3 className="text-[0.8rem] text-text-3 uppercase tracking-wide font-medium mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-(--line) bg-ink text-[0.8rem] text-ivory hover:border-(--line-2) transition-colors"
                >
                  <Icon size={14} className="text-gold" />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-[0.8rem] text-text-3 uppercase tracking-wide font-medium mb-2">Timeline</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-gold mt-1.5 shrink-0" />
              <div>
                <p className="text-[0.85rem] text-ivory">Lead created</p>
                <p className="text-[0.75rem] text-text-3">{new Date(lead.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-text-3 mt-1.5 shrink-0" />
              <div>
                <p className="text-[0.85rem] text-ivory">Last updated</p>
                <p className="text-[0.75rem] text-text-3">{new Date(lead.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
