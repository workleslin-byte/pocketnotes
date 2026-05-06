"use client";
import { useState } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    setEmail("");
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        className="newsletter-input"
        placeholder="your@email.com"
        required
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={done}
      />
      <button type="submit" className="newsletter-submit" disabled={done}>
        {done ? "Subscribed ✓" : "Subscribe ↗"}
      </button>
    </form>
  );
}
