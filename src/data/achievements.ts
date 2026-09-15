export interface Achievement {
  id: string;
  title: string;
  organization: string;
  period: string;
  tier: string;
  description: string;
  badge: string;
}

export const achievements: Achievement[] = [
  {
    id: "grand-ai-challenge",
    title: "Stage 1 Winner — Grand AI Challenge 2025",
    organization: "NCIIPC / NTRO, Government of India",
    period: "2025",
    tier: "National Recognition",
    badge: "Winner",
    description:
      "Awarded 1st Stage Winner in the prestigious national Grand AI Challenge organized by the National Critical Information Infrastructure Protection Centre (NCIIPC / NTRO).",
  },
  {
    id: "sih-2024",
    title: "Runner Up — Smart India Hackathon (SIH) 2024",
    organization: "Ministry of Education & AICTE, Government of India",
    period: "Dec 2024",
    tier: "National Grand Finale",
    badge: "Runner Up",
    description:
      "Team-level Runner Up in the nationwide Grand Finale of Smart India Hackathon 2024, developing solutions for complex governmental problems.",
  },
  {
    id: "google-arcade",
    title: "Google Arcade Facilitator — Premium+ Milestone",
    organization: "Google Cloud",
    period: "2024",
    tier: "Cloud Architecture Milestone",
    badge: "Premium+",
    description:
      "Achieved Premium+ top milestone facilitating and architecting hands-on labs across Google Cloud Platform, computing infrastructure, and generative AI services.",
  },
  {
    id: "cvpr-demo",
    title: "Research Demonstration at CVPR 2025",
    organization: "CVPR Demo Session (Nashville, USA)",
    period: "2025",
    tier: "Top Computer Vision Conference",
    badge: "Demonstration",
    description:
      "Demonstrated M-SCAN multistage spinal stenosis grading framework live at CVPR 2025 demo session.",
  },
];
