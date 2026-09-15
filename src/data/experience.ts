export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  team?: string;
  location: string;
  period: string;
  badge?: string;
  type: "primary" | "secondary";
  mission: string;
  evidence: string[];
  metrics?: { label: string; value: string }[];
  technologies: string[];
  patentNotice?: string;
  link?: string;
  logo: string;
}

export const primaryExperience: ExperienceItem[] = [
  {
    id: "adobe",
    role: "Product Intern (Summer)",
    company: "Adobe Systems",
    team: "Adobe Illustrator Team",
    location: "Noida, India",
    period: "May 2026 – July 2026",
    badge: "Industry Product Engineering",
    type: "primary",
    mission:
      "Engineered an autonomous agent system for direct native desktop application UI control and QE automation.",
    evidence: [
      "Developed a novel method for controlling core native desktop application UI (Adobe Illustrator) through coordinated agents.",
      "Engineered an autonomous QE testing harness driven by subagents with multi-client socket execution.",
      "Achieved ~3× acceleration in testing workflow speed with 93% validated target task completion.",
    ],
    patentNotice: "Method in review for patent",
    metrics: [
      { label: "Workflow Speedup", value: "~3×" },
      { label: "Validated Tasks", value: "93%" },
      { label: "Status", value: "Patent in Review" },
    ],
    technologies: ["C++", "Python", "Autonomous Agents", "UI Automation", "Multi-client"],
    link: "https://www.adobe.com",
    logo: "adobe",
  },
  {
    id: "iras-hub",
    role: "Undergraduate Researcher (Short Term)",
    company: "IRAS-Hub",
    team: "Robotics Research Lab",
    location: "New Delhi, India",
    period: "Jan 2026 – Apr 2026",
    badge: "Robotics & Vision Systems",
    type: "primary",
    mission:
      "Built natural-language retrieval systems for ROSBag robotics telemetry and autonomous vehicle vision pipelines.",
    evidence: [
      "Developed a Natural Language Interface (NLI) to query and extract structured telemetry from ROSBag files, streamlining robotics log analysis.",
      "Executed complex simulations and computer vision pipelines to validate autonomous vehicle algorithms for the IIITD-ALIVE project.",
      "Deployed containerized research environments for reproducible execution across heterogeneous robotics hardware.",
    ],
    metrics: [
      { label: "Focus", value: "ROSBag NLI" },
      { label: "Project", value: "IIITD-ALIVE" },
      { label: "Platform", value: "ROS1 / ROS2" },
    ],
    technologies: ["ROS1", "ROS2", "Python", "Computer Vision", "ROSBag", "Docker"],
    link: "https://irashub.iiitd.edu.in",
    logo: "iras",
  },
  {
    id: "hipec",
    role: "Undergraduate Researcher (Short Term)",
    company: "HiPeC — IIIT Delhi",
    team: "High Performance Computing Lab",
    location: "New Delhi, India",
    period: "July 2025 – Dec 2025",
    badge: "HPC & Systems Research",
    type: "primary",
    mission:
      "Quantized and optimized large language models for resource-constrained high-performance CPU architectures.",
    evidence: [
      "Engineered a quantized LLM optimized for HPC CPU architectures, drastically reducing inference cost while preserving reasoning accuracy.",
      "Achieved 87.25% accuracy on the HPCorpus dataset by integrating ONNX Runtime, Grid-Ada LoRA fine-tuning, and GGUF compression.",
      "Authored technical documentation detailing the integration of OpenMP-based parallel problem solving with low-resource inference strategies.",
    ],
    metrics: [
      { label: "HPCorpus Accuracy", value: "87.25%" },
      { label: "Compression", value: "GGUF + LoRA" },
      { label: "Runtime", value: "ONNX + OpenMP" },
    ],
    technologies: ["PyTorch", "Python", "CUDA", "ONNX Runtime", "OpenMP", "GGUF"],
    link: "https://hipec.iiitd.edu.in",
    logo: "hipec",
  },
  {
    id: "resxiv",
    role: "Founding Engineer",
    company: "Resxiv",
    team: "Integrated Research Support Platform",
    location: "New Delhi, India",
    period: "Jan 2025 – July 2025",
    badge: "Startup Engineering",
    type: "primary",
    mission:
      "Architected high-availability microservices and a browser-native research platform supporting 100+ concurrent researchers.",
    evidence: [
      "Architected a scalable backend supporting 100+ concurrent users, utilizing FastAPI and Spring Boot for high-availability microservices.",
      "Developed a reactive frontend with isolated runtime development environments integrating Monaco/AceEditor for code-native capabilities.",
      "Optimized platform SEO via semantic context mapping and automated sitemap generation for low-latency indexing.",
      "Orchestrated automated CI/CD pipelines and cloud infrastructure using Docker and Cloudflare CDN.",
    ],
    metrics: [
      { label: "Concurrency", value: "100+ Users" },
      { label: "Architecture", value: "Microservices" },
      { label: "Delivery", value: "Docker + CDN" },
    ],
    technologies: ["FastAPI", "Spring Boot", "TypeScript", "Monaco Editor", "Docker", "Cloudflare CDN"],
    link: "https://www.resxiv.com",
    logo: "resxiv",
  },
];

export const secondaryExperience: ExperienceItem[] = [
  {
    id: "starkvision",
    role: "Lead Design Engineer",
    company: "StarkVision Research",
    location: "New Delhi, India",
    period: "Jan 2025 – Present",
    type: "secondary",
    mission:
      "Leading visual engineering, interface architecture, and interactive design systems for research projects.",
    evidence: [
      "Crafted cohesive design systems and technical brand collateral for research dissemination.",
      "Collaborated on visual architectures for scientific demonstrations.",
    ],
    technologies: ["Figma", "UI Systems", "Technical Communication"],
    logo: "starkvision",
  },
  {
    id: "esya",
    role: "Design & Web Team Lead",
    company: "ESYA IIITD",
    location: "New Delhi, India",
    period: "Jun 2025 – Aug 2025",
    type: "secondary",
    mission:
      "Led the visual identity and web portal engineering for IIIT Delhi's flagship technical symposium.",
    evidence: [
      "Directed visual identity, web development, and digital collateral for thousands of participants.",
      "Delivered high-performance responsive web portals under tight event deadlines.",
    ],
    technologies: ["Next.js", "TypeScript", "Creative Direction"],
    logo: "esya",
  },
  {
    id: "cyborg",
    role: "Freelance Web Developer",
    company: "CYBORG @ IIITD",
    location: "New Delhi, India",
    period: "2024",
    type: "secondary",
    mission:
      "Designed and developed the interactive landing experience for IIIT Delhi's robotics and systems club.",
    evidence: [
      "Built responsive, motion-rich landing page highlighting robotics hardware projects.",
    ],
    technologies: ["JavaScript", "CSS Animation", "Responsive UI"],
    logo: "cyborg",
  },
];
