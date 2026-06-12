"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Lead, LeadStatus, LeadType } from "@/lib/store";

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
  new: "New",
  contacted: "Contacted",
  waiting: "Waiting",
  quote: "Quote Sent",
  approved: "Approved",
  progress: "In Progress",
  ready: "Ready",
  done: "Completed",
  lost: "Lost",
};

const TYPE_LABELS: Record<LeadType, string> = {
  product: "Product",
  instagram: "Instagram",
  custom: "Custom",
  repair: "Repair",
  appointment: "Appointment",
  contact: "Contact",
};

export function LeadsTable({
  leads,
  onSelect,
}: {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
}) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<LeadType | "all">("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const filtered = filter === "all" ? leads : leads.filter((l) => l.type === filter);
  const sorted = [...filtered].sort((a, b) => {
    const cmp = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return sort === "newest" ? cmp : -cmp;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as LeadType | "all")}
          className="h-9 px-3 rounded-lg bg-ink border border-(--line) text-ivory text-[0.8rem] focus:border-gold/40 focus:outline-none"
        >
          <option value="all">All Types</option>
          {Object.entries(TYPE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
          className="h-9 px-3 rounded-lg bg-ink border border-(--line) text-ivory text-[0.8rem] focus:border-gold/40 focus:outline-none"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <span className="text-[0.8rem] text-text-3 ml-auto">{sorted.length} leads</span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-(--line) overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-(--line) bg-ink-2">
                <th className="px-4 py-3 text-[0.75rem] text-text-3 font-medium uppercase tracking-wide">ID</th>
                <th className="px-4 py-3 text-[0.75rem] text-text-3 font-medium uppercase tracking-wide">Name</th>
                <th className="px-4 py-3 text-[0.75rem] text-text-3 font-medium uppercase tracking-wide">Type</th>
                <th className="px-4 py-3 text-[0.75rem] text-text-3 font-medium uppercase tracking-wide hidden md:table-cell">Source</th>
                <th className="px-4 py-3 text-[0.75rem] text-text-3 font-medium uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-[0.75rem] text-text-3 font-medium uppercase tracking-wide hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  className="border-b border-(--line) hover:bg-[rgba(255,255,255,0.02)] cursor-pointer transition-colors"
                  initial={reduce ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  onClick={() => onSelect(lead)}
                >
                  <td className="px-4 py-3 text-[0.8rem] text-text-3 font-mono">{lead.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-[0.85rem] text-ivory font-medium">{lead.name}</div>
                    <div className="text-[0.75rem] text-text-3">{lead.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[0.8rem] text-text-2">{TYPE_LABELS[lead.type]}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-[0.8rem] text-text-3">{lead.instagram || lead.preferredContact}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex px-2 py-0.5 rounded-full text-[0.7rem] font-medium border", STATUS_COLORS[lead.status])}>
                      {STATUS_LABELS[lead.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[0.8rem] text-text-3 hidden sm:table-cell">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
