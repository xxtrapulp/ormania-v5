/**
 * Image variant helpers — resolve the original `.jpg` path to the right
 * pre-generated AVIF / WebP variant. Used by `next/image` consumers across
 * the site (IG grid, collections, custom, repairs, etc.).
 *
 * Generated assets live next to their source:
 *   public/instagram/ig-DRP2awpjmhB-480.avif
 *   public/instagram/ig-DRP2awpjmhB-480.webp
 *   public/instagram/ig-DRP2awpjmhB-768.avif
 *   public/instagram/ig-DRP2awpjmhB-768.webp
 *   public/instagram/ig-DRP2awpjmhB-1200.avif
 *   public/instagram/ig-DRP2awpjmhB-1200.webp
 *
 * Generation is handled by `scripts/build-images.mjs` (idempotent — re-runs
 * are safe and only emit missing/stale variants).
 *
 * Strategy:
 *   - `pickWidth(renderedWidth)` chooses the smallest variant >= rendered.
 *     Falls back to the next width up if the exact width isn't available
 *     (the file may have been skipped because the source was too small).
 *   - The consumer uses `<picture>` with `<source type="image/avif">` and
 *     `<source type="image/webp">` for format negotiation, then `<img>` with
 *     the AVIF URL as fallback (modern browsers that don't speak AVIF fall
 *     through to WebP, then to the original JPG path).
 */

export const GENERATED_WIDTHS = [480, 768, 1200] as const;
export type GeneratedWidth = (typeof GENERATED_WIDTHS)[number];

/** Strip `.jpg`/`.jpeg` from a path like `/instagram/ig-XXX.jpg`. */
function stripJpegExt(p: string): { dir: string; base: string } {
  const lastSlash = p.lastIndexOf("/");
  const dir = lastSlash >= 0 ? p.slice(0, lastSlash) : "";
  const file = lastSlash >= 0 ? p.slice(lastSlash + 1) : p;
  const base = file.replace(/\.jpe?g$/i, "");
  return { dir, base };
}

/**
 * Pick the smallest generated width that is >= `renderedWidth`.
 * If the largest is still smaller than the rendered size, scale up to the
 * largest available. If renderedWidth is 0 / undefined, default to 1200
 * (desktop hero card) — saves a function call in the common case.
 */
export function pickWidth(renderedWidth?: number): GeneratedWidth {
  if (!renderedWidth || renderedWidth <= 0) return 1200;
  for (const w of GENERATED_WIDTHS) {
    if (w >= renderedWidth) return w;
  }
  return 1200;
}

/** Build the path to a generated variant of the given source JPG. */
export function igVariant(
  jpgPath: string,
  width: GeneratedWidth,
  format: "avif" | "webp" = "avif"
): string {
  const { dir, base } = stripJpegExt(jpgPath);
  const prefix = dir ? `${dir}/` : "";
  return `${prefix}${base}-${width}.${format}`;
}

/**
 * Build a `srcset` attribute for a generated image.
 *
 *   const srcset = igSrcset(post.image, 'avif');
 *   → "/instagram/ig-XXX-480.avif 480w, /instagram/ig-XXX-768.avif 768w, /instagram/ig-XXX-1200.avif 1200w"
 */
export function igSrcset(jpgPath: string, format: "avif" | "webp" = "avif"): string {
  return GENERATED_WIDTHS.map((w) => `${igVariant(jpgPath, w, format)} ${w}w`).join(", ");
}

/** Convenience: the single best fallback URL (AVIF, largest width). */
export function igFallback(jpgPath: string): string {
  return igVariant(jpgPath, 1200, "avif");
}
