"use client";

import { useEffect, useState } from "react";

function generateNoiseDataUrl(size = 256): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const idata = ctx.createImageData(size, size);
  const buffer = new Uint32Array(idata.data.buffer);
  for (let i = 0; i < buffer.length; i++) {
    if (Math.random() < 0.08) {
      buffer[i] = 0x12ffffff;
    }
  }
  ctx.putImageData(idata, 0, 0);
  return canvas.toDataURL();
}

export function GrainOverlay() {
  const [bgUrl, setBgUrl] = useState<string>("");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    setBgUrl(generateNoiseDataUrl(256));
  }, []);

  if (!bgUrl) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[150] opacity-[0.045]"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundRepeat: "repeat",
        mixBlendMode: "overlay",
        willChange: "background-position",
      }}
    />
  );
}
