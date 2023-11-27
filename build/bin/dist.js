#!/usr/bin/env node
"use strict";

const
   fs             = require ("fs"),
   path           = require ("path"),
   { sh, system } = require ("shell-tools");

async function copy_files ()
{
   await system (`rsync -q -r -x -c -v -t --progress --delete src/assets/fonts    dist/assets/`);
   await system (`rsync -q -r -x -c -v -t --progress --delete src/assets/hatching dist/assets/`);
   await system (`rsync -q -r -x -c -v -t --progress --delete src/assets/images   dist/assets/`);
   await system (`rsync -q -r -x -c -v -t --progress --delete src/assets/lib      dist/assets/`);
   await system (`rsync -q -r -x -c -v -t --progress --delete src/assets/linetype dist/assets/`);
   await system (`cp src/example.html dist/`);
}

async function html ()
{
   await system (`cp src/x_ite.html x_ite.min.html`);
	await system (`perl -p0i -e 's|<!-- X_ITE START.*?X_ITE END -->|<script src="dist/x_ite.min.js"></script>|sg'       x_ite.min.html`);
	await system (`perl -p0i -e 's|<!-- JQUERY -->|<script src="https://code.jquery.com/jquery-latest.js"></script>|sg' x_ite.min.html`);
	await system (`perl -p0i -e 's|<script type="module">|<script>|sg'         x_ite.min.html`);
	await system (`perl -p0i -e 's|import\s+X3D\s.*?\n||sg'                    x_ite.min.html`);
	await system (`perl -p0i -e 's|window\s*.X3D.*?\n+||sg'                    x_ite.min.html`);
	await system (`perl -p0i -e 's|"x_ite.js"|"dist/x_ite.min.js"|sg'          x_ite.min.html`);
	await system (`perl -p0i -e 's|\.\./x_ite.min.html|src/x_ite.html|sg'      x_ite.min.html`);
	await system (`perl -p0i -e 's|id="links"|id="links" class="min-links"|sg' x_ite.min.html`);
	await system (`perl -p0i -e 's|\>x_ite.min.html|>src/x_ite.html|sg'        x_ite.min.html`);
	await system (`perl -p0i -e 's|\.\./dist/|dist/|sg'                        x_ite.min.html`);
	await system (`perl -p0i -e 's|"bookmarks.js"|"src/bookmarks.js"|sg'       x_ite.min.html`);
	await system (`perl -p0i -e 's|"examples.js"|"src/examples.js"|sg'         x_ite.min.html`);
	await system (`perl -p0i -e 's|"tests.js"|"src/tests.js"|sg'               x_ite.min.html`);
	await system (`perl -p0i -e 's|"tests/|"src/tests/|sg'                     x_ite.min.html`);
}

async function main ()
{
   await copy_files ();
   await system (`npx webpack`);
   await html ();
   await system (`gzip -5 dist/x_ite.min.js --stdout | wc -c`);
   await system (`du -h dist/x_ite.min.js`);
}

main ();