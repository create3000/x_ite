#!/usr/bin/env node
"use strict";

const { systemSync, sh } = require ("shell-tools");

function copy_files ()
{
	const version = sh (`npm pkg get version | sed 's/"//g'`) .trim ();

   systemSync (`rsync -q -r -x -c -v -t --progress --delete src/assets/fonts    dist/assets/`);
   systemSync (`rsync -q -r -x -c -v -t --progress --delete src/assets/hatching dist/assets/`);
   systemSync (`rsync -q -r -x -c -v -t --progress --delete src/assets/images   dist/assets/`);
   systemSync (`rsync -q -r -x -c -v -t --progress --delete src/assets/lib      dist/assets/`);
   systemSync (`rsync -q -r -x -c -v -t --progress --delete src/assets/linetype dist/assets/`);
	systemSync (`npm run ts`);
   systemSync (`cp src/x_ite.d.ts dist/`);
   systemSync (`cp src/X3DUOM.xml dist/`);
   systemSync (`cp src/example.html dist/`);
	systemSync (`perl -p0i -e 's|latest|${version}|sg' dist/example.html`);
}

function html ()
{
   systemSync (`cp src/x_ite.html x_ite.min.html`);
	systemSync (`perl -p0i -e 's|\\s*<!-- X_ITE START.*?X_ITE END -->|\\n|sg'  x_ite.min.html`);
	systemSync (`perl -p0i -e 's|<!-- JQUERY -->|<script src="https://code.jquery.com/jquery-latest.js"></script>|sg' x_ite.min.html`);
	systemSync (`perl -p0i -e 's|"./x_ite.js"|"./dist/x_ite.min.mjs"|sg'       x_ite.min.html`);
	systemSync (`perl -p0i -e 's|"x_ite.js"|"dist/x_ite.min.js"|sg'            x_ite.min.html`);
	systemSync (`perl -p0i -e 's|\\.\\./x_ite.min.html|src/x_ite.html|sg'      x_ite.min.html`);
	systemSync (`perl -p0i -e 's|\\>x_ite.min.html|>src/x_ite.html|sg'         x_ite.min.html`);
	systemSync (`perl -p0i -e 's|\\.\\./dist/|dist/|sg'                        x_ite.min.html`);
	systemSync (`perl -p0i -e 's|"examples.js"|"src/examples.js"|sg'           x_ite.min.html`);
	systemSync (`perl -p0i -e 's|"tests.js"|"src/tests.js"|sg'                 x_ite.min.html`);
	systemSync (`perl -p0i -e 's|"tests/|"src/tests/|sg'                       x_ite.min.html`);
	systemSync (`perl -p0i -e 's|"./Bookmarks.js"|"./src/Bookmarks.js"|sg'     x_ite.min.html`);
}

function main ()
{
   copy_files ();
   systemSync (`npx webpack`);
   html ();

	// Output package sizes:

	const online = sh (`curl -H "Accept-Encoding: br" -s "https://cdn.jsdelivr.net/npm/x_ite@latest/dist/x_ite.min.js" | wc -c | tr -d ' '`) .trim ();
	const local  = sh (`brotli -4 dist/x_ite.min.mjs --stdout | wc -c | tr -d ' '`) .trim ();
	const min    = sh (`cat dist/x_ite.min.js | wc -c | tr -d ' '`) .trim ();

   console .log (`Online: ${online .toLocaleString ("en")} bytes`);
   console .log (`Local:  ${local  .toLocaleString ("en")} bytes`);
	console .log (`Min:    ${min    .toLocaleString ("en")} bytes`);
}

main ();
