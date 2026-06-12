"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
}

export function HorizontalScroll({
  children,
  className,
  itemClassName,
}: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4",
        className
      )}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} className={cn("snap-start shrink-0", itemClassName)}>
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
