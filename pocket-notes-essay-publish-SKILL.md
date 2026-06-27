---
name: pocket-notes-essay-publish
description: Governs the HTML format of every Pocket Notes essay. Use this skill whenever the user asks to "publish", "format check", "design check", or "align with the design language" for any essay. Also trigger when the user says elements like bold, italic, pull quote, section break, drop cap, internal link, image, or article-tag are missing. This skill governs HTML implementation only — it does NOT govern writing voice or copy (that is the pocket-notes-essay skill). Do NOT read other essay files for reference — this skill is the complete, self-contained specification.
---

# Pocket Notes Essay Publish & Format Check Skill

## What this skill does

Audits a Pocket Notes essay HTML file against the canonical design language, reports every gap, and fixes them. Every rule and every code pattern needed is written out in this file. **Do not read any other essay file for reference. This skill is the single source of truth.**

---

## COMPLETE HTML BOILERPLATE

When writing a new essay from scratch, use this exact boilerplate. Copy verbatim and fill in the essay-specific fields.

### HEAD — copy verbatim, fill in `[SLUG]`, `[TITLE]`, `[DESCRIPTION]`, `[DATE_PUBLISHED]`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>[TITLE] &mdash; Pocket Notes</title>
<meta name="description" content="[DESCRIPTION]"/>
<meta property="og:title" content="[TITLE] &mdash; Pocket Notes"/>
<meta property="og:description" content="[DESCRIPTION]"/>
<meta property="og:url" content="https://pocketnotes.in/essays/[SLUG]"/>
<meta property="og:type" content="article"/>
<meta property="og:site_name" content="Pocket Notes"/>
<meta property="og:image" content="https://pocketnotes.in/assets/images/og/[SLUG].jpg"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta name="twitter:image" content="https://pocketnotes.in/assets/images/og/[SLUG].jpg"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="[TITLE] &mdash; Pocket Notes"/>
<meta name="twitter:description" content="[DESCRIPTION]"/>
<link rel="canonical" href="https://pocketnotes.in/essays/[SLUG]"/>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='8' y='4' width='18' height='24' rx='2' fill='%23FAF3E3' stroke='%231A1612' stroke-width='2.5'/%3E%3Crect x='6' y='4' width='4' height='24' fill='%23F5C13D' stroke='%231A1612' stroke-width='2.5'/%3E%3C/svg%3E"/>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[TITLE]",
  "description": "[DESCRIPTION]",
  "url": "https://pocketnotes.in/essays/[SLUG]",
  "image": "https://pocketnotes.in/assets/images/og/[SLUG].jpg",
  "datePublished": "[DATE_PUBLISHED]",
  "dateModified": "[TODAY_ISO]",
  "author": {
    "@type": "Person",
    "name": "Leslin",
    "url": "https://www.pocketnotes.in/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Pocket Notes",
    "url": "https://pocketnotes.in",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.pocketnotes.in/assets/images/og-default.jpg"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://pocketnotes.in/essays/[SLUG]"
  }
}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;700&display=swap"></noscript>
<link rel="stylesheet" href="/assets/essay.css">
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZYV54KY1F1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ZYV54KY1F1');
</script>
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="Mi Ri init Vi Gi Rr Wi Ji Bi capture calculateEventProperties tn register register_once register_for_session unregister unregister_for_session an getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync un identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty nn Xi createPersonProfile setInternalOrTestUser sn Hi cn opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Ki debug Lr rn getPageViewId captureTraceFeedback captureTraceMetric Di".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_vnyLFVa6a9jCQzBdYNXG8m5hDDYWFiTEQBuPMxzmcmqy', {
        api_host: 'https://us.i.posthog.com',
        defaults: '2026-01-30',
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true
    })
</script>
<!-- pn-mobile-layer -->
<meta name="theme-color" content="#1A1612">
<link rel="stylesheet" href="/assets/mobile.css">
</head>
```

### BODY OPEN — cursor + nav — copy verbatim

```html
<body>
<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-ring" id="cursorRing"></div>

<div class="nav-mobile-menu" id="navMobileMenu" role="dialog" aria-label="Navigation menu">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/shop">Shop</a>
  <a href="/essays">Essays</a>
  <a href="/archives">Archives</a>
</div>

