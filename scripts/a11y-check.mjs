#!/usr/bin/env node
// Accessibility gate: axe-core (WCAG 2.2 AA) on each URL, in light and dark mode, at phone and desktop width.
// Uses Playwright's bundled Chromium, so there is no ChromeDriver/Chrome version mismatch.
// Usage: node scripts/a11y-check.mjs http://localhost:8090/Rawak/ http://localhost:8090/Rawak/projects/ ...
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const { AxeBuilder } = require("@axe-core/playwright");

const urls = process.argv.slice(2);
if (!urls.length) { console.error("Pass at least one URL."); process.exit(2); }
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const browser = await chromium.launch();
let failures = 0;
for (const colorScheme of ["light", "dark"]) {
  for (const width of [360, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 800 }, colorScheme });
    const page = await context.newPage();
    for (const url of urls) {
      const res = await page.goto(url, { waitUntil: "load" });
      if (!res || !res.ok()) { console.log(`FAIL ${url}: HTTP ${res && res.status()}`); failures++; continue; }
      const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      if (overflow) { console.log(`FAIL ${url} [${colorScheme} ${width}px]: horizontal scroll`); failures++; }
      for (const v of violations) {
        failures++;
        console.log(`FAIL ${url} [${colorScheme} ${width}px] ${v.id} (${v.impact}): ${v.help}`);
        for (const n of v.nodes.slice(0, 3)) console.log(`     ${n.target.join(" ")}`);
      }
    }
    await context.close();
  }
}
await browser.close();
console.log(failures ? `${failures} problem(s) found.` : `OK: ${urls.length} page(s), 0 violations, no horizontal scroll (light/dark, 360/1280px).`);
process.exit(failures ? 1 : 0);
