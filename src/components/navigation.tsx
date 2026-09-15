"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteActions } from "./site-actions";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header ${isScrolled ? "is-condensed" : ""}`}>
      <div className="header-inner">
        {/* Monogram Brand Mark */}
        <Link href="/" className="brand-monogram" aria-label="Anushk Kumar — Home">
          <svg
            className="monogram-svg"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="7" fill="#131517" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <path
              d="M8 24 L12.8 8 H15.2 L20 24 H17.1 L16.1 20.5 H11.9 L10.9 24 H8 Z M12.6 18 H15.4 L14 12.8 Z"
              fill="#ffffff"
            />
            <path
              d="M20.5 8 H23.2 L18.2 16.2 L23.8 24 H20.8 L16.3 17.2 L18.5 13.5 L20.5 8 Z"
              fill="#ffffff"
            />
            <rect x="22" y="22" width="4" height="2" rx="0.5" fill="#38bdf8" />
          </svg>
          <span className="brand-name">Anushk Kumar</span>
        </Link>

        {/* Desktop Primary Nav */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <Link
            href="/#about"
            className={`nav-link ${pathname === "/" ? "is-home" : ""}`}
          >
            About
          </Link>
          <Link href="/#experience" className="nav-link">
            Experience
          </Link>
          <Link href="/#research" className="nav-link">
            Research
          </Link>
          <Link
            href="/projects"
            className={`nav-link ${pathname.startsWith("/projects") ? "is-active" : ""}`}
          >
            Projects
          </Link>
          <Link
            href="/oss"
            className={`nav-link ${pathname.startsWith("/oss") ? "is-active" : ""}`}
          >
            Open Source
          </Link>
          <Link
            href="/blog"
            className={`nav-link ${pathname.startsWith("/blog") ? "is-active" : ""}`}
          >
            Blog
          </Link>
          <Link
            href="/resume"
            className={`nav-link resume-pill-link ${pathname === "/resume" ? "is-active" : ""}`}
          >
            Resume
          </Link>
        </nav>

        {/* Header Right Actions */}
        <div className="header-right-actions">
          <SiteActions />
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((open) => !open)}
          >
            {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <nav className="mobile-nav-links">
            <Link href="/#about" className="mobile-link" onClick={() => setIsMobileOpen(false)}>
              About
            </Link>
            <Link href="/#skills" className="mobile-link" onClick={() => setIsMobileOpen(false)}>
              Skills
            </Link>
            <Link href="/#experience" className="mobile-link" onClick={() => setIsMobileOpen(false)}>
              Experience
            </Link>
            <Link href="/#research" className="mobile-link" onClick={() => setIsMobileOpen(false)}>
              Research
            </Link>
            <Link href="/projects" className="mobile-link" onClick={() => setIsMobileOpen(false)}>
              Projects
            </Link>
            <Link href="/oss" className="mobile-link" onClick={() => setIsMobileOpen(false)}>
              Open Source
            </Link>
            <Link href="/blog" className="mobile-link" onClick={() => setIsMobileOpen(false)}>
              Blog
            </Link>
            <Link href="/resume" className="mobile-link" onClick={() => setIsMobileOpen(false)}>
              Resume
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
