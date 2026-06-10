"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { FORM_CONFIGS, type FormKind, type FieldDef } from "./configs";
import { Field } from "./Field";
import { t, type Lang } from "@/lib/i18n";
import { createLead, type LeadAttachment } from "@/lib/store";
import { track } from "@/lib/analytics";
import { modalOverlay, modalPanel, luxeEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface LeadModalProps {
  kind: FormKind;
  lang: Lang;
  prefill?: Record<string, string>;
  onClose: () => void;
}

type Phase = "form" | "success" | "error";

export function LeadModal({ kind, lang, prefill, onClose }: LeadModalProps) {
  const config = FORM_CONFIGS[kind];
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>(prefill ?? {});
  const [files, setFiles] = useState<Record<string, LeadAttachment[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("form");
  const [refNum, setRefNum] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const steps = config.steps;
  const isLast = step === steps.length - 1;
  const multi = steps.length > 1;

  /* Lock scroll + Escape to close */
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    track("form_open", { form: kind });
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [kind, onClose]);

  /* Focus the panel on mount */
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  const validate = useCallback(
    (fields: FieldDef[]): boolean => {
      const errs: Record<string, string> = {};
      for (const f of fields) {
        const v = (values[f.name] ?? "").trim();
        if (f.required && !v && f.type !== "file") {
          errs[f.name] = t(lang, "form.required");
        } else if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
          errs[f.name] = t(lang, "form.invalidEmail");
        }
      }
      setErrors(errs);
      return Object.keys(errs).length === 0;
    },
    [values, lang]
  );

  const submit = useCallback(() => {
    if (!validate(steps[step])) return;
    /* Honeypot — bots fill it, humans never see it */
    if (honeypotRef.current?.value) return;
    setSubmitting(true);
    try {
      const allFiles = Object.values(files).flat();
      const { name = "", phone, email, instagram, message, preferredContact, ...extras } = values;
      const lead = createLead({
        type: config.type,
        name,
        phone,
        email,
        instagram,
        message,
        preferredContact,
        extras,
        attachments: allFiles,
      });
      track("form_submit", { form: kind, ref: lead.id });
      setRefNum(lead.id);
      setPhase("success");
    } catch {
      setPhase("error");
    } finally {
      setSubmitting(false);
    }
  }, [validate, steps, step, files, values, config.type, kind]);

  const next = useCallback(() => {
    if (!validate(steps[step])) return;
    setErrors({});
    setStep((s) => s + 1);
  }, [validate, steps, step]);

  const back = useCallback(() => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const stepFields = steps[step];
  const titleId = "lead-modal-title";

  const footer = useMemo(() => {
    if (phase !== "form") return null;
    return (
      <div
        className="sticky bottom-0 bg-ink-2/95 backdrop-blur-md border-t border-(--line)
          px-5 py-3 safe-bottom flex items-center gap-2.5"
      >
        {multi && step > 0 && (
          <button
            type="button"
            onClick={back}
            className="min-h-12 px-5 rounded-full border border-(--line-2) text-text-2 text-[0.875rem]
              inline-flex items-center gap-1.5 transition-all duration-300 hover:text-ivory hover:border-gold/50
              active:scale-[0.97] shrink-0"
          >
            <ArrowLeft size={15} aria-hidden />
            {t(lang, "form.back")}
          </button>
        )}
        <button
          type="button"
          disabled={submitting}
          onClick={isLast ? submit : next}
          className="btn-sheen flex-1 min-h-12 rounded-full bg-gold text-ink text-[0.9rem] font-medium
            inline-flex items-center justify-center gap-2 transition-all duration-300
            hover:bg-gold-3 active:scale-[0.98] disabled:opacity-60"
        >
          {submitting
            ? t(lang, "form.submitting")
            : isLast
            ? t(lang, "form.submit")
            : t(lang, "form.continue")}
        </button>
      </div>
    );
  }, [phase, multi, step, back, lang, submitting, isLast, submit, next]);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 z-[150] bg-ink/80 backdrop-blur-sm"
        variants={modalOverlay}
        initial={reduce ? false : "hidden"}
        animate="visible"
        exit="exit"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        key="panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
        tabIndex={-1}
        variants={modalPanel}
        initial={reduce ? false : "hidden"}
        animate="visible"
        exit="exit"
        className="fixed z-[160] inset-x-0 bottom-0 top-12 md:inset-0 md:m-auto
          md:max-w-lg md:max-h-[min(720px,90vh)] md:h-fit
          bg-ink-2 border border-(--line) md:rounded-2xl rounded-t-2xl
          shadow-[0_24px_80px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden outline-none"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3 shrink-0">
          <div>
            <h2 id={titleId} className="font-serif text-[1.45rem] leading-tight text-ivory">
              {config.title[lang]}
            </h2>
            {phase === "form" && config.intro && (
              <p className="text-[0.82rem] text-text-3 mt-1 leading-snug">{config.intro[lang]}</p>
            )}
            {phase === "form" && multi && (
              <div className="flex items-center gap-2 mt-3" aria-label={`${t(lang, "form.step")} ${step + 1} ${t(lang, "form.of")} ${steps.length}`}>
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500 ease-(--ease-luxe)",
                      i === step ? "w-8 bg-gold" : i < step ? "w-4 bg-gold/50" : "w-4 bg-white/10"
                    )}
                  />
                ))}
                {config.stepTitles && (
                  <span className="text-[0.72rem] text-text-3 ml-1">
                    {config.stepTitles[step][lang]}
                  </span>
                )}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label={lang === "fr" ? "Fermer" : "Close"}
            className="min-h-11 min-w-11 -mr-2 -mt-2 inline-flex items-center justify-center
              text-text-2 hover:text-ivory transition-colors rounded-full"
          >
            <X size={20} strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-4">
          {phase === "form" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isLast) submit();
                else next();
              }}
              noValidate
            >
              {/* Honeypot anti-spam */}
              <input
                ref={honeypotRef}
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduce ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: luxeEase }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-4"
                >
                  {stepFields.map((f) => (
                    <Field
                      key={f.name}
                      field={f}
                      lang={lang}
                      value={values[f.name] ?? ""}
                      error={errors[f.name]}
                      onChange={(v) => {
                        setValues((prev) => ({ ...prev, [f.name]: v }));
                        if (errors[f.name]) setErrors((prev) => ({ ...prev, [f.name]: "" }));
                      }}
                      files={files[f.name] ?? []}
                      onFiles={(fl) => setFiles((prev) => ({ ...prev, [f.name]: fl }))}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
              {/* allow Enter key submit */}
              <button type="submit" className="sr-only">
                {isLast ? t(lang, "form.submit") : t(lang, "form.continue")}
              </button>
            </form>
          )}

          {phase === "success" && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: luxeEase }}
              className="flex flex-col items-center text-center py-10 px-2"
            >
              <Image
                src="/brand/ormania.svg"
                alt="Ormania"
                width={208}
                height={48}
                className="w-48 h-auto mb-7"
              />
              <h3 className="font-serif text-2xl text-ivory mb-3">{t(lang, "form.successTitle")}</h3>
              <p className="text-[0.9rem] text-text-2 leading-relaxed max-w-xs">
                {t(lang, "form.successBody")}
              </p>
              <p className="mt-3 font-mono text-gold tracking-[0.1em] text-lg" aria-label="Reference number">
                {refNum}
              </p>
              <button
                onClick={onClose}
                className="btn-sheen mt-8 min-h-12 w-full max-w-60 rounded-full bg-gold text-ink
                  text-[0.9rem] font-medium transition-all duration-300 hover:bg-gold-3 active:scale-[0.98]"
              >
                {t(lang, "form.successClose")}
              </button>
            </motion.div>
          )}

          {phase === "error" && (
            <div className="flex flex-col items-center text-center py-12 px-2">
              <p className="text-[0.95rem] text-[#e89b95]">{t(lang, "form.error")}</p>
              <button
                onClick={() => setPhase("form")}
                className="mt-6 min-h-12 px-8 rounded-full border border-(--line-2) text-ivory
                  text-[0.9rem] transition-all hover:border-gold/60 active:scale-[0.97]"
              >
                {t(lang, "form.back")}
              </button>
            </div>
          )}
        </div>

        {footer}
      </motion.div>
    </AnimatePresence>
  );
}
