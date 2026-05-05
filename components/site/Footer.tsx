import Link from "next/link";

export function Footer() {
  return (
    <footer className="pn-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-brand-title">
              Pocket<br /><em>Notes</em>
            </h3>
            <p>
              A capture device for fast thinkers. Small grid notebooks, made in India,
              for people who already write.
            </p>
          </div>
          <div className="footer-col">
            <h4>The notebooks</h4>
            <ul>
              <li><Link href="/shop">Founder&rsquo;s 500</Link></li>
              <li><Link href="/shop">Flow Series</Link></li>
              <li><Link href="/about">About us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Say hello</h4>
            <ul>
              <li><a href="mailto:hello@pocketnotes.in">hello@pocketnotes.in</a></li>
              <li><Link href="/blog">From the notebook</Link></li>
              <li><a href="#" aria-disabled>Instagram ↗</a></li>
              <li><a href="#" aria-disabled>Newsletter ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Pocket Notes</span>
          <span>Small Books, Big Ideas · Made in India</span>
        </div>
      </div>
    </footer>
  );
}
