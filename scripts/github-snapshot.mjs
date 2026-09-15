import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { Octokit } from "octokit";

const file = new URL("../public/data/github.json", import.meta.url);
const login = "berserk-23115";

// Allowlist for public representation
const PUBLIC_ALLOWLIST = new Set([
  "Amber",
  "KryptVault",
  "GPU-Specialisation-Capstone",
  "Assembly-RISCV-CO2024",
  "TrueSight",
  "MedicaMS",
  "AngryBird-LibGDX",
  "ELFLoader-WithPaging",
  "SimpleScheduler",
  "SimpleMultiThreader",
  "openmp-llm",
]);

// Determine token: check environment, then try local gh CLI if in development
let token = process.env.PORTFOLIO_GH_TOKEN;
if (!token) {
  try {
    const output = execSync("gh auth token", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();
    if (output) token = output;
  } catch {
    /* No local gh cli or logged out */
  }
}

const client = new Octokit({
  auth: token,
  request: { timeout: 12000 },
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
  /* First build */
}

const next = { ...previous };
let refreshed = 0;

async function update(key, task) {
  try {
    next[key] = await task();
    refreshed++;
  } catch (err) {
    console.warn(`GitHub ${key}: keeping previous snapshot (${err.message}).`);
  }
}

await Promise.all([
  update("profile", async () => {
    const { data } = await client.rest.users.getByUsername({ username: login });
    return {
      login: data.login,
      name: data.name || "Anushk Kumar",
      avatarUrl: data.avatar_url,
      bio: data.bio,
      publicRepos: data.public_repos,
      followers: data.followers,
      url: data.html_url,
    };
  }),

  update("repositories", async () => {
    // Fetch public repositories only
    const { data } = await client.rest.repos.listForUser({
      username: login,
      type: "owner",
      sort: "updated",
      per_page: 100,
    });

    // Enforce privacy rule: Filter out any private repository, only allow public & allowlisted
    const publicSafe = data.filter((repo) => !repo.private && PUBLIC_ALLOWLIST.has(repo.name));

    // Desired order for primary showcase
    const priorityOrder = [
      "Amber",
      "KryptVault",
      "GPU-Specialisation-Capstone",
      "Assembly-RISCV-CO2024",
      "TrueSight",
      "MedicaMS",
    ];

    const sorted = [...publicSafe].sort((a, b) => {
      const idxA = priorityOrder.indexOf(a.name);
      const idxB = priorityOrder.indexOf(b.name);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    return Promise.all(
      sorted.map(async (repo) => {
        let languages = repo.language ? [repo.language] : [];
        try {
          const { data: langData } = await client.rest.repos.listLanguages({
            owner: login,
            repo: repo.name,
          });
          languages = Object.keys(langData);
        } catch {
          /* Fallback to primary */
        }

        // Sanitized public fields only
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
      })
    );
  }),

  update("pullRequests", async () => {
    // Search merged PRs authored by login outside own repositories
    const { data } = await client.rest.search.issuesAndPullRequests({
      q: `is:pr author:${login} is:merged -user:${login}`,
      sort: "updated",
      order: "desc",
      per_page: 12,
    });

    const requests = await Promise.all(
      data.items.map(async (item) => {
        const [owner, repo] = item.repository_url.split("/").slice(-2);
        try {
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
            external: owner.toLowerCase() !== login.toLowerCase(),
          };
        } catch {
          return null;
        }
      })
    );

    return requests
      .filter((pr) => pr && pr.mergedAt)
      .sort((a, b) => b.mergedAt.localeCompare(a.mergedAt));
  }),

  ...(token
    ? [
        update("contributions", async () => {
          const { user } = await client.graphql(
            "query($login:String!){user(login:$login){contributionsCollection{contributionYears}}}",
            { login }
          );
          const years = user.contributionsCollection.contributionYears.slice(0, 3);
          const levels = [
            "NONE",
            "FIRST_QUARTILE",
            "SECOND_QUARTILE",
            "THIRD_QUARTILE",
            "FOURTH_QUARTILE",
          ];

          return Promise.all(
            years.map(async (year) => {
              const result = await client.graphql(
                "query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){contributionsCollection(from:$from,to:$to){contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel weekday}}}}}}",
                {
                  login,
                  from: `${year}-01-01T00:00:00Z`,
                  to: `${year}-12-31T23:59:59Z`,
                }
              );
              const calendar =
                result.user.contributionsCollection.contributionCalendar;

              return {
                year,
                total: calendar.totalContributions,
                weeks: calendar.weeks.map((week) =>
                  week.contributionDays.map((day) => ({
                    date: day.date,
                    count: day.contributionCount,
                    level: Math.max(0, levels.indexOf(day.contributionLevel)),
                    weekday: day.weekday,
                  }))
                ),
              };
            })
          );
        }),
      ]
    : []),
]);

if (refreshed > 0) {
  next.fetchedAt = new Date().toISOString();
}

await mkdir(new URL("../public/data/", import.meta.url), { recursive: true });
await writeFile(file, `${JSON.stringify(next, null, 2)}\n`);
console.log(`GitHub snapshot ready (${refreshed} sections refreshed).`);