<nav aria-label="Main navigation">
  <a href="/" class="nav-logo"><span class="nav-logo-dot" aria-hidden="true"></span><span>Pocket Notes</span></a>
  <ul class="nav-links">
    <li><a href="/shop">Shop</a></li>
    <li><a href="/essays" class="active">Essays</a></li>
    <li><a href="/about">About</a></li>
  </ul>
  <a href="/shop" class="nav-cta">See the notebooks &nearr;</a>
  <button class="nav-hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
```

### ARTICLE MAIN — fill in essay-specific fields

`[CATEGORY]` = one word: Thinking / Practice / Habit / Method / History / Culture  
`[N]` = read time in minutes (~200 wpm)  
`[MONTH YEAR]` = e.g. June 2026  
`[TITLE]` = H1 text, use `<em>` on one key phrase  
`[SUBTITLE]` = one or two sentence standfirst

```html
<main class="article-wrap">
  <div class="article-inner">

    <a href="/essays" class="back-link">&larr; All essays</a>

    <div class="article-eyebrow">
      <span class="tag">[CATEGORY]</span>
      <span class="sep">&middot;</span>
      <span>[N] min read</span>
      <span class="sep">&middot;</span>
      <span>[MONTH YEAR]</span>
      &middot; <span class="essay-view-count" id="essayViewCount" aria-label="reads"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg><span id="viewCountNum"><span class="view-shimmer"></span></span></span>
    </div>

    <h1 class="article-title">[TITLE with <em>Italic phrase</em>]</h1>

    <p class="article-subtitle">[SUBTITLE — one or two sentences, states the argument, sets up a tension]</p>

    <hr class="article-rule">

    <div class="article-body">

      <p class="opening">[FIRST PARAGRAPH — gets drop cap]</p>

      [... essay body — see checklist below for required components ...]

      <div style="margin-top:3rem;padding-top:1.5rem;border-top:1px solid rgba(26,22,18,0.12)">
        <p style="font-family:'DM Mono',monospace;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink-soft);opacity:0.6;margin-bottom:0.8rem">References</p>
        <ul style="list-style:none;font-family:'DM Mono',monospace;font-size:0.72rem;color:var(--ink-soft);opacity:0.75;line-height:1.9">
          <li>Author, A. (Year). <em>Title.</em> Publisher.</li>
        </ul>
      </div>

    </div>

    <div class="article-end">
      <div class="article-tags">
        <a href="/essays" class="article-tag">[Tag1]</a>
        <a href="/essays" class="article-tag">[Tag2]</a>
        <a href="/essays" class="article-tag">[Tag3]</a>
      </div>
      <p style="font-family:'DM Mono',monospace;font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink-soft);opacity:0.6">
        &mdash; Pocket Notes, [Month Year]
      </p>
    </div>

  </div><!-- /article-inner -->
</main>
```

### SUBSCRIBE SECTION — copy verbatim (no changes ever)

```html
<section class="subscribe-section">
  <div class="subscribe-inner">
    <p class="subscribe-eyebrow">The newsletter</p>
    <h2 class="subscribe-title">Two lines,<br>every <em>two weeks.</em></h2>
    <p class="subscribe-blurb">New essays, quiet philosophy. Only when there&rsquo;s something worth saying.</p>
    <form class="subscribe-form" id="subscribeForm">
      <input type="email" class="subscribe-input" placeholder="your@email.com" required aria-label="Email address" id="emailInput">
      <button type="submit" class="subscribe-btn">Subscribe &nearr;</button>
    </form>
    <p class="subscribe-note" id="subscribeNote">No tracking &middot; No spam &middot; Unsubscribe anytime</p>
  </div>
</section>
```

### READ-NEXT SECTION — 3 cards, essay-specific

Pick 3 topically related published essays (use the list in section 8). Each card has a coloured background and an inline SVG. Three stock SVG options — use the one that best fits the essay being linked to:

**SVG A — notebook with spine (use for writing/habit essays):**
```html
<svg width="60%" height="60%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="38" width="100" height="130" rx="5" fill="#FAF3E3" stroke="#1A1612" stroke-width="2.5"/>
  <rect x="50" y="38" width="11" height="130" fill="#F5C13D"/>
  <line x1="72" y1="75" x2="138" y2="75" stroke="#1A1612" stroke-width="1.5" opacity="0.3"/>
  <line x1="72" y1="90" x2="130" y2="90" stroke="#1A1612" stroke-width="1.5" opacity="0.25"/>
  <line x1="72" y1="105" x2="134" y2="105" stroke="#1A1612" stroke-width="1.5" opacity="0.2"/>
