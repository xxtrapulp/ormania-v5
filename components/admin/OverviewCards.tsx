"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type Lead } from "@/lib/store";
import { AnimatedCounter } from "@/components/design-system/AnimatedCounter";

interface LeadStats {
  total: number;
  new: number;
  pending: number;
  instagram: number;
  repair: number;
  custom: number;
  appointment: number;
}
import { Users, Camera, Wrench, Gem, CalendarDays, Clock } from "lucide-react";

const CARDS = [
  { key: "total" as const, label: "Total Leads", icon: Users, color: "text-ivory" },
  { key: "new" as const, label: "New", icon: Users, color: "text-emerald-400" },
  { key: "pending" as const, label: "Pending Reply", icon: Clock, color: "text-amber-400" },
  { key: "instagram" as const, label: "Instagram", icon: Camera, color: "text-pink-400" },
  { key: "repair" as const, label: "Repairs", icon: Wrench, color: "text-sky-400" },
  { key: "custom" as const, label: "Custom", icon: Gem, color: "text-gold" },
  { key: "appointment" as const, label: "Appointments", icon: CalendarDays, color: "text-violet-400" },
];

export function OverviewCards({ stats }: { stats: LeadStats }) {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
      {CARDS.map((card, i) => {
        const Icon = card.icon;
        const value = stats[card.key];
        return (
          <motion.div
            key={card.key}
            className="rounded-xl border border-(--line) bg-ink p-4"
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Icon size={16} strokeWidth={1.5} className={`mb-2 ${card.color}`} />
            <div className="font-serif text-[1.35rem] text-ivory">
              <AnimatedCounter end={value} duration={1.2} />
            </div>
            <div className="text-[0.7rem] text-text-3 mt-0.5">{card.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
