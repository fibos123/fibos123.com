/**
 * 主要页面视觉快照：node scripts/snapshot.mjs <输出目录>
 * 环境变量 BASE_URL（默认 http://127.0.0.1:4173）。
 *
 * 确定性措施（两次快照之间只允许依赖版本变化，其他变量全部冻结）：
 * - 固定视口/语言/时区；禁用动画与过渡；隐藏滚动条
 * - 拦截一切外部网络请求（本站是静态导出，但 /monitor、/producer 会在
 *   客户端实时拉取链上数据，不断变化的数据会让像素对比永远报警，
 *   因此只允许与 BASE_URL 同源的请求，其余一律中止，两轮渲染条件一致）
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// 要快照的主要页面（增减页面改这里即可）
const PAGES = ["/", "/about", "/producer", "/monitor"];

const base = process.env.BASE_URL ?? "http://127.0.0.1:4173";
const outDir = process.argv[2];
if (!outDir) {
  console.error("usage: node scripts/snapshot.mjs <output-dir>");
  process.exit(2);
}
await mkdir(outDir, { recursive: true });

const slug = (p) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "-"));

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  locale: "zh-CN",
  timezoneId: "Asia/Tokyo",
});
await context.route("**/*", (route) => {
  const url = route.request().url();
  if (url.startsWith(base) || url.startsWith("data:") || url.startsWith("blob:")) {
    return route.continue();
  }
  return route.abort();
});
await context.addInitScript(() => {
  const style = document.createElement("style");
  style.textContent =
    "*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important}html{scrollbar-width:none}::-webkit-scrollbar{display:none}";
  document.documentElement.appendChild(style);
});

for (const p of PAGES) {
  const page = await context.newPage();
  await page.goto(base + p, { waitUntil: "load", timeout: 60_000 });
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
  await page.waitForTimeout(800); // 等待渲染稳定
  const file = path.join(outDir, slug(p) + ".png");
  await page.screenshot({ path: file, fullPage: true });
  console.log("snapshot:", p, "->", file);
  await page.close();
}
await browser.close();
