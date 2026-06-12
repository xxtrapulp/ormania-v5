"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { ModalShell } from "./ModalShell";
import { useModal } from "./ModalSystem";
import { useMotion } from "@/components/effects/MotionContext";
import { Check, Camera, ChevronRight } from "lucide-react";

const BUDGETS = [
  "Under $250",
  "$250–$500",
  "$500–$1,000",
  "$1,000–$2,500",
  "$2,500+",
  "Not sure yet",
] as const;

export function CustomRequestModal({ lang }: { lang: Lang }) {
  const { activeModal, closeModal } = useModal();
  const { reducedMotion } = useMotion();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = 3;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    jewelryType: "",
    metal: "",
    stone: "",
    budget: "",
    deadline: "",
    engraving: "",
    notes: "",
  });

  const isOpen = activeModal === "custom";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
      setSubmitted(false);
      setStep(1);
      setForm({ name: "", phone: "", email: "", jewelryType: "", metal: "", stone: "", budget: "", deadline: "", engraving: "", notes: "" });
    }, 2500);
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <ModalShell isOpen={isOpen} title={t(lang, "form.custom.title")} size="lg">
      {submitted ? (
        <motion.div
          className="text-center py-10"
          initial={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-4">
            <Check size={24} className="text-gold" />
          </div>
          <h3 className="font-serif text-[1.2rem] text-ivory mb-2">{t(lang, "form.successTitle")}</h3>
          <p className="text-[0.9rem] text-text-2">{t(lang, "form.successBody")}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.75rem] font-medium transition-colors ${
                    step > i + 1
                      ? "bg-gold text-ink"
                      : step === i + 1
                      ? "bg-gold/20 text-gold border border-gold/40"
                      : "bg-ink-3 text-text-3 border border-(--line)"
                  }`}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`flex-1 h-px ${step > i + 1 ? "bg-gold/40" : "bg-(--line)"}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <motion.div className="space-y-4" initial={reducedMotion ? undefined : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
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
              <button type="button" onClick={() => setStep(2)} className="w-full h-12 rounded-xl bg-gold text-ink font-medium text-[0.95rem] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
                {t(lang, "form.continue")} <ChevronRight size={16} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div className="space-y-4" initial={reducedMotion ? undefined : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.custom.type")}</label>
                  <input type="text" value={form.jewelryType} onChange={(e) => update("jewelryType", e.target.value)} placeholder={lang === "fr" ? "Bague, collier, bracelet..." : "Ring, necklace, bracelet..."} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.custom.metal")}</label>
                  <input type="text" value={form.metal} onChange={(e) => update("metal", e.target.value)} placeholder={lang === "fr" ? "Or, argent, platine..." : "Gold, silver, platinum..."} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.custom.stone")}</label>
                  <input type="text" value={form.stone} onChange={(e) => update("stone", e.target.value)} placeholder={lang === "fr" ? "Diamant, saphir, rubis..." : "Diamond, sapphire, ruby..."} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.custom.deadline")}</label>
                  <input type="text" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} placeholder={lang === "fr" ? "Date souhaitée" : "Target date"} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[0.8rem] text-text-3 mb-2">{t(lang, "form.custom.budget")}</label>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => update("budget", b)}
                      className={`px-3 py-2 rounded-full text-[0.8rem] border transition-colors ${
                        form.budget === b
                          ? "bg-gold/15 border-gold text-gold"
                          : "bg-ink border-(--line) text-text-2 hover:border-(--line-2)"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 h-12 rounded-xl border border-(--line) text-ivory font-medium active:scale-[0.97] transition-transform">{t(lang, "form.back")}</button>
                <button type="button" onClick={() => setStep(3)} className="flex-[2] h-12 rounded-xl bg-gold text-ink font-medium text-[0.95rem] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
                  {t(lang, "form.continue")} <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div className="space-y-4" initial={reducedMotion ? undefined : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <div>
                <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.custom.engraving")}</label>
                <input type="text" value={form.engraving} onChange={(e) => update("engraving", e.target.value)} placeholder={lang === "fr" ? "Texte de gravure souhaité" : "Desired engraving text"} className="w-full h-12 px-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.notes")}</label>
                <textarea rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors resize-none" />
              </div>
              <div className="rounded-xl border border-dashed border-(--line) bg-ink p-6 text-center">
                <Camera size={24} className="text-text-3 mx-auto mb-2" />
                <p className="text-[0.85rem] text-ivory mb-1">{t(lang, "form.custom.inspiration")}</p>
                <p className="text-[0.75rem] text-text-3">{t(lang, "form.uploadHint")}</p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="flex-1 h-12 rounded-xl border border-(--line) text-ivory font-medium active:scale-[0.97] transition-transform">{t(lang, "form.back")}</button>
                <button type="submit" className="flex-[2] h-12 rounded-xl bg-gold text-ink font-medium text-[0.95rem] btn-sheen active:scale-[0.97] transition-transform">{t(lang, "form.submit")}</button>
              </div>
            </motion.div>
          )}
        </form>
      )}
    </ModalShell>
  );
}
