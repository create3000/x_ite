#!/usr/bin/env node
"use strict";

const
   path   = require ("path"),
   fs     = require ("fs"),
	{ sh } = require ("shell-tools");

const
	cwd      = process .cwd (),
	examples = `${cwd}/../media/docs/examples`,
	docs     = `${cwd}/docs/_posts/components`;

const
	X3D    = sh (`find '${examples}/X3D' -type f -name 'example.html'`) .trim () .split (/[\r\n]+/) .sort (),
	other  = sh (`find '${examples}' -type f -name 'example.html' -not -path '*/X3D/*'`) .trim () .split (/[\r\n]+/) .sort (),
	html   = [... X3D, ... other],
	config = require (`${examples}/config.json`),
	tree   = config .reduce ((p, c) => [p, Object .assign (p [c .component] ??= { }, { [c .name]: c })] [0], { });

let output = "";

output += `<!-- EXAMPLES -->\n\n`;

for (const example of html)
{
	let
		folder    = path .dirname (example),
		basename  = path .basename (folder),
		component = path .basename (path .dirname (folder)),
		doc       = fs .existsSync (`${docs}/${component}/${basename}.md`),
		size      = sh (`identify -format "%w %h" "${examples}/${component}/${basename}/screenshot-small.png"`) .trim () .split (" ");

	const xrButtonPosition  = tree [component] [basename] ?.["xrButtonPosition"] ?? "br";

	folder = folder .replace (/^.*\/media\/docs\//, "");

	output += `[![${basename}](https://create3000.github.io/media/${folder}/screenshot-small.png){: width="${size [0]}" height="${size [1]}" }](https://create3000.github.io/media/${folder}/${basename}.x3d){: title="${component} » ${basename}" componentName="${component}" typeName="${basename}" doc="${doc}" xrButtonPosition="${xrButtonPosition}" }\n`;
}

output += `{: .examples }\n`;
output += `\n`;
output += `<!-- EXAMPLES END -->`;

// Wiki

let index = sh (`cat '${cwd}/docs/_posts/getting-started.md'`);
index = index .replace (/<!-- EXAMPLES -->.*?<!-- EXAMPLES END -->/sg, output);

fs .writeFileSync (`${cwd}/docs/_posts/getting-started.md`, index);
