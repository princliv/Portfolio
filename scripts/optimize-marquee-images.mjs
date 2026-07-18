import sharp from 'sharp';
import { readdir, unlink, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MARQUEE_DIR = path.resolve(__dirname, '../public/assets/about-marquee');
const MAX_WIDTH = 400; // 2x retina for the 200px card width used by TechMarquee/ProjectsSection

async function run() {
  const files = await readdir(MARQUEE_DIR);
  const sourceFiles = files.filter((f) => /\.(png|jpe?g)$/i.test(f));

  for (const file of sourceFiles) {
    const srcPath = path.join(MARQUEE_DIR, file);
    const outName = file.replace(/\.(png|jpe?g)$/i, '.webp');
    const outPath = path.join(MARQUEE_DIR, outName);

    await sharp(srcPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outPath);

    const { size } = await stat(outPath);
    console.log(`${file} -> ${outName} (${(size / 1024).toFixed(0)} KB)`);

    await unlink(srcPath);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
