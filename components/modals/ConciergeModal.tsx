"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { ModalShell } from "./ModalShell";
import { useModal } from "./ModalSystem";
import { useMotion } from "@/components/effects/MotionContext";
import { Check, Heart, Gift, Calendar } from "lucide-react";

const OCCASIONS = [
  { en: "Engagement", fr: "Fiançailles" },
  { en: "Anniversary", fr: "Anniversaire" },
  { en: "Birthday", fr: "Anniversaire de naissance" },
  { en: "Wedding", fr: "Mariage" },
  { en: "Push present", fr: "Cadeau de naissance" },
  { en: "Just because", fr: "Juste comme ça" },
  { en: "Self-gift", fr: "Cadeau à soi" },
  { en: "Other", fr: "Autre" },
] as const;

export function ConciergeModal({ lang }: { lang: Lang }) {
  const { activeModal, closeModal } = useModal();
  const { reducedMotion } = useMotion();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    occasion: "",
    recipient: "",
    budget: "",
    style: "",
    message: "",
  });

  const isOpen = activeModal === "concierge";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
      setSubmitted(false);
      setForm({ name: "", phone: "", occasion: "", recipient: "", budget: "", style: "", message: "" });
    }, 2500);
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <ModalShell isOpen={isOpen} title={lang === "fr" ? "Conciergerie Ormania" : "Ormania Concierge"} size="md">
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
            <label className="block text-[0.8rem] text-text-3 mb-2">{lang === "fr" ? "Occasion" : "Occasion"}</label>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <button
                  key={o.en}
                  type="button"
                  onClick={() => update("occasion", o.en)}
                  className={`px-3 py-2 rounded-full text-[0.8rem] border transition-colors ${
                    form.occasion === o.en
                      ? "bg-gold/15 border-gold text-gold"
                      : "bg-ink border-(--line) text-text-2 hover:border-(--line-2)"
                  }`}
                >
                  {lang === "fr" ? o.fr : o.en}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.8rem] text-text-3 mb-1.5">{lang === "fr" ? "Pour qui ?" : "For who?"}</label>
              <input type="text" value={form.recipient} onChange={(e) => update("recipient", e.target.value)} placeholder={lang === "fr" ? "Elle, lui, nous..." : "Her, him, us..."} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.custom.budget")}</label>
              <input type="text" value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder={lang === "fr" ? "Votre budget" : "Your budget"} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{lang === "fr" ? "Style préféré" : "Preferred style"}</label>
            <input type="text" value={form.style} onChange={(e) => update("style", e.target.value)} placeholder={lang === "fr" ? "Classique, moderne, audacieux..." : "Classic, modern, bold..."} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
          </div>

          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.message")}</label>
            <textarea rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors resize-none" />
          </div>

          <button type="submit" className="w-full h-12 rounded-xl bg-gold text-ink font-medium text-[0.95rem] btn-sheen active:scale-[0.97] transition-transform">
            {t(lang, "form.submit")}
          </button>
        </form>
      )}
    </ModalShell>
  );
}
