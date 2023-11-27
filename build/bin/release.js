#!/usr/bin/env node
"use strict";

const
	fs             = require ("fs"),
	{ sh, system } = require ("shell-tools");

async function bump ()
{
	const
		name    = require ("../../package.json") .name,
		version = sh`npm pkg get version | sed 's/"//g'` .trim ();

	console .log (`Current version ${version}`);

	if (version .endsWith ("a"))
		return version;

	const online = sh`npm view ${name} version` .trim ();

	console .log (`NPM version ${online}`);

	if (version === online)
		await system (`npm version patch --no-git-tag-version --force`);
}

async function zip ()
{
	const version = sh`npm pkg get version | sed 's/"//g'` .trim ();

	await system (`cp -r dist x_ite-${version}`);
	await system (`zip -q -x "*.zip" -r x_ite-${version}.zip x_ite-${version}`);
	await system (`mv x_ite-${version}.zip dist/x_ite.zip`);
	await system (`rm -r x_ite-${version}`);
}

async function docs (version)
{
	const contentLength = Math .floor (parseInt (sh`gzip -5 dist/x_ite.min.js --stdout | wc -c` .trim ()) / 1000);

	let config = sh`cat 'docs/_config.yml'`;

	config = config .replace (/\bversion:\s*[\d\.]+/sg, `version: ${version}`);
	config = config .replace (/\bsize:\s*[\d\.]+/sg, `size: ${contentLength}`);

	fs .writeFileSync ("docs/_config.yml", config);
}

async function commit (version)
{
	await system (`git commit -am 'Published version ${version}'`);
	await system (`git push origin`);
}

async function publish (version)
{
	await system (`git tag --delete ${version}`);
	await system (`git push --delete origin ${version}`);

	await system (`git tag ${version}`);
	await system (`git push origin --tags`);
}

async function update (release)
{
	const
		cwd  = process .cwd (),
		dist = `${cwd}/dist`,
		code = `${cwd}/../code/docs/x_ite/${release}`;

	console .log (`Uploading ${release}`);

	await system (`rm -r '${code}'`);
	await system (`cp -r '${dist}' '${code}'`);

	if (release !== "latest")
		await system (`cp -r '${dist}' '${code}/dist'`);
}

async function upload (version)
{
	const
		cwd  = process .cwd (),
		code = `${cwd}/../code`;

	process .chdir (code);

	await system (`git add -A`);
	await system (`git commit -am 'Published version ${version}'`);
	await system (`git push origin`);

	process .chdir (cwd);

	await system (`npm publish`);
}

async function other ()
{
	const result = await system (`zenity --question '--text=Do want to publish new versions for x3d-tidy and Sunrize?' --ok-label=Yes --cancel-label=No`);

	if (result !== 0)
		return;

	const cwd = process .cwd ();

	process .chdir (`${cwd}/../media`);
	await system (`npm run release`);

	process .chdir (`${cwd}/../x3d-tidy`);
	await system (`npm run release`);

	process .chdir (`${cwd}/../x3d-image`);
	await system (`npm run release`);

	process .chdir (`${cwd}/../sunrize`);
	await system (`npm run release`);

	process .chdir (cwd);
}

async function release ()
{
	if (sh`git branch --show-current` !== "development\n")
	{
		console .error ("Wrong branch, must be development, cannot release version!");
		process .exit (1);
	}

	console .log ("Waiting for confirmation ...");

	const
		version = sh`npm pkg get version | sed 's/"//g'` .trim (),
		result  = await system (`zenity --question '--text=Do you really want to publish X_ITE X3D v${version} now?' --ok-label=Yes --cancel-label=No`);

	if (result !== 0)
		process .exit (1);

	console .log (`Publishing X_ITE X3D v${version} now.`);

	await system (`npm run docs-components`);
	await system (`npm run docs-nodes`);
	await system (`npm run glTF-samples`);
	await system (`git add -A`);
	await system (`git commit -am 'Build version ${version}'`);
	await system (`git push origin`);
	await system (`git checkout main`);
	await system (`git merge development`);

	// docs

	if (!version .endsWith ("a"))
		await docs (version);

	// tags

	await commit ();

	await publish ("alpha");

	if (!version .endsWith ("a"))
	{
		await publish (version);
		await publish ("latest");
	}

	// code

	await update ("alpha");

	if (!version .endsWith ("a"))
		await update ("latest");

	upload (version);

	// switch back to development branch

	await system (`git checkout development`);
	await system (`git merge main`);
	await system (`git push origin`);

	// publish x3d-tidy and sunrize

	if (!version .endsWith ("a"))
		await other ();
}

async function main ()
{
	await bump ();
	await system ("npm run dist");
	await zip ();

	// https://github.com/desktop/desktop/issues/14331#issuecomment-1286747195
	// Set post buffer to 250 MiB.
	await system (`git config --global http.postBuffer 262144000`);

	await release ();
}

main ();
