import { github, GITHUB_LOGIN } from './client';
import type { ContributionDay, ContributionYear } from './types';

type ContributionResponse = {
  user: {
    contributionYears: number[];
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string; weekday: number }[] }[];
      };
    };
  } | null;
};

const contributionLevel = (level: string) => ({ NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 }[level] ?? 0);

async function calendarFor(year: number): Promise<ContributionYear | null> {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;
  const result = await github.graphql<ContributionResponse>(`
    query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel weekday } } }
        }
      }
    }
  `, { login: GITHUB_LOGIN, from, to });
  const calendar = result.user?.contributionsCollection.contributionCalendar;
  if (!calendar) return null;
  return {
    year,
    total: calendar.totalContributions,
    weeks: calendar.weeks.map(week => week.contributionDays.map(day => ({ date: day.date, count: day.contributionCount, level: contributionLevel(day.contributionLevel), weekday: day.weekday } satisfies ContributionDay))),
  };
}

export async function getContributions(): Promise<ContributionYear[]> {
  if (!process.env.PORTFOLIO_GH_TOKEN) return [];
  try {
    const years = await github.graphql<{ user: { contributionYears: number[] } | null }>(`query Years($login: String!) { user(login: $login) { contributionYears } }`, { login: GITHUB_LOGIN });
    const calendars = await Promise.all((years.user?.contributionYears ?? []).slice(0, 3).map(calendarFor));
    return calendars.filter((calendar): calendar is ContributionYear => Boolean(calendar));
  } catch {
    return [];
  }
}
