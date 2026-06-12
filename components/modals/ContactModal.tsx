"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { ModalShell } from "./ModalShell";
import { useModal } from "./ModalSystem";
import { useMotion } from "@/components/effects/MotionContext";
import { Check, Phone, Mail, MapPin } from "lucide-react";

export function ContactModal({ lang }: { lang: Lang }) {
  const { activeModal, closeModal } = useModal();
  const { reducedMotion } = useMotion();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const isOpen = activeModal === "contact";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 2500);
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <ModalShell isOpen={isOpen} title={t(lang, "form.contact.title")} size="md">
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
              <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.email")} *</label>
              <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.phone")}</label>
            <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
          </div>

          <div>
            <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.message")} *</label>
            <textarea required rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors resize-none" />
          </div>

          <button type="submit" className="w-full h-12 rounded-xl bg-gold text-ink font-medium text-[0.95rem] btn-sheen active:scale-[0.97] transition-transform">
            {t(lang, "form.submit")}
          </button>

          <div className="pt-2 border-t border-(--line) flex flex-col sm:flex-row gap-3 text-[0.8rem] text-text-3">
            <a href="tel:+15147377216" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone size={14} /> (514) 737-7216
            </a>
            <a href="mailto:info@ormania.ca" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail size={14} /> info@ormania.ca
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> Laval, QC
            </span>
          </div>
        </form>
      )}
    </ModalShell>
  );
}
