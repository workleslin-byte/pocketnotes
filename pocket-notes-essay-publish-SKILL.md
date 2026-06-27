---
name: pocket-notes-essay-publish
description: Check and fix the HTML format of a Pocket Notes essay before or after publishing. Use this skill whenever the user asks to "publish", "format check", "design check", or "align with the design language" for any essay. Also trigger when comparing an essay against five-notebooks or the style bible, or when the user says elements like bold, italic, pull quote, section break, drop cap, internal link, image, or article-tag are missing. This skill governs the HTML implementation standard — it does NOT govern writing voice or copy (that is the pocket-notes-essay skill).
---

# Pocket Notes Essay Publish & Format Check Skill

## What this skill does

Audits a Pocket Notes essay HTML file against the canonical design language, reports every gap, and fixes them. The reference standard is `essays/five-notebooks.html`. Any essay that does not match this standard is incomplete, regardless of how good the copy is.

---

## THE DESIGN REFERENCE

**File:** `essays/five-notebooks.html`
**Live:** `https://www.pocketnotes.in/essays/five-notebooks`

Read this file before running any audit. The standard lives in the file, not in memory.

---

## AUDIT CHECKLIST — run every item in order

### 1. CSS — external file only

Every essay must link to the shared stylesheet. No inline `<style>` blocks.

```html
<link rel="stylesheet" href="/assets/essay.css">
```

If an essay has an inline `<style>` block, remove it entirely and add this link. The shared file is the single source of truth for all design tokens, layout, components, and mobile overrides.

All classes below are already defined in `/assets/essay.css` — do not re-declare them inline.

All component classes are defined in `/assets/essay.css`. Reference that file for the canonical values. Key classes for reference:

- `.article-body .opening::first-letter` — coral drop cap, 5.2rem, float left
- `.pull-quote` — mustard left border, bone background, Fraunces italic
- `.pull-quote .attr` — DM Mono attribution line, optional
- `.section-break` — centred diamond glyphs `&#x2726; &nbsp; &#x2726; &nbsp; &#x2726;`
- `.article-end` + `.article-tags` + `.article-tag` — tag chips + dateline
- `.article-img` / `.article-img.portrait` — figure with border-radius, figcaption in DM Mono
- `.article-body a` — coral link, mustard underline (internal links)
- `.article-body a[target="_blank"]` — **plum** (`#6E3582`) link, plum underline (external links)

---

### 2. HTML structure

The article must be structured like `five-notebooks.html` — flat, no `<header>` wrapper:

```html
<main class="article-wrap">
  <div class="article-inner">
    <a href="/essays" class="back-link">&larr; All essays</a>

    <div class="article-eyebrow">        <!-- div, NOT p -->
      <span class="tag">Category</span>
      <span class="sep">&middot;</span>
      <span>N min read</span>
      <span class="sep">&middot;</span>
      <span>Month Year</span>
      &middot; <span class="essay-view-count" id="essayViewCount" ...>...</span>
    </div>

    <h1 class="article-title">Title with <em>Italic</em></h1>
    <p class="article-subtitle">Standfirst sentence.</p>
    <hr class="article-rule">

    <div class="article-body">
      <p class="opening">First paragraph...</p>
      ...
    </div>

    <div class="article-end">...</div>
  </div>
</main>
```

**Wrong patterns — fix these:**
- `<article class="article-body">` → `<div class="article-body">`
- `<p class="article-eyebrow">` → `<div class="article-eyebrow">`
- `<header>` wrapper around eyebrow/title/subtitle → remove it, flatten into `article-inner`

---

### 3. Drop cap — first paragraph

The first `<p>` inside `.article-body` must have `class="opening"`. Without it, the drop cap does not render.

```html
<p class="opening">First sentence of the essay...</p>
```

Only the first paragraph gets this class. Never apply it to subsequent paragraphs.

---

### 4. Section breaks

Section breaks between major essay sections use the `.section-break` span. Never use `<hr class="article-rule">` inside the article body for this purpose (that class is reserved for the rule between subtitle and body).

