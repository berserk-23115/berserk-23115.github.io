import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { NameSignature } from "@/components/name-signature";
import { PortraitVisual } from "@/components/portrait-visual";
import { ComputationalCore } from "@/components/computational-core";
import { OverviewConsole } from "@/components/overview-console";
import { ContributionHeatmap } from "@/components/contribution-heatmap";
import { ResearchCard } from "@/components/research-card";
import { ProjectCard } from "@/components/project-card";
import { TechCloud } from "@/components/tech-cloud";
import { ExperienceTimeline } from "@/components/experience-timeline";

import { profile, education } from "@/data/profile";
import { coreSkills } from "@/data/skills";
import { publications } from "@/data/publications";
import { projects } from "@/data/projects";
import { certifications } from "@/data/certifications";
import { achievements } from "@/data/achievements";
import { blogPosts } from "@/data/blog";
import { getPortfolioData } from "@/lib/github/activity";

import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Anushk Kumar — Systems, AI & Security Engineer",
  description:
    "Portfolio of Anushk Kumar. Computer Science undergraduate at IIIT Delhi building intelligent systems across AI, GPU computing, usable security, and product engineering. Adobe Product Intern & Published Researcher.",
  openGraph: {
    title: "Anushk Kumar — Systems, AI & Security Engineer",
    description:
      "Computer Science at IIIT Delhi. Experience at Adobe & research labs. Published work in multimodal deepfake detection & medical vision.",
    url: "https://berserk-23115.github.io",
    siteName: "Anushk Kumar",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 630,
        alt: "Anushk Kumar — Systems, AI & Security Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function Home() {
  const data = await getPortfolioData();

  // Structured JSON-LD metadata for SEO & Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://berserk-23115.github.io/#person",
        name: profile.name,
        url: "https://berserk-23115.github.io",
        image: "https://berserk-23115.github.io/anushk_up.jpg",
        jobTitle: "Software Engineer & AI Researcher",
        worksFor: {
          "@type": "Organization",
          name: "Adobe Systems",
        },
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: education.institution,
        },
        sameAs: [
          profile.sources.github,
          profile.sources.linkedin,
          profile.sources.x,
        ],
        description: profile.tagline,
      },
      ...publications.map((pub) => ({
        "@type": "ScholarlyArticle",
        headline: pub.title,
        author: {
          "@type": "Person",
          name: profile.name,
        },
        description: pub.summary,
        url: pub.link,
      })),
    ],
  };

  return (
    <div className="portfolio">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <a href="#about" className="skip-link">
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        {/* ====================================================
            01 HERO / PROFILE
            ==================================================== */}
        <section id="hero" className="hero-section" aria-labelledby="hero-name">
          {/* Subtle Background Three.js Manifold */}
          <div className="hero-threejs-layer" aria-hidden="true">
            <ComputationalCore />
          </div>

          <div className="hero-container">
            <div className="hero-grid">
              {/* Left Identity Column */}
              <div className="hero-identity-col">
                <div className="hero-status-tag">
                  <span className="live-dot" />
                  <span className="status-text">CSE @ IIIT Delhi · New Delhi, India</span>
                </div>

                <div id="hero-name" className="hero-signature-wrap">
                  <NameSignature />
                </div>

                <p className="hero-tagline">{profile.tagline}</p>
                <p className="hero-role">Software Developer <span>(He/Him)</span></p>
                <div className="hero-overview-bar">
                  <OverviewConsole />
                </div>
              </div>

              {/* Right Artistic Portrait Column */}
              <div className="hero-portrait-col">
                <PortraitVisual
                  src={profile.avatar}
                  alt="Anushk Kumar — Computer Science undergraduate at IIIT Delhi"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            03 ABOUT
            ==================================================== */}
        <section id="about" className="section-frame section-pad" aria-labelledby="about-heading">
          <div className="section-container">
            <div className="section-header-cluster">
              <span className="eyebrow">03 // ABOUT</span>
              <h2 id="about-heading" className="section-title">
                Building software from <br />
                <em>the hardware boundary up.</em>
              </h2>
            </div>

            <p className="about-copy">{profile.bioStatements.join(" ")}</p>
          </div>
        </section>

        {/* ====================================================
            04 GITHUB ACTIVITY
            ==================================================== */}
        <section id="github-activity" className="section-frame section-pad" aria-labelledby="github-activity-title">
          <div className="section-container">
            <div className="section-header-cluster">
              <div className="header-split-row">
                <div>
                  <span className="eyebrow">04 // GITHUB ACTIVITY</span>
                  <h2 id="github-activity-title" className="section-title">
                    The work leaves a <br />
                    <em>verifiable trace.</em>
                  </h2>
                </div>
                <a
                  href={profile.sources.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="section-external-link"
                >
                  <span>Follow on GitHub</span>
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>

            <ContributionHeatmap
              years={data.contributions}
              profile={data.profile}
              pullRequestsCount={data.pullRequests.length}
            />
          </div>
        </section>

        {/* ====================================================
            05 CORE ENGINEERING SKILLS
            ==================================================== */}
        <section id="skills" className="section-frame section-pad" aria-labelledby="skills-heading">
          <div className="section-container">
            <div className="section-header-cluster">
              <span className="eyebrow">05 // CORE DISCIPLINES</span>
              <h2 id="skills-heading" className="section-title">
                High-signal engineering <br />
                <em>domains of practice.</em>
              </h2>
            </div>

            <div className="core-skills-grid">
              {coreSkills.map((skill, i) => (
                <div
                  className={`core-skill-card theme-${skill.color}`}
                  key={skill.id}
                  style={{ "--card-accent": skill.accentHex } as React.CSSProperties}
                >
                  <div className="skill-card-top">
                    <span className="skill-num">0{i + 1}</span>
                    <span className="skill-tagline">{skill.tagline}</span>
                  </div>

                  <h3 className="skill-group-name">{skill.group}</h3>
                  <p className="skill-description">{skill.description}</p>

                  <div className="skill-items-pills">
                    {skill.items.map((item) => (
                      <span className="skill-item-pill" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================
            06 TOOLS & TECHNOLOGIES
            ==================================================== */}
        <section id="technologies" className="section-frame section-pad" aria-labelledby="tech-heading">
          <div className="section-container">
            <div className="section-header-cluster">
              <span className="eyebrow">06 // TECH STACK</span>
              <h2 id="tech-heading" className="section-title">
                Technologies I’ve <br />
                <em>worked with.</em>
              </h2>
              <p className="section-lead">
                Verified tools, runtimes, and frameworks derived from production codebases, research repos,
                and course implementations.
              </p>
            </div>

            <TechCloud />
          </div>
        </section>

        {/* ====================================================
            07 EXPERIENCE
            ==================================================== */}
        <section id="experience" className="section-frame section-pad" aria-labelledby="experience-title">
          <div className="section-container">
            <div className="section-header-cluster">
              <span className="eyebrow">07 // EXPERIENCE</span>
              <h2 id="experience-title" className="section-title">
                Experience <br />
                <em>that compounds.</em>
              </h2>
            </div>

            <ExperienceTimeline />
          </div>
        </section>

        {/* ====================================================
            08 PUBLICATIONS / RESEARCH
            ==================================================== */}
        <section id="research" className="section-frame section-pad" aria-labelledby="research-heading">
          <div className="section-container">
            <div className="section-header-cluster">
              <div className="header-split-row">
                <div>
                  <span className="eyebrow">08 // PUBLICATIONS &amp; RESEARCH</span>
                  <h2 id="research-heading" className="section-title">
                    Peer-reviewed research <br />
                    <em>&amp; preprints.</em>
                  </h2>
                </div>
                <span className="header-badge-pill">
                  <Sparkles className="size-3.5" /> 2 Research Artifacts
                </span>
              </div>
              <p className="section-lead">
                Rigorous empirical benchmarks and multistage attention models tested on thousands of medical studies and forensic video benchmarks.
              </p>
            </div>

            <div className="research-cards-grid">
              {publications.map((pub, idx) => (
                <ResearchCard key={pub.id} publication={pub} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================
            09 SELECTED PROJECTS
            ==================================================== */}
        <section id="projects" className="section-frame section-pad" aria-labelledby="projects-heading">
          <div className="section-container">
            <div className="section-header-cluster">
              <div className="header-split-row">
                <div>
                  <span className="eyebrow">09 // SELECTED PROJECTS</span>
                  <h2 id="projects-heading" className="section-title">
                    Featured engineering <br />
                    <em>case studies.</em>
                  </h2>
                </div>
              </div>
              <p className="section-lead">
                Curated studies in offline multimodal intelligence, zero-knowledge storage, and parallel video processors.
              </p>
            </div>

            <div className="projects-cards-grid">
              {projects.map((project, idx) => (
                <ProjectCard key={project.slug} project={project} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================
            10 CERTIFICATIONS & ACHIEVEMENTS
            ==================================================== */}
        <section id="credentials" className="section-frame section-pad" aria-labelledby="creds-heading">
          <div className="section-container">
            <div className="section-header-cluster">
              <span className="eyebrow">10 // HONORS &amp; CERTIFICATIONS</span>
              <h2 id="creds-heading" className="section-title">
                Validated credentials <br />
                <em>&amp; national awards.</em>
              </h2>
            </div>

            <div className="creds-dual-grid">
              {/* Certifications */}
              <div className="creds-column">
                <h3 className="sub-column-title">
                  <Award className="size-4 text-sky-400" />
                  <span>Specializations</span>
                </h3>
                <div className="certs-stack">
                  {certifications.map((cert) => (
                    <div className="cert-item-card" key={cert.id}>
                      <div className="cert-top">
                        <span className="cert-badge">{cert.issuer}</span>
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-verify-chip"
                        >
                          Verify ↗
                        </a>
                      </div>
                      <h4 className="cert-name">{cert.title}</h4>
                      <p className="cert-summary">{cert.summary}</p>
                      <span className="cert-credential-code">ID: {cert.credentialId}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="creds-column">
                <h3 className="sub-column-title">
                  <Sparkles className="size-4 text-amber-400" />
                  <span>Honors &amp; Recognitions</span>
                </h3>
                <div className="achievements-stack">
                  {achievements.map((ach) => (
                    <div className="achievement-item-card" key={ach.id}>
                      <div className="ach-top">
                        <span className="ach-badge">{ach.badge}</span>
                        <span className="ach-period">{ach.period}</span>
                      </div>
                      <h4 className="ach-title">{ach.title}</h4>
                      <p className="ach-org">{ach.organization}</p>
                      <p className="ach-detail">{ach.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            11 EDUCATION
            ==================================================== */}
        <section id="education" className="section-frame section-pad" aria-labelledby="edu-heading">
          <div className="section-container">
            <div className="education-card-surface">
              <div className="edu-left-cluster">
                <Image
                  src="/iiitd.png"
                  alt="IIIT Delhi"
                  width={72}
                  height={44}
                  className="education-logo"
                />
                <div>
                  <span className="eyebrow">11 // ACADEMIC FOUNDATION</span>
                  <h2 id="edu-heading" className="edu-institution">
                    {education.institution}
                  </h2>
                  <p className="edu-degree">{education.degree}</p>
                  <p className="edu-location">New Delhi, India · {education.period}</p>
                </div>
              </div>

              <div className="edu-right-cluster">
                <div className="edu-tag-cluster">
                  <span className="edu-tag">Computer Vision</span>
                  <span className="edu-tag">Systems Programming</span>
                  <span className="edu-tag">Algorithms &amp; Complexity</span>
                  <span className="edu-tag">Operating Systems</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            12 BLOG PREVIEW
            ==================================================== */}
        <section id="blog-preview" className="section-frame section-pad" aria-labelledby="blog-prev-heading">
          <div className="section-container">
            <div className="section-header-cluster">
              <div className="header-split-row">
                <div>
                  <span className="eyebrow">12 // RECENT WRITING</span>
                  <h2 id="blog-prev-heading" className="section-title">
                    Notes on systems <br />
                    <em>and applied AI.</em>
                  </h2>
                </div>
                <Link href="/blog" className="section-external-link">
                  <span>View all essays</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="blog-preview-grid">
              {blogPosts.slice(0, 2).map((post) => (
                <article className="blog-preview-card" key={post.slug}>
                  <div className="blog-prev-meta">
                    <span className="blog-prev-tag">{post.category}</span>
                    <span className="blog-prev-time">{post.readingTime}</span>
                  </div>
                  <h3 className="blog-prev-title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="blog-prev-desc">{post.description}</p>
                  <Link href={`/blog/${post.slug}`} className="blog-read-link">
                    <span>Read Essay</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
