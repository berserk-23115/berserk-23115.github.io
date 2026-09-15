import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects | Anushk Kumar",
  description:
    "Engineering case studies, CUDA kernels, on-device multimodal models, and zero-knowledge architectures built by Anushk Kumar.",
};

export default function ProjectsPage() {
  return (
    <div className="portfolio subpage-shell">
      <Navigation />

      <main className="subpage-main">
        {/* Subpage Header Banner */}
        <header className="subpage-hero">
          <div className="subpage-hero-inner">
            <Link href="/" className="subpage-back-link">
              <ArrowLeft className="size-4" />
              <span>Back to home</span>
            </Link>

            <span className="eyebrow">CATALOG // 09</span>
            <h1 className="subpage-title">
              Systems, Research &amp; <br />
              <em>Executable Ideas.</em>
            </h1>
            <p className="subpage-desc">
              A record of projects spanning low-level GPU acceleration, offline multimodal AI,
              zero-knowledge encryption, and computer architecture.
            </p>
          </div>
        </header>

        {/* Projects Grid */}
        <section className="subpage-content-container" aria-label="Projects catalog">
          <div className="projects-catalog-grid">
            {projects.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} index={idx} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
