import os, glob

for path in glob.glob('essays/*.html'):
    with open(path, 'rb') as f:
        raw = f.read()
    # Strip UTF-8 BOM if present
    if raw.startswith(b'\xef\xbb\xbf'):
        raw = raw[3:]
        print(f"Stripped BOM: {path}")
    # Verify it decodes cleanly as UTF-8
    try:
        text = raw.decode('utf-8')
    except UnicodeDecodeError as e:
        print(f"ENCODING ERROR in {path}: {e}")
        continue
    # Write back as UTF-8, no BOM
    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(text)
    print(f"OK: {path}")

print("Done.")
