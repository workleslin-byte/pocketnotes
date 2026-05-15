# BUILD_LOG.md — Pocket Notes
Generated: 2026-05-15

---

## 1. CURRENT FILE STRUCTURE

```
.
./.DS_Store
./.claude/settings.json
./.claude/settings.local.json
./.extract/Brand PHILOSOPHY.txt
./.extract/Brand_Launch_Kit.txt
./.extract/Founders Note.txt
./.extract/Pocket_Notebook_Brand_Story.txt
./.gitignore
./.vercel/README.txt
./.vercel/project.json
./.vercelignore
./CLAUDE.md
./PRODUCT.md
./about.html
./api/ticker.js
./api/waitlist.js
./archives.html
./assets/images/07d99903-fc7d-4e3e-a5cf-74e5cec4a96c.jpg
./assets/images/20251030_1927_Pocket Notebook Mockup_remix_01k8tpddrrep0rzz07bm33nfvv.png
./assets/images/20251030_1932_Pocket Notebook Mockup_remix_01k8tppm8xf3msdvq4z9et5z4p.png
./assets/images/20251030_1932_Pocket Notebook Mockup_remix_01k8tppm8yfq28j97esxh2vyk5.png
./assets/images/20251031_0204_Pocket Notebook Mockup_remix_01k8vd4wmnee2rn7x9bg8nvcej.png
./assets/images/20251031_0204_Pocket Notebook Mockup_remix_01k8vd4wmpef9bgprv1wb3pcr1.png
./assets/images/20251114_2240_Elegant Pocket Notebooks_remix_01ka1nd1dhea6808actayw9cka.png
./assets/images/20251114_2249_Creative Desk Workspace_remix_01ka1nybjyey7v99rak5pjysk6.png
./assets/images/A6 - 73.png
./assets/images/IMG_7393.JPG
./assets/images/IMG_7405.JPG
./assets/images/Pocketnotes Logo.jpg
./assets/images/darwin-i-think.jpg.jpeg
./assets/images/leonardo-geometric.jpg.jpeg
./assets/images/leonardo-notebook-page.jpg.jpeg
./assets/images/marginalia/img-000.png  (through img-042)
./assets/images/og/_raw_card.png
./assets/images/og/_raw_thumb.png
./assets/images/og/archives.jpg
./assets/images/og/attention-is-physical.jpg
./assets/images/og/born-of-necessity.jpg
./assets/images/og/catch-first-edit-later.jpg
./assets/images/og/constraint-as-creative-practice.jpg
./assets/images/og/constraint-sharpens.jpg
./assets/images/og/idea-parking.jpg
./assets/images/og/margins-where-great-ideas-live.jpg
./assets/images/og/notebooks-of-ancient-singers.jpg
./assets/images/og/notes-as-identity-the-corebook.jpg
./assets/images/og/the-first-page-rule.jpg
./assets/images/og/the-grid-page-and-the-wandering-thought.jpg
./assets/images/og/the-index-method.jpg
./assets/images/og/the-method-beats-the-mood.jpg
./assets/images/og/the-page-is-a-tool.jpg
./assets/images/og/the-people-who-write-in-the-margins.jpg
./assets/images/og/the-roman-wax-tablet.jpg
./assets/images/og/two-lines-every-day.jpg
./assets/images/og/we-dont-compete-with-notebooks.jpg
./assets/images/og/why-your-notebook-should-never-be-organised.jpg
./assets/og/amycoded.substack.comp10-articles-about-taste-that-are.jpg
./assets/og/bulletjournal.com.jpg
./assets/og/codelikeagirl.substack.compthe-magic-of-side-quests.jpg
./assets/og/goodsurroundings.substack.compthe-art-of-personal-taste.jpg
./assets/og/hbr.org.jpg
./assets/og/henrikkarlsson.xyzpchildhoods.jpg
./assets/og/henrikkarlsson.xyzpgood-design.jpg
./assets/og/henrikkarlsson.xyzphow-i-write.jpg
./assets/og/henrikkarlsson.xyzpsearch-query.jpg
./assets/og/kk.orgthetechnium1000-true-fans.jpg
./assets/og/locusmag.com.jpg
./assets/og/medium.comthe-year-of-the-looking-glasson-taste-part-3-d7d9f069f0b2.jpg
./assets/og/meettheartdirector.substack.compfinding-my-own-aesthetic-after-years.jpg
./assets/og/mimyglow.substack.compon-personal-style-taste-and-inspiration.jpg
./assets/og/pathlesspath.com.jpg
./assets/og/paulgraham.comgoodart.html.jpg
./assets/og/paulgraham.comgoodtaste.html.jpg
./assets/og/paulgraham.comidentity.html.jpg
./assets/og/paulgraham.comlove.html.jpg
./assets/og/paulgraham.comtaste.html.jpg
./assets/og/samuelrinko.substack.compautodidact-spotlight-2-parker-settecase.jpg
./assets/og/samuelrinko.substack.comphow-i-self-study-new-subjects-the.jpg
./assets/og/samuelrinko.substack.compmy-self-education-plan-for-fall-2025.jpg
./assets/og/substack.comhomepostp-160219815.jpg
./assets/og/thechangingroom.substack.compthe-secret-formula-to-good-taste.jpg
./assets/og/threeoutfits.substack.compthe-art-of-good-taste.jpg
./blog.html
./brand/index.html
./copy/Brand PHILOSOPHY.docx
./copy/Brand_Launch_Kit.docx
./copy/Founders Note.docx
./copy/Pocket_Notebook_Brand_Story.docx
./copy/pdf/Brand_Launch_Kit.pdf
./copy/pdf/Founders Note.pdf
./copy/pdf/Pocket_Notebook_Brand_Story.pdf
./essays/attention-is-physical.html
./essays/born-of-necessity.html
./essays/catch-first-edit-later.html
./essays/constraint-as-creative-practice.html
./essays/constraint-sharpens.html
./essays/idea-parking.html
./essays/index.html
./essays/margins-where-great-ideas-live.html
./essays/notebooks-of-ancient-singers.html
./essays/notes-as-identity-the-corebook.html
./essays/notes-as-identity.html
./essays/the-first-page-rule.html
./essays/the-grid-page-and-the-wandering-thought.html
./essays/the-index-method.html
./essays/the-method-beats-the-mood.html
./essays/the-page-is-a-tool.html
./essays/the-people-who-write-in-the-margins.html
./essays/the-roman-wax-tablet.html
./essays/two-lines-every-day.html
./essays/we-dont-compete-with-notebooks.html
./essays/why-your-notebook-should-never-be-organised.html
./index-v2.html
./index.html
./llms.txt
./package-lock.json
./package.json.bak
./robots.txt
./scripts/generate-og-images.js
./scripts/regen-og-card.js
./scripts/regen-og-single.js
./shop.html
./sitemap.xml
./vercel.json
```

