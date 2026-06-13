// Render essay thumbnails to canonical motif-only OG JPGs (1200x630), in parallel.
//
// Reads the authored SVG + ground colour straight out of essays/index.html
// (single source of truth — both .essay-thumb cards and the .featured-img),
// centres the SVG on the ground at 1200x630 with NO text strip (matching the
// canonical the-people-who-write-in-the-margins format), screenshots with the
// system Chrome/Edge (no puppeteer), and writes assets/images/og/<slug>.jpg
// via Python/PIL. One file serves both the card thumbnail and the og:image
// preview, so writing it updates both at once.
//
// Usage:
//   node scripts/render-thumbs.mjs <slug> [<slug> ...]
//   node scripts/render-thumbs.mjs --all      (every slug found in index.html)

import fs from 'fs'
import os from 'os'
import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { fileURLToPath } from 'url'

const pexec = promisify(execFile)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const html = fs.readFileSync(path.join(root, 'essays/index.html'), 'utf8')
const outDir = path.join(root, 'assets/images/og')

const chrome = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].find(p => fs.existsSync(p))
if (!chrome) { console.error('No Chrome/Edge found.'); process.exit(1) }

async function toJpg(png, jpg) {
  for (const exe of ['python', 'python3', 'py']) {
    try {
      await pexec(exe, ['-c', `from PIL import Image;Image.open(r'${png}').convert('RGB').save(r'${jpg}','JPEG',quality=92)`])
      return true
    } catch {}
  }
  return false
}

// Extract { bg, inner } for a slug — handles both .essay-thumb and .featured-img.
function extract(slug) {
  const re = new RegExp(
    `href="/essays/${slug}"[\\s\\S]*?<div class="(?:essay-thumb|featured-img)" style="background:([^;"]+);?\\s*">([\\s\\S]*?)</div>`
  )
  const m = html.match(re)
  if (!m) return null
  return { bg: m[1].trim(), inner: m[2].trim() }
}

let slugs = process.argv.slice(2)
if (slugs[0] === '--all') {
  slugs = [...new Set([...html.matchAll(/href="\/essays\/([a-z0-9-]+)"/g)].map(m => m[1]))]
}
if (!slugs.length) { console.error('usage: node scripts/render-thumbs.mjs <slug...> | --all'); process.exit(1) }

const tmp = path.join(os.tmpdir(), 'pn-thumbs')
fs.mkdirSync(tmp, { recursive: true })
fs.mkdirSync(outDir, { recursive: true })

async function render(slug) {
  const ex = extract(slug)
  if (!ex) return { slug, ok: false, why: 'not found in index.html' }
  if (!ex.bg.startsWith('#')) return { slug, ok: false, why: `ground "${ex.bg}" is not a #hex` }

  const frame = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&display=block" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:1200px;height:630px;overflow:hidden;background:${ex.bg}}
body{display:flex;align-items:center;justify-content:center}svg{width:720px;height:540px;display:block}</style>
</head><body>${ex.inner}</body></html>`

  const framePath = path.join(tmp, `${slug}.html`)
  const png = path.join(tmp, `${slug}.png`)
  const jpg = path.join(outDir, `${slug}.jpg`)
  fs.writeFileSync(framePath, frame)

  await pexec(chrome, [
    '--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    '--force-device-scale-factor=1', '--virtual-time-budget=3000',
    '--window-size=1200,630',
    `--user-data-dir=${path.join(tmp, 'profile-' + slug)}`,   // unique profile → safe in parallel
    `--screenshot=${png.replace(/\\/g, '/')}`,
    'file:///' + framePath.replace(/\\/g, '/'),
  ])

  const ok = await toJpg(png, jpg)
  return { slug, ok, why: ok ? '' : 'python/PIL missing' }
}

const results = await Promise.all(slugs.map(render))   // all slugs render concurrently
for (const r of results) console.log(r.ok ? 'OK  ' + r.slug : 'FAIL ' + r.slug + ' — ' + r.why)
console.log(`\nDone. ${results.filter(r => r.ok).length}/${results.length} rendered to assets/images/og/`)
