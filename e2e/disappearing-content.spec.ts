import { test, expect, type Page } from "@playwright/test";

/**
 * Regression guard for the chronic "disappearing content" bug
 * (multiple prior commits attempted fixes that didn't stick). On every
 * home-page render, no content element that's actually in the viewport
 * may be stuck at opacity 0 / hidden — the user must see it.
 *
 * This walks the page in coarse steps, then asserts that all visible
 * candidates in each viewport pass are either:
 *  - visible at opacity 1, OR
 *  - intentionally hidden (group-hover caption, scroll-story step sibling,
 *    typewriter cursor blink, fixed-position UI like the back-to-top button).
 *
 * If this test fails, the page is silently dropping content from view.
 */

const locales = ["en", "fr"] as const;

const VISIBLE_CANDIDATE_SELECTORS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "li",
  "button:not([aria-hidden='true'])",
  "a[href]:not([aria-hidden='true'])",
  "img",
  "article",
  "[class*='rounded-2xl']",
  "[class*='rounded-xl']",
  "[class*='card-glow']",
];

/** Get an element's className as a plain string (SVG uses SVGAnimatedString). */
function classNameOf(el: Element): string {
  const cn = (el as HTMLElement).className;
  if (typeof cn === "string") return cn;
  const animated = cn as SVGAnimatedString | undefined;
  return String(animated?.baseVal ?? "");
}

/** Reasons an element may legitimately be at opacity 0 in the viewport. */
function isIntentionallyHidden(el: Element): boolean {
  const cls = classNameOf(el);
  const style = window.getComputedStyle(el);
  // Group-hover reveals (e.g. IG card caption on hover).
  if (cls.includes("group-hover:opaci") || cls.includes("hover:opaci")) {
    return true;
  }
  // Fixed-position UI (back-to-top, toast viewport, etc.) — out of scope
  // for "content visibility".
  if (style.position === "fixed") return true;
  // ScrollStory stacks 4 step panels in the same grid cell; only the
  // active one shows. Siblings sit at opacity 0 by design.
  let p: HTMLElement | null = el.parentElement;
  while (p) {
    if (p.querySelector?.(".step-counter")) return true;
    p = p.parentElement;
  }
  // Typewriter cursor — intentionally blinks between opacity 0 and 1.
  if (el.tagName === "SPAN" && cls.includes("w-[2px]")) return true;
  // Modal & dialogs — test scope is the home page only.
  if (el.closest("[role='dialog']")) return true;
  return false;
}

type StuckSample = { tag: string; cls: string; text: string };

/** Run the scroll-walk once and return the per-pass stuck findings. */
async function findStuckContent(
  page: Page,
  selectors: readonly string[]
): Promise<{ y: number; pass: number; samples: StuckSample[] }[]> {
  return page.evaluate(
    ({ selectors: sels }) => {
      const candidates = document.querySelectorAll(sels.join(","));
      const viewportH = window.innerHeight;
      const inViewport = Array.from(candidates).filter((el) => {
        const r = el.getBoundingClientRect();
        return r.top < viewportH && r.bottom > 0 && r.width > 0 && r.height > 0;
      });
      const hidden = inViewport.filter((el) => {
        const style = window.getComputedStyle(el);
        return style.opacity === "0" || style.visibility === "hidden";
      });
      const cn = (el: Element): string => {
        const v = (el as HTMLElement).className;
        if (typeof v === "string") return v;
        return String((v as SVGAnimatedString | undefined)?.baseVal ?? "");
      };
      const intentional = (el: Element): boolean => {
        const cls = cn(el);
        const style = window.getComputedStyle(el);
        if (cls.includes("group-hover:opaci") || cls.includes("hover:opaci")) return true;
        if (style.position === "fixed") return true;
        let p: HTMLElement | null = el.parentElement;
        while (p) {
          if (p.querySelector?.(".step-counter")) return true;
          p = p.parentElement;
        }
        if (el.tagName === "SPAN" && cls.includes("w-[2px]")) return true;
        if (el.closest("[role='dialog']")) return true;
        return false;
      };
      const samples = hidden
        .filter((el) => !intentional(el))
        .slice(0, 5)
        .map((el) => ({
          tag: el.tagName,
          cls: cn(el).slice(0, 70),
          text: (el.textContent || "").trim().slice(0, 35),
        }));
      return [{ y: window.scrollY, pass: 0, samples }];
    },
    { selectors: [...selectors] }
  );
}

for (const lang of locales) {
  test.describe(`${lang} — disappearing-content regression`, () => {
    test("no content is stuck at opacity:0 while in the viewport", async ({ page }) => {
      test.setTimeout(180_000);

      await page.goto(`/${lang}/`);
      await page.waitForLoadState("networkidle");

      const viewportHeight = await page.evaluate(() => window.innerHeight);
      const documentHeight = await page.evaluate(() => document.body.scrollHeight);
      const step = Math.max(Math.floor(viewportHeight * 0.5), 400);

      const stuckFindings: { y: number; pass: number; samples: StuckSample[] }[] = [];

      let y = 0;
      let pass = 0;
      while (y < documentHeight) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        // 700ms is enough for stagger reveals (~0.95s tail) to finish
        // for content that has actually entered the viewport.
        await page.waitForTimeout(700);

        const result = await findStuckContent(page, VISIBLE_CANDIDATE_SELECTORS);
        const stuck = result[0]?.samples ?? [];
        if (stuck.length > 0) {
          stuckFindings.push({ y, pass, samples: stuck });
        }
        y += step;
        pass++;
      }

      // Report the full breakdown for diagnostics.
      // eslint-disable-next-line no-console
      console.log(
        `[${lang}] scroll passes=${pass}, passes with stuck content=${stuckFindings.length}`
      );
      if (stuckFindings.length > 0) {
        const summary = stuckFindings
          .slice(0, 5)
          .map((f) => {
            const samples = f.samples
              .map((s) => `${s.tag} "${s.text}" (${s.cls})`)
              .join("; ");
            return `  y=${f.y}: ${samples}`;
          })
          .join("\n");
        // eslint-disable-next-line no-console
        console.log(`[${lang}] first stuck passes:\n${summary}`);
      }

      expect(
        stuckFindings.length,
        `Found ${stuckFindings.length} scroll positions where content was stuck at opacity 0. See console output for the first 5.`
      ).toBe(0);
    });
  });
}

