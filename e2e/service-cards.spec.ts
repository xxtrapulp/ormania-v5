import { test, expect } from "@playwright/test";

/**
 * Smoke test for the 4 interactive service cards (Track E+).
 * Asserts each card renders, the interactive moment is present,
 * and the "learn more" link routes to the right page.
 */

const locales = ["en", "fr"] as const;

const EXPECTED_CARDS = {
  en: [
    { title: /Custom Design/, href: /\/en\/custom/ },
    { title: /Jewelry Restoration/, href: /\/en\/repairs/ },
    { title: /Engagement Guidance/, href: /\/en\/engagement/ },
    { title: /Gift Curation/, href: /\/en\/explore/ },
  ],
  fr: [
    { title: /Design sur mesure/, href: /\/fr\/custom/ },
    { title: /Restauration de bijoux/, href: /\/fr\/repairs/ },
    { title: /Conseil pour fiançailles/, href: /\/fr\/engagement/ },
    { title: /Curation de cadeaux/, href: /\/fr\/explore/ },
  ],
} as const;

for (const lang of locales) {
  test.describe(`${lang} — interactive service cards`, () => {
    test("all 4 service cards render with the correct learn-more href", async ({ page }) => {
      test.setTimeout(90_000);
      await page.goto(`/${lang}/`);
      await page.waitForLoadState("networkidle");

      // Scroll the services section into view so motion animations run.
      await page.evaluate((l) => {
        const headings = Array.from(document.querySelectorAll("h2"));
        const target = headings.find((h) =>
          /Our craft|Notre savoir-faire/.test(h.textContent || "")
        );
        target?.scrollIntoView({ behavior: "instant", block: "start" });
      }, lang);
      await page.waitForTimeout(1500);

      for (const expected of EXPECTED_CARDS[lang]) {
        // Each card title lives in an h3 inside the card article.
        const title = page.locator("h3", { hasText: expected.title }).first();
        await expect(title, `title ${expected.title}`).toBeVisible();
        // The "Learn more" / "En savoir plus" link inside the same card.
        const card = title.locator("xpath=ancestor::article[1]");
        const learnMore = card.locator('a:has-text("Learn more"), a:has-text("En savoir plus")').first();
        await expect(learnMore, `learn-more for ${expected.title}`).toBeVisible();
        const href = await learnMore.getAttribute("href");
        expect(href, `href for ${expected.title}`).toMatch(expected.href);
      }
    });

    test("engagement card ring updates when stone/setting/metal are picked", async ({ page }) => {
      test.setTimeout(90_000);
      await page.goto(`/${lang}/`);
      await page.waitForLoadState("networkidle");
      await page.evaluate((l) => {
        const headings = Array.from(document.querySelectorAll("h2"));
        const target = headings.find((h) =>
          /Our craft|Notre savoir-faire/.test(h.textContent || "")
        );
        target?.scrollIntoView({ behavior: "instant", block: "start" });
      }, lang);
      await page.waitForTimeout(1500);

      const isEn = lang === "en";
      // Pick a stone (the one that exists for either language).
      const stonePill = page
        .locator("button[aria-pressed]", {
          hasText: isEn ? /Natural diamond|Lab-grown diamond|Sapphire|Emerald/ : /Diamant naturel|Diamant de laboratoire|Saphir|Émeraude/,
        })
        .first();
      await stonePill.click();
      const settingPill = page
        .locator("button[aria-pressed]", {
          hasText: isEn ? /Solitaire|Halo|Pavé|Bezel/ : /Solitaire|Halo|Pavé|Sertissure/,
        })
        .first();
      await settingPill.click();
      const metalPill = page
        .locator("button[aria-pressed]", {
          hasText: isEn ? /Platinum|White gold|Yellow gold|Rose gold/ : /Platine|Or blanc|Or jaune|Or rose/,
        })
        .first();
      await metalPill.click();
      await page.waitForTimeout(400);

      // After all three picks, the "See similar" link should appear
      // and include the three params.
      const seeSimilar = page.locator(
        isEn
          ? 'a:has-text("See similar in our showroom")'
          : 'a:has-text("Voir des pièces similaires")'
      );
      await expect(seeSimilar).toBeVisible();
      const href = await seeSimilar.getAttribute("href");
      expect(href).toMatch(/stone=/);
      expect(href).toMatch(/setting=/);
      expect(href).toMatch(/metal=/);
    });

    test("gift curation card shows suggestion + link after a pick", async ({ page }) => {
      test.setTimeout(90_000);
      await page.goto(`/${lang}/`);
      await page.waitForLoadState("networkidle");
      await page.evaluate((l) => {
        const headings = Array.from(document.querySelectorAll("h2"));
        const target = headings.find((h) =>
          /Our craft|Notre savoir-faire/.test(h.textContent || "")
        );
        target?.scrollIntoView({ behavior: "instant", block: "start" });
      }, lang);
      await page.waitForTimeout(1500);

      const isEn = lang === "en";
      // The gift card has the "Who is it for?" prompt and 3 pills.
      // Pick the middle one ("Parent") to avoid first/last edge cases.
      const giftCard = page
        .locator("article", { hasText: isEn ? /Who is it for\?/ : /Pour qui est-ce/ })
        .first();
      await expect(giftCard).toBeVisible();
      // Click "Parent" (FR: "Parent" too).
      const parentPill = giftCard.locator('button[aria-pressed]', { hasText: /^Parent$/ });
      await parentPill.click();
      await page.waitForTimeout(300);
      const seeLink = giftCard.locator(
        isEn ? 'a:has-text("See suggestions")' : 'a:has-text("Voir les suggestions")'
      );
      await expect(seeLink).toBeVisible();
      const href = await seeLink.getAttribute("href");
      expect(href).toMatch(/\/explore/);
      expect(href).toMatch(/for=parent/);
    });
  });
}
