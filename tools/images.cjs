// Builds compressed site images. Usage: node tools/images.cjs <source-headshot.png> <og-source.png?>
// Uses the sharp copy bundled with ~/SimplisticOS (no install needed on Jeremy's M1).
const sharp = require(process.env.SHARP_PATH || '/Users/agentops/SimplisticOS/node_modules/sharp');
const path = require('path');
const out = path.join(__dirname, '..', 'site', 'assets');
const [src, og] = process.argv.slice(2);
(async () => {
  if (src) for (const w of [480, 800]) {
    const base = sharp(src).resize(w, Math.round(w * 1.15), { fit: 'cover', position: 'attention' }).flatten({ background: '#9a9a9a' });
    await base.clone().avif({ quality: 50 }).toFile(`${out}/jeremy-${w}.avif`);
    await base.clone().webp({ quality: 72 }).toFile(`${out}/jeremy-${w}.webp`);
    await base.clone().jpeg({ quality: 74, mozjpeg: true }).toFile(`${out}/jeremy-${w}.jpg`);
  }
  if (src) await sharp(src).resize(180, 180).flatten({ background: '#9a9a9a' }).png().toFile(`${out}/apple-touch-icon.png`);
  if (og) await sharp(og).resize(1200, 630).jpeg({ quality: 78, mozjpeg: true }).toFile(`${out}/og.jpg`);
})().catch(e => { console.error(e); process.exit(1); });
