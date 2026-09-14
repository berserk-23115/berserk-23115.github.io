import { ActivityConsole } from '@/components/activity-console';
import { ContributionGraph } from '@/components/contribution-graph';
import { ProjectGrid } from '@/components/project-grid';
import { SiteActions } from '@/components/site-actions';
import { education, profile, skills } from '@/data/profile';
import { getPortfolioData } from '@/lib/github/activity';
import type { PullRequest } from '@/lib/github/types';
import { ArrowUpRight } from 'lucide-react';

const external = { target: '_blank', rel: 'noreferrer' };

function relativeMonth(date: string) {
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit' }).format(new Date(date)).replace('/', '.');
}

function relativeDate(date: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(date).getTime()) / 86_400_000));
  if (days < 30) return days === 0 ? 'today' : `${days}d ago`;
  if (days < 365) return `${Math.round(days / 30)} months ago`;
  return `${Math.round(days / 365)} years ago`;
}

function PullRequestRow({ pullRequest }: { pullRequest: PullRequest }) {
  return <article className="oss-entry">
    <p className="oss-date">{relativeMonth(pullRequest.mergedAt)}</p>
    <section className="oss-content">
      <p className="repo-path">{pullRequest.owner}/{pullRequest.repository}</p>
      <a href={pullRequest.url} {...external}><h3>{pullRequest.title}</h3><ArrowUpRight size={18} strokeWidth={1.5} /></a>
      <footer>
        {(pullRequest.additions !== null || pullRequest.deletions !== null) && <span>+{pullRequest.additions ?? 0} <i>−{pullRequest.deletions ?? 0}</i>{pullRequest.changedFiles !== null && ` · ${pullRequest.changedFiles} files`}</span>}
        <span>Merged {relativeDate(pullRequest.mergedAt)}</span>
      </footer>
    </section>
  </article>;
}

export default async function Home() {
  const data = await getPortfolioData();
  const openSource = data.pullRequests.filter(pullRequest => pullRequest.external);
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'Person', name: profile.name, url: 'https://berserk-23115.github.io', email: `mailto:${profile.email}`,
    image: data.profile?.avatarUrl ?? profile.avatar, homeLocation: { '@type': 'Place', name: profile.location },
    alumniOf: { '@type': 'CollegeOrUniversity', name: education.institution },
    sameAs: [profile.sources.github, profile.sources.linkedin, profile.sources.x, profile.sources.dribbble],
  };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Anushk Kumar, home">AK<span>_</span></a>
      <nav aria-label="Primary navigation"><a href="#work">work</a><a href="#oss">oss</a><a href="#github">github</a><a href="#about">about</a></nav>
      <SiteActions />
    </header>
    <section id="top" className="hero" aria-labelledby="page-title">
      <section className="hero-copy">
        <p className="eyebrow"><span /> available for interesting problems</p>
        <p className="hero-name">ANUSHK KUMAR <i>—</i> IIIT DELHI</p>
        <h1 id="page-title">Engineering where <em>the details</em> are the product.</h1>
        <p className="lede">CSE undergraduate exploring the practical seams between AI, usable security, systems, and GPU compute.</p>
        <section className="hero-actions" aria-label="Contact and social links">
          <a className="action primary" href="#work">View work <ArrowUpRight size={16} /></a>
          <a className="action" href={profile.sources.github} {...external}>GitHub <ArrowUpRight size={16} /></a>
        </section>
      </section>
      <ActivityConsole data={data} />
    </section>
    <section className="signal-strip" aria-label="Engineering signals">
      {data.profile && <p><span>public repos</span><strong>{data.profile.publicRepos}</strong></p>}
      {data.contributions[0] && <p><span>{data.contributions[0].year} activity</span><strong>{data.contributions[0].total.toLocaleString()}</strong></p>}
      {data.pullRequests.length > 0 && <p><span>merged prs</span><strong>{data.pullRequests.length}</strong></p>}
      <p><span>primary focus</span><strong>systems / ai</strong></p>
    </section>
    {data.contributions.length > 0 ? <ContributionGraph years={data.contributions} /> : <section id="github" className="contribution-shell contribution-unavailable" aria-labelledby="github-title">
      <p className="section-index">01 / GITHUB</p><h2 id="github-title">GitHub activity, rendered natively.</h2><p>Set <code>PORTFOLIO_GH_TOKEN</code> at build time to populate the private server-side GraphQL contribution calendar.</p>
    </section>}
    <section id="work" className="section projects" aria-labelledby="projects-title">
      <header className="section-label"><span>02</span><p>Selected work</p><a href={profile.sources.github} {...external}>all repositories ↗</a></header>
      <section className="section-content">
        <section className="projects-head"><h2 id="projects-title">Selected systems, security, and AI work.</h2><p>Curated repositories, with current GitHub metadata loaded during the build.</p></section>
        {data.repositories.length > 0 ? <ProjectGrid repositories={data.repositories} /> : <p className="data-note">Repository metadata is temporarily unavailable. Browse the public work directly on <a href={profile.sources.github} {...external}>GitHub ↗</a>.</p>}
      </section>
    </section>
    <section id="oss" className="section oss" aria-labelledby="oss-title">
      <header className="section-label"><span>03</span><p>Open source</p></header>
      <section className="section-content">
        <section className="projects-head"><h2 id="oss-title">Code that left my repositories.</h2><p>Merged pull requests to projects maintained beyond this account.</p></section>
        {openSource.length > 0 ? <section className="oss-timeline">{openSource.map(pullRequest => <PullRequestRow pullRequest={pullRequest} key={pullRequest.url} />)}</section> : <p className="data-note">No external merged pull requests are currently available to display.</p>}
        <a className="text-link" href={`${profile.sources.github}?tab=overview`} {...external}>View all on GitHub <span aria-hidden="true">→</span></a>
      </section>
    </section>
    <section id="stack" className="section stack" aria-labelledby="stack-title">
      <header className="section-label"><span>04</span><p>Technical domains</p></header>
      <section className="section-content"><section className="stack-intro"><h2 id="stack-title">A practical stack shaped by the work.</h2><p>Technologies represented in public projects and the public profile, rather than a generic inventory.</p></section>
        <section className="skill-grid">{skills.map((skill, index) => <article key={skill.group}><span>0{index + 1}</span><h3>{skill.group}</h3><ul>{skill.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</section>
      </section>
    </section>
    <section id="about" className="section about" aria-labelledby="about-title">
      <header className="section-label"><span>05</span><p>About</p></header>
      <section className="section-content about-content"><section><h2 id="about-title">Curious about computing from the kernel up.</h2><p>{data.profile?.bio ?? profile.bio}</p><a className="text-link" href={profile.sources.profileReadme} {...external}>Read the public profile README <span aria-hidden="true">↗</span></a></section>
        <section className="education-note"><p>currently studying</p><h3>{education.institution}</h3><span>{education.programme}</span></section>
      </section>
    </section>
    <footer id="contact" className="footer"><p className="kicker">/ let’s make something precise</p><h2>Have a problem worth <em>thinking through?</em></h2><a className="email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={24} /></a><section className="footer-bottom"><p>© {new Date().getFullYear()} Anushk Kumar</p><p>Built with Next.js + Astryx</p><a href="#top">back to top ↑</a></section></footer>
  </main>;
}
