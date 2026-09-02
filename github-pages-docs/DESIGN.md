# Design: Hosting App Documentation on GitHub Pages

Status: draft — options only, no recommendation (selection is a follow-up step)

## Context

Goal (see [GOALS.md](GOALS.md)): host design docs, SOPs, and runbooks on
GitHub Pages as a static, git-backed documentation site.

## Requirements & Constraints

- Must deploy to GitHub Pages (free, static, no servers to run)
- Content authored in Markdown, stored in git
- Git-based workflow: pull requests, review, history
- Navigation (sidebar / TOC) and full-text search expected
- Low maintenance: few moving parts, minimal tooling to keep up to date
- Content characteristics:
  - Design docs: long-form, diagrams, infrequent changes
  - SOPs: step-by-step, checklists, occasionally updated
  - Runbooks: must be found quickly during incidents

## Deployment Mechanics (common to all options)

Three patterns exist for getting content onto GitHub Pages:

1. **Native GitHub Pages** — GitHub itself builds the site (plain Markdown or
   Jekyll) on push. No CI workflow required.
2. **GitHub Actions build + Pages deployment** — any generator builds in a
   workflow and the output is deployed to Pages
   (`actions/deploy-pages` / `pages-artifact`).
3. **Commit build artifacts** — build the site locally (or in any CI),
   commit the generated output (typically to a `gh-pages` branch), and let
   Pages serve it as plain static files. No Actions deployment required.

### Pattern 3 in detail: committing build artifacts

**Pros**

- No GitHub Actions — no workflow files, no Actions minutes, no
  `pages:write`/OIDC token setup; works where Actions is disabled
- Builds anywhere (laptop, internal CI); not coupled to GitHub runners
- The exact published output lives in git — auditable and diffable
- Portable output — the committed `dist/` can be served from any static host
- Instant — no CI queue between push and publish

**Cons**

- Generated files in git — history churn, noisy diffs, growing clone size
- Merge conflicts in generated code across parallel PRs
- Source/output drift — nothing enforces that committed `dist/` matches the
  source (mitigate with a CI check that rebuilds and diffs)
- Toolchain drift — requires pinned generator versions and committed
  lockfiles
- No automation — a human must remember to build, commit, and push
- No PR previews; requires branch discipline for the artifact branch

This pattern is orthogonal to the generator choice: it applies to any
generator that produces a `dist/` (options 3–6). It does not apply to plain
Markdown (no build) or Jekyll (GitHub builds it natively).

Repository layout is independent of the generator choice:

- `docs/` folder in the app repo (content colocated with code)
- Dedicated documentation repository
- Branch model: build from `main` vs. a `gh-pages` branch

## Options

### Option 1: Plain Markdown, no generator

Commit `.md` files and enable Pages on the branch/folder. GitHub renders the
Markdown with its built-in renderer; a hand-written index page links sections.

**Pros**

- Zero build, zero dependencies, zero CI
- Fastest possible setup (minutes)
- Nothing to maintain or upgrade
- Docs are fully readable inside the repo without the site

**Cons**

- No search
- No custom navigation, sidebar, or TOC (GitHub's default file listing or a
  manually maintained index)
- No theming, dark mode, or custom CSS/JS
- No doc versioning
- No Mermaid diagrams (GitHub Markdown does not render them)
- Does not scale well as content grows; index is hand-maintained

### Option 2: Jekyll (GitHub Pages native)

Jekyll is the default engine on GitHub Pages. Add `_config.yml`, layouts,
includes, and collections for design docs / SOPs / runbooks. GitHub builds it
on push — no Actions workflow needed.

**Pros**

- Native to GitHub Pages — no CI to maintain
- Collections map naturally onto the three content types
- Layouts/includes give consistent structure (e.g., a runbook template)
- Themes available; `jekyll-versioning` plugin is on the Pages allow-list

**Cons**

- Plugin allow-list on GitHub Pages (small set of approved plugins); no
  built-in search plugin — search requires client-side JS
- Ruby/Liquid learning curve; dated syntax
- Slow builds as the site grows (Jekyll is known to be slow on large sites)
- Docs-specific themes are less polished than dedicated docs tooling
- Search is a weak point

### Option 3: MkDocs (Material for MkDocs) + GitHub Actions

Python-based. `mkdocs.yml` config plus a `docs/` folder; the Material theme
provides the UI. `mkdocs build` runs in Actions; the output deploys to Pages.

**Pros**

- Material theme is best-in-class for docs: built-in full-text search, TOC,
  dark mode, tabs, admonitions, checklists — a strong fit for SOPs/runbooks
- Very simple YAML config; low learning curve
- Fast builds; no JS framework
- Navigation derived from folder structure (auto or explicit nav)
- Plugin ecosystem: versioning, redirects, Mermaid, etc.