</svg>
```

**SVG B — abstract screen/phone shape (use for attention/digital essays):**
```html
<svg width="60%" height="60%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="70" width="120" height="60" rx="6" fill="#FAF3E3" stroke="#ECE0BE" stroke-width="1.5"/>
  <circle cx="70" cy="100" r="16" fill="#FF6B47" opacity=".4"/>
  <rect x="94" y="90" width="55" height="5" rx="1" fill="#3D342A" opacity=".3"/>
  <rect x="94" y="103" width="43" height="5" rx="1" fill="#3D342A" opacity=".2"/>
</svg>
```

**SVG C — circle/shape (use for thinking/identity/culture essays):**
```html
<svg width="60%" height="60%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="80" cy="100" r="30" fill="#FF6B47" opacity=".5"/>
  <rect x="120" y="86" width="60" height="5" rx="1" fill="#1A1612" opacity=".4"/>
  <rect x="120" y="99" width="48" height="5" rx="1" fill="#1A1612" opacity=".3"/>
  <rect x="120" y="112" width="55" height="5" rx="1" fill="#1A1612" opacity=".25"/>
</svg>
```

**Card colours — vary across the 3 cards, pick from:**
`#F5C13D` (mustard) · `#5BA8C9` (sky) · `#8FB89C` (sage) · `#FF6B47` (coral) · `#6E3582` (plum)

**Full read-next structure:**
```html
<section class="read-next">
  <div class="read-next-inner">
    <p class="read-next-label">Read next</p>
    <div class="read-next-grid">

      <a href="/essays/[SLUG-1]" class="read-next-card">
        <div class="read-next-img" style="background:#F5C13D;">
          [SVG A, B, or C]
        </div>
        <p class="read-next-meta">[Category] &middot; [N] min</p>
        <p class="read-next-title">[Essay title.]</p>
      </a>

      <a href="/essays/[SLUG-2]" class="read-next-card">
        <div class="read-next-img" style="background:#5BA8C9;">
          [SVG A, B, or C]
        </div>
        <p class="read-next-meta">[Category] &middot; [N] min</p>
        <p class="read-next-title">[Essay title.]</p>
      </a>

      <a href="/essays/[SLUG-3]" class="read-next-card">
        <div class="read-next-img" style="background:#8FB89C;">
          [SVG A, B, or C]
        </div>
        <p class="read-next-meta">[Category] &middot; [N] min</p>
        <p class="read-next-title">[Essay title.]</p>
      </a>

    </div>
  </div>
</section>
```

### STRIP / CTA — essay-specific copy

The first line is a short statement. The second line (in `<em>`) echoes the essay's argument. Both lines must connect to the essay — never generic.

```html
<section class="strip">
  <div class="strip-inner">
    <h2 class="strip-title">[Essay-specific line.]<br><em>[Essay-specific line in italic.]</em></h2>
    <div class="strip-action">
      <a href="/shop" class="strip-button">See the notebooks &nearr;</a>
      <p class="strip-note">A6 &middot; 5mm grid &middot; Made in India</p>
    </div>
  </div>
</section>
```

**Examples of good strip copy:**
- Born of Necessity: `The tool that<br><em>gets out of the way.</em>`
- We Don't Compete: `Seven seconds.<br><em>Every time.</em>`
- Two Lines Every Day: `Write two lines.<br><em>Then stop.</em>`

### FOOTER — copy verbatim (no changes ever)

```html
<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <h3 class="footer-brand-title">Pocket<br><em>Notes</em></h3>
      <p>A capture device for fast thinkers. Small grid notebooks, made in India, for people who already write.</p>
    </div>
    <div class="footer-col">
      <h4>The notebooks</h4>
      <ul>
        <li><a href="/shop">Founder&rsquo;s 500</a></li>
        <li><a href="/shop">Flow Series</a></li>
        <li><a href="/about">About us</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Say hello</h4>
      <ul>
        <li><a href="mailto:hello@pocketnotes.in">hello@pocketnotes.in</a></li>
        <li><a href="/essays">From the notebook</a></li>
        <li><a href="https://www.instagram.com/pocketnotes__?igsh=czh5NGJvNnB6eDJx&utm_source=qr" target="_blank" rel="noopener">Instagram &nearr;</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 Pocket Notes</span>
    <span>Small Books, Big Ideas &middot; Made in India</span>
  </div>
</footer>
```

