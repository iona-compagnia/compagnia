import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');

// Profiles are restricted to 1200px max dimension
const PROFILE_IMAGES = [
  'isabella.jpg',
  'zhu.jpg',
  'ariel.jpg',
  'hannah.jpg',
  'samuel.jpg',
  'jennifer.jpg',
  'iona-profile.jpg',
  'emma.jpg',
  'joanne.jpg',
  'pascal.jpg'
];

// Hero/banners are restricted to 2000px max dimension
const HERO_IMAGES = [
  'Compagnia V-1.jpeg',
  'home-bg.jpg',
  'iona-bio.jpg'
];

async function compressImage(filePath) {
  const filename = path.basename(filePath);
  const ext = path.extname(filename).toLowerCase();
  
  if (ext !== '.jpg' && ext !== '.jpeg') {
    return;
  }

  // Determine max dimension
  let maxDim = 1200;
  if (HERO_IMAGES.some(name => filename.toLowerCase().includes(name.toLowerCase().split('.')[0]))) {
    maxDim = 2000;
  }

  try {
    const metadata = await sharp(filePath).metadata();
    
    // Check if it actually needs resizing or compression
    // If it's already small and dimensions are within limit, skip
    const isLargerThanLimit = (metadata.width > maxDim || metadata.height > maxDim);
    
    // Check file size
    const stats = fs.statSync(filePath);
    const sizeInMB = stats.size / (1024 * 1024);
    
    // Always compress if it is > 300KB or if it is wider/taller than the limit
    if (isLargerThanLimit || sizeInMB > 0.3) {
      console.log(`Optimizing ${filename}... (Current: ${(stats.size / 1024).toFixed(1)} KB, ${metadata.width}x${metadata.height})`);
      
      const tempPath = filePath + '.tmp';
      
      let pipeline = sharp(filePath);
      
      if (isLargerThanLimit) {
        pipeline = pipeline.resize({
          width: metadata.width > metadata.height ? maxDim : null,
          height: metadata.height >= metadata.width ? maxDim : null,
          fit: 'inside',
          withoutEnlargement: true
        });
      }
      
      // Output as progressive JPEG, quality 80, removing metadata/EXIF for privacy & size
      await pipeline
        .jpeg({ quality: 80, progressive: true })
        .toFile(tempPath);
        
      fs.renameSync(tempPath, filePath);
      
      const newStats = fs.statSync(filePath);
      console.log(`  ✓ Compressed to ${(newStats.size / 1024).toFixed(1)} KB`);
    } else {
      console.log(`Skipping ${filename} (Already optimized: ${(stats.size / 1024).toFixed(1)} KB)`);
    }
  } catch (err) {
    console.error(`Error processing ${filename}:`, err);
  }
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log(`Images directory not found at ${IMAGES_DIR}`);
    return;
  }
  
  const files = fs.readdirSync(IMAGES_DIR);
  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    
    // Clean up redundant capitalized/double-extension duplicates
    if (file.toLowerCase().endsWith('.jpg') && file !== file.toLowerCase()) {
      const lowerCaseFile = file.toLowerCase();
      if (files.includes(lowerCaseFile) || files.includes(lowerCaseFile.replace('.jpg', '.jpeg'))) {
        console.log(`Removing redundant capitalized file: ${file}`);
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.error(`Failed to delete ${file}:`, e);
        }
        continue;
      }
    }
    
    await compressImage(filePath);
  }
}

main().catch(console.error);
