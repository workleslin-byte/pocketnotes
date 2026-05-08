import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Slugs to generate — order matches essays/index.html
const slugs = [
  'the-people-who-write-in-the-margins',
  'the-page-is-a-tool',
  'constraint-sharpens',
  'catch-first-edit-later',
  'the-method-beats-the-mood',
  'the-grid-page-and-the-wandering-thought',
  'the-index-method',
  'two-lines-every-day',
  'why-your-notebook-should-never-be-organised',
  'attention-is-physical',
  'born-of-necessity',
  'we-dont-compete-with-notebooks',
  'notebooks-of-ancient-singers',
  'margins-where-great-ideas-live',
  'the-roman-wax-tablet',
  'idea-parking',
  'constraint-as-creative-practice',
  'the-first-page-rule',
  'notes-as-identity-the-corebook',
]

async function generate() {
  const outDir = path.join(__dirname, '../assets/images/og')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })

  // ── Step 1: load the essays index page and extract card data ──
  const indexPath = path.join(__dirname, '../essays/index.html')
  const indexUrl = 'file:///' + indexPath.replace(/\\/g, '/')

  const extractPage = await browser.newPage()
  await extractPage.setViewport({ width: 1440, height: 900 })
  await extractPage.goto(indexUrl, { waitUntil: 'domcontentloaded' })
  await extractPage.evaluate(() => document.fonts.ready)

  // Extract: for each slug, grab the thumb innerHTML and its bg colour.
  // Handles both .essay-card > .essay-thumb and .featured-card > .featured-img
  const cardData = await extractPage.evaluate((slugs) => {
    return slugs.map(slug => {
      // Try regular essay card first
      let card = document.querySelector(`.essay-card[href*="${slug}"]`)
      let thumb, titleEl, tagEl

      if (card) {
        thumb = card.querySelector('.essay-thumb')
        titleEl = card.querySelector('.essay-title')
        tagEl = card.querySelector('.essay-tag')
      } else {
        // Try featured card
        card = document.querySelector(`.featured-card[href*="${slug}"]`)
        if (card) {
          thumb = card.querySelector('.featured-img')
          titleEl = card.querySelector('.featured-title')
          tagEl = card.querySelector('.featured-tag')
        }
      }

      if (!card || !thumb) return { slug, thumbHTML: '', bgColor: '#FAF3E3', titleText: slug, category: '' }

      const bg = getComputedStyle(thumb).backgroundColor
      return {
        slug,
        thumbHTML: thumb.innerHTML,
        bgColor: bg,
        titleText: titleEl ? titleEl.textContent.trim().replace(/\s+/g, ' ') : slug,
        category: tagEl ? tagEl.textContent.trim() : '',
      }
    })
  }, slugs)

  await extractPage.close()

  // ── Step 2: for each card, render a 1200×630 OG frame and screenshot ──
  const renderPage = await browser.newPage()
  await renderPage.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })

  for (const card of cardData) {
    if (!card.thumbHTML) {
      console.warn(`⚠ card not found for slug: ${card.slug}`)
      continue
    }

    const ogHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    background: ${card.bgColor};
    display: flex;
    flex-direction: column;
    font-family: 'DM Mono', monospace;
  }
  /* illustration fills top 70% */
  .thumb-area {
    flex: 0 0 441px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: ${card.bgColor};
  }
  .thumb-area svg {
    width: 100%;
    height: 100%;
  }
  /* text strip fills bottom 30% */
  .text-area {
    flex: 1;
    background: ${card.bgColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 72px 36px;
    gap: 10px;
    border-top: 1.5px solid rgba(0,0,0,0.12);
  }
  .category {
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.55;
    color: inherit;
  }
  .title {
    font-family: 'Fraunces', serif;
    font-weight: 900;
    font-size: 52px;
    line-height: 1;
    letter-spacing: -0.03em;
    color: inherit;
  }
  .wordmark {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    opacity: 0.5;
    color: inherit;
    margin-top: 8px;
  }
</style>
</head>
<body>
  <div class="thumb-area">${card.thumbHTML}</div>
  <div class="text-area">
    <div class="category">Pocket Notes · ${card.category}</div>
    <div class="title">${card.titleText}</div>
    <div class="wordmark">pocketnotes.in</div>
  </div>
</body>
</html>`

    await renderPage.setContent(ogHtml, { waitUntil: 'domcontentloaded' })
    await renderPage.evaluate(() => document.fonts.ready)

    await renderPage.screenshot({
      path: path.join(outDir, `${card.slug}.jpg`),
      type: 'jpeg',
      quality: 92,
    })
    console.log(`✓ ${card.slug}`)
  }

  await renderPage.close()
  await browser.close()
  console.log('\nDone. OG images saved to assets/images/og/')
}

generate()
