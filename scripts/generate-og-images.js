import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const essays = [
  { slug: 'the-people-who-write-in-the-margins', title: 'The People Who Write in the Margins', category: 'History', color: '#F5C13D', textColor: '#1A1612' },
  { slug: 'the-page-is-a-tool', title: 'The Page Is a Tool', category: 'Method', color: '#FF6B47', textColor: '#FAF3E3' },
  { slug: 'constraint-sharpens', title: 'Constraint Sharpens', category: 'Method', color: '#1A1612', textColor: '#FAF3E3' },
  { slug: 'catch-first-edit-later', title: 'Catch First, Edit Later', category: 'Method', color: '#8FB89C', textColor: '#1A1612' },
  { slug: 'the-method-beats-the-mood', title: 'The Method Beats the Mood', category: 'Habit', color: '#6E3582', textColor: '#FAF3E3' },
  { slug: 'the-grid-page-and-the-wandering-thought', title: 'The Grid Page and the Wandering Thought', category: 'Technique', color: '#5BA8C9', textColor: '#1A1612' },
  { slug: 'the-index-method', title: 'The Index Method', category: 'Technique', color: '#F5C13D', textColor: '#1A1612' },
  { slug: 'two-lines-every-day', title: 'Two Lines Every Day', category: 'Habit', color: '#FF6B47', textColor: '#FAF3E3' },
  { slug: 'why-your-notebook-should-never-be-organised', title: 'Why Your Notebook Should Never Be Organised', category: 'Method', color: '#6E3582', textColor: '#FAF3E3' },
  { slug: 'attention-is-physical', title: 'Attention Is Physical', category: 'Method', color: '#F26A8D', textColor: '#FAF3E3' },
  { slug: 'born-of-necessity', title: 'Born of Necessity', category: 'History', color: '#2C2A20', textColor: '#FAF3E3' },
  { slug: 'we-dont-compete-with-notebooks', title: "We Don't Compete with Notebooks", category: 'Brand', color: '#F5C13D', textColor: '#1A1612' },
  { slug: 'notebooks-of-ancient-singers', title: 'Notebooks of Ancient Singers', category: 'History', color: '#5BA8C9', textColor: '#1A1612' },
  { slug: 'margins-where-great-ideas-live', title: 'Margins: Where Great Ideas Live', category: 'History', color: '#8FB89C', textColor: '#1A1612' },
  { slug: 'the-roman-wax-tablet', title: 'The Roman Wax Tablet', category: 'History', color: '#2C2A20', textColor: '#FAF3E3' },
  { slug: 'idea-parking', title: 'Idea Parking', category: 'Method', color: '#FF6B47', textColor: '#FAF3E3' },
  { slug: 'constraint-as-creative-practice', title: 'Constraint as Creative Practice', category: 'Method', color: '#1A1612', textColor: '#FAF3E3' },
  { slug: 'the-first-page-rule', title: 'The First Page Rule', category: 'Method', color: '#F5C13D', textColor: '#1A1612' },
  { slug: 'notes-as-identity-the-corebook', title: 'Notes as Identity: The Corebook', category: 'Identity', color: '#6E3582', textColor: '#FAF3E3' },
]

const html = (essay) => `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,900;1,9..144,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background: ${essay.color};
    color: ${essay.textColor};
    font-family: 'DM Mono', monospace;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 64px 72px;
    overflow: hidden;
  }
  .category {
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.65;
  }
  .title {
    font-family: 'Fraunces', serif;
    font-weight: 900;
    font-size: 72px;
    line-height: 0.92;
    letter-spacing: -0.03em;
    max-width: 900px;
    margin-top: auto;
    padding-bottom: 48px;
  }
  .title em {
    font-style: italic;
    font-weight: 400;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1.5px solid currentColor;
    padding-top: 20px;
    opacity: 0.7;
  }
  .wordmark {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.8;
  }
</style>
</head>
<body>
  <div class="category">Pocket Notes · ${essay.category}</div>
  <div class="title">${essay.title}</div>
  <div class="footer">
    <span class="wordmark">pocketnotes.in</span>
    <div class="dot"></div>
  </div>
</body>
</html>`

async function generate() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })

  const outDir = path.join(__dirname, '../assets/images/og')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  for (const essay of essays) {
    await page.setContent(html(essay), { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({
      path: path.join(outDir, `${essay.slug}.jpg`),
      type: 'jpeg',
      quality: 92,
    })
    console.log(`✓ ${essay.slug}`)
  }

  await browser.close()
  console.log('\nDone. 19 OG images saved to assets/images/og/')
}

generate()
