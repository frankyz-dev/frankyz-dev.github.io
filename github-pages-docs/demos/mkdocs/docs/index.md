# Acme Docs — MkDocs Material Demo

This is **Option 3** from the GitHub Pages documentation comparison
(see `DESIGN.md` in the repo): **MkDocs with the Material theme**,
serving the shared sample content (`sample-content/`) locally on port
**4103**.

It demonstrates how well the three content types — **design docs**, **SOPs**,
and **runbooks** — fit the Material theme, and showcases a few of its
built-in features.

## Browse the sample content

| Content type | Page | What it shows |
| ------------ | ---- | ------------- |
| Design doc (v2, current) | [Architecture](design/architecture.md) | Long-form doc, SVG diagrams, a Mermaid sequence diagram, config code blocks, ADRs, footnotes |
| Design doc (v1) | [Architecture (previous)](design/architecture-v1.md) | An earlier revision — see [Versioning](#versioning) |
| SOP | [Deploy a Release](sops/deploy-release.md) | Numbered steps, **tabs** (Kubernetes vs. Docker), **checklists**, a **danger** callout |
| SOP | [Rotate Gateway DB Credentials](sops/rotate-credentials.md) | Pre-flight checklist, a Mermaid decision flowchart, a **warning** callout |
| Runbook | [High Error Rate](runbooks/high-error-rate.md) | Quick TOC, severity table, diagnostic code blocks, a Mermaid flowchart, an escalation callout |

## Features demoed in this demo

- **Full-text search** — Material built-in. Press <kbd>/</kbd> or use the
  search box in the top bar; it finds e.g. "rollback" across all pages.
- **Dark mode** — the toggle in the top-right switches light/dark (two
  palettes are configured).
- **Tabs** — the deploy SOP shows the Kubernetes and Docker variants as
  switchable tabs (`pymdownx.tabbed`).
- **Admonitions** — the SOPs and runbook use `!!! warning` / `!!! danger` /
  `!!! note` callouts for destructive steps and escalation criteria.
- **Checklists** — the SOP verification steps use Markdown task lists
  (`- [ ]`), rendered as interactive checkboxes (`pymdownx.tasklist`).
- **Mermaid diagrams** — fenced ` ```mermaid ` blocks are rendered to
  diagrams by `mkdocs-mermaid2-plugin` (a sequence diagram in the design doc,
  a flowchart in each SOP/runbook).
- **Versioning** — two revisions of the design doc are exposed (see below).
- **TOC, syntax highlighting, code copy buttons, footnotes, tables** — all
  Material built-ins.

## Versioning

Two revisions of the design doc are exposed in the sidebar:
**Design (v2 — current)** and **Design (v1)**. Each design page carries a
version-switcher callout at the top so you can jump between revisions.

> **Note on the mechanism.** A dedicated versioning plugin such as
> `mkdocs-versioning` is the production approach: it is a **build-time**
> plugin that builds each version into `site/<version>/` and generates a
> version-selection page, but it is a **no-op during `mkdocs serve`**.
> So for this *served* demo the two versions are exposed with the
> documented fallback — two nav entries plus a version switcher on each
> page. See the demo's `README.md` (next to this `docs/` directory) for
> the full versioning explanation.
