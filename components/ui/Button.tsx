"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";

/**
 * Luxury tactile button — spec-compliant mobile sizing:
 * height clamp(44px,12vw,52px), font clamp(0.875rem,2.8vw,0.95rem),
 * padding-inline clamp(16px,4vw,22px), pill radius, gold sheen,
 * gentle press scale, no wrap.
 */
const buttonVariants = cva(
  [
    "btn-sheen inline-flex items-center justify-center gap-2 select-none",
    "rounded-full font-medium whitespace-nowrap max-w-full",
    "h-(--btn-h) text-(length:--btn-fs) px-(--btn-px)",
    "transition-all duration-300 ease-(--ease-luxe)",
    "active:scale-[0.97]",
    "disabled:opacity-50 disabled:pointer-events-none",
    "[-webkit-tap-highlight-color:transparent]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-gold text-ink border border-gold",
          "hover:bg-gold-3 hover:border-gold-3 hover:-translate-y-px",
          "hover:shadow-[0_8px_28px_rgba(201,168,106,0.35),0_0_0_1px_rgba(201,168,106,0.5)]",
        ].join(" "),
        secondary: [
          "bg-transparent text-ivory border border-gold/60",
          "hover:bg-gold/10 hover:border-gold hover:-translate-y-px",
          "hover:shadow-[0_0_0_1px_rgba(201,168,106,0.25),0_0_18px_rgba(201,168,106,0.15)]",
        ].join(" "),
        ivory: [
          "bg-ivory text-ink border border-ivory",
          "hover:bg-pearl hover:-translate-y-px",
          "hover:shadow-[0_8px_24px_rgba(248,244,235,0.2)]",
        ].join(" "),
        ghost: [
          "bg-transparent text-text-2 border border-white/15",
          "hover:text-gold hover:border-gold/50",
        ].join(" "),
      },
      size: {
        default: "",
        sm: "h-[max(44px,2.75rem)] text-[13px] px-4",
        lg: "md:h-[54px] md:px-8 md:text-[0.95rem]",
        icon: "w-11 h-11 min-w-11 px-0",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "primary", size: "default", full: false },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
  /** Animated arrow that slides on hover */
  arrow?: boolean;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { className, variant, size, full, arrow, children, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size, full }), className, "group magnetic-btn");
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);

  const content = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 ease-(--ease-luxe) group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  const magneticProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { willChange: "transform" },
  };

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = rest as Omit<ButtonAsLink, keyof ButtonBaseProps> & {
      href?: string;
      external?: boolean;
    };
    void href;
    if (external || props.href.startsWith("http") || props.href.startsWith("tel:") || props.href.startsWith("mailto:")) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={props.href}
          className={classes}
          {...(props.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          {...magneticProps}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={props.href}
        className={classes}
        {...(anchorRest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}
        {...magneticProps}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      {...magneticProps}
    >
      {content}
    </button>
  );
}

/** Short label on phones (<390px shows `short`), full label from xs up. */
export function ResponsiveLabel({
  short,
  full,
  breakpoint = "xs",
}: {
  short: string;
  full: string;
  breakpoint?: "xs" | "sm" | "md";
}) {
  const hide: Record<string, string> = {
    xs: "xs:hidden",
    sm: "sm:hidden",
    md: "md:hidden",
  };
  const show: Record<string, string> = {
    xs: "hidden xs:inline",
    sm: "hidden sm:inline",
    md: "hidden md:inline",
  };
  return (
    <>
      <span className={hide[breakpoint]}>{short}</span>
      <span className={show[breakpoint]}>{full}</span>
    </>
  );
}
