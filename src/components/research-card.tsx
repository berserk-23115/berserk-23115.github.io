"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Publication } from "@/data/publications";

interface ResearchCardProps {
  publication: Publication;
  index: number;
}

export function ResearchCard({ publication, index }: ResearchCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className={`gradient-art-card research-card theme-${publication.colorFamily}`}
      style={
        {
          "--card-gradient-from": publication.gradient.from,
          "--card-gradient-via": publication.gradient.via,
          "--card-gradient-to": publication.gradient.to,
          "--card-glow": publication.gradient.glow,
        } as React.CSSProperties
      }
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Luminous Gradient Canvas with Texture */}
      <div className="card-luminous-canvas" aria-hidden="true">
        <div className="gradient-orb primary" />
        <div className="gradient-orb secondary" />
        <div className="gradient-conic" />
        <div className="card-noise-layer" />
      </div>

      {/* Bespoke Interactive SVG Art for the Paper */}
      <div className="card-art-stage" aria-hidden="true">
        {publication.visualType === "deepfake-split" ? (
          <svg
            className="research-svg deepfake-split-svg"
            viewBox="0 0 460 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="split-line-grad" x1="0" y1="0" x2="0" y2="220" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="audio-wave-grad" x1="0" y1="0" x2="460" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Video Frame Canvas Grids */}
            <rect x="40" y="24" width="180" height="110" rx="8" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="rgba(15,23,42,0.45)" />
            <rect x="240" y="24" width="180" height="110" rx="8" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="rgba(15,23,42,0.45)" />

            {/* Left: Genuine Face Landmark Wireframe */}
            <g stroke="rgba(56,189,248,0.7)" strokeWidth="1" opacity="0.85">
              <ellipse cx="130" cy="72" rx="34" ry="42" strokeDasharray="3 3" />
              <circle cx="118" cy="66" r="4" fill="rgba(56,189,248,0.4)" />
              <circle cx="142" cy="66" r="4" fill="rgba(56,189,248,0.4)" />
              <path d="M124 92 Q130 97 136 92" strokeWidth="1.5" />
              <line x1="96" y1="72" x2="164" y2="72" strokeOpacity="0.3" />
              <line x1="130" y1="30" x2="130" y2="114" strokeOpacity="0.3" />
            </g>
            <text x="52" y="44" fill="#38bdf8" fontSize="10" fontFamily="monospace" letterSpacing="0.08em">AUTHENTIC // 1,071</text>

            {/* Right: Manipulated Face Artifact Spectrum */}
            <g stroke="rgba(244,114,182,0.8)" strokeWidth="1">
              <ellipse cx="330" cy="72" rx="34" ry="42" strokeDasharray="4 2" />
              <circle cx="318" cy="66" r="4" fill="rgba(244,114,182,0.5)" />
              <circle cx="342" cy="66" r="4" fill="rgba(244,114,182,0.5)" />
              <path d="M322 90 Q330 96 338 90" strokeWidth="1.5" />
              {/* Synthetic Artifact Points */}
              <circle cx="312" cy="52" r="2.5" fill="#f43f5e" />
              <circle cx="348" cy="54" r="2.5" fill="#f43f5e" />
              <circle cx="330" cy="99" r="2.5" fill="#f43f5e" />
              <line x1="312" y1="52" x2="348" y2="54" stroke="#f43f5e" strokeDasharray="2 2" strokeOpacity="0.5" />
            </g>
            <text x="252" y="44" fill="#f472b6" fontSize="10" fontFamily="monospace" letterSpacing="0.08em">MANIPULATED // 1,055</text>

            {/* Central Forensic Boundary Divider */}
            <line x1="230" y1="14" x2="230" y2="150" stroke="url(#split-line-grad)" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="230" cy="79" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="230" cy="79" r="2.5" fill="#38bdf8" />

            {/* Bottom Audio/Speech Spectrogram Layer */}
            <path
              d="M 30 185 Q 70 160, 110 185 T 190 185 T 270 170 T 350 195 T 430 180"
              stroke="url(#audio-wave-grad)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 30 195 Q 80 210, 130 195 T 230 195 T 330 205 T 430 195"
              stroke="rgba(129, 140, 248, 0.4)"
              strokeWidth="1.2"
              fill="none"
            />
            <text x="32" y="162" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">
              MULTIMODAL AUDIO-VISUAL FORENSICS VERIFICATION
            </text>
          </svg>
        ) : (
          <svg
            className="research-svg mri-cross-attention-svg"
            viewBox="0 0 460 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="attention-link-grad" x1="100" y1="60" x2="360" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* 3 Cross-sectional MRI Planes Isometric Stack */}
            {/* Plane 1: Sagittal T1 */}
            <g transform="translate(40, 20) skewY(-8) scale(0.9, 0.75)">
              <rect width="130" height="150" rx="8" fill="rgba(15,23,42,0.65)" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" />
              {/* Vertebrae Spine Contours */}
              <ellipse cx="65" cy="40" rx="36" ry="18" stroke="rgba(56,189,248,0.7)" strokeWidth="1.2" fill="none" />
              <ellipse cx="65" cy="78" rx="38" ry="20" stroke="rgba(56,189,248,0.85)" strokeWidth="1.2" fill="none" />
              <ellipse cx="65" cy="116" rx="35" ry="17" stroke="rgba(56,189,248,0.6)" strokeWidth="1.2" fill="none" />
              <text x="14" y="24" fill="#38bdf8" fontSize="11" fontFamily="monospace">SAGITTAL T1</text>
            </g>

            {/* Plane 2: Sagittal T2 / STIR */}
            <g transform="translate(170, 30) skewY(-8) scale(0.9, 0.75)">
              <rect width="130" height="150" rx="8" fill="rgba(15,23,42,0.75)" stroke="rgba(129,140,248,0.5)" strokeWidth="1.5" />
              <ellipse cx="65" cy="40" rx="36" ry="18" stroke="rgba(129,140,248,0.7)" strokeWidth="1.2" fill="none" />
              <ellipse cx="65" cy="78" rx="38" ry="20" stroke="rgba(129,140,248,0.9)" strokeWidth="1.5" fill="rgba(129,140,248,0.15)" />
              <ellipse cx="65" cy="116" rx="35" ry="17" stroke="rgba(129,140,248,0.6)" strokeWidth="1.2" fill="none" />
              <text x="14" y="24" fill="#818cf8" fontSize="11" fontFamily="monospace">SAGITTAL T2</text>
            </g>

            {/* Plane 3: Axial T2 */}
            <g transform="translate(300, 40) skewY(-8) scale(0.9, 0.75)">
              <rect width="130" height="150" rx="8" fill="rgba(15,23,42,0.85)" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" />
              {/* Spinal Canal Stenosis Aperture */}
              <ellipse cx="65" cy="75" rx="28" ry="32" stroke="rgba(6,182,212,0.9)" strokeWidth="1.5" fill="rgba(6,182,212,0.2)" />
              <circle cx="65" cy="75" r="10" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="14" y="24" fill="#06b6d4" fontSize="11" fontFamily="monospace">AXIAL T2</text>
            </g>

            {/* Multi-view Cross-Attention Rays */}
            <path
              d="M 120 78 C 190 40, 240 120, 370 95"
              stroke="url(#attention-link-grad)"
              strokeWidth="2"
              strokeDasharray="4 2"
              fill="none"
            />
            <path
              d="M 125 105 C 210 130, 260 70, 365 110"
              stroke="url(#attention-link-grad)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
            />
            <circle cx="245" cy="98" r="4.5" fill="#38bdf8" />
            <circle cx="245" cy="98" r="10" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1" />

            <text x="42" y="200" fill="rgba(255,255,255,0.5)" fontSize="9.5" fontFamily="monospace" letterSpacing="0.1em">
              MULTI-VIEW SEQUENCE ATTENTION // AUROC 0.971
            </text>
          </svg>
        )}
      </div>

      {/* Card Content Stage */}
      <div className="card-content-stage">
        <div className="card-meta-row">
          <span className="card-venue-badge">{publication.venue}</span>
          {publication.demonstrationNote && (
            <span className="card-demo-pill">{publication.demonstrationNote}</span>
          )}
        </div>

        <h3 className="card-heading">{publication.title}</h3>
        <p className="card-authors">{publication.authors}</p>
        <p className="card-summary">{publication.summary}</p>

        {/* Evidence Metric Chips */}
        <div className="card-metrics-grid">
          {publication.metrics.map((m) => (
            <div className="metric-chip" key={m.label}>
              <span className="metric-label">{m.label}</span>
              <strong className="metric-value">{m.value}</strong>
            </div>
          ))}
        </div>

        <div className="card-footer-action">
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card-cta-button"
            aria-label={`Read paper for ${publication.title}`}
          >
            <span>{publication.doi ? "Read paper" : "Read preprint"}</span>
            <svg
              className="arrow-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
