# Acme Order Service — Docs

VitePress demo for the docs-site comparison project. Three content types,
one fictional service:

- **Design** — the architecture document: components, order lifecycle
  (with a Mermaid sequence diagram), deployment pipeline, and ADRs.
  Includes an interactive Vue component (order state stepper).
- **SOPs** — standard operating procedures: deploying a release and
  rotating the API gateway's database credentials.
- **Runbooks** — the high-error-rate incident runbook with a Mermaid
  decision flowchart.

## Content types

| Type | Page |
| ---- | ---- |
| Design | [Architecture](/design/architecture) |
| SOP | [Deploy a Release](/sops/deploy-release) |
| SOP | [Rotate Gateway DB Credentials](/sops/rotate-credentials) |
| Runbook | [High Error Rate](/runbooks/high-error-rate) |

## Demo features

- Built-in local search (press `/` or use the search box)
- Dark mode on by default (toggle in the top right)
- Mermaid diagrams rendered by `vitepress-plugin-mermaid`
- Custom containers (`::: warning`, `::: danger`) in the SOPs and runbook
- Interactive Vue component embedded in the design doc
- Fast Vite-powered dev server with HMR
