import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфигурация для разных размеров
const sizes = {
  thumbnail: { width: 300, height: 200 },
  small: { width: 640, height: 480 },
  medium: { width: 1024, height: 768 },
  large: { width: 1920, height: 1080 }
};

// Оптимизация WebP
async function optimizeWebP(inputPath, outputPath, quality = 80) {
  const files = await imagemin([inputPath], {
    destination: path.dirname(outputPath),
    plugins: [
      imageminWebp({
        quality,
        method: 6,
        preset: 'photo',
        autoFilter: true,
        filter: 0.8
      })
    ]
  });
  
  if (files.length > 0) {
    fs.renameSync(files[0].destinationPath, outputPath);
    console.log(`✅ WebP optimized: ${path.basename(outputPath)}`);
  }
}

// Оптимизация JPEG
async function optimizeJPEG(inputPath, outputPath, quality = 85) {
  const files = await imagemin([inputPath], {
    destination: path.dirname(outputPath),
    plugins: [
      imageminMozjpeg({
        quality,
        progressive: true,
        smooth: 1
      })
    ]
  });
  
  if (files.length > 0) {
    fs.renameSync(files[0].destinationPath, outputPath);
    console.log(`✅ JPEG optimized: ${path.basename(outputPath)}`);
  }
}

// Оптимизация PNG
async function optimizePNG(inputPath, outputPath) {
  const files = await imagemin([inputPath], {
    destination: path.dirname(outputPath),
    plugins: [
      imageminPngquant({
        quality: [0.6, 0.8],
        speed: 4
      })
    ]
  });
  
  if (files.length > 0) {
    fs.renameSync(files[0].destinationPath, outputPath);
    console.log(`✅ PNG optimized: ${path.basename(outputPath)}`);
  }
}

// Основная функция оптимизации
async function optimizeImages() {
  const publicDir = path.join(__dirname, '../public');
  const optimizedDir = path.join(publicDir, 'optimized');
  
  // Создаем папку для оптимизированных изображений
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }
  
  // Получаем список всех изображений
  const imageFiles = fs.readdirSync(publicDir)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map(file => path.join(publicDir, file));
  
  console.log(`🔍 Найдено ${imageFiles.length} изображений для оптимизации`);
  
  for (const imagePath of imageFiles) {
    const fileName = path.basename(imagePath);
    const ext = path.extname(fileName).toLowerCase();
    const nameWithoutExt = path.basename(fileName, ext);
    
    try {
      // Создаем оптимизированные версии
      const optimizedWebP = path.join(optimizedDir, `${nameWithoutExt}.webp`);
      const optimizedJPG = path.join(optimizedDir, `${nameWithoutExt}.jpg`);
      
      // Оптимизируем в WebP
      await optimizeWebP(imagePath, optimizedWebP, 80);
      
      // Оптимизируем в JPEG как fallback
      if (ext === '.jpg' || ext === '.jpeg') {
        await optimizeJPEG(imagePath, optimizedJPG, 85);
      } else if (ext === '.png') {
        const optimizedPNG = path.join(optimizedDir, `${nameWithoutExt}.png`);
        await optimizePNG(imagePath, optimizedPNG);
      }
      
      // Показываем статистику
      const originalSize = fs.statSync(imagePath).size;
      const optimizedSize = fs.existsSync(optimizedWebP) ? fs.statSync(optimizedWebP).size : 0;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`📊 ${fileName}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(2)}MB (${savings}% сжатие)`);
      
    } catch (error) {
      console.error(`❌ Ошибка оптимизации ${fileName}:`, error.message);
    }
  }
  
  console.log('🎉 Оптимизация изображений завершена!');
}

// Запускаем оптимизацию
optimizeImages().catch(console.error); 