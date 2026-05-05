import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 text-sm text-ink-muted sm:grid-cols-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink">Pocket Notes</p>
          <p className="mt-3 max-w-xs leading-relaxed">
            A6 notebooks for people who think in fragments and write before they forget.
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <Link href="/essays" className="hover:text-ink">Essays</Link>
          <Link href="/blog" className="hover:text-ink">Blog</Link>
          <Link href="/about" className="hover:text-ink">About</Link>
        </nav>
        <div className="flex flex-col gap-2">
          <a href="mailto:hello@pocketnotes.in" className="hover:text-ink">hello@pocketnotes.in</a>
          <p className="text-xs">© {new Date().getFullYear()} Pocket Notes. Made by Leslin K Seemon.</p>
        </div>
      </div>
    </footer>
  );
}
