"use client";

import { motion } from "framer-motion";

interface Part {
  text: string;
  className?: string;
}

/** Hero headline: word-by-word fade-up + scale reveal,
 *  with character-level micro-stagger inside each word.
 *  Uses Framer Motion only — no GSAP in the hero.
 */
export function HeroTextReveal({
  parts,
  className = "",
  baseDelay = 0.6,
}: {
  parts: Part[];
  className?: string;
  baseDelay?: number;
}) {
  // Flatten all parts into one word stream with part indices
  const allWords: { text: string; partIdx: number; wordIdx: number }[] = [];
  let wordCounter = 0;
  parts.forEach((part, partIdx) => {
    part.text.split(" ").forEach((word) => {
      allWords.push({ text: word, partIdx, wordIdx: wordCounter });
      wordCounter++;
    });
  });

  const wordStagger = 0.08;
  const charStagger = 0.015;

  return (
    <span className={`inline ${className}`}>
      {allWords.map(({ text, partIdx, wordIdx }) => {
        const wordDelay = baseDelay + wordIdx * wordStagger;
        return (
          <motion.span
            key={wordIdx}
            className={`inline-block mr-[0.25em] ${parts[partIdx].className ?? ""}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: wordDelay,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            {text.split("").map((char, charIdx) => (
              <motion.span
                key={charIdx}
                className="inline-block"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: wordDelay + charIdx * charStagger,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        );
      })}
    </span>
  );
}
