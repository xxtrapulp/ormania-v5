"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { ModalShell } from "./ModalShell";
import { useModal } from "./ModalSystem";
import { useMotion } from "@/components/effects/MotionContext";
import { Check, Heart, Share2, Calendar } from "lucide-react";

export function ProductModal({ lang }: { lang: Lang }) {
  const { activeModal, closeModal, modalData } = useModal();
  const { reducedMotion } = useMotion();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const isOpen = activeModal === "product";
  const pieceName = (modalData as { pieceName?: string } | undefined)?.pieceName;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
      setSubmitted(false);
      setForm({ name: "", phone: "", email: "", message: "" });
    }, 2500);
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <ModalShell isOpen={isOpen} title={t(lang, "form.product.title")} size="md">
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
          {pieceName && (
            <div className="rounded-xl bg-gold/5 border border-gold/20 p-3">
              <p className="text-[0.8rem] text-text-3">{lang === "fr" ? "Pièce" : "Piece"}</p>
              <p className="text-[0.95rem] text-gold font-medium">{pieceName}</p>
            </div>
          )}

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
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.message")}</label>
            <textarea rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder={lang === "fr" ? "Questions sur cette pièce..." : "Questions about this piece..."} className="w-full px-4 py-3 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors resize-none" />
          </div>

          <button type="submit" className="w-full h-12 rounded-xl bg-gold text-ink font-medium text-[0.95rem] btn-sheen active:scale-[0.97] transition-transform">
            {t(lang, "form.submit")}
          </button>

          <div className="flex gap-2 pt-1">
            <button type="button" className="flex-1 h-10 rounded-lg bg-ink border border-(--line) text-text-2 text-[0.8rem] font-medium flex items-center justify-center gap-1.5 hover:border-gold/30 hover:text-ivory transition-colors">
              <Heart size={14} /> {lang === "fr" ? "Sauvegarder" : "Save"}
            </button>
            <button type="button" className="flex-1 h-10 rounded-lg bg-ink border border-(--line) text-text-2 text-[0.8rem] font-medium flex items-center justify-center gap-1.5 hover:border-gold/30 hover:text-ivory transition-colors">
              <Share2 size={14} /> {lang === "fr" ? "Partager" : "Share"}
            </button>
            <button type="button" className="flex-1 h-10 rounded-lg bg-ink border border-(--line) text-text-2 text-[0.8rem] font-medium flex items-center justify-center gap-1.5 hover:border-gold/30 hover:text-ivory transition-colors">
              <Calendar size={14} /> {lang === "fr" ? "RDV" : "Book"}
            </button>
          </div>
        </form>
      )}
    </ModalShell>
  );
}
