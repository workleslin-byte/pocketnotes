---
name: pocket-notes-thumbnail
description: Design distinctive, on-brand thumbnail / OG images for Pocket Notes essays. Use this skill whenever the user asks to create, redesign, fix, or vary an essay thumbnail, card image, cover, or OG/social image — or says the thumbnails "look the same", "samey", "repetitive", "generic", or need "versatility" or "variety". This skill governs the visual design of essay imagery; it does NOT govern essay copy (pocket-notes-essay) or page HTML format (pocket-notes-essay-publish).
---

# Pocket Notes Thumbnail & OG Image Skill

## What this skill does

Designs the square-ish illustration that becomes both (a) the card thumbnail on the essays index and (b) the OG/social share image. One artwork, two jobs. The goal: every essay reads as visually distinct at a glance while staying unmistakably Pocket Notes. The thumbnail should carry the *essence of that specific essay*, and is allowed — encouraged — to deviate in composition based on the essay's character.

This skill is design-only. It does not change essay copy.

---

## THE PIPELINE — how a thumbnail actually gets made (read first)

The system is already wired. Do not invent a new one. Edit inside it.

```
1. SOURCE OF TRUTH  →  essays/index.html
   Each essay has a hidden <a class="essay-card">…</a> block containing
   <div class="essay-thumb" style="background:var(--token);">
       <svg viewBox="0 0 300 225"> … the artwork … </svg>
   </div>
   (The visible cards are rendered by JS from the ESSAYS[] array and just
    point an <img> at the generated JPG — so the SVG is the real artwork.)

2. GENERATOR  →  scripts/generate-og-images.js   (Puppeteer)
   - Opens essays/index.html
   - For each slug, reads .essay-thumb innerHTML + its background colour
   - Wraps it in a 1200×630 frame with a text strip (category · title · wordmark)
   - Screenshots to a JPG

3. OUTPUT  →  assets/images/og/<slug>.jpg   (1200×630)
   Used BY BOTH:
   - essays/index.html buildCard():  imgSrc = /assets/images/og/<slug>.jpg
   - the essay page itself:          og:image / twitter:image meta tags

REGENERATE after any SVG edit:
   node scripts/generate-og-images.js
   (requires: npm i puppeteer — it is a dev-only dependency)
```

### FORMAT REALITY — verified June 2026 (read before regenerating)
The deployed `assets/images/og/*.jpg` are **inconsistent** and the generator is **stale**:
- **Canonical good format** = `the-people-who-write-in-the-margins.jpg`: **1200×630, motif centred on a flat category-colour ground, NO text strip.** Match this.
- Most other on-disk JPGs are old, tiny, uneven card-screenshots (~357×235, 357×251…). They predate the canonical format.
- `scripts/generate-og-images.js` outputs a **different** look — a bottom title/category text strip — which does **not** match the canonical deployed image. Running it as-is rebuilds **all 19** slugs into that divergent strip format. Do not run it for a one-essay change until the script is reconciled to the motif-only format.

### Rendering one image without the full script (preferred for single-essay reworks)
Puppeteer is not required — Windows ships Chromium (Edge/Chrome). Render just the one slug at 1200×630, motif-only:
```bash
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"   # or msedge.exe
# Build an HTML: 1200x630, body bg = the ground hex, the <svg viewBox="0 0 300 225"> centred at ~720px wide.
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --screenshot="<abs>/og.png" "file:///<abs>/frame.html"
# Then JPG it (PIL is available):
python -c "from PIL import Image; Image.open(r'<abs>/og.png').convert('RGB').save('assets/images/og/<slug>.jpg','JPEG',quality=92)"
```
Note: Git Bash `/tmp` maps to `C:/Users/<user>/AppData/Local/Temp`; pass Chrome an **absolute Windows** `file:///C:/...` URL or it errors `ERR_FILE_NOT_FOUND`.