### BODY CLOSE — copy verbatim

```html
<script defer src="/assets/essay.js"></script>
<!-- pn-mobile-layer -->
<script defer src="/assets/mobile.js"></script>
</body>
</html>
```

---

## AUDIT CHECKLIST — run every item in order

### 1. CSS — external file only

Every essay must link to the shared stylesheet. No inline `<style>` blocks allowed anywhere in the file.

```html
<link rel="stylesheet" href="/assets/essay.css">
```

If an essay has an inline `<style>` block, remove it entirely and add this link. Key classes provided by `/assets/essay.css`:

- `.article-body .opening::first-letter` — coral drop cap, large float-left initial
- `.pull-quote` — mustard left border, bone background, Fraunces italic
- `.pull-quote .attr` — DM Mono attribution line
- `.section-break` — centred diamond glyphs
- `.article-end` + `.article-tags` + `.article-tag` — tag chips + dateline
- `.article-img` / `.article-img.portrait` — figure with border-radius, DM Mono figcaption
- `.article-body a` — coral (`#FF6B47`) link, mustard underline (internal links)
- `.article-body a[target="_blank"]` — plum (`#6E3582`) link, plum underline (external links)
- `.essay-view-count` + `.view-shimmer` — view counter with shimmer loading state
- All nav, subscribe, read-next, strip, footer styles

---

### 2. HTML structure — flat, no `<header>` wrapper

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
      &middot; <span class="essay-view-count" id="essayViewCount" aria-label="reads">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        <span id="viewCountNum"><span class="view-shimmer"></span></span>
      </span>
    </div>

    <h1 class="article-title">Title with <em>Italic phrase</em></h1>
    <p class="article-subtitle">Standfirst sentence.</p>
    <hr class="article-rule">

    <div class="article-body">
      <p class="opening">First paragraph...</p>
      ...body...
    </div>

    <div class="article-end">...</div>
  </div>
</main>
```

**Wrong patterns — fix immediately:**
- `<article class="article-body">` → `<div class="article-body">`
- `<p class="article-eyebrow">` → `<div class="article-eyebrow">`
- `<header>` wrapper around eyebrow/title/subtitle → remove it, flatten directly into `article-inner`
- `<div class="essay-end">` → `<div class="article-end">` (different class name)

---

### 3. Drop cap — first paragraph only

```html
<p class="opening">First sentence of the essay...</p>
```

Only the very first `<p>` inside `.article-body` gets this class. Never apply to subsequent paragraphs.

---

### 4. Section breaks

Use `.section-break` span between major sections. Never use `<hr>` inside the article body.

```html
<span class="section-break">&#x2726; &nbsp; &#x2726; &nbsp; &#x2726;</span>
```

A standard 800–1200 word essay should have 2–4 section breaks. Add them at natural argument pivots if missing.

---

### 5. Pull quote — exactly one per essay

The essay's sharpest sentence, isolated for emphasis. Place it at the most resonant moment.

**With attribution (named external quote):**
```html
<div class="pull-quote">
  <p>&ldquo;The exact quote here.&rdquo;</p>
  <span class="attr">&mdash; Person Name, <em>Source</em>, Year</span>
</div>
```

**Without attribution (pulled from body):**
```html
<div class="pull-quote">
  <p>The sharpest internal sentence from the essay.</p>
