#!/usr/bin/env node
"use strict";

const
   path   = require ("path"),
   fs     = require ("fs"),
	{ sh } = require ("shell-tools");

const COLUMNS = 7;

const
	cwd      = process .cwd (),
	examples = `${cwd}/../media/docs/examples`,
	docs     = `${cwd}/docs/_posts/components`;

const
	X3D    = sh (`find '${examples}/X3D' -type f -name 'example.html'`) .trim () .split (/[\r\n]+/) .sort (),
	other  = sh (`find '${examples}' -type f -name 'example.html' -not -path '*/X3D/*'`) .trim () .split (/[\r\n]+/) .sort (),
	html   = [... X3D, ... other],
	table  = Array .from ({ length: Math .floor ((html .length - 1) / COLUMNS) + 1 }, () => [ ]),
	config = require (`${examples}/config.json`),
	tree   = config .reduce ((p, c) => [p, Object .assign (p [c .component] ??= { }, { [c .name]: c })] [0], { });

for (const [i, example] of html .entries ())
	table [Math .floor (i / COLUMNS)] .push (example);

let output = "";

output += `<table class="examples">\n`;

for (const row of table)
{
	output += `  <tr>\n`;

	for (const example of row)
	{
		let
			folder    = path .dirname (example),
			basename  = path .basename (folder),
			component = path .basename (path .dirname (folder)),
			doc       = fs .existsSync (`${docs}/${component}/${basename}.md`),
			size      = sh (`identify -format "%w %h" "${examples}/${component}/${basename}/screenshot-small.avif"`) .trim () .split (" ");

		const xrButtonPosition  = tree [component] [basename] ?.["xrButtonPosition"] ?? "br";

		folder = folder .replace (/^.*\/media\/docs\//, "");

		output += `    <td>\n`;
		output += `      <a href="https://create3000.github.io/media/${folder}/${basename}.x3d" title="${component} » ${basename}" componentName="${component}" typeName="${basename}" doc="${doc}" xrButtonPosition="${xrButtonPosition}">`;
		output += `<img src="https://create3000.github.io/media/${folder}/screenshot-small.avif" alt="${basename}" width="${size [0]}" height="${size [1]}"/>`;
		output += `</a>\n`;
		output += `    </td>\n`;
	}

	output += `  </tr>\n`;
}

output += `</table>\n`;

// Wiki

let index = sh (`cat '${cwd}/docs/_posts/getting-started.md'`);
index = index .replace (/<table class="examples">.*?<\/table>\n/sg, output);

fs .writeFileSync (`${cwd}/docs/_posts/getting-started.md`, index);
