"use client";
import { useState } from "react";

export function SubscribeForm({ source = "essay-footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Subscribe failed");
      setStatus("ok");
      setMessage("Check your inbox. Click the link to confirm — that's it.");
      setEmail("");
      setName("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-16 max-w-xl border-y border-rule py-10"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
        New essays, in your inbox
      </p>
      <h3 className="mt-3 font-serif text-2xl text-ink">
        Two emails a month. No marketing.
      </h3>
      <p className="mt-2 text-sm text-ink-muted">
        We send when there's something worth reading — usually a new essay. Nothing else.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          className="flex-1 border-b border-rule bg-transparent py-2 text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 border-b border-rule bg-transparent py-2 text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="border border-ink px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink transition hover:bg-ink hover:text-paper disabled:opacity-50"
        >
          {status === "loading" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {message && (
        <p className={`mt-4 text-sm ${status === "error" ? "text-red-700" : "text-ink-muted"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