**Note:** `remotion/` folder exists but excluded from listing above. Contains Remotion animation project for OG image generation.

---

## 2. ENVIRONMENT VARIABLES

No local `.env` file present. All secrets are set in Vercel dashboard only.

**Variable names required (confirmed from api/waitlist.js and api/ticker.js):**
- `UPSTASH_REDIS_REST_URL` — Upstash Redis endpoint
- `UPSTASH_REDIS_REST_TOKEN` — Upstash Redis auth token
- `RESEND_API_KEY` — Resend transactional email key
- `RESEND_WAITLIST_TEMPLATE_ID` — Resend template ID for waitlist confirmation email

---

## 3. API FUNCTIONS — CURRENT CODE

### api/waitlist.js

```js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_PRODUCTS = ['founders', 'flow', 'both'];
const NAME_RE = /^[a-zA-Z\s'\-]{2,50}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CITY_RE = /^[a-zA-Z\s\-]{2,50}$/;

function setCORS(res, origin) {
  const allowed = ['https://pocketnotes.in', 'http://localhost:3000', 'http://localhost'];
  const o = allowed.includes(origin) ? origin : 'https://pocketnotes.in';
  res.setHeader('Access-Control-Allow-Origin', o);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function kvFetch(path) {
  const URL = process.env.UPSTASH_REDIS_REST_URL;
  const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!URL || !TOKEN) return null;
  try {
    const r = await fetch(`${URL}${path}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return r.json();
  } catch (err) {
    console.error('KV fetch failed:', err.message);
    return null;
  }
}

