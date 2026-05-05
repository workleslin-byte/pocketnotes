import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const STUB_ESSAYS = [
  { slug: "the-people-who-write-in-the-margins", title: "The people who write in the margins.", tag: "History", readTime: 11, status: "published" },
  { slug: "the-index-method", title: "The index method: how to never lose a thought.", tag: "Technique", readTime: 5 },
  { slug: "notebooks-of-ancient-singers", title: "Notebooks of ancient singers.", tag: "History", readTime: 8 },
  { slug: "why-your-notebook-should-never-be-organised", title: "Why your notebook should never be 'organised'.", tag: "Philosophy", readTime: 6 },
  { slug: "the-grid-page-and-the-wandering-thought", title: "The grid page and the wandering thought.", tag: "Technique", readTime: 4 },
  { slug: "the-roman-wax-tablet", title: "The Roman wax tablet, ancestor to all of this.", tag: "History", readTime: 10 },
  { slug: "two-lines-every-day", title: "Two lines, every day: the smallest reliable habit.", tag: "Ritual", readTime: 4 },
  { slug: "the-first-page-rule", title: "The First-Page Rule: start ugly, start honest.", tag: "Method", readTime: 5 },
  { slug: "constraint-as-creative-practice", title: "Constraint as creative practice.", tag: "Philosophy", readTime: 7 },
  { slug: "notes-as-identity-the-corebook", title: "Notes as identity: the case for a Corebook.", tag: "Founder", readTime: 9 },
  { slug: "margins-where-great-ideas-live", title: "Margins: where great ideas actually live.", tag: "History", readTime: 6 },
  { slug: "idea-parking", title: "Idea parking: how to remember without organizing.", tag: "Method", readTime: 5 },
];

export const metadata = {
  title: "Essays",
  description: "Long-form writing on notebooks, attention, and the small page.",
};

export default function EssaysPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
            Essays
          </p>
          <h1 className="mt-4 font-serif text-5xl text-ink">
            On notebooks, attention, and the small page.
          </h1>
          <ul className="mt-16 divide-y divide-rule">
            {STUB_ESSAYS.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/essays/${e.slug}`}
                  className="group flex flex-col gap-1 py-6 transition hover:opacity-70"
                >
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ink-muted">
                    {e.tag} · {e.readTime} min
                  </p>
                  <h2 className="font-serif text-2xl text-ink">{e.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-xs text-ink-muted">
            New essays publish quietly. Subscribe to be told when one lands.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
