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
	const size = Math .floor (parseInt (sh (`brotli -6 dist/x_ite.min.mjs --stdout | wc -c`) .trim ()) / 1000);

	if (size < 270)
		var color = "green";
	else if (size < 290)
		var color = "cyan";
	else
		var color = "blue";

	systemSync (`wget -q -O - https://badgen.net/static/compressed/${size}KB/${color} > docs/assets/img/badges/compressed.svg`);

	let config = sh (`cat 'docs/_config.yml'`);

	config = config .replace (/\x_ite_latest_version:\s*[\d\.]+/sg, `x_ite_latest_version: ${version}`);
	config = config .replace (/\x_ite_compressed_size:\s*[\d\.]+/sg, `x_ite_compressed_size: ${size}`);

	fs .writeFileSync ("docs/_config.yml", config);
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

function update (version)
{
	const
		cwd  = process .cwd (),
		dist = `${cwd}/dist`,
		code = `${cwd}/../code`,
		docs = `${cwd}/../code/docs/x_ite/${version}`;

	console .log (`Uploading ${version}`);

	systemSync (`rm -r '${docs}'`);
	systemSync (`cp -r '${dist}' '${docs}'`);

	if (version === "latest")
		systemSync (`cp -r '${dist}' '${docs}/dist'`); // legacy

	process .chdir (`${cwd}/../code`);

	systemSync (`git add -A`);
	systemSync (`git commit -am 'Published version ${version}'`);
	systemSync (`git push origin`);

	tags (version);

	process .chdir (cwd);
}

function other ()
{
	const result = systemSync (`zenity --question '--text=Do want to publish new versions for x3d-tidy and Sunrize?' --ok-label=Yes --cancel-label=No`);

	if (result !== 0)
		return;

	const cwd = process .cwd ();

	systemSync (`sleep 10`);
	systemSync (`npm cache clean --force`);

	process .chdir (`${cwd}/../media`);
	systemSync (`npm run release`);

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

	const
		version = sh (`npm pkg get version | sed 's/"//g'`) .trim (),
		result  = systemSync (`zenity --question '--text=Do you really want to publish X_ITE X3D v${version} now?' --ok-label=Yes --cancel-label=No`);

	if (result !== 0)
		process .exit (1);

	console .log (`Publishing X_ITE X3D v${version} now.`);

	systemSync (`npm run docs-table`);
	systemSync (`npm run docs-components`);
	systemSync (`npm run docs-nodes`);
	systemSync (`npm run docs-reference`);
	systemSync (`npm run glTF-samples`);
	systemSync (`git add -A`);
	systemSync (`git commit -am 'Build version ${version}'`);
	systemSync (`git push origin`);
	systemSync (`git checkout main`);
	systemSync (`git merge development`);

	// docs

	if (!version .endsWith ("a"))
	{
		readme (version);
		docs (version);
	}

	// tags

	commit (version);
	tags (version);

	// code

	update ("alpha");

	if (!version .endsWith ("a"))
		update ("latest");

	systemSync (`npm publish`);

	// switch back to development branch

	systemSync (`git checkout development`);
	systemSync (`git merge main`);
	systemSync (`git push origin`);

	// purge camo image cache from banners.

	systemSync (`npm run purge-camo`);

	// publish x3d-tidy and sunrize

	if (!version .endsWith ("a"))
		other ();
}

function main ()
{
	// https://github.com/desktop/desktop/issues/14331#issuecomment-1286747195
	// Set post buffer to 250 MiB.
	systemSync (`git config --global http.postBuffer 262144000`);

	bump ();
	systemSync ("npm run dist");
	zip ();

	release ();
}

main ();
