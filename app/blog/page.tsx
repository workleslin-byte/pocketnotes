import Link from "next/link";

// /blog redirects to /essays for now — same content, simpler IA.
export default function BlogPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">Moved</p>
      <h1 className="mt-4 font-serif text-3xl text-ink">The blog lives at /essays now.</h1>
      <p className="mt-4 text-ink-muted">Same writing, simpler URL.</p>
      <Link
        href="/essays"
        className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.25em] text-ink underline-offset-4 hover:underline"
      >
        Take me there →
      </Link>
    </main>
  );
}
