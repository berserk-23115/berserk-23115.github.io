export interface Project {
  slug: string;
  repo: string;
  title: string;
  category: string;
  tagline: string;
  oneLiner: string;
  problem: string;
  solution: string;
  architecture: string;
  keyDecisions: string[];
  technologies: string[];
  source: string;
  liveUrl?: string;
  featured: boolean;
  visual: "signal" | "layers" | "lanes" | "paths" | "redact" | "grid";
  labels: string[];
  gradient: {
    from: string;
    via: string;
    to: string;
    glow: string;
  };
  metrics?: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: "amber",
    repo: "Amber",
    title: "Amber",
    category: "Private Multimodal AI",
    tagline: "A companion that remembers.",
    oneLiner:
      "Offline-first Gemma-powered Android companion assisting people with dementia through on-device multimodal intelligence.",
    problem:
      "Individuals navigating early-stage dementia experience disorientation, face recognition fatigue, and medication confusion. Cloud-reliant AI assistants present unacceptable privacy risks for sensitive domestic environments and fail completely without active Internet access.",
    solution:
      "Engineered an entirely local, always-listening Android companion utilizing on-device Gemma 4 multimodal models. Amber processes camera input, ambient speech (via Vosk), and memory graphs locally without transmitting biometric or personal data off-device.",
    architecture:
      "Native Android application written in Kotlin with Jetpack Compose. Coordinates an on-device quantized Gemma inference pipeline, a low-latency foreground audio capture service, and an encrypted local graph database for facial recognition and routine reminders.",
    keyDecisions: [
      "Chose on-device Gemma over remote APIs to guarantee zero-leakage patient privacy and strict offline operation.",
      "Implemented an offline speech-to-text pipeline using Vosk to eliminate cloud transcription dependencies.",
      "Designed a high-contrast, calm interface minimizing cognitive load for neurodivergent and elderly users.",
    ],
    technologies: ["Kotlin", "Gemma", "Android", "Jetpack Compose", "Vosk", "SQLite"],
    source: "https://github.com/berserk-23115/Amber",
    featured: true,
    visual: "signal",
    labels: ["VISION", "SPEECH", "LOCAL GEMMA", "OFFLINE"],
    gradient: {
      from: "#3b82f6",
      via: "#1d4ed8",
      to: "#60a5fa",
      glow: "rgba(59, 130, 246, 0.25)",
    },
    metrics: [
      { label: "Deployment", value: "100% On-Device" },
      { label: "Model", value: "Gemma 4 Multimodal" },
      { label: "Privacy", value: "Zero Cloud Egress" },
    ],
  },
  {
    slug: "kryptvault",
    repo: "KryptVault",
    title: "KryptVault",
    category: "Usable Security & Storage",
    tagline: "Your files. Your boundaries.",
    oneLiner:
      "Zero-knowledge encrypted storage platform utilizing XChaCha20-Poly1305 AEAD and fine-grained access policies.",
    problem:
      "Commercial cloud storage providers retain custody of user keys or rely on cumbersome PGP tooling that creates severe friction for everyday file sharing, leaving assets exposed to platform breaches and unauthorized access.",
    solution:
      "Engineered a cross-platform desktop application and high-performance backend where files are encrypted client-side before touching the network. Employs libsodium key wrapping and authenticated AEAD encryption for zero-knowledge guarantees.",
    architecture:
      "Cross-platform desktop client built with Tauri and Rust, wrapping native libsodium cryptographic primitives. The backend is built on Hono and PostgreSQL for metadata indexing, paired with an S3-compatible encrypted blob storage pipeline.",
    keyDecisions: [
      "Adopted XChaCha20-Poly1305 for its extended 192-bit nonce, eliminating nonce-collision risks in distributed clients.",
      "Used Tauri instead of Electron to minimize desktop memory footprint by 85% and execute crypto routines directly in compiled Rust.",
      "Decoupled metadata storage from ciphertext chunk streaming to preserve zero-knowledge boundary proofs.",
    ],
    technologies: ["Rust", "Tauri", "TypeScript", "Hono", "PostgreSQL", "libsodium"],
    source: "https://github.com/berserk-23115/KryptVault",
    featured: true,
    visual: "layers",
    labels: ["AEAD", "XCHACHA20", "TAURI", "ZERO-KNOWLEDGE"],
    gradient: {
      from: "#8b5cf6",
      via: "#6d28d9",
      to: "#c084fc",
      glow: "rgba(139, 92, 246, 0.25)",
    },
    metrics: [
      { label: "Cipher", value: "XChaCha20-Poly1305" },
      { label: "Desktop Runtime", value: "Tauri + Rust" },
      { label: "Protocol", value: "Zero-Knowledge" },
    ],
  },
  {
    slug: "gpu-video-processor",
    repo: "GPU-Specialisation-Capstone",
    title: "CUDA Parallel Video Processor",
    category: "GPU Compute & Kernel Engineering",
    tagline: "Every frame, a parallel problem.",
    oneLiner:
      "High-throughput CUDA-accelerated video filtering pipeline executing custom 2D convolution and spatial kernels.",
    problem:
      "Sequential CPU-bound video processing fails to sustain real-time frame rates for high-resolution video streams when applying multi-pass spatial filters and edge-preserving smoothing across consecutive frames.",
    solution:
      "Engineered custom CUDA device kernels utilizing 2D shared-memory tiling, coalesced memory access patterns, and asynchronous host-to-device memory transfers via CUDA streams to process video frames in parallel.",
    architecture:
      "Written in modern C++17 and CUDA with CMake build automation. Incorporates pinned host memory buffers, 2D thread block hierarchies, and Dockerized build containers for reproducible compilation against NVIDIA GPU architectures.",
    keyDecisions: [
      "Implemented 2D shared memory halo exchange to eliminate redundant global memory reads in convolution operations.",
      "Employed multiple CUDA streams to overlap PCIe memory transfers with active GPU kernel computation.",
      "Designed modular kernel dispatchers allowing dynamic chaining of Gaussian, Sobel, and custom spatial passes.",
    ],
    technologies: ["CUDA", "C++", "CMake", "Docker", "NVIDIA Kernels"],
    source: "https://github.com/berserk-23115/GPU-Specialisation-Capstone",
    featured: true,
    visual: "lanes",
    labels: ["CUDA", "SHARED MEMORY", "PARALLEL STREAMS", "C++17"],
    gradient: {
      from: "#f59e0b",
      via: "#b45309",
      to: "#fcd34d",
      glow: "rgba(245, 158, 11, 0.25)",
    },
    metrics: [
      { label: "Architecture", value: "NVIDIA CUDA" },
      { label: "Optimization", value: "Shared Memory Tiling" },
      { label: "Execution", value: "Asynchronous Streams" },
    ],
  },
  {
    slug: "riscv-assembler",
    repo: "Assembly-RISCV-CO2024",
    title: "RISC-V 32-bit Assembler & Simulator",
    category: "Systems & Computer Architecture",
    tagline: "From instruction to machine state.",
    oneLiner:
      "High-efficiency 32-bit RISC-V instruction parser and assembler in Rust with a cycle-accurate Python execution simulator.",
    problem:
      "Debugging and analyzing low-level assembly instruction execution requires transparent visualization of register banks, program counters, and memory stack frames without vendor-locked simulator overhead.",
    solution:
      "Engineered a two-pass assembler in Rust that validates syntax, calculates label offsets, and encodes instructions into binary machine code, coupled with a Python execution engine that models memory frames and arithmetic states.",
    architecture:
      "Rust-based lexer, AST parser, and binary encoder producing raw machine binaries. Python simulator loading binary memory segments and maintaining architectural register states and call stack traces.",
    keyDecisions: [
      "Leveraged Rust's type system and pattern matching for rigorous instruction decoding and syntax error reporting.",
      "Architected an intermediate representation (IR) isolating assembly parsing from target microarchitecture layout.",
      "Implemented cycle-by-cycle memory stack frame tracking to debug recursive subroutines.",
    ],
    technologies: ["Rust", "Python", "RISC-V", "Computer Architecture"],
    source: "https://github.com/berserk-23115/Assembly-RISCV-CO2024",
    featured: true,
    visual: "paths",
    labels: ["RISC-V 32", "RUST ENCODER", "PYTHON SIMULATOR", "STACK TRACE"],
    gradient: {
      from: "#0ea5e9",
      via: "#0369a1",
      to: "#38bdf8",
      glow: "rgba(14, 165, 233, 0.25)",
    },
    metrics: [
      { label: "ISA", value: "RISC-V 32-bit" },
      { label: "Assembler", value: "Two-pass in Rust" },
      { label: "Simulator", value: "Cycle-accurate Python" },
    ],
  },
  {
    slug: "truesight",
    repo: "TrueSight",
    title: "TrueSight",
    category: "NLP & Vision Redaction",
    tagline: "Gradational redaction across media.",
    oneLiner:
      "NLP and computer vision tool allowing user-defined gradational masking across text, images, PDFs, and video formats.",
    problem:
      "Sensitive datasets require varying degrees of anonymization depending on viewer clearance, yet standard tools apply blunt all-or-nothing black boxes that destroy context.",
    solution:
      "Engineered an NLP and computer-vision redaction engine that classifies entity sensitivity and applies gradational masking (blur, pixelate, token replacement, cryptographic hashing) across heterogeneous document types.",
    architecture:
      "Python OCR and named entity recognition (NER) pipelines integrated into an interactive web interface with zero-retention ephemeral processing.",
    keyDecisions: [
      "Implemented hierarchical sensitivity tiers so public, internal, and confidential viewers receive proportionate views.",
      "Zero-retention architecture: all input data is processed in ephemeral memory without persistent storage.",
    ],
    technologies: ["Python", "Computer Vision", "NLP", "OCR", "Jupyter"],
    source: "https://github.com/berserk-23115/TrueSight",
    featured: true,
    visual: "redact",
    labels: ["GRADATIONAL", "NER", "COMPUTER VISION", "EPHEMERAL"],
    gradient: {
      from: "#ec4899",
      via: "#be185d",
      to: "#f472b6",
      glow: "rgba(236, 72, 153, 0.25)",
    },
    metrics: [
      { label: "Modality", value: "Text · Image · PDF · Video" },
      { label: "Redaction", value: "Gradational / Tiered" },
      { label: "Storage", value: "Zero Retention" },
    ],
  },
  {
    slug: "medicams",
    repo: "MedicaMS",
    title: "MedicaMS",
    category: "Healthcare Engineering",
    tagline: "Clinical access, structured safely.",
    oneLiner:
      "Clinic management platform with multi-tenant role-based access and an embedded custom database query editor.",
    problem:
      "Medical clinic administrators and doctors need unified patient record access, scheduling, and custom analytical queries without exposing patient health info to unauthorized staff.",
    solution:
      "Developed a Next.js and PostgreSQL clinic system with Drizzle ORM schemas and Better Auth role management, including an admin query interface with validation safeguards.",
    architecture:
      "Next.js App Router, Server Actions, PostgreSQL database deployed with Drizzle ORM migrations, Better Auth session authentication.",
    keyDecisions: [
      "Enforced strict row-level security and role-based permissions (doctors vs staff vs patients).",
      "Added a sandboxed query editor for clinic analytics with schema inspection.",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Better Auth"],
    source: "https://github.com/berserk-23115/MedicaMS",
    featured: true,
    visual: "grid",
    labels: ["NEXT.JS", "POSTGRESQL", "DRIZZLE", "BETTER AUTH"],
    gradient: {
      from: "#10b981",
      via: "#047857",
      to: "#34d399",
      glow: "rgba(16, 185, 129, 0.25)",
    },
    metrics: [
      { label: "Database", value: "PostgreSQL + Drizzle" },
      { label: "Auth", value: "Better Auth RBAC" },
      { label: "Features", value: "Admin Query Editor" },
    ],
  },
];
