# Task: Sample SOPs (Phase 1)

You are working in the `github-pages-docs` repo. Read `GOALS.md` and
`ACTION_PLAN.md` (§1.2) first. The images from task 01 exist in
`sample-content/images/`.

Create two SOPs for the fictional "Acme Order Service":

1. `sample-content/sops/rotate-credentials.md` — rotating the API gateway's
   database credentials.
2. `sample-content/sops/deploy-release.md` — deploying a release.

Each SOP's structure:

- Purpose
- Scope
- Prerequisites
- Numbered steps (clear, imperative)
- Verification
- Rollback

Feature hooks:

- `rotate-credentials.md`: embed `../images/console-mockup.png` with a
  caption; a task-list checklist for pre-flight; a warning callout
  (blockquote) on the destructive step; a mermaid flowchart of the rotation
  decision path (fenced `mermaid` code block)
- `deploy-release.md`: k8s and docker variants as two subsections (demos may
  later convert these to tabs); a post-deploy verification checklist; an
  "abort criteria" callout (blockquote)

Constraints:

- Portable Markdown only — task lists (`- [ ]`), blockquote callouts
  (`> **Warning:** ...`), relative image paths. No framework-specific
  syntax.
- Fictional content; no real credentials, hosts, or secrets

Done when: both files exist, are valid Markdown, the image is embedded with
a caption, and checklists plus callouts are present in both.
