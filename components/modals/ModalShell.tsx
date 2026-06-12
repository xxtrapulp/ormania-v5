"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useModal } from "./ModalSystem";

interface ModalShellProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
}

export function ModalShell({ isOpen, title, children, size = "md" }: ModalShellProps) {
  const { closeModal } = useModal();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeModal]);

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    full: "max-w-full mx-4",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/85 backdrop-blur-xl"
            onClick={closeModal}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              "relative z-10 w-full bg-ink-2 border border-(--line) rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[92vh] md:max-h-[85vh] overflow-y-auto",
              sizeClasses[size]
            )}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 border-b border-(--line) bg-ink-2/95 backdrop-blur-sm">
              <h2 className="font-serif text-[1.1rem] md:text-[1.25rem] text-ivory">{title}</h2>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-text-2 hover:text-ivory hover:border-(--line-2) transition-colors"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
