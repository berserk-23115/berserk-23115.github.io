import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ossGroups } from "@/data/oss";
import { ArrowLeft, GitPullRequest, GitMerge, ExternalLink, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Open Source Contributions | Anushk Kumar",
  description:
    "Merged contributions to external open source autonomous agent frameworks, Vertex AI pipelines, and test harnesses.",
};

export default function OssPage() {
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

            <span className="eyebrow">OPEN SOURCE // 10</span>
            <h1 className="subpage-title">
              Built in the Open. <br />
              <em>External Codebases.</em>
            </h1>
            <p className="subpage-desc">
              Verified merged contributions to multi-agent frameworks, telemetry harnesses,
              Vertex AI integrations, and distributed agent testing pipelines.
            </p>
          </div>
        </header>

        {/* OSS Repositories & PR Groups */}
        <section className="subpage-content-container" aria-label="Open source contributions list">
          <div className="oss-groups-stack">
            {ossGroups.map((group) => (
              <article className="oss-repo-group-card" key={`${group.owner}/${group.repo}`}>
                <header className="oss-group-header">
                  <div className="oss-repo-title-row">
                    <div className="oss-repo-icon-wrap">
                      <GitPullRequest className="size-5 text-sky-400" />
                    </div>
                    <div>
                      <h2 className="oss-repo-name">
                        <a
                          href={group.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="oss-repo-link"
                        >
                          {group.owner}/{group.repo}
                          <ExternalLink className="size-3.5" />
                        </a>
                      </h2>
                      <span className="oss-repo-domain">{group.primaryDomain}</span>
                    </div>
                  </div>
                  <p className="oss-repo-desc">{group.description}</p>
                </header>

                {/* PR Rows */}
                <div className="oss-prs-list">
                  {group.pullRequests.map((pr) => (
                    <div className="oss-pr-item" key={pr.number}>
                      <div className="oss-pr-top-line">
                        <div className="oss-pr-badge-title">
                          <span className="merged-tag">
                            <GitMerge className="size-3" /> Merged #{pr.number}
                          </span>
                          <h3 className="oss-pr-title">{pr.title}</h3>
                        </div>

                        <div className="oss-diff-stats" aria-label={`${pr.additions} additions, ${pr.deletions} deletions`}>
                          <span className="diff-add">+{pr.additions}</span>
                          <span className="diff-del">-{pr.deletions}</span>
                          <span className="diff-files">{pr.changedFiles} files</span>
                        </div>
                      </div>

                      <p className="oss-pr-summary">{pr.summary}</p>

                      {/* Technical Highlights */}
                      <ul className="oss-pr-highlights">
                        {pr.highlights.map((h, i) => (
                          <li key={i}>
                            <Sparkles className="size-3 text-sky-400 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="oss-pr-footer">
                        <time className="oss-pr-date" dateTime={pr.mergedAt}>
                          Merged on{" "}
                          {new Date(pr.mergedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="oss-view-pr-link"
                        >
                          <span>Inspect PR on GitHub</span>
                          <ExternalLink className="size-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
