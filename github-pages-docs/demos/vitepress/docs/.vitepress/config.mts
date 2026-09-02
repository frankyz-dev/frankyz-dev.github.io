import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/config
export default withMermaid({
  title: 'Acme Order Service — Docs',
  description:
    'VitePress demo for the docs-site comparison project: design doc, SOPs, and runbooks for the Acme Order Service.',
  lang: 'en-US',

  // Dark mode on by default (user can still toggle to light)
  appearance: 'dark',

  // Served under /github-pages-docs/vitepress/ on GitHub Pages (user site,
  // project lives in the github-pages-docs/ subfolder). The local mock server
  // (server/server.mjs) mirrors the same layout.
  base: '/github-pages-docs/vitepress/',

  head: [
    // Absolute (base-aware) path — a bare '/architecture.svg' would resolve
    // against the site root and 404 under any subpath deployment.
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/github-pages-docs/vitepress/architecture.svg' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Design', link: '/design/architecture' },
      { text: 'SOPs', link: '/sops/deploy-release' },
      { text: 'Runbooks', link: '/runbooks/high-error-rate' }
    ],

    sidebar: [
      {
        text: 'Design',
        items: [
          {
            text: 'Architecture',
            link: '/design/architecture',
            // POC: subpage nested under the Architecture entry
            items: [{ text: 'POC Subpage', link: '/design/poc-subpage' }]
          }
        ]
      },
      {
        text: 'SOPs',
        items: [
          { text: 'Deploy a Release', link: '/sops/deploy-release' },
          {
            text: 'Rotate Gateway DB Credentials',
            link: '/sops/rotate-credentials'
          }
        ]
      },
      {
        text: 'Runbooks',
        items: [{ text: 'High Error Rate', link: '/runbooks/high-error-rate' }]
      }
    ],

    search: {
      provider: 'local'
    },

    outline: { label: 'On this page' },
    docFooter: { prev: 'Previous page', next: 'Next page' },
    lastUpdated: true,
    footer: {
      message: 'VitePress demo — docs-site comparison project',
      copyright: 'Acme (fictional)'
    }
  }
})
