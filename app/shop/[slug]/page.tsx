import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const FALLBACK = {
  "500-series": {
    title: "500 Series — Founder Edition",
    tagline: "Three books for the founder's pocket.",
    color: "Black & yellow",
    price: 299,
    specs: {
      pageCount: 64,
      paperType: "Grid",
      gsm: 80,
      binding: "Saddle stitch (staple)",
      dimensions: "A6 (105 × 148 mm)",
    },
    features: [
      "Set of three A6 notebooks",
      "64 grid pages, 80 GSM cream paper",
      "Saddle-stitch binding lays flat in the hand",
      "Designed to disappear into a pocket",
      "Founder Edition cover — black and yellow",
    ],
  },
  "flow-series": {
    title: "Flow Series",
    tagline: "Three books for the long, wandering thought.",
    color: "Purple",
    price: 299,
    specs: {
      pageCount: 64,
      paperType: "Grid",
      gsm: 80,
      binding: "Saddle stitch (staple)",
      dimensions: "A6 (105 × 148 mm)",
    },
    features: [
      "Set of three A6 notebooks",
      "64 grid pages, 80 GSM cream paper",
      "Saddle-stitch binding lays flat in the hand",
      "Pocket-sized, weighs almost nothing",
      "Soft purple cover — for the unhurried mind",
    ],
  },
} as const;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = FALLBACK[slug as keyof typeof FALLBACK];
  if (!product) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-2">
          <div className="aspect-square bg-stone-100" />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
              {product.color}
            </p>
            <h1 className="mt-4 font-serif text-4xl text-ink">{product.title}</h1>
            <p className="mt-4 font-serif text-xl text-ink-muted">{product.tagline}</p>
            <p className="mt-8 font-mono text-2xl text-ink">₹{product.price}</p>
            <p className="text-sm text-ink-muted">Set of three</p>
            <button
              type="button"
              className="mt-8 inline-flex w-full items-center justify-center border border-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink transition hover:bg-ink hover:text-paper sm:w-auto"
            >
              Add to cart
            </button>
            <p className="mt-3 text-xs text-ink-muted">
              Cart and checkout coming back soon. Email{" "}
              <a href="mailto:hello@pocketnotes.in" className="underline">
                hello@pocketnotes.in
              </a>{" "}
              to order in the meantime.
            </p>

            <div className="mt-12 border-t border-rule pt-8">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
                Specs
              </h2>
              <dl className="mt-4 grid grid-cols-[max-content_1fr] gap-x-8 gap-y-2 text-sm">
                <dt className="text-ink-muted">Pages</dt>
                <dd>{product.specs.pageCount}</dd>
                <dt className="text-ink-muted">Paper</dt>
                <dd>{product.specs.paperType}, {product.specs.gsm} GSM</dd>
                <dt className="text-ink-muted">Binding</dt>
                <dd>{product.specs.binding}</dd>
                <dt className="text-ink-muted">Dimensions</dt>
                <dd>{product.specs.dimensions}</dd>
              </dl>

              <h2 className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
                In the set
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="text-ink-muted">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(FALLBACK).map((slug) => ({ slug }));
}
