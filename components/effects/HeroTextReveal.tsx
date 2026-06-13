"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Part {
  text: string;
  className?: string;
}

/** Hero headline: typewriter character reveal with blinking gold cursor.
 *  Words are wrapped in nowrap spans so they never break across lines.
 *  Uses Framer Motion only — no GSAP in the hero.
 */
export function HeroTextReveal({
  parts,
  className = "",
  baseDelay = 0.6,
  /** Per-character delay in ms. Default 28 for the original typewriter feel. */
  charDelayMs = 28,
  /** Per-character fade-in duration in ms. Default 30. */
  charDurationMs = 30,
  /** If true, render fully visible on mount with no animation. */
  instant = false,
  onComplete,
}: {
  parts: Part[];
  className?: string;
  baseDelay?: number;
  charDelayMs?: number;
  charDurationMs?: number;
  instant?: boolean;
  onComplete?: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(instant ? Number.MAX_SAFE_INTEGER : 0);
  const [showCursor, setShowCursor] = useState(!instant);

  // Build a flat list of words, each with its characters and cumulative char index.
  const words: { chars: { char: string; className?: string }[]; globalStart: number }[] = [];
  let charIndex = 0;
  parts.forEach((part, pi) => {
    const partWords = part.text.split(" ");
    partWords.forEach((word, wi) => {
      const chars = word.split("").map((char) => ({ char, className: part.className }));
      words.push({ chars, globalStart: charIndex });
      charIndex += chars.length;
      // space after word (except last word in part)
      if (wi < partWords.length - 1) {
        words.push({ chars: [{ char: " ", className: part.className }], globalStart: charIndex });
        charIndex += 1;
      }
    });
    // space between parts (except after last part)
    if (pi < parts.length - 1) {
      words.push({ chars: [{ char: " ", className: part.className }], globalStart: charIndex });
      charIndex += 1;
    }
  });

  const totalChars = charIndex;

  useEffect(() => {
    if (instant) {
      // Fire the completion callback after a tick so any listener can react.
      const t = setTimeout(() => {
        onComplete?.();
      }, 50);
      return () => clearTimeout(t);
    }
    if (visibleCount >= totalChars) {
      const t = setTimeout(() => {
        setShowCursor(false);
        onComplete?.();
      }, 700);
      return () => clearTimeout(t);
    }
    const delayMs = visibleCount === 0 ? baseDelay * 1000 : charDelayMs;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), delayMs);
    return () => clearTimeout(t);
  }, [visibleCount, totalChars, baseDelay, charDelayMs, onComplete, instant]);

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{ whiteSpace: "nowrap", display: "inline-block" }}
        >
          {word.chars.map((item, ci) => {
            const globalIdx = word.globalStart + ci;
            return (
              <motion.span
                key={ci}
                className={`inline-block will-change-[opacity] ${item.className ?? ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: globalIdx < visibleCount ? 1 : 0 }}
                transition={{ duration: charDurationMs / 1000 }}
              >
                {item.char === " " ? "\u00A0" : item.char}
              </motion.span>
            );
          })}
        </span>
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
