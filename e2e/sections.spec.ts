import { test, expect } from "@playwright/test";

const locales = ["en", "fr"] as const;

for (const lang of locales) {
  test.describe(`${lang} — section visibility`, () => {
    test("home page sections are visible after scroll", async ({ page }) => {
      test.setTimeout(120_000);

      await page.goto(`/${lang}/`);
      await page.waitForLoadState("networkidle");

      // Check hero content is visible
      await expect(page.locator("h1").first()).toBeVisible();

      // Scroll through the page and verify key sections appear
      const viewportHeight = await page.evaluate(() => window.innerHeight);
      const documentHeight = await page.evaluate(() => document.body.scrollHeight);

      let scrollY = 0;
      while (scrollY < documentHeight - viewportHeight) {
        scrollY += viewportHeight * 0.8;
        await page.evaluate((y) => window.scrollTo(0, y), scrollY);
        // Stagger reveal tail is ~0.95s per section; wait long enough
        // for the chunk that just entered the viewport to finish.
        await page.waitForTimeout(1000);

        // Assert no section has stuck opacity: 0 on key text elements
        const hiddenElements = await page.evaluate(() => {
          const selectors = [
            ".font-serif",
            ".text-ivory",
            "[class*='text-gold']",
            "[class*='bg-gold']",
          ];
          const all = selectors.flatMap((s) =>
            Array.from(document.querySelectorAll(s))
          );
          const inViewport = all.filter((el) => {
            const rect = el.getBoundingClientRect();
            // className is an SVGAnimatedString on SVG elements; coerce
            // to a plain string for substring checks.
            const cls =
              typeof el.className === "string"
                ? el.className
                : String((el.className as SVGAnimatedString | undefined)?.baseVal ?? "");
            // Is this element part of the scroll-story step stack
            // (which deliberately keeps every panel in the DOM with
            // opacity 0 except the active one)? Detected by walking
            // up the parent chain for a sibling with .step-counter.
            let p = el.parentElement;
            let inScrollStory = false;
            while (p) {
              if (p.querySelector?.(".step-counter")) {
                inScrollStory = true;
                break;
              }
              p = p.parentElement;
            }
            return (
              rect.top < window.innerHeight &&
              rect.bottom > 0 &&
              getComputedStyle(el).position !== "fixed" && // ignore back-to-top, modal, etc.
              !el.closest("[role='dialog']") &&
              // Ignore the typewriter cursor span — it intentionally
              // blinks between opacity 0 and 1, so a single mid-blink
              // frame is correct behavior, not a stuck element.
              !(el.tagName === "SPAN" && cls.includes("w-[2px]")) &&
              // Ignore elements that are hidden until their parent is
              // hovered (e.g. "Explore→" CTAs in product/IG cards).
              !cls.includes("group-hover:opaci") &&
              // Ignore scroll-story panels — only the active step
              // shows; siblings sit at opacity 0 by design.
              !inScrollStory
            );
          });
          const stuckHidden = inViewport.filter((el) => {
            const style = window.getComputedStyle(el);
            return style.opacity === "0";
          });
          return stuckHidden.map((el) => ({
            tag: el.tagName,
            text: (el.textContent || "").slice(0, 50),
            class: el.className.slice(0, 80),
          }));
        });

        expect(hiddenElements).toHaveLength(0);
      }
    });

    test("scroll-reveal elements animate in", async ({ page }) => {
      // This test walks down the page so every section enters the
      // viewport long enough for its stagger reveal to finish. On a
      // tall home page that takes a while; budget accordingly.
      test.setTimeout(120_000);

      await page.goto(`/${lang}/`);
      await page.waitForLoadState("networkidle");

      // Coarse steps: jump to a handful of positions so every section
      // has been in the viewport for ≥ 1s by the time we assert. Step
      // is one viewport tall so we cover the whole page in 5-7 jumps.
      const viewportHeight = await page.evaluate(() => window.innerHeight);
      const documentHeight = await page.evaluate(() => document.body.scrollHeight);
      const positions: number[] = [];
      for (let y = 0; y < documentHeight; y += viewportHeight) positions.push(y);
      for (const y of positions) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(800);
      }
      // Final settle at mid-page for the assertion.
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(1000);

      const stuck = await page.evaluate(() => {
        const els = document.querySelectorAll("[style*='opacity: 0']");
        const visible = Array.from(els).filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });
        return visible.map((el) => el.tagName);
      });

      // With the scroll-walk + 1s settle above, every section that has
      // been in view for ≥ 1s has finished its stagger (≤ 0.95s tail).
      // Allow up to 5 stragglers for sections that are mid-transition
      // as the viewport creeps past.
      expect(stuck.length).toBeLessThanOrEqual(5);
    });

    test("pitch page sections render", async ({ page }) => {
      await page.goto(`/${lang}/pitch`);
      await page.waitForLoadState("networkidle");

      await expect(page.locator("h1")).toBeVisible();
      // Pitch page has rich content blocks; assert that the lang-
      // specific copy is present (FR: "Bijoux sur mesure" / EN has the
      // same service title).
      const pitch = lang === "fr" ? "Bijoux sur mesure" : "Custom Jewelry";
      await expect(page.locator(`text=${pitch}`).first()).toBeVisible();
    });
  });
}
