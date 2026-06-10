"use client";

import { useSmoothAnchors } from "@/hooks/useSmoothAnchors";

export function SmoothAnchorProvider() {
  useSmoothAnchors();
  return null;
}
