"""
Fix pre-existing mojibake in essays/index.html and the-people-who-write-in-the-margins.html.
These files were originally saved as Latin-1/Windows-1252, so multi-byte UTF-8 sequences
were stored as individual Latin-1 characters. We fix by replacing the garbled sequences
with the correct HTML entities.
"""
import glob

# These are the actual corrupted byte sequences that appear literally in the files
# after being mis-decoded. Now further mangled by the entity script replacing " with &rdquo;
MOJIBAKE = [
    # em dash variants (â€" / â€" / â€&rdquo; / â€&ldquo;)
    ('â€&rdquo;', '&mdash;'),
    ('â€&ldquo;', '&mdash;'),
    ('â€"',       '&mdash;'),
    ('â€"',       '&mdash;'),
    # en dash
    ('â€"',       '&ndash;'),
    # ellipsis
    ('â€¦',       '&hellip;'),
    # curly quotes (standalone, not already handled)
    ('â€œ',       '&ldquo;'),
    ('â€',        '&rdquo;'),
    # left single quote
    ('â€˜',       '&lsquo;'),
    # right single / apostrophe variants
    ('â€™',       '&rsquo;'),
    # subscribed/unsubscribed ellipsis in JS strings
    ('â€¦',       '&hellip;'),
    # Ã– (O umlaut mojibake for Ö in ÖNB)
    ('Ã\x96',     '&Ouml;'),
    # Any remaining â€ fragments
    ('â€',        '&mdash;'),
]

for path in sorted(glob.glob('essays/*.html')):
    with open(path, encoding='utf-8') as f:
        text = f.read()
    original = text
    for bad, good in MOJIBAKE:
        text = text.replace(bad, good)
    if text != original:
        with open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(text)
        print(f"Fixed: {path}")
    else:
        print(f"Clean: {path}")

print("\nDone.")
