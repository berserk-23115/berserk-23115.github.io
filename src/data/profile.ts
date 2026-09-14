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
