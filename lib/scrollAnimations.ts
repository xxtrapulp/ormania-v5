"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const luxeEase = "power3.out";

export function revealFadeUp(
  el: HTMLElement | string,
  delay = 0,
  duration = 0.8
) {
  return gsap.from(el, {
    y: 30,
    opacity: 0,
    duration,
    delay,
    ease: luxeEase,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}

export function revealSplitText(
  el: HTMLElement,
  delay = 0
) {
  const words = el.querySelectorAll(".word");
  return gsap.from(words, {
    yPercent: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.05,
    delay,
    ease: luxeEase,
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

export function revealCards(
  container: HTMLElement,
  stagger = 0.1
) {
  const cards = container.querySelectorAll(".reveal-card");
  return gsap.from(cards, {
    y: 50,
    opacity: 0,
    rotateX: 8,
    duration: 0.9,
    stagger,
    ease: luxeEase,
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

export function pinHeroText(
  section: HTMLElement,
  content: HTMLElement
) {
  return gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=50%",
      pin: content,
      scrub: 1,
    },
  });
}

export function drawLine(el: HTMLElement) {
  return gsap.fromTo(
    el,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1,
      ease: luxeEase,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function horizontalScroll(
  container: HTMLElement,
  track: HTMLElement
) {
  const scrollWidth = track.scrollWidth - window.innerWidth;
  return gsap.to(track, {
    x: -scrollWidth,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${scrollWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}

export function staggerChildren(
  container: HTMLElement,
  selector: string,
  stagger = 0.08
) {
  const items = container.querySelectorAll(selector);
  return gsap.from(items, {
    y: 24,
    opacity: 0,
    duration: 0.7,
    stagger,
    ease: luxeEase,
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}
