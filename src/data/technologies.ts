export interface Technology {
  name: string;
  category: TechCategory;
  context: string;
  badge?: string;
  iconSlug?: string;
}

export type TechCategory =
  | "Languages & Runtimes"
  | "Frontend & Product"
  | "Backend & APIs"
  | "AI / ML"
  | "Systems & GPU"
  | "Data & Persistence"
  | "Cloud & DevOps"
  | "Security"
  | "Design & Motion";

export const techCategories: TechCategory[] = [
  "Languages & Runtimes",
  "Frontend & Product",
  "Backend & APIs",
  "AI / ML",
  "Systems & GPU",
  "Data & Persistence",
  "Cloud & DevOps",
  "Security",
  "Design & Motion",
];

export const technologies: Technology[] = [
  // Languages & Runtimes
  { name: "Python", category: "Languages & Runtimes", context: "Used in HiPeC LLM quantization, TrueSight, & M-SCAN" },
  { name: "C", category: "Languages & Runtimes", context: "Used in Linux Kernel NIC driver & ELF loader" },
  { name: "C++", category: "Languages & Runtimes", context: "Used in CUDA video processing & parallel multi-threading" },
  { name: "Rust", category: "Languages & Runtimes", context: "Used in KryptVault desktop backend & RISC-V parser" },
  { name: "CUDA", category: "Languages & Runtimes", context: "Used in GPU capstone & parallel video filtering" },
  { name: "TypeScript", category: "Languages & Runtimes", context: "Used in Resxiv, KryptVault, & portfolio" },
  { name: "JavaScript", category: "Languages & Runtimes", context: "Used across web frontend & Three.js" },
  { name: "Kotlin", category: "Languages & Runtimes", context: "Used in Amber offline multimodal Android companion" },
  { name: "Java", category: "Languages & Runtimes", context: "Used in Spring Boot microservices & AngryBirds GUI" },

  // Frontend & Product
  { name: "Next.js", category: "Frontend & Product", context: "Used in MedicaMS, Resxiv, & portfolio" },
  { name: "React", category: "Frontend & Product", context: "Used across modern reactive UI platforms" },
  { name: "React Native", category: "Frontend & Product", context: "Used for cross-platform mobile apps" },
  { name: "Tailwind CSS", category: "Frontend & Product", context: "Used in Resxiv & web client interfaces" },
  { name: "Tauri", category: "Frontend & Product", context: "Used in KryptVault cross-platform desktop client" },
  { name: "Jetpack Compose", category: "Frontend & Product", context: "Used in Amber native Android UI" },
  { name: "Monaco / AceEditor", category: "Frontend & Product", context: "Used in Resxiv code-native editing portal" },

  // Backend & APIs
  { name: "FastAPI", category: "Backend & APIs", context: "Used in Resxiv high-concurrency microservices" },
  { name: "Spring Boot", category: "Backend & APIs", context: "Used in Resxiv resilient backend services" },
  { name: "Hono", category: "Backend & APIs", context: "Used in KryptVault high-performance backend API" },

  // AI / ML
  { name: "PyTorch", category: "AI / ML", context: "Used in HiPeC LLM research & CVPR M-SCAN training" },
  { name: "ONNX Runtime", category: "AI / ML", context: "Used in 87.25% HPCorpus CPU inference pipeline" },
  { name: "Gemma", category: "AI / ML", context: "Used in Amber on-device multimodal companion" },
  { name: "Computer Vision", category: "AI / ML", context: "Used in SocialDF benchmark & autonomous vehicle testing" },
  { name: "NLP", category: "AI / ML", context: "Used in TrueSight redaction & ROSBag natural language query" },
  { name: "Vosk", category: "AI / ML", context: "Used for offline speech recognition in Amber" },

  // Systems & GPU
  { name: "ROS1 / ROS2", category: "Systems & GPU", context: "Used in IRAS-Hub robotics research" },
  { name: "ROSBag", category: "Systems & GPU", context: "Queried via natural-language interface at IRAS-Hub" },
  { name: "OpenMP", category: "Systems & GPU", context: "Used in HiPeC low-resource multi-threaded computing" },
  { name: "RISC-V", category: "Systems & GPU", context: "Used in 32-bit assembler & instruction simulator" },

  // Data & Persistence
  { name: "PostgreSQL", category: "Data & Persistence", context: "Used in MedicaMS, Resxiv, & KryptVault" },
  { name: "Drizzle ORM", category: "Data & Persistence", context: "Used in MedicaMS type-safe database schemas" },
  { name: "Better Auth", category: "Data & Persistence", context: "Used in MedicaMS & Resxiv authentication" },
  { name: "Supabase", category: "Data & Persistence", context: "Used in SDOS agent ingestion & database layer" },
  { name: "SQLCipher", category: "Data & Persistence", context: "Used for encrypted local databases" },
  { name: "S3 Storage", category: "Data & Persistence", context: "Used in KryptVault encrypted object uploads" },

  // Cloud & DevOps
  { name: "Docker", category: "Cloud & DevOps", context: "Used across Resxiv, IRAS-Hub, & GPU capstone" },
  { name: "GitHub Actions", category: "Cloud & DevOps", context: "Used for CI/CD automation & testing" },
  { name: "Google Cloud / GCP", category: "Cloud & DevOps", context: "Used for cloud functions & compute" },
  { name: "Vertex AI", category: "Cloud & DevOps", context: "Integrated in Documentation-Agent & Meeting-agent PRs" },
  { name: "LangSmith", category: "Cloud & DevOps", context: "Integrated tracing for autonomous agents" },
  { name: "Cloudflare CDN", category: "Cloud & DevOps", context: "Used for low-latency asset delivery in Resxiv" },
  { name: "Vercel", category: "Cloud & DevOps", context: "Used for edge deployments" },

  // Security
  { name: "libsodium", category: "Security", context: "Used for secure cryptographic key wrapping" },
  { name: "XChaCha20-Poly1305", category: "Security", context: "Used in KryptVault AEAD encryption pipeline" },
  { name: "libpcap", category: "Security", context: "Used for low-level packet capture & network analysis" },

  // Design & Motion
  { name: "Figma", category: "Design & Motion", context: "Used for interface design & component systems" },
  { name: "Framer Motion", category: "Design & Motion", context: "Used in Resxiv & web client animations" },
  { name: "Adobe Illustrator", category: "Design & Motion", context: "Used at ESYA IIITD & Adobe Internship UI tooling" },
  { name: "LaTeX / TeX Live", category: "Design & Motion", context: "Used for research papers & Resxiv PDF compile" },
  { name: "Three.js", category: "Design & Motion", context: "Used for interactive WebGL computational core" },
  { name: "Motion", category: "Design & Motion", context: "Used for fluid layout transitions & springs" },
];
