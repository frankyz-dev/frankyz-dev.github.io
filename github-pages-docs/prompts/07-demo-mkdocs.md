# Task: Demo — Option 3, MkDocs Material (Phase 2)

You are working in the `github-pages-docs` repo. Read `DESIGN.md` (Option 3)
and `ACTION_PLAN.md` (§2.3) first. `sample-content/` exists (tasks 01–04
done).

Create `demos/mkdocs/`:

- `mkdocs.yml`: Material theme, explicit nav for Design / SOPs / Runbooks,
  search enabled
- Copy the sample content into `docs/` and fix image paths
- Plugins: search, mermaid (`mkdocs-mermaid2-plugin`), and a versioning
  setup (two versions of the design doc)
- Showcase Material features in the content: tabs (k8s vs docker in
  `deploy-release.md`), admonitions (the warnings in the SOPs and runbook),
  checklists
- Serve on port **4103**

Done when: `mkdocs serve` runs from `demos/mkdocs/`, all three content types
plus images render at `localhost:4103`, search finds "rollback", the dark
mode toggle works, tabs plus admonitions render, and the mermaid diagrams
render.
