# Task: Sample design doc (Phase 1)

You are working in the `github-pages-docs` repo. Read `GOALS.md` and
`ACTION_PLAN.md` (§1.1) first. The images from task 01 exist in
`sample-content/images/`.

Create `sample-content/design/architecture.md` — a design doc for the
fictional "Acme Order Service".

Sections:

1. **Overview** — what the service does, 2–3 paragraphs
2. **System architecture** — embed `../images/architecture.svg`; describe
   each component
3. **Data flow** — the order lifecycle; include a "Deployment" subsection
   embedding `../images/deploy-flow.svg`
4. **Design decisions** — 2–3 ADR-style entries (context, decision,
   consequences)
5. **Trade-offs** — table or bullets
6. **Footnotes** — at least two

Feature hooks that must be present:

- A YAML config code block (e.g., service configuration) with syntax
  highlighting
- A component inventory table (component, technology, responsibility)
- A mermaid sequence diagram of the order lifecycle (fenced `mermaid` code
  block)
- Footnotes
- Both images referenced with relative paths

Constraints:

- Portable Markdown only — no framework-specific syntax (no MDX, no
  admonition extensions). Fenced `mermaid` code blocks are allowed: they are
  portable text, and each framework either renders them or displays them as
  code.
- Fictional content; no real hosts, credentials, or secrets
- ~150–300 lines

Done when: the file exists, is valid Markdown, both images are referenced
and exist, and all feature hooks are present.
