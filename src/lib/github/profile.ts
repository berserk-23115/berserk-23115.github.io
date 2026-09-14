import { github, GITHUB_LOGIN } from './client';
import type { GithubProfile } from './types';

export async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const { data } = await github.rest.users.getByUsername({ username: GITHUB_LOGIN });
    return {
      login: data.login,
      name: data.name,
      avatarUrl: data.avatar_url,
      bio: data.bio,
      publicRepos: data.public_repos,
      followers: data.followers,
      url: data.html_url,
    };
  } catch {
    return null;
  }
}
