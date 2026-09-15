# Anushk Kumar — Computational Matter

An editorial portfolio with a procedural Three.js sculpture, four project chapters, accessible command navigation, and build-time GitHub evidence.

## Develop

Use Node 24. `npm ci`, `npm run github`, then `npm run dev`.
`npm run build` refreshes the GitHub snapshot and exports the static site to `out/`.
Checks: `npm run typecheck`, `npm run lint`, `npm run astryx -- doctor`.

## Content and visuals

- `src/data/profile.ts`: audited identity, sources, projects and skills. Add a project here and choose a visual mode.
- `src/components/computational-core.tsx`: lazy Three.js scene, vertex displacement and procedural contour shader.
- `src/components/core-art.tsx`: deterministic SVG first paint and static fallback.
- `src/components/project-art.tsx`: project-specific signal/layer/lane/path drawings.
- `src/theme.ts`: Astryx color and type tokens. Run `npx astryx theme build src/theme.ts` after edits.
- `src/app/globals.css`: responsive compositions and shared size/spacing tokens.
- `DESIGN.md`: visual direction and responsive contract.

The renderer selects HIGH/MEDIUM/LOW by viewport and display density. LOW caps DPR at 1 and targets 30fps; others cap DPR at 1.5. Reduced motion, the command palette’s motion toggle, or failed WebGL use STATIC. The SVG remains visible while the renderer loads. Offscreen and background tabs skip rendering. Geometry, observers and GPU resources are disposed when the scene is removed.

## GitHub data

`scripts/github-snapshot.mjs` generates `public/data/github.json`. Requests time out, and each failed section retains its last successful value. The public file contains selected public data only. Set repository secret **PORTFOLIO_GH_TOKEN** to enable authenticated GraphQL contribution calendars. Never prefix this secret with `NEXT_PUBLIC_`. Public REST data works without it. No tokens or authenticated requests reach the browser.

The Pages workflow builds the checked-in snapshot, refreshes it during the build, and deploys `out/`. It runs on pushes to main, manual dispatch and a six-hour schedule. It uses `PORTFOLIO_GH_TOKEN` when configured and falls back to the workflow's built-in GitHub token. Enable GitHub Pages → GitHub Actions in repository settings. Runtime servers and Vercel are unnecessary.

No detailed case-study routes are published: the available public descriptions do not support invented outcomes or technical decision narratives. Each chapter links directly to its source repository.