**Correct:**
```html
<span class="section-break">&#x2726; &nbsp; &#x2726; &nbsp; &#x2726;</span>
```

**Wrong:**
```html
<hr class="article-rule">  <!-- inside the article body -->
```

A standard essay of 800–1200 words should have 2–4 section breaks. If the essay has no section breaks, add them at natural argument pivots.

---

### 5. Pull quote

Every essay must have exactly one pull quote. Place it at the single most resonant sentence — usually a direct quote from a named person in the essay, or the essay's sharpest internal sentence.

**Pattern with attribution (external quote):**
```html
<div class="pull-quote">
  <p>&ldquo;The exact quote here.&rdquo;</p>
  <span class="attr">&mdash; Person Name, Source</span>
</div>
```

**Pattern without attribution (pulled from body):**
```html
<div class="pull-quote">
  <p>The sharpest sentence from the essay body.</p>
</div>
```

Do not use `<blockquote>` for pull quotes. That is a different element with different styling used for long indented quotations. Pull quotes use `.pull-quote`.

---

### 6. Bold (`<strong>`) accents

Every essay must have at least 3–5 uses of `<strong>` at moments of argumentative weight. These are not decorative — they mark the sentences the reader should not miss.

**Good candidates:**
- The essay's core claim stated baldly
- A counterintuitive or reversing sentence
- The closing line of a major section
- A short, emphatic declaration

**Examples from published essays:**
```html
<strong>The thinking is the writing.</strong>
<strong>The notebook that looks used is not the notebook that failed.</strong>
<strong>All of it parked. All of it used.</strong>
```

If an essay has zero `<strong>` tags, it fails this check. Add them.

---

### 7. Italic (`<em>`) accents

`<em>` has two uses:

**a) Book/film/journal titles** — always italicised:
```html
<em>Lolita</em>, <em>Tender Is the Night</em>, <em>Psychological Science</em>
```

**b) Emphasis or contrast** — used sparingly (1–3 times per essay) for a phrase the author wants to stress without making it bold:
```html
<em>Didion saved emotional texture. Nabokov saved structural fragments.</em>
```

Do not italicise for decorative effect. Every `<em>` must be either a title or a genuine stress marker.

---

### 8. Internal links

Every essay must link to at least two other essays on the site. Internal links use the coral/mustard style already defined in `.article-body a`.

**Pattern:**
```html
<a href="/essays/catch-first-edit-later">idea parking</a>
<a href="/essays/the-page-is-a-tool">the page</a>
```

Internal links should feel natural — link the phrase in the sentence that most closely relates to the target essay's argument. Do not add a sentence purely to justify a link.

**Available essays to link to:**
- `/essays/catch-first-edit-later` — capturing without judging
- `/essays/the-page-is-a-tool` — the notebook as working surface
- `/essays/the-first-page-rule` — starting ritual, first-page anxiety
- `/essays/the-method-beats-the-mood` — habit vs. inspiration
- `/essays/attention-is-physical` — focus and physicality of writing
- `/essays/constraint-as-creative-practice` — constraint as creative tool
- `/essays/notes-as-identity-the-corebook` — the notebook as identity object
- `/essays/the-index-method` — systems for organising captured material
- `/essays/two-lines-every-day` — minimum daily practice
- `/essays/why-your-notebook-should-never-be-organised` — anti-organisation argument
- `/essays/the-people-who-write-in-the-margins` — marginalia and annotation

Never link to an essay that does not yet have content (stubs). Check the file before linking.

---

### 9. Images

Every essay must have at least one image placed inside the article body. Source images from Wikimedia Commons (public domain or CC-licensed). Use the direct `upload.wikimedia.org` URL — no local copies required unless the essay already has them.

**Standard figure pattern:**
```html
<figure class="article-img">
  <img src="https://upload.wikimedia.org/wikipedia/commons/X/XX/filename.jpg"
       alt="Descriptive alt text" loading="lazy"/>
  <figcaption>Name, date, context. Public domain via Wikimedia Commons.</figcaption>
</figure>
```

