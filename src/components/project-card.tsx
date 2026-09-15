"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/data/projects";
import { FlowGradient } from "@/components/flow-gradient";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className={`gradient-art-card project-card visual-${project.visual}`}
      style={
        {
          "--card-gradient-from": project.gradient.from,
          "--card-gradient-via": project.gradient.via,
          "--card-gradient-to": project.gradient.to,
          "--card-glow": project.gradient.glow,
        } as React.CSSProperties
      }
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="card-luminous-canvas" aria-hidden="true">
        <div className="gradient-orb primary" />
        <div className="gradient-orb secondary" />
        <div className="card-noise-layer" />
      </div>

      <FlowGradient variant={index + 5} className="card-art-stage flow-gradient-art project-art-stage" />

      {/* Bespoke Project Visual Artwork */}
      <div className="card-art-stage project-art-stage legacy-card-art" aria-hidden="true">
        {project.visual === "signal" && (
          <svg className="project-svg signal-svg" viewBox="0 0 340 140" fill="none">
            <defs>
              <linearGradient id="sig-g" x1="0" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <circle cx="170" cy="70" r="48" stroke="url(#sig-g)" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="170" cy="70" r="30" stroke="#60a5fa" strokeWidth="1.5" />
            <circle cx="170" cy="70" r="14" fill="#1d4ed8" fillOpacity="0.4" stroke="#93c5fd" strokeWidth="1.5" />
            <circle cx="170" cy="70" r="4" fill="#ffffff" />
            <path d="M 40 70 Q 100 20, 170 70 T 300 70" stroke="url(#sig-g)" strokeWidth="1.5" />
          </svg>
        )}

        {project.visual === "layers" && (
          <svg className="project-svg layers-svg" viewBox="0 0 340 140" fill="none">
            <rect x="60" y="25" width="220" height="24" rx="5" fill="rgba(139,92,246,0.15)" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" />
            <rect x="50" y="55" width="240" height="26" rx="5" fill="rgba(109,40,217,0.3)" stroke="rgba(167,139,250,0.7)" strokeWidth="1.5" />
            <rect x="40" y="88" width="260" height="28" rx="5" fill="rgba(76,29,149,0.5)" stroke="rgba(192,132,252,0.9)" strokeWidth="1.5" />
            <text x="60" y="106" fill="#f3e8ff" fontSize="9.5" fontFamily="monospace" letterSpacing="0.1em">CIPHERTEXT BOUNDARY // XCHACHA20</text>
          </svg>
        )}

        {project.visual === "lanes" && (
          <svg className="project-svg lanes-svg" viewBox="0 0 340 140" fill="none">
            {[25, 45, 65, 85, 105].map((y, i) => (
              <g key={y}>
                <line x1="30" y1={y} x2="310" y2={y} stroke="rgba(245,158,11,0.25)" strokeWidth="1.2" />
                <line
                  x1={40 + i * 28}
                  y1={y}
                  x2={140 + i * 28}
                  y2={y}
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx={140 + i * 28} cy={y} r="3" fill="#fef3c7" />
              </g>
            ))}
          </svg>
        )}

        {project.visual === "paths" && (
          <svg className="project-svg paths-svg" viewBox="0 0 340 140" fill="none">
            <path d="M 30 40 H 120 L 170 80 H 310" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" />
            <path d="M 30 80 H 130 L 180 40 H 310" stroke="rgba(14,165,233,0.85)" strokeWidth="2" />
            <path d="M 30 110 H 200 L 230 80 H 310" stroke="rgba(125,211,252,0.6)" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="180" cy="40" r="4" fill="#38bdf8" />
            <circle cx="170" cy="80" r="4" fill="#0ea5e9" />
          </svg>
        )}

        {project.visual === "redact" && (
          <svg className="project-svg redact-svg" viewBox="0 0 340 140" fill="none">
            <rect x="40" y="30" width="260" height="80" rx="6" fill="rgba(15,23,42,0.6)" stroke="rgba(236,72,153,0.3)" strokeWidth="1.5" />
            <rect x="60" y="45" width="80" height="14" rx="2" fill="#be185d" />
            <rect x="150" y="45" width="130" height="14" rx="2" fill="rgba(255,255,255,0.12)" />
            <rect x="60" y="68" width="140" height="14" rx="2" fill="rgba(255,255,255,0.12)" />
            <rect x="210" y="68" width="70" height="14" rx="2" fill="#ec4899" fillOpacity="0.7" />
            <rect x="60" y="90" width="90" height="10" rx="2" fill="rgba(255,255,255,0.1)" />
          </svg>
        )}

        {project.visual === "grid" && (
          <svg className="project-svg grid-svg" viewBox="0 0 340 140" fill="none">
            <defs>
              <pattern id="medicams-grid-pat" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="30" y="20" width="280" height="100" rx="6" fill="url(#medicams-grid-pat)" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="5" fill="#10b981" />
            <circle cx="210" cy="84" r="5" fill="#34d399" />
            <line x1="120" y1="60" x2="210" y2="84" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        )}
      </div>

      <div className="card-content-stage">
        <div className="card-meta-row">
          <span className="card-category-eyebrow">{project.category}</span>
          {project.metrics?.[0] && (
            <span className="card-status-pill">{project.metrics[0].value}</span>
          )}
        </div>

        <h3 className="card-heading">
          <Link href={`/projects/${project.slug}`} className="card-title-link">
            {project.title}
          </Link>
        </h3>

        <p className="card-one-liner">{project.oneLiner}</p>

        <div className="card-tech-pills">
          {project.technologies.slice(0, 4).map((tech) => (
            <span className="tech-pill" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        <div className="card-links-row">
          <Link href={`/projects/${project.slug}`} className="project-detail-link">
            Case study ↗
          </Link>
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="project-source-link"
          >
            Source ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}
