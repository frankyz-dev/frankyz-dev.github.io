# Demo: Option 1 — Plain Markdown (no generator)

This demo is the content itself. There is no build step, no config file, no
theme, and no tooling — just the Markdown files from `sample-content/`
copied verbatim into this folder.

On GitHub Pages, you would simply enable Pages for this folder (or the repo
root) and GitHub's built-in Markdown renderer would render the `.md` files
as HTML pages, with a default file listing per directory. No CI, no
dependencies, nothing to maintain or upgrade.

## What's here

- `design/architecture.md` — sample design doc (with a fenced `mermaid`
  sequence diagram and two SVG images)
- `sops/rotate-credentials.md`, `sops/deploy-release.md` — sample SOPs
  (checklists, callouts, a `mermaid` flowchart, a PNG image)
- `runbooks/high-error-rate.md` — sample runbook (a `mermaid` decision
  flowchart, a PNG image)
- `images/` — the diagrams and mock screenshots referenced by the docs,
  including the extra `.svg` sources for the two PNG mockups

## Viewing locally

There is nothing to build or serve — the files are read raw:

- Open any `.md` file in an editor or GitHub's in-repo preview, or
- Optionally serve the folder as static files to see the raw-files
  experience:

  ```sh
  cd plain-md
  python3 -m http.server 4101
  ```

  You'll get a plain directory listing and the raw `.md` / image files,
  with no rendering.

- Or view it via the GitHub Pages mock server: `cd server && npm start`,
  then open `http://127.0.0.1:4100/github-pages-docs/plain-md/`. The mock
  renders `.md` files like GitHub's built-in renderer would (production
  GitHub Pages serves them as raw `text/markdown`).

`index.html` is a directory index (GitHub Pages doesn't auto-serve
`README.md` as a folder index).

## What this option lacks

- **No navigation** — no sidebar, no table of contents, no breadcrumbs.
  Only GitHub's default per-directory file listing, or a manually
  maintained index page.
- **No search** — no full-text search of any kind.
- **No theming** — no dark mode, no custom CSS/JS; GitHub's default
  rendering only.
- **No rendered images in raw view** — locally (or when served as raw
  files) the image references are just links in the source; they render
  only in GitHub's rendered view.
- **No Mermaid rendering** — the fenced `mermaid` blocks in the design
  doc, SOP, and runbook display as raw code, not diagrams. GitHub's
  Markdown renderer does not support Mermaid.
- **No doc versioning** — no way to serve multiple versions of the docs.

This is the zero-config baseline: fastest possible setup, nothing to
maintain — at the cost of everything above.
