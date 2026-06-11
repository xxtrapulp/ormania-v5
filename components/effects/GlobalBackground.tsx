"use client";

import { VelvetGoldShader } from "./VelvetGoldShader";

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <VelvetGoldShader />
    </div>
  );
}