**Portrait variant** (for people, tall buildings — constrains width to 330px):
```html
<figure class="article-img portrait">
  <img src="https://upload.wikimedia.org/wikipedia/commons/X/XX/filename.jpg"
       alt="..." loading="lazy"/>
  <figcaption>...</figcaption>
</figure>
```

**Placement:** After the first or second paragraph, near the passage that introduces the subject in the image. The image should illustrate a specific claim — not decorate.

**Finding images:** Search `commons.wikimedia.org` for the subject. Fetch the Commons file page to get the direct `upload.wikimedia.org` URL. Verify the licence is PD or CC before using.

---

### 10. External links — plum colour

External links (`target="_blank"`) render in **plum** (`--plum: #6E3582`) automatically via `/assets/essay.css`. Internal links render in **coral** (`--coral: #FF6B47`). This is CSS-driven — no extra class needed, just ensure:

- External links have `target="_blank" rel="noopener"`
- Internal links do NOT have `target="_blank"`

```html
<!-- External → plum -->
<a href="https://en.wikipedia.org/wiki/..." target="_blank" rel="noopener">Wikipedia</a>

<!-- Internal → coral -->
<a href="/essays/the-page-is-a-tool">thinking on the page</a>
```

Never mix these — an internal link with `target="_blank"` will accidentally render plum.

---

### 11. References section

References appear at the bottom of `.article-body`, before the closing `</div>`. They use an inline-styled `<ul>` list, not a `<p>` tag or a custom `.essay-end` class.

**Correct pattern (copy verbatim):**
```html
<div style="margin-top:3rem;padding-top:1.5rem;border-top:1px solid rgba(26,22,18,0.12)">
  <p style="font-family:'DM Mono',monospace;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink-soft);opacity:0.6;margin-bottom:0.8rem">References</p>
  <ul style="list-style:none;font-family:'DM Mono',monospace;font-size:0.72rem;color:var(--ink-soft);opacity:0.75;line-height:1.9">
    <li>Author, A. (Year). <em>Title.</em> Publisher.</li>
    <li>Author, B. &amp; Author, C. (Year). Article title. <em>Journal Name, Vol</em>(Issue), pages.</li>
  </ul>
</div>
```

If there are no verifiable references, omit the section entirely. Do not fabricate citations.

---

### 12. Article-end footer

After the closing `</div>` of `.article-body`, add the `.article-end` block with tag chips. The dateline goes here. The view counter does NOT go here — it belongs in the eyebrow (see item 14b).

```html
<div class="article-end">
  <div class="article-tags">
    <a href="/essays" class="article-tag">Method</a>
    <a href="/essays" class="article-tag">Writing</a>
    <a href="/essays" class="article-tag">Practice</a>
  </div>
  <p style="font-family:'DM Mono',monospace;font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink-soft);opacity:0.6">
    &mdash; Pocket Notes, [Month] [Year]
  </p>
</div>
```

Use 2–4 tag chips. Pull tags from: Method, Writing, Practice, History, Culture, Habit, Identity, Tools, Research.

---

### 13. Read-next cards

The read-next section must show 3 essays that are topically related to the current one. Update it whenever the essay's content changes significantly. Do not leave default placeholder essays if better matches exist.

Each card needs:
- A coloured background using a brand token (`var(--mustard)`, `var(--plum)`, `var(--sky)`, `var(--coral)`, etc.)
- An inline SVG illustration (notebook, clock, or abstract shape — no photographs)
- The correct meta label: `[Category] &middot; [N] min`
- The essay title in Fraunces serif

---

### 14. Strip / CTA section

The yellow strip at the bottom must have copy that connects to the essay's specific argument. It should not be generic.

**Pattern:**
```html
<h2 class="strip-title">[Essay-specific first line.]<br><em>[Essay-specific second line in italic.]</em></h2>
```

**Examples:**
- The page-is-a-tool: `Marked pages.<br><em>Working notebook.</em>`
- Idea parking: `Park the thought.<br><em>Come back later.</em>`

If the strip copy is generic ("Small books. Big ideas."), rewrite it to echo the essay.

---

### 15. Metadata checks

Before signing off, verify:

