// Genera, leyendo el data.json actual:
//   public/og.png            (1200×630, tarjeta de marca)
//   public/apple-touch-icon.png (180×180)
//   public/favicon.svg       (marca coral)
//   public/favicon.ico       (16/32/48, marca coral)
// Se ejecuta en cada build (prebuild) → el OG nunca se desfasa del CMS.
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ruta = (rel) => fileURLToPath(new URL(rel, import.meta.url));
const data = JSON.parse(readFileSync(ruta('../src/data.json')));
const { nombre, tagline, kicker } = data.sitio;

const esc = (s) =>
  String(s ?? '')
    .normalize('NFC') // precompone acentos para que el render no los pierda
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// Paleta (BRIEF §1.1)
const hueso = '#fbf8f2';
const tinta = '#1c1a17';
const tintaSuave = '#6b6256';
const coral = '#ff5a3c';
const coralDeep = '#c5371a';

const og = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${hueso}"/>
  <circle cx="1080" cy="520" r="160" fill="${coral}" opacity="0.16"/>
  <rect x="0" y="0" width="18" height="630" fill="${coralDeep}"/>
  <text x="100" y="140" font-family="Arial, sans-serif" font-size="26" letter-spacing="5" fill="${coralDeep}">${esc(
    kicker,
  ).toUpperCase()}</text>
  <text x="96" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="116" fill="${tinta}">${esc(
    nombre,
  )}</text>
  <text x="100" y="370" font-family="Arial, sans-serif" font-size="34" fill="${tintaSuave}">${esc(
    tagline,
  )}</text>
</svg>`;

const appleIcon = `<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="${coralDeep}"/>
  <text x="90" y="128" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="116" font-weight="700" fill="${hueso}">L</text>
</svg>`;

// Favicon de marca (cuadrado redondeado coral + inicial)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="${coralDeep}"/>
  <text x="50" y="73" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="68" font-weight="700" fill="${hueso}">L</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile(ruta('../public/og.png'));
await sharp(Buffer.from(appleIcon)).png().toFile(ruta('../public/apple-touch-icon.png'));

writeFileSync(ruta('../public/favicon.svg'), faviconSvg);

const png = (size) => sharp(Buffer.from(faviconSvg)).resize(size, size).png().toBuffer();
const ico = await pngToIco([await png(16), await png(32), await png(48)]);
writeFileSync(ruta('../public/favicon.ico'), ico);

console.log('OK: og.png, apple-touch-icon.png, favicon.svg, favicon.ico (marca coral)');
