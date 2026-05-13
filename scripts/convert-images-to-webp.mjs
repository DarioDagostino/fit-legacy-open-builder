import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = path.resolve(process.cwd(), 'public');
const allowed = new Set(['.png', '.jpg', '.jpeg']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      return [full];
    })
  );
  return files.flat();
}

async function convert(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!allowed.has(ext)) return null;

  const out = filePath.slice(0, -ext.length) + '.webp';
  try {
    await sharp(filePath)
      .webp({ quality: 82, effort: 4 })
      .toFile(out);

    const [srcStat, outStat] = await Promise.all([fs.stat(filePath), fs.stat(out)]);
    return {
      filePath,
      out,
      srcBytes: srcStat.size,
      outBytes: outStat.size,
    };
  } catch (error) {
    return {
      filePath,
      out,
      srcBytes: 0,
      outBytes: 0,
      error: String(error),
    };
  }
}

async function main() {
  const files = await walk(rootDir);
  const targets = files.filter((f) => allowed.has(path.extname(f).toLowerCase()));

  const results = [];
  for (const f of targets) {
    const r = await convert(f);
    if (r) results.push(r);
  }

  const failed = results.filter((r) => r.error);
  const ok = results.filter((r) => !r.error);
  const srcTotal = ok.reduce((n, r) => n + r.srcBytes, 0);
  const outTotal = ok.reduce((n, r) => n + r.outBytes, 0);
  const saved = srcTotal - outTotal;
  const savedPct = srcTotal > 0 ? ((saved / srcTotal) * 100).toFixed(2) : '0.00';

  console.log(`Converted: ${ok.length}`);
  console.log(`Failed: ${failed.length}`);
  console.log(`Source total: ${srcTotal} bytes`);
  console.log(`WebP total: ${outTotal} bytes`);
  console.log(`Saved: ${saved} bytes (${savedPct}%)`);

  if (failed.length) {
    console.log('\nFailed files:');
    for (const f of failed) {
      console.log(`- ${f.filePath}: ${f.error}`);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
