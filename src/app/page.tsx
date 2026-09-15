import { VStack, HStack } from "@/components/editorial-layout";
import { SiteActions } from "@/components/site-actions";
import { CoreArt } from "@/components/core-art";
import { ComputationalCore } from "@/components/computational-core";
import { ProjectArt } from "@/components/project-art";
import { Experience, HeroType } from "@/components/experience";
import { ContributionGraph } from "@/components/contribution-graph";
import { education, profile, projects, skills } from "@/data/profile";
import { getPortfolioData } from "@/lib/github/activity";

const external = { target: "_blank", rel: "noopener noreferrer" };
const index = (number: string, title: string) => (
  <p className="eyebrow section-index">
    <b>{number}</b> / {title}
  </p>
);

export default async function Home() {
  const data = await getPortfolioData();
  const prs = data.pullRequests.filter((pr) => pr.external).slice(0, 6);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: "https://berserk-23115.github.io",
    sameAs: [profile.sources.github, profile.sources.linkedin],
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: education.institution,
    },
  };
  return (
    <VStack as="main" className="portfolio" gap={0}>
      <Experience />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <a href="#work" className="skip-link">
        Skip to selected work
      </a>
      <HStack
        as="header"
        className="navigation"
        justify="between"
        align="center"
      >
        <a className="wordmark" href="#top" aria-label="Anushk Kumar home">
          ak<i>_</i>
        </a>
        <HStack as="nav" gap={8} aria-label="Primary navigation">
          <a data-target="about" href="#about">
            01 / About
          </a>
          <a data-target="work" href="#work">
            02 / Work
          </a>
          <a data-target="stack" href="#stack">
            03 / System
          </a>
          <a data-target="contact" href="#contact">
            04 / Contact
          </a>
        </HStack>
        <SiteActions />
      </HStack>
      <section
        id="top"
        className="hero"
        data-chapter
        aria-labelledby="page-title"
      >
        <HStack className="hero-top" justify="between">
          <p className="eyebrow availability">
            Available for interesting problems
          </p>
          <p className="eyebrow edition">Independent portfolio / 2026</p>
        </HStack>
        <ComputationalCore />
        <VStack className="hero-text" gap={8}>
          <p className="eyebrow hero-identity">
            Anushk Kumar <b>—</b> CSE @ IIIT Delhi
          </p>
          <HeroType />
        </VStack>
        <HStack className="hero-bottom" align="end" justify="between" gap={8}>
          <VStack gap={6}>
            <p className="hero-description">
              At the intersection of intelligence,
              <br />
              security, and the systems beneath.
            </p>
            <HStack gap={6} wrap="wrap">
              <a className="primary-link" href={`mailto:${profile.email}`}>
                Start a conversation ↗
              </a>
              <a
                className="small-link"
                href={profile.sources.github}
                {...external}
              >
                GitHub ↗
              </a>
              <a
                className="small-link"
                href={profile.sources.linkedin}
                {...external}
              >
                LinkedIn ↗
              </a>
            </HStack>
          </VStack>
          <a className="scroll-cue" href="#about">
            <i>↓</i>
            <p className="eyebrow">
              Scroll to explore
              <br />
              <b>Signals → structure → evidence</b>
            </p>
          </a>
        </HStack>
        <p className="hero-side">
          AI × USABLE SECURITY × SYSTEMS × GPU COMPUTE
        </p>
      </section>
      <section
        className="field-notes section-pad"
        id="about"
        data-chapter
        aria-labelledby="about-title"
      >
        {index("01", "Field notes")}
        <h2 id="about-title">
          Curious about computing
          <br />
          from the <em>kernel up.</em>
        </h2>
        <HStack
          className="about-bottom"
          align="start"
          justify="between"
          gap={10}
        >
          <p className="eyebrow margin-note">
            The machine.
            <br />
            The person using it.
            <br />
            <b>The space in between.</b>
          </p>
          <VStack gap={6} className="about-prose">
            <p>
              I’m Anushk, a computer science undergraduate at IIIT Delhi. My
              work explores the practical seams between AI, usable security,
              systems, and GPU computing.
            </p>
            <p>
              I’m interested in what happens when the low-level details meet the
              real world: private intelligence, useful security, and software
              built with an understanding of the machine.
            </p>
            <a
              className="small-link"
              href={profile.sources.profileReadme}
              {...external}
            >
              More about me on GitHub ↗
            </a>
          </VStack>
        </HStack>
      </section>
      <section
        id="github"
        className="signal section-pad"
        data-chapter
        aria-labelledby="signal-title"
      >
        <HStack justify="between" align="start" gap={8}>
          {index("02", "Signal")}
          <a className="small-link" href={profile.sources.github} {...external}>
            Follow the work ↗
          </a>
        </HStack>
        <HStack
          className="signal-heading"
          align="end"
          justify="between"
          gap={8}
        >
          <h2 id="signal-title">
            Less assertion.
            <br />
            <em>More evidence.</em>
          </h2>
          <p className="signal-caption">
            Public work. Open repositories.
            <br />A record of things being built.
          </p>
        </HStack>
        {data.contributions.length > 0 ? (
          <ContributionGraph years={data.contributions} />
        ) : (
          <svg
            className="repository-signal"
            viewBox="0 0 1000 170"
            role="img"
            aria-label="Decorative signal field; repository statistics below are from GitHub"
          >
            <path
              d={Array.from(
                { length: 300 },
                (_, i) =>
                  `${i ? "L" : "M"}${i * 3.35},${85 + Math.sin(i * 0.09) * Math.sin(i * 0.031) * Math.sin(i * 0.21) * 62}`,
              ).join(" ")}
              fill="none"
              stroke="currentColor"
            />
            <path d="M0 85H1000" stroke="currentColor" opacity=".15" />
          </svg>
        )}
        <HStack className="signal-stats" justify="between" gap={8} wrap="wrap">
          {data.profile && (
            <p>
              <strong>{data.profile.publicRepos}</strong>
              <small>Public repositories</small>
            </p>
          )}
          <p>
            <strong>{projects.length.toString().padStart(2, "0")}</strong>
            <small>Selected studies</small>
          </p>
          <p>
            <strong>Open</strong>
            <small>Source, process, possibility</small>
          </p>
          <a
            className="small-link"
            href={`${profile.sources.github}?tab=overview`}
            {...external}
          >
            View contribution history ↗
          </a>
        </HStack>
      </section>
      <section
        id="work"
        className="work section-pad"
        data-chapter
        aria-labelledby="work-title"
      >
        <HStack justify="between" align="start">
          {index("03", "Selected work")}
          <p className="eyebrow">Four studies / one curiosity</p>
        </HStack>
        <h2 id="work-title" className="work-heading">
          Ideas, made
          <br />
          <em>executable.</em>
        </h2>
        {projects.map((project, i) => {
          const repo = data.repositories.find(
            (repo) => repo.name === project.repo,
          );
          return (
            <article
              className={`project-chapter chapter-${project.visual}`}
              key={project.slug}
              id={project.slug}
            >
              <HStack
                className="chapter-heading"
                justify="between"
                align="start"
                gap={8}
              >
                <VStack gap={4}>
                  <p className="eyebrow">
                    <b>0{i + 1}</b> / {project.category}
                  </p>
                  <h3>
                    <a href={project.source} {...external}>
                      {project.title}
                      <sup>↗</sup>
                    </a>
                  </h3>
                </VStack>
                <p className="chapter-number" aria-hidden="true">
                  0{i + 1}
                </p>
              </HStack>
              <figure className="project-visual">
                <ProjectArt mode={project.visual} />
                <HStack as="figcaption" justify="between" gap={4}>
                  {project.labels.map((label) => (
                    <p key={label}>{label}</p>
                  ))}
                </HStack>
                <p className="visual-caption">
                  {project.visual === "signal"
                    ? "Local intelligence / contained context"
                    : project.visual === "layers"
                      ? "Boundaries, expressed as structure"
                      : project.visual === "lanes"
                        ? "One frame / many simultaneous operations"
                        : "Discrete instructions / deliberate order"}
                </p>
              </figure>
              <HStack
                className="project-details"
                justify="between"
                align="start"
                gap={10}
              >
                <VStack gap={5} className="project-story">
                  <p className="project-statement">{project.description}</p>
                  <p className="project-detail">{project.detail}</p>
                </VStack>
                <VStack className="project-meta" gap={6}>
                  <p className="eyebrow">{project.technologies.join(" / ")}</p>
                  {repo && (
                    <p className="repo-metrics">
                      {repo.stars} stars · {repo.forks} forks
                      <br />
                      Updated{" "}
                      {new Date(repo.updatedAt).toLocaleDateString("en", {
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </p>
                  )}
                  <a
                    className="primary-link"
                    href={project.source}
                    {...external}
                  >
                    View repository ↗
                  </a>
                </VStack>
              </HStack>
            </article>
          );
        })}
      </section>
      <section
        id="stack"
        className="capabilities section-pad"
        data-chapter
        aria-labelledby="stack-title"
      >
        {index("04", "Tools & disciplines")}
        <h2 id="stack-title">
          A practical stack.
          <br />
          <em>Shaped by the work.</em>
        </h2>
        <VStack className="skill-list" gap={0}>
          {skills.map((skill, i) => (
            <HStack
              className="skill-row"
              key={skill.group}
              justify="between"
              align="center"
              gap={8}
            >
              <p className="eyebrow">0{i + 1}</p>
              <h3>{skill.group}</h3>
              <p>{skill.items.join(" / ")}</p>
              <i aria-hidden="true">↗</i>
            </HStack>
          ))}
        </VStack>
      </section>
      <section
        className="education section-pad"
        aria-labelledby="education-title"
      >
        {index("05", "Foundation")}
        <HStack
          className="education-body"
          justify="between"
          align="start"
          gap={10}
        >
          <h2 id="education-title">
            IIIT Delhi<i>↗</i>
          </h2>
          <VStack gap={5}>
            <p>{education.institution}</p>
            <p className="eyebrow">{education.programme}</p>
            <p className="eyebrow">New Delhi, India / Currently studying</p>
            <a className="small-link" href={education.source} {...external}>
              Public profile ↗
            </a>
          </VStack>
        </HStack>
      </section>
      <section
        id="oss"
        className="oss section-pad"
        data-chapter
        aria-labelledby="oss-title"
      >
        {index("06", "Beyond my repositories")}
        <h2 id="oss-title">Built in the open.</h2>
        <VStack className="oss-list" gap={0}>
          {prs.map((pr) => (
            <a className="oss-row" href={pr.url} {...external} key={pr.url}>
              <p key="repo" className="eyebrow">
                {pr.owner}/{pr.repository}
              </p>
              <h3 key="title">{pr.title}</h3>
              <p key="date" className="eyebrow">
                #{pr.number} · Merged{" "}
                <time dateTime={pr.mergedAt}>
                  {new Date(pr.mergedAt).toLocaleDateString("en", {
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </time>{" "}
                ↗
              </p>
            </a>
          ))}
        </VStack>
        <a
          className="small-link"
          href={`https://github.com/pulls?q=is%3Apr+author%3Aberserk-23115+is%3Amerged`}
          {...external}
        >
          Explore merged contributions ↗
        </a>
      </section>
      <footer id="contact" className="contact section-pad" data-chapter>
        <HStack justify="between">
          {index("07", "The next interesting problem")}
          <p className="eyebrow">Complexity → clarity</p>
        </HStack>
        <CoreArt compact />
        <h2>
          Let’s make
          <br />
          something
          <br />
          <em>precise.</em>
          <i>↗</i>
        </h2>
        <HStack
          className="contact-bottom"
          justify="between"
          align="end"
          gap={8}
        >
          <VStack gap={5}>
            <p>Have a problem worth thinking through?</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email} ↗
            </a>
          </VStack>
          <a className="small-link" href="#top">
            Back to the beginning ↑
          </a>
        </HStack>
        <HStack className="colophon" justify="between" gap={6} wrap="wrap">
          <p className="eyebrow">© {new Date().getFullYear()} Anushk Kumar</p>
          <p className="eyebrow">New Delhi / India</p>
          <p className="eyebrow">Next.js / Motion / Three.js</p>
          <a className="small-link" href={profile.sources.github} {...external}>
            Source ↗
          </a>
        </HStack>
      </footer>
    </VStack>
  );
}
