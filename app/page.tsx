import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      {/* ─── HERO ─── */}
      <section className="hero">
        {/* Floating SVG illustrations — scaled +40% per brief 2b */}
        <div className="float float-1" aria-hidden="true">
          <svg width="274" height="353" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="20" width="80" height="140" rx="4" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
            <rect x="30" y="20" width="18" height="140" fill="#FF6B47" stroke="#1A1612" strokeWidth="3"/>
            <g stroke="#1A1612" strokeWidth="0.8" opacity="0.2">
              <line x1="58" y1="48" x2="100" y2="48"/>
              <line x1="58" y1="64" x2="100" y2="64"/>
              <line x1="58" y1="80" x2="100" y2="80"/>
              <line x1="58" y1="96" x2="100" y2="96"/>
              <line x1="70" y1="40" x2="70" y2="112"/>
              <line x1="85" y1="40" x2="85" y2="112"/>
            </g>
            <circle cx="62" cy="126" r="5" fill="#1A1612"/>
            <circle cx="88" cy="126" r="5" fill="#1A1612"/>
            <circle cx="63" cy="124" r="1.5" fill="#FAF3E3"/>
            <circle cx="89" cy="124" r="1.5" fill="#FAF3E3"/>
            <path d="M58 138 Q75 150 92 138" stroke="#1A1612" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <circle cx="52" cy="132" r="4" fill="#FF6B47" opacity="0.55"/>
            <circle cx="98" cy="132" r="4" fill="#FF6B47" opacity="0.55"/>
          </svg>
        </div>

        <div className="float float-2" aria-hidden="true">
          <svg width="157" height="157" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
            <path d="M45 5 L52 35 L82 38 L58 55 L66 84 L45 67 L24 84 L32 55 L8 38 L38 35 Z"
                  fill="#F26A8D" stroke="#1A1612" strokeWidth="3" strokeLinejoin="round"/>
            <circle cx="45" cy="48" r="6" fill="#1A1612"/>
          </svg>
        </div>

        <div className="float float-3" aria-hidden="true">
          <svg width="255" height="235" viewBox="0 0 130 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 95 Q65 105 115 95 L115 105 Q65 115 15 105 Z" fill="#1A1612" opacity="0.12"/>
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

        <p className="hero-eyebrow">A capture device for fast thinkers · Vol. I</p>

        <h1 className="hero-title">
          <span className="word">Small Books,</span><br />
          <span className="word"><em>Big Ideas.</em></span>
        </h1>

        <div className="hero-meta">
          <p className="hero-blurb">
            Open it, write what arrives. A blank page that demands a perfect first line is the wrong tool.{" "}
            <strong>Pocket Notes doesn&rsquo;t demand anything.</strong> Only that you start.
          </p>

          <div className="hero-stamp" aria-hidden="true">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"/>
              </defs>
              <text fontFamily="DM Mono, monospace" fontSize="9" letterSpacing="2" fill="#1A1612">
                <textPath href="#circle">SCROLL · TO · BEGIN · SCROLL · TO · BEGIN · </textPath>
              </text>
              <circle cx="50" cy="50" r="10" fill="#F5C13D" stroke="#1A1612" strokeWidth="2"/>
              <path d="M46 47 L50 54 L54 47" stroke="#1A1612" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[
            "Write by hand", "Think with ink", "Catch the line before it leaves",
            "Grid pages forever", "Made in India", "The first address of an idea",
            "Two lines a day", "Small Books, Big Ideas",
            "Write by hand", "Think with ink", "Catch the line before it leaves",
            "Grid pages forever", "Made in India", "The first address of an idea",
            "Two lines a day", "Small Books, Big Ideas",
          ].map((t, i) => (
            <span key={i}>
              <span>{t}</span>
              <span className="star" style={{ marginLeft: "3rem" }}>★</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── PRODUCTS ─── */}
      <section className="products" id="shop">
        <div className="section-inner">
          <div className="section-head reveal">
            <div>
              <p className="section-label"><b>The artifacts</b></p>
              <h2 className="section-title">Two series.<br /><em>One method.</em></h2>
            </div>
            <p className="section-aside">A6, 64 pages, staple-bound, faint grid on cream paper. Not a planner. Not a journal. A tool for people who already write.</p>
          </div>

          <div className="product-row">
            {/* Founder's 500 */}
            <Link href="/shop/500-series" className="product reveal">
              <div className="product-frame f1">
                <span className="product-tag">Bestseller</span>
                <svg width="302" height="370" viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="20" width="120" height="180" rx="5" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
                  <rect x="30" y="20" width="22" height="180" fill="#FF6B47" stroke="#1A1612" strokeWidth="3"/>
                  <g stroke="#1A1612" strokeWidth="0.8" opacity="0.2">
                    <line x1="62" y1="50"  x2="140" y2="50"/>
                    <line x1="62" y1="68"  x2="140" y2="68"/>
                    <line x1="62" y1="86"  x2="140" y2="86"/>
                    <line x1="62" y1="104" x2="140" y2="104"/>
                    <line x1="80"  y1="40" x2="80"  y2="120"/>
                    <line x1="100" y1="40" x2="100" y2="120"/>
                    <line x1="120" y1="40" x2="120" y2="120"/>
                  </g>
                  <circle cx="72" cy="148" r="6" fill="#1A1612"/>
                  <circle cx="108" cy="148" r="6" fill="#1A1612"/>
                  <circle cx="73" cy="146" r="2" fill="#FAF3E3"/>
                  <circle cx="109" cy="146" r="2" fill="#FAF3E3"/>
                  <path d="M66 162 Q90 176 114 162" stroke="#1A1612" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <circle cx="58" cy="155" r="5" fill="#FF6B47" opacity="0.5"/>
                  <circle cx="122" cy="155" r="5" fill="#FF6B47" opacity="0.5"/>
                </svg>
              </div>
              <div className="product-info">
                <span className="product-name">Founder&rsquo;s <em>500</em></span>
                <span className="product-price">₹299</span>
              </div>
              <p className="product-desc">A6, 64 pages, faint grid, staple-bound. For drafts, lists, half-formed lines. The notebook you reach for without thinking.</p>
            </Link>

            {/* Flow Series */}
            <Link href="/shop/flow-series" className="product reveal">
              <div className="product-frame f2">
                <span className="product-tag">New</span>
                <svg width="269" height="370" viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg">
                  <rect x="40" y="20" width="80" height="180" rx="4" fill="#FAF3E3" stroke="#1A1612" strokeWidth="3"/>
                  <line x1="52" y1="20" x2="52" y2="200" stroke="#1A1612" strokeWidth="1" opacity="0.3"/>
                  <line x1="40" y1="120" x2="120" y2="120" stroke="#1A1612" strokeWidth="3"/>
                  <ellipse cx="40" cy="120" rx="3" ry="6" fill="#1A1612"/>
                  <ellipse cx="120" cy="120" rx="3" ry="6" fill="#1A1612"/>
                  <rect x="62" y="50" width="36" height="3" fill="#1A1612"/>
                  <rect x="67" y="60" width="26" height="2" fill="#1A1612" opacity="0.5"/>
                  <path d="M55 143 Q70 138 85 146 T115 143" stroke="#1A1612" strokeWidth="1.5" fill="none" opacity="0.4"/>
                  <path d="M55 158 Q70 153 85 161 T115 158" stroke="#1A1612" strokeWidth="1.5" fill="none" opacity="0.4"/>
                  <path d="M55 173 Q70 168 85 176 T100 173" stroke="#1A1612" strokeWidth="1.5" fill="none" opacity="0.4"/>
                </svg>
              </div>
              <div className="product-info">
                <span className="product-name">Flow <em>Series</em></span>
                <span className="product-price">₹299</span>
              </div>
              <p className="product-desc">A6, 64 pages, faint grid, staple-bound. Train rides. Cafés. The five minutes between calls. Treat it as a draftbook, not a keepsake.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="philosophy" id="about">
        <div className="philo-deco philo-deco-1" aria-hidden="true">
          <svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
            <circle cx="110" cy="110" r="100" fill="none" stroke="#FAF3E3" strokeWidth="3" strokeDasharray="4 8"/>
            <circle cx="110" cy="110" r="60" fill="#F5C13D"/>
            <line x1="110" y1="60" x2="110" y2="160" stroke="#1A1612" strokeWidth="3" opacity="0.7"/>
            <line x1="60"  y1="110" x2="160" y2="110" stroke="#1A1612" strokeWidth="3" opacity="0.7"/>
            <circle cx="110" cy="110" r="6" fill="#1A1612"/>
          </svg>
        </div>
        <div className="philo-deco philo-deco-2" aria-hidden="true">
          <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
            <path d="M90 10 L100 70 L160 80 L110 110 L130 170 L90 140 L50 170 L70 110 L20 80 L80 70 Z"
                  fill="#FF6B47" stroke="#FAF3E3" strokeWidth="3"/>
          </svg>
        </div>

        <div className="section-inner">
          <div className="section-head reveal">
            <div>
              <p className="section-label"><b>The method</b></p>
              <h2 className="section-title">Catch. Clarify.<br /><em>Compound.</em></h2>
            </div>
            <p className="section-aside">Note-taking isn&rsquo;t memory. It&rsquo;s how ideas take shape. The page does the work that the notes app can&rsquo;t.</p>
          </div>

          <div className="philo-grid">
            {[
              { n: "01", t: "The pocket constraint is a gift", b: "A small page forces choice. Every word earns its space. Brevity becomes a writing practice — not a limitation. We never widen the page." },
              { n: "02", t: "Grid pages free the mind", b: "Not lined. Not blank. Grid. It holds structure loosely — for words, sketches, lists that turn into poems, flows that turn into product." },
              { n: "03", t: "Ancient notebooks were the internet", b: "Roman wax tablets. Persian poetry diaries. Indian kavyagrantha. Knowledge lived in physical books carried on the body. Our category is older than typing." },
              { n: "04", t: "Complexity is the enemy of writing", b: "No subscription. No battery. No syncing. The best system is the one you actually use. Anywhere a feature creeps in — we cut it." },
            ].map((p) => (
              <div key={p.n} className="philo-item reveal">
                <div className="philo-num">{p.n}</div>
                <div className="philo-content">
                  <h3>{p.t}</h3>
                  <p>{p.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WRITING / FIELD NOTES ─── */}
      <section className="writing" id="writing">
        <div className="section-inner">
          <div className="section-head reveal">
            <div>
              <p className="section-label"><b>Field notes</b></p>
              <h2 className="section-title">Methods, rituals,<br /><em>quiet philosophy.</em></h2>
            </div>
            <p className="section-aside">Essays on the practice of catching ideas, clarifying them, and compounding them over time. New writing whenever there&rsquo;s something worth saying.</p>
          </div>

          <div className="writing-grid">
            <Link href="/essays/the-people-who-write-in-the-margins" className="post large reveal">
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
              <p className="post-meta">History · 11 min read</p>
              <h3 className="post-title">The people who write in the margins</h3>
            </Link>

            <Link href="/essays/the-index-method" className="post medium reveal">
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
              <p className="post-meta">Technique · 5 min read</p>
              <h3 className="post-title">The Index Method: how to never lose a thought again</h3>
            </Link>

            <Link href="/essays/notebooks-of-ancient-singers" className="post small reveal">
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
              <p className="post-meta">History · 8 min read</p>
              <h3 className="post-title">Notebooks of ancient singers</h3>
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
                    <line x1="50" y1="125" x2="90" y2="125"/>
                  </g>
                  <line x1="155" y1="40" x2="190" y2="20" stroke="#1A1612" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="190" cy="20" r="4" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
                </svg>
              </div>
              <p className="post-meta">History · 10 min</p>
              <h3 className="post-title">The Roman wax tablet, ancestor to all of this</h3>
            </Link>
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/blog" className="strip-button">
              All essays <span className="arrow">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ─── */}
      <section className="strip" id="contact">
        <div className="strip-deco" aria-hidden="true">
          <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#1A1612" strokeWidth="2" strokeDasharray="6 10"/>
            <circle cx="200" cy="200" r="120" fill="none" stroke="#1A1612" strokeWidth="2"/>
            <circle cx="200" cy="200" r="60" fill="#FF6B47" stroke="#1A1612" strokeWidth="2"/>
          </svg>
        </div>

        <div className="strip-content">
          <h2 className="strip-title">Begin a<br /><em>notebook.</em></h2>
          <div className="strip-action">
            <Link href="/shop" className="strip-button">
              Begin this week
              <span className="arrow">↗</span>
            </Link>
            <p className="strip-note">Ships across India · within 48 hours</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
