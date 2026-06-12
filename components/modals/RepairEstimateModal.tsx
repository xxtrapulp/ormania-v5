"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { ModalShell } from "./ModalShell";
import { useModal } from "./ModalSystem";
import { useMotion } from "@/components/effects/MotionContext";
import { Check, Camera } from "lucide-react";

export function RepairEstimateModal({ lang }: { lang: Lang }) {
  const { activeModal, closeModal } = useModal();
  const { reducedMotion } = useMotion();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    itemType: "",
    problem: "",
    urgency: "",
    message: "",
  });

  const isOpen = activeModal === "repair";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
      setSubmitted(false);
      setForm({ name: "", phone: "", email: "", itemType: "", problem: "", urgency: "", message: "" });
    }, 2500);
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <ModalShell isOpen={isOpen} title={t(lang, "form.repair.title")} size="md">
      {submitted ? (
        <motion.div className="text-center py-10" initial={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-4">
            <Check size={24} className="text-gold" />
          </div>
          <h3 className="font-serif text-[1.2rem] text-ivory mb-2">{t(lang, "form.successTitle")}</h3>
          <p className="text-[0.9rem] text-text-2">{t(lang, "form.successBody")}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.name")} *</label>
              <input required type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.phone")} *</label>
              <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.email")}</label>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.repair.itemType")}</label>
            <input type="text" value={form.itemType} onChange={(e) => update("itemType", e.target.value)} placeholder={lang === "fr" ? "Bague, chaîne, montre..." : "Ring, chain, watch..."} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.repair.problem")} *</label>
            <textarea required rows={3} value={form.problem} onChange={(e) => update("problem", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.repair.urgency")}</label>
            <input type="text" value={form.urgency} onChange={(e) => update("urgency", e.target.value)} placeholder={lang === "fr" ? "Quand en avez-vous besoin ?" : "When do you need it?"} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
          </div>

          <div className="rounded-xl border border-dashed border-(--line) bg-ink p-6 text-center">
            <Camera size={24} className="text-text-3 mx-auto mb-2" />
            <p className="text-[0.85rem] text-ivory mb-1">{t(lang, "form.repair.photos")}</p>
            <p className="text-[0.75rem] text-text-3">{t(lang, "form.uploadHint")}</p>
          </div>

          <button type="submit" className="w-full h-12 rounded-xl bg-gold text-ink font-medium text-[0.95rem] btn-sheen active:scale-[0.97] transition-transform">
            {t(lang, "form.submit")}
          </button>
        </form>
      )}
    </ModalShell>
  );
}
