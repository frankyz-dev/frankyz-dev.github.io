# Task: Sample images (Phase 1)

You are working in the `github-pages-docs` repo. Read `GOALS.md` and
`ACTION_PLAN.md` (§1.4) first.

Create four images in `sample-content/images/` for the fictional
"Acme Order Service" app:

1. `architecture.svg` — system architecture diagram. Hand-written SVG, boxes
   and arrows. Components: web client, API gateway, order service, worker,
   PostgreSQL, Redis, message queue. Labeled, clean layout, neutral palette.
2. `deploy-flow.svg` — deployment pipeline flowchart: commit → CI (tests) →
   build image → deploy staging → verify → deploy prod. Hand-written SVG.
3. `dashboard-mockup.png` — mock monitoring dashboard: an "Error rate" line
   chart panel plus a few stat panels (req/s, p99 latency, error %), with a
   time-range selector. Should read as a screenshot of a Grafana-style
   dashboard.
4. `console-mockup.png` — mock cloud console UI: left sidebar, a table of
   resources (name, status, region), a primary action button. Should read as
   a console screenshot.

Requirements:

- SVGs: valid, self-contained (no external fonts/assets), `viewBox` set,
  text legible at 100% zoom.
- PNGs: ~1200px wide; generate from SVG (rsvg-convert / inkscape /
  ImageMagick) or draw directly.
- Consistent visual style across all four (same font family, palette).
- Verify each image actually renders (open in a browser or inspect with an
  image tool) before finishing.

Done when: all four files exist at the paths above, render correctly, and
match the names used in `ACTION_PLAN.md`.
