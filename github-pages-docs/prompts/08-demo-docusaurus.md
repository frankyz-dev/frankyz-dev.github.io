# Task: Demo — Option 4, Docusaurus (Phase 2)

You are working in the `github-pages-docs` repo. Read `DESIGN.md` (Option 4)
and `ACTION_PLAN.md` (§2.4) first. `sample-content/` exists (tasks 01–04
done).

Create `demos/docusaurus/`:

- Scaffold with `npx create-docusaurus@latest` (classic template)
- Three sidebar categories: Design, SOPs, Runbooks
- Copy the sample content into `docs/`; convert to MDX where useful; fix
  image paths (Docusaurus uses `/img/` or imports)
- One MDX page with an embedded interactive React component (e.g., a live
  config snippet or a toggle)
- Versioned docs: v1 + v2 of the design doc
- Local search plugin (`@easyops-cn/docusaurus-search-local`)
- Mermaid plugin (`@docusaurus/theme-mermaid`)
- Code-block line highlighting in one diagnostics block
- Serve on port **4104**

Done when: `npm run start` runs from `demos/docusaurus/`, all three content
types plus images render at `localhost:4104`, search works, the version
switcher shows v1/v2, the MDX component is interactive, and the mermaid
diagrams render.
