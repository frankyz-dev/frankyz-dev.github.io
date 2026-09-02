# GitHub Pages Docs — Demo Comparison

Five ways to host documentation on GitHub Pages, each rendering the **same
sample content** (design doc, SOPs, and runbooks for the fictional Acme Order
Service) so the team can compare them side by side and pick one:

| # | Option | Demo | Highlights |
| - | ------ | ---- | ---------- |
| 1 | Plain Markdown | [`plain-md/`](plain-md/) | No tooling — GitHub's built-in renderer |
| 2 | MkDocs Material | [`mkdocs/`](mkdocs/) | Python, Material theme, search, mermaid |
| 3 | Docusaurus | [`docusaurus/`](docusaurus/) | React, versioning, local search, mermaid |
| 4 | VitePress | [`vitepress/`](vitepress/) | Vue/Vite, local search, mermaid plugin |
| 5 | Astro + Starlight | [`astro/`](astro/) | Astro SSG, Pagefind search, MDX, mermaid |

## Live

- **Landing page:** <https://frankyz-dev.github.io/github-pages-docs/>
- Astro: <https://frankyz-dev.github.io/github-pages-docs/astro/>
- Docusaurus: <https://frankyz-dev.github.io/github-pages-docs/docusaurus/>
- MkDocs: <https://frankyz-dev.github.io/github-pages-docs/mkdocs/>
- VitePress: <https://frankyz-dev.github.io/github-pages-docs/vitepress/>
- Plain Markdown: <https://frankyz-dev.github.io/github-pages-docs/plain-md/>

## Layout

```
index.html          landing page (served at /github-pages-docs/ on GitHub Pages)
astro/              Astro + Starlight — built site (GitHub Pages serves this)
docusaurus/         Docusaurus — built site
mkdocs/             MkDocs Material — built site
vitepress/          VitePress — built site
plain-md/           raw Markdown, no build (GitHub serves .md as text/markdown)
demos/              the SSG source projects (rebuildable):
  astro/            (build output: dist/)
  docusaurus/       (build output: build/)
  mkdocs/           (build output: site/)
  vitepress/        (build output: docs/.vitepress/dist/)
sample-content/     the shared source content (originals)
server/             local mock server — mirrors the GitHub Pages layout
scripts/            sync-builds.sh (copies build output to the top level)
prompts/            the prompts used to build each demo
DEMO_NOTES.md       observations, benchmarks, and gotchas per option
DESIGN.md           project design notes
```

GitHub Pages maps URLs directly to file paths, so the **built** sites live at
the project root (`astro/`, `docusaurus/`, …) while the **source** projects
live under `demos/`. After rebuilding a demo, run `scripts/sync-builds.sh` to
refresh the top-level deployed copies.

The SSG demos are **built with base paths matching their subpaths**
(`/github-pages-docs/astro/`, `/github-pages-docs/docusaurus/`,
`/github-pages-docs/vitepress/`) so the committed build output works as-is on
GitHub Pages. MkDocs emits relative links and needs no base.

## Local preview (optional)

```sh
cd server
npm install
npm start    # → http://127.0.0.1:4100/github-pages-docs/
```

The mock server serves the committed build output under the same
`/github-pages-docs/...` subpaths as production, so local URLs match
production URLs one-for-one.

## Rebuilding after content changes

```sh
cd demos/astro      && npm install && npm run build
cd demos/docusaurus && npm install && npm run build
cd demos/vitepress  && npm install && npm run docs:build
cd demos/mkdocs     && uv venv .venv && uv pip install -p .venv/bin/python mkdocs-material mkdocs-mermaid2-plugin && .venv/bin/mkdocs build

# then refresh the deployed copies at the project root:
cd ../.. && scripts/sync-builds.sh
```

Then commit the refreshed top-level directories — GitHub Pages serves them
as-is.
