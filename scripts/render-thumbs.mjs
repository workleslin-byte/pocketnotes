// Render essay thumbnails to canonical motif-only OG JPGs (1200x630).
//
// Reads the authored SVG + ground colour straight out of essays/index.html
// (single source of truth), centres the SVG on the ground at 1200x630 with
// NO text strip (matching the canonical the-people-who-write-in-the-margins
// format), screenshots with the system Chrome/Edge (no puppeteer needed),
// and writes assets/images/og/<slug>.jpg via Python/PIL.
//
// Usage:
//   node scripts/render-thumbs.mjs <slug> [<slug> ...]
//   node scripts/render-thumbs.mjs --all      (every slug found in index.html)

import fs from 'fs'
import os from 'os'
import path from 'path'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const indexPath = path.join(root, 'essays/index.html')
const outDir = path.join(root, 'assets/images/og')
const html = fs.readFileSync(indexPath, 'utf8')

const chrome = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].find(p => fs.existsSync(p))
if (!chrome) { console.error('No Chrome/Edge found.'); process.exit(1) }

function python(args) {
  for (const exe of ['python', 'python3', 'py']) {
    try { execFileSync(exe, args, { stdio: 'ignore' }); return true } catch {}
  }
  return false
}

// Extract { bg, inner } for a slug from its .essay-thumb block.
function extract(slug) {
  const re = new RegExp(
    `href="/essays/${slug}"[\\s\\S]*?<div class="essay-thumb" style="background:([^;"]+);?\\s*">([\\s\\S]*?)</div>`
  )
  const m = html.match(re)
  if (!m) return null
  return { bg: m[1].trim(), inner: m[2].trim() }
}

let slugs = process.argv.slice(2)
if (slugs[0] === '--all') {
  slugs = [...html.matchAll(/href="\/essays\/([a-z0-9-]+)"/g)].map(m => m[1])
  slugs = [...new Set(slugs)]
}
if (!slugs.length) { console.error('usage: node scripts/render-thumbs.mjs <slug...> | --all'); process.exit(1) }

const tmp = path.join(os.tmpdir(), 'pn-thumbs')
fs.mkdirSync(tmp, { recursive: true })
fs.mkdirSync(outDir, { recursive: true })

let ok = 0
for (const slug of slugs) {
  const ex = extract(slug)
  if (!ex) { console.warn('skip (not found):', slug); continue }
  if (!ex.bg.startsWith('#')) { console.warn(`skip ${slug}: ground is "${ex.bg}", author it as a #hex`); continue }

  const frame = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&display=block" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:1200px;height:630px;overflow:hidden;background:${ex.bg}}
body{display:flex;align-items:center;justify-content:center}svg{width:720px;height:540px;display:block}</style>
</head><body>${ex.inner}</body></html>`

  const framePath = path.join(tmp, `${slug}.html`)
  const png = path.join(tmp, `${slug}.png`)
  const jpg = path.join(outDir, `${slug}.jpg`)
  fs.writeFileSync(framePath, frame)

  execFileSync(chrome, [
    '--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    '--force-device-scale-factor=1', '--virtual-time-budget=3000',
    '--window-size=1200,630',
    `--screenshot=${png.replace(/\\/g, '/')}`,
    'file:///' + framePath.replace(/\\/g, '/'),
  ], { stdio: 'ignore' })

  if (python(['-c', `from PIL import Image;Image.open(r'${png}').convert('RGB').save(r'${jpg}','JPEG',quality=92)`])) {
    console.log('OK', slug); ok++
  } else {
    console.error('python/PIL missing — cannot write', slug)
  }
}
console.log(`\nDone. ${ok}/${slugs.length} rendered to assets/images/og/`)
