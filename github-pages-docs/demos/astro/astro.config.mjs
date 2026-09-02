// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { satteri } from '@astrojs/markdown-satteri';

// https://astro.build/config
export default defineConfig({
	site: 'https://frankyz-dev.github.io/github-pages-docs/astro/',
	// Served under /github-pages-docs/astro/ on GitHub Pages (this repo is a
	// user site, project lives in the github-pages-docs/ subfolder). The local
	// mock server (server/server.mjs) mirrors the same layout.
	base: '/github-pages-docs/astro/',
	markdown: {
		// astro-mermaid emits raw HTML nodes for ```mermaid blocks; the
		// Sätteri MDX compiler needs rawHtml enabled to compile them in .mdx.
		processor: satteri({ features: { rawHtml: true } }),
	},
	integrations: [
		// astro-mermaid must be registered BEFORE starlight so its
		// markdown plugin runs ahead of Starlight's processing.
		mermaid({ autoTheme: true }),
		// starlight() before mdx(): Starlight injects astro-expressive-code
		// at its own position, and expressive-code must run before mdx()
		// for code blocks on MDX pages.
		starlight({
			title: 'Acme Order Service Docs',
			// Starlight >= 0.39 removed the `defaultTheme` option: pages now
			// always start dark (no FOUC) and then follow the OS preference
			// unless the user has a stored choice. To keep "dark on by
			// default" we seed the stored preference with 'dark' on first
			// visit (runs before Starlight's ThemeProvider script).
			head: [
				{
					tag: 'script',
					attrs: { 'is:inline': '' },
					content: `(function () {
						try {
							if (localStorage.getItem('starlight-theme') === null) {
								localStorage.setItem('starlight-theme', 'dark');
							}
						} catch (e) {}
					})();`,
				},
			],
			sidebar: [
				// Nesting note: Starlight sidebar entries are either links or groups
				// (a link cannot carry items), so to nest the POC Subpage under the
				// Architecture page, architecture lives in a directory
				// (design/architecture/index.mdx) with the subpage beside it.
				// Autogenerate renders the directory's index page as a link with the
				// sibling pages nested beneath it.
				{ label: 'Design', items: [{ autogenerate: { directory: 'design' } }] },
				{ label: 'SOPs', items: [{ autogenerate: { directory: 'sops' } }] },
				{ label: 'Runbooks', items: [{ autogenerate: { directory: 'runbooks' } }] },
			],
		}),
		mdx(),
		react(),
	],
});
