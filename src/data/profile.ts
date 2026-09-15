export const profile = {
  name: "Anushk Kumar",
  handle: "berserk-23115",
  role: "Computer Science student · systems, security & applied AI",
  location: "New Delhi, India",
  timezone: "Asia/Kolkata",
  email: "anushk3984@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/146085675?v=4",
  bio: "An undergraduate CSE student at IIIT Delhi exploring the intersection of AI, usable security, and systems. He builds course and independent projects where performance, privacy, and low-level fundamentals matter.",
  sources: {
    github: "https://github.com/berserk-23115",
    linkedin: "https://www.linkedin.com/in/anushk-kumar-a0b7b61ba",
    x: "https://twitter.com/AnushkKumar1",
    dribbble: "https://dribbble.com/ak3984",
    profileReadme: "https://github.com/berserk-23115/berserk-23115",
  },
} as const;

export const skills = [
  { group: "Systems & compute", items: ["CUDA", "C", "C++", "Rust", "RISC-V"] },
  { group: "Applied AI", items: ["Python", "Computer Vision", "NLP", "Gemma"] },
  {
    group: "Product engineering",
    items: ["TypeScript", "Next.js", "PostgreSQL", "Kotlin"],
  },
  { group: "Security", items: ["Encryption", "Network analysis", "libpcap"] },
] as const;

export const education = {
  institution: "Indraprastha Institute of Information Technology Delhi",
  programme: "B.Tech in Computer Science and Engineering",
  source: profile.sources.github,
} as const;

export const projects = [
  {
    slug: "amber",
    repo: "Amber",
    title: "Amber",
    category: "Private multimodal AI",
    description:
      "A companion that remembers. Built to help people with dementia navigate the everyday, with multimodal intelligence that stays on device.",
    detail:
      "An offline-first Android companion using Gemma for private, real-time multimodal assistance.",
    technologies: ["Kotlin", "Gemma", "Android"],
    visual: "signal",
    labels: ["VISION", "AUDIO", "LANGUAGE", "CONTEXT"],
    source: "https://github.com/berserk-23115/Amber",
  },
  {
    slug: "kryptvault",
    repo: "KryptVault",
    title: "KryptVault",
    category: "Usable security",
    description:
      "Your files. Your boundaries. Exploring how encryption and fine-grained access can become a usable storage system.",
    detail:
      "A secure storage platform centered on encryption and file and folder access control.",
    technologies: ["TypeScript", "Rust", "Docker"],
    visual: "layers",
    labels: ["DATA", "CIPHERTEXT", "POLICY", "STORAGE"],
    source: "https://github.com/berserk-23115/KryptVault",
  },
  {
    slug: "gpu-video-processor",
    repo: "GPU-Specialisation-Capstone",
    title: "Parallel / frames",
    category: "GPU video processing",
    description:
      "Every frame, a parallel problem. Custom CUDA kernels explore what happens when video processing moves closer to the hardware.",
    detail:
      "A CUDA-based video processor with custom filters, developed as a GPU programming capstone.",
    technologies: ["CUDA", "C++", "CMake"],
    visual: "lanes",
    labels: ["HOST", "TRANSFER", "KERNEL", "OUTPUT"],
    source: "https://github.com/berserk-23115/GPU-Specialisation-Capstone",
  },
  {
    slug: "riscv-assembler",
    repo: "Assembly-RISCV-CO2024",
    title: "From instruction",
    category: "RISC-V assembler & simulator",
    description:
      "From a line of text to a machine’s next move. A study in assembly, memory, and the quiet precision beneath every program.",
    detail:
      "A 32-bit RISC-V assembler and simulator, with Rust parsing and assembly and Python program simulation.",
    technologies: ["Rust", "Python", "RISC-V"],
    visual: "paths",
    labels: ["SOURCE", "PARSE", "ENCODE", "EXECUTE"],
    source: "https://github.com/berserk-23115/Assembly-RISCV-CO2024",
  },
] as const;
