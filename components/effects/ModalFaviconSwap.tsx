"use client";

import { useEffect, useRef } from "react";
import { useModal } from "@/components/modals/ModalSystem";

/**
 * ModalFaviconSwap
 *
 * While ANY modal is open AND the tab is hidden, swap the favicon to a
 * pulsing gold-ring SVG variant so the user can see at a glance that
 * something is waiting. Restores the default favicon as soon as the
 * modal closes OR the tab regains focus.
 *
 * No canvas, no rAF — the pulsing motion comes from inline SVG <animate>
 * tags embedded in the data URL. The browser caches the favicon, so
 * the swap is cheap and self-contained.
 *
 * Mounted once at the layout level. Reads the default favicon URL from
 * the existing <link rel="icon"> that Next/HTML emits on every page.
 */
export function ModalFaviconSwap() {
  const { activeModal } = useModal();
  const lastFaviconRef = useRef<{ href: string | null; type: string | null }>({
    href: null,
    type: null,
  });
  const usingCustomRef = useRef(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const findIconLink = (): HTMLLinkElement | null => {
      // Prefer the most recently added rel="icon" — Next/HTML can emit several.
      const links = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]'),
      );
      if (links.length === 0) return null;
      return links[links.length - 1];
    };

    const restoreDefault = () => {
      if (!usingCustomRef.current) return;
      const link = findIconLink();
      const last = lastFaviconRef.current;
      if (link) {
        if (last.href !== null) link.href = last.href;
        if (last.type !== null) link.type = last.type;
      }
      usingCustomRef.current = false;
    };

    const setAnimated = () => {
      const link = findIconLink();
      if (!link) return;
      // Cache the default the first time we touch it.
      if (!usingCustomRef.current) {
        lastFaviconRef.current = { href: link.href, type: link.type };
      }
      link.type = "image/svg+xml";
      link.href = ANIMATED_FAVICON_DATA_URL;
      usingCustomRef.current = true;
    };

    const onVisibility = () => {
      const shouldAnimate = !!activeModal && document.visibilityState === "hidden";
      if (shouldAnimate) {
        setAnimated();
      } else {
        restoreDefault();
      }
    };

    // Run once on mount in case the modal is already open and the tab
    // is already hidden when this component mounts.
    onVisibility();

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      restoreDefault();
    };
  }, [activeModal]);

  return null;
}

/**
 * 32×32 gold-ring SVG with a self-contained <animate> that pulses
 * the stroke-opacity 0.4 → 1.0 → 0.4 over 1.6s, looping forever.
 * Encoded as a data URL so we can hand it to <link rel="icon">.
 */
const ANIMATED_FAVICON_DATA_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">` +
      `<rect width="32" height="32" fill="#0a0908"/>` +
      `<circle cx="16" cy="16" r="10" fill="none" stroke="#c9a86a" stroke-width="2">` +
        `<animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite"/>` +
        `<animate attributeName="r" values="9;11;9" dur="1.6s" repeatCount="indefinite"/>` +
      `</circle>` +
      `<circle cx="16" cy="16" r="3" fill="#f2c33b">` +
        `<animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite"/>` +
      `</circle>` +
    `</svg>`,
  );
