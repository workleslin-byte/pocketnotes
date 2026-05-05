import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata = {
  title: "Shop",
  description: "Two A6 pocket notebooks. ₹299 for a set of three.",
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
            Shop
          </p>
          <h1 className="mt-4 font-serif text-5xl text-ink">Two books to choose from.</h1>
          <p className="mt-4 max-w-xl text-ink-muted">
            Both are A6. Both are grid. Both come three to a set. The difference is the cover —
            and the kind of week you&rsquo;re having.
          </p>

          <div className="mt-16 grid gap-12 sm:grid-cols-2">
            {[
              {
                slug: "500-series",
                title: "500 Series — Founder Edition",
                tagline: "Three books for the founder's pocket.",
                color: "Black & yellow",
              },
              {
                slug: "flow-series",
                title: "Flow Series",
                tagline: "Three books for the long, wandering thought.",
                color: "Purple",
              },
            ].map((p) => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className="group block">
                <div className="aspect-[4/5] bg-stone-100 transition group-hover:bg-stone-200" />
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
                  {p.color}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-ink">{p.title}</h2>
                <p className="mt-2 text-ink-muted">{p.tagline}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-ink">
                  ₹299 — set of 3
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
