"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface MotionContextValue {
  reducedMotion: boolean;
  prefersTouch: boolean;
}

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  prefersTouch: false,
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [prefersTouch, setPrefersTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    const touchMq = window.matchMedia("(hover: none)");
    setPrefersTouch(touchMq.matches);
    const touchHandler = (e: MediaQueryListEvent) => setPrefersTouch(e.matches);
    touchMq.addEventListener("change", touchHandler);

    return () => {
      mq.removeEventListener("change", handler);
      touchMq.removeEventListener("change", touchHandler);
    };
  }, []);

  return (
    <MotionContext.Provider value={{ reducedMotion, prefersTouch }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}
