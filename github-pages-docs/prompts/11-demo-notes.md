# Task: Comparison notes — DEMO_NOTES.md (Phase 3)

You are working in the `github-pages-docs` repo. Read `ACTION_PLAN.md`
(Phase 3) first. All six demos exist under `demos/` (tasks 05–10 done).

Create `DEMO_NOTES.md` at the repo root:

- Summary comparison table at the top
- One section per option (all six), each with:
  - Setup friction (time taken, dependencies, errors hit)
  - Dev-server speed and cold build time (measure it)
  - Content-type fit: how well the design doc / SOPs / runbook each render
  - Image handling convention and gotchas
  - Mermaid rendering: works via which plugin, or shown as raw code
  - Feature highlights actually demoed
  - Surprises (good and bad)

To fill this in accurately: start each demo's dev server (ports 4101–4106),
verify each claimed feature actually works, and time the cold builds. Do not
copy claims from the demo READMEs without checking.

Constraint: factual observations only — no recommendations. The decision is
a separate ADR that will use these notes as evidence.

Done when: `DEMO_NOTES.md` covers all six options with measured or verified
data, and every "feature highlight" listed was confirmed working.
