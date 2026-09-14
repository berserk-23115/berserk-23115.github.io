import 'server-only';
import { Octokit } from 'octokit';

/** This module is only imported by Server Components during static generation. */
export const github = new Octokit({
  auth: process.env.PORTFOLIO_GH_TOKEN,
  userAgent: 'anushk-kumar-portfolio',
});

export const GITHUB_LOGIN = 'berserk-23115';
