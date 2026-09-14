import { github, GITHUB_LOGIN } from './client';
import type { PullRequest } from './types';

export async function getMergedPullRequests(): Promise<PullRequest[]> {
  try {
    const { data } = await github.rest.search.issuesAndPullRequests({
      q: `is:pr author:${GITHUB_LOGIN} is:merged`,
      sort: 'updated',
      order: 'desc',
      per_page: 10,
    });
    const pullRequests = await Promise.all(data.items.map(async item => {
      if (!item.pull_request?.url || !item.repository_url) return null;
      const parts = item.repository_url.split('/');
      const owner = parts.at(-2);
      const repository = parts.at(-1);
      if (!owner || !repository) return null;
      const { data: pullRequest } = await github.rest.pulls.get({ owner, repo: repository, pull_number: item.number });
      if (!pullRequest.merged_at) return null;
      const mapped: PullRequest = {
        title: pullRequest.title,
        repository,
        owner,
        number: pullRequest.number,
        url: pullRequest.html_url,
        mergedAt: pullRequest.merged_at,
        additions: pullRequest.additions,
        deletions: pullRequest.deletions,
        changedFiles: pullRequest.changed_files,
        external: owner.toLowerCase() !== GITHUB_LOGIN.toLowerCase(),
      };
      return mapped;
    }));
    return pullRequests.filter((pullRequest): pullRequest is PullRequest => Boolean(pullRequest));
  } catch {
    return [];
  }
}