async function checkDuplicate(email) {
  const keysData = await kvFetch('/keys/waitlist:*');
  if (!keysData) return false;
  const keys = keysData.result || [];
  for (const key of keys) {
    const valData = await kvFetch(`/get/${encodeURIComponent(key)}`);
    if (!valData) continue;
    try {
      const raw = valData.result;
      const entry = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (entry && entry.email && entry.email.toLowerCase() === email) return true;
    } catch (_) {}
  }
  return false;
}

async function kvSet(name, email, city, product_interest) {
  const key = `waitlist:${Date.now()}`;
  const value = JSON.stringify({ name, email, city, product_interest, timestamp: new Date().toISOString() });
  await kvFetch(`/set/${key}/${encodeURIComponent(value)}`);
}

async function sendEmail(cleanName, cleanEmail) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Pocket Notes <hello@pocketnotes.in>',
      to: cleanEmail,
      replyTo: 'hello@pocketnotes.in',
      subject: `${cleanName}, you just joined a short list.`,
      template: {
        id: process.env.RESEND_WAITLIST_TEMPLATE_ID,
        variables: { first_name: cleanName },
      },
    });
    if (error) {
      console.error('Resend error:', JSON.stringify(error));
    } else {
      console.log('Resend success:', data.id);
    }
  } catch (err) {
    console.error('Resend send failed:', err.message);
  }
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  setCORS(res, origin);
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  console.log('ENV CHECK:', {
    hasKvUrl: !!process.env.UPSTASH_REDIS_REST_URL,
    hasKvToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasTemplateId: !!process.env.RESEND_WAITLIST_TEMPLATE_ID,
  });

  const { name, email, city, product_interest } = req.body || {};
  // ... validation, duplicate check, kvSet, sendEmail
  return res.status(200).json({ success: true });
}
```

### api/ticker.js

Reads Upstash Redis, returns deduplicated waitlist entries for the homepage ticker.
- GET only, CORS `*`
- Deduplicates by email, then by name+city
- Returns `{ entries: [{name, city, product_interest}], total: N }` (max 20 entries)
- Has `console.error` on handler error (line 83)

### api/newsletter.js

**FILE DOES NOT EXIST.** The archives gate form POSTs to `/api/newsletter` but this endpoint has never been created. Gate submissions will silently fail (the JS wraps the fetch in try/catch and ignores errors, so the unlock still fires client-side).

---

## 4. VERCEL.JSON — CURRENT CONFIG

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    { "source": "/sitemap.xml", "headers": [{ "key": "Content-Type", "value": "application/xml" }] }
  ],
  "rewrites": [
    { "source": "/blog", "destination": "/essays" }
  ],
  "redirects": [
    { "source": "/home",       "destination": "/",     "permanent": false },
    { "source": "/index.html", "destination": "/",     "permanent": true  },
    { "source": "/about.html", "destination": "/about","permanent": true  },
    { "source": "/blog.html",  "destination": "/blog", "permanent": true  },
    { "source": "/shop.html",  "destination": "/shop", "permanent": true  },
    ... (19 essay .html → clean URL 301 redirects)
  ]
}
```

**Missing redirects:** No redirect for `/archives.html → /archives` (archives page is new, not yet added).

