"""
Fix blog.html view counter:
1. Replace old CSS block with new spec CSS
2. Add feat-view-count to featured card
3. Remove orphan <p class="post-view-count"> elements
4. Embed inline span inside each post-meta with correct data-slug
5. Fix JS to target the correct elements
"""
import re

with open('blog.html', encoding='utf-8') as f:
    text = f.read()

# ── 1. Replace old CSS block ────────────────────────────────────────────────
OLD_CSS = """  .post-view-count {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.06em;
    color: var(--ink);
    opacity: 0.45;
    margin-bottom: 0.5rem;
  }
  .post-view-count svg {
    width: 11px; height: 11px;
    stroke: currentColor; fill: none;
    stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round;
    flex-shrink: 0;
  }
  .post-view-shimmer {
    display: inline-block; width: 22px; height: 2px;
    background: var(--ink); opacity: 0.2; border-radius: 1px;
    animation: pvshimmer 1.1s ease-in-out infinite; vertical-align: middle;
  }
  @keyframes pvshimmer { 0%,100%{opacity:0.1;} 50%{opacity:0.28;} }"""

NEW_CSS = """  .post-view-count {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink);
    opacity: 0.6;
    margin-left: 0.5em;
  }
  .post-view-count svg {
    width: 11px;
    height: 11px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    flex-shrink: 0;
  }
  .feat-view-count {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--coral);
    margin-left: 0.5em;
  }
  .feat-view-count svg {
    width: 11px;
    height: 11px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    flex-shrink: 0;
  }
  .view-card-shimmer {
    display: inline-block;
    width: 18px;
    height: 1.5px;
    background: currentColor;
    opacity: 0.25;
    border-radius: 1px;
    animation: vcshimmer 1.1s ease-in-out infinite;
    vertical-align: middle;
  }
  @keyframes vcshimmer {
    0%, 100% { opacity: 0.12; }
    50%       { opacity: 0.3; }
  }"""

assert OLD_CSS in text, "OLD_CSS not found — check for whitespace changes"
text = text.replace(OLD_CSS, NEW_CSS)
print("CSS replaced")

# ── 2. Add feat-view-count to featured card ──────────────────────────────────
OLD_FEAT = '<p class="featured-meta">New \xb7 History \xb7 11 min read</p>'
NEW_FEAT = ('<p class="featured-meta">New &middot; History &middot; 11 min read '
            '<span class="feat-view-count" data-slug="the-people-who-write-in-the-margins">'
            '<svg viewBox="0 0 24 24" aria-hidden="true">'
            '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>'
            '<circle cx="12" cy="12" r="3"/>'
            '</svg>'
            '<span class="view-card-shimmer"></span>'
            '</span></p>')

# Also try entity version
OLD_FEAT_ENT = '<p class="featured-meta">New &middot; History &middot; 11 min read</p>'

if OLD_FEAT in text:
    text = text.replace(OLD_FEAT, NEW_FEAT)
    print("Featured card updated (unicode middot)")
elif OLD_FEAT_ENT in text:
    text = text.replace(OLD_FEAT_ENT, NEW_FEAT)
    print("Featured card updated (entity middot)")
else:
    # Find it dynamically
    m = re.search(r'<p class="featured-meta">([^<]+)</p>', text)
    if m:
        old = m.group(0)
        new = old[:-4] + (' <span class="feat-view-count" data-slug="the-people-who-write-in-the-margins">'
                          '<svg viewBox="0 0 24 24" aria-hidden="true">'
                          '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>'
                          '<circle cx="12" cy="12" r="3"/>'
                          '</svg>'
                          '<span class="view-card-shimmer"></span>'
                          '</span></p>')
        text = text.replace(old, new)
        print(f"Featured card updated (regex): {old[:60]}")
    else:
        print("WARNING: featured-meta not found")

# ── 3. Slug map: post-meta content → (slug, inline span) ────────────────────
SVG = ('<svg viewBox="0 0 24 24" aria-hidden="true">'
       '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>'
       '<circle cx="12" cy="12" r="3"/></svg>')

def make_span(slug):
    return (f'<span class="post-view-count" data-slug="{slug}">'
            f'{SVG}<span class="view-card-shimmer"></span></span>')

# Map card anchor href → slug (source of truth)
# Build by parsing: find each <a href="essays/X.html" class="post ..."> then its post-meta
card_slugs = {
    'Technique · 5 min read':   'the-index-method',
    'History · 8 min read':     'notebooks-of-ancient-singers',
    'Philosophy · 6 min':       'why-your-notebook-should-never-be-organised',
    'Technique · 4 min':        'the-grid-page-and-the-wandering-thought',
    'History · 10 min':         'the-roman-wax-tablet',
    'Ritual · 4 min':           'two-lines-every-day',
    'Method · 5 min (first)':   'the-first-page-rule',
    'Philosophy · 7 min':       'constraint-as-creative-practice',
    'Founder · 9 min':          'notes-as-identity-the-corebook',
    'History · 6 min':          'margins-where-great-ideas-live',
    'Method · 5 min (second)':  'idea-parking',
}

