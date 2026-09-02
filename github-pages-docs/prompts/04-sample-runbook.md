# Task: Sample runbook (Phase 1)

You are working in the `github-pages-docs` repo. Read `GOALS.md` and
`ACTION_PLAN.md` (§1.3) first. The images from task 01 exist in
`sample-content/images/`.

Create `sample-content/runbooks/high-error-rate.md` — a runbook for the
"high error rate" alert on the fictional "Acme Order Service".

Structure:

- **Alert description** — what fires, where it's seen
- **Severity** — SEV classification (table or short list)
- **Fast-path mitigation** — short, numbered, do-first steps
- **Diagnostics** — bash code blocks (curl checks, log queries, metrics
  queries)
- **Escalation** — who to page, plus a "when to escalate" callout

Feature hooks that must be present:

- Quick TOC at the top (plain Markdown anchor links)
- `../images/dashboard-mockup.png` embedded with a caption
- At least two bash code blocks
- A mermaid decision flowchart (diagnose → mitigate → escalate) as a fenced
  `mermaid` code block
- Escalation callout (blockquote)

Constraints:

- Portable Markdown only; fictional content
- Short and skimmable — runbooks are read during incidents. Keep it under
  ~150 lines.

Done when: the file exists, is valid Markdown, the image is embedded, and
the TOC, code blocks, and callout are present.
