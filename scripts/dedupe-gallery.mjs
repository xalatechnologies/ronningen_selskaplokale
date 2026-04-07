#!/usr/bin/env node
/**
 * Removes duplicate PNGs in public/gallery by SHA-256 (keeps lowest inspirasjon-NN number).
 * Trims matching entries from src/lib/inspirationGalleryExtras.gen.ts.
 *
 * Run: node scripts/dedupe-gallery.mjs
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const dir = path.join(ROOT, 'public/gallery');
const genPath = path.join(ROOT, 'src/lib/inspirationGalleryExtras.gen.ts');

function hashFile(p) {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

function numFromName(name) {
  const m = /^inspirasjon-(\d+)\.png$/i.exec(name);
  return m ? parseInt(m[1], 10) : 0;
}

const files = fs.readdirSync(dir).filter((f) => /^inspirasjon-\d+\.png$/i.test(f));
files.sort((a, b) => numFromName(a) - numFromName(b));

const byHash = new Map();
const toDelete = [];

for (const f of files) {
  const p = path.join(dir, f);
  const h = hashFile(p);
  if (byHash.has(h)) {
    toDelete.push(f);
  } else {
    byHash.set(h, f);
  }
}

if (toDelete.length === 0) {
  console.log('No duplicate gallery images found.');
  process.exit(0);
}

const deleteSet = new Set(toDelete);
for (const f of toDelete) {
  fs.unlinkSync(path.join(dir, f));
}

let gen = fs.readFileSync(genPath, 'utf8');
const lines = gen.split('\n');
const kept = lines.filter((line) => {
  const m = /\/gallery\/(inspirasjon-\d+\.png)'/.exec(line);
  if (!m) return true;
  return !deleteSet.has(m[1]);
});
fs.writeFileSync(genPath, kept.join('\n'), 'utf8');

console.log(`Removed ${toDelete.length} duplicate files from ${dir}`);
console.log(`Trimmed ${lines.length - kept.length} lines in ${path.relative(ROOT, genPath)}`);
