import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const PRINCIPLES = [
  { n: "01", slug: "the-page-is-a-tool", title: "The page is a tool.", line: "Treat it like one. Notes aren't memory — they're how thinking gets done." },
  { n: "02", slug: "constraint-sharpens", title: "Constraint sharpens.", line: "A small page forces choice. Every word earns its space. Brevity is the practice — not the limitation." },
  { n: "03", slug: "catch-first-edit-later", title: "Catch first. Edit later.", line: "The first line is rarely the right one. It only matters that it's caught." },
  { n: "04", slug: "the-method-beats-the-mood", title: "The method beats the mood.", line: "Two lines, every day. The smallest reliable habit beats the loudest one." },
  { n: "05", slug: "notes-as-identity", title: "Notes as identity.", line: "Your Corebook. Your compass. Where the idea was, and who you were when it arrived." },
  { n: "06", slug: "attention-is-physical", title: "Attention is physical.", line: "No app. No battery. No exit. Paper doesn't update mid-thought." },
  { n: "07", slug: "born-of-necessity", title: "Born of necessity.", line: "Pocket Notes was made to disappear into a pocket and meet ideas mid-sentence — not to look good on a shelf." },
  { n: "08", slug: "we-dont-compete-with-notebooks", title: "We don't compete with notebooks.", line: "We compete with the notes app, sticky notes, memory, and chaos. Our only job is to be there when the idea arrives." },
];

export const metadata = {
  title: "About",
  description: "Pocket Notes is built by Leslin K Seemon. A notebook for people who think in fragments.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pt-24 pb-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
            About
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-ink">
            A notebook for people who think in fragments.
          </h1>
          <div className="prose-essay mt-12">
            {/* Founder's Note — full Talese-voice rewrite lands in Phase 3. Placeholder shell here. */}
            <p>
              The founder&rsquo;s note is being rewritten. Until then, what you need to know is
              short: Pocket Notes is built by Leslin K Seemon. The first book was made because
              nothing else was small enough to disappear into a pocket and survive a year of
              being sat on, rained on, and written in mid-sentence.
            </p>
            <p>
              Below are the eight things we don&rsquo;t compromise on. Each links to a longer
              essay — those are being written too.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-24">
          <ol className="divide-y divide-rule">
            {PRINCIPLES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/essays/${p.slug}`}
                  className="grid gap-2 py-8 transition hover:opacity-70 sm:grid-cols-[5rem_1fr]"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
                    {p.n} / 08
                  </p>
                  <div>
                    <h2 className="font-serif text-2xl text-ink">{p.title}</h2>
                    <p className="mt-2 text-ink-muted">{p.line}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