**Consequences you must respect:**
- The artwork lives in `essays/index.html`. That is where you edit. Each new essay needs a matching `.essay-thumb` block added there (and its slug added to the `slugs[]` array in the generator).
- The SVG is authored at `viewBox="0 0 300 225"` but the OG renders at 1200×630 and the card crops to ~16:9. **Keep the meaningful content inside the central safe area** — roughly the middle 80% horizontally and vertically — so nothing important is cropped in either context.
- One file serves social + card. Design for legibility at card size (~360px wide) AND at full OG size.

---

## THE SAMENESS PROBLEM — diagnosis (this is what we are fixing)

The current thumbnails repeat one formula ~15 times:

> flat single-colour fill  +  one centred translucent rectangle ("notebook")  +  a few horizontal lines  +  a circle/dot accent, all at `opacity: .2–.5`.

That formula is both monotonous **and off-brand**. It violates the brand book's own illustration law (below): it uses opacity-shading instead of solid fills, 1–1.5px strokes instead of 3px, no faces, no hand-drawn curve, and the same dead-centre composition every time.

The fix is two moves, applied together:
1. **Return to brand law** — solid warm fills, 3px strokes, a face, one hand-drawn curve.
2. **Vary the composition and motif per essay** — using the framework below.

---

## BRAND LAW — non-negotiable (verbatim from `brand/index.html` → Illustration)

Every thumbnail must obey:

1. **3px stroke, every line.** The stroke weight is what makes geometry feel hand-drawn. Never 1px (clinical), never 5px (cartoon). At the 300×225 authoring scale use `stroke-width="3"`.
2. **Warm palette only, solid fills.** Primary fills: cream, mustard, coral. Illustration-only accents: sage, sky, plum, pink. **Never gradients. Never opacity tricks for shading.** If you want a lighter shade, use a different solid token — do not drop opacity.
3. **Geometry first, then one curve.** Build from rectangles and circles, then add a *single* hand-drawn curve (a swoosh, a loop, an underline) to soften it. Discipline + warmth in one move.
4. **Vary the noun — never default to the page/notebook rectangle.** The cream rounded rectangle is the easiest shape to reach for and the fastest road back to sameness. Earn it; don't default to it. See *Motif diversity* in Decision 2.

**No faces (retired).** Earlier thumbnails put dot-eyes on the hero object. That device has been retired as repetitive — **do not add eyes or faces.** Personality now comes from the motif choice and the single hand-drawn curve.

**Banned outright:** gradients, photoreal imagery, generic/Lucide-style icon sets, faces/eyes/mascots, stock photography, drop shadows, blur.

**Type, when used as image:** Fraunces (serif) for any display letterform; DM Mono for labels/marginalia. Never set body type into a thumbnail.

---

## VERSATILITY FRAMEWORK — the core of this skill

For each essay, make four decisions in order. The combination is what produces variety. Two essays should rarely share the same *motif + composition + colour* triple.

### Decision 1 — Extract the essence
Read the essay (or its `subtitle` in the `ESSAYS[]` array as a shortcut). Answer in one phrase: *what is the single image this essay leaves in the mind?* Examples:
- *Idea Parking* → a thought set down to wait → a card/note resting, a parking marker.
- *The Roman Wax Tablet* → an ancient stylus pressing wax → the object itself, aged.
- *Two Lines Every Day* → tiny repeated marks accumulating → tally / streak.
- *Notes as Identity* → the notebook as a mirror/portrait → a book with a face that is *yours*.

The essence drives the motif. Do not default to "a notebook with lines."

### Decision 2 — Pick the motif (what object/mark is drawn)
Use the brand motif library (below) when one fits the essence. Invent a new motif when the essence demands it — but build it under brand law (geometry + 3px + one curve, no face). The motif is the *noun* of the image.

