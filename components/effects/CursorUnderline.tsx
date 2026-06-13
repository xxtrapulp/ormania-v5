"use client";

/**
 * CursorUnderline — the cursor-aware luxury link underline.
 *
 * Behavior:
 *  - 1px gold line, full link width.
 *  - On hover, the line "grows" from the cursor's x position toward
 *    BOTH edges (left and right halves). Implemented with two
 *    absolutely-positioned halves whose transform-origin is the
 *    cursor's x within the link.
 *  - No new dependencies — pure CSS transitions (via Tailwind) + a
 *    small `useRef` / `useState` for cursor x.
 *  - Honors `prefers-reduced-motion` via Tailwind's `motion-safe:`
 *    variant — transitions only apply when the user has NOT set
 *    reduced-motion.
 *  - On touch devices, the underline simply stays a static gold
 *    line (or hidden if not active) — the cursor-relative two-half
 *    effect requires a hovering cursor.
 *
 * Two surfaces:
 *  1. **`<CursorUnderline href="...">label</CursorUnderline>`** —
 *     full <a> wrapper, default for nav links and inline links.
 *  2. **`<CursorUnderline.Span>label</CursorUnderline.Span>`** —
 *     inline `<span>` for use *inside* an existing <a> (e.g. when
 *     the parent already owns the route / click target).
 */

import Link from "next/link";
import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MouseEvent,
  type CSSProperties,
} from "react";

interface BaseProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
  disabled?: boolean;
}

interface LinkProps extends BaseProps {
  href: string;
  prefetch?: boolean;
  "aria-label"?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  external?: boolean;
}

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none)").matches;
}

function UnderlineVisuals({ active, disabled }: { active: boolean; disabled: boolean }) {
  if (disabled) {
    return active ? (
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-full h-px bg-gold"
      />
    ) : null;
  }
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute top-full left-0 h-px bg-gold origin-right scale-x-0 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover/cu:scale-x-100"
        style={{ width: "var(--cu-x, 50%)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-full h-px bg-gold origin-left scale-x-0 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover/cu:scale-x-100"
        style={{ left: "var(--cu-x, 50%)", right: 0 }}
      />
      {active && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-full h-px bg-gold"
        />
      )}
    </>
  );
}

function CursorUnderlineLink({
  href,
  children,
  className,
  active = false,
  disabled = false,
  prefetch,
  onClick,
  external = false,
  ...rest
}: LinkProps) {
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const [cursorX, setCursorX] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (isTouchDevice()) return;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setCursorX(e.clientX - rect.left);
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setCursorX(null);
  }, []);

  const inlineStyle: CSSProperties =
    cursorX != null
      ? ({ ["--cu-x" as string]: `${cursorX}px` } as CSSProperties)
      : {};

  const classNameStr = `group/cu relative inline-block ${className || ""}`;

  if (external) {
    return (
      <a
        ref={wrapperRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={inlineStyle}
        className={classNameStr}
        data-cursor-underline=""
        data-active={active || undefined}
        data-disabled={disabled || undefined}
        {...rest}
      >
        {children}
        <UnderlineVisuals active={active} disabled={disabled} />
      </a>
    );
  }

  return (
    <Link
      ref={wrapperRef as React.Ref<HTMLAnchorElement>}
      href={href}
      prefetch={prefetch}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={inlineStyle}
      className={classNameStr}
      data-cursor-underline=""
      data-active={active || undefined}
      data-disabled={disabled || undefined}
      {...rest}
    >
      {children}
      <UnderlineVisuals active={active} disabled={disabled} />
    </Link>
  );
}

interface SpanProps extends BaseProps {
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}

function CursorUnderlineSpan({
  children,
  className,
  active = false,
  disabled = false,
  onClick,
}: SpanProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [cursorX, setCursorX] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      if (isTouchDevice()) return;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setCursorX(e.clientX - rect.left);
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setCursorX(null);
  }, []);

  const inlineStyle: CSSProperties =
    cursorX != null
      ? ({ ["--cu-x" as string]: `${cursorX}px` } as CSSProperties)
      : {};

  return (
    <span
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={inlineStyle}
      className={`group/cu relative inline-block ${className || ""}`}
      data-cursor-underline=""
      data-active={active || undefined}
      data-disabled={disabled || undefined}
    >
      {children}
      <UnderlineVisuals active={active} disabled={disabled} />
    </span>
  );
}

export const CursorUnderline = Object.assign(CursorUnderlineLink, {
  Span: CursorUnderlineSpan,
});
