export interface CoreSkillGroup {
  id: string;
  group: string;
  tagline: string;
  items: string[];
  color: string;
  accentHex: string;
  description: string;
}

export const coreSkills: CoreSkillGroup[] = [
  {
    id: "systems-compute",
    group: "Systems & Compute",
    tagline: "Close to the silicon",
    items: ["CUDA", "C", "C++", "Rust", "RISC-V"],
    color: "amber",
    accentHex: "#f59e0b",
    description:
      "High-performance parallel kernels, memory models, hardware instruction simulation, and systems-level memory management.",
  },
  {
    id: "applied-ai",
    group: "Applied AI",
    tagline: "Models & inference",
    items: ["Python", "Computer Vision", "NLP", "Gemma"],
    color: "electric-blue",
    accentHex: "#3b82f6",
    description:
      "Deep learning pipelines, multimodal on-device intelligence, quantizing LLMs for CPU HPC, and multi-view cross attention.",
  },
  {
    id: "product-engineering",
    group: "Product Engineering",
    tagline: "End-to-end architectures",
    items: ["TypeScript", "Next.js", "PostgreSQL", "Kotlin"],
    color: "emerald",
    accentHex: "#10b981",
    description:
      "Modern full-stack web platforms, native Android & desktop client apps, high-concurrency microservices, and reactive UX.",
  },
  {
    id: "security",
    group: "Security",
    tagline: "Provable boundaries",
    items: ["Encryption", "Network Analysis", "libpcap"],
    color: "plum",
    accentHex: "#a855f7",
    description:
      "Zero-knowledge storage protocols, authenticated AEAD primitives, packet inspection, and fine-grained role-based policies.",
  },
];
