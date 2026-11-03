/**
 * 极简静态服务器：给快照流程伺服 Next 静态导出目录 out/。
 * node scripts/static-server.mjs [port] [dir]
 * 路径解析顺序：原样文件 → <path>.html → <path>/index.html（与静态托管一致）。
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const port = Number(process.argv[2] ?? 4173);
const root = path.resolve(process.argv[3] ?? "out");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const candidates = clean === "/"
    ? ["index.html"]
    : [clean.slice(1), clean.slice(1) + ".html", clean.slice(1) + "/index.html"];
  for (const c of candidates) {
    const file = path.join(root, c);
    try {
      if ((await stat(file)).isFile()) return file;
    } catch { /* try next */ }
  }
  return null;
}

createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");
  if (!file) {
    res.writeHead(404).end("not found");
    return;
  }
  const body = await readFile(file);
  res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
  res.end(body);
}).listen(port, "127.0.0.1", () => console.log(`serving ${root} at http://127.0.0.1:${port}`));
