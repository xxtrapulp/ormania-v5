"use client";

import { useState, useEffect, useCallback } from "react";

interface SavedPiece {
  id: string;
  title: string;
  category: string;
  image: string;
  addedAt: string;
}

const STORAGE_KEY = "ormania.savedPieces";

export function useSavedPieces() {
  const [pieces, setPieces] = useState<SavedPiece[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPieces(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pieces));
    } catch {
      /* ignore */
    }
  }, [pieces, isReady]);

  const add = useCallback((piece: Omit<SavedPiece, "addedAt">) => {
    setPieces((prev) => {
      if (prev.some((p) => p.id === piece.id)) return prev;
      return [...prev, { ...piece, addedAt: new Date().toISOString() }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setPieces((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clear = useCallback(() => setPieces([]), []);

  const isSaved = useCallback((id: string) => pieces.some((p) => p.id === id), [pieces]);

  return { pieces, add, remove, clear, isSaved, count: pieces.length };
}
