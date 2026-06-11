"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

export function getLenis() {
  return lenisInstance;
}

export function initLenis() {
  if (lenisInstance) return lenisInstance;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  lenisInstance = new Lenis({
    lerp: prefersReduced ? 1 : 0.1,
    smoothWheel: !prefersReduced,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function destroyLenis() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  lenisInstance?.destroy();
  lenisInstance = null;
}
