"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/smoothScroll";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<ReturnType<typeof initLenis> | null>(null);

  useEffect(() => {
    lenisRef.current = initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.995 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.99 }}
        transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        onAnimationComplete={() => {
          lenisRef.current?.scrollTo(0, { immediate: true });
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
