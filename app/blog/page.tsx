import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { NewsletterForm } from "@/components/site/NewsletterForm";

export const metadata: Metadata = {
  title: "From the Notebook",
  description:
    "Slow reading on the practice of catching, clarifying, and compounding ideas. Essays on notebooks, rituals, and the philosophy of writing.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
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

        <p className="hero-eyebrow">Field notes · Essays · Vol. I</p>
        <h1 className="hero-title">
          <span className="word">Field</span>{" "}
          <span className="word">notes.</span>
          <br />
          <span className="word"><em>Quiet</em></span>{" "}
          <span className="word"><em>philosophy.</em></span>
        </h1>
        <div className="hero-meta">
          <p className="hero-blurb">
            Slow reading on the practice of catching, clarifying, and compounding ideas.{" "}
            <strong>New essays whenever there&rsquo;s something worth saying</strong> — never on a content calendar.
          </p>
          <div className="hero-stamp" aria-hidden="true">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="blog-circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"/>
              </defs>
              <text fontFamily="DM Mono, monospace" fontSize="9" letterSpacing="2" fill="#1A1612">
                <textPath href="#blog-circle">SCROLL · TO · BEGIN · SCROLL · TO · BEGIN · </textPath>
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
          <span>Catch the spark</span><span className="star">✦</span>
          <span>Carry the method</span><span className="star">✦</span>
          <span>Ideas don&rsquo;t wait</span><span className="star">✦</span>
          <span>Two lines · every day</span><span className="star">✦</span>
          <span>Made in India</span><span className="star">✦</span>
        </div>
      </div>

      {/* ─── CATEGORIES PILL BAR ─── */}
      <section className="categories" id="categories">
        <div className="categories-inner">
          <span className="categories-label">Filter by</span>
          <a href="#" className="category-pill active">All</a>
          <a href="#" className="category-pill">Method</a>
          <a href="#" className="category-pill">Rituals</a>
          <a href="#" className="category-pill">Philosophy</a>
          <a href="#" className="category-pill">Founder essays</a>
          <a href="#" className="category-pill">History</a>
        </div>
      </section>

      {/* ─── FEATURED ESSAY ─── */}
      <section className="featured" id="featured">
        <Link href="/essays/the-people-who-write-in-the-margins" className="featured-card reveal">
          <div className="featured-img">
            <svg width="84%" height="84%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="200" cy="288" rx="148" ry="10" fill="#2C2A20" opacity="0.45"/>
              <path d="M52 42 Q100 36 196 44 L196 272 Q100 280 52 274 Z" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
              <line x1="80" y1="58" x2="80" y2="258" stroke="#1A1612" strokeWidth="0.8" opacity="0.18"/>
              <g stroke="#1A1612" strokeWidth="1.1" opacity="0.22">
                <line x1="88" y1="72" x2="185" y2="71"/>
                <line x1="88" y1="88" x2="185" y2="87"/>
                <line x1="88" y1="104" x2="182" y2="103"/>
                <line x1="88" y1="120" x2="185" y2="119"/>
                <line x1="88" y1="136" x2="183" y2="135"/>
                <line x1="88" y1="152" x2="185" y2="151"/>
                <line x1="88" y1="168" x2="181" y2="167"/>
                <line x1="88" y1="184" x2="185" y2="183"/>
                <line x1="88" y1="200" x2="182" y2="199"/>
                <line x1="88" y1="216" x2="185" y2="215"/>
                <line x1="88" y1="232" x2="180" y2="231"/>
                <line x1="88" y1="248" x2="185" y2="247"/>
              </g>
              <line x1="88" y1="122" x2="148" y2="121" stroke="#FF6B47" strokeWidth="2.5" opacity="0.85"/>
              <line x1="88" y1="169" x2="165" y2="168" stroke="#F5C13D" strokeWidth="2" opacity="0.9"/>
              <circle cx="68" cy="88" r="6.5" fill="none" stroke="#F5C13D" strokeWidth="2"/>
              <circle cx="68" cy="88" r="2" fill="#F5C13D"/>
              <line x1="63" y1="101" x2="75" y2="101" stroke="#FF6B47" strokeWidth="2"/>
              <line x1="63" y1="106" x2="75" y2="106" stroke="#FF6B47" strokeWidth="2"/>
              <line x1="66" y1="116" x2="66" y2="130" stroke="#F5C13D" strokeWidth="2.2"/>
              <line x1="71" y1="116" x2="71" y2="130" stroke="#F5C13D" strokeWidth="2.2"/>
              <rect x="193" y="42" width="14" height="230" fill="#ECE0BE" stroke="#1A1612" strokeWidth="2"/>
              <path d="M348 42 Q300 36 206 44 L206 272 Q300 280 348 274 Z" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
              <line x1="320" y1="58" x2="320" y2="258" stroke="#1A1612" strokeWidth="0.8" opacity="0.18"/>
              <g stroke="#1A1612" strokeWidth="1.1" opacity="0.22">
                <line x1="215" y1="72" x2="312" y2="71"/>
                <line x1="215" y1="88" x2="312" y2="87"/>
                <line x1="215" y1="104" x2="309" y2="103"/>
                <line x1="215" y1="120" x2="312" y2="119"/>
                <line x1="215" y1="136" x2="310" y2="135"/>
                <line x1="215" y1="152" x2="312" y2="151"/>
                <line x1="215" y1="168" x2="308" y2="167"/>
                <line x1="215" y1="184" x2="312" y2="183"/>
                <line x1="215" y1="200" x2="309" y2="199"/>
                <line x1="215" y1="216" x2="312" y2="215"/>
                <line x1="215" y1="232" x2="307" y2="231"/>
                <line x1="215" y1="248" x2="312" y2="247"/>
              </g>
              <path d="M212,100 L208,100 L208,140 L212,140" stroke="#FF6B47" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M212,180 L209,180 L209,204 L212,204" stroke="#F5C13D" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <text x="325" y="126" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="#F5C13D" transform="rotate(-8 325 126)">Intrigued!</text>
              <polyline points="325,210 328,214 336,206" stroke="#F5C13D" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="330,210 333,214 341,206" stroke="#F5C13D" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M215,234 Q222,230 229,234 Q236,238 243,234 Q250,230 257,234 Q264,238 271,234" stroke="#FF6B47" strokeWidth="2" fill="none" opacity="0.8"/>
            </svg>
          </div>
          <div className="featured-text">
            <p className="featured-meta">New · History · 11 min read</p>
            <h2 className="featured-title">
              The people who write<br /><em>in the margins.</em>
            </h2>
            <p className="featured-excerpt">
              Coleridge annotated books for a woman who wasn&rsquo;t his wife. A medieval monk called out a bad translation. Fermat claimed a proof the margin was too narrow to contain. A gossip tour of history&rsquo;s most brazen readers — and what their scribbles teach us about thinking.
            </p>
            <span className="featured-read">Read essay <span className="arrow">↗</span></span>
          </div>
        </Link>
      </section>

      {/* ─── WRITING GRID ─── */}
      <section className="writing-blog" id="writing">
        <div className="section-head reveal">
          <div>
            <p className="section-label">All essays · 11 entries</p>
            <h2 className="section-title">
              Recent<br /><em>field notes.</em>
            </h2>
          </div>
          <p className="section-aside">
            Slow reading on the practice of keeping a notebook, the rituals that make it stick, and the philosophy beneath. Sorted newest first.
          </p>
        </div>

        <div className="writing-grid">

          <Link href="/essays/the-index-method" className="post large reveal">
            <div className="post-img bg-coral">
              <svg width="80%" height="80%" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                <rect x="80" y="40" width="240" height="170" rx="6" fill="#FAF3E3" stroke="#1A1612" strokeWidth="4"/>
                <rect x="80" y="40" width="35" height="170" fill="#F5C13D" stroke="#1A1612" strokeWidth="4"/>
                <text x="220" y="75" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="20" fill="#1A1612">INDEX</text>
                <line x1="140" y1="90" x2="290" y2="90" stroke="#1A1612" strokeWidth="1.5"/>
                <g stroke="#1A1612" strokeWidth="1.5" opacity="0.6">
                  <line x1="140" y1="110" x2="280" y2="110"/>
                  <line x1="140" y1="125" x2="270" y2="125"/>
                  <line x1="140" y1="140" x2="290" y2="140"/>
                  <line x1="140" y1="155" x2="260" y2="155"/>
                  <line x1="140" y1="170" x2="285" y2="170"/>
                  <line x1="140" y1="185" x2="275" y2="185"/>
                </g>
                <circle cx="135" cy="110" r="3" fill="#1A1612"/>
                <circle cx="135" cy="125" r="3" fill="#1A1612"/>
                <circle cx="135" cy="140" r="3" fill="#1A1612"/>
                <circle cx="135" cy="155" r="3" fill="#1A1612"/>
                <circle cx="135" cy="170" r="3" fill="#1A1612"/>
              </svg>
            </div>
            <p className="post-meta">Technique · 5 min read</p>
            <h3 className="post-title">The Index Method: how to never lose a thought again</h3>
          </Link>

          <Link href="/essays/notebooks-of-ancient-singers" className="post medium reveal">
            <div className="post-img bg-sage">
              <svg width="70%" height="70%" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
                <circle cx="150" cy="60" r="28" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
                <path d="M122 88 L122 160 Q122 180 150 180 Q178 180 178 160 L178 88 Z" fill="#6E3582" stroke="#1A1612" strokeWidth="3"/>
                <ellipse cx="150" cy="68" rx="6" ry="9" fill="#1A1612"/>
                <g fill="#F5C13D" stroke="#1A1612" strokeWidth="2.5">
                  <circle cx="60" cy="50" r="8"/>
                  <line x1="68" y1="50" x2="68" y2="20" strokeWidth="2.5"/>
                  <circle cx="240" cy="80" r="8"/>
                  <line x1="248" y1="80" x2="248" y2="50"/>
                  <circle cx="65" cy="120" r="8"/>
                  <line x1="73" y1="120" x2="73" y2="90"/>
                </g>
              </svg>
            </div>
            <p className="post-meta">History · 8 min read</p>
            <h3 className="post-title">Notebooks of ancient singers</h3>
          </Link>

          <Link href="/essays/why-your-notebook-should-never-be-organised" className="post small reveal">
            <div className="post-img bg-mustard">
              <svg width="70%" height="70%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 60 Q80 30 150 80 T180 60" stroke="#1A1612" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <path d="M30 100 Q70 70 130 110 T180 100" stroke="#FF6B47" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <path d="M30 140 Q90 110 140 150 T180 140" stroke="#1A1612" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <circle cx="50" cy="170" r="6" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
                <circle cx="100" cy="40" r="4" fill="#1A1612"/>
                <path d="M150 30 L160 20 L170 30 L160 40 Z" fill="#5BA8C9" stroke="#1A1612" strokeWidth="2"/>
              </svg>
            </div>
            <p className="post-meta">Philosophy · 6 min</p>
            <h3 className="post-title">Why your notebook should never be &ldquo;organised&rdquo;</h3>
          </Link>

          <Link href="/essays/the-grid-page-and-the-wandering-thought" className="post small reveal">
            <div className="post-img bg-sky">
              <svg width="70%" height="70%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#FAF3E3" strokeWidth="1.5" opacity="0.6">
                  <line x1="20" y1="40" x2="180" y2="40"/>
                  <line x1="20" y1="80" x2="180" y2="80"/>
                  <line x1="20" y1="120" x2="180" y2="120"/>
                  <line x1="20" y1="160" x2="180" y2="160"/>
                  <line x1="40" y1="20" x2="40" y2="180"/>
                  <line x1="80" y1="20" x2="80" y2="180"/>
                  <line x1="120" y1="20" x2="120" y2="180"/>
                  <line x1="160" y1="20" x2="160" y2="180"/>
                </g>
                <circle cx="100" cy="100" r="50" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
                <polygon points="100,60 110,100 100,90 90,100" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
                <polygon points="100,140 110,100 100,110 90,100" fill="#1A1612"/>
                <circle cx="100" cy="100" r="4" fill="#1A1612"/>
              </svg>
            </div>
            <p className="post-meta">Technique · 4 min</p>
            <h3 className="post-title">The grid page and the wandering thought</h3>
          </Link>

          <Link href="/essays/the-roman-wax-tablet" className="post small reveal">
            <div className="post-img bg-pink">
              <svg width="70%" height="70%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="50" width="140" height="100" rx="4" fill="#6E3582" stroke="#1A1612" strokeWidth="3"/>
                <rect x="40" y="60" width="120" height="80" fill="#F5C13D" stroke="#1A1612" strokeWidth="2"/>
                <g stroke="#1A1612" strokeWidth="1.8" opacity="0.7">
                  <line x1="50" y1="80" x2="80" y2="80"/>
                  <line x1="85" y1="80" x2="100" y2="80"/>
                  <line x1="105" y1="80" x2="140" y2="80"/>
                  <line x1="50" y1="95" x2="95" y2="95"/>
                  <line x1="100" y1="95" x2="150" y2="95"/>
                  <line x1="50" y1="110" x2="120" y2="110"/>
                  <line x1="125" y1="110" x2="150" y2="110"/>
                  <line x1="50" y1="125" x2="90" y2="125"/>
                </g>
                <line x1="155" y1="40" x2="190" y2="20" stroke="#1A1612" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="190" cy="20" r="4" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
              </svg>
            </div>
            <p className="post-meta">History · 10 min</p>
            <h3 className="post-title">The Roman wax tablet, ancestor to all of this</h3>
          </Link>

          <Link href="/essays/two-lines-every-day" className="post small reveal">
            <div className="post-img bg-sage">
              <svg width="70%" height="70%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#1A1612" strokeWidth="3" opacity="0.85">
                  <line x1="40" y1="50" x2="160" y2="50"/>
                  <line x1="40" y1="62" x2="140" y2="62"/>
                  <line x1="40" y1="90" x2="160" y2="90"/>
                  <line x1="40" y1="102" x2="135" y2="102"/>
                  <line x1="40" y1="130" x2="160" y2="130"/>
                  <line x1="40" y1="142" x2="145" y2="142"/>
                </g>
                <circle cx="180" cy="56" r="6" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
                <circle cx="180" cy="96" r="6" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
                <circle cx="180" cy="136" r="6" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
              </svg>
            </div>
            <p className="post-meta">Ritual · 4 min</p>
            <h3 className="post-title">Two lines, every day: the smallest reliable habit</h3>
          </Link>

          <Link href="/essays/the-first-page-rule" className="post small reveal">
            <div className="post-img bg-coral">
              <svg width="70%" height="70%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="30" width="100" height="130" rx="4" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3" transform="rotate(-6 100 95)"/>
                <g transform="rotate(-6 100 95)">
                  <line x1="65" y1="55" x2="135" y2="55" stroke="#1A1612" strokeWidth="1.5" opacity="0.5"/>
                  <line x1="65" y1="70" x2="125" y2="70" stroke="#1A1612" strokeWidth="1.5" opacity="0.5"/>
                  <line x1="65" y1="85" x2="135" y2="85" stroke="#1A1612" strokeWidth="1.5" opacity="0.5"/>
                  <line x1="60" y1="40" x2="145" y2="155" stroke="#1A1612" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="145" y1="40" x2="60" y2="155" stroke="#1A1612" strokeWidth="4" strokeLinecap="round"/>
                </g>
              </svg>
            </div>
            <p className="post-meta">Method · 5 min</p>
            <h3 className="post-title">The First-Page Rule: start ugly, start honest</h3>
          </Link>

          <Link href="/essays/constraint-as-creative-practice" className="post small reveal">
            <div className="post-img bg-mustard">
              <svg width="70%" height="70%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="60" width="120" height="80" fill="none" stroke="#1A1612" strokeWidth="3"/>
                <path d="M20 100 L40 100 M30 92 L40 100 L30 108" stroke="#1A1612" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M180 100 L160 100 M170 92 L160 100 L170 108" stroke="#1A1612" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M100 40 L100 60 M92 50 L100 60 L108 50" stroke="#1A1612" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M100 160 L100 140 M92 150 L100 140 L108 150" stroke="#1A1612" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M100 80 L105 95 L120 100 L105 105 L100 120 L95 105 L80 100 L95 95 Z" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
              </svg>
            </div>
            <p className="post-meta">Philosophy · 7 min</p>
            <h3 className="post-title">Constraint as creative practice: a brief defense</h3>
          </Link>

          <Link href="/essays/notes-as-identity-the-corebook" className="post small reveal">
            <div className="post-img bg-pink">
              <svg width="70%" height="70%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="60" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
                <polygon points="100,55 110,100 100,90 90,100" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
                <polygon points="100,145 110,100 100,110 90,100" fill="#1A1612"/>
                <circle cx="100" cy="100" r="6" fill="#1A1612"/>
                <text x="100" y="42" textAnchor="middle" fontFamily="DM Mono, monospace" fontWeight="500" fontSize="11" fill="#1A1612">N</text>
                <text x="100" y="170" textAnchor="middle" fontFamily="DM Mono, monospace" fontWeight="500" fontSize="11" fill="#1A1612">S</text>
              </svg>
            </div>
            <p className="post-meta">Founder · 9 min</p>
            <h3 className="post-title">Notes as identity: the case for a Corebook</h3>
          </Link>

          <Link href="/essays/margins-where-great-ideas-live" className="post small reveal">
            <div className="post-img bg-sky">
              <svg width="70%" height="70%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="30" width="120" height="140" rx="4" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
                <g stroke="#1A1612" strokeWidth="1.5" opacity="0.3">
                  <line x1="65" y1="55" x2="140" y2="55"/>
                  <line x1="65" y1="70" x2="135" y2="70"/>
                  <line x1="65" y1="85" x2="140" y2="85"/>
                  <line x1="65" y1="100" x2="125" y2="100"/>
                  <line x1="65" y1="115" x2="140" y2="115"/>
                  <line x1="65" y1="130" x2="130" y2="130"/>
                  <line x1="65" y1="145" x2="135" y2="145"/>
                </g>
                <line x1="62" y1="30" x2="62" y2="170" stroke="#1A1612" strokeWidth="1" opacity="0.4"/>
                <path d="M48 65 Q52 75 50 90 Q47 100 52 115" stroke="#FF6B47" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <circle cx="48" cy="100" r="3" fill="#FF6B47"/>
                <path d="M44 130 L56 142" stroke="#FF6B47" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M56 130 L44 142" stroke="#FF6B47" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="post-meta">History · 6 min</p>
            <h3 className="post-title">Margins: where great ideas actually live</h3>
          </Link>

          <Link href="/essays/idea-parking" className="post small reveal">
            <div className="post-img bg-mustard">
              <svg width="70%" height="70%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="35" y="50" width="130" height="100" rx="4" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
                <line x1="35" y1="80" x2="165" y2="80" stroke="#1A1612" strokeWidth="2" opacity="0.5"/>
                <line x1="35" y1="110" x2="165" y2="110" stroke="#1A1612" strokeWidth="2" opacity="0.5"/>
                <line x1="35" y1="140" x2="165" y2="140" stroke="#1A1612" strokeWidth="2" opacity="0.5"/>
                <circle cx="60" cy="65" r="8" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
                <rect x="80" y="58" width="20" height="14" fill="#5BA8C9" stroke="#1A1612" strokeWidth="2"/>
                <circle cx="60" cy="125" r="8" fill="#1A1612"/>
                <path d="M85 122 L100 122 L92 130 Z" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
                <path d="M130 30 Q145 40 145 60" stroke="#1A1612" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M139 56 L145 60 L150 54" stroke="#1A1612" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="post-meta">Method · 5 min</p>
            <h3 className="post-title">Idea parking: how to remember without organizing</h3>
          </Link>

        </div>

        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <a href="#" className="strip-button" style={{ background: "var(--ink)", color: "var(--cream)" }}>
            Load older essays
            <span className="arrow">↓</span>
          </a>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="newsletter" id="newsletter">
        <div className="newsletter-deco newsletter-deco-l" aria-hidden="true">
          <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="80" r="70" fill="none" stroke="#FAF3E3" strokeWidth="3" strokeDasharray="4 8"/>
            <circle cx="80" cy="80" r="36" fill="#F5C13D"/>
            <line x1="80" y1="44" x2="80" y2="116" stroke="#1A1612" strokeWidth="3"/>
            <line x1="44" y1="80" x2="116" y2="80" stroke="#1A1612" strokeWidth="3"/>
          </svg>
        </div>
        <div className="newsletter-deco newsletter-deco-r" aria-hidden="true">
          <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 60 Q50 40 80 60 T140 60" stroke="#FAF3E3" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M20 90 Q50 70 80 90 T140 90" stroke="#FAF3E3" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M20 120 Q50 100 80 120 T140 120" stroke="#FAF3E3" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="newsletter-inner reveal">
          <p className="newsletter-eyebrow">The newsletter</p>
          <h2 className="newsletter-title">
            Two lines.<br />Every <em>two weeks.</em>
          </h2>
          <p className="newsletter-blurb">
            A newsletter for slow thinkers. New essays, fresh rituals, quiet philosophy. Never on a content calendar — only when there&rsquo;s something worth saying.
          </p>
          <NewsletterForm />
          <p className="newsletter-fineprint">Unsubscribe anytime · No spam, ever · No tracking</p>
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
            Read enough.<br />Now <em>begin.</em>
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
