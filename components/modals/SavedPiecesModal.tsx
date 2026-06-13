"use client";

import { motion } from "framer-motion";
import { type Lang } from "@/lib/i18n";
import { ModalShell } from "./ModalShell";
import { useModal } from "./ModalSystem";
import { useMotion } from "@/components/effects/MotionContext";
import { useSavedPieces } from "@/hooks/useSavedPieces";
import { useToast } from "@/components/ui/ToastProvider";
import { Heart, X, ArrowRight } from "lucide-react";

export function SavedPiecesModal({ lang }: { lang: Lang }) {
  const { activeModal, closeModal } = useModal();
  const { reducedMotion } = useMotion();
  const { pieces, remove, clear } = useSavedPieces();
  const toast = useToast();

  const isOpen = activeModal === "saved";

  const handleRemove = (id: string) => {
    remove(id);
    toast.info(lang === "fr" ? "Pièce retirée" : "Removed from saved");
  };

  const handleClear = () => {
    clear();
    toast.info(
      lang === "fr" ? "Liste effacée" : "Saved list cleared",
      { durationMs: 1800 },
    );
  };

  return (
    <ModalShell
      isOpen={isOpen}
      title={lang === "fr" ? "Pièces sauvegardées" : "Saved Pieces"}
      size="md"
    >
      {pieces.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-14 h-14 rounded-full bg-ink-2 border border-(--line) flex items-center justify-center mx-auto mb-4">
            <Heart size={24} className="text-text-3" />
          </div>
          <h3 className="font-serif text-[1.1rem] text-ivory mb-2">
            {lang === "fr" ? "Aucune pièce sauvegardée" : "No saved pieces yet"}
          </h3>
          <p className="text-[0.9rem] text-text-2">
            {lang === "fr"
              ? "Parcourez la boutique et sauvegardez les pièces qui vous intéressent."
              : "Browse the showroom and save pieces you're interested in."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[0.8rem] text-text-3">
              {pieces.length} {lang === "fr" ? "pièce(s)" : "piece(s)"}
            </span>
            <button
              onClick={handleClear}
              className="text-[0.75rem] text-text-3 hover:text-red-300 transition-colors"
            >
              {lang === "fr" ? "Tout effacer" : "Clear all"}
            </button>
          </div>

          <div className="space-y-3">
            {pieces.map((piece, i) => (
              <motion.div
                key={piece.id}
                className="flex items-center gap-4 p-3 rounded-xl border border-(--line) bg-ink"
                initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div className="w-16 h-16 rounded-lg bg-ink-2 border border-(--line) flex items-center justify-center shrink-0">
                  <span className="text-[0.6rem] text-text-3">IMG</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[0.9rem] text-ivory font-medium truncate">{piece.title}</h4>
                  <p className="text-[0.75rem] text-text-3">{piece.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gold text-[0.75rem] flex items-center gap-1 hover:underline">
                    {lang === "fr" ? "Demander" : "Ask"} <ArrowRight size={12} />
                  </button>
                  <button
                    onClick={() => handleRemove(piece.id)}
                    aria-label={lang === "fr" ? "Retirer cette pièce" : "Remove this piece"}
                    className="w-8 h-8 rounded-full border border-(--line) flex items-center justify-center text-text-3 hover:text-red-300 transition-colors"
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
