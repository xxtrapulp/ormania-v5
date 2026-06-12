"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EditorialGridProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}

export function EditorialGrid({
  children,
  className,
  reverse = false,
}: EditorialGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center",
        reverse && "md:[direction:rtl]",
        className
      )}
    >
      <div className={cn("md:[direction:ltr]", reverse && "md:order-2")}>
        {Array.isArray(children) ? children[0] : children}
      </div>
      <div className={cn("md:[direction:ltr]", reverse && "md:order-1")}>
        {Array.isArray(children) ? children[1] : null}
      </div>
    </div>
  );
}
