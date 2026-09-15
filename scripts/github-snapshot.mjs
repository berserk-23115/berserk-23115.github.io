import { mkdir, readFile, writeFile } from "node:fs/promises";
import { Octokit } from "octokit";

const file = new URL("../public/data/github.json", import.meta.url);
const login = "berserk-23115";
const client = new Octokit({
  auth: process.env.PORTFOLIO_GH_TOKEN,
  request: { timeout: 10000 },
  retry: { enabled: false },
  log: { debug() {}, info() {}, warn() {}, error() {} },
});
let previous = {
  profile: null,
  repositories: [],
  contributions: [],
  pullRequests: [],
  fetchedAt: null,
};
try {
  previous = JSON.parse(await readFile(file, "utf8"));
} catch {
  /* First build. */
}
const next = { ...previous };
let refreshed = 0;

async function update(key, task) {
  try {
    next[key] = await task();
    refreshed++;
  } catch {
    console.warn(`GitHub ${key}: keeping the last available snapshot.`);
  }
}

await Promise.all([
  update("profile", async () => {
    const { data } = await client.rest.users.getByUsername({ username: login });
    return {
      login: data.login,
      name: data.name,
      avatarUrl: data.avatar_url,
      bio: data.bio,
      publicRepos: data.public_repos,
      followers: data.followers,
      url: data.html_url,
    };
  }),
  update("repositories", async () => {
    const { data } = await client.rest.repos.listForUser({
      username: login,
      type: "owner",
      sort: "updated",
      per_page: 100,
    });
    const curated = [
      "Amber",
      "KryptVault",
      "GPU-Specialisation-Capstone",
      "Assembly-RISCV-CO2024",
    ];
    const featured = curated
      .map((name) => data.find((repo) => repo.name === name))
      .filter(Boolean);
    const selected = [
      ...featured,
      ...data.filter((repo) => !repo.fork && !featured.includes(repo)),
    ].slice(0, 4);
    return Promise.all(
      selected.map(async (repo) => {
        let languages = repo.language ? [repo.language] : [];
        try {
          const { data } = await client.rest.repos.listLanguages({
            owner: login,
            repo: repo.name,
          });
          languages = Object.keys(data);
        } catch {
          /* Primary language remains available. */
        }
        return {
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          homepageUrl: repo.homepage || null,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          primaryLanguage: repo.language,
          languages,
          topics: repo.topics || [],
          updatedAt: repo.updated_at,
        };
      }),
    );
  }),
  update("pullRequests", async () => {
    const { data } = await client.rest.search.issuesAndPullRequests({
      q: `is:pr author:${login} is:merged -user:${login}`,
      sort: "updated",
      order: "desc",
      per_page: 8,
    });
    const requests = await Promise.all(
      data.items.map(async (item) => {
        const [owner, repo] = item.repository_url.split("/").slice(-2);
        const { data: pr } = await client.rest.pulls.get({
          owner,
          repo,
          pull_number: item.number,
        });
        return {
          title: pr.title,
          repository: repo,
          owner,
          number: pr.number,
          url: pr.html_url,
          mergedAt: pr.merged_at,
          additions: pr.additions,
          deletions: pr.deletions,
          changedFiles: pr.changed_files,
          external: owner.toLowerCase() !== login,
        };
      }),
    );
    return requests
      .filter((pr) => pr.mergedAt)
      .sort((a, b) => b.mergedAt.localeCompare(a.mergedAt));
  }),
  ...(process.env.PORTFOLIO_GH_TOKEN
    ? [
        update("contributions", async () => {
          const { user } = await client.graphql(
            "query($login:String!){user(login:$login){contributionsCollection{contributionYears}}}",
            { login },
          );
          const years = user.contributionsCollection.contributionYears.slice(
            0,
            3,
          );
          return Promise.all(
            years.map(async (year) => {
              const result = await client.graphql(
                "query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){contributionsCollection(from:$from,to:$to){contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel weekday}}}}}}",
                {
                  login,
                  from: `${year}-01-01T00:00:00Z`,
                  to: `${year}-12-31T23:59:59Z`,
                },
              );
              const calendar =
                result.user.contributionsCollection.contributionCalendar;
              const levels = [
                "NONE",
                "FIRST_QUARTILE",
                "SECOND_QUARTILE",
                "THIRD_QUARTILE",
                "FOURTH_QUARTILE",
              ];
              return {
                year,
                total: calendar.totalContributions,
                weeks: calendar.weeks.map((week) =>
                  week.contributionDays.map((day) => ({
                    date: day.date,
                    count: day.contributionCount,
                    level: Math.max(0, levels.indexOf(day.contributionLevel)),
                    weekday: day.weekday,
                  })),
                ),
              };
            }),
          );
        }),
      ]
    : []),
]);
if (refreshed) next.fetchedAt = new Date().toISOString();
await mkdir(new URL("../public/data/", import.meta.url), { recursive: true });
await writeFile(file, `${JSON.stringify(next, null, 2)}\n`);
console.log(`GitHub snapshot ready (${refreshed} sections refreshed).`);
