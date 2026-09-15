export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  venueFull: string;
  year: string;
  doi?: string;
  arxivUrl?: string;
  link: string;
  summary: string;
  demonstrationNote?: string;
  colorFamily: "violet" | "cyan";
  gradient: {
    from: string;
    via: string;
    to: string;
    glow: string;
  };
  metrics: { label: string; value: string }[];
  badges: string[];
  visualType: "deepfake-split" | "mri-cross-attention";
}

export const publications: Publication[] = [
  {
    id: "socialdf",
    title:
      "SocialDF: Benchmark Dataset and Detection Model for Mitigating Harmful Deepfake Content on Social Media Platforms",
    authors: "Anushk Kumar et al.",
    venue: "MAD'25 @ ACM ICMR 2025",
    venueFull:
      "4th International ACM Workshop on Multimedia AI against Disinformation (MAD'25), co-located with ACM ICMR 2025",
    year: "2025",
    doi: "10.1145/3733567.3735573",
    link: "https://dl.acm.org/doi/10.1145/3733567.3735573",
    summary:
      "A real-world social-media deepfake benchmark combining multimodal face, speech, and contextual verification for forensic authenticity detection.",
    colorFamily: "violet",
    gradient: {
      from: "#4f46e5",
      via: "#7c3aed",
      to: "#06b6d4",
      glow: "rgba(99, 102, 241, 0.25)",
    },
    metrics: [
      { label: "Total Videos", value: "2,126" },
      { label: "Benchmark Split", value: "1,071 Genuine · 1,055 Manipulated" },
      { label: "Verification", value: "Multimodal (Face, Audio, Context)" },
    ],
    badges: ["ACM ICMR 2025", "MAD'25", "Deepfake Forensics", "Multimodal AI"],
    visualType: "deepfake-split",
  },
  {
    id: "m-scan",
    title:
      "M-SCAN: A Multistage Framework for Lumbar Spinal Canal Stenosis Grading Using Multi-View Cross Attention",
    authors: "Arnesh Batra, Arush Gumber, Anushk Kumar",
    venue: "arXiv Preprint (arXiv:2503.01634)",
    venueFull:
      "Demonstrated at CVPR 2025 Demo Session (Nashville, TN, USA) · arXiv:2503.01634",
    year: "2025",
    arxivUrl: "https://arxiv.org/abs/2503.01634",
    link: "https://arxiv.org/abs/2503.01634",
    summary:
      "Automated lumbar spinal canal stenosis grading from cross-sectional 3D MRI series via sequence-based multi-view cross-attention.",
    demonstrationNote: "Demonstrated at CVPR Demo 2025 (Nashville, USA)",
    colorFamily: "cyan",
    gradient: {
      from: "#0284c7",
      via: "#0ea5e9",
      to: "#6366f1",
      glow: "rgba(14, 165, 233, 0.25)",
    },
    metrics: [
      { label: "Dataset Cohort", value: "1,975 Studies" },
      { label: "MRI Modalities", value: "Axial T2 · Sagittal T1 · Sagittal T2/STIR" },
      { label: "AUROC Metric", value: "0.971" },
    ],
    badges: ["CVPR 2025 Demo", "arXiv:2503.01634", "Medical Imaging", "Cross-Attention"],
    visualType: "mri-cross-attention",
  },
];
