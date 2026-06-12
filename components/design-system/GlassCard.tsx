"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "none" | "soft" | "strong";
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = "soft",
  onClick,
}: GlassCardProps) {
  const glowClasses = {
    none: "",
    soft: "hover:shadow-[0_0_0_1px_rgba(201,168,106,0.2),0_0_14px_rgba(201,168,106,0.12)]",
    strong: "hover:shadow-[0_0_0_1px_rgba(201,168,106,0.35),0_0_24px_rgba(201,168,106,0.25)]",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-[rgba(255,255,255,0.04)] border border-[rgba(201,168,106,0.18)] rounded-2xl transition-all duration-500",
        hover && "hover:border-[rgba(201,168,106,0.3)] hover:-translate-y-[3px]",
        onClick && "cursor-pointer",
        glowClasses[glow],
        className
      )}
    >
      {children}
    </div>
  );
}
