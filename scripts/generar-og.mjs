// Genera public/og.png (1200×630) y public/apple-touch-icon.png (180×180)
// de marca, usando la paleta del sitio. Ejecuta: node scripts/generar-og.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../src/data.json', import.meta.url)));
const { nombre, tagline, kicker } = data.sitio;

const esc = (s) =>
  String(s ?? '')
    .normalize('NFC') // precompone acentos (ó combinante → ó) para que el render no los pierda
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

const icono = `<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="${coralDeep}"/>
  <text x="90" y="128" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="116" font-weight="700" fill="${hueso}">L</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile(new URL('../public/og.png', import.meta.url).pathname.slice(1));
await sharp(Buffer.from(icono))
  .png()
  .toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname.slice(1));

console.log('OK: public/og.png (1200x630) y public/apple-touch-icon.png (180x180)');
