export type ContributionDay = {
  date: string;
  count: number;
  level: number;
  weekday: number;
};

export type ContributionYear = {
  year: number;
  total: number;
  weeks: ContributionDay[][];
};

export type GithubProfile = {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  url: string;
};

export type Repository = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stars: number;
  forks: number;
  primaryLanguage: string | null;
  languages: string[];
  topics: string[];
  updatedAt: string;
};

export type PullRequest = {
  title: string;
  repository: string;
  owner: string;
  number: number;
  url: string;
  mergedAt: string;
  additions: number | null;
  deletions: number | null;
  changedFiles: number | null;
  external: boolean;
};

export type PortfolioData = {
  profile: GithubProfile | null;
  contributions: ContributionYear[];
  repositories: Repository[];
  pullRequests: PullRequest[];
};
