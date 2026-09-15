"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { primaryExperience, secondaryExperience } from "@/data/experience";
import { ChevronDown, Sparkles, Building2, ExternalLink } from "lucide-react";

export function ExperienceTimeline() {
  const [showSecondary, setShowSecondary] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div className="experience-timeline-container" aria-labelledby="experience-title">
      {/* Primary Experience Timeline Rows */}
      <div className="timeline-track">
        {primaryExperience.map((exp, idx) => (
          <motion.article
            key={exp.id}
            className={`experience-row ${exp.id}-experience`}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left Timeline Indicator */}
            <div className="timeline-node" aria-hidden="true">
              <div className="node-marker" />
              <div className="node-line" />
            </div>

            {/* Experience Body */}
            <div className="experience-card-surface">
              <header className="experience-header">
                <div className="experience-role-group">
                  <div className="company-logo-frame" aria-hidden="true">
                    {exp.id === "adobe" ? (
                      <span className="adobe-badge-mark">A</span>
                    ) : (
                      <Building2 className="size-4.5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="experience-role">{exp.role}</h3>
                    <p className="experience-company">
                      <strong>{exp.company}</strong>
                      {exp.team && <span className="team-sep"> · {exp.team}</span>}
                    </p>
                  </div>
                </div>

                <div className="experience-meta">
                  <time className="experience-period">{exp.period}</time>
                  <span className="experience-location">{exp.location}</span>
                </div>
              </header>

              <p className="experience-mission">{exp.mission}</p>

              {/* Quantified Metric Badges */}
              {exp.metrics && exp.metrics.length > 0 && (
                <div className="experience-metrics-row">
                  {exp.metrics.map((m) => (
                    <span className="exp-metric-pill" key={m.label}>
                      <b>{m.value}</b> {m.label}
                    </span>
                  ))}
                  {exp.patentNotice && (
                    <span className="exp-patent-pill">
                      <Sparkles className="size-3" /> {exp.patentNotice}
                    </span>
                  )}
                </div>
              )}

              {/* Evidence Bullets */}
              <ul className="experience-evidence-list">
                {exp.evidence.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>

              {/* Technologies */}
              <footer className="experience-footer">
                <div className="exp-tech-tags">
                  {exp.technologies.map((tech) => (
                    <span className="exp-tech-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exp-link"
                    aria-label={`Visit ${exp.company} website`}
                  >
                    <span>Website</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </footer>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Collapsible Earlier / Leadership Section */}
      <div className="secondary-experience-wrapper">
        <button
          type="button"
          className="toggle-secondary-btn"
          aria-expanded={showSecondary}
          onClick={() => setShowSecondary((v) => !v)}
        >
          <span>Earlier & Leadership Roles ({secondaryExperience.length})</span>
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${showSecondary ? "rotate-180" : ""}`}
          />
        </button>

        {showSecondary && (
          <motion.div
            className="secondary-experience-list"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {secondaryExperience.map((exp) => (
              <div className="secondary-exp-item" key={exp.id}>
                <div className="sec-header">
                  <div>
                    <h4 className="sec-role">{exp.role}</h4>
                    <span className="sec-company">{exp.company}</span>
                  </div>
                  <time className="sec-period">{exp.period}</time>
                </div>
                <p className="sec-mission">{exp.mission}</p>
                <div className="sec-tech-row">
                  {exp.technologies.map((t) => (
                    <span className="sec-tech-pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
