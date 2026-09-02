// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Acme Docs — Docusaurus Demo',
  tagline: 'Order service design docs, SOPs, and runbooks',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://acme.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // Served under /github-pages-docs/docusaurus/ on GitHub Pages (user site,
  // project lives in the github-pages-docs/ subfolder). The local mock server
  // (server/server.mjs) mirrors the same layout.
  baseUrl: '/github-pages-docs/docusaurus/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'acme',
  projectName: 'docs',

  onBrokenLinks: 'throw',

  // Render ```mermaid fenced code blocks via @docusaurus/theme-mermaid
  // (without this, mermaid fences are silently dropped from the output).
  markdown: {
    mermaid: true,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/acme/docs/tree/main/demos/docusaurus/docs/',
          // Versioning: serve the current (v2) docs at /docs and the
          // archived 1.0.0 snapshot at /docs/version-1.0.0. Without
          // lastVersion, Docusaurus treats the newest entry in
          // versions.json as the default version and puts "current" at
          // /docs/next.
          lastVersion: 'current',
          versions: {
            current: {
              label: 'current',
            },
            '1.0.0': {
              label: 'version-1.0.0',
              path: 'version-1.0.0',
            },
          },
        },
        // The template blog is not part of this demo.
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // Mermaid diagram support (```mermaid code fences render as diagrams).
  themes: ['@docusaurus/theme-mermaid'],

  // Convert ```mermaid code fences into <mermaid> elements rendered by
  // @docusaurus/theme-mermaid (client-side SVG).
  markdown: {
    mermaid: true,
  },

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        indexDocs: true,
        indexBlog: false,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Acme Docs',
        logo: {
          alt: 'Acme Docs Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            href: 'https://docusaurus.io',
            label: 'Docusaurus',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Design',
                to: '/docs/design/architecture',
              },
              {
                label: 'SOPs',
                to: '/docs/sops/deploy-release',
              },
              {
                label: 'Runbooks',
                to: '/docs/runbooks/high-error-rate',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Docusaurus',
                href: 'https://docusaurus.io',
              },
              {
                label: 'Docs versioning',
                href: 'https://docusaurus.io/docs/versioning',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Acme. Demo site built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
