"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { ModalShell } from "./ModalShell";
import { useModal } from "./ModalSystem";
import { useMotion } from "@/components/effects/MotionContext";
import { Check, FileText, Download, Share2 } from "lucide-react";

export function ProposalModal({ lang }: { lang: Lang }) {
  const { activeModal, closeModal, modalData } = useModal();
  const { reducedMotion } = useMotion();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    timeline: "",
    details: "",
  });

  const isOpen = activeModal === "proposal";
  const pieceName = (modalData as { pieceName?: string } | undefined)?.pieceName;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
      setSubmitted(false);
      setForm({ name: "", email: "", budget: "", timeline: "", details: "" });
    }, 3000);
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <ModalShell isOpen={isOpen} title={lang === "fr" ? "Demander une proposition" : "Request a Proposal"} size="md">
      {submitted ? (
        <motion.div className="text-center py-10" initial={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-4">
            <Check size={24} className="text-gold" />
          </div>
          <h3 className="font-serif text-[1.2rem] text-ivory mb-2">{t(lang, "form.successTitle")}</h3>
          <p className="text-[0.9rem] text-text-2">{t(lang, "form.successBody")}</p>
          <div className="flex justify-center gap-3 mt-6">
            <button className="h-10 px-4 rounded-full bg-gold/10 border border-gold/30 text-gold text-[0.8rem] font-medium flex items-center gap-1.5">
              <Download size={14} /> {lang === "fr" ? "Télécharger PDF" : "Download PDF"}
            </button>
            <button className="h-10 px-4 rounded-full border border-(--line) text-text-2 text-[0.8rem] font-medium flex items-center gap-1.5">
              <Share2 size={14} /> {lang === "fr" ? "Partager" : "Share"}
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {pieceName && (
            <div className="rounded-xl bg-gold/5 border border-gold/20 p-3">
              <p className="text-[0.8rem] text-text-3">{lang === "fr" ? "Pour" : "For"}</p>
              <p className="text-[0.95rem] text-gold font-medium">{pieceName}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.name")} *</label>
              <input required type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.email")} *</label>
              <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.custom.budget")}</label>
              <input type="text" value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder={lang === "fr" ? "Votre budget" : "Your budget"} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[0.8rem] text-text-3 mb-1.5">{lang === "fr" ? "Échéance" : "Timeline"}</label>
              <input type="text" value={form.timeline} onChange={(e) => update("timeline", e.target.value)} placeholder={lang === "fr" ? "Quand en avez-vous besoin ?" : "When do you need it?"} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{lang === "fr" ? "Détails du projet" : "Project Details"}</label>
            <textarea rows={4} value={form.details} onChange={(e) => update("details", e.target.value)} placeholder={lang === "fr" ? "Décrivez ce que vous recherchez..." : "Describe what you're looking for..."} className="w-full px-4 py-3 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors resize-none" />
          </div>

          <button type="submit" className="w-full h-12 rounded-xl bg-gold text-ink font-medium text-[0.95rem] btn-sheen active:scale-[0.97] transition-transform">
            {lang === "fr" ? "Demander une proposition" : "Request Proposal"}
          </button>
        </form>
      )}
    </ModalShell>
  );
}
