"use client";

import { motion } from "framer-motion";
import { type Lang } from "@/lib/i18n";
import { ModalShell } from "./ModalShell";
import { useModal } from "./ModalSystem";
import { useMotion } from "@/components/effects/MotionContext";
import { useCompare } from "@/hooks/useCompare";
import { Scale, X, ArrowRight } from "lucide-react";

export function CompareModal({ lang }: { lang: Lang }) {
  const { activeModal, closeModal } = useModal();
  const { reducedMotion } = useMotion();
  const { items, remove, clear } = useCompare();

  const isOpen = activeModal === "compare";

  return (
    <ModalShell
      isOpen={isOpen}
      title={lang === "fr" ? "Comparer" : "Compare"}
      size="lg"
    >
      {items.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-14 h-14 rounded-full bg-ink-2 border border-(--line) flex items-center justify-center mx-auto mb-4">
            <Scale size={24} className="text-text-3" />
          </div>
          <h3 className="font-serif text-[1.1rem] text-ivory mb-2">
            {lang === "fr" ? "Aucune pièce à comparer" : "No pieces to compare"}
          </h3>
          <p className="text-[0.9rem] text-text-2">
            {lang === "fr"
              ? "Sélectionnez des pièces similaires pour les comparer côte à côte."
              : "Select similar pieces to compare them side by side."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[0.8rem] text-text-3">
              {items.length} {lang === "fr" ? "pièce(s)" : "piece(s)"}
            </span>
            <button
              onClick={clear}
              className="text-[0.75rem] text-text-3 hover:text-red-300 transition-colors"
            >
              {lang === "fr" ? "Tout effacer" : "Clear all"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                className="rounded-xl border border-(--line) bg-ink p-4"
                initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div className="aspect-[4/3] rounded-lg bg-ink-2 border border-(--line) flex items-center justify-center mb-3">
                  <span className="text-[0.6rem] text-text-3">IMG</span>
                </div>
                <h4 className="text-[0.9rem] text-ivory font-medium mb-1">{item.title}</h4>
                <p className="text-[0.75rem] text-text-3 mb-3">{item.category}</p>
                <div className="flex items-center gap-2">
                  <button className="flex-1 h-9 rounded-lg bg-gold/10 border border-gold/30 text-gold text-[0.75rem] font-medium flex items-center justify-center gap-1">
                    {lang === "fr" ? "Demander" : "Ask"} <ArrowRight size={12} />
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="w-9 h-9 rounded-lg border border-(--line) flex items-center justify-center text-text-3 hover:text-red-300 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </ModalShell>
  );
}