</div>
```

Never use `<blockquote>` for pull quotes.

---

### 6. Bold (`<strong>`) accents — minimum 3, maximum 5

Mark sentences the reader must not miss. Good candidates: the core claim stated baldly, a counterintuitive reversal, the closing line of a major section, a short emphatic declaration.

```html
<strong>The thinking is the writing.</strong>
<strong>Availability is not a minor advantage. It is the condition that makes all other advantages possible.</strong>
<strong>A notebook that feels too good to use does not get used.</strong>
```

Zero `<strong>` tags = essay fails this check. Add them.

---

### 7. Italic (`<em>`) accents

Two uses only:

**Book/journal/film titles:**
```html
<em>An Autobiography</em>, <em>Principles of Psychology</em>, <em>Lippincott's Magazine</em>
```

**Stress emphasis** (1–3 per essay, genuine stress only):
```html
writing on the move in <em>transit</em>, not at a desk
```

Do not italicise for decoration.

---

### 8. Internal links — minimum 2 per essay

Internal links render coral (`#FF6B47`) automatically. Do NOT add `target="_blank"` to internal links.

```html
<a href="/essays/attention-is-physical">the phone becomes the default</a>
<a href="/essays/two-lines-every-day">caught at all</a>
```

Link the phrase in the sentence that most closely relates to the target essay's argument. Do not add a sentence purely to create a link.

**Published essays available to link to (these have content — use only from this list):**
- `/essays/born-of-necessity` — why the pocket notebook format survived; form follows function
- `/essays/two-lines-every-day` — minimum daily practice; the two-line floor
- `/essays/attention-is-physical` — phone vs. paper; focus and physicality of writing
- `/essays/catch-first-edit-later` — capture without judging; park the thought
- `/essays/the-page-is-a-tool` — the notebook as working surface, not archive
- `/essays/the-first-page-rule` — starting ritual, first-page anxiety
- `/essays/the-method-beats-the-mood` — habit vs. inspiration
- `/essays/the-people-who-write-in-the-margins` — marginalia and annotation
- `/essays/why-your-notebook-should-never-be-organised` — anti-organisation argument
- `/essays/the-index-method` — systems for organising captured material
- `/essays/we-dont-compete-with-notebooks` — availability vs. preciousness; the gap between thought and page

Do not link to any essay not in this list — it may be a stub with no content.

---

### 9. Images — at least one per essay

Source from Wikimedia Commons (public domain or CC). Use the direct `upload.wikimedia.org` URL. Search `commons.wikimedia.org`, fetch the file page to get the direct URL.

**Standard (landscape or square):**
```html
<figure class="article-img">
  <img src="https://upload.wikimedia.org/wikipedia/commons/X/XX/filename.jpg"
       alt="Descriptive alt text" loading="lazy"/>
  <figcaption>Subject, date, context. Public domain via Wikimedia Commons.</figcaption>
</figure>
```

**Portrait variant** (people, tall buildings — constrains width to ~330px):
```html
<figure class="article-img portrait">
  <img src="https://upload.wikimedia.org/wikipedia/commons/X/XX/filename.jpg"
       alt="..." loading="lazy"/>
  <figcaption>...</figcaption>
</figure>
```

Place after the first or second paragraph, near the passage that introduces the subject shown. Image must illustrate a specific claim — not decorate.

---

### 10. External links — plum colour (automatic)

External links render plum (`#6E3582`) via `/assets/essay.css` using the `a[target="_blank"]` selector. No extra class needed. Rules:

- External links → `target="_blank" rel="noopener"` (renders plum)
- Internal links → no `target="_blank"` (renders coral)

```html
<!-- External → plum automatically -->
<a href="https://www.online-literature.com/..." target="_blank" rel="noopener"><em>An Autobiography</em></a>

<!-- Internal → coral automatically -->
<a href="/essays/the-page-is-a-tool">the page as a working surface</a>
```

Never add `target="_blank"` to internal links — it will accidentally render them plum.

---

### 11. References section

At the bottom of `.article-body`, before its closing `</div>`. Omit entirely if there are no verifiable citations. Do not fabricate citations.

```html
<div style="margin-top:3rem;padding-top:1.5rem;border-top:1px solid rgba(26,22,18,0.12)">
  <p style="font-family:'DM Mono',monospace;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink-soft);opacity:0.6;margin-bottom:0.8rem">References</p>
  <ul style="list-style:none;font-family:'DM Mono',monospace;font-size:0.72rem;color:var(--ink-soft);opacity:0.75;line-height:1.9">
    <li>Author, A. (Year). <em>Title.</em> Publisher.</li>
    <li>Author, B. &amp; Author, C. (Year). Article title. <em>Journal, Vol</em>(Issue), pages.</li>
  </ul>
</div>
```

