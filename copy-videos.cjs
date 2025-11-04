const fs = require('fs');
const path = require('path');

const videosDir = 'видео';
const publicVideosDir = 'public/videos';

// Create target directory if it doesn't exist
if (!fs.existsSync(publicVideosDir)) {
  fs.mkdirSync(publicVideosDir, { recursive: true });
  console.log('Created public/videos directory');
}

try {
  const files = fs.readdirSync(videosDir);
  let copiedCount = 0;
  let skippedCount = 0;

  files.forEach(file => {
    if (file.endsWith('.mp4')) {
      const src = path.join(videosDir, file);
      const dest = path.join(publicVideosDir, file);
      
      if (!fs.existsSync(dest)) {
        console.log(`Copying ${file}...`);
        fs.copyFileSync(src, dest);
        copiedCount++;
      } else {
        console.log(`Skipping ${file} (already exists)`);
        skippedCount++;
      }
    }
  });

  console.log(`\nDone! Copied ${copiedCount} files, skipped ${skippedCount} files.`);
} catch (err) {
  console.error('Error copying video files:', err.message);
  process.exit(1);
}

