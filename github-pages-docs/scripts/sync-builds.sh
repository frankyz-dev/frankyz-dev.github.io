#!/usr/bin/env bash
# Sync SSG build output to the top-level directories that GitHub Pages serves.
#
# GitHub Pages maps URLs directly to file paths: /github-pages-docs/astro/
# serves <repo>/github-pages-docs/astro/index.html. So the deployed build
# output must live at the project root (astro/, docusaurus/, mkdocs/,
# vitepress/), not inside the source projects under demos/.
#
# Run this after rebuilding any demo (see README.md "Rebuilding after
# content changes"), then commit the refreshed top-level directories.
set -euo pipefail
cd "$(dirname "$0")/.."

sync_dir() {
  local src="$1" dst="$2"
  if [[ ! -d "$src" ]]; then
    echo "skip  $dst  (no build output at $src — run the demo's build first)"
    return
  fi
  rm -rf "$dst"
  mkdir -p "$dst"
  cp -a "$src/." "$dst/"
  echo "sync  $src  →  $dst/"
}

sync_dir demos/astro/dist                            astro
sync_dir demos/docusaurus/build                      docusaurus
sync_dir demos/mkdocs/site                           mkdocs
sync_dir demos/vitepress/docs/.vitepress/dist        vitepress

# plain-md has no build — it is already the deployable content (plain-md/).
echo "done. Review with: git status"
