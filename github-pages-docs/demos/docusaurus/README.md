# Docusaurus Demo (Option 4)

Local demo of **Option 4 — Docusaurus (React)** from `DESIGN.md` /
`ACTION_PLAN.md` §2.4. Serves the shared sample content (design doc, SOPs,
runbook) with Docusaurus features showcased.

Docusaurus 3.10.2, classic template.

## Setup

```bash
npm install
```

## Serve (dev server, port 4104)

```bash
npm run start -- --port 4104 --host 127.0.0.1
```

## Build (production, SSR)

```bash
npm run build        # output in build/
npx docusaurus serve --port 4104 --host 127.0.0.1   # serve the build
```

Note: the dev server is client-rendered (React shell); verify rendered
features against the production build (`npm run build` + `docusaurus serve`)
or in a browser.

## Content layout

- `docs/design/` — design doc (v2, current)
- `docs/sops/` — deploy-release, rotate-credentials
- `docs/runbooks/` — high-error-rate
- `versioned_docs/version-1.0.0/` — v1 snapshot (older synchronous design)
- `static/img/` — images, referenced as `/img/...`
- `src/components/OrderStateStepper.jsx` — interactive MDX component

## Versioning workflow

Built-in versioned docs:

1. `npx docusaurus docs:version 1.0.0` snapshots the current `docs/` tree
   into `versioned_docs/version-1.0.0/` (plus a versioned sidebar).
2. The current `docs/` tree stays as the "current" (v2) version.
3. The navbar version switcher lists both versions.

In this demo, v1 is a deliberately older revision of the design doc
(synchronous-only architecture, before the async worker path).

## Features demoed

| Feature | How | Verified |
|---|---|---|
| Sidebar categories | `docs/{design,sops,runbooks}/_category_.json` (Design / SOPs / Runbooks) | ✅ |
| MDX interactive component | `OrderStateStepper` (order-state stepper with Next/Reset buttons) embedded in the design doc | ✅ renders in browser, buttons work |
| Versioned docs v1/v2 | `docs:version 1.0.0`; navbar switcher | ✅ both versions render, v1 has its own content + mermaid |
| Local search | `@easyops-cn/docusaurus-search-local` plugin | ✅ search index built, contains "rollback" |
| Mermaid rendering | `@docusaurus/theme-mermaid` + **`markdown: { mermaid: true }`** in `docusaurus.config.js` | ✅ sequence/flowchart diagrams render as SVG in browser (client-side) |
| Code-block line highlighting | `[[2,5]]` syntax on a bash block in the runbook | ✅ `theme-code-block-highlighted-line` spans in build |
| Dark mode | classic theme default (navbar toggle, `prefers-color-scheme` aware) | ✅ |

### Gotcha: mermaid requires `markdown.mermaid: true`

Without the top-level `markdown: { mermaid: true }` config option,
```mermaid fenced blocks are **silently dropped** from the output (no error,
no raw code shown). With it, the MDX loader converts the fences to
`<mermaid>` elements, which `@docusaurus/theme-mermaid` renders
client-side. Rendering is client-side, so the SSR HTML does not contain the
diagram SVG — verify in a browser or in the JS bundle.

### Gotcha: stale bundler cache

The webpack filesystem cache (`node_modules/.cache/`) can serve stale MDX
compilations after config changes. If a config change (like the mermaid
flag above) has no effect, delete `node_modules/.cache` and rebuild.
