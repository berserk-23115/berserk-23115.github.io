export interface OssPullRequest {
  title: string;
  number: number;
  url: string;
  mergedAt: string;
  additions: number;
  deletions: number;
  changedFiles: number;
  summary: string;
  highlights: string[];
}

export interface OssRepositoryGroup {
  owner: string;
  repo: string;
  url: string;
  description: string;
  primaryDomain: string;
  pullRequests: OssPullRequest[];
}

export const ossGroups: OssRepositoryGroup[] = [
  {
    owner: "SDOS-2026",
    repo: "Documentation-Agent",
    url: "https://github.com/SDOS-2026/Documentation-Agent",
    description:
      "Autonomous agent architecture for automated documentation synthesis, query decomposition, and intelligent engineering knowledge retrieval.",
    primaryDomain: "Autonomous Agents & Vertex AI",
    pullRequests: [
      {
        number: 46,
        title: "[Update] : Codebase organised and tested",
        url: "https://github.com/SDOS-2026/Documentation-Agent/pull/46",
        mergedAt: "2026-04-17T14:45:43Z",
        additions: 3236,
        deletions: 636,
        changedFiles: 38,
        summary:
          "Restructured agent orchestration into modular pipeline stages with comprehensive automated test suites and validation mocks.",
        highlights: [
          "Refactored monolithic agent flows into isolated composable units",
          "Engineered unit and integration testing harness for tool execution",
          "Standardized configuration schemas and runtime error boundaries",
        ],
      },
      {
        number: 41,
        title: "Switch to Vertex AI for query processing #34",
        url: "https://github.com/SDOS-2026/Documentation-Agent/pull/41",
        mergedAt: "2026-04-15T10:20:23Z",
        additions: 9,
        deletions: 10,
        changedFiles: 1,
        summary:
          "Migrated model calling client to Google Cloud Vertex AI SDK for enterprise model endpoints and low-latency query reasoning.",
        highlights: [
          "Configured Vertex AI credential authorization pipeline",
          "Maintained backwards-compatible prompt format contracts",
        ],
      },
      {
        number: 2,
        title: "init project. closes #1",
        url: "https://github.com/SDOS-2026/Documentation-Agent/pull/2",
        mergedAt: "2026-04-11T11:42:07Z",
        additions: 1470,
        deletions: 0,
        changedFiles: 31,
        summary:
          "Initial project architecture setup, environment scaffolding, core document ingestion tooling, and CI pipeline setup.",
        highlights: [
          "Established project directory layout and package dependencies",
          "Constructed core retrieval pipelines and agent execution entrypoints",
        ],
      },
    ],
  },
  {
    owner: "SDOS-2026",
    repo: "Meeting-agent",
    url: "https://github.com/SDOS-2026/Meeting-agent",
    description:
      "Autonomous multi-agent system coordinating real-time meeting transcription, query resolution, action item synthesis, and LangSmith tracing.",
    primaryDomain: "Multi-Agent Systems & Observability",
    pullRequests: [
      {
        number: 54,
        title: "Fix/vertex ai",
        url: "https://github.com/SDOS-2026/Meeting-agent/pull/54",
        mergedAt: "2026-04-01T16:43:24Z",
        additions: 337,
        deletions: 23,
        changedFiles: 11,
        summary:
          "Stabilized Vertex AI query execution pipeline, resolving timeout issues and model payload formatting.",
        highlights: [
          "Resolved model streaming schema mismatch",
          "Implemented exponential backoff retry mechanisms for external API calls",
        ],
      },
      {
        number: 47,
        title: "Feature/langsmith",
        url: "https://github.com/SDOS-2026/Meeting-agent/pull/47",
        mergedAt: "2026-03-31T17:49:57Z",
        additions: 124,
        deletions: 2,
        changedFiles: 7,
        summary:
          "Integrated LangSmith telemetry and execution tracing across all subagents to observe token latency, tool calls, and error rates.",
        highlights: [
          "Configured end-to-end trace propagation across agent transitions",
          "Enabled telemetry dashboards for production observability",
        ],
      },
      {
        number: 46,
        title: "test: implement live LLM test suite and robust JSON parsing for Query Agent",
        url: "https://github.com/SDOS-2026/Meeting-agent/pull/46",
        mergedAt: "2026-03-31T17:15:50Z",
        additions: 226,
        deletions: 53,
        changedFiles: 5,
        summary:
          "Built a live LLM evaluation suite and a resilient JSON parsing filter capable of recovering malformed LLM outputs.",
        highlights: [
          "Engineered resilient JSON extractor handling markdown backticks and incomplete buffers",
          "Created continuous regression tests for multi-step reasoning",
        ],
      },
      {
        number: 41,
        title: "notes agent implemented and test",
        url: "https://github.com/SDOS-2026/Meeting-agent/pull/41",
        mergedAt: "2026-03-31T09:05:35Z",
        additions: 266,
        deletions: 37,
        changedFiles: 4,
        summary:
          "Engineered the dedicated Notes Agent responsible for distilling conversation threads into hierarchical action items.",
        highlights: [
          "Implemented extractive summarization pipeline",
          "Added unit coverage for ambiguous transcript segments",
        ],
      },
      {
        number: 40,
        title: "Test/agents",
        url: "https://github.com/SDOS-2026/Meeting-agent/pull/40",
        mergedAt: "2026-03-31T07:57:16Z",
        additions: 525,
        deletions: 12,
        changedFiles: 5,
        summary:
          "Constructed comprehensive agent mocks and asynchronous simulation harnesses for multi-client testing.",
        highlights: [
          "Isolated external network calls with mock LLM responder fixture",
          "Validated concurrent multi-turn dialogue state machine",
        ],
      },
    ],
  },
];
