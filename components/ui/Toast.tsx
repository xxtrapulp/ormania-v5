"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ToastItem } from "./ToastProvider";

interface ToastViewportProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  const reduce = useReducedMotion();
  return (
    <div
      // pointer-events-none on the container so it never blocks UI;
      // each toast re-enables pointer events for its own hit area.
      aria-live="polite"
      aria-atomic="false"
      className="fixed z-[260] bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col items-end gap-2 pointer-events-none max-w-[calc(100vw-2rem)]"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <ToastView
            key={t.id}
            item={t}
            reduce={!!reduce}
            onDismiss={() => onDismiss(t.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastView({
  item,
  reduce,
  onDismiss,
}: {
  item: ToastItem;
  reduce: boolean;
  onDismiss: () => void;
}) {
  const isSuccess = item.kind === "success";
  const Icon = isSuccess ? Check : Info;
  // Auto-dismiss timer safety net: the provider already schedules one,
  // but if a toast is unmounted before the timer fires (e.g. route change
  // in dev hot-reload), clear it to avoid setState on unmounted node.
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <motion.div
      role="status"
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24, y: 6, scale: 0.96 }}
      animate={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, x: 0, y: 0, scale: 1 }
      }
      exit={
        reduce
          ? { opacity: 0, transition: { duration: 0.15 } }
          : { opacity: 0, x: 24, scale: 0.96, transition: { duration: 0.18 } }
      }
      transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
      // re-enable pointer events on the toast itself so the user can
      // tap to dismiss; the outer container is pointer-events-none.
      className="pointer-events-auto max-w-[320px] w-auto inline-flex items-start gap-2.5 rounded-lg border border-gold/40 bg-ink/95 backdrop-blur-md px-3.5 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.45),0_0_0_1px_rgba(201,168,106,0.08)] text-ivory cursor-pointer"
      onClick={onDismiss}
    >
      <span
        aria-hidden
        className={
          isSuccess
            ? "mt-0.5 shrink-0 inline-flex w-5 h-5 items-center justify-center rounded-full border border-gold/60 text-gold-3"
            : "mt-0.5 shrink-0 inline-flex w-5 h-5 items-center justify-center rounded-full border border-text-3/40 text-text-2"
        }
      >
        <Icon size={12} strokeWidth={2.25} />
      </span>
      <span className="text-[0.82rem] leading-[1.35] text-ivory/95 break-words">
        {item.message}
      </span>
    </motion.div>
  );
}
