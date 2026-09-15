export const profile = {
  name: "Anushk Kumar",
  tagline: "Building intelligent systems across AI, systems, security and product engineering.",
  handle: "berserk-23115",
  role: "Computer Science @ IIIT Delhi",
  specialization: "AI · Systems · Security · Product Engineering",
  location: "New Delhi, India",
  timezone: "Asia/Kolkata",
  email: "anushk3984@gmail.com",
  collegeEmail: "anushk23115@iiitd.ac.in",
  avatar: "/anushk_portrait.jpg",
  avatarFull: "/anushk_up.jpg",
  bioStatements: [
    "Computer Science undergraduate at Indraprastha Institute of Information Technology, Delhi (IIIT Delhi).",
    "Engineer moving fluidly across abstraction layers: from CUDA kernels, low-level CPU architectures, and crypto primitives to high-concurrency microservices and reactive interfaces.",
    "Work spans research labs (HiPeC, IRAS-Hub), industry product engineering (Adobe Systems), and open-source systems.",
    "Focused on building verifiable, high-performance software where performance, privacy, and low-level fundamentals matter.",
  ],
  sources: {
    github: "https://github.com/berserk-23115",
    linkedin: "https://www.linkedin.com/in/anushk-kumar-a0b7b61ba",
    x: "https://twitter.com/AnushkKumar1",
    dribbble: "https://dribbble.com/ak3984",
    profileReadme: "https://github.com/berserk-23115/berserk-23115",
    resumePdf: "/resume.pdf",
  },
} as const;

export const education = {
  institution: "Indraprastha Institute of Information Technology, Delhi",
  shortName: "IIIT Delhi",
  degree: "B.Tech in Computer Science and Engineering",
  period: "2023 – Present",
  location: "New Delhi, India",
  cgpa: "7.66 (Till 6th semester)",
  source: profile.sources.github,
} as const;