---

## 5. GIT LOG — LAST 40 COMMITS

```
0c9381e fix: gate after 1 article, bigger collection grid, commit og images to repo
cf48acb debug: log orbit image states
4c15848 fix(archives): image rendering, remove duplicate index, all rows visible, readability pass
165b6f7 redesign: archives — OG card flip, blur-wall gate, staggered scroll reveal, 3-col editorial layout
c836f41 redesign: archives page — 3-column theme layout, orbital image fix, gate bar, index filters, 9/10 design target
c3b9b71 feat: add archives to nav, fix archives OG image and meta tags
d1a9015 feat: add /archives page with orbital animation and gated reading collection
7564188 essay: image sizing system, portrait constraint, remove duplicate keep reading
dc5232e seo: regenerate OG image from live card illustration for WhatsApp
17bac55 essay: embed 3 historical notebook images in essay body
10322af seo: regenerate OG image with headline text for WhatsApp
45c05ef essay: real images in read-next, share block with X/FB/LinkedIn/Instagram/Substack/copy-link
6322712 essay: drop cap, progress bar, pull quote, related essays, marginalia — LitHub-level reading experience
cce6599 mobile: add scroll entrance animations
8909d3b mobile: add scroll cue chevron to hero
3299c15 seo: add JSON-LD schema markup to all pages
e5e789a seo: add llms.txt
65ccca9 seo: add robots.txt
bd9b3d6 seo: regenerate OG images from live essay cards
eb707b6 seo: add sitemap.xml
22f1b9e seo: add generated OG images for all essays
d37c5c6 feat: OG/Twitter meta tags on all essays, sitemap.xml, /blog rewrite, xml Content-Type header
a1945cc fix: posthog analytics script updated
04c7a72 fix: add posthog analytics to all pages
de3122f Refine product cards: alignment, specs, mobile, hierarchy, pills
0e9613e Fix pricing site-wide; redesign product cards on shop.html
41862c0 Mobile polish pass: index.html, shop.html, about.html
c26561c Fix cursor on shop.html, pricing on index.html, ticker loop, product copy expansion
77bf96e Convert 10 essays to dark pill nav template; fix ticker deduplication
7c49bc8 Switch KV to Upstash Redis REST API
6df385c Waitlist validation, duplicate check, counter sync, client validation
0a70826 Full rewrite: Resend SDK template + KV REST API, no ioredis
ca9a765 Fix Resend template variable name and payload field
538e935 Switch to ioredis with TLS for Redis Cloud connection
3ca90f0 Revert to inline HTML email — Resend template_id requires Node SDK
3396cb5 Switch to Resend template for waitlist confirmation email
3abad0f Improve email deliverability to reduce spam classification
2d61d4e Fix KV REST API, email, Instagram links, hamburger consistency
53cc947 Fix duplicate form copy, Instagram link, email send
1cda87e Switch KV client to ioredis, fix success copy
```

---

## 6. KNOWN ERRORS — FROM GIT HISTORY

Commits containing fix / debug / revert / broken / error / issue:

| Hash | Message |
|------|---------|
| `0c9381e` | fix: gate after 1 article, bigger collection grid, commit og images to repo |
| `cf48acb` | **debug: log orbit image states** ← debug console.log still present in archives.html |
| `4c15848` | fix(archives): image rendering, remove duplicate index, all rows visible, readability pass |
| `c836f41` | redesign: archives page — orbital image fix, gate bar, index filters |
| `a1945cc` | fix: posthog analytics script updated |
| `04c7a72` | fix: add posthog analytics to all pages |
| `0e9613e` | Fix pricing site-wide; redesign product cards on shop.html |
| `c26561c` | Fix cursor on shop.html, pricing on index.html, ticker loop |
| `77bf96e` | fix ticker deduplication |
| `7c49bc8` | Switch KV to Upstash Redis REST API ← previous KV approach broken |
| `6df385c` | Waitlist validation, duplicate check, counter sync, client validation |
| `0a70826` | Full rewrite: Resend SDK template + KV REST API, no ioredis ← ioredis approach abandoned |
| `ca9a765` | Fix Resend template variable name and payload field |
| `538e935` | Switch to ioredis with TLS for Redis Cloud connection |
| `3ca90f0` | **Revert** to inline HTML email — Resend template_id requires Node SDK |
| `3396cb5` | Switch to Resend template for waitlist confirmation email |
| `3abad0f` | Improve email deliverability to reduce spam classification |
| `2d61d4e` | Fix KV REST API, email, Instagram links, hamburger consistency |
| `53cc947` | Fix duplicate form copy, Instagram link, email send |
| `1cda87e` | Switch KV client to ioredis, fix success copy |

