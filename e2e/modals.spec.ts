import { test, expect } from "@playwright/test";

const locales = ["en", "fr"] as const;

for (const lang of locales) {
  test.describe(`${lang} — modals`, () => {
    test("contact modal opens, is focusable, and closes with Escape", async ({ page }) => {
      await page.goto(`/${lang}/`);
      await page.waitForLoadState("networkidle");

      // Scroll to Trust section where Contact button lives
      const contactBtn = page.locator("button", { hasText: lang === "fr" ? "Contactez-nous" : "Contact Us" }).first();
      await contactBtn.scrollIntoViewIfNeeded();
      await contactBtn.click();

      // Modal should be visible
      const modal = page.locator("[role='dialog']").first();
      await expect(modal).toBeVisible();

      // Focus should be inside modal
      const focused = await page.evaluate(() => document.activeElement?.closest("[role='dialog']"));
      expect(focused).toBeTruthy();

      // Close with Escape
      await page.keyboard.press("Escape");
      await expect(modal).not.toBeVisible();
    });

    test("product modal opens from Recently section", async ({ page }) => {
      await page.goto(`/${lang}/`);
      await page.waitForLoadState("networkidle");

      const askBtn = page.locator("button", { hasText: lang === "fr" ? "Demander" : "Ask About This" }).first();
      await askBtn.scrollIntoViewIfNeeded();
      await askBtn.click();

      const modal = page.locator("[role='dialog']").first();
      await expect(modal).toBeVisible();
    });

    test("saved pieces modal opens from Header heart button", async ({ page }) => {
      await page.goto(`/${lang}/`);
      await page.waitForLoadState("networkidle");

      const heartBtn = page.locator("button[aria-label*='saved' i], button[aria-label*='sauvegard' i]").first();
      await heartBtn.click();

      const modal = page.locator("[role='dialog']").first();
      await expect(modal).toBeVisible();
    });
  });
}
