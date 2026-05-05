"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <div
        className={`nav-mobile-menu ${open ? "open" : ""}`}
        role="dialog"
        aria-label="Navigation menu"
      >
        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
        <Link href="/blog" onClick={() => setOpen(false)}>Essays</Link>
      </div>

      <nav className="pn-nav" aria-label="Main navigation">
        <Link href="/" className="nav-logo">
          <span className="nav-logo-dot" aria-hidden="true" />
          <span>Pocket Notes</span>
        </Link>
        <ul className="nav-links">
          <li><Link href="/" className={isActive("/") ? "active" : ""}>Home</Link></li>
          <li><Link href="/about" className={isActive("/about") ? "active" : ""}>About</Link></li>
          <li><Link href="/shop" className={isActive("/shop") ? "active" : ""}>Shop</Link></li>
          <li><Link href="/blog" className={isActive("/blog") ? "active" : ""}>From the notebook</Link></li>
        </ul>
        <Link href="/shop" className="nav-cta">Carry the method ↗</Link>
        <button
          type="button"
          className={`nav-hamburger ${open ? "open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>
    </>
  );
}
