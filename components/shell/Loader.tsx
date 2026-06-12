"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const WORDS = ["Jewelry", "Custom", "Repair", "Laval", "Ormania"];
const luxeEase = [0.22, 0.61, 0.36, 1] as const;

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"logo" | "words" | "exit">("logo");
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Logo phase: 0.8s
    timers.push(
      setTimeout(() => {
        setPhase("words");
      }, 800)
    );

    // Word sequence: 5 words × 400ms + buffer
    WORDS.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setWordIndex(i);
        }, 800 + i * 400)
      );
    });

    // Exit phase
    timers.push(
      setTimeout(() => {
        setPhase("exit");
      }, 800 + WORDS.length * 400)
    );

    // Complete
    timers.push(
      setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 800 + WORDS.length * 400 + 600)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[300] bg-ink flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: luxeEase }}
        >
          {/* Gold line that draws across */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              phase === "words"
                ? { scaleX: 1, opacity: 1 }
                : phase === "exit"
                ? { scaleX: 1, opacity: 0 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.8, ease: luxeEase }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              phase === "logo"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.5, ease: luxeEase }}
            className="relative z-10"
          >
            <Image
              src="/brand/ormania.svg"
              alt="Ormania"
              width={180}
              height={44}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </motion.div>

          {/* Word sequence */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <AnimatePresence mode="wait">
              {phase === "words" && (
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: luxeEase }}
                  className="font-serif text-gold text-[1.2rem] md:text-[1.5rem] tracking-[0.15em]"
                >
                  {WORDS[wordIndex]}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom wipe overlay */}
          <motion.div
            className="absolute inset-0 bg-ink z-20 pointer-events-none"
            initial={{ y: "100%" }}
            animate={phase === "exit" ? { y: "0%" } : { y: "100%" }}
            transition={{ duration: 0.5, ease: luxeEase }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
