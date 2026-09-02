# VitePress Demo (Option 5)

Local demo of **Option 5 — VitePress (Vue/Vite)** from `DESIGN.md` /
`ACTION_PLAN.md` §2.5. Serves the shared sample content (design doc, SOPs,
runbook) with VitePress features showcased.

VitePress 1.6.4, Vue 3.

## Setup

```bash
npm install
```

## Serve (dev server, port 4105)

```bash
npm run docs:dev          # vitepress dev docs --port 4105
```

## Build (production, SSR)

```bash
npm run docs:build        # output in docs/.vitepress/dist
npm run docs:preview      # serve the build on port 4105
```

Note: the dev server is client-rendered (SPA shell); verify rendered
features against the production build or in a browser.

## Content layout

- `docs/design/architecture.md` — design doc (with interactive Vue component)
- `docs/sops/` — deploy-release, rotate-credentials
- `docs/runbooks/` — high-error-rate
- `docs/public/` — images, referenced as `/...` absolute paths
- `docs/.vitepress/config.mts` — nav, sidebar, local search, dark default, mermaid plugin
- `docs/.vitepress/theme/` — custom theme extending the default theme:
  - `components/OrderStateStepper.vue` — interactive order-state stepper
  - `index.ts` — registers the component globally for use in `.md` pages

## Features demoed

| Feature | How | Verified |
|---|---|---|
| Nav + sidebar | `themeConfig.nav` / `themeConfig.sidebar` grouped Design / SOPs / Runbooks | ✅ |
| Built-in local search | `search: { provider: 'local' }` | ✅ search box present; index chunk (`@localSearchIndexroot.*.js`) contains "rollback" |
| Mermaid rendering | `vitepress-plugin-mermaid` (`withMermaid` wrapper) renders fenced ```mermaid blocks | ✅ sequence/flowchart SVGs render in browser (client-side) |
| Custom containers | `::: warning` / `::: danger` blocks in the SOPs and runbook (converted from portable blockquotes in the demo copy) | ✅ `custom-block` markup in build |
| Interactive Vue component | `OrderStateStepper.vue` registered globally, embedded in the design doc | ✅ renders in browser, buttons work |
| Dark mode (default) | `appearance: 'dark'` | ✅ `<html class="dark">` by default, toggle available |
| Fast dev server / HMR | Vite-powered | ✅ (dev server starts in seconds) |

## Gotchas / notes

- The dev server serves a client-rendered shell (no SSR content in the
  initial HTML); use the production build (`docs:build`) for SSR output or
  verify in a browser.
- Mermaid renders client-side: the SSR HTML contains the
  `<div class="mermaid">` container, the SVG appears after hydration.
- Image paths: VitePress serves `docs/public/` at the site root, so image
  references use absolute paths (`/architecture.svg`), not relative ones.
