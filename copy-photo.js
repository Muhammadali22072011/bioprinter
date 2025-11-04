import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔍 Searching for video/photo folder...\n');

// Find the folder with the photo
const dirs = fs.readdirSync('.');
let srcDir = null;

for (const dir of dirs) {
  try {
    const files = fs.readdirSync(dir);
    if (files.some(f => f.includes('photo_1'))) {
      srcDir = dir;
      break;
    }
  } catch (e) {
    // Skip files
  }
}

if (!srcDir) {
  console.error('❌ Error: Could not find folder with photo_1 file');
  process.exit(1);
}

console.log(`✓ Found folder: ${srcDir}`);

// Find the photo file
const files = fs.readdirSync(srcDir);
const photoFile = files.find(f => f.includes('photo_1'));

if (!photoFile) {
  console.error('❌ Error: photo_1 file not found');
  process.exit(1);
}

const src = path.join(srcDir, photoFile);
const dst = path.join('public', 'working-with-bioprinter.jpg');

console.log(`✓ Found photo: ${photoFile}`);
console.log(`\n📋 Copying file...`);
console.log(`   From: ${src}`);
console.log(`   To:   ${dst}\n`);

try {
  fs.copyFileSync(src, dst);
  console.log('✅ Success! Photo copied to public folder\n');
  console.log('Now you can use it in your website!');
} catch (err) {
  console.error('❌ Error copying file:', err.message);
  process.exit(1);
}
