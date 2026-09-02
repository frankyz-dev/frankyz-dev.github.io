# GitHub Pages mock server

A basic HTTP server that mimics how GitHub Pages would serve this project:
**one origin, everything under the `/github-pages-docs/` subpath** (this
project lives in the `github-pages-docs/` subfolder of the
`frankyz-dev.github.io` user site), with a landing page at the subpath root.

```
http://127.0.0.1:4100/                        → redirects to /github-pages-docs/
http://127.0.0.1:4100/github-pages-docs/      → landing page (links to all demos)
http://127.0.0.1:4100/github-pages-docs/astro/      → Astro + Starlight   (demos/astro/dist)
http://127.0.0.1:4100/github-pages-docs/docusaurus/ → Docusaurus          (demos/docusaurus/build)
http://127.0.0.1:4100/github-pages-docs/mkdocs/     → MkDocs Material     (demos/mkdocs/site)
http://127.0.0.1:4100/github-pages-docs/vitepress/  → VitePress           (demos/vitepress/docs/.vitepress/dist)
http://127.0.0.1:4100/github-pages-docs/plain-md/   → Plain Markdown      (demos/plain-md, .md rendered)
```

These local URLs match the production URLs on
`https://frankyz-dev.github.io/github-pages-docs/...` one-for-one.

## Run

```sh
cd server
npm install        # once (single dependency: marked)
npm start          # → http://127.0.0.1:4100/github-pages-docs/
```

`PORT=4200 node server.mjs` to use a different port.

## How it works

- `server.mjs` is a ~200-line zero-framework Node HTTP server (only
  `node:http` + `node:fs`), mapping each subpath to a demo's build output.
  It handles directory → `index.html`, VitePress-style `path.html` fallbacks,
  trailing-slash redirects, MIME types, and path-traversal protection.
- The landing page is the static `index.html` at the project root — the same
  file GitHub Pages serves at `/github-pages-docs/`.
- The SSG demos are built with base paths matching their subpaths — the same
  thing a GitHub Pages deployment under `/<repo>/<subfolder>/` requires:
  - `demos/astro/astro.config.mjs` → `base: '/github-pages-docs/astro/'`
  - `demos/docusaurus/docusaurus.config.js` → `baseUrl: '/github-pages-docs/docusaurus/'`
  - `demos/vitepress/docs/.vitepress/config.mts` → `base: '/github-pages-docs/vitepress/'`
  - MkDocs emits relative links and needs no base.
- `plain-md` has no build. `.md` files are rendered server-side with `marked`
  (GFM: tables, task lists) into a minimal GitHub-flavoured page, mimicking
  GitHub's built-in Markdown renderer. Append `?raw=1` to get the raw file.

## Rebuilding the demos after content changes

```sh
cd ../demos/astro      && npm run build
cd ../demos/docusaurus && npm run build
cd ../demos/vitepress  && npm run docs:build
cd ../demos/mkdocs     && .venv/bin/mkdocs build
```

No rebuild needed for `plain-md`. Commit the rebuilt output directories
(`dist/`, `build/`, `site/`) — GitHub Pages serves them as-is.
