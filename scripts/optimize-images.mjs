/*
  Converts the original photos in _brief/photos into small WebP files in public/images.
  Each photo gets several widths so phones download a small file and big screens a sharp one
  (the browser picks, using the <img srcset> list).

  Run it with:  npm run images
*/
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, '_brief', 'photos')
const OUT = path.join(root, 'public', 'images')

// Target widths in pixels. Sizes wider than the original are skipped (no upscaling).
const WIDTHS = [480, 800, 1200]

const PHOTOS = [
  // Transparent PNG (alpha is kept). The extra 640 step is what most phones pick.
  { file: '2-hero-cutout.png', name: 'hero', quality: 76, widths: [480, 640, 800, 1200] },
  { file: '4-about-sunset.jpg', name: 'about', quality: 78 },
  { file: '3-contact-reach.jpg', name: 'contact', quality: 78 },
]

await mkdir(OUT, { recursive: true })

for (const photo of PHOTOS) {
  const input = path.join(SRC, photo.file)
  const { width: fullWidth, height: fullHeight } = await sharp(input).metadata()

  const widths = (photo.widths ?? WIDTHS).filter((w) => w <= fullWidth)
  // Keep the full-size version too when it is noticeably bigger than the largest step.
  if (fullWidth < WIDTHS.at(-1) && fullWidth - (widths.at(-1) ?? 0) >= 100) widths.push(fullWidth)

  for (const width of widths) {
    const outFile = path.join(OUT, `${photo.name}-${width}.webp`)
    const info = await sharp(input)
      .rotate() // apply the camera's rotation flag, then drop the metadata
      .resize({ width })
      .webp({ quality: photo.quality, alphaQuality: 90 })
      .toFile(outFile)
    console.log(
      `${photo.name}-${width}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} kB`,
    )
  }
  console.log(`  original: ${fullWidth}x${fullHeight}\n`)
}
