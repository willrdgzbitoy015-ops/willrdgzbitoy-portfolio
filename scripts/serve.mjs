/*
  A small local web server for this site, with no libraries:  npm run dev  (stop: Ctrl+C)

  Why not "python -m http.server"? That one hands out EVERY file in the folder, with folder
  listings: _brief/, notes/, .git, node_modules... Harmless on your own PC, but not once
  the site goes through a public tunnel (npm run tunnel): anyone with the link could read
  them. This server only gives out the site's own files (PUBLIC_FILES / PUBLIC_FOLDERS);
  asking for anything else gets "404 Not found".

  Another port (PowerShell):  $env:PORT=8080; npm run dev
*/
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PORT = Number(process.env.PORT) || 5173

// The only things anyone may ask for. Everything else stays private.
const PUBLIC_FILES = new Set([
  'index.html',
  'project.html',
  'favicon.svg',
  'og-image.png',
  'robots.txt',
  'will-bitoy-resume.pdf',
])
const PUBLIC_FOLDERS = ['css/', 'js/', 'fonts/', 'images/']

// The browser needs to know what kind of file it gets (Content-Type).
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
}

const isPublic = (name) =>
  PUBLIC_FILES.has(name) || PUBLIC_FOLDERS.some((folder) => name.startsWith(folder))

function notFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('404 Not found')
}

/** "/project.html?p=rubens" -> "project.html", "/" -> "index.html", tricks -> null */
function fileNameFrom(url) {
  let name
  try {
    name = decodeURIComponent(new URL(url, 'http://localhost').pathname)
  } catch {
    return null // a broken address
  }
  name = name.replace(/^\/+/, '') || 'index.html'
  // normalize turns "css/../notes/x" into "notes/x" (then isPublic says no). A name that
  // still climbs out of the folder ("../") is refused here.
  name = path.posix.normalize(name)
  if (name.startsWith('..') || name.includes('\0')) return null
  return name
}

async function handle(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' })
    res.end()
    return
  }
  const name = fileNameFrom(req.url)
  if (!name || !isPublic(name)) return notFound(res)

  const file = path.join(ROOT, name)
  try {
    if (!(await stat(file)).isFile()) return notFound(res) // a folder: no listings
    const body = await readFile(file)
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': body.length,
      'Cache-Control': 'no-cache', // the browser always checks for a newer copy: edits show at once
      'X-Content-Type-Options': 'nosniff',
    })
    res.end(req.method === 'HEAD' ? undefined : body)
  } catch {
    notFound(res) // the file doesn't exist
  }
}

const BUSY_MESSAGE =
  `Port ${PORT} is already in use: another server is running (maybe an older "npm run dev"\n` +
  'in another terminal). Stop that one with Ctrl+C, or use another port:\n' +
  '  $env:PORT=8080; npm run dev'

/** Windows sometimes lets two programs use the same port without an error, so first ask:
    does anything already answer here? (Any answer, even "404", means yes.) */
async function portIsBusy() {
  for (const host of ['127.0.0.1', '[::1]']) {
    try {
      await fetch(`http://${host}:${PORT}/`, { signal: AbortSignal.timeout(800) })
      return true
    } catch {
      // nobody answered on this address: good
    }
  }
  return false
}

if (await portIsBusy()) {
  console.error(BUSY_MESSAGE)
  process.exit(1)
}

// "localhost" can mean 127.0.0.1 (IPv4) or ::1 (IPv6), so listen on both. Both are
// loopback addresses: only this PC can connect. The tunnel (ngrok) runs on this PC too,
// so it can still pass visitors through.
for (const host of ['127.0.0.1', '::1']) {
  createServer(handle)
    .on('error', (error) => {
      if (host === '::1' && ['EADDRNOTAVAIL', 'EAFNOSUPPORT'].includes(error.code)) return // no IPv6 here
      console.error(error.code === 'EADDRINUSE' ? BUSY_MESSAGE : error)
      process.exit(1)
    })
    .listen(PORT, host)
}

console.log(`
  Will's portfolio is running:  http://localhost:${PORT}

  Only the site's own files are served (not _brief/, notes/ or .git).
  To share it: open a second terminal and run  npm run tunnel
  Keep this terminal open. Press Ctrl+C to stop.
`)
