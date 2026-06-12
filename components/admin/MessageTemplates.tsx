"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { Copy, Check } from "lucide-react";

const TEMPLATES = [
  {
    key: "instagram",
    title: "Instagram Piece Reply",
    body: "Hi [Name], thanks for your interest in this piece. We'll check availability and get back to you shortly with options.",
  },
  {
    key: "similar",
    title: "Similar Pieces Reply",
    body: "If this exact piece is unavailable, we can also show you similar options in store. Would you like us to prepare some alternatives?",
  },
  {
    key: "repair",
    title: "Repair Reply",
    body: "Thanks for sending photos. We recommend bringing the item in so we can confirm the repair and provide a final quote.",
  },
  {
    key: "custom",
    title: "Custom Reply",
    body: "Thank you for your custom request. We'd be happy to review your idea and schedule a consultation to discuss the details.",
  },
  {
    key: "appointment",
    title: "Appointment Reply",
    body: "Thanks for your request. We'll confirm your preferred appointment time shortly and send you a reminder.",
  },
  {
    key: "pickup",
    title: "Pickup Reply",
    body: "Your item is ready for pickup at Ormania. Our hours are Mon-Sat 10-18, Thu-Fri 10-21. See you soon!",
  },
  {
    key: "review",
    title: "Review Request",
    body: "Thank you for visiting Ormania. If you enjoyed your experience, we would appreciate a Google review.",
  },
] as const;

export function MessageTemplates() {
  const reduce = useReducedMotion();
  const { ref, isInView } = useScrollReveal();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div ref={ref} className="space-y-3">
      {TEMPLATES.map((template, i) => (
        <motion.div
          key={template.key}
          className="rounded-xl border border-(--line) bg-ink p-4 group"
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[0.85rem] text-ivory font-medium">{template.title}</h3>
            <button
              onClick={() => handleCopy(template.key, template.body)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[0.7rem] font-medium transition-colors",
                copied === template.key
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-ink-2 text-text-3 hover:text-ivory border border-(--line)"
              )}
            >
              {copied === template.key ? (
                <>
                  <Check size={12} /> Copied
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy
                </>
              )}
            </button>
          </div>
          <p className="text-[0.8rem] text-text-2 leading-relaxed">{template.body}</p>
        </motion.div>
      ))}
    </div>
  );
}
