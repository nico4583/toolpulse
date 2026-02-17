import { expect, test } from "@playwright/test";

const keyRoutes = [
  "/",
  "/tools",
  "/guides",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/tools/loan-payment-calculator",
  "/guides/zero-based-budgeting-guide",
];

for (const path of keyRoutes) {
  test(`SEO tags are present for ${path}`, async ({ page, request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);

    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/.+/);

    const description = page.locator("meta[name='description']");
    await expect(description).toHaveCount(1);
    await expect(description).toHaveAttribute("content", /.+/);

    const canonical = page.locator("link[rel='canonical']");
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute("href", /^https?:\/\/.+/);

    const ogTitle = page.locator("meta[property='og:title']");
    await expect(ogTitle).toHaveCount(1);
    await expect(ogTitle).toHaveAttribute("content", /.+/);

    const ogDescription = page.locator("meta[property='og:description']");
    await expect(ogDescription).toHaveCount(1);
    await expect(ogDescription).toHaveAttribute("content", /.+/);

    const ogUrl = page.locator("meta[property='og:url']");
    await expect(ogUrl).toHaveCount(1);
    await expect(ogUrl).toHaveAttribute("content", /^https?:\/\/.+/);

    const twitterCard = page.locator("meta[name='twitter:card']");
    await expect(twitterCard).toHaveCount(1);
    await expect(twitterCard).toHaveAttribute("content", /summary/);
  });
}
