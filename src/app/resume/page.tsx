import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { profile, education } from "@/data/profile";
import { primaryExperience } from "@/data/experience";
import { publications } from "@/data/publications";
import { certifications } from "@/data/certifications";
import { achievements } from "@/data/achievements";
import { ArrowLeft, Download, ExternalLink, Mail, MapPin, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume | Anushk Kumar",
  description:
    "Curriculum Vitae of Anushk Kumar — Computer Science at IIIT Delhi, Adobe Product Intern, Published Researcher in AI & Systems.",
};

export default function ResumePage() {
  return (
    <div className="portfolio subpage-shell">
      <Navigation />

      <main className="subpage-main">
        {/* Header with Download Action */}
        <header className="subpage-hero">
          <div className="subpage-hero-inner">
            <div className="resume-top-bar">
              <Link href="/" className="subpage-back-link">
                <ArrowLeft className="size-4" />
                <span>Back to home</span>
              </Link>

              <a
                href="/resume.pdf"
                download="Anushk_Kumar_Resume.pdf"
                className="resume-download-btn"
                aria-label="Download Anushk Kumar Resume PDF"
              >
                <Download className="size-4" />
                <span>Download PDF (Latest)</span>
              </a>
            </div>

            <span className="eyebrow">CURRICULUM VITAE // 2026</span>
            <h1 className="subpage-title">{profile.name}</h1>
            <p className="subpage-desc">
              Computer Science undergraduate at IIIT Delhi working across applied AI,
              high-performance computing, systems security, and scalable product engineering.
            </p>

            <div className="resume-contact-chips">
              <span className="contact-chip">
                <MapPin className="size-3.5" />
                {profile.location}
              </span>
              <a href={`mailto:${profile.email}`} className="contact-chip">
                <Mail className="size-3.5" />
                {profile.email}
              </a>
              <a
                href={profile.sources.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-chip"
              >
                github.com/{profile.handle}
              </a>
            </div>
          </div>
        </header>

        {/* Structured Resume Content Sheet */}
        <section className="subpage-content-container">
          <div className="resume-sheet">
            {/* Education */}
            <section className="resume-block">
              <h2 className="resume-section-title">Education</h2>
              <div className="resume-entry">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-role">{education.institution}</h3>
                    <p className="entry-sub">{education.degree}</p>
                  </div>
                  <div className="entry-meta">
                    <span className="entry-date">{education.period}</span>
                    <span className="entry-badge">CGPA: {education.cgpa}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section className="resume-block">
              <h2 className="resume-section-title">Work &amp; Research Experience</h2>
              <div className="resume-entries-stack">
                {primaryExperience.map((exp) => (
                  <div className="resume-entry" key={exp.id}>
                    <div className="entry-header">
                      <div>
                        <h3 className="entry-role">{exp.role}</h3>
                        <p className="entry-sub">
                          <strong>{exp.company}</strong>
                          {exp.team && ` · ${exp.team}`}
                          {exp.patentNotice && ` (${exp.patentNotice})`}
                        </p>
                      </div>
                      <div className="entry-meta">
                        <span className="entry-date">{exp.period}</span>
                        <span className="entry-location">{exp.location}</span>
                      </div>
                    </div>

                    <ul className="entry-bullets">
                      {exp.evidence.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Publications */}
            <section className="resume-block">
              <h2 className="resume-section-title">Publications &amp; Research</h2>
              <div className="resume-entries-stack">
                {publications.map((pub) => (
                  <div className="resume-entry" key={pub.id}>
                    <div className="entry-header">
                      <div>
                        <h3 className="entry-role">{pub.title}</h3>
                        <p className="entry-sub">
                          {pub.authors} · <em>{pub.venueFull}</em>
                        </p>
                      </div>
                      <div className="entry-meta">
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="entry-link"
                        >
                          <span>{pub.doi ? "DOI" : "arXiv"}</span>
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </div>
                    <p className="entry-desc">{pub.summary}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section className="resume-block">
              <h2 className="resume-section-title">Specializations &amp; Certifications</h2>
              <div className="resume-certs-grid">
                {certifications.map((cert) => (
                  <div className="cert-card" key={cert.id}>
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-issuer">
                      {cert.issuer} · {cert.platform}
                    </p>
                    <span className="cert-id">Credential ID: {cert.credentialId}</span>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-verify-link"
                    >
                      Verify on Coursera ↗
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section className="resume-block">
              <h2 className="resume-section-title">Honors &amp; Achievements</h2>
              <ul className="achievements-list">
                {achievements.map((ach) => (
                  <li key={ach.id} className="achievement-row">
                    <CheckCircle className="size-4 text-emerald-400 shrink-0" />
                    <div>
                      <strong>{ach.title}</strong> — {ach.organization} ({ach.period})
                      <p className="ach-desc">{ach.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