# ── 4. Remove orphan <p class="post-view-count">...</p> lines ───────────────
orphan_re = re.compile(
    r'\n\s*<p class="post-view-count"><svg[^<]*<path[^/]*/><circle[^/]*/></svg>'
    r'<span class="pvc-num"><span class="post-view-shimmer"></span></span></p>'
)
before = len(orphan_re.findall(text))
text = orphan_re.sub('', text)
print(f"Removed {before} orphan post-view-count <p> elements")

# ── 5. Inject inline span into post-meta, matched by surrounding card href ──
# Strategy: for each card anchor, find its post-meta and append the span

card_data = [
    ('essays/the-index-method.html',                       'Technique',  '5 min read', 'the-index-method'),
    ('essays/notebooks-of-ancient-singers.html',           'History',    '8 min read', 'notebooks-of-ancient-singers'),
    ('essays/why-your-notebook-should-never-be-organised.html', 'Philosophy', '6 min', 'why-your-notebook-should-never-be-organised'),
    ('essays/the-grid-page-and-the-wandering-thought.html','Technique',  '4 min',      'the-grid-page-and-the-wandering-thought'),
    ('essays/the-roman-wax-tablet.html',                   'History',    '10 min',     'the-roman-wax-tablet'),
    ('essays/two-lines-every-day.html',                    'Ritual',     '4 min',      'two-lines-every-day'),
    ('essays/the-first-page-rule.html',                    'Method',     '5 min',      'the-first-page-rule'),
    ('essays/constraint-as-creative-practice.html',        'Philosophy', '7 min',      'constraint-as-creative-practice'),
    ('essays/notes-as-identity-the-corebook.html',         'Founder',    '9 min',      'notes-as-identity-the-corebook'),
    ('essays/margins-where-great-ideas-live.html',         'History',    '6 min',      'margins-where-great-ideas-live'),
    ('essays/idea-parking.html',                           'Method',     '5 min',      'idea-parking'),
]

for href, category, duration, slug in card_data:
    # Find the anchor for this card, then find the first post-meta after it
    anchor_pos = text.find(f'href="{href}"')
    if anchor_pos == -1:
        print(f"WARNING: anchor not found for {href}")
        continue
    # Find the post-meta paragraph within the next ~800 chars
    chunk_start = anchor_pos
    chunk_end = anchor_pos + 1200
    chunk = text[chunk_start:chunk_end]
    # Build a regex that matches the post-meta line without an already-appended span
    meta_pattern = re.compile(
        r'(<p class="post-meta">[^<]*</p>)',
        re.DOTALL
    )
    m = meta_pattern.search(chunk)
    if not m:
        print(f"WARNING: post-meta not found for {slug}")
        continue
    old_meta = m.group(1)
    if 'data-slug' in old_meta:
        print(f"Already patched: {slug}")
        continue
    # Close tag: strip </p>, append span, re-close
    new_meta = old_meta[:-4] + ' ' + make_span(slug) + '</p>'
    # Replace only within this card's section (replace first occurrence after anchor)
    abs_pos = chunk_start + m.start()
    text = text[:abs_pos] + new_meta + text[abs_pos + len(old_meta):]
    print(f"Injected span: {slug}")

# ── 6. Replace old JS fetcher with new one ──────────────────────────────────
OLD_JS = """  /* ── Essay view counts ── */
  (function() {
    var cards = document.querySelectorAll('[data-slug] .pvc-num');
    if (!cards.length) return;
    cards.forEach(function(el) {
      var slug = el.closest('[data-slug]').dataset.slug;
      if (!slug) return;
      fetch('/api/view?slug=' + slug)
        .then(function(r) { return r.json(); })
        .then(function(d) { el.textContent = d.count + ' reads'; })
        .catch(function() { el.textContent = ''; });
    });
  })();"""

NEW_JS = """  /* ── View counts on essay cards ── */
  (function() {
    var allCards = Array.from(document.querySelectorAll('[data-slug]'));
    if (!allCards.length) return;

    allCards.forEach(function(span) {
      var slug = span.getAttribute('data-slug');
      fetch('/api/view?slug=' + slug)
        .then(function(r) { return r.json(); })
        .then(function(d) {
          var shimmer = span.querySelector('.view-card-shimmer');
          if (shimmer) shimmer.remove();
          span.insertAdjacentText('beforeend', d.count + ' reads');
        })
        .catch(function() {
          var shimmer = span.querySelector('.view-card-shimmer');
          if (shimmer) shimmer.remove();
        });
    });
  })();"""

if OLD_JS in text:
    text = text.replace(OLD_JS, NEW_JS)
    print("JS fetcher replaced")
else:
    print("WARNING: old JS not found — appending new JS before </script>")
    # Append before last </script>
    last_script = text.rfind('</script>')
    text = text[:last_script] + '\n' + NEW_JS + '\n' + text[last_script:]

with open('blog.html', 'w', encoding='utf-8', newline='\n') as f:
    f.write(text)

print("\nblog.html written.")
