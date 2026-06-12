"use client";

import { useRef, useEffect, type ReactNode, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
  radius?: number;
}

export function MagneticButton({
  children,
  strength = 0.3,
  radius = 100,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const f = 1 - dist / radius;
        el.style.transform = `translate(${dx * strength * f}px, ${dy * strength * f}px)`;
      } else {
        el.style.transform = "translate(0, 0)";
      }
    };

    const handleLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    window.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength, radius]);

  return (
    <button
      ref={ref}
      className={cn(
        "magnetic-btn will-change-transform",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
