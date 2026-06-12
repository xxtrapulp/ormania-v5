# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sections.spec.ts >> fr — section visibility >> pitch page sections render
- Location: e2e/sections.spec.ts:74:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Custom Jewelry')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Custom Jewelry')

```

```yaml
- link "Aller au contenu":
  - /url: "#main"
- banner:
  - link "Ormania home":
    - /url: /fr/
    - img "Ormania"
  - navigation "Main":
    - link "Accueil":
      - /url: /fr/
    - link "Collections":
      - /url: /fr/collections/
    - link "Instagram":
      - /url: /fr/instagram/
    - link "Sur mesure":
      - /url: /fr/custom/
    - link "Réparations":
      - /url: /fr/repairs/
    - link "Fiançailles":
      - /url: /fr/engagement/
    - link "Visite":
      - /url: /fr/visit/
  - link "Switch to English":
    - /url: /en/pitch/
    - text: EN / FR
  - button "Pièces sauvegardées"
  - button "Comparer"
  - link "Prendre rendez-vous":
    - /url: /fr/engagement/#book
- main:
  - text: Présentation
  - heading "Bijouterie Ormania" [level=1]
  - paragraph: Une boutique familiale au cœur de Laval où chaque bijou raconte une histoire. De la création sur mesure à la réparation experte, nous transformons vos moments importants en souvenirs éternels.
  - button "Contactez-nous"
  - link "(514) 737-7216":
    - /url: tel:+15147377216
  - paragraph: 15+
  - paragraph: Ans à Laval
  - paragraph: 10K+
  - paragraph: Pièces vendues
  - paragraph: 500+
  - paragraph: Designs sur mesure
  - paragraph: 98%
  - paragraph: Satisfaction client
  - text: Ce que nous offrons
  - heading "Services complets" [level=2]
  - heading "Bijoux sur mesure" [level=3]
  - paragraph: Bagues de fiançailles, alliances et pièces uniques conçues avec vous.
  - heading "Réparations expertes" [level=3]
  - paragraph: Du redimensionnement à la restauration, nous redonnons vie à vos bijoux.
  - heading "Service personnalisé" [level=3]
  - paragraph: Consultations privées dans un cadre de boutique chaleureux.
  - heading "Qualité certifiée" [level=3]
  - paragraph: Diamants certifiés GIA, options de laboratoire et métaux sourcés éthiquement.
  - text: Notre histoire
  - heading "Une famille, une passion, une boutique." [level=2]
  - paragraph: Fondée il y a plus de 15 ans, Bijouterie Ormania est née d'une passion pour les bijoux qui racontent une histoire. Située au cœur de Laval, notre boutique est devenue un lieu de confiance pour des milliers de clients qui cherchent des pièces uniques et un service personnalisé.
  - paragraph: De la première bague de fiançailles à la restauration d'un héritage familial, chaque projet est traité avec le même soin et la même attention aux détails.
  - text: Boutique photo placeholder Contact
  - heading "Prêt à créer quelque chose d'unique ?" [level=2]
  - link "(514) 737-7216":
    - /url: tel:+15147377216
  - link "info@ormania.ca":
    - /url: mailto:info@ormania.ca
  - text: Laval, QC
  - button "Prendre rendez-vous"
  - button "Envoyer un message"
- contentinfo:
  - navigation "Footer navigation":
    - link "Collections":
      - /url: /fr/collections/
    - link "Instagram":
      - /url: /fr/instagram/
    - link "Fiançailles":
      - /url: /fr/engagement/
    - link "Outils":
      - /url: /fr/explore/
    - link "Sur mesure":
      - /url: /fr/custom/
    - link "Réparations":
      - /url: /fr/repairs/
    - link "Visite":
      - /url: /fr/visit/
    - link "Présentation":
      - /url: /fr/pitch/
  - img "Ormania"
  - paragraph: Des bijoux faits pour être mémorables.
  - link "Instagram":
    - /url: https://www.instagram.com/bijouterie_ormania
  - link "Phone":
    - /url: tel:+14506292959
    - text: (450) 629-2959
  - text: © 2026 Bijouterie Ormania. Tous droits réservés.
  - link "Confidentialité":
    - /url: /fr/privacy/
  - link "Conditions":
    - /url: /fr/terms/
  - link "Personnel":
    - /url: /fr/admin/
- alert
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
  71 |       expect(stuck.length).toBeLessThanOrEqual(2); // allow a couple of intentionally hidden elements
  72 |     });
  73 | 
  74 |     test("pitch page sections render", async ({ page }) => {
  75 |       await page.goto(`/${lang}/pitch`);
  76 |       await page.waitForLoadState("networkidle");
  77 | 
  78 |       await expect(page.locator("h1")).toBeVisible();
  79 |       await expect(page.locator("text=15+").first()).toBeVisible();
> 80 |       await expect(page.locator("text=Custom Jewelry")).toBeVisible();
     |                                                         ^ Error: expect(locator).toBeVisible() failed
  81 |     });
  82 |   });
  83 | }
  84 | 
```