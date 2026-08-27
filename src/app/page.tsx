import { ActivityConsole } from '@/components/activity-console';
import { SiteActions } from '@/components/site-actions';
import { education, profile, projects, skills } from '@/data/profile';
import Image from 'next/image';

const external = { target: '_blank', rel: 'noreferrer' };

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'Person', name: profile.name, url: 'https://berserk-23115.github.io', email: `mailto:${profile.email}`,
    image: profile.avatar, homeLocation: { '@type': 'Place', name: profile.location },
    alumniOf: { '@type': 'CollegeOrUniversity', name: education.institution },
    sameAs: [profile.sources.github, profile.sources.linkedin, profile.sources.x, profile.sources.dribbble],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Anushk Kumar, home">AK<span>_</span></a>
        <nav aria-label="Primary navigation"><a href="#about">about</a><a href="#projects">projects</a><a href="#stack">stack</a><a href="#contact">contact</a></nav>
        <SiteActions />
      </header>
      <section id="top" className="hero" aria-labelledby="page-title">
        <section className="hero-copy">
          <p className="eyebrow"><span /> available for interesting problems</p>
          <h1 id="page-title">Engineering where <em>the details</em> are the product.</h1>
          <p className="lede">I’m <strong>Anushk Kumar</strong>, a CSE undergraduate at IIIT Delhi. I explore the practical seams between AI, usable security, and systems.</p>
          <section className="hero-actions" aria-label="Contact and social links">
            <a className="action primary" href={`mailto:${profile.email}`}>Start a conversation <span aria-hidden="true">↗</span></a>
            <a className="action" href={profile.sources.github} {...external}>GitHub <span aria-hidden="true">↗</span></a>
            <a className="action" href={profile.sources.linkedin} {...external}>LinkedIn <span aria-hidden="true">↗</span></a>
          </section>
        </section>
        <section className="portrait-stage" aria-label="Anushk Kumar’s GitHub profile photo">
          <span className="portrait-orbit orbit-a" /><span className="portrait-orbit orbit-b" />
          <Image src={profile.avatar} alt="Anushk Kumar" width={600} height={600} priority />
          <p><span>01</span> New Delhi, India</p>
        </section>
      </section>
      <section className="marquee" aria-label="Areas of interest"><span>APPLIED AI</span><i>✳</i><span>USABLE SECURITY</span><i>✳</i><span>GPU COMPUTE</span><i>✳</i><span>SYSTEMS</span><i>✳</i><span>OPEN SOURCE</span></section>
      <section id="about" className="section about" aria-labelledby="about-title">
        <header className="section-label"><span>01</span><p>Field notes</p></header>
        <section className="about-body"><h2 id="about-title">Curious about computing from the kernel up.</h2><p>{profile.bio}</p><a className="text-link" href={profile.sources.profileReadme} {...external}>Read the public profile README <span aria-hidden="true">↗</span></a></section>
        <ActivityConsole />
      </section>
      <section id="projects" className="section projects" aria-labelledby="projects-title">
        <header className="section-label"><span>02</span><p>Selected work</p><a href={profile.sources.github} {...external}>all repositories ↗</a></header>
        <section className="projects-head"><h2 id="projects-title">Projects that leave a trail of technical decisions.</h2><p>Selected from public repositories with descriptions and technology choices verified against GitHub.</p></section>
        <section className="project-grid">
          {projects.map((project, index) => <article className={`project project-${project.accent}`} key={project.slug}>
            <header><span className="project-number">0{index + 1}</span><p>{project.eyebrow}</p><a href={project.repository} {...external} aria-label={`Open ${project.title} on GitHub`}>↗</a></header>
            <section className="project-glyph" aria-hidden="true"><span /><span /><span /><span /></section>
            <section className="project-copy"><h3>{project.title}</h3><p>{project.description}</p></section>
            <ul aria-label={`${project.title} technology stack`}>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
          </article>)}
        </section>
      </section>
      <section id="stack" className="section stack" aria-labelledby="stack-title">
        <header className="section-label"><span>03</span><p>Tools & disciplines</p></header>
        <section className="stack-intro"><h2 id="stack-title">A practical stack shaped by the work.</h2><p>These technologies appear in public projects or the public profile—not a generic skills inventory.</p></section>
        <section className="skill-grid">{skills.map((skill, index) => <article key={skill.group}><span>0{index + 1}</span><h3>{skill.group}</h3><ul>{skill.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</section>
      </section>
      <section className="section education" aria-labelledby="education-title">
        <header className="section-label"><span>04</span><p>Education</p></header>
        <section><p className="education-kicker">currently studying</p><h2 id="education-title">{education.institution}</h2><p>{education.programme}</p></section><a className="text-link" href={education.source} {...external}>Source: GitHub profile ↗</a>
      </section>
      <footer id="contact" className="footer">
        <p className="kicker">/ let’s make something precise</p><h2>Have a problem worth <em>thinking through?</em></h2><a className="email" href={`mailto:${profile.email}`}>{profile.email}<span>↗</span></a>
        <section className="footer-bottom"><p>© {new Date().getFullYear()} Anushk Kumar</p><p>Built with Next.js + Astryx</p><a href="#top">back to top ↑</a></section>
      </footer>
    </main>
  );
}
