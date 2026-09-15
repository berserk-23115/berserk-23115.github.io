import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { projects } from "@/data/projects";
import { ArrowLeft, ExternalLink, CheckCircle2, Cpu, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/icons";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | Anushk Kumar`,
    description: project.oneLiner,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find next project for seamless sequential reading
  const currentIdx = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return (
    <div className="portfolio subpage-shell">
      <Navigation />

      <main className="subpage-main project-detail-layout">
        {/* Project Case Study Hero */}
        <header
          className={`project-detail-hero visual-${project.visual}`}
          style={
            {
              "--detail-from": project.gradient.from,
              "--detail-via": project.gradient.via,
              "--detail-to": project.gradient.to,
              "--detail-glow": project.gradient.glow,
            } as React.CSSProperties
          }
        >
          <div className="detail-hero-luminous-bg" aria-hidden="true" />

          <div className="subpage-hero-inner">
            <Link href="/projects" className="subpage-back-link">
              <ArrowLeft className="size-4" />
              <span>Back to all projects</span>
            </Link>

            <div className="detail-meta-header">
              <span className="eyebrow">{project.category}</span>
              <span className="detail-status-pill">Active Repository</span>
            </div>

            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-tagline">{project.tagline}</p>
            <p className="project-detail-summary">{project.oneLiner}</p>

            {/* Evidence Metric Chips */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="detail-metrics-row">
                {project.metrics.map((m) => (
                  <div className="detail-metric-card" key={m.label}>
                    <span className="metric-lbl">{m.label}</span>
                    <strong className="metric-val">{m.value}</strong>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="detail-actions-row">
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-source-btn"
              >
                <GithubIcon className="size-4" />
                <span>View Source Code</span>
                <ExternalLink className="size-3.5" />
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-live-btn"
                >
                  <span>Launch Live App</span>
                  <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Deep Architectural Case Study Content */}
        <section className="detail-body-container">
          <div className="detail-body-grid">
            {/* Main Narrative Column */}
            <div className="detail-narrative-col">
              {/* Problem */}
              <article className="detail-section-block">
                <div className="section-block-icon">
                  <ShieldCheck className="size-5 text-amber-400" />
                </div>
                <h2>The Problem Space</h2>
                <p className="body-prose">{project.problem}</p>
              </article>

              {/* Solution */}
              <article className="detail-section-block">
                <div className="section-block-icon">
                  <Cpu className="size-5 text-sky-400" />
                </div>
                <h2>The Architecture &amp; System</h2>
                <p className="body-prose">{project.solution}</p>
                <p className="body-prose">{project.architecture}</p>
              </article>

              {/* Key Technical Decisions */}
              <article className="detail-section-block">
                <h2>Key Technical Decisions</h2>
                <ul className="decisions-list">
                  {project.keyDecisions.map((decision, i) => (
                    <li key={i} className="decision-item">
                      <CheckCircle2 className="size-4.5 text-emerald-400 shrink-0" />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            {/* Sidebar Meta Column */}
            <aside className="detail-meta-sidebar">
              <div className="sidebar-card">
                <h3>Technologies &amp; Tools</h3>
                <div className="sidebar-tech-grid">
                  {project.technologies.map((tech) => (
                    <span className="sidebar-tech-pill" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sidebar-card">
                <h3>Repository &amp; Origin</h3>
                <p className="sidebar-text">
                  Origin repository: <code>berserk-23115/{project.repo}</code>
                </p>
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-link"
                >
                  Browse GitHub Files ↗
                </a>
              </div>
            </aside>
          </div>

          {/* Next Project Nav Strip */}
          <nav className="next-project-strip" aria-label="Next Project">
            <span className="eyebrow">NEXT CASE STUDY</span>
            <Link href={`/projects/${nextProject.slug}`} className="next-project-card">
              <div>
                <span className="next-cat">{nextProject.category}</span>
                <h4 className="next-title">{nextProject.title}</h4>
              </div>
              <span className="next-arrow">→</span>
            </Link>
          </nav>
        </section>
      </main>

      <Footer />
    </div>
  );
}
