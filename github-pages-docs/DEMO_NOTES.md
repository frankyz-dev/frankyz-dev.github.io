# DEMO_NOTES.md — Phase 3 comparison notes

Factual observations from running the five local demos under `demos/` and
measuring their dev servers and cold builds. No recommendations — the ADR is
a separate document that uses these notes as evidence.

**Scope note:** Option 2 (Jekyll) was skipped by the project owner and is not
covered here. The five options below are: Plain Markdown (4101), MkDocs
Material (4103), Docusaurus (4104), VitePress (4105), Astro Starlight (4106).
Port 4102 is unused (it was Jekyll's).

**Viewing all demos on one origin (GitHub Pages mock):** `server/` contains a
basic Node HTTP server (`server/server.mjs`) that mimics GitHub Pages — one
origin, everything under the `/github-pages-docs/` subpath (matching the
production layout at `https://frankyz-dev.github.io/github-pages-docs/`),
landing page at the subpath root:
`http://127.0.0.1:4100/github-pages-docs/{,astro/,docusaurus/,mkdocs/,vitepress/,plain-md/}`.
Run with `cd server && npm install && npm start`. To make the subpath serving
work, the three SSG demos are built with matching base paths (`base:
'/github-pages-docs/astro/'`, `baseUrl: '/github-pages-docs/docusaurus/'`,
`base: '/github-pages-docs/vitepress/'`) — the same requirement a real
GitHub Pages deployment under `/<user>.github.io/<subfolder>/` would have.
MkDocs emits relative links and needed no change. `plain-md` `.md` files are
rendered server-side with `marked` to mimic GitHub's built-in renderer. See
`server/README.md`.

**Measurement method**

- Dev-server start time: wall-clock from command start to first HTTP 200 on
  the demo's port (curl polling every 200 ms).
- Cold build time: build output directory deleted first (`site/`, `build/`,
  `docs/.vitepress/dist`, `dist/`); `node_modules` / `.venv` kept (install
  time is setup friction, not build time).
- Feature verification: `curl` against the served pages; for client-rendered
  dev servers (Docusaurus, VitePress) features were additionally verified in
  the production build output.
- Machine: 4 CPU, ~7.8 GB RAM (limited — one dev server at a time),
  Node v26.7.0, npm 11.19.0, Python 3.12.3.

## Summary comparison

| | Plain Markdown | MkDocs Material | Docusaurus | VitePress | Astro Starlight |
|---|---|---|---|---|---|
| Dev-server start (to first 200) | _measuring_ | _measuring_ | _measuring_ | _measuring_ | _measuring_ |
| Cold build time | N/A (no build) | _measuring_ | _measuring_ | _measuring_ | _measuring_ |
| Mermaid | raw code (no renderer) | _measuring_ | _measuring_ | _measuring_ | _measuring_ |
| Search | none | _measuring_ | _measuring_ | _measuring_ | _measuring_ |
| Dark mode | none (GitHub default) | _measuring_ | _measuring_ | _measuring_ | _measuring_ |
| Doc versioning | none | _measuring_ | _measuring_ | _measuring_ | _measuring_ |

_Fill in after all measurements complete._

---

## Option 3 — MkDocs Material (`demos/mkdocs/`, port 4103)

### Setup friction

- Dependencies (Python 3.12.3, via uv): `mkdocs-material` 9.7.7 (pulls in
  mkdocs 1.6.1), `mkdocs-mermaid2-plugin` 1.2.3, pymdown-extensions 11.0.2.
  The demo's `.venv` was created in a prior task (`uv venv` +
  `uv pip install`); no reinstall was needed for this measurement pass.
- Config: one `mkdocs.yml` (explicit nav, Material theme, plugins,
  markdown extensions). Content is a converted copy of `sample-content/`
  in `docs/`.
- Errors hit during this pass: none. (Prior-task gotchas recorded in the
  demo README: admonitions cannot be nested inside list items, and
  splitting a numbered list around an admonition resets its numbering —
  both visible in the rotate-credentials SOP, where the warning callout
  sits after the procedure list with an explicit "step 7" reference.)

### Dev-server speed and cold build time

- Dev server (`mkdocs serve -a 127.0.0.1:4103`): first HTTP 200 in **1.73 s**.
- Cold build (`mkdocs build`, `site/` deleted first): **1.38 s** wall clock
  (mkdocs reports "Documentation built in 0.92 seconds").

### Content-type fit

- Design doc: renders well — component-inventory table (2 tables on the
  page), footnotes (11 footnote markers/refs), long TOC with permalinks
  (16 headerlinks), both SVG images inline, version banner linking to the
  v1 revision.
- SOPs: deploy-release shows Kubernetes/Docker tabs, a `danger`
  admonition, and 7 task-list checkboxes; rotate-credentials shows the
  console-mockup PNG, a `warning` admonition, and 11 task-list checkboxes.
- Runbook: severity table (SEV-1/2/3), `danger` escalation admonition,
  dashboard-mockup PNG, hand-written anchor TOC coexists with Material's
  generated TOC.

### Image handling convention and gotchas

- Images live in `docs/images/` (copied with the content) and are
  referenced with relative paths (`../images/...`); MkDocs copies them
  into `site/images/` and rewrites the links. Verified: all four images
  present in the build and referenced from the pages.
