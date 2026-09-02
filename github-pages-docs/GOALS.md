# Project Goals

## Goal

Host an application documentation website on **GitHub Pages**. The site is the
canonical home for app documentation, covering three content types:

- **Design docs** — architecture, design decisions, technical specifications
- **SOPs** — Standard Operating Procedures for recurring operational tasks
- **Runbooks** — incident response and operational playbooks

## Why GitHub Pages

- Free static hosting tied directly to the repository
- Documentation lives in git alongside the app: versioned, reviewable via
  pull requests, fully auditable history
- No servers to operate or maintain

## Success Criteria

- Content is authored in Markdown and stored in the repository
- The site is reachable at a stable URL
- All changes land through pull requests with review
- The site is easy to navigate (sidebar / table of contents) and searchable
- Low ongoing maintenance overhead

## Open Questions (addressed in DESIGN.md)

- Which static site generator to use (or none at all)
- Repository layout: `docs/` folder in the app repo vs. a dedicated docs repo
- Search, doc versioning, and theming
- Preview environments for pull requests
