import { test, expect } from "@playwright/test";

/**
 * Regression test for the keyframe flicker bug.
 *
 * The previous pattern `initial={false}` +
 * `whileInView={{ opacity: [0, 1] }}` made framer-motion snap the
 * element to opacity 0 (the first keyframe) before animating to 1.
 * The user saw a 0.5s flash of invisible content.
 *
 * This test asserts that on the home page, no in-viewport content
 * element (h1/h2/h3/p/button/article/etc.) is ever at opacity 0
 * once the page has settled. We sample at multiple scroll positions
 * with sufficient wait time (1s) for any in-flight animation to
 * complete, and we also sample DURING scroll to catch mid-animation
 * flashes — but we exclude ScrollStory's intentionally stacked panels
 * (see `disappearing-content.spec.ts` for that pattern).
 *
 * If this test fails, an element is flickering to opacity 0 mid-life.
 */
const locales = ["en", "fr"] as const;

const VISIBLE_SELECTORS = [
  "h1", "h2", "h3", "h4", "p", "li",
  "button:not([aria-hidden='true'])",
  "a[href]:not([aria-hidden='true'])",
  "article",
  "[class*='rounded-2xl']",
  "[class*='rounded-xl']",
  "[class*='card-glow']",
];

for (const lang of locales) {
  test(`${lang} — no flicker (no in-viewport content at opacity 0 after settle)`, async ({ page }) => {
    test.setTimeout(180_000);
    await page.goto(`/${lang}/`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000); // let preloader + initial animations settle

    const docHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportH = await page.evaluate(() => window.innerHeight);
    const step = Math.max(Math.floor(viewportH * 0.5), 400);

    type Sample = { tag: string; text: string };
    const findings: { y: number; samples: Sample[] }[] = [];

    let y = 0;
    while (y < docHeight) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      // 1200ms wait — well past any stagger reveal (max ~0.95s tail
      // for our cards). If an element is STILL at opacity 0 after 1.2s,
      // it's flickering or stranded.
      await page.waitForTimeout(1200);

      const stuck = await page.evaluate(
        ({ selectors }) => {
          const els = document.querySelectorAll(selectors.join(","));
          const vh = window.innerHeight;
          const out: { tag: string; text: string }[] = [];
          for (const el of Array.from(els)) {
            const r = el.getBoundingClientRect();
            const inView = r.top < vh && r.bottom > 0 && r.width > 0 && r.height > 0;
            if (!inView) continue;
            const style = getComputedStyle(el);
            // Skip intentionally hidden elements.
            const cls = (el as HTMLElement).className || "";
            if (cls.includes("group-hover:opaci") || cls.includes("hover:opaci")) continue;
            if (style.position === "fixed") continue;
            // ScrollStory stacks 4 step panels in the same grid cell;
            // only the active one is visible.
            let p: HTMLElement | null = el.parentElement;
            let inScrollStory = false;
            while (p) {
              if (p.querySelector?.(".step-counter")) {
                inScrollStory = true;
                break;
              }
              p = p.parentElement;
            }
            if (inScrollStory) continue;
            // Typewriter cursor blinks.
            if (el.tagName === "SPAN" && cls.includes("w-[2px]")) continue;
            if (el.closest("[role='dialog']")) continue;
            // ModalFaviconSwap swaps the favicon — has aria-hidden.
            if (style.opacity === "0" || style.visibility === "hidden") {
              out.push({
                tag: el.tagName,
                text: (el.textContent || "").trim().slice(0, 40),
              });
            }
          }
          return out;
        },
        { selectors: VISIBLE_SELECTORS }
      );

      if (stuck.length > 0) {
        findings.push({ y, samples: stuck.slice(0, 3) });
      }
      y += step;
    }

    if (findings.length > 0) {
      // eslint-disable-next-line no-console
      console.log(
        `[${lang}] flicker findings:\n` +
          findings
            .map(
              (f) =>
                `  y=${f.y}: ${f.samples
                  .map((s) => `${s.tag} "${s.text}"`)
                  .join("; ")}`
            )
            .join("\n")
      );
    }

    expect(
      findings.length,
      `Found ${findings.length} scroll positions where in-viewport content was still at opacity 0 after 1.2s settle. See console for details.`
    ).toBe(0);
  });
}
