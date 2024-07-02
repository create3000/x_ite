#!/usr/bin/env node
"use strict";

const { systemSync } = require ("shell-tools");

function copy_files ()
{
   systemSync (`rsync -q -r -x -c -v -t --progress --delete src/assets/fonts    dist/assets/`);
   systemSync (`rsync -q -r -x -c -v -t --progress --delete src/assets/hatching dist/assets/`);
   systemSync (`rsync -q -r -x -c -v -t --progress --delete src/assets/images   dist/assets/`);
   systemSync (`rsync -q -r -x -c -v -t --progress --delete src/assets/lib      dist/assets/`);
   systemSync (`rsync -q -r -x -c -v -t --progress --delete src/assets/linetype dist/assets/`);
	systemSync (`npm run ts`);
   systemSync (`cp src/x_ite.d.ts dist/`);
   systemSync (`cp src/X3DUOM.xml dist/`);
   systemSync (`cp src/example.html dist/`);
}

function html ()
{
   systemSync (`cp src/x_ite.html x_ite.min.html`);
	systemSync (`perl -p0i -e 's|<!-- X_ITE START.*?X_ITE END -->|<script src="dist/x_ite.min.js"></script>|sg'       x_ite.min.html`);
	systemSync (`perl -p0i -e 's|<!-- JQUERY -->|<script src="https://code.jquery.com/jquery-latest.js"></script>|sg' x_ite.min.html`);
	systemSync (`perl -p0i -e 's|<script type="module">|<script>|sg'         x_ite.min.html`);
	systemSync (`perl -p0i -e 's|import\\s+X3D\\s.*?\\n||sg'                 x_ite.min.html`);
	systemSync (`perl -p0i -e 's|window\\s*.X3D.*?\\n+||sg'                  x_ite.min.html`);
	systemSync (`perl -p0i -e 's|"x_ite.js"|"dist/x_ite.min.js"|sg'          x_ite.min.html`);
	systemSync (`perl -p0i -e 's|\\.\\./x_ite.min.html|src/x_ite.html|sg'    x_ite.min.html`);
	systemSync (`perl -p0i -e 's|id="links"|id="links" class="min-links"|sg' x_ite.min.html`);
	systemSync (`perl -p0i -e 's|\\>x_ite.min.html|>src/x_ite.html|sg'       x_ite.min.html`);
	systemSync (`perl -p0i -e 's|\\.\\./dist/|dist/|sg'                      x_ite.min.html`);
	systemSync (`perl -p0i -e 's|"bookmarks.js"|"src/bookmarks.js"|sg'       x_ite.min.html`);
	systemSync (`perl -p0i -e 's|"examples.js"|"src/examples.js"|sg'         x_ite.min.html`);
	systemSync (`perl -p0i -e 's|"tests.js"|"src/tests.js"|sg'               x_ite.min.html`);
	systemSync (`perl -p0i -e 's|"tests/|"src/tests/|sg'                     x_ite.min.html`);
}

function main ()
{
   copy_files ();
   systemSync (`npx webpack`);
   html ();
   systemSync (`brotli -6 dist/x_ite.min.js --stdout | wc -c`);
   systemSync (`du -h dist/x_ite.min.js`);
}

main ();
