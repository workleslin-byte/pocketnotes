import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-mono text-sm uppercase tracking-[0.2em] text-ink hover:text-ink-muted"
        >
          Pocket Notes
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-ink-muted sm:flex">
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <Link href="/essays" className="hover:text-ink">Essays</Link>
          <Link href="/blog" className="hover:text-ink">Blog</Link>
          <Link href="/about" className="hover:text-ink">About</Link>
        </nav>
        <details className="sm:hidden">
          <summary className="cursor-pointer list-none text-ink" aria-label="Open menu">
            <span className="block h-px w-6 bg-ink"></span>
            <span className="mt-1.5 block h-px w-6 bg-ink"></span>
            <span className="mt-1.5 block h-px w-6 bg-ink"></span>
          </summary>
          <div className="absolute left-0 right-0 top-16 z-50 border-y border-rule bg-paper">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4 text-base text-ink">
              <Link href="/shop" className="py-2">Shop</Link>
              <Link href="/essays" className="py-2">Essays</Link>
              <Link href="/blog" className="py-2">Blog</Link>
              <Link href="/about" className="py-2">About</Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
