# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sections.spec.ts >> en — section visibility >> scroll-reveal elements animate in
- Location: e2e/sections.spec.ts:54:9

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    24
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | const locales = ["en", "fr"] as const;
  4  | 
  5  | for (const lang of locales) {
  6  |   test.describe(`${lang} — section visibility`, () => {
  7  |     test("home page sections are visible after scroll", async ({ page }) => {
  8  |       await page.goto(`/${lang}/`);
  9  |       await page.waitForLoadState("networkidle");
  10 | 
  11 |       // Check hero content is visible
  12 |       await expect(page.locator("h1").first()).toBeVisible();
  13 | 
  14 |       // Scroll through the page and verify key sections appear
  15 |       const viewportHeight = await page.evaluate(() => window.innerHeight);
  16 |       const documentHeight = await page.evaluate(() => document.body.scrollHeight);
  17 | 
  18 |       let scrollY = 0;
  19 |       while (scrollY < documentHeight - viewportHeight) {
  20 |         scrollY += viewportHeight * 0.8;
  21 |         await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  22 |         await page.waitForTimeout(300);
  23 | 
  24 |         // Assert no section has stuck opacity: 0 on key text elements
  25 |         const hiddenElements = await page.evaluate(() => {
  26 |           const selectors = [
  27 |             ".font-serif",
  28 |             ".text-ivory",
  29 |             "[class*='text-gold']",
  30 |             "[class*='bg-gold']",
  31 |           ];
  32 |           const all = selectors.flatMap((s) =>
  33 |             Array.from(document.querySelectorAll(s))
  34 |           );
  35 |           const inViewport = all.filter((el) => {
  36 |             const rect = el.getBoundingClientRect();
  37 |             return rect.top < window.innerHeight && rect.bottom > 0;
  38 |           });
  39 |           const stuckHidden = inViewport.filter((el) => {
  40 |             const style = window.getComputedStyle(el);
  41 |             return style.opacity === "0" && !el.closest("[role='dialog']");
  42 |           });
  43 |           return stuckHidden.map((el) => ({
  44 |             tag: el.tagName,
  45 |             text: (el.textContent || "").slice(0, 50),
  46 |             class: el.className.slice(0, 80),
  47 |           }));
  48 |         });
  49 | 
  50 |         expect(hiddenElements).toHaveLength(0);
  51 |       }
  52 |     });
  53 | 
  54 |     test("scroll-reveal elements animate in", async ({ page }) => {
  55 |       await page.goto(`/${lang}/`);
  56 |       await page.waitForLoadState("networkidle");
  57 | 
  58 |       // Scroll to mid-page and check that animated elements have opacity > 0
  59 |       await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  60 |       await page.waitForTimeout(500);
  61 | 
  62 |       const stuck = await page.evaluate(() => {
  63 |         const els = document.querySelectorAll("[style*='opacity: 0']");
  64 |         const visible = Array.from(els).filter((el) => {
  65 |           const rect = el.getBoundingClientRect();
  66 |           return rect.top < window.innerHeight && rect.bottom > 0;
  67 |         });
  68 |         return visible.map((el) => el.tagName);
  69 |       });
  70 | 
> 71 |       expect(stuck.length).toBeLessThanOrEqual(2); // allow a couple of intentionally hidden elements
     |                            ^ Error: expect(received).toBeLessThanOrEqual(expected)
  72 |     });
  73 | 
  74 |     test("pitch page sections render", async ({ page }) => {
  75 |       await page.goto(`/${lang}/pitch`);
  76 |       await page.waitForLoadState("networkidle");
  77 | 
  78 |       await expect(page.locator("h1")).toBeVisible();
  79 |       await expect(page.locator("text=15+").first()).toBeVisible();
  80 |       await expect(page.locator("text=Custom Jewelry")).toBeVisible();
  81 |     });
  82 |   });
  83 | }
  84 | 
```