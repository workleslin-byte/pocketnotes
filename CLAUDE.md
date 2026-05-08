# Pocket Notes — Claude Context

## What this project is
Static HTML brand site for pocketnotes.in. A6 grid-lined pocket notebooks. Vercel hosting. No build process, no WordPress, no package.json.

## The single source of truth
- **Brand book:** `brand/index.html` — every design decision lives here. Any output that doesn't match is wrong.
- **Style bible essay:** `essays/the-people-who-write-in-the-margins.html` — full content, 876 lines. This is the HTML template AND the voice reference for all essays.
- **PRODUCT.md** — brand positioning, ICP, product specs.

## Canonical CSS tokens (use these, never deviate)
```
--cream: #FAF3E3  --bone: #F1E7CE  --paper: #ECE0BE
--ink: #1A1612    --ink-soft: #3D342A
--mustard: #F5C13D  --coral: #FF6B47  --sage: #8FB89C
--sky: #5BA8C9    --plum: #6E3582    --pink: #F26A8D
--olive: #2C2A20
--ease: cubic-bezier(0.16, 1, 0.3, 1)
--spring: cubic-bezier(0.34, 1.56, 0.64, 1)
--gut: 5vw  --max: 1280px (pages)  720px (essays)
```
**shop.html and blog.html have WRONG tokens** (`--ink: #1A1A1A`) — these need fixing.

## Cursor
Dot + ring. NOT the pixel hand cursor in shop.html. Correct implementation: `essays/the-people-who-write-in-the-margins.html` lines 71–79.

## Voice (mandatory reading before writing any copy)
- Frank, unhurried, slightly wry — never self-help, never motivational
- Specific → philosophical without announcing the transition
- Earns abstractions — never asserts them
- Short sentences = weight. Long sentences = texture.
- NEVER start with an abstract noun
- BANNED: "Elevate", "Seamless", "Unleash", "Next-Gen", "No app no battery no subscription"
- BANNED tagline: "This isn't a notebook, this is where ideas begin"
- ACTIVE tagline: "Small Books, Big Ideas"

## Products (active)
- **Founder's 500 Series** — pull specs from shop.html/PRODUCT.md only
- **Flow Series** — pull specs from shop.html/PRODUCT.md only
- **Graeco Roman Set** — REMOVED. Never mention. Never link. Remove from nav.
- **No international shipping** — India only. Remove all global shipping mentions.

## Email subscription: Sender
User has connected Sender. Build forms POSTing to `https://api.sender.net/v2/subscribers`. Placeholders: `SENDER_API_TOKEN` and `SENDER_GROUP_ID`. User provides actual values.

## Comments: Disqus
Disqus confirmed. Shortname placeholder: `pocketnotes`. User to verify in Disqus dashboard.

## URL strategy (pending full implementation)
- Remove .html extensions via vercel.json rewrites
- 301 redirects from old to new before going live
- No WP — all routing is vercel.json

## What's been built (good — do not rework without instruction)
- `index.html` — homepage (live at pocketnotes.in)
- `about.html` — about page (live)
- `essays/the-people-who-write-in-the-margins.html` — complete, style bible
- `brand/index.html` — brand book

## What needs rework (in progress)
- All 19 essay stubs — writing full content (IN PROGRESS 2026-05-06)
- `shop.html` — wrong CSS tokens, wrong cursor, wrong product listings
- `blog.html` — wrong CSS tokens, wrong cursor, needs full blog entry content
- Homepage: hero copy, illustration scale, remove founder credit, cursor fix
- About: founder's note rewrite, 8 principle links

## Spec document
Full Section 1–8 spec is in Claude memory at:
`~/.claude/projects/c--Users-ksles-OneDrive-Desktop-Projects-pocketnotes-parent/memory/project_spec.md`
