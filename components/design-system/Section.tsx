"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  theme?: "dark" | "light";
  id?: string;
  as?: "section" | "div";
}

export function Section({
  children,
  className,
  theme = "dark",
  id,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "py-12 md:py-24",
        theme === "dark" ? "bg-ink text-ivory" : "bg-ivory text-ink",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {children}
      </div>
    </Tag>
  );
}
