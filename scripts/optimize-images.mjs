// scripts/optimize-images.mjs
import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import sharp from "sharp";

const SRC_DIR = "assets";
const OUT_DIR = path.join(SRC_DIR, "optimized");
const SIZES = [480, 768, 1100, 1600];
const INPUT_GLOBS = [
  // add any additional file names you want optimized
  `${SRC_DIR}/2Xmtvd8K7E3.png`,
  `${SRC_DIR}/3ded1833cd2.png`,
  `${SRC_DIR}/ce0bb398eedbee8c.png`,
  `${SRC_DIR}/K3eAeAilxla.png`,
  `${SRC_DIR}/MPCd7luufE6.png`,
  `${SRC_DIR}/TmTDhO4oIdU.png`,
  `${SRC_DIR}/Phone_Filler.png`
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const files = await fg(INPUT_GLOBS, { onlyFiles: true, unique: true });

for (const file of files) {
  const base = path.basename(file).replace(path.extname(file), "");
  const input = sharp(file, { failOn: "none" });

  const meta = await input.metadata().catch(() => ({}));
  const isPortrait = (meta.width || 0) < (meta.height || 0);

  // For tall phone screenshots, clamp to sensible heights
  for (const w of SIZES) {
    const pipeline = sharp(file).resize({
      width: w,
      withoutEnlargement: true
    });

    // WebP (quality tuned for photos/UI blends)
    const outWebp = path.join(OUT_DIR, `${base}-${w}.webp`);
    await pipeline.webp({ quality: 78, effort: 4 }).toFile(outWebp);

    // You can also output AVIF if desired:
    // const outAvif = path.join(OUT_DIR, `${base}-${w}.avif`);
    // await pipeline.avif({ quality: 50, effort: 4 }).toFile(outAvif);
  }

  // Optional: a tiny placeholder (blur-up) if you want later
  // const lqip = path.join(OUT_DIR, `${base}-tiny.webp`);
  // await sharp(file).resize({ width: isPortrait ? 32 : 48 }).webp({ quality: 40 }).toFile(lqip);

  console.log(`✓ Optimized: ${base}`);
}

console.log(`Done. Files in: ${OUT_DIR}`);
