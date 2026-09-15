"use client";

import Link from "next/link";
import { profile } from "@/data/profile";
import { ArrowUpRight, ArrowUp, Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="site-footer" aria-labelledby="contact-heading">
      <div className="footer-inner">
        {/* Main Conversation CTA Stage */}
        <div className="footer-cta-stage">
          <div className="footer-eyebrow-row">
            <span className="eyebrow">14 // CONTACT</span>
            <span className="footer-status-pill">
              <i className="status-dot-emerald" /> Available for Select Problems
            </span>
          </div>

          <h2 id="contact-heading" className="footer-title">
            Let’s build something <br />
            <em className="highlight-text">verifiably precise.</em>
          </h2>

          <p className="footer-desc">
            Whether it’s low-level systems, kernel optimization, multimodal AI inference,
            or resilient product engineering—I’m always glad to talk with engineers and researchers.
          </p>

          <div className="footer-actions-row">
            <a
              href={`mailto:${profile.email}`}
              className="primary-email-btn"
              aria-label={`Email Anushk Kumar at ${profile.email}`}
            >
              <Mail className="size-4" />
              <span>{profile.email}</span>
              <ArrowUpRight className="size-4" />
            </a>

            <div className="footer-social-cluster">
              <a
                href={profile.sources.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="size-4" />
                <span>GitHub</span>
              </a>

              <a
                href={profile.sources.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="size-4" />
                <span>LinkedIn</span>
              </a>

              <Link href="/resume" className="social-icon-btn" aria-label="Resume">
                <FileText className="size-4" />
                <span>Resume</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Colophon & Bottom Metadata */}
        <div className="footer-colophon">
          <div className="colophon-left">
            <p className="colophon-item">
              © {new Date().getFullYear()} Anushk Kumar. All rights reserved.
            </p>
            <p className="colophon-item">
              Indraprastha Institute of Information Technology, Delhi · New Delhi, India
            </p>
          </div>

          <div className="colophon-right">
            <span className="colophon-stack">
              Next.js 16 · React 19 · Motion · Three.js · Astryx
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Scroll to top of page"
            >
              <span>Top</span>
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
