export interface Certification {
  id: string;
  title: string;
  issuer: string;
  platform: string;
  credentialId: string;
  verifyUrl: string;
  skillsCovered: string[];
  summary: string;
  logo: "jhu" | "google";
  accentHex: string;
}

export const certifications: Certification[] = [
  {
    id: "gpu-programming",
    title: "GPU Programming Specialization",
    issuer: "The Johns Hopkins University",
    platform: "Coursera",
    credentialId: "GP1Z7IRWMP0Y",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/GP1Z7IRWMP0Y",
    skillsCovered: [
      "CUDA C/C++",
      "Parallel Algorithm Design",
      "Shared Memory Optimization",
      "Memory Hierarchy & Coalescing",
      "Heterogeneous Computing",
    ],
    summary:
      "Advanced multi-course sequence covering parallel hardware architectures, thread scheduling, memory coalescing, CUDA kernel development, and high-performance numerical algorithms.",
    logo: "jhu",
    accentHex: "#f59e0b",
  },
  {
    id: "google-cybersecurity",
    title: "Google Cybersecurity Specialization",
    issuer: "Google",
    platform: "Coursera",
    credentialId: "CKYBKZWMKLPB",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/CKYBKZWMKLPB",
    skillsCovered: [
      "Network Security",
      "Packet Analysis (libpcap/Wireshark)",
      "Linux Security & Shell",
      "SIEM Tools & Incident Response",
      "Cryptographic Controls",
    ],
    summary:
      "Comprehensive professional curriculum spanning network defense, threat intelligence, packet analysis with libpcap/Wireshark, Python security automation, and defensive system architectures.",
    logo: "google",
    accentHex: "#3b82f6",
  },
];