**Cons**

- Requires Python in the build (handled by Actions)
- Not native to GitHub Pages — an Actions workflow must be maintained
- Theming is CSS variables (less flexible than a JS framework)
- Plain Markdown + extensions only; no MDX
- Site root is a `docs/` folder, separate from the repo root

### Option 4: Docusaurus (React) + GitHub Actions

Node/React-based. MDX content, sidebar configuration, `docusaurus build` in
Actions, output deployed to Pages.

**Pros**

- Feature-rich: built-in multi-version docs, i18n, MDX (interactive
  components inside docs), blog, search (Algolia DocSearch or local search
  plugin)
- Large ecosystem and community; purpose-built for product documentation
- Powerful plugin system

**Cons**

- Heaviest option: Node + React toolchain, slowest builds
- Largest configuration surface (sidebars, presets, plugins)
- Overkill for a small documentation set
- Versioning adds maintenance (each version is a build target)
- Algolia search requires an account; local search is an extra plugin

### Option 5: VitePress + GitHub Actions

Vue-based, Vite-powered. Markdown + MDX, `vitepress build` in Actions, output
deployed to Pages.

**Pros**

- Very fast dev server and builds (Vite)
- Lightweight, clean default theme with TOC, dark mode, and built-in local
  search
- Simple JS/TS configuration
- Middle ground between MkDocs (simplicity) and Docusaurus (features)

**Cons**

- Vue-centric; theme customization means writing Vue components
- No built-in versioning (community plugins only)
- Smaller docs-specific ecosystem than Docusaurus
- Requires a Node toolchain plus an Actions workflow

### Option 6: Astro (Starlight) + GitHub Actions

Astro is a web framework that ships zero JavaScript by default; Starlight is
its official documentation theme. Markdown/MDX content in a `docs/` folder,
`astro build` in Actions, output deployed to Pages.

**Pros**

- Fast: islands architecture means minimal JS on the page; quick builds and
  fast page loads
- Starlight is a polished, modern docs theme: built-in full-text search
  (Pagefind), TOC, dark mode, sidebar, breadcrumbs
- MDX support — interactive components (React, Vue, Svelte, etc.) can be
  embedded in docs
- Content collections with type-safe frontmatter
- Actively developed; can grow beyond docs (blog, landing pages) if needed

**Cons**

- Requires a Node toolchain plus an Actions workflow
- No built-in doc versioning (community approaches only)
- Newer ecosystem than Jekyll/Docusaurus; fewer docs-specific plugins
- Starlight is opinionated: fixed folder structure and frontmatter schema
- Theme customization means writing Astro components (more work than
  MkDocs CSS variables)

## Cross-Cutting Considerations (apply to all options)

- **Repo layout** — `docs/` in the app repo vs. a dedicated repo:
  colocating keeps docs next to the code they describe; a dedicated repo
  decouples the docs release cycle.
- **Preview environments** — Actions-based options can deploy PR previews to
  ephemeral Pages URLs; the native (Jekyll/plain Markdown) options cannot.
- **Security** — GitHub Pages content is public even when the source repo is
  private. Runbooks and SOPs must not contain secrets or internal-only
  details; redaction discipline is required.
- **Search** — built-in (MkDocs Material, VitePress, Astro/Starlight),
  plugin-based (Docusaurus local/Algolia), or absent (plain Markdown; Jekyll
  needs a JS workaround).
- **Doc versioning** — Jekyll versioning plugin, MkDocs versioning plugin,
  Docusaurus native; plain Markdown has none.
- **Custom domain** — supported by all options via `CNAME`.
- **Diagrams** — Mermaid support varies: plugins/integrations exist for
  MkDocs (`mkdocs-mermaid2-plugin`), Docusaurus (`@docusaurus/theme-mermaid`),
  VitePress (`vitepress-plugin-mermaid`), and Astro (`@astrojs/mermaid`);
  Jekyll's `jekyll-mermaid` works locally but is not on the GitHub Pages
  plugin allow-list; plain Markdown (GitHub's renderer) does not support it.

## Comparison Snapshot (factual, not a recommendation)

| | Build | CI required | Search | Versioning | Setup effort |
|---|---|---|---|---|---|
| Plain Markdown | none | no | no | no | minimal |
| Jekyll | GitHub-native | no | no (JS workaround) | plugin | low |
| MkDocs + Material | Python | Actions | built-in | plugin | low–medium |
| Docusaurus | Node/React | Actions | plugin / Algolia | built-in | medium–high |
| VitePress | Node/Vite | Actions | built-in | community plugin | low–medium |
| Astro (Starlight) | Node | Actions | built-in (Pagefind) | none (community) | low–medium |

## Next Step

Select one option (or a hybrid) and record the decision with rationale in a
follow-up ADR, then implement the chosen pipeline.
