"use client";

import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function ScrambleText({
  text,
  className,
  delay = 0,
  duration = 1200,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    const length = text.length;
    const stepTime = duration / (length * 2);
    let current = 0;

    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < current) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      current += 0.5;
      if (current >= length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [started, text, duration]);

  return <span className={className}>{display}</span>;
}
