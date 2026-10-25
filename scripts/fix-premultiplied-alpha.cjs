const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'src', 'assets');

const files = [
  'shop-amber-chocolat.png',
  'shop-cest-la-vie.png',
  'shop-corinto-kush.png',
  'shop-fresh-vetiver.png',
  'shop-karma-scotch.png',
  'shop-koshu.png',
  'shop-loto.png',
  'shop-mang-oud.png',
  'shop-neroli-negro.png',
  'shop-omg.png',
  'shop-tobacco-blanco.png',
];

async function fixPremultipliedAlpha(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Processing ${path.basename(inputPath)}: ${metadata.width}x${metadata.height}, channels: ${metadata.channels}, hasAlpha: ${metadata.hasAlpha}`);
    
    if (!metadata.hasAlpha) {
      console.log(`  No alpha channel, skipping`);
      return;
    }

    // Get raw pixel data (RGBA)
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;
    console.log(`  Channels: ${channels}, size: ${data.length} bytes`);

    // Un-premultiply alpha: for each pixel, if alpha > 0, divide RGB by alpha
    // data is Uint8Array in RGBA order
    let changed = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a > 0 && a < 255) {
        // Un-premultiply: RGB = RGB * 255 / alpha
        const factor = 255 / a;
        data[i] = Math.min(255, Math.round(r * factor));
        data[i + 1] = Math.min(255, Math.round(g * factor));
        data[i + 2] = Math.min(255, Math.round(b * factor));
        changed++;
      } else if (a === 0) {
        // Fully transparent - RGB should be 0,0,0 but keep as-is
        // data[i] = 0; data[i+1] = 0; data[i+2] = 0;
      }
    }

    console.log(`  Un-premultiplied ${changed} semi-transparent pixels`);

    // Write back
    await sharp(data, {
      raw: { width, height, channels: 4 }
    })
      .png({ compressionLevel: 9 })
      .toFile(outputPath);

    console.log(`  Saved to ${path.basename(outputPath)}`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err.message);
  }
}

async function main() {
  console.log('Fixing premultiplied alpha in bottle images...\n');
  
  for (const file of files) {
    const inputPath = path.join(assetsDir, file);
    const backupPath = path.join(assetsDir, file.replace('.png', '.png.backup'));
    
    // Create backup first
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log(`Backup created: ${file}.backup`);
    }
    
    await fixPremultipliedAlpha(inputPath, inputPath);
    console.log('');
  }
  
  console.log('Done!');
}

main().catch(console.error);