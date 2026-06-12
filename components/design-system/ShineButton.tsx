"use client";

import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ShineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function ShineButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ShineButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 font-medium tracking-wide rounded-full overflow-hidden isolation-[isolate] transition-transform active:scale-[0.96]";

  const variants = {
    primary:
      "bg-gold text-ink hover:bg-gold-2 btn-sheen",
    secondary:
      "border border-gold/40 text-gold bg-transparent hover:bg-gold/10 hover:border-gold/60",
    ghost:
      "text-ivory hover:text-gold bg-transparent",
  };

  const sizes = {
    sm: "h-10 px-5 text-[0.8rem]",
    md: "h-[clamp(44px,12vw,52px)] px-[clamp(16px,4vw,22px)] text-[clamp(0.875rem,2.8vw,0.95rem)]",
    lg: "h-14 px-8 text-[1rem]",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
