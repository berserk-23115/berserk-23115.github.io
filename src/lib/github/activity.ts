import { getContributions } from './contributions';
import { getMergedPullRequests } from './pull-requests';
import { getGithubProfile } from './profile';
import { getFeaturedRepositories } from './repositories';
import type { PortfolioData } from './types';

/**
 * Static-export compatible: this runs at build/deploy time. GitHub failures
 * degrade to omissions so no stale or fabricated engineering metrics are shown.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const [profile, contributions, repositories, pullRequests] = await Promise.all([
    getGithubProfile(), getContributions(), getFeaturedRepositories(), getMergedPullRequests(),
  ]);
  return { profile, contributions, repositories, pullRequests };
}
