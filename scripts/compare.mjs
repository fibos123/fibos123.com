/**
 * 对比两组快照：node scripts/compare.mjs <beforeDir> <afterDir> <diffDir>
 * 退出码：0 = 全部页面差异在阈值内（视为无差别）；1 = 有页面超阈值。
 * 阈值：不同像素占比 ≤ DIFF_THRESHOLD（默认 0.001 = 0.1%，吸收抗锯齿级噪声）。
 * 超阈值页面的 diff 图写到 diffDir（红标差异处），供工作流上传留档。
 */
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const [beforeDir, afterDir, diffDir] = process.argv.slice(2);
if (!beforeDir || !afterDir || !diffDir) {
  console.error("usage: node scripts/compare.mjs <beforeDir> <afterDir> <diffDir>");
  process.exit(2);
}
const threshold = Number(process.env.DIFF_THRESHOLD ?? "0.001");
await mkdir(diffDir, { recursive: true });

const pages = ["home", "about", "producer", "monitor"];
let worst = 0;
let failed = false;

for (const name of pages) {
  const a = PNG.sync.read(await readFile(path.join(beforeDir, name + ".png")));
  const b = PNG.sync.read(await readFile(path.join(afterDir, name + ".png")));
  if (a.width !== b.width || a.height !== b.height) {
    console.log(`${name}: SIZE CHANGED ${a.width}x${a.height} -> ${b.width}x${b.height}`);
    failed = true;
    continue;
  }
  const diff = new PNG({ width: a.width, height: a.height });
  const changed = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
    threshold: 0.1, // 单像素颜色容差
    includeAA: false,
  });
  const ratio = changed / (a.width * a.height);
  worst = Math.max(worst, ratio);
  console.log(`${name}: diff ratio ${(ratio * 100).toFixed(4)}% (${changed} px)`);
  if (ratio > threshold) {
    failed = true;
    await writeFile(path.join(diffDir, name + "-diff.png"), PNG.sync.write(diff));
  }
}

console.log(`worst ratio ${(worst * 100).toFixed(4)}%, threshold ${(threshold * 100).toFixed(2)}%`);
if (failed) {
  console.log("RESULT: CHANGED");
  process.exit(1);
}
console.log("RESULT: SAME");
