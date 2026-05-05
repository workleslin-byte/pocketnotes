import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500">
        Pocket Notes — under reconstruction
      </p>
      <h1 className="mt-6 text-4xl font-light leading-tight text-stone-900 sm:text-5xl">
        Small books. Big ideas.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-700">
        We&rsquo;re rebuilding from the inside. The shop, the essays, and the index method are
        being moved into a quieter, faster home. The current site at{" "}
        <a
          href="https://www.pocketnotes.in"
          className="underline decoration-stone-400 underline-offset-4 hover:decoration-stone-900"
        >
          pocketnotes.in
        </a>{" "}
        remains live in the meantime.
      </p>
      <div className="mt-10 flex flex-col gap-3 text-sm text-stone-600">
        <Link href="/admin" className="hover:text-stone-900">
          → Admin (Payload CMS)
        </Link>
      </div>
    </main>
  );
}
