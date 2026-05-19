"""
One-pass fix for all essay HTML files:
1. Strip UTF-8 BOM
2. Replace special chars with HTML entities
3. Replace old view counter CSS with new matching CSS
4. Replace old view counter HTML with new separator-prefixed HTML
"""
import glob, re

# ── Entity replacements ──────────────────────────────────────────────────────
ENTITIES = [
    ('·', '&middot;'),
    ('—', '&mdash;'),
    ('–', '&ndash;'),
    ('←', '&larr;'),
    ('→', '&rarr;'),
    ('↑', '&uarr;'),
    ('“', '&ldquo;'),
    ('”', '&rdquo;'),
    ('’', '&rsquo;'),
    ('…', '&hellip;'),
]

# ── Old view counter CSS (exact block to replace) ───────────────────────────
OLD_CSS = """/* ── View counter ── */
.essay-view-count {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--ink-soft);
  opacity: 0.55;
  cursor: default;
  transition: opacity 0.2s ease;
  user-select: none;
}
.essay-view-count:hover { opacity: 0.9; }
.essay-view-count svg {
  width: 13px;
  height: 13px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}
.view-shimmer {
  display: inline-block;
  width: 28px;
  height: 2px;
  background: var(--ink);
  opacity: 0.15;
  border-radius: 1px;
  animation: vshimmer 1.1s ease-in-out infinite;
  vertical-align: middle;
}
@keyframes vshimmer {
  0%, 100% { opacity: 0.1; }
  50%       { opacity: 0.28; }
}"""

NEW_CSS = """/* ── View counter ── */
.essay-view-count {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink);
  opacity: 0.6;
  cursor: default;
  user-select: none;
}
.essay-view-count svg {
  width: 12px;
  height: 12px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
  opacity: 0.6;
}
.view-shimmer {
  display: inline-block;
  width: 22px;
  height: 1.5px;
  background: var(--ink);
  opacity: 0.2;
  border-radius: 1px;
  animation: vshimmer 1.1s ease-in-out infinite;
  vertical-align: middle;
}
@keyframes vshimmer {
  0%, 100% { opacity: 0.12; }
  50%       { opacity: 0.28; }
}"""

# ── Old view counter HTML ────────────────────────────────────────────────────
# Match the multiline span that was inserted, with optional leading whitespace
OLD_HTML_RE = re.compile(
    r'\s*<span class="essay-view-count" id="essayViewCount" aria-label="reads">\s*'
    r'<svg viewBox="0 0 24 24" aria-hidden="true">\s*'
    r'<path d="[^"]+"/>\s*'
    r'<circle[^/]*/>\s*'
    r'</svg>\s*'
    r'<span id="viewCountNum"><span class="view-shimmer"></span></span>\s*'
    r'</span>',
    re.DOTALL
)

NEW_HTML = ('&middot; <span class="essay-view-count" id="essayViewCount" aria-label="reads">'
            '<svg viewBox="0 0 24 24" aria-hidden="true">'
            '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>'
            '<circle cx="12" cy="12" r="3"/>'
            '</svg>'
            '<span id="viewCountNum"><span class="view-shimmer"></span></span>'
            '</span>')

# ── Process each file ────────────────────────────────────────────────────────
for path in sorted(glob.glob('essays/*.html')):
    with open(path, 'rb') as f:
        raw = f.read()

    # Step 1: strip BOM
    bom_stripped = False
    if raw.startswith(b'\xef\xbb\xbf'):
        raw = raw[3:]
        bom_stripped = True

    try:
        text = raw.decode('utf-8')
    except UnicodeDecodeError as e:
        print(f"  ENCODING ERROR: {e}")
        continue

    original = text

    # Step 2: entity replacements
    for char, entity in ENTITIES:
        text = text.replace(char, entity)

    # Step 3: CSS swap
    if OLD_CSS in text:
        text = text.replace(OLD_CSS, NEW_CSS)
        css_swapped = True
    else:
        css_swapped = False

    # Step 4: HTML structure fix
    html_match = OLD_HTML_RE.search(text)
    if html_match:
        text = OLD_HTML_RE.sub('\n' + NEW_HTML, text)
        html_fixed = True
    else:
        html_fixed = False

    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(text)

    flags = []
    if bom_stripped: flags.append('BOM stripped')
    if text != original and not bom_stripped: flags.append('entities replaced')
    if css_swapped: flags.append('CSS swapped')
    if html_fixed: flags.append('HTML fixed')
    if not flags: flags.append('no changes')
    print(f"{path}: {', '.join(flags)}")

print("\nDone.")
