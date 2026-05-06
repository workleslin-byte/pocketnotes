import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Pocket Notes. Small grid notebooks made in India for people who write because they need to — and eight things we won't compromise on.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    n: "01 / 08",
    slug: "the-page-is-a-tool",
    title: "The page is",
    titleEm: "a tool.",
    line: "Treat it like one. Notes aren't memory — they're how thinking gets done.",
  },
  {
    n: "02 / 08",
    slug: "constraint-sharpens",
    title: "Constraint",
    titleEm: "sharpens.",
    line: "A small page forces choice. Every word earns its space. Brevity is the practice — not the limitation.",
  },
  {
    n: "03 / 08",
    slug: "catch-first-edit-later",
    title: "Catch first.",
    titleEm: "Edit later.",
    line: "The first line is rarely the right one. It only matters that it's caught. Editing without a draft is editing nothing.",
  },
  {
    n: "04 / 08",
    slug: "the-method-beats-the-mood",
    title: "The method beats",
    titleEm: "the mood.",
    line: "Two lines, every day. The smallest reliable habit beats the loudest one. Show up before you feel like it.",
  },
  {
    n: "05 / 08",
    slug: "notes-as-identity",
    title: "Notes as",
    titleEm: "identity.",
    line: "Your Corebook. Your compass. Where the idea was, and who you were when it arrived.",
  },
  {
    n: "06 / 08",
    slug: "attention-is-physical",
    title: "Attention is",
    titleEm: "physical.",
    line: "No app. No battery. No exit. Paper doesn't update mid-thought. Paper doesn't ask for your password.",
  },
  {
    n: "07 / 08",
    slug: "born-of-necessity",
    title: "Born of",
    titleEm: "necessity.",
    line: "Not aesthetics. Pocket Notes was made to disappear into a pocket and meet ideas mid-sentence — not to look good on a shelf.",
  },
  {
    n: "08 / 08",
    slug: "we-dont-compete-with-notebooks",
    title: "We don't compete with",
    titleEm: "notebooks.",
    line: "We compete with the notes app, sticky notes, memory, and chaos. Our only job is to be there when the idea arrives.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="float float-1" aria-hidden="true">
          <svg width="196" height="252" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="40" width="60" height="110" fill="#F5C13D" stroke="#1A1612" strokeWidth="3"/>
            <polygon points="40,150 100,150 70,180" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
            <polygon points="55,165 85,165 70,180" fill="#1A1612"/>
            <rect x="40" y="20" width="60" height="20" fill="#FF6B47" stroke="#1A1612" strokeWidth="3"/>
            <rect x="40" y="32" width="60" height="8" fill="#1A1612"/>
            <line x1="55" y1="78" x2="85" y2="78" stroke="#1A1612" strokeWidth="2" opacity="0.5"/>
            <line x1="55" y1="92" x2="85" y2="92" stroke="#1A1612" strokeWidth="2" opacity="0.5"/>
            <line x1="55" y1="106" x2="75" y2="106" stroke="#1A1612" strokeWidth="2" opacity="0.5"/>
          </svg>
        </div>

        <div className="float float-2" aria-hidden="true">
          <svg width="126" height="126" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
            <path d="M45 5 L52 35 L82 38 L58 55 L66 84 L45 67 L24 84 L32 55 L8 38 L38 35 Z"
                  fill="#F26A8D" stroke="#1A1612" strokeWidth="3" strokeLinejoin="round"/>
            <circle cx="45" cy="48" r="6" fill="#1A1612"/>
          </svg>
        </div>

        <div className="float float-3" aria-hidden="true">
          <svg width="182" height="168" viewBox="0 0 130 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 95 Q65 105 115 95 L115 105 Q65 115 15 105 Z" fill="#1A1612" opacity="0.15"/>
            <path d="M10 25 Q30 20 65 30 L65 95 Q30 90 10 95 Z" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
            <path d="M120 25 Q100 20 65 30 L65 95 Q100 90 120 95 Z" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
            <line x1="20" y1="45" x2="55" y2="48" stroke="#5BA8C9" strokeWidth="2"/>
            <line x1="20" y1="55" x2="55" y2="58" stroke="#5BA8C9" strokeWidth="2"/>
            <line x1="20" y1="65" x2="50" y2="68" stroke="#5BA8C9" strokeWidth="2"/>
            <line x1="75" y1="48" x2="110" y2="45" stroke="#5BA8C9" strokeWidth="2"/>
            <line x1="75" y1="58" x2="110" y2="55" stroke="#5BA8C9" strokeWidth="2"/>
            <path d="M78 70 Q85 65 90 72 T100 70" stroke="#FF6B47" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <p className="hero-eyebrow">About · The story · The method</p>
        <h1 className="hero-title">
          <span className="word">Built to</span>{" "}
          <span className="word">think.</span>
          <br />
          <span className="word"><em>Made for</em></span>{" "}
          <span className="word"><em>thinkers.</em></span>
        </h1>
        <div className="hero-meta">
          <p className="hero-blurb">
            A decade of writing, stacks of notebooks, and one persistent question: why is the right notebook so hard to find?{" "}
            <strong>So we made it.</strong>
          </p>
          <div className="hero-stamp" aria-hidden="true">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="about-circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"/>
              </defs>
              <text fontFamily="DM Mono, monospace" fontSize="9" letterSpacing="2" fill="#1A1612">
                <textPath href="#about-circle">SCROLL · TO · BEGIN · SCROLL · TO · BEGIN · </textPath>
              </text>
              <circle cx="50" cy="50" r="10" fill="#F5C13D" stroke="#1A1612" strokeWidth="2"/>
              <text x="50" y="54" textAnchor="middle" fontSize="14" fill="#1A1612">↓</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Catch the spark</span><span className="star">✦</span>
          <span>Carry the method</span><span className="star">✦</span>
          <span>Ideas don&rsquo;t wait</span><span className="star">✦</span>
          <span>Two lines · every day</span><span className="star">✦</span>
          <span>Made in India</span><span className="star">✦</span>
          <span>Small Books, Big Ideas</span><span className="star">✦</span>
          <span>Catch the spark</span><span className="star">✦</span>
          <span>Carry the method</span><span className="star">✦</span>
          <span>Ideas don&rsquo;t wait</span><span className="star">✦</span>
          <span>Two lines · every day</span><span className="star">✦</span>
          <span>Made in India</span><span className="star">✦</span>
          <span>Small Books, Big Ideas</span><span className="star">✦</span>
        </div>
      </div>

      {/* ─── FOUNDER'S NOTE ─── */}
      <section className="founder" id="founder">
        <div className="founder-deco founder-deco-1" aria-hidden="true">
          <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 90 Q60 30 100 90 T170 90" stroke="#1A1612" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 110 Q60 50 100 110 T170 110" stroke="#1A1612" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 130 Q60 70 100 130 T170 130" stroke="#1A1612" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="founder-deco founder-deco-2" aria-hidden="true">
          <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="80" r="70" fill="none" stroke="#1A1612" strokeWidth="2" strokeDasharray="4 8"/>
            <line x1="80" y1="20" x2="80" y2="140" stroke="#1A1612" strokeWidth="2"/>
            <line x1="20" y1="80" x2="140" y2="80" stroke="#1A1612" strokeWidth="2"/>
          </svg>
        </div>

        <div className="founder-inner reveal">
          <p className="founder-eyebrow">Founder&rsquo;s note</p>
          <h2 className="founder-title">
            I built the notebook<br />I <em>couldn&rsquo;t find.</em>
          </h2>

          <div className="founder-body">
            <p className="lede">
              Somewhere around 19, bored in an engineering lecture on Gaussian noise, I started writing in the margins.
            </p>

            <p>
              Not notes — poems. The kind that arrive sideways, unexpected, while someone at the front of the room is explaining stochastic processes to students who are mostly trying to stay awake. I had a notebook — spiral-bound, graph paper, the kind the college bookshop sold in bulk — and I wrote in the margins, around the equations, filling the white space with lines I would never show anyone.
            </p>

            <p>
              I kept doing that. Long after the engineering was over, long after the career that followed it was over too. Notebooks accumulated. A journal for the days. A reading log for the books. A commonplace book for lines worth keeping. A memo pad for the immediate and forgettable.
            </p>

            <p>
              And then one notebook I called the Corebook — not because I planned it, but because it became the place where I wrote the things I actually believed. The things I came back to when I&rsquo;d lost the thread. A compass disguised as a notebook. Any time I feel lost, I go there. Paper has a way of making the fog visible, which is the first step toward clearing it.
            </p>

            <p>
              The blogging came later. Confidence came slowly, then all at once, in the way things sometimes do when you&rsquo;ve been quietly practising for years without realising it. Writing became the work. The notebooks were always the backstage.
            </p>

            <p>
              I made Pocketnotes because I kept not finding what I needed. Small enough to carry without thinking about it. A grid that doesn&rsquo;t dictate, just orients. Paper that doesn&rsquo;t bleed through or buckle. Nothing precious about it — precious notebooks don&rsquo;t get used, they get displayed.
            </p>

            <p>
              These aren&rsquo;t for people who want to look like writers. They&rsquo;re for people who write because they can&rsquo;t quite stop, even when it&rsquo;s inconvenient, even when no one&rsquo;s watching, even when they&rsquo;re just scribbling in the margins of something else entirely.
            </p>
          </div>

          <div className="founder-signature">
            <span className="sig-name">Leslin K. Seemon</span>
            <span className="sig-role">Founder · Pocket Notes</span>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY (Catch · Clarify · Compound) ─── */}
      <section className="philosophy" id="method">
        <div className="philo-deco philo-deco-1" aria-hidden="true">
          <svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
            <circle cx="110" cy="110" r="100" fill="none" stroke="#FAF3E3" strokeWidth="3" strokeDasharray="4 8"/>
            <circle cx="110" cy="110" r="60" fill="#F5C13D"/>
            <line x1="110" y1="60" x2="110" y2="160" stroke="#1A1612" strokeWidth="3" opacity="0.7"/>
            <line x1="60" y1="110" x2="160" y2="110" stroke="#1A1612" strokeWidth="3" opacity="0.7"/>
            <circle cx="110" cy="110" r="6" fill="#1A1612"/>
          </svg>
        </div>
        <div className="philo-deco philo-deco-2" aria-hidden="true">
          <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
            <path d="M90 10 L100 70 L160 80 L110 110 L130 170 L90 140 L50 170 L70 110 L20 80 L80 70 Z"
                  fill="#FF6B47" stroke="#FAF3E3" strokeWidth="3"/>
          </svg>
        </div>

        <div className="section-head reveal">
          <div>
            <p className="section-label" style={{ color: "var(--bone)" }}>The method</p>
            <h2 className="section-title">
              Three moves.<br />
              <em style={{ color: "var(--mustard)" }}>One discipline.</em>
            </h2>
          </div>
          <p className="section-aside" style={{ color: "var(--bone)", opacity: 0.85 }}>
            Pocket Notes isn&rsquo;t a brand. It&rsquo;s a method. Three moves, repeated daily, that turn raw thought into work that ships.
          </p>
        </div>

        <div className="philo-grid-3">
          <div className="philo-item reveal">
            <div className="philo-num">01</div>
            <div className="philo-content">
              <h3>Catch</h3>
              <p>Jot it before it vanishes. The first thought is the rawest and the rarest. Don&rsquo;t edit. Don&rsquo;t curate. Just catch.</p>
            </div>
          </div>
          <div className="philo-item reveal">
            <div className="philo-num">02</div>
            <div className="philo-content">
              <h3>Clarify</h3>
              <p>Reframe the fragment. Reread tomorrow. Look for the line that wants to stay. The page makes the muddle visible — and visible muddle is solvable.</p>
            </div>
          </div>
          <div className="philo-item reveal">
            <div className="philo-num">03</div>
            <div className="philo-content">
              <h3>Compound</h3>
              <p>Return. Revise. Refine. Threads connect across pages. Sparks become systems. Your notebook turns into a map of how you think.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MANIFESTO (8 principles) ─── */}
      <section className="manifesto" id="manifesto">
        <div className="manifesto-inner">
          <div className="manifesto-head reveal">
            <div>
              <p className="section-label">What we believe</p>
              <h2 className="section-title">
                Eight things<br />
                <em>we won&rsquo;t compromise on.</em>
              </h2>
            </div>
            <p className="section-aside" style={{ color: "var(--ink-soft)" }}>
              Not a brand. A method. These are the principles behind it — each with an essay if you want to go further.
            </p>
          </div>

          <div className="manifesto-list">
            {PRINCIPLES.map((p) => (
              <div className="manifesto-item reveal" key={p.slug}>
                <div className="manifesto-num">{p.n}</div>
                <div className="manifesto-content">
                  <h3>
                    <Link href={`/essays/${p.slug}`}>
                      {p.title} <em>{p.titleEm}</em>
                    </Link>
                  </h3>
                  <p>{p.line}</p>
                  <Link href={`/essays/${p.slug}`} className="essay-link">
                    Read essay →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ─── */}
      <section className="strip" id="shop-cta">
        <div className="strip-deco" aria-hidden="true">
          <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#1A1612" strokeWidth="2" strokeDasharray="6 10"/>
            <circle cx="200" cy="200" r="120" fill="none" stroke="#1A1612" strokeWidth="2"/>
            <circle cx="200" cy="200" r="60" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
          </svg>
        </div>
        <div className="strip-content">
          <h2 className="strip-title">
            Begin your<br /><em>Corebook.</em>
          </h2>
          <div className="strip-action">
            <Link href="/shop" className="strip-button">
              Visit the shop
              <span className="arrow">↗</span>
            </Link>
            <p className="strip-note">Two series · one method · ships in India</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
