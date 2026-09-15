"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  techCategories,
  technologies,
  type TechCategory,
  type Technology,
} from "@/data/technologies";
import {
  Terminal,
  Cpu,
  Server,
  Brain,
  Database,
  Cloud,
  Shield,
  Palette,
  Layers,
  Code2,
} from "lucide-react";

const categoryIcons: Record<TechCategory, React.ReactNode> = {
  "Languages & Runtimes": <Code2 className="size-4" />,
  "Frontend & Product": <Layers className="size-4" />,
  "Backend & APIs": <Server className="size-4" />,
  "AI / ML": <Brain className="size-4" />,
  "Systems & GPU": <Cpu className="size-4" />,
  "Data & Persistence": <Database className="size-4" />,
  "Cloud & DevOps": <Cloud className="size-4" />,
  Security: <Shield className="size-4" />,
  "Design & Motion": <Palette className="size-4" />,
};

export function TechCloud() {
  const [activeCategory, setActiveCategory] = useState<TechCategory | "All">("All");
  const [hoveredTech, setHoveredTech] = useState<Technology | null>(null);

  const filtered =
    activeCategory === "All"
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  return (
    <div className="tech-stack-section" aria-labelledby="tech-stack-title">
      {/* Category Navigation Filter Pills */}
      <div className="tech-categories-nav" role="tablist" aria-label="Technology categories">
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "All"}
          className={`tech-tab-btn ${activeCategory === "All" ? "is-active" : ""}`}
          onClick={() => setActiveCategory("All")}
        >
          <Terminal className="size-3.5" />
          <span>All ({technologies.length})</span>
        </button>

        {techCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat}
            className={`tech-tab-btn ${activeCategory === cat ? "is-active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {categoryIcons[cat]}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Interactive Context Inspector Bar */}
      <div className="tech-context-inspector" aria-live="polite">
        {hoveredTech ? (
          <div className="inspector-content">
            <span className="inspector-badge">{hoveredTech.category}</span>
            <strong className="inspector-name">{hoveredTech.name}</strong>
            <span className="inspector-arrow">→</span>
            <span className="inspector-desc">{hoveredTech.context}</span>
          </div>
        ) : (
          <div className="inspector-placeholder">
            <span>Hover or focus any technology to inspect where and how it was used in research & systems.</span>
          </div>
        )}
      </div>

      {/* Icon Grid */}
      <motion.div layout className="tech-grid" role="list">
        <AnimatePresence>
          {filtered.map((tech) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={tech.name}
              role="listitem"
              tabIndex={0}
              className={`tech-item ${hoveredTech?.name === tech.name ? "is-active" : ""}`}
              onPointerEnter={() => setHoveredTech(tech)}
              onPointerLeave={() => setHoveredTech(null)}
              onFocus={() => setHoveredTech(tech)}
              onBlur={() => setHoveredTech(null)}
              aria-label={`${tech.name}: ${tech.context}`}
            >
              <div className="tech-icon-frame">
                {categoryIcons[tech.category] || <Cpu className="size-4" />}
              </div>
              <span className="tech-label">{tech.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
