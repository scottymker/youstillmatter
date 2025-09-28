// Optimizes all PNG/JPGs in /assets into /assets/optimized as WebP at 4 widths.
import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import sharp from "sharp";

const SRC_DIR = "assets";
const OUT_DIR = path.join(SRC_DIR, "optimized");
const SIZES = [480, 768, 1100, 1600];

// Find images (add/edit patterns if your images live deeper)
const files = await fg([
  `${SRC_DIR}/*.png`,
  `${SRC_DIR}/*.jpg`,
  `${SRC_DIR}/*.jpeg`
], { onlyFiles: true, unique: true });

if (!files.length) {
  console.log("No images found in /assets. Put PNG/JPG files there and re-run.");
  process.exit(0);
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

for (const file of files) {
  const base = path.basename(file).replace(path.extname(file), "");
  const img = sharp(file);
  const meta = await img.metadata().catch(() => ({}));

  for (const w of SIZES) {
    const out = path.join(OUT_DIR, `${base}-${w}.webp`);
    await sharp(file)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(out);
  }

  console.log(`✓ Optimized: ${base}  (source: ${meta.width}x${meta.height})`);
}

console.log(`\nDone. Output in: ${OUT_DIR}\n`);
