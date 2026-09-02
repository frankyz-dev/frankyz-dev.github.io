# Demo: Option 3 — MkDocs + Material for MkDocs

Local demo of **Option 3** from the GitHub Pages documentation comparison:
[MkDocs](https://www.mkdocs.org/) with the
[Material](https://squidfunk.github.io/mkdocs-material/) theme, serving the
shared sample content (`sample-content/`) on port **4103**.

The sample content lives in `docs/` (a copy of `sample-content/`, converted
to showcase Material features — the original `sample-content/` is untouched).

## Setup

Requires [uv](https://docs.astral.sh/uv/). From this directory:

```sh
uv venv .venv
uv pip install -p .venv/bin/python mkdocs-material mkdocs-mermaid2-plugin
```

(`mkdocs` itself is pulled in as a dependency of `mkdocs-material`.)

## Serve (dev, live reload)

```sh
cd demos/mkdocs
.venv/bin/mkdocs serve -a 127.0.0.1:4103
```

Then open http://127.0.0.1:4103/.

## Build (static site)

```sh
cd demos/mkdocs
.venv/bin/mkdocs build
```

Writes the static site to `site/` — deployable to GitHub Pages (or any
static host) as-is.

## Features demoed

| Feature | Where to see it | Provided by |
| ------- | --------------- | ----------- |
| Full-text search | Search box in the top bar (finds e.g. "rollback") | MkDocs built-in `search` plugin (client-side index at `/search/search_index.json`) |
| Dark mode toggle | Top-right toggle; two palettes (light `default` + dark `slate`) | Material theme (`theme.palette` in `mkdocs.yml`) |
| Tabs | Deploy SOP — Kubernetes vs. Docker variants | `pymdownx.tabbed` extension (bundled with Material) |
| Admonitions | `!!! danger` abort criteria (deploy SOP), `!!! warning` destructive step (rotate SOP), `!!! danger` escalation (runbook), `!!! note` version banner (design doc) | `admonition` extension (Python-Markdown core) |
| Checklists | Verification / pre-flight steps in both SOPs | `pymdownx.tasklist` extension |
| Mermaid diagrams | Sequence diagram (design doc), decision flowcharts (rotate SOP, runbook) | `mkdocs-mermaid2-plugin` (third-party) + `pymdownx.superfences` custom fence |
| Syntax highlighting + copy button | All code blocks | `pymdownx.highlight` + Material `content.code.copy` feature |
| TOC with permalinks, floating TOC | Right-hand column on every page | `toc` extension + Material `toc.follow` feature |
| Sidebar navigation (sections, prev/next, back-to-top) | Whole site | Material `navigation.*` features |
| Tables, footnotes | Runbook severity table; design doc footnotes | Material theme (core Markdown) |
| Versioning (two revisions of the design doc) | "Design (v2 — current)" / "Design (v1)" nav entries | Two nav entries — see below |

## Versioning

Two revisions of the design doc are exposed in the sidebar:
**Design (v2 — current)** (`docs/design/architecture.md`) and
**Design (v1)** (`docs/design/architecture-v1.md`). Each page carries a
version banner at the top with a link to the other revision.

**Why two nav entries instead of a versioning plugin?** A dedicated
versioning plugin is the production approach. The two candidates:

- [`mkdocs-versioning`](https://github.com/zayd62/mkdocs-versioning)
  (PyPI: `mkdocs-versioning`) — a **build-time** plugin: it builds each
  version into `site/<version>/` and generates a version-selection page.
  Its source explicitly skips both of those steps during `mkdocs serve`
  ("mkdocs is serving not building so there is no need to build the
  version page"), so it is a **no-op in serve mode** and cannot power this
  *served* demo. Note the project is **archived** (last release 2021).
- [`mike`](https://github.com/jimporter/mike) — the versioning tool
  [recommended by Material's own docs](https://squidfunk.github.io/mkdocs-material/setup/setting-up-versioning).
  It is a Git-based CLI wrapper around `mkdocs build` (each version is
  built and deployed as a subdirectory of `site_url`), so it is likewise
  a build/deploy-time mechanism, not a serve-time one.

Two nav entries (plus the per-page version banner) are therefore the
documented fallback for serve mode. For a real multi-version site you
would use `mike` (or a versioning plugin), run `mkdocs build`, and deploy
the `site/` directory.

## Gotchas found while building this demo

- **Admonitions cannot be nested inside list items.** Python-Markdown's
  `admonition` extension only matches `!!!` at the start of a line, so an
  indented `!!! warning` inside a numbered-list item renders as literal
  text. The rotate-credentials SOP's warning callout is therefore placed
  directly after the procedure list (with an explicit "step 7" reference)
  instead of inside step 7.
- **Splitting a numbered list around an admonition resets its numbering.**
  Python-Markdown does not emit `start="N"` on continued ordered lists
  (`LAZY_OL` defaults to `True`), so the warning was moved after the list
  rather than between steps 7 and 8.
- **`mkdocs serve` warns about links to files outside `docs/`** (e.g.
  `DESIGN.md` in the repo root). The demo's `index.md` references those as
  plain text instead of links to keep the build warning-free.
