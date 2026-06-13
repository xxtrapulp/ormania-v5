// @ts-check
//
// build-images.mjs
//
// Converts every JPG in `public/instagram/` (and any `public/showroom` if it
// exists) into AVIF + WebP variants at three target widths:
//   480w  - phones (50-100vw at typical mobile widths)
//   768w  - small tablets / 2-col cards
//   1200w - desktop grid cells, hero cards
//
// Rules (per the Layer 1 / Track C2 brief):
//   - Skip if the output is LARGER than the input (don't down-convert
//     already-tiny images).
//   - Skip if the output file already exists AND is newer than the source
//     (idempotent - safe to re-run on every build).
//   - Output paths: `public/instagram/<basename>-<width>.<ext>`.
//
// Re-run with:
//   node scripts/build-images.mjs
// or:
//   npm run build:images
//
// No runtime impact - the resulting files are static assets served from
// `public/`. Components consume them via `lib/images.ts` helpers that map
// the original `.jpg` path to the right width+format variant.

import { readdir, stat, mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse, resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const PUBLIC_DIR = resolve(ROOT, "public");

const WIDTHS = [480, 768, 1200];
const FORMATS = [
  { ext: "avif", mime: "image/avif", sharpFormat: "avif", quality: 55 },
  { ext: "webp", mime: "image/webp", sharpFormat: "webp", quality: 80 },
];

const SOURCE_DIRS = [
  resolve(PUBLIC_DIR, "instagram"),
  resolve(PUBLIC_DIR, "showroom"),
];

const MAX_WIDTH_FOR_SKIP_RATIO = 1.05; // 5% tolerance — if AVIF is barely smaller, keep JPG

/** Recursively find all `.jpg`/`.jpeg` files under a directory (returns absolute paths). */
async function findJpegs(dir) {
  const results = [];
  async function walk(d) {
    let entries;
    try {
      entries = await readdir(d, { withFileTypes: true });
    } catch (err) {
      if (err.code === "ENOENT") return;
      throw err;
    }
    for (const e of entries) {
      const p = join(d, e.name);
      if (e.isDirectory()) {
        await walk(p);
      } else if (e.isFile()) {
        const ext = extname(e.name).toLowerCase();
        if (ext === ".jpg" || ext === ".jpeg") {
          results.push(p);
        }
      }
    }
  }
  await walk(dir);
  return results;
}

async function ensureDir(p) {
  if (!existsSync(p)) await mkdir(p, { recursive: true });
}

async function convertOne(srcPath) {
  const { dir, name } = parse(srcPath);
  const srcStat = await stat(srcPath);
  const srcMtime = srcStat.mtimeMs;
  const srcSize = srcStat.size;

  // Get source dimensions — needed so we don't upscale.
  const meta = await sharp(srcPath).metadata();
  if (!meta.width || !meta.height) {
    return { skipped: true, reason: "no-dimensions", file: srcPath };
  }

  const out = [];
  for (const width of WIDTHS) {
    if (width > meta.width * 1.5) {
      // Source is much smaller than the target — don't upscale.
      out.push({ width, skipped: true, reason: "upscale-skip" });
      continue;
    }
    for (const fmt of FORMATS) {
      const outPath = join(dir, `${name}-${width}.${fmt.ext}`);
      try {
        const outStat = existsSync(outPath) ? await stat(outPath) : null;
        if (outStat && outStat.mtimeMs >= srcMtime) {
          out.push({ width, format: fmt.ext, skipped: true, reason: "up-to-date" });
          continue;
        }
        await sharp(srcPath)
          .resize({ width, withoutEnlargement: true })
          .toFormat(fmt.sharpFormat, { quality: fmt.quality })
          .toFile(outPath);
        const newStat = await stat(outPath);
        // Heuristic: don't keep a converted file that's actually bigger than
        // the source. (Bespoke threshold — keeps a tiny image from being
        // turned into a larger AVIF file.)
        if (newStat.size > srcSize * MAX_WIDTH_FOR_SKIP_RATIO) {
          await rm(outPath);
          out.push({ width, format: fmt.ext, skipped: true, reason: "no-savings" });
        } else {
          out.push({
            width,
            format: fmt.ext,
            skipped: false,
            bytes: newStat.size,
          });
        }
      } catch (err) {
        out.push({ width, format: fmt.ext, skipped: true, reason: `error:${err.message}` });
      }
    }
  }
  return { file: srcPath, srcBytes: srcSize, variants: out };
}

function fmtBytes(n) {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${(n / 1024 / 1024).toFixed(2)}MB`;
}

async function main() {
  let totalSrc = 0;
  let totalOut = 0;
  const reports = [];
  for (const dir of SOURCE_DIRS) {
    if (!existsSync(dir)) continue;
    const files = await findJpegs(dir);
    for (const f of files) {
      try {
        const r = await convertOne(f);
        if (r.srcBytes) totalSrc += r.srcBytes;
        for (const v of r.variants || []) {
          if (v.bytes) totalOut += v.bytes;
        }
        reports.push(r);
      } catch (err) {
        reports.push({ file: f, error: err.message });
      }
    }
  }

  // Print summary
  let written = 0;
  let skipped = 0;
  for (const r of reports) {
    if (r.error) {
      console.error(`✗ ${r.file}: ${r.error}`);
      continue;
    }
    for (const v of r.variants || []) {
      if (v.skipped) {
        skipped++;
      } else {
        written++;
      }
    }
  }
  console.log(
    `\nbuild-images: ${reports.length} source files, ${written} variants written, ${skipped} skipped (up-to-date or no savings).`
  );
  console.log(
    `Source total: ${fmtBytes(totalSrc)}  →  Variant total: ${fmtBytes(totalOut)}  (Δ ${fmtBytes(totalOut - totalSrc)})`
  );

  // Write a tiny manifest that the rest of the app can read if it wants.
  const manifest = {};
  for (const r of reports) {
    if (r.error) continue;
    const { name } = parse(r.file);
    manifest[name] = (r.variants || []).map((v) => ({
      width: v.width,
      format: v.format,
      bytes: v.bytes,
      skipped: v.skipped,
      reason: v.reason,
    }));
  }
  const manifestPath = resolve(__dirname, "..", "public", "instagram", "_variants.json");
  await ensureDir(dirname(manifestPath));
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
