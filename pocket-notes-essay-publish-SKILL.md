---
name: pocket-notes-essay-publish
description: Check and fix the HTML format of a Pocket Notes essay before or after publishing. Use this skill whenever the user asks to "publish", "format check", "design check", or "align with the design language" for any essay. Also trigger when comparing an essay against the-page-is-a-tool or the style bible, or when the user says elements like bold, italic, pull quote, section break, drop cap, internal link, or article-tag are missing. This skill governs the HTML implementation standard — it does NOT govern writing voice or copy (that is the pocket-notes-essay skill).
---

# Pocket Notes Essay Publish & Format Check Skill

## What this skill does

Audits a Pocket Notes essay HTML file against the canonical design language, reports every gap, and fixes them. The reference standard is `essays/the-page-is-a-tool.html`. Any essay that does not match this standard is incomplete, regardless of how good the copy is.

---

## THE DESIGN REFERENCE

**File:** `essays/the-page-is-a-tool.html`
**Live:** `https://www.pocketnotes.in/essays/the-page-is-a-tool`

Read this file before running any audit. The standard lives in the file, not in memory.

---

## AUDIT CHECKLIST — run every item in order

### 1. CSS block

The `<style>` block must contain ALL of the following classes with the exact properties shown. If any are missing, add them verbatim.

**Drop cap:**
```css
.article-body .opening::first-letter {
  font-family: 'Fraunces', serif;
  font-weight: 900;
  font-size: 5.2rem;
  line-height: 0.82;
  float: left;
  margin-right: 0.1em;
  margin-top: 0.05em;
  color: var(--coral);
}
```

**Pull quote:**
```css
.pull-quote { margin:3rem 0; padding:1.8rem 2rem; border-left:4px solid var(--mustard); background:var(--bone); border-radius:0 12px 12px 0; }
.pull-quote p { font-family:'Fraunces',serif; font-style:italic; font-size:clamp(1.2rem,2.5vw,1.6rem); line-height:1.45; color:var(--ink); margin-bottom:0!important; }
.pull-quote .attr { font-family:'DM Mono',monospace; font-size:0.72rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--ink-soft); margin-top:0.9rem; display:block; font-style:normal; }
```

**Section break:**
```css
.section-break { display:block; text-align:center; margin:3.5rem 0; color:var(--mustard); font-size:1.2rem; letter-spacing:0.4em; opacity:0.8; }
```

**Article end / tags:**
```css
.article-end { margin-top:4rem; padding-top:2rem; border-top:1.5px solid rgba(26,22,18,0.15); }
.article-tags { display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:2rem; }
.article-tag { font-family:'DM Mono',monospace; font-size:0.68rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.3rem 0.8rem; border:1.5px solid var(--ink); border-radius:999px; color:var(--ink-soft); text-decoration:none; cursor:none; transition:background .2s var(--ease),color .2s var(--ease); }
.article-tag:hover { background:var(--ink); color:var(--cream); }
```

**Body base (must be on `.article-body`, not just `.article-body p`):**
```css
.article-body { font-size:1.05rem; line-height:1.8; color:var(--ink); }
.article-body p { margin-bottom:1.6rem; text-align:justify; hyphens:auto; }
```

**Body `font-size` on `<body>` element:**
```css
body { font-size:18px; /* NOT font-weight:300 */ }
```

**Mobile pull-quote override (inside the `@media (max-width: 768px)` block):**
```css
.pull-quote { margin: 2rem -1.25rem !important; padding: 1.25rem 1.25rem !important; border-radius: 0 !important; }
.pull-quote p { font-size: clamp(1.1rem, 5vw, 1.4rem) !important; }
```

---

### 2. HTML structure

The article body element must be `<div class="article-body">`, not `<article>`.

**Correct:**
```html
<div class="article-body">
```

**Wrong:**
```html
<article class="article-body">
```

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

### 9. External links

External links in the body must open in a new tab with `rel="noopener"`:

```html
<a href="https://en.wikipedia.org/wiki/..." target="_blank" rel="noopener">source name</a>
```

Link to primary sources: Wikipedia for historical context, journal URLs for papers, Goodreads/publisher pages for books. Not blog summaries or secondhand accounts.

---

### 10. References section

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

### 11. Article-end footer

After the closing `</div>` of `.article-body`, add the `.article-end` block with tag chips:

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

### 12. Read-next cards

The read-next section must show 3 essays that are topically related to the current one. Update it whenever the essay's content changes significantly. Do not leave default placeholder essays if better matches exist.

Each card needs:
- A coloured background using a brand token (`var(--mustard)`, `var(--plum)`, `var(--sky)`, `var(--coral)`, etc.)
- An inline SVG illustration (notebook, clock, or abstract shape — no photographs)
- The correct meta label: `[Category] &middot; [N] min`
- The essay title in Fraunces serif

---

### 13. Strip / CTA section

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

### 14. Metadata checks

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