**Motif diversity — avoid the rectangle trap.** Almost every essay is *about* notebooks/pages, so the cream rounded rectangle is the path of least resistance — and reaching for it every time rebuilds the exact sameness we removed. Defend against it:
- **Prefer a non-page noun.** Reach for the *instrument, consequence, or metaphor* before the page: a lyre, compass, metronome, magnet, flame, stylus, tally, thread, pointing hand (manicule), portrait frame, numeral.
- **Budget the rectangle.** Across any run of ~4 adjacent thumbnails, at most one may use a page/notebook/card as the hero. Just drew one? The next must use a different family.
- **If a page is unavoidable, change the framing.** Go macro (we're *on* the page, edges off-frame), show only a corner/fragment, imply it via the ground colour instead of drawing it, or use a *different* rectangle-family object (phone, wax tablet, pocket, index card, sign) so it doesn't read as "the notebook" again.
- **Keep the motif ledger** in Worked Examples current — record each thumb's noun so you can see repetition coming before it ships.

### Decision 3 — Pick the composition archetype (HOW it's arranged)
**This is the main versatility lever.** The old set was 100% "centred". Rotate through these instead — pick the one that best fits the essay's feeling:

| Archetype | Layout | Feels like | Good for |
|-----------|--------|-----------|----------|
| **Centred hero** | one object, dead centre, breathing room | calm, definitive | manifesto / definition essays |
| **Rule-of-thirds** | hero offset to a third, negative space opposite | editorial, modern | most method essays |
| **Edge-bleed / cropped** | object runs off one edge, partially shown | intimate, in-progress | "catch first", drafts, fragments |
| **Diagonal / dynamic** | motif on a 12–20° tilt, motion line | energetic, fast | speed, capture, momentum |
| **Repetition / grid** | one mark repeated across the field | accumulation, habit | daily-practice, streaks, index |
| **Scene / vignette** | 2–3 objects in spatial relationship | narrative, historical | history essays, anecdotes |
| **Macro detail** | one zoomed fragment (a corner, a nib, a staple) | tactile, material | "form" essays, the object itself |
| **Type-led** | a Fraunces letterform/numeral is the hero, motif secondary | bold, conceptual | abstract concepts, numbers ("two", "first") |

Vary the archetype across adjacent essays so the index never shows two identical layouts in a row.

### Decision 4 — Pick the colour (background + fills)
Background colour follows the essay's **category** (keeps the index legible by section), drawn from `CAT_COLORS` in `essays/index.html`:

```
Method  #FF6B47 (coral)   History #6E3582 (plum)   Culture #8FB89C (sage)
Practice#5BA8C9 (sky)     Habit   #F5C13D (mustard) Design  #F26A8D (pink)
Identity#4A5238 (olive)   Thinking#1A1A1A (ink)
```
Then choose 2–3 **solid** fill tokens that sit well on that background (light objects on dark grounds; ink/plum objects on light grounds). Maintain contrast — the hero object must be clearly readable at card size. Never tint with opacity to get a mid-shade; switch tokens instead.

---

## BRAND MOTIF LIBRARY (from the brand book)

Reach for these first; each already maps to an essay type:

| Motif | Use for |
|-------|---------|
| Lyre with note | memory, song, oral-tradition essays |
| Compass on grid | grid-page essays, structure-under-chaos |
| Open book | reading, study, book-pairing |
| Margin bracket | margins essays, annotation, side-thoughts |
| Staple binding | form essays, the notebook itself |
| Star with dot | section breaks, punctuation, "where ideas live" |
| Two tally marks | two-lines-a-day, daily habit |
| First-page flame | first-page rule, ugly-draft |
| Constraint box | constraint as creative practice |
| Wandering spiral | grid page and the wandering thought |

The dot-and-ring (the site cursor) and the mustard **spine** (the notebook's coloured edge) are signature Pocket Notes marks — use them as recurring accents to tie the set together even as compositions vary.

---

## SVG SKELETON — author at 300×225, brand-compliant

```html
<div class="essay-thumb" style="background:var(--sky);">
  <svg width="80%" height="80%" viewBox="0 0 300 225" xmlns="http://www.w3.org/2000/svg">
    <!-- full-bleed background = the category colour -->
    <rect width="300" height="225" fill="#5BA8C9"/>

    <!-- HERO OBJECT: solid fill, 3px ink stroke, offset per composition archetype -->
    <rect x="96" y="64" width="120" height="104" rx="6"
          fill="#FAF3E3" stroke="#1A1612" stroke-width="3"/>
    <!-- mustard spine (signature accent) -->
    <rect x="96" y="64" width="20" height="104" rx="3"
          fill="#F5C13D" stroke="#1A1612" stroke-width="3"/>

    <!-- ONE hand-drawn curve (brand law #3) -->
    <path d="M148 120 Q161 130 174 120" fill="none"
          stroke="#1A1612" stroke-width="3" stroke-linecap="round"/>

    <!-- optional motif accent in a second solid token -->
    <circle cx="244" cy="52" r="9" fill="#FF6B47" stroke="#1A1612" stroke-width="3"/>
  </svg>
</div>
```

Rules in code form: every `stroke-width` is `3`. No `opacity` attributes for shading. No face/eyes. Every fill is a brand hex. Compose off-centre when the archetype calls for it. This skeleton draws a page only as a neutral placeholder — per Brand Law #4, prefer a non-page noun.

---

## WORKFLOW — shipping a thumbnail

1. Identify the essay slug and its category.
2. Run Decisions 1–4 (essence → motif → composition → colour). State them in one line before drawing, so the choice is reviewable.
3. Author the SVG under brand law inside the essay's `.essay-thumb` block in `essays/index.html`. For a brand-new essay, add the full hidden `.essay-card` block AND add the slug to `slugs[]` in `scripts/generate-og-images.js` and to `ESSAYS[]` if not present.
4. Sanity-check against the audit checklist below.
5. Regenerate with the canonical renderer (no puppeteer needed):
   - one/some: `node scripts/render-thumbs.mjs <slug> [<slug> ...]`
   - the whole set, in parallel: `node scripts/render-thumbs.mjs --all`
   It reads the SVG straight from `index.html`, renders motif-only 1200×630 via the system Chrome/Edge, and writes the JPG (overwriting the old one). One file serves both the card thumbnail and the `og:image` preview, so this updates both at once. (The old `scripts/generate-og-images.js` produces a divergent title-strip format — prefer `render-thumbs.mjs`.)
6. Confirm each JPG updated in `assets/images/og/<slug>.jpg` and is visually distinct from its neighbours.
7. Commit the `index.html` SVG change(s) and the regenerated JPG(s) together.

When redesigning the whole set for variety, lay out the chosen *archetype + colour* for every essay first as a table, confirm no two neighbours collide, then implement.

---

## AUDIT CHECKLIST — before regenerating

```
BRAND LAW
[ ] Every stroke-width is 3 (no 1px/1.5px clinical lines)
[ ] Zero opacity-based shading; all fills are solid brand hexes
[ ] No faces/eyes anywhere (retired)
[ ] Exactly one hand-drawn curve softens the geometry
[ ] No gradients, photos, generic icons, mascots, shadows, blur
[ ] Colours are from the token set

VERSATILITY
[ ] Composition archetype chosen on purpose (not auto-centred)
[ ] Motif reflects THIS essay's essence (not a default notebook)
[ ] Noun is NOT a page/notebook rectangle — or it's the only one in the last ~4 thumbs AND the framing is changed
[ ] Differs in motif/composition/ground from adjacent essays
[ ] Signature mark present (mustard spine or dot+ring) to unify the set

TECHNICAL
[ ] Content sits inside the central safe area (survives 16:9 + 1.9:1 crops)
[ ] Reads clearly at ~360px card width AND full 1200×630
[ ] slug present in generator slugs[] and in ESSAYS[]
[ ] Regenerated the JPG; committed SVG + JPG together
```

---

## WORKED EXAMPLES — the four decisions in practice

Keep this list current as thumbnails are reworked. Each entry is the reviewable one-liner from Workflow step 2, plus the resulting design. Use these as precedent so the set stays varied and no two neighbours collide.

> **Note:** the "face on the object" device used in the first June 2026 Method batch has since been **retired** (see Brand Law). Those early entries still mention eyes as a historical record; new thumbnails omit them.

**Motif ledger (nouns used — keep diverse, watch the rectangle budget):** compass, spark+card, sharpened pencil, parked note (card), index cards, worked page · lyre, grid+wandering line, manicule (pointing hand), wax tablet, constraint brackets, margin rule+idea, chaos scribble, magnet, numeral "1", metronome, tally marks, shirt pocket, portrait oval, phone+receipt · five book-spines on a shelf.

> **Deliberate rectangle exception — Five Notebooks (`five-notebooks`, Method).** When the essay's subject *is* notebooks, spend the rectangle budget on purpose, but defeat sameness another way: five spines in the five brand colours (mustard/coral/sage/sky/plum), varied heights, on a bone shelf — a *collection* framing, not "the cream notebook" again. The tallest (plum = the Corebook) carries the bookmark ribbon + dot+ring so it reads as the climax. This is the sanctioned way to draw notebooks without regressing to the old formula.

### Notes as Identity (`notes-as-identity`, Method)
- **Essence:** notes are the compass you carry — a fixed record of *where you stood*.
- **Motif:** a compass made personal — needle drawn as a **pencil**, pivot is the signature **dot+ring**, dial carries a face (the compass is *you*), a **north-star** marks "what you were willing to bet on."
- **Composition:** rule-of-thirds — compass lower-left, pencil-needle pointing diagonally up-right to the north-star in the opposite third. Replaces the old dead-centre concentric rings.
- **Colour:** solid olive `#2C2A20` ground — a **deliberate deviation from the category=colour default** (Method would be coral). Chosen because coral/sky/sage grounds had become repetitive across the set; deep olive is barely used and suits the grounded "where you stood" essence. Solid fills that pop on olive: cream dial, plum pencil-needle, mustard north-star + pivot dot + eraser, coral spark, ink strokes/eyes, cream swing-curve.
- **One curve:** a cream trajectory arc from the needle tip toward the north-star = the swing of orientation.
- **Why it's distinct:** neighbours use translucent notebooks/rings on common grounds; this is a solid olive compass on rule-of-thirds — different motif, composition, ground, and treatment.

> **Lesson for the set:** category=colour is the *default* for index legibility, but you may override the ground when the common grounds (coral/sky/sage/plum/mustard) have become repetitive. When you deviate, pick a barely-used solid token that fits the essence, and let motif + composition carry the category signal.

### Rest of the Method group (June 2026) — varied grounds + motifs, no two alike
| Essay | Essence → motif | Composition | Ground |
|-------|-----------------|-------------|--------|
| catch-first-edit-later | catch the spark before it cools → coral spark + trail caught by a page (dot+ring = the catch) | diagonal | sky `#5BA8C9` |
| constraint-sharpens | brevity sharpens → a pencil sharpened to a point + a shaving curl | tilted hero | coral `#FF6B47` |
| idea-parking | a thought parked to wait → a note card in a parking bay + a Fraunces "P" sign | rule-of-thirds | mustard `#F5C13D` |
| the-index-method | retrieval via linked cards → fanned index cards + a coral connecting thread | scene/stack | plum `#6E3582` |
| the-page-is-a-tool | the page worked, not pristine → a used page with marks + a looping arrow | macro (we're on the page) | ink `#1A1612` |

> **Set-building tip:** assign grounds so the category never shows two identical backgrounds adjacent. Across the six Method thumbs the grounds are olive / sky / coral / mustard / plum / ink — all distinct. Each carries the signature spine or dot+ring so the set still reads as one family.

---

## WHAT NOT TO DO

- Do not edit the JPGs directly. They are build artifacts — edit the SVG and regenerate.
- Do not reach for the old "translucent notebook + lines" formula. It is the thing we are removing.
- Do not use `opacity` to fake a lighter shade. Switch to a lighter solid token.
- Do not centre every composition. Rotate archetypes.
- Do not skip regeneration after an SVG edit — the live site reads the JPG, so an un-regenerated change is invisible.
- Do not introduce a colour outside the brand tokens, or a stroke weight other than 3.
- Do not add faces/eyes — the device is retired.
- Do not default to the cream page/notebook rectangle. It is the new sameness risk; vary the noun (Brand Law #4, Decision 2).
