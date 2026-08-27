export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  stack: string[];
  repository: string;
  demo?: string;
  source: string;
  accent: 'violet' | 'cyan' | 'amber' | 'green';
};

export const profile = {
  name: 'Anushk Kumar',
  handle: 'berserk-23115',
  role: 'Computer Science student · systems, security & applied AI',
  location: 'New Delhi, India',
  timezone: 'Asia/Kolkata',
  email: 'anushk3984@gmail.com',
  avatar: 'https://avatars.githubusercontent.com/u/146085675?v=4',
  bio: 'An undergraduate CSE student at IIIT Delhi exploring the intersection of AI, usable security, and systems. He builds course and independent projects where performance, privacy, and low-level fundamentals matter.',
  sources: {
    github: 'https://github.com/berserk-23115',
    linkedin: 'https://www.linkedin.com/in/anushk-kumar-a0b7b61ba',
    x: 'https://twitter.com/AnushkKumar1',
    dribbble: 'https://dribbble.com/ak3984',
    profileReadme: 'https://github.com/berserk-23115/berserk-23115',
  },
} as const;

export const projects: Project[] = [
  {
    slug: 'amber',
    title: 'Amber',
    eyebrow: 'Multimodal Android companion',
    description: 'An offline-first, Gemma-powered Android companion intended to support people with dementia through private, real-time multimodal assistance.',
    stack: ['Kotlin', 'Gemma', 'Android'],
    repository: 'https://github.com/berserk-23115/Amber',
    source: 'https://github.com/berserk-23115/Amber',
    accent: 'violet',
  },
  {
    slug: 'kryptvault',
    title: 'KryptVault',
    eyebrow: 'Secure storage platform',
    description: 'A secure storage platform focused on encryption standards and fine-grained control over files and folders.',
    stack: ['TypeScript', 'Rust', 'Docker'],
    repository: 'https://github.com/berserk-23115/KryptVault',
    source: 'https://github.com/berserk-23115/KryptVault',
    accent: 'cyan',
  },
  {
    slug: 'gpu-video-processor',
    title: 'GPU Video Processor',
    eyebrow: 'CUDA specialisation capstone',
    description: 'A custom CUDA-based real-time video processor with filters, built to use NVIDIA GPU architecture and kernels for faster video transforms.',
    stack: ['CUDA', 'C++', 'CMake'],
    repository: 'https://github.com/berserk-23115/GPU-Specialisation-Capstone',
    source: 'https://github.com/berserk-23115/GPU-Specialisation-Capstone',
    accent: 'amber',
  },
  {
    slug: 'riscv-assembler',
    title: 'RISC-V Assembler',
    eyebrow: 'Computer organisation',
    description: 'A RISC-V 32-bit assembler and simulator: Rust handles parsing and assembly; Python models programs across memory and stack frames.',
    stack: ['Rust', 'Python', 'RISC-V'],
    repository: 'https://github.com/berserk-23115/Assembly-RISCV-CO2024',
    source: 'https://github.com/berserk-23115/Assembly-RISCV-CO2024',
    accent: 'green',
  },
];

export const skills = [
  { group: 'Systems & compute', items: ['CUDA', 'C', 'C++', 'Rust', 'RISC-V'] },
  { group: 'Applied AI', items: ['Python', 'Computer Vision', 'NLP', 'Gemma'] },
  { group: 'Product engineering', items: ['TypeScript', 'Next.js', 'PostgreSQL', 'Kotlin'] },
  { group: 'Security', items: ['Encryption', 'Network analysis', 'libpcap'] },
] as const;

export const education = {
  institution: 'Indraprastha Institute of Information Technology Delhi',
  programme: 'B.Tech in Computer Science and Engineering',
  source: profile.sources.github,
} as const;

/** Public GitHub contribution-calendar levels fetched 27 Aug 2026. */
export const contributionLevels = [
  0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 2, 1, 1,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
] as const;