- Gotcha (from demo README, consistent with config): links to files
  outside `docs/` produce build warnings, so the index references repo
  files as plain text.

### Mermaid rendering

- **Works via `mkdocs-mermaid2-plugin`** (1.2.3) + `pymdownx.superfences`
  custom fence: fenced `mermaid` blocks become `<div class="mermaid">`
  containing the diagram source, and the page loads
  `https://unpkg.com/mermaid@10.4.0/dist/mermaid.esm.min.mjs` to render
  client-side. Verified in dev server HTML and build output (design doc
  sequence diagram, rotate-SOP flowchart, runbook flowchart).
- Gotcha: the mermaid JS comes from the unpkg CDN at runtime — rendering
  depends on network access in the browser, and the SSR HTML contains the
  raw diagram source in the div, not the SVG.

### Feature highlights actually demoed

- Full-text search: built-in `search` plugin; `/search/search_index.json`
  served (41 KB) and contains "rollback" (verified in dev and build).
- Dark mode toggle: two palettes (`default` light + `slate` dark) with
  toggle labels present in page HTML (verified).
- Tabs: `pymdownx.tabbed` — Kubernetes/Docker tab set in the deploy SOP
  (verified `tabbed-set` markup).
- Admonitions: `danger` (deploy SOP, runbook) and `warning` (rotate SOP)
  render as `admonition` blocks (verified).
- Checklists: `pymdownx.tasklist` — 7 + 11 task-list items across the two
  SOPs (verified).
- Mermaid: see above (verified).
- Syntax highlighting + copy button: code blocks carry the Material
  `highlight` class; the copy button is injected client-side by Material
  JS (`content.code.copy` enabled in config).
- TOC with permalinks + floating TOC: 16 headerlinks on the design doc;
  `toc.follow` enabled (verified markup; follow behavior is client-side).
- Sidebar navigation with sections, prev/next footer, back-to-top
  (verified in page HTML).
- Versioning: two nav entries — "Design (v2 — current)" and "Design
  (v1)" — each page carries a banner linking to the other revision
  (verified both pages 200 and cross-linked). No versioning plugin is
  used (README documents why: `mkdocs-versioning` is a no-op in serve
  mode and archived; `mike` is build/deploy-time).

### Surprises

- Good: fastest measured dev-server start and cold build of the
  framework-based options (1.73 s / 1.38 s); everything is server-rendered
  so every feature is verifiable with plain `curl`.
- Bad: mermaid rendering is CDN-dependent (unpkg) at view time; the
  admonition-inside-list limitation forced a workaround in the rotate
  SOP; "versioning" is two nav entries, not real versioned docs.

---

## Option 1 — Plain Markdown (`demos/plain-md/`, port 4101)

### Setup friction

- No scaffold, no config, no dependencies. The content is the site: the
  `sample-content/` files copied verbatim into `demos/plain-md/`
  (`design/`, `sops/`, `runbooks/`, `images/`).
- Nothing to install; nothing to build. Served locally with
  `python3 -m http.server 4101` (Python 3.12.3 already present).
- Errors hit: none.

### Dev-server speed and cold build time

- Dev server: `python3 -m http.server 4101` — a plain static file server;
  first HTTP 200 on the directory listing: **0.22 s**.
- Cold build time: **N/A — there is no build step.** The files are read raw;
  rendering happens only in GitHub's Markdown renderer.

### Content-type fit

- Design doc / SOPs / runbook: all three are present as raw `.md` files.
  Served locally they are **not rendered** — the browser gets the raw
  Markdown source (or a directory listing). Rendering (headings, tables,
  code blocks, images) happens only in GitHub's renderer.
- The runbook's hand-written "In this runbook" anchor list works in GitHub's
  rendered view (standard GitHub anchor slugs), but cannot be verified
  locally.

### Image handling convention and gotchas

- Images live in `images/` next to the docs and are referenced with relative
  paths (`../images/architecture.svg`, `../images/console-mockup.png`,
  `../images/dashboard-mockup.png`).
- Gotcha: in the raw/served view the image references are just links in the
  source; they render only in GitHub's rendered view. Relative paths must
  stay correct as files move between directories.

### Mermaid rendering

- **Not rendered.** GitHub's Markdown renderer does not support Mermaid, so
  the fenced `mermaid` blocks (sequence diagram in the design doc,
  flowcharts in the rotate-credentials SOP and the runbook) display as raw
  code. Verified: the served `.md` files contain the raw fences (see
  verification below).

### Feature highlights actually demoed

- Zero-config publishing: the folder is the site (verified: static server
  serves the files as-is; no config file exists in the demo).
- Raw files served correctly: all three docs return 200 as raw Markdown
  (the design doc's ` ```mermaid ` sequence fence, the SOP's 11 checklist
  items, and the runbook's flowchart fence all appear as literal source
  text); all four images return 200 with correct content types
  (`image/svg+xml`, `image/png`).
- Nothing else — no nav, no search, no theming, no versioning (verified
  absent: no `index.html` (404), zero `.html`/`.js`/`.css` files in the
  demo directory).

### Surprises

- Good: truly zero friction — no install, no build, no upgrade surface.
- Bad: locally you can only see raw source; every rendering feature has to
  be trusted to GitHub's renderer rather than verified.