---

### 12. Article-end footer

After the closing `</div>` of `.article-body`. View counter goes in the eyebrow, NOT here.

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

Use 2–4 tags from: Method, Writing, Practice, History, Culture, Habit, Identity, Tools, Research, Thinking.

---

### 13. Read-next cards

See full pattern in the boilerplate above. Three cards, topically related, from the published list in section 8. Use the three stock SVGs from the boilerplate — do not invent new SVGs. Vary card background colours.

---

### 14. Strip / CTA

See full pattern in the boilerplate above. Copy must be essay-specific. If it reads "Small books. Big ideas." or any other generic text, rewrite it.

---

### 15. Metadata checks

| Field | Where | Rule |
|-------|-------|------|
| `<meta name="description">` | `<head>` | Must match current essay content |
| `og:description` | `<head>` | Same |
| `twitter:description` | `<head>` | Same |
| `"description"` in LD+JSON | `<script type="application/ld+json">` | Same |
| `dateModified` in LD+JSON | `<script type="application/ld+json">` | Must equal today's date (ISO: YYYY-MM-DD) |
| `datePublished` in LD+JSON | `<script type="application/ld+json">` | Original publish date — do not change on edits |
| Read time in eyebrow | `<span>N min read</span>` | ~200 wpm. Recount if copy changed significantly. |
| Month/year in eyebrow | `<span>June 2026</span>` | Must match publish/update month |
| View counter | `<span class="essay-view-count" id="essayViewCount">` | Must be in the eyebrow (top), NOT in article-end |

---

### 16. Register the essay in the index + reconcile the count (every new essay)

A new essay is not published until it appears in `essays/index.html`:

1. **ESSAYS[] array** — add `{slug:'[slug]', title:"[Title]", category:'[Category]', subtitle:"[Subtitle]", readTime:'N min'}` in alphabetical-by-slug order.
2. **Hidden `.essay-card`** — add a block in the hidden grid with the `.essay-thumb` SVG.
3. **Read-next in related essays** — update at least one related essay's read-next to point at the new piece.

**Count reconciliation (run every time):**

```bash
ls essays/*.html | grep -v '/index.html' | wc -l
grep -c "{slug:'" essays/index.html
grep -rno "[0-9]\+ essays" --include=*.html .
for f in essays/*.html; do b=$(basename "$f" .html); [ "$b" = index ] && continue; grep -q "slug:'$b'" essays/index.html || echo "MISSING: $b"; done
```

Update both hard-coded counts in `essays/index.html`:
- `placeholder="Search N essays…"`
- `<p class="essays-count" id="essaysCount">N essays</p>`

All three numbers (file count, `ESSAYS[]` length, hard-coded strings) must match.

---

## AUDIT REPORT FORMAT

Report before making any changes:

```
ESSAY FORMAT AUDIT — [essay-name]

MISSING (will be added):
- [ ] image (Wikimedia Commons)
- [ ] class="opening" on first paragraph
- [ ] section breaks (0 found, minimum 2 required)
- [ ] <strong> bold accents (0 found, minimum 3 required)
- [ ] pull quote block
- [ ] internal links (0 found, minimum 2 required)

WRONG (will be corrected):
- [ ] <article class="article-body"> → <div class="article-body">
- [ ] <p class="article-eyebrow"> → <div class="article-eyebrow">
- [ ] <header> wrapper → flatten into article-inner
- [ ] inline <style> block → remove, link /assets/essay.css
- [ ] <blockquote> for pull quote → <div class="pull-quote">

CORRECT (no changes needed):
- [x] external CSS link
- [x] nav structure
- [x] view counter in eyebrow
- [x] references section
```

Make all fixes in a single write. Do not make partial fixes and ask permission unless the content changes require user input (e.g. choosing which sentence becomes the pull quote).

---

## WHAT NOT TO DO

- Do not read other essay files for reference. This skill contains everything needed.
- Do not change copy, voice, or argument. Format-only. Flag copy issues separately.
- Do not link to essays not in the published list (section 8).
- Do not add `class="opening"` to any paragraph other than the first.
- Do not use `<blockquote>` for pull quotes.
- Do not use `<hr class="article-rule">` inside the article body.
- Do not leave strip copy generic.
- Do not commit without running the metadata check (section 15).
