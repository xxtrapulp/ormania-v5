import { test, expect } from "@playwright/test";

const locales = ["en", "fr"] as const;

for (const lang of locales) {
  test.describe(`${lang} — section visibility`, () => {
    test("home page sections are visible after scroll", async ({ page }) => {
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
        await page.waitForTimeout(300);

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
            return rect.top < window.innerHeight && rect.bottom > 0;
          });
          const stuckHidden = inViewport.filter((el) => {
            const style = window.getComputedStyle(el);
            return style.opacity === "0" && !el.closest("[role='dialog']");
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
      await page.goto(`/${lang}/`);
      await page.waitForLoadState("networkidle");

      // Scroll to mid-page and check that animated elements have opacity > 0
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);

      const stuck = await page.evaluate(() => {
        const els = document.querySelectorAll("[style*='opacity: 0']");
        const visible = Array.from(els).filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });
        return visible.map((el) => el.tagName);
      });

      expect(stuck.length).toBeLessThanOrEqual(2); // allow a couple of intentionally hidden elements
    });

    test("pitch page sections render", async ({ page }) => {
      await page.goto(`/${lang}/pitch`);
      await page.waitForLoadState("networkidle");

      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("text=15+").first()).toBeVisible();
      await expect(page.locator("text=Custom Jewelry")).toBeVisible();
    });
  });
}