---

## 7. ARCHIVES PAGE STATE

| Check | Result |
|-------|--------|
| Orbital animation JS exists | **YES** — `initOrbits()` function present |
| Inner ring card count | **8** cards |
| Outer ring card count | **11** cards |
| img src pattern | `img.src = '/assets/og/' + filename` (JS property, not HTML attribute) |
| `loading="eager"` | **YES** — set via `img.loading = 'eager'` in JS |
| `transform-style: preserve-3d` | **YES** — on `.card-inner` |
| `overflow: hidden` on card face | **YES** — on `.card-face` (known interaction: cancels preserve-3d in some browsers; images currently 404ing from Vercel — deployed at wrong path) |
| Article row class names | `.article-row` only |
| Gate/unlock trigger | `#gateBtn` click → `unlock()` function |
| `.col-gate` in HTML | **YES** — 3 blocks (one per column, after first row) |

**Outstanding image issue:** Images were all returning 404 on the deployed site because `assets/og/` was never committed to git. Fixed in commit `0c9381e` — folder now tracked. Vercel deploy after that commit should resolve all 404s. However, debug `console.log` statements from commit `cf48acb` are **still present** in archives.html at lines 1222–1225.

---

## 8. CURRENT DEBUG / CONSOLE STATEMENTS

### archives.html (lines 1219–1228) — SHOULD BE REMOVED
```js
// Added in commit cf48acb for orbit image debugging
setTimeout(() => {
  const imgs = document.querySelectorAll('.orbit-card img')
  console.log('Total orbit images found:', imgs.length)
  imgs.forEach((img, i) => {
    console.log(i, img.src, img.complete,
      img.naturalWidth, img.getBoundingClientRect())
  })
}, 2000)
```

### api/waitlist.js — INTENTIONAL (server-side logging, acceptable)
- Line 28: `console.error('KV fetch failed:', err.message)`
- Line 68: `console.error('Resend error:', JSON.stringify(error))`
- Line 70: `console.log('Resend success:', data.id)`
- Line 73: `console.error('Resend send failed:', err.message)`
- Line 90: `console.log('ENV CHECK:', {...})` ← **should be removed from production**

### api/ticker.js — INTENTIONAL
- Line 83: `console.error('Ticker handler error:', err)`

---

## 9. ASSET INVENTORY

### assets/images/og/ — Essay OG images (for meta tags)
```
_raw_card.png, _raw_thumb.png
archives.jpg
attention-is-physical.jpg
born-of-necessity.jpg
catch-first-edit-later.jpg
constraint-as-creative-practice.jpg
constraint-sharpens.jpg
idea-parking.jpg
margins-where-great-ideas-live.jpg
notebooks-of-ancient-singers.jpg
notes-as-identity-the-corebook.jpg
the-first-page-rule.jpg
the-grid-page-and-the-wandering-thought.jpg
the-index-method.jpg
the-method-beats-the-mood.jpg
the-page-is-a-tool.jpg
the-people-who-write-in-the-margins.jpg
the-roman-wax-tablet.jpg
two-lines-every-day.jpg
we-dont-compete-with-notebooks.jpg
why-your-notebook-should-never-be-organised.jpg
```

