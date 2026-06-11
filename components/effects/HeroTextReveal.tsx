"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Part {
  text: string;
  className?: string;
}

/** Hero headline: typewriter character reveal with blinking gold cursor.
 *  Uses Framer Motion only — no GSAP in the hero.
 */
export function HeroTextReveal({
  parts,
  className = "",
  baseDelay = 0.6,
  onComplete,
}: {
  parts: Part[];
  className?: string;
  baseDelay?: number;
  onComplete?: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const chars: { char: string; className?: string }[] = [];
  parts.forEach((part) => {
    part.text.split("").forEach((char) => {
      chars.push({ char, className: part.className });
    });
  });

  useEffect(() => {
    const total = chars.length;
    if (visibleCount >= total) {
      const t = setTimeout(() => {
        setShowCursor(false);
        onComplete?.();
      }, 700);
      return () => clearTimeout(t);
    }
    const delayMs = visibleCount === 0 ? baseDelay * 1000 : 28;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), delayMs);
    return () => clearTimeout(t);
  }, [visibleCount, chars.length, baseDelay, onComplete]);

  return (
    <span className={`inline-block ${className}`}>
      {chars.map((item, i) => (
        <motion.span
          key={i}
          className={`inline-block will-change-[opacity] ${item.className ?? ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: i < visibleCount ? 1 : 0 }}
          transition={{ duration: 0.03 }}
        >
          {item.char === " " ? "\u00A0" : item.char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-[2px] h-[0.8em] bg-gold ml-1 align-middle"
        animate={{ opacity: showCursor ? [1, 0, 1] : 0 }}
        transition={
          showCursor
            ? { repeat: Infinity, duration: 0.55, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      />
    </span>
  );
}
