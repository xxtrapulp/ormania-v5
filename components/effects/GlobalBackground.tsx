"use client";

/**
 * GlobalBackground — lazy-loaded velvet-gold shader wrapper.
 *
 * The shader is the single biggest JS contributor on the home page:
 * three.js + @react-three/fiber = ~600KB minified. Even with the
 * shader conditionally rendered (IntersectionObserver gating), the
 * shader's own module still parses on first page load because the
 * import is static.
 *
 * This wrapper uses Next.js `dynamic` (ssr:false) to defer the shader
 * module until after the initial paint. The CSS-only fallback
 * (hero-velvet / hero-grain / hero-lightleak from globals.css) is
 * rendered immediately so the page has the gold backdrop from
 * first frame, with the interactive shader fading in once loaded.
 *
 * The first ~600KB of JS is therefore no longer in the critical path,
 * which is the single biggest lever for mobile Lighthouse P-score.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VelvetGoldShader = dynamic(
  () => import("./VelvetGoldShader").then((m) => m.VelvetGoldShader),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <div className="hero-velvet absolute inset-0" />
        <div className="hero-grain absolute inset-0" />
        <div className="hero-lightleak absolute inset-0" />
      </div>
    ),
  }
);

export function GlobalBackground() {
  // Defer the dynamic import by one frame so the initial paint can
  // happen with just the CSS-only background. This ensures the LCP
  // candidate (the hero wordmark) isn't blocked by a module fetch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <div className="hero-velvet absolute inset-0" />
        <div className="hero-grain absolute inset-0" />
        <div className="hero-lightleak absolute inset-0" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <VelvetGoldShader />
    </div>
  );
}
