'use client';

import { ArrowUpRight, GitFork, Star } from 'lucide-react';
import type { PointerEvent } from 'react';
import type { Repository } from '@/lib/github/types';

function relativeDate(value: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 86_400_000));
  if (days === 0) return 'today';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.round(days / 30)}mo ago`;
  return `${Math.round(days / 365)}y ago`;
}

export function ProjectGrid({ repositories }: { repositories: Repository[] }) {
  const setPointer = (event: PointerEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - box.top}px`);
  };
  return <section className="project-grid" aria-label="Featured repositories">
    {repositories.map((repository, index) => <article className={`project-card project-card-${index + 1}`} onPointerMove={setPointer} key={repository.name}>
      <header><p>{String(index + 1).padStart(2, '0')} / {repository.primaryLanguage ?? 'CODEBASE'}</p><a href={repository.url} target="_blank" rel="noreferrer" aria-label={`Open ${repository.name} on GitHub`}><ArrowUpRight size={17} strokeWidth={1.5} /></a></header>
      <section className="project-main"><h3>{repository.name}</h3>{repository.description && <p>{repository.description}</p>}</section>
      <footer>
        <p>{repository.languages.slice(0, 3).join(' · ') || repository.topics.slice(0, 3).join(' · ')}</p>
        <section className="project-metrics" aria-label={`${repository.name} GitHub statistics`}><span><Star size={13} /> {repository.stars}</span><span><GitFork size={13} /> {repository.forks}</span><span>updated {relativeDate(repository.updatedAt)}</span></section>
      </footer>
    </article>)}
  </section>;
}
