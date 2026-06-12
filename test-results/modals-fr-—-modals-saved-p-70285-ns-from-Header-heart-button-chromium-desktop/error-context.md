# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: modals.spec.ts >> fr — modals >> saved pieces modal opens from Header heart button
- Location: e2e/modals.spec.ts:41:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button[aria-label*=\'saved\' i], button[aria-label*=\'sauvegard\' i]').first()

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | const locales = ["en", "fr"] as const;
  4  | 
  5  | for (const lang of locales) {
  6  |   test.describe(`${lang} — modals`, () => {
  7  |     test("contact modal opens, is focusable, and closes with Escape", async ({ page }) => {
  8  |       await page.goto(`/${lang}/`);
  9  |       await page.waitForLoadState("networkidle");
  10 | 
  11 |       // Scroll to Trust section where Contact button lives
  12 |       const contactBtn = page.locator("button", { hasText: lang === "fr" ? "Contactez-nous" : "Contact Us" }).first();
  13 |       await contactBtn.scrollIntoViewIfNeeded();
  14 |       await contactBtn.click();
  15 | 
  16 |       // Modal should be visible
  17 |       const modal = page.locator("[role='dialog']").first();
  18 |       await expect(modal).toBeVisible();
  19 | 
  20 |       // Focus should be inside modal
  21 |       const focused = await page.evaluate(() => document.activeElement?.closest("[role='dialog']"));
  22 |       expect(focused).toBeTruthy();
  23 | 
  24 |       // Close with Escape
  25 |       await page.keyboard.press("Escape");
  26 |       await expect(modal).not.toBeVisible();
  27 |     });
  28 | 
  29 |     test("product modal opens from Recently section", async ({ page }) => {
  30 |       await page.goto(`/${lang}/`);
  31 |       await page.waitForLoadState("networkidle");
  32 | 
  33 |       const askBtn = page.locator("button", { hasText: lang === "fr" ? "Demander" : "Ask About This" }).first();
  34 |       await askBtn.scrollIntoViewIfNeeded();
  35 |       await askBtn.click();
  36 | 
  37 |       const modal = page.locator("[role='dialog']").first();
  38 |       await expect(modal).toBeVisible();
  39 |     });
  40 | 
  41 |     test("saved pieces modal opens from Header heart button", async ({ page }) => {
  42 |       await page.goto(`/${lang}/`);
  43 |       await page.waitForLoadState("networkidle");
  44 | 
  45 |       const heartBtn = page.locator("button[aria-label*='saved' i], button[aria-label*='sauvegard' i]").first();
> 46 |       await heartBtn.click();
     |                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  47 | 
  48 |       const modal = page.locator("[role='dialog']").first();
  49 |       await expect(modal).toBeVisible();
  50 |     });
  51 |   });
  52 | }
  53 | 
```