| Field | Where | Rule |
|-------|-------|------|
| `<meta name="description">` | `<head>` | Must NOT reference any writer/reference removed in rewrites |
| `og:description` | `<head>` | Same as above, must match current content |
| `twitter:description` | `<head>` | Same |
| `"description"` in LD+JSON | `<script type="application/ld+json">` | Same |
| `dateModified` in LD+JSON | `<script type="application/ld+json">` | Must match today's date on any edit |
| Read time in eyebrow | `<span>N min read</span>` | ~200 words per minute. Recount if copy changed significantly. |
| Month/year in eyebrow | `<span>June 2026</span>` | Must match publish/update month |
| View counter in eyebrow | `<span class="essay-view-count" id="essayViewCount" ...>` | Must be in the eyebrow (top), NOT in article-end. Pattern: `<span class="sep">&middot;</span>` then the counter span, after the date. |

---

### 16. Register the essay in the index + reconcile the count (do this for EVERY new essay)

A new essay file is not "published" until it is listed in `essays/index.html`. Three edits there, plus a count reconciliation:

1. **ESSAYS[] array** — add an entry (`{slug, title, category, subtitle, readTime}`) in alphabetical-by-slug position. This is what renders the live card.
2. **Hidden `.essay-card`** — add a block in the hidden grid carrying the `.essay-thumb` SVG (the thumbnail source the renderer reads). Then render the JPG (see the thumbnail skill).
3. **Read-next links** — point at least one existing essay's read-next at the new piece if relevant.

**Then ALWAYS run the count reconciliation — the count drifts silently otherwise:**

```bash
# true number of published essays (exclude index.html)
ls essays/*.html | grep -v '/index.html' | wc -l
# entries in the ESSAYS[] array — must equal the number above
grep -c "{slug:'" essays/index.html
# every hard-coded count string — all must equal that number
grep -rno "[0-9]\+ essays" --include=*.html .
# any essay file missing from the array?
for f in essays/*.html; do b=$(basename "$f" .html); [ "$b" = index ] && continue; grep -q "slug:'$b'" essays/index.html || echo "MISSING: $b"; done
```

Update **both** hard-coded counts in `essays/index.html` to the true file count:
- the search placeholder: `placeholder="Search N essays…"`
- the count line: `<p class="essays-count" id="essaysCount">N essays</p>`

The three numbers — file count, `ESSAYS[]` length, and every `N essays` string — must be identical before committing. (The live count is rendered from `ESSAYS[].length`, so an essay missing from the array is invisible on the index even if its file is reachable by URL.)

---

## AUDIT REPORT FORMAT

When running a format check, report findings in this structure before making any changes:

```
ESSAY FORMAT AUDIT — [essay-name]

MISSING (will be added):
- [ ] .pull-quote CSS class
- [ ] .section-break CSS class
- [ ] class="opening" on first paragraph
- [ ] <strong> bold accents (0 found, minimum 3 required)
- [ ] Pull quote block
- [ ] Internal links (0 found, minimum 2 required)

WRONG (will be corrected):
- [ ] <article class="article-body"> → <div class="article-body">
- [ ] Section breaks use <hr> instead of .section-break span
- [ ] References in <p> tags instead of <ul> list
- [ ] body { font-weight:300 } → font-size:18px

CORRECT (no changes needed):
- [x] CSS tokens (cream, ink, mustard, etc.)
- [x] Cursor implementation
- [x] Navigation structure
- [x] View counter script
```

Make all fixes in a single edit. Do not make partial fixes and ask permission unless the content changes require user input (e.g., choosing which sentence becomes the pull quote or which essays to link to).

---

## WHAT NOT TO DO

- Do not change copy, voice, or argument. This skill is format-only. If you notice copy issues, flag them separately.
- Do not invent internal links to essays that do not exist or have no content.
- Do not add `class="opening"` to any paragraph other than the first.
- Do not use `<blockquote>` for pull quotes. `.pull-quote` div only.
- Do not use `<hr class="article-rule">` inside the article body for section breaks.
- Do not leave the strip copy generic if essay-specific copy is possible.
- Do not commit without running the metadata check.
