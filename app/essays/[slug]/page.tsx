import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SubscribeForm } from "@/components/site/SubscribeForm";

// Placeholder reader. Phase 3 wires this to Payload (essays collection).
// For now it renders a "Coming soon" shell for every slug except the one
// already-written essay.

const WRITTEN_SLUGS = new Set(["the-people-who-write-in-the-margins"]);

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const isWritten = WRITTEN_SLUGS.has(slug);

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
            {isWritten ? "History · 11 min" : "Coming soon"}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            {isWritten ? "The people who write in the margins." : "Essay in progress."}
          </h1>
          <p className="mt-4 text-sm text-ink-muted">
            By Leslin K Seemon
          </p>

          <div className="prose-essay mt-12">
            {isWritten ? (
              <p>
                The full text of this essay is being moved into the new content system.
                Until it lands, you can read the original at{" "}
                <Link href="/legacy/essays/the-people-who-write-in-the-margins.html">
                  the legacy site
                </Link>
                .
              </p>
            ) : (
              <p>
                We&rsquo;re writing this one. Subscribe and we&rsquo;ll email you when it lands —
                no marketing, just the essay.
              </p>
            )}
          </div>

          <SubscribeForm source="essay-footer" />

          <div className="mt-12">
            <Link
              href="/essays"
              className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted hover:text-ink"
            >
              ← All essays
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
