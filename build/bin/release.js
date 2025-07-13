#!/usr/bin/env node
"use strict";

const
	fs                 = require ("fs"),
	{ sh, systemSync } = require ("shell-tools");

function bump ()
{
	const
		name    = require ("../../package.json") .name,
		version = sh (`npm pkg get version | sed 's/"//g'`) .trim ();

	console .log (`Current version ${version}`);

	if (version .endsWith ("a"))
		return;

	const online = sh (`npm view ${name} version`) .trim ();

	console .log (`NPM version ${online}`);

	if (version === online)
		systemSync (`npm version patch --no-git-tag-version --force`);
}

function zip ()
{
	const version = sh (`npm pkg get version | sed 's/"//g'`) .trim ();

	systemSync (`cp -r dist x_ite-${version}`);
	systemSync (`zip -q -x "*.zip" -r x_ite-${version}.zip x_ite-${version}`);
	systemSync (`mv x_ite-${version}.zip dist/x_ite.zip`);
	systemSync (`rm -r x_ite-${version}`);
}

function readme (version)
{
	let readme = sh (`cat 'README.md'`);

	readme = readme .replace (/x_ite@[\d\.]+/sg, `x_ite@${version}`);

	fs .writeFileSync ("README.md", readme);
}

function docs (version)
{
	// curl -H "Accept-Encoding: br" -s "https://cdn.jsdelivr.net/npm/x_ite@latest/dist/x_ite.min.js" | wc -c | tr -d ' '
	const size = Math .floor (parseInt (sh (`brotli -q 4 dist/x_ite.min.mjs --stdout | wc -c`) .trim ()) / 1000);

	if (size < 280)
		var color = "green";
	else if (size < 300)
		var color = "cyan";
	else
		var color = "blue";

	systemSync (`wget -q -O - https://badgen.net/static/compressed/${size}KB/${color} > docs/assets/img/badges/compressed.svg`);

	let config = sh (`cat 'docs/_config.yml'`);

	config = config .replace (/\x_ite_latest_version:\s*[\d\.]+/sg, `x_ite_latest_version: ${version}`);
	config = config .replace (/\x_ite_compressed_size:\s*[\d\.]+/sg, `x_ite_compressed_size: ${size}`);

	fs .writeFileSync ("docs/_config.yml", config);
}

function integrity ()
{
	const files = [
		"x_ite.js",
		"x_ite.min.js",
		"x_ite.mjs",
		"x_ite.min.mjs",
		"x_ite.css",
	];

	let config = sh (`cat docs/_config.yml`);

	for (const file of files)
	{
		const
			key    = file .replace (/\./g, "_"),
			shasum = sh (`shasum -b -a 384 dist/${file} | awk '{ print $1 }' | xxd -r -p | base64`) .trim ();

		config = config .replace (new RegExp (`(${key}_integrity):.*?\n`), `$1: sha384-${shasum}\n`);
	}

	fs .writeFileSync (`docs/_config.yml`, config);
}

function commit (version)
{
	systemSync (`git commit -am 'Published version ${version}'`);
	systemSync (`git push origin`);
}

function tags (version)
{
	if (!version .match (/^\d+\.\d+\.\d+$/))
		return;

	// systemSync (`git tag --delete ${version}`);
	// systemSync (`git push --delete origin ${version}`);

	systemSync (`git tag ${version}`);
	systemSync (`git push origin --tags`);
}

function update (... versions)
{
	const
		cwd  = process .cwd (),
		dist = `${cwd}/dist`,
		code = `${cwd}/../code`;

	for (const version of versions)
	{
		const docs = `${code}/docs/x_ite/${version}`;

		console .log (`Copying version ${version}...`);

		process .chdir (cwd);

		systemSync (`rsync -a --delete --exclude=".*" ${dist}/ ${docs}/`);
		legacy_message (docs);

		if (version === "latest")
		{
			systemSync (`cp -r '${dist}' '${docs}'`); // legacy
			legacy_message (`${docs}/dist`);
		}

		process .chdir (code);

		systemSync (`git add -A`);
		systemSync (`git commit -am 'Published version ${version}'`);

		tags (version);
	}

	systemSync (`git push origin`);

	process .chdir (cwd);
}

function legacy_message (folder)
{
	const paths = [
		"x_ite.js",
		"x_ite.min.js",
		"x_ite.mjs",
		"x_ite.min.mjs",
	]
	.map (filename => `${folder}/${filename}`);

	for (const path of paths)
	{
		systemSync (`echo '\n;console .warn ("Use of https://create3000.github.io/code/ is discouraged. Please use files from jsDelivr, see https://create3000.github.io/x_ite/#jsdelivr-cdn");' >> ${path}`);
	}
}

function other ()
{
	const result = systemSync (`zenity --question '--text=Do want to publish new versions for x3d-tidy and Sunrize?' --ok-label=Yes --cancel-label=No`);

	if (result !== 0)
		return;

	const cwd = process .cwd ();

	systemSync (`npm cache clean --force`);
	systemSync (`countdown 120s`);

	process .chdir (`${cwd}/../media`);
	systemSync (`npm run release`);

	process .chdir (`${cwd}/../x_ite-node`);
	systemSync (`npm run release`);
	systemSync (`npm cache clean --force`);
	systemSync (`countdown 120s`);

	process .chdir (`${cwd}/../x3d-tidy`);
	systemSync (`npm run release`);

	process .chdir (`${cwd}/../x3d-image`);
	systemSync (`npm run release`);

	process .chdir (`${cwd}/../sunrize`);
	systemSync (`npm run release`);

	process .chdir (cwd);
}

function release ()
{
	if (sh (`git branch --show-current`) !== "development\n")
	{
		console .error ("Wrong branch, must be development, cannot release version!");
		process .exit (1);
	}

	console .log ("Waiting for confirmation ...");

	const version = sh (`npm pkg get version | sed 's/"//g'`) .trim ();

	systemSync (`npm run docs-table`);
	systemSync (`npm run docs-components`);
	systemSync (`npm run docs-nodes`);
	systemSync (`npm run docs-reference`);
	systemSync (`npm run glTF-samples`);

	// docs

	if (!version .endsWith ("a"))
	{
		readme (version);
		docs (version);
		integrity ();
	}

	// confirm

	const result = systemSync (`zenity --question '--text=Do you really want to publish X_ITE X3D v${version} now?' --ok-label=Yes --cancel-label=No`);

	if (result !== 0)
		process .exit (1);

	console .log (`Publishing X_ITE X3D v${version} now.`);

	// commit and merge development branch into main

	systemSync (`git add -A`);
	systemSync (`git commit -am 'Build version ${version}'`);
	systemSync (`git push origin`);
	systemSync (`git checkout main`);
	systemSync (`git merge development`);

	// publish

	commit (version);
	tags (version);

	if (!version .endsWith ("a"))
		systemSync (`npm publish`);

	// code

	update ("alpha", ... version .endsWith ("a") ? [ ] : ["latest"]);

	// switch back to development branch

	systemSync (`git checkout development`);
	systemSync (`git merge main`);
	systemSync (`git push origin`);

	// Purge camo image cache for SVG banners.

	systemSync (`npm run purge-camo`);

	// publish x3d-tidy and sunrize

	if (!version .endsWith ("a"))
		other ();
}

function main ()
{
	// https://github.com/desktop/desktop/issues/14331#issuecomment-1286747195
	// Set post buffer to 1 GB.
	systemSync (`git config --global http.postBuffer 1000000000`);
	systemSync (`git config --global https.postBuffer 1000000000`);

	bump ();
	systemSync ("npm run dist");
	zip ();

	release ();
}

main ();
