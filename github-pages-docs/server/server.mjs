// Basic HTTP server that mimics GitHub Pages for the docs demos.
//
// On GitHub Pages this project lives in the github-pages-docs/ subfolder of
// the frankyz-dev.github.io user site, so the production layout is one
// origin with everything under /github-pages-docs/. This server mirrors that
// exactly: a landing page at /github-pages-docs/ and each demo under its own
// subpath. The SSG demos are built with matching base paths (astro: base
// '/github-pages-docs/astro/', docusaurus: baseUrl
// '/github-pages-docs/docusaurus/', vitepress: base
// '/github-pages-docs/vitepress/'); mkdocs emits relative links and needs no
// base.
//
// Usage: npm start  (or: node server.mjs)   →  http://127.0.0.1:4100/github-pages-docs/
// PORT=4200 node server.mjs to override the port.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 4100);
const HOST = process.env.HOST || '127.0.0.1';

// Production prefix: GitHub Pages serves this project at
// https://frankyz-dev.github.io/github-pages-docs/ — the local server uses
// the same prefix so local URLs match production URLs.
const BASE = '/github-pages-docs';

// Subpath → build output directory. Order matters only for readability.
// These are the SAME directories GitHub Pages serves (committed build
// output at the project root) — the local layout is 1:1 with production.
const ROUTES = [
  { prefix: `${BASE}/astro/`, root: path.join(REPO_ROOT, 'astro') },
  { prefix: `${BASE}/docusaurus/`, root: path.join(REPO_ROOT, 'docusaurus') },
  { prefix: `${BASE}/mkdocs/`, root: path.join(REPO_ROOT, 'mkdocs') },
  { prefix: `${BASE}/vitepress/`, root: path.join(REPO_ROOT, 'vitepress') },
  { prefix: `${BASE}/plain-md/`, root: path.join(REPO_ROOT, 'plain-md'), renderMd: true },
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.gz': 'application/gzip',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

marked.setOptions({ gfm: true, breaks: false });

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function notFound(res, urlPath) {
  send(
    res,
    404,
    `<!doctype html>
<html><head><meta charset="utf-8"><title>404 — not found</title>
<style>
  body { font-family: system-ui, sans-serif; background: #0d1117; color: #e6edf3;
         display: grid; place-items: center; min-height: 100vh; margin: 0; }
  main { text-align: center; }
  a { color: #58a6ff; }
  code { background: #161b22; padding: 2px 6px; border-radius: 4px; }
</style></head>
<body><main>
  <h1>404</h1>
  <p>Nothing at <code>${escapeHtml(urlPath)}</code>.</p>
  <p><a href="${BASE}/">← Back to the landing page</a></p>
</main></body></html>`,
    { 'content-type': 'text/html; charset=utf-8' },
  );
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
}

// Render a .md file as a minimal GitHub-flavoured HTML page (plain-md demo:
// on GitHub Pages, Jekyll/GitHub's renderer does exactly this).
function renderMarkdownPage(md, urlPath) {
  const body = marked.parse(md);
  const title = (md.match(/^#\s+(.+)$/m)?.[1] ?? urlPath).trim();
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
         line-height: 1.6; margin: 0 auto; max-width: 860px; padding: 2rem 1.25rem 4rem;
         background: #0d1117; color: #e6edf3; }
  a { color: #58a6ff; text-decoration: none; }
  a:hover { text-decoration: underline; }
  h1, h2, h3 { border-bottom: 1px solid #21262d; padding-bottom: .3em; }
  code { background: #161b22; padding: .15em .4em; border-radius: 4px;
         font-size: 85%; font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace; }
  pre { background: #161b22; padding: 1rem; border-radius: 6px; overflow-x: auto; }
  pre code { background: none; padding: 0; font-size: 85%; }
  table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
  th, td { border: 1px solid #30363d; padding: .4em .8em; text-align: left; }
  th { background: #161b22; }
  blockquote { border-left: 4px solid #388bfd; margin: 1rem 0; padding: .25rem 1rem;
               color: #8b949e; background: #161b22; border-radius: 0 6px 6px 0; }
  img { max-width: 100%; }
  input[type="checkbox"] { margin-right: .4em; }
  .crumbs { color: #8b949e; font-size: .85rem; margin-bottom: 1.5rem; }
  .crumbs a { color: #8b949e; }
</style></head>
<body>
  <p class="crumbs"><a href="${BASE}/">← landing</a> · <a href="${BASE}/plain-md/">plain-md</a> · <a href="${escapeHtml(urlPath)}?raw=1">view raw</a></p>
  ${body}
</body></html>`;
}

async function tryStat(p) {
  try {
    return await stat(p);
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);
    let urlPath = decodeURIComponent(url.pathname);

    // Site root → redirect to the project landing page (on GitHub Pages the
    // project lives under the /github-pages-docs/ subpath, not the site root).
    if (urlPath === '/') {
      res.writeHead(302, { location: `${BASE}/` });
      return res.end();
    }

    // Landing page — the same static file (index.html at the project root)
    // that GitHub Pages serves at /github-pages-docs/.
    if (urlPath === BASE) {
      res.writeHead(301, { location: `${BASE}/` });
      return res.end();
    }
    if (urlPath === `${BASE}/`) {
      const html = await readFile(path.join(REPO_ROOT, 'index.html'));
      return send(res, 200, html, { 'content-type': 'text/html; charset=utf-8' });
    }

    // Find the demo route for this path.
    const route = ROUTES.find((r) => urlPath === r.prefix.slice(0, -1) || urlPath.startsWith(r.prefix));
    if (!route) return notFound(res, urlPath);

    // Bare route name (e.g. /astro) → redirect to trailing-slash form.
    if (urlPath === route.prefix.slice(0, -1)) {
      res.writeHead(301, { location: route.prefix });
      return res.end();
    }

    const subPath = urlPath.slice(route.prefix.length);
    const rootDir = route.root;

    // Candidate file paths, in priority order:
    //  1. exact file (e.g. /plain-md/sops/deploy-release.md)
    //  2. directory with index.html (astro/docusaurus/mkdocs style)
    //  3. <path>.html (vitepress style: /design/architecture → architecture.html)
    const candidates = [
      path.join(rootDir, subPath),
      path.join(rootDir, subPath, 'index.html'),
      path.join(rootDir, `${subPath}.html`),
      // plain-md: directory root → render README.md (GitHub shows the README
      // for a folder; our mock renders it like a .md file).
      ...(route.renderMd ? [path.join(rootDir, subPath, 'README.md')] : []),
    ];

    for (const candidate of candidates) {
      const resolved = path.resolve(candidate);
      // Path-traversal guard: must stay inside the route's root.
      if (resolved !== rootDir && !resolved.startsWith(rootDir + path.sep)) continue;
      const st = await tryStat(resolved);
      if (!st) continue;

      if (st.isDirectory()) {
        // Directory without index.html → redirect to trailing slash, then 404.
        if (!urlPath.endsWith('/')) {
          res.writeHead(301, { location: urlPath + '/' });
          return res.end();
        }
        continue;
      }

      // plain-md: render .md files like GitHub's renderer does.
      if (route.renderMd && resolved.toLowerCase().endsWith('.md')) {
        if (url.searchParams.get('raw') === '1') {
          const raw = await readFile(resolved);
          return send(res, 200, raw, { 'content-type': MIME['.md'] });
        }
        const md = await readFile(resolved, 'utf8');
        return send(res, 200, renderMarkdownPage(md, urlPath), {
          'content-type': 'text/html; charset=utf-8',
        });
      }

      const data = await readFile(resolved);
      const type = MIME[path.extname(resolved).toLowerCase()] ?? 'application/octet-stream';
      return send(res, 200, data, { 'content-type': type });
    }

    return notFound(res, urlPath);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) send(res, 500, 'Internal server error', { 'content-type': 'text/plain' });
    else res.end();
  }
});

server.listen(PORT, HOST, () => {
  console.log(`GitHub Pages mock server: http://${HOST}:${PORT}${BASE}/`);
  for (const r of ROUTES) console.log(`  ${r.prefix}  →  ${path.relative(REPO_ROOT, r.root)}`);
});
