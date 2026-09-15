"use client";

import { useState } from "react";
import Image from "next/image";
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

const technologyIconSlugs: Record<string, string> = {
  Python: "python",
  C: "c",
  "C++": "cplusplus",
  Rust: "rust",
  CUDA: "nvidia",
  TypeScript: "typescript",
  JavaScript: "javascript",
  Kotlin: "kotlin",
  Java: "openjdk",
  "Next.js": "nextdotjs",
  React: "react",
  "React Native": "react",
  "Tailwind CSS": "tailwindcss",
  Tauri: "tauri",
  "Jetpack Compose": "jetpackcompose",
  "Monaco / AceEditor": "monaco",
  FastAPI: "fastapi",
  "Spring Boot": "springboot",
  Hono: "hono",
  PyTorch: "pytorch",
  "ONNX Runtime": "onnx",
  Gemma: "google",
  "Computer Vision": "opencv",
  NLP: "huggingface",
  Vosk: "vosk",
  "ROS1 / ROS2": "ros",
  ROSBag: "ros",
  OpenMP: "openmp",
  "RISC-V": "riscv",
  PostgreSQL: "postgresql",
  "Drizzle ORM": "drizzle",
  "Better Auth": "betterauth",
  Supabase: "supabase",
  SQLCipher: "sqlite",
  "S3 Storage": "amazons3",
  Docker: "docker",
  "GitHub Actions": "githubactions",
  "Google Cloud / GCP": "googlecloud",
  "Vertex AI": "googlecloud",
  LangSmith: "langchain",
  "Cloudflare CDN": "cloudflare",
  Vercel: "vercel",
  libsodium: "sodium",
  "XChaCha20-Poly1305": "openssl",
  libpcap: "wireshark",
  Figma: "figma",
  "Framer Motion": "framer",
  "Adobe Illustrator": "adobeillustrator",
  "LaTeX / TeX Live": "latex",
  "Three.js": "threedotjs",
  Motion: "motion",
};

function technologyIconUrl(name: string) {
  const slug = technologyIconSlugs[name];
  return slug ? `https://cdn.simpleicons.org/${slug}/b8bec7` : null;
}

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
                {technologyIconUrl(tech.name) ? (
                  <Image
                    src={technologyIconUrl(tech.name) ?? ""}
                    alt=""
                    className="technology-brand-icon"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    width={16}
                    height={16}
                    unoptimized
                  />
                ) : (
                  <Cpu className="size-4" aria-hidden="true" />
                )}
              </div>
              <span className="tech-label">{tech.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
