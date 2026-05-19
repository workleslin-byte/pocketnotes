import glob, os, re

replacements = [
    ('·', '&middot;'),
    ('—', '&mdash;'),
    ('–', '&ndash;'),
    ('→', '&rarr;'),
    ('←', '&larr;'),
    ('↑', '&uarr;'),
    ('↓', '&darr;'),
    ('↗', '&nearr;'),
    ('“', '&ldquo;'),
    ('”', '&rdquo;'),
    ('‘', '&lsquo;'),
    ('’', '&rsquo;'),
    ('…', '&hellip;'),
    (' ', '&nbsp;'),
]

# These patterns must NOT be entity-replaced (JS string literals in textContent)
# We'll restore them after replacement
JS_ELLIPSIS_RE = re.compile(r"(textContent\s*=\s*['\"][^'\"]*?)&hellip;(['\"])")

files = sorted(glob.glob('essays/*.html'))
print(f"Processing {len(files)} essay files...")

for path in files:
    with open(path, 'rb') as f:
        raw = f.read()
    bom_stripped = False
    if raw.startswith(b'\xef\xbb\xbf'):
        raw = raw[3:]
        bom_stripped = True

    try:
        text = raw.decode('utf-8')
    except UnicodeDecodeError as e:
        print(f"  ERROR decoding {path}: {e}")
        continue

    original = text
    for char, entity in replacements:
        text = text.replace(char, entity)

    # Restore ellipsis inside JS string literals
    text = JS_ELLIPSIS_RE.sub(r'\1…\2', text)

    changed = text != original
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)

    flags = []
    if bom_stripped: flags.append('BOM stripped')
    if changed: flags.append('entities replaced')
    if not flags: flags.append('clean')
    print(f"  {os.path.basename(path)}: {', '.join(flags)}")

print("\nDone.")
