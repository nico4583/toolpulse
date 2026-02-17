import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const sampleRoutes = ["/", "/tools", "/guides", "/about", "/contact"];

for (const path of sampleRoutes) {
  test(`Accessibility scan has no critical/serious violations for ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).analyze();
    const seriousOrCritical = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    );
    expect(seriousOrCritical).toEqual([]);
  });
}
