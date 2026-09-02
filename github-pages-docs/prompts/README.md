# Starter Prompts

One self-contained prompt per task from [ACTION_PLAN.md](../ACTION_PLAN.md).
Paste each into a fresh coding-agent session started at the repo root
(pi, Claude Code, or similar).

## Order

| # | Prompt | Task | Depends on |
|---|--------|------|-----------|
| 01 | `01-sample-images.md` | 4 images in `sample-content/images/` | — |
| 02 | `02-sample-design-doc.md` | `design/architecture.md` | 01 |
| 03 | `03-sample-sops.md` | two SOPs | 01 |
| 04 | `04-sample-runbook.md` | one runbook | 01 |
| 05 | `05-demo-plain-md.md` | Option 1 demo | 01–04 |
| 06 | `06-demo-jekyll.md` | Option 2 demo | 01–04 |
| 07 | `07-demo-mkdocs.md` | Option 3 demo | 01–04 |
| 08 | `08-demo-docusaurus.md` | Option 4 demo | 01–04 |
| 09 | `09-demo-vitepress.md` | Option 5 demo | 01–04 |
| 10 | `10-demo-astro.md` | Option 6 demo | 01–04 |
| 11 | `11-demo-notes.md` | `DEMO_NOTES.md` comparison | 05–10 |

- Phase 1 (01–04) must complete before any demo.
- Demos (05–10) are independent of each other — they can run in parallel
  sessions.
- 11 runs last.

## Conventions baked into the prompts

- All sample content is fictional (the imaginary "Acme Order Service"); no
  real secrets, hosts, or credentials.
- Sample content uses **portable Markdown** (task lists, blockquote callouts,
  relative image paths) so all six demos can render it; each demo may add
  framework-specific sugar (tabs, MDX) on top.
- Sample content includes **mermaid diagrams** as fenced code blocks. Rendering
  depends on the framework: plugins/integrations for MkDocs, Docusaurus,
  VitePress, and Astro; a local-only plugin for Jekyll; raw code for plain
  Markdown.
- Each demo serves on a fixed port (4101–4106) so Phase 3 can compare them
  side by side.
