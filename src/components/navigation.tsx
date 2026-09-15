"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    const frame = window.requestAnimationFrame(() => setIsMobileOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <header className={`site-header ${isScrolled ? "is-condensed" : ""}`}>
      <div className="header-inner">
        {/* Brand Mark */}
        <Link href="/" className="brand-monogram" aria-label="Anushk Kumar — Home">
          <Image src="/logo.svg" alt="" width={76} height={43} className="brand-logo" priority />
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
          </nav>
        </div>
      )}
    </header>
  );
}
