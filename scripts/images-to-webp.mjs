// Convert every PNG under /public (except logo/) into a WebP sibling.
// Keeps the original PNG so <picture> fallbacks still work and so files
// referenced by hashed asset pipelines aren't broken. Idempotent — rerun
// after dropping new PNGs to generate their WebP versions.

import { readdir, stat } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { join, extname, basename, relative } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):\//, "$1:/");
const PUBLIC_DIR = join(ROOT, "public");
const SKIP_DIRS = new Set(["logo"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      out.push(...(await walk(join(dir, entry.name))));
    } else if (/\.png$/i.test(entry.name)) {
      out.push(join(dir, entry.name));
    }
  }
  return out;
}

async function convert(file) {
  const target = file.replace(/\.png$/i, ".webp");

  // Skip if WebP exists AND is newer than the source PNG.
  if (existsSync(target)) {
    const [src, dst] = [statSync(file), statSync(target)];
    if (dst.mtimeMs >= src.mtimeMs) return { skipped: true };
  }

  const originalBytes = (await stat(file)).size;
  await sharp(file)
    .webp({
      quality: 82,
      effort: 5,
    })
    .toFile(target);
  const newBytes = (await stat(target)).size;
  return { originalBytes, newBytes };
}

async function main() {
  if (!existsSync(PUBLIC_DIR)) {
    console.error(`public/ not found at ${PUBLIC_DIR}`);
    process.exit(1);
  }

  const files = await walk(PUBLIC_DIR);
  if (files.length === 0) {
    console.log("No PNGs found — nothing to do.");
    return;
  }

  let totalOrig = 0;
  let totalNew = 0;
  let converted = 0;
  let skipped = 0;

  for (const file of files) {
    const rel = relative(PUBLIC_DIR, file);
    try {
      const result = await convert(file);
      if (result.skipped) {
        skipped += 1;
        console.log(`SKIP  ${rel}`);
        continue;
      }
      converted += 1;
      totalOrig += result.originalBytes;
      totalNew += result.newBytes;
      const ratio = (100 - (result.newBytes / result.originalBytes) * 100).toFixed(1);
      console.log(
        `OK    ${rel}  ${(result.originalBytes / 1024).toFixed(0)}KB → ${(result.newBytes / 1024).toFixed(0)}KB  (-${ratio}%)`
      );
    } catch (err) {
      console.error(`FAIL  ${rel}: ${err.message}`);
    }
  }

  console.log("");
  console.log(`Converted: ${converted}   Skipped: ${skipped}   Total: ${files.length}`);
  if (converted > 0) {
    const savedPct = (100 - (totalNew / totalOrig) * 100).toFixed(1);
    console.log(
      `Bytes:     ${(totalOrig / 1024 / 1024).toFixed(2)}MB → ${(totalNew / 1024 / 1024).toFixed(2)}MB  (-${savedPct}%)`
    );
  }
  // Reminder: filename of basename-only path is for log readability.
  void basename;
  void extname;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
