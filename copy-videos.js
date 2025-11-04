import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

console.log('🎬 Copying videos to public folder...\n')

// Find video folder
const dirs = fs.readdirSync('.')
let videoDir = null

for (const dir of dirs) {
  try {
    const files = fs.readdirSync(dir)
    if (files.some(f => f.endsWith('.mp4'))) {
      videoDir = dir
      break
    }
  } catch (e) {
    // Skip
  }
}

if (!videoDir) {
  console.error('❌ Error: No folder with .mp4 files found')
  process.exit(1)
}

const srcDir = videoDir
const destDir = path.join('public', 'videos')

// Create dest directory if not exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

// Copy all mp4 files
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.mp4'))

console.log(`✓ Found ${files.length} video files in "${srcDir}"`)
console.log(`\n📋 Copying to: ${destDir}\n`)

let copied = 0
for (const file of files) {
  try {
    const src = path.join(srcDir, file)
    const dst = path.join(destDir, file)
    fs.copyFileSync(src, dst)
    console.log(`  ✓ ${file}`)
    copied++
  } catch (err) {
    console.error(`  ✗ Error copying ${file}:`, err.message)
  }
}

console.log(`\n✅ Successfully copied ${copied}/${files.length} video files\n`)

if (copied === files.length) {
  console.log('🎉 All videos ready for deployment!')
} else {
  console.warn(`⚠️  ${files.length - copied} files failed to copy`)
}
