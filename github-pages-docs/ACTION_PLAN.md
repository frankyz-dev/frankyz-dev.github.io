# Action Plan: Sample Content & Local Framework Demos

Purpose:

1. Create shared **sample documentation** covering all three content types
   (design docs, SOPs, runbooks), including images.
2. **Implement all six options** from [DESIGN.md](DESIGN.md) as local demos,
   each showcasing a few of the framework's nice features to demonstrate its
   benefits.

Scope: local only. No production deployment, no Actions workflows, no
custom domain. Deployment mechanics (Actions vs. committed `dist/`) are a
post-decision concern and out of scope here.

## Phase 1 — Shared sample content

Create `sample-content/` once; every demo consumes the same content so
comparisons are apples-to-apples.

```
sample-content/
├── design/
│   └── architecture.md          # sample design doc
├── sops/
│   ├── rotate-credentials.md    # sample SOP
│   └── deploy-release.md        # sample SOP
├── runbooks/
│   └── high-error-rate.md       # sample runbook
└── images/
    ├── architecture.svg         # system architecture diagram
    ├── deploy-flow.svg          # deployment pipeline flowchart
    ├── dashboard-mockup.png     # mock monitoring dashboard (runbook)
    └── console-mockup.png       # mock console UI (SOP)
```

### 1.1 Design doc — `design/architecture.md`

- Content: system overview, components, data flow, design decisions
  (ADR-style), trade-offs.
- Images: `architecture.svg`, `deploy-flow.svg`.
- Mermaid: a sequence diagram of the order lifecycle (fenced `mermaid`
  code block, alongside the static SVGs).
- Feature hooks to exercise: large diagrams, mermaid sequence diagram,
  config code blocks with syntax highlighting, a component-inventory table,
  footnotes, long TOC.

### 1.2 SOPs — `sops/rotate-credentials.md`, `sops/deploy-release.md`

- Content: purpose, scope, prerequisites, numbered steps, verification,
  rollback.
- Images: `console-mockup.png` (screenshot-style, with caption).
- Mermaid: a flowchart of the rotation decision path in
  `rotate-credentials.md`.
- Feature hooks to exercise: task-list checklists, warning callouts on
  destructive steps, tabs (e.g., k8s vs. docker variants), last-updated
  metadata, mermaid flowchart.

### 1.3 Runbook — `runbooks/high-error-rate.md`

- Content: alert description, severity classification, fast-path mitigation,
  diagnostics, escalation contacts.
- Images: `dashboard-mockup.png`.
- Mermaid: a decision flowchart (diagnose → mitigate → escalate).
- Feature hooks to exercise: quick TOC, diagnostic command code blocks,
  "when to escalate" callout, dark-mode readability (incident-time reading),
  mermaid decision flowchart.

### 1.4 Images

- `architecture.svg`, `deploy-flow.svg`: hand-written SVGs (boxes + arrows) —
  lightweight, crisp at any size, easy to diff in git.
- `dashboard-mockup.png`, `console-mockup.png`: simple mock "screenshot"
  images (hand-crafted SVG converted to PNG, or ImageMagick) to stand in for
  real console/dashboard screenshots.
- Note: image path handling differs per framework (public dir vs. relative
  paths vs. imports). Each demo wires images per its own convention — this is
  itself a comparison data point for Phase 3.

### 1.5 Mermaid diagrams

- Written as fenced `mermaid` code blocks in the Markdown source — portable
  text that every framework can at least display as a code block.
- Rendering support varies by framework (see DESIGN.md, "Diagrams"): plugins
  /integrations for MkDocs, Docusaurus, VitePress, and Astro; a local-only
  plugin for Jekyll; none for plain Markdown.
- A demo that cannot render mermaid is expected to show the raw block — that
  is itself a comparison data point for Phase 3.

## Phase 2 — Local demos (one per option)

Layout: `demos/<name>/` per option, each with its own config plus a copy of
`sample-content/`. Per-option recipe: scaffold → wire in the shared content →
run the dev server → verify all three content types render with images →
note which features were demoed.

### 2.1 Option 1 — Plain Markdown (`demos/plain-md/`)

- No scaffold; the content is the site.
- Local demo: no build step; files are read raw (rendering only happens on
  GitHub). Optionally serve the folder with any static server to show the
  raw-files experience.
- Demo point: zero config — and the visible absence of nav, search, theming,
  and mermaid rendering (diagram blocks show as raw code).

### 2.2 Option 2 — Jekyll (`demos/jekyll/`)

- Setup: `gem install bundler jekyll`, `_config.yml` with three collections
  (design / sops / runbooks), `bundle exec jekyll serve`.
- Features to demo: collections per content type, a runbook layout template,
  TOC include, `jekyll-versioning` (two doc versions), theme dark mode,
  mermaid via `jekyll-mermaid` (local only — not on the GitHub Pages plugin
  allow-list).

### 2.3 Option 3 — MkDocs Material (`demos/mkdocs/`)

- Setup: `pip install mkdocs-material`, `mkdocs.yml` with explicit nav,
  `mkdocs serve`.
- Features to demo: built-in full-text search, TOC, dark-mode toggle, tabs,
  admonitions, checklists, mermaid rendering (`mkdocs-mermaid2-plugin`),
  versioning plugin.

### 2.4 Option 4 — Docusaurus (`demos/docusaurus/`)

- Setup: `npx create-docusaurus@latest` (classic template), `npm run start`.
- Features to demo: MDX with an embedded interactive component, versioned
  docs (v1/v2), sidebar, local search plugin
  (e.g., `@easyops-cn/docusaurus-search-local`), code-block line
  highlighting, mermaid rendering (`@docusaurus/theme-mermaid`).

### 2.5 Option 5 — VitePress (`demos/vitepress/`)

- Setup: scaffold with the VitePress template, configure `src/content` and
  the theme, `npm run docs:dev`.
- Features to demo: fast HMR dev server, built-in local search, custom
  containers, dark mode, MDX, mermaid rendering (`vitepress-plugin-mermaid`).

### 2.6 Option 6 — Astro Starlight (`demos/astro/`)

- Setup: `npm create astro@latest -- --template starlight`, `npm run dev`.
- Features to demo: Pagefind search, MDX with interactive components,
  content collections (typed frontmatter), zero-JS pages, dark mode, mermaid
  rendering (`@astrojs/mermaid` integration).

## Phase 3 — Comparison notes

- Run all dev servers on fixed ports (4101–4106) so they can be viewed
  side by side.
- Fill in `DEMO_NOTES.md`, per framework:
  - setup friction (time, dependencies, errors hit)
  - dev-server speed and build time
  - how well each content type fits (design / SOP / runbook)
  - image handling convention and gotchas
  - feature highlights actually demoed
  - surprises (good and bad)
- Feed the notes into the final decision (ADR) — demo evidence replaces
  speculation.

## Out of scope

- Production deployment (Actions workflows, committed `dist/` pattern)
- Custom domain, authentication, analytics
- Real screenshots/secrets — all sample content is fictional

## Deliverables checklist

- [ ] `sample-content/` — 4 docs (with mermaid diagrams) + 4 images
- [ ] `demos/plain-md/` — content as-is
- [ ] `demos/jekyll/` — serving locally
- [ ] `demos/mkdocs/` — serving locally
- [ ] `demos/docusaurus/` — serving locally
- [ ] `demos/vitepress/` — serving locally
- [ ] `demos/astro/` — serving locally
- [ ] `DEMO_NOTES.md` — comparison notes
