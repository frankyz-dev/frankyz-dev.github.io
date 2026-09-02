# Task: Demo — Option 2, Jekyll (Phase 2)

You are working in the `github-pages-docs` repo. Read `DESIGN.md` (Option 2)
and `ACTION_PLAN.md` (§2.2) first. `sample-content/` exists (tasks 01–04
done).

Create `demos/jekyll/` — a Jekyll site serving the sample content:

- `_config.yml` with three collections: `design`, `sops`, `runbooks`
- A runbook layout template (consistent structure: alert / severity /
  mitigation / escalation)
- A TOC include used by the design doc layout
- `jekyll-versioning` plugin: two versions of the design doc (v1/v2)
- `jekyll-mermaid` plugin for the mermaid blocks (local only — not on the
  GitHub Pages plugin allow-list)
- Dark mode via theme CSS
- Images: place `sample-content/images/` where Jekyll serves it (e.g.,
  `images/` at the site root) and fix the paths
- Serve on port **4102**

Features to verify working, and note in `demos/jekyll/README.md`:
collections, runbook template, TOC, versioning switcher, dark mode, mermaid
rendering.

Done when: `bundle exec jekyll serve` runs from `demos/jekyll/`, all three
content types plus images render at `localhost:4102`, and the versioning
switcher works.
