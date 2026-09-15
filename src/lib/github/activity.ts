import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { PortfolioData } from "./types";

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    return JSON.parse(
      await readFile(
        path.join(process.cwd(), "public/data/github.json"),
        "utf8",
      ),
    ) as PortfolioData;
  } catch {
    return {
      profile: null,
      repositories: [],
      contributions: [],
      pullRequests: [],
    };
  }
}