### assets/og/ — Archives orbital tile images (external article OG screenshots)
```
amycoded.substack.comp10-articles-about-taste-that-are.jpg
bulletjournal.com.jpg
codelikeagirl.substack.compthe-magic-of-side-quests.jpg
goodsurroundings.substack.compthe-art-of-personal-taste.jpg
hbr.org.jpg
henrikkarlsson.xyzpchildhoods.jpg
henrikkarlsson.xyzpgood-design.jpg
henrikkarlsson.xyzphow-i-write.jpg
henrikkarlsson.xyzpsearch-query.jpg
kk.orgthetechnium1000-true-fans.jpg
locusmag.com.jpg
medium.comthe-year-of-the-looking-glasson-taste-part-3-d7d9f069f0b2.jpg
meettheartdirector.substack.compfinding-my-own-aesthetic-after-years.jpg
mimyglow.substack.compon-personal-style-taste-and-inspiration.jpg
pathlesspath.com.jpg
paulgraham.comgoodart.html.jpg
paulgraham.comgoodtaste.html.jpg
paulgraham.comidentity.html.jpg
paulgraham.comlove.html.jpg
paulgraham.comtaste.html.jpg
samuelrinko.substack.compautodidact-spotlight-2-parker-settecase.jpg
samuelrinko.substack.comphow-i-self-study-new-subjects-the.jpg
samuelrinko.substack.compmy-self-education-plan-for-fall-2025.jpg
substack.comhomepostp-160219815.jpg
thechangingroom.substack.compthe-secret-formula-to-good-taste.jpg
threeoutfits.substack.compthe-art-of-good-taste.jpg
```

### assets/images/orbit/ — DOES NOT EXIST
### assets/images/essays/ — DOES NOT EXIST

---

## 10. PACKAGE DEPENDENCIES

**Root package.json:** Does not exist (static HTML site — no build process).

`package.json.bak` is present (from a previous Node experiment — not active).

**remotion/package.json** (OG image generation tool — not deployed to Vercel):
```json
{
  "name": "pocketnotes-remotion",
  "version": "1.0.0",
  "scripts": {
    "start": "remotion studio src/index.jsx",
    "render": "remotion render src/index.jsx NotebookAnimation out/notebook-animation.mp4"
  },
  "dependencies": {
    "@remotion/cli": "4.0.290",
    "@remotion/google-fonts": "^4.0.290",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "remotion": "4.0.290"
  }
}
```

---

## OUTSTANDING ISSUES SUMMARY

| Priority | Issue | File | Fix |
|----------|-------|------|-----|
| HIGH | `api/newsletter.js` does not exist — archives gate silently fails on server | — | Create `api/newsletter.js` (subscribe to Sender/Resend) |
| HIGH | Debug `console.log` still in archives.html (lines 1219–1228) | archives.html | Remove the setTimeout debug block |
| MED | `console.log('ENV CHECK:')` in waitlist.js fires on every submission in production | api/waitlist.js | Remove or guard with `process.env.NODE_ENV !== 'production'` |
| MED | No 301 redirect for `/archives.html → /archives` in vercel.json | vercel.json | Add redirect entry |
| MED | Two duplicate asset folders: `assets/images/og/` (essay OGs) and `assets/og/` (archives tile OGs) — confusing naming | — | Consider consolidating or documenting the split |
| LOW | `overflow: hidden` on `.card-face` cancels `transform-style: preserve-3d` in some browsers — card flip may not work in Safari | archives.html | Remove overflow:hidden from card-face, clip via border-radius on card-inner instead |
| LOW | `index-v2.html` is an orphan file — not linked anywhere | index-v2.html | Delete or integrate |
| LOW | `notes-as-identity.html` and `notes-as-identity-the-corebook.html` both exist — possible duplicate | essays/ | Audit and consolidate |
