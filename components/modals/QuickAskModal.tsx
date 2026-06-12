"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { ModalShell } from "./ModalShell";
import { useModal } from "./ModalSystem";
import { useMotion } from "@/components/effects/MotionContext";
import { MessageCircle, Check, Camera } from "lucide-react";

export function QuickAskModal({ lang }: { lang: Lang }) {
  const { activeModal, closeModal } = useModal();
  const { reducedMotion } = useMotion();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const isOpen = activeModal === "quickAsk";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
      setSubmitted(false);
      setForm({ name: "", phone: "", message: "" });
    }, 2500);
  };

  return (
    <ModalShell
      isOpen={isOpen}
      title={lang === "fr" ? "Demande rapide" : "Quick Ask"}
      size="md"
    >
      {submitted ? (
        <motion.div
          className="text-center py-8"
          initial={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-4">
            <Check size={24} className="text-gold" />
          </div>
          <h3 className="font-serif text-[1.2rem] text-ivory mb-2">{t(lang, "form.successTitle")}</h3>
          <p className="text-[0.9rem] text-text-2">{t(lang, "form.successBody")}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.name")} *</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.phone")} *</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.message")}</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Photo upload placeholder */}
          <div className="rounded-xl border border-dashed border-(--line) bg-ink p-4 text-center">
            <Camera size={20} className="text-text-3 mx-auto mb-2" />
            <p className="text-[0.8rem] text-text-3">{t(lang, "form.uploadHint")}</p>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gold text-ink font-medium text-[0.95rem] btn-sheen active:scale-[0.97] transition-transform"
          >
            {t(lang, "form.submit")}
          </button>

          <p className="text-[0.75rem] text-text-3 text-center">
            {lang === "fr"
              ? "Aucun paiement n'est pris en ligne. Les devis finaux sont confirmés par la boutique."
              : "No payment is taken online. Final quotes are confirmed by the boutique."
            }
          </p>
        </form>
      )}
    </ModalShell>
  );
}
