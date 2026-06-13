"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ToastViewport } from "./Toast";

export type ToastKind = "success" | "info";

export interface ToastItem {
  /** Stable id used for keyed render and to avoid duplicate fires. */
  id: string;
  kind: ToastKind;
  message: string;
  /** ms before auto-dismiss; defaults to 1500. */
  durationMs?: number;
}

interface ToastApi {
  success: (message: string, opts?: { durationMs?: number }) => void;
  info: (message: string, opts?: { durationMs?: number }) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

/**
 * useToast() — fire ephemeral confirmation toasts.
 *
 * Soft-fails when called outside a ToastProvider so server components
 * and isolated test harnesses don't crash; the no-op API is still typed.
 */
export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      success: () => {},
      info: () => {},
    };
  }
  return ctx;
}

let __idCounter = 0;
function nextId(): string {
  __idCounter += 1;
  return `t_${Date.now()}_${__idCounter}`;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const handle = timersRef.current.get(id);
    if (handle) {
      clearTimeout(handle);
      timersRef.current.delete(id);
    }
  }, []);

  const fire = useCallback(
    (kind: ToastKind, message: string, opts?: { durationMs?: number }) => {
      if (typeof message !== "string" || message.length === 0) return;
      const id = nextId();
      const item: ToastItem = {
        id,
        kind,
        message,
        durationMs: opts?.durationMs ?? 1500,
      };
      setToasts((prev) => {
        // Cap visible to 4 — drop the oldest if we overflow.
        const next = [...prev, item];
        if (next.length > 4) return next.slice(next.length - 4);
        return next;
      });
      const handle = setTimeout(() => dismiss(id), item.durationMs);
      timersRef.current.set(id, handle);
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({
      success: (message, opts) => fire("success", message, opts),
      info: (message, opts) => fire("info", message, opts),
    }),
    [fire],
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((h) => clearTimeout(h));
      timers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}
