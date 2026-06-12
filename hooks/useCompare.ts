"use client";

import { useState, useEffect, useCallback } from "react";

interface CompareItem {
  id: string;
  title: string;
  category: string;
  image: string;
  notes?: string;
}

const STORAGE_KEY = "ormania.compareItems";

export function useCompare() {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, isReady]);

  const add = useCallback((item: CompareItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      if (prev.length >= 3) return prev; // max 3
      return [...prev, item];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const isComparing = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  return { items, add, remove, clear, isComparing, count: items.length };
}
