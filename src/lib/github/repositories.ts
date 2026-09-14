import { github, GITHUB_LOGIN } from './client';
import type { Repository } from './types';

export const FEATURED_REPOS = ['Amber', 'KryptVault', 'GPU-Specialisation-Capstone', 'Assembly-RISCV-CO2024'] as const;

function mapRepository(repository: Awaited<ReturnType<typeof github.rest.repos.get>>['data']): Repository {
  return {
    name: repository.name,
    description: repository.description,
    url: repository.html_url,
    homepageUrl: repository.homepage || null,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    primaryLanguage: repository.language,
    languages: repository.language ? [repository.language] : [],
    topics: repository.topics || [],
    updatedAt: repository.updated_at,
  };
}

export async function getFeaturedRepositories(): Promise<Repository[]> {
  try {
    const { data } = await github.rest.repos.listForUser({
      username: GITHUB_LOGIN,
      type: 'owner',
      sort: 'updated',
      direction: 'desc',
      per_page: 100,
      headers: { 'X-GitHub-Api-Version': '2022-11-28' },
    });
    const byName = new Map(data.filter(repository => !repository.fork).map(repository => [repository.name.toLowerCase(), repository]));
    const featured = FEATURED_REPOS.map(name => byName.get(name.toLowerCase())).filter((repo): repo is (typeof data)[number] => Boolean(repo));
    const fallback = data.filter(repository => !repository.fork && !featured.some(featuredRepo => featuredRepo.id === repository.id));
    return [...featured, ...fallback].slice(0, 4).map(repository => mapRepository(repository as Awaited<ReturnType<typeof github.rest.repos.get>>['data']));
  } catch {
    return [];
  }
}
