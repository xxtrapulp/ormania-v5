import { test, expect } from "@playwright/test";

/**
 * Regression test for the "content disappears under the section header"
 * bug. Specifically targets the tools section header "All tools are free
 * to use" (fr) "Tous les outils sont gratuits" — when the user scrolls
 * past the section quickly, the 10 tool cards used to stay at opacity 0
 * even though their section header was clearly visible. Root cause was
 * the dual-observer pattern (`useScrollReveal` + framer-motion
 * `whileInView`) with `initial={{ opacity: 0 }}`. Either observer could
 * miss on a fast scroll, stranding the cards at the hidden state.
 */
const locales = ["en", "fr"] as const;

for (const lang of locales) {
  test(`${lang} — tool cards stay visible after scroll-past`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto(`/${lang}/`);
    await page.waitForLoadState("networkidle");
    // Let the preloader finish.
    await page.waitForTimeout(1500);

    // Scroll the page top→bottom in 300px steps, like a fast-scrolling user.
    const docHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < docHeight; y += 300) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(60);
    }
    // Now scroll back up to put the tools section in view.
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll("section")).find((s) => {
        const t = s.textContent || "";
        return t.includes("All tools are free to use") || t.includes("Tous les outils sont gratuits");
      });
      section?.scrollIntoView({ block: "center" });
    });
    await page.waitForTimeout(2000);

    // Each tool card has an h3 inside a GlassCard. Walk up the ancestor
    // chain looking for any element stuck at opacity 0.
    const cardData = await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll("section")).find((s) => {
        const t = s.textContent || "";
        return t.includes("All tools are free to use") || t.includes("Tous les outils sont gratuits");
      });
      if (!section) return { error: "section not found" };
      const headings = section.querySelectorAll("h3");
      return Array.from(headings).map((h) => {
        const box = h.getBoundingClientRect();
        const opacity = window.getComputedStyle(h).opacity;
        let p: HTMLElement | null = h;
        let parentOpacity = "1";
        while (p) {
          if (window.getComputedStyle(p).opacity !== "1") {
            parentOpacity = window.getComputedStyle(p).opacity;
            break;
          }
          p = p.parentElement;
        }
        return {
          text: h.textContent?.trim() || "",
          top: box.top,
          bottom: box.bottom,
          inView: box.top < window.innerHeight && box.bottom > 0,
          opacity,
          parentOpacity,
        };
      });
    });

    expect(Array.isArray(cardData), "card data should be an array").toBe(true);
    const arr = cardData as Array<{ inView: boolean; opacity: string; parentOpacity: string; text: string }>;
    expect(arr.length, `expected 10 tool cards, got ${arr.length}`).toBe(10);

    const stuck = arr.filter(
      (c) => c.inView && (c.opacity === "0" || c.parentOpacity === "0")
    );
    if (stuck.length > 0) {
      console.log("STUCK CARDS:", JSON.stringify(stuck, null, 2));
    }
    expect(stuck.length, `expected 0 stuck tool cards, got ${stuck.length}`).toBe(0);
  });
}
