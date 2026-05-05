import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pt-24 pb-32 sm:pt-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
            A6 — pocket — grid
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-ink sm:text-7xl">
            Small books.<br />Big ideas.
          </h1>
          <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-ink">
            A blank page asks for a perfect first line. A Pocket Notes doesn&rsquo;t. You open it,
            you scribble, it grows. The problem was never the idea. It was the size of the page
            it had to land on.
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center border border-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink transition hover:bg-ink hover:text-paper"
            >
              Shop the books
            </Link>
            <Link
              href="/essays/the-people-who-write-in-the-margins"
              className="inline-flex items-center justify-center px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted transition hover:text-ink"
            >
              Read the essays →
            </Link>
          </div>
        </section>

        {/* Product showcase placeholder — will pull from DB once products are seeded */}
        <section className="border-t border-rule bg-paper">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 py-24 sm:grid-cols-2">
            <article className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
                500 Series — Founder Edition
              </p>
              <h2 className="font-serif text-3xl text-ink">
                Three books for the founder&rsquo;s pocket.
              </h2>
              <p className="text-ink-muted">
                Black and yellow. A6. 64 grid pages, 80 GSM. Saddle-stitched. ₹299 for the set.
              </p>
              <Link
                href="/shop/500-series"
                className="inline-block font-mono text-xs uppercase tracking-[0.15em] text-ink underline-offset-4 hover:underline"
              >
                Look closer →
              </Link>
            </article>
            <article className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
                Flow Series
              </p>
              <h2 className="font-serif text-3xl text-ink">
                Three books for the long, wandering thought.
              </h2>
              <p className="text-ink-muted">
                Purple. A6. 64 grid pages, 80 GSM. Saddle-stitched. ₹299 for the set.
              </p>
              <Link
                href="/shop/flow-series"
                className="inline-block font-mono text-xs uppercase tracking-[0.15em] text-ink underline-offset-4 hover:underline"
              >
                Look closer →
              </Link>
            </article>
          </div>
        </section>

        {/* Recent essays */}
        <section className="mx-auto max-w-5xl px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
            From the essays
          </p>
          <h2 className="mt-4 font-serif text-3xl text-ink">
            Where the page does the thinking.
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <Link href="/essays/the-people-who-write-in-the-margins" className="group">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-muted">
                History · 11 min
              </p>
              <h3 className="mt-3 font-serif text-xl text-ink group-hover:text-ink-muted">
                The people who write in the margins.
              </h3>
            </Link>
            <Link href="/essays/the-index-method" className="group">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-muted">
                Technique · 5 min
              </p>
              <h3 className="mt-3 font-serif text-xl text-ink group-hover:text-ink-muted">
                The index method: how to never lose a thought.
              </h3>
            </Link>
            <Link href="/essays/notebooks-of-ancient-singers" className="group">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-muted">
                History · 8 min
              </p>
              <h3 className="mt-3 font-serif text-xl text-ink group-hover:text-ink-muted">
                Notebooks of ancient singers.
              </h3>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
