#!/usr/bin/env node
"use strict";

const
	fs          = require ("fs"),
	{ execSync} = require ("child_process"),
	{ sh }      = require ("shell-tools");

function bump ()
{
	const
		name    = require ("../../package.json") .name,
		version = sh`npm pkg get version | sed 's/"//g'` .trim ();

	console .log (`Current version ${version}`);

	if (version .endsWith ("a"))
		return;

	const online = sh`npm view ${name} version` .trim ();

	console .log (`NPM version ${online}`);

	if (version === online)
		execSync (`npm version patch --no-git-tag-version --force`);
}

function zip ()
{
	const version = sh`npm pkg get version | sed 's/"//g'` .trim ();

	execSync (`cp -r dist x_ite-${version}`);
	execSync (`zip -q -x "*.zip" -r x_ite-${version}.zip x_ite-${version}`);
	execSync (`mv x_ite-${version}.zip dist/x_ite.zip`);
	execSync (`rm -r x_ite-${version}`);
}

function docs (version)
{
	const contentLength = Math .floor (parseInt (sh`gzip -5 dist/x_ite.min.js --stdout | wc -c` .trim ()) / 1000);

	let config = sh`cat 'docs/_config.yml'`;

	config = config .replace (/\bversion:\s*[\d\.]+/sg, `version: ${version}`);
	config = config .replace (/\bsize:\s*[\d\.]+/sg, `size: ${contentLength}`);

	fs .writeFileSync ("docs/_config.yml", config);
}

function commit (version)
{
	execSync (`git commit -am 'Published version ${version}'`);
	execSync (`git push origin`);
}

function publish (version)
{
	execSync (`git tag --delete ${version}`);
	execSync (`git push --delete origin ${version}`);

	execSync (`git tag ${version}`);
	execSync (`git push origin --tags`);
}

function update (release)
{
	const
		cwd  = process .cwd (),
		dist = `${cwd}/dist`,
		code = `${cwd}/../code/docs/x_ite/${release}`;

	console .log (`Uploading ${release}`);

	execSync (`rm -r '${code}'`);
	execSync (`cp -r '${dist}' '${code}'`);

	if (release !== "latest")
		execSync (`cp -r '${dist}' '${code}/dist'`); // legacy
}

function upload (version)
{
	const
		cwd  = process .cwd (),
		code = `${cwd}/../code`;

	process .chdir (code);

	execSync (`git add -A`);
	execSync (`git commit -am 'Published version ${version}'`);
	execSync (`git push origin`);

	process .chdir (cwd);

	execSync (`npm publish`);
}

function other ()
{
	const result = execSync (`zenity --question '--text=Do want to publish new versions for x3d-tidy and Sunrize?' --ok-label=Yes --cancel-label=No`);

	if (result !== 0)
		return;

	const cwd = process .cwd ();

	process .chdir (`${cwd}/../media`);
	execSync (`npm run release`);

	process .chdir (`${cwd}/../x3d-tidy`);
	execSync (`npm run release`);

	process .chdir (`${cwd}/../x3d-image`);
	execSync (`npm run release`);

	process .chdir (`${cwd}/../sunrize`);
	execSync (`npm run release`);

	process .chdir (cwd);
}

function release ()
{
	if (sh`git branch --show-current` !== "development\n")
	{
		console .error ("Wrong branch, must be development, cannot release version!");
		process .exit (1);
	}

	console .log ("Waiting for confirmation ...");

	const
		version = sh`npm pkg get version | sed 's/"//g'` .trim (),
		result  = execSync (`zenity --question '--text=Do you really want to publish X_ITE X3D v${version} now?' --ok-label=Yes --cancel-label=No`);

	if (result !== 0)
		process .exit (1);

	console .log (`Publishing X_ITE X3D v${version} now.`);

	execSync (`npm run docs-components`);
	execSync (`npm run docs-nodes`);
	execSync (`npm run glTF-samples`);
	execSync (`git add -A`);
	execSync (`git commit -am 'Build version ${version}'`);
	execSync (`git push origin`);
	execSync (`git checkout main`);
	execSync (`git merge development`);

	// docs

	if (!version .endsWith ("a"))
		docs (version);

	// tags

	commit ();
	publish ("alpha");

	if (!version .endsWith ("a"))
	{
		publish (version);
		publish ("latest");
	}

	// code

	update ("alpha");

	if (!version .endsWith ("a"))
		update ("latest");

	upload (version);

	// switch back to development branch

	execSync (`git checkout development`);
	execSync (`git merge main`);
	execSync (`git push origin`);

	// publish x3d-tidy and sunrize

	if (!version .endsWith ("a"))
		other ();
}

function main ()
{
	bump ();
	execSync ("npm run dist");
	zip ();

	// https://github.com/desktop/desktop/issues/14331#issuecomment-1286747195
	// Set post buffer to 250 MiB.
	execSync (`git config --global http.postBuffer 262144000`);

	release ();
}

main ();
