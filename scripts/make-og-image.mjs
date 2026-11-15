/*
  Makes og-image.png, the picture Messenger / Facebook / X show when the site's link is shared.

  How: it opens scripts/og-image.html in Chrome or Edge without showing a window ("headless"),
  takes a 1200 x 630 screenshot, then sharp shrinks the file size.
  Using a real browser means the image uses the site's own fonts and CSS.

  Run it with:  npm run og
*/
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const template = path.join(root, 'scripts', 'og-image.html')
const output = path.join(root, 'og-image.png')

// The usual places Chrome and Edge are installed on Windows.
const BROWSERS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
]
const browser = BROWSERS.find((file) => existsSync(file))
if (!browser) {
  console.error('Could not find Chrome or Edge. Add its path to BROWSERS in this script.')
  process.exit(1)
}

// The browser writes a raw screenshot into a temporary folder first.
const tempDir = mkdtempSync(path.join(tmpdir(), 'og-'))
const rawShot = path.join(tempDir, 'shot.png')
try {
  execFileSync(
    browser,
    [
      '--headless=new',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      '--virtual-time-budget=4000', // give the fonts and the photo time to load
      `--user-data-dir=${path.join(tempDir, 'profile')}`,
      `--screenshot=${rawShot}`,
      pathToFileURL(template).href,
    ],
    { stdio: 'ignore' },
  )

  // Crop to exactly 1200 x 630 and compress. `palette` makes the PNG much smaller.
  const info = await sharp(rawShot)
    .extract({ left: 0, top: 0, width: 1200, height: 630 })
    .png({ palette: true, quality: 92, compressionLevel: 9 })
    .toFile(output)
  console.log(`og-image.png  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} kB`)
} finally {
  rmSync(tempDir, { recursive: true, force: true })
}
