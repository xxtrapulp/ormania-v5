"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { ModalShell } from "./ModalShell";
import { useModal } from "./ModalSystem";
import { useMotion } from "@/components/effects/MotionContext";
import { Check, Camera, Link2 } from "lucide-react";

export function InstagramInquiryModal({ lang }: { lang: Lang }) {
  const { activeModal, modalData, closeModal } = useModal();
  const { reducedMotion } = useMotion();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    igLink: "",
    intent: "exact" as "exact" | "similar" | "identify",
    message: "",
  });

  const isOpen = activeModal === "instagram";
  const pieceName = (modalData?.pieceName as string) || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
      setSubmitted(false);
      setStep(1);
      setForm({ name: "", phone: "", igLink: "", intent: "exact", message: "" });
    }, 2500);
  };

  return (
    <ModalShell
      isOpen={isOpen}
      title={pieceName || t(lang, "form.ig.title")}
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
          {step === 1 && (
            <motion.div
              className="space-y-4"
              initial={reducedMotion ? undefined : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            >
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
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full h-12 rounded-xl bg-gold text-ink font-medium text-[0.95rem] active:scale-[0.97] transition-transform"
              >
                {t(lang, "form.continue")}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              className="space-y-4"
              initial={reducedMotion ? undefined : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div>
                <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.ig.link")}</label>
                <div className="relative">
                  <Link2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-3" />
                  <input
                    type="url"
                    placeholder="https://instagram.com/p/..."
                    value={form.igLink}
                    onChange={(e) => setForm((f) => ({ ...f, igLink: e.target.value }))}
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Screenshot upload */}
              <div className="rounded-xl border border-dashed border-(--line) bg-ink p-6 text-center">
                <Camera size={24} className="text-text-3 mx-auto mb-2" />
                <p className="text-[0.85rem] text-ivory mb-1">{t(lang, "form.ig.screenshot")}</p>
                <p className="text-[0.75rem] text-text-3">{t(lang, "form.uploadHint")}</p>
              </div>

              {/* Intent radio */}
              <div>
                <label className="block text-[0.8rem] text-text-3 mb-2">{t(lang, "form.ig.intent")}</label>
                <div className="space-y-2">
                  {([
                    { key: "exact", label: t(lang, "form.ig.exact") },
                    { key: "similar", label: t(lang, "form.ig.similar") },
                    { key: "identify", label: t(lang, "form.ig.identify") },
                  ] as const).map((opt) => (
                    <label
                      key={opt.key}
                      className="flex items-center gap-3 p-3 rounded-xl border border-(--line) cursor-pointer hover:border-(--line-2) transition-colors"
                    >
                      <input
                        type="radio"
                        name="intent"
                        value={opt.key}
                        checked={form.intent === opt.key}
                        onChange={() => setForm((f) => ({ ...f, intent: opt.key }))}
                        className="accent-gold"
                      />
                      <span className="text-[0.9rem] text-ivory">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[0.8rem] text-text-3 mb-1.5">{t(lang, "form.message")}</label>
                <textarea
                  rows={2}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-ink border border-(--line) text-ivory text-[0.95rem] placeholder:text-text-3 focus:border-gold/40 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 rounded-xl border border-(--line) text-ivory font-medium text-[0.95rem] active:scale-[0.97] transition-transform"
                >
                  {t(lang, "form.back")}
                </button>
                <button
                  type="submit"
                  className="flex-[2] h-12 rounded-xl bg-gold text-ink font-medium text-[0.95rem] btn-sheen active:scale-[0.97] transition-transform"
                >
                  {t(lang, "form.submit")}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-colors ${
                  step === s ? "bg-gold" : "bg-(--line)"
                }`}
              />
            ))}
          </div>

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
