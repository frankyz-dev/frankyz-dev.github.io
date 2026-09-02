# Task: Demo — Option 6, Astro Starlight (Phase 2)

You are working in the `github-pages-docs` repo. Read `DESIGN.md` (Option 6)
and `ACTION_PLAN.md` (§2.6) first. `sample-content/` exists (tasks 01–04
done).

Create `demos/astro/`:

- Scaffold with `npm create astro@latest -- --template starlight`
- Configure Starlight: sidebar sections for Design, SOPs, Runbooks
- Copy the sample content into Starlight's `docs/` structure; fix image
  paths (public dir)
- Typed frontmatter via content collections (e.g., `lastUpdated` on SOPs,
  `severity` on the runbook)
- Mermaid integration (`@astrojs/mermaid`)
- One MDX page with an interactive component (React/Vue/Svelte island)
- Pagefind search (built-in)
- Dark mode (on by default)
- Serve on port **4106**

Done when: `npm run dev` runs from `demos/astro/`, all three content types
plus images render at `localhost:4106`, search works, the MDX island is
interactive, the frontmatter types are enforced, and the mermaid diagrams
render.
