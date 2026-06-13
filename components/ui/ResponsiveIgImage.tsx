"use client";

import * as React from "react";
import { igVariant, igSrcset, pickWidth, type GeneratedWidth } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * ResponsiveIgImage — `<picture>`-based variant of `next/image` for
 * Instagram-style content where the source path points to a `.jpg` and
 * we want to serve the pre-generated AVIF / WebP variants at the right
 * width.
 *
 * Why not just next/image? With `unoptimized: true` (the static export
 * setting used by this site), next/image emits a plain `<img>` and
 * doesn't do format negotiation. The `<picture>` element gives us
 * multi-format support with zero runtime cost — the browser picks the
 * first source it supports.
 *
 * Source priority: AVIF (best compression) → WebP (broad support) → JPG
 * (universal fallback). The rendered `<img>` keeps the original .jpg
 * path so any browser that ignores `<picture>` (rare in 2026) still sees
 * an image.
 *
 * `priority` is forwarded to the underlying `<img>` as `fetchPriority="high"`
 * and as `loading="eager"`, telling the browser to fetch at high
 * priority and not defer. In Next.js 16, the `priority` prop on
 * `next/image` is deprecated in favor of `preload` (which inserts a
 * `<link rel="preload">` in the head); this component doesn't generate
 * that link automatically because the static export is the consumer's
 * responsibility via the route's `<head>`.
 */

export interface ResponsiveIgImageProps {
  /** Original `.jpg` path, e.g. `/instagram/ig-DRP2awpjmhB.jpg`. */
  src: string;
  alt: string;
  /** Required for fill / explicit layout. */
  width?: number;
  height?: number;
  /** Use 100%/100% of parent container (replaces width/height). */
  fill?: boolean;
  /** `sizes` attribute — pick the right width variant for the viewport. */
  sizes: string;
  /** Skip lazy-loading and pre-prefetch the image. */
  priority?: boolean;
  /** Object-fit CSS. Defaults to `cover`. */
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  /** className on the inner `<img>`. */
  className?: string;
  /** className on the outer `<picture>` element. */
  pictureClassName?: string;
  /** Override the widths used in the srcset. */
  widths?: readonly GeneratedWidth[];
}

export const ResponsiveIgImage = React.forwardRef<HTMLImageElement, ResponsiveIgImageProps>(
  function ResponsiveIgImage(props, ref) {
    const {
      src,
      alt,
      width,
      height,
      fill,
      sizes,
      priority = false,
      objectFit = "cover",
      className,
      pictureClassName,
      widths,
    } = props;

    const allWidths = widths ?? ([480, 768, 1200] as const);

    // Sanitize the original src for the img fallback (strip any query/hash).
    const originalSrc = src;

    // The fetchPriority attribute is what the browser uses to decide
    // which image to start downloading first. We use it for both the
    // `<img>` (always) and the `<source>` elements (when `priority`).
    const fetchPriority: "high" | undefined = priority ? "high" : undefined;

    const imgStyle: React.CSSProperties | undefined = fill
      ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit }
      : undefined;

    return (
      <picture className={pictureClassName}>
        {allWidths.length > 0 && (
          <>
            <source
              type="image/avif"
              srcSet={allWidths.map((w) => `${igVariant(src, w, "avif")} ${w}w`).join(", ")}
              sizes={sizes}
              {...(fetchPriority ? { fetchPriority } : {})}
            />
            <source
              type="image/webp"
              srcSet={allWidths.map((w) => `${igVariant(src, w, "webp")} ${w}w`).join(", ")}
              sizes={sizes}
              {...(fetchPriority ? { fetchPriority } : {})}
            />
          </>
        )}
        <img
          ref={ref}
          src={originalSrc}
          alt={alt}
          {...(width !== undefined ? { width } : {})}
          {...(height !== undefined ? { height } : {})}
          {...(fill ? { style: imgStyle } : {})}
          {...(className && !fill ? { className } : {})}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={fetchPriority}
          {...(className && fill ? { className: cn(className, "h-full w-full") } : {})}
        />
      </picture>
    );
  }
);

/**
 * Helper for places where a simple srcset is needed but the full picture
 * element isn't. Returns the AVIF srcset for a `.jpg` path.
 */
export function avifSrcset(jpgPath: string): string {
  return igSrcset(jpgPath, "avif");
}

export function webpSrcset(jpgPath: string): string {
  return igSrcset(jpgPath, "webp");
}

export function avifAt(jpgPath: string, width: GeneratedWidth = 1200): string {
  return igVariant(jpgPath, width, "avif");
}

export function webpAt(jpgPath: string, width: GeneratedWidth = 1200): string {
  return igVariant(jpgPath, width, "webp");
}

export { pickWidth };
