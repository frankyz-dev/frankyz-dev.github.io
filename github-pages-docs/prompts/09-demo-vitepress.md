# Task: Demo — Option 5, VitePress (Phase 2)

You are working in the `github-pages-docs` repo. Read `DESIGN.md` (Option 5)
and `ACTION_PLAN.md` (§2.5) first. `sample-content/` exists (tasks 01–04
done).

Create `demos/vitepress/`:

- Scaffold with the VitePress template
- Configure nav/sidebar for Design, SOPs, Runbooks
- Copy the sample content into the content dir (e.g., `src/content`); fix
  image paths (public dir)
- Enable the built-in local search
- Mermaid plugin (`vitepress-plugin-mermaid`)
- Custom containers (warning/danger) in the SOPs and runbook
- One MDX page with an interactive Vue component
- Dark mode (on by default)
- Serve on port **4105**

Done when: `npm run docs:dev` runs from `demos/vitepress/`, all three
content types plus images render at `localhost:4105`, search works, the
custom containers render, the mermaid diagrams render, and HMR is instant.
