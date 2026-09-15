export const profile = {
  name: "Anushk Kumar",
  tagline: "Building practical AI and systems software.",
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
    "I build practical AI and systems software where performance, privacy, and clear interfaces matter.",
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
  source: profile.sources.github,
} as const;
