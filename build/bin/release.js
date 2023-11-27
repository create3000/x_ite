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

async function release ()
{
	if (sh`git branch --show-current` !== "development\n")
	{
		console .error ("Wrong branch, must be development, cannot release version!");
		process .exit (1);
	}

	console .log ("Waiting for confirmation ...");

	const version = sh`npm pkg get version | sed 's/"//g'` .trim (); // DEBUG

	// const
	// 	version = sh`npm pkg get version | sed 's/"//g'` .trim (),
	// 	result  = await system (`zenity --question '--text=Do you really want to publish X_ITE X3D v${version} now?' --ok-label=Yes --cancel-label=No`);

	// if (result !== 0)
	// 	process .exit (1);

	console .log (`Publishing X_ITE X3D v${version} now.`);

	// await system (`npm run docs-components`);
	// await system (`npm run docs-nodes`);
	// await system (`npm run glTF-samples`);
	// await system (`git add -A`);
	// await system (`git commit -am 'Build version ${version}'`);
	// await system (`git push origin`);
	// await system (`git checkout main`);
	// await system (`git merge development`);

	// docs

	if (!version .endsWith ("a"))
		docs (version);

	// // tags

	// commit;

	// publish ("alpha");
	// publish ($VERSION) unless $ALPHA;
	// publish ("latest") unless $ALPHA;

	// // code

	// update ("alpha");
	// update ("latest") unless $ALPHA;

	// upload;

	// // switch to development branch

	// system "git checkout development";
	// system "git merge main";
	// system "git push origin";

	// // publish x3d-tidy and sunrize

	// other unless $ALPHA;
}

async function main ()
{
	// await bump ();
	// await system ("npm run dist");
	// await zip ();

	// https://github.com/desktop/desktop/issues/14331#issuecomment-1286747195
	// Set post buffer to 250 MiB.
	await system (`git config --global http.postBuffer 262144000`);

	await release ();
}

main ();

// my $NO_GIT = 0;

// sub docs
// {
// 	my $VERSION = shift;

// 	my $config        = `cat '$CWD/docs/_config.yml'`;
// 	my $contentLength = `gzip -5 dist/x_ite.min.js --stdout | wc -c`;

// 	$contentLength =~ s/^\s+|\s+$//sg;
// 	$contentLength = int ($contentLength / 1000);

// 	$config =~ s|\bversion:\s*[\d\.]+|version: $VERSION|sgo;
// 	$config =~ s|\bsize:\s*[\d\.]+|size: $contentLength|sgo;

// 	open CONFIG, ">", "$CWD/docs/_config.yml";
// 	print CONFIG $config;
// 	close CONFIG;
// }

// sub commit
// {
// 	return if $NO_GIT;

// 	my $version = shift;

// 	system "git commit -am 'Published version $VERSION'";
// 	system "git push origin";
// }

// sub publish
// {
// 	return if $NO_GIT;

// 	my $version = shift;

// 	system "git tag --delete $version";
// 	system "git push --delete origin $version";

// 	system "git tag $version";
// 	system "git push origin --tags";
// }

// sub update
// {
// 	my $release = shift;
// 	my $dist    = "$CWD/dist";
// 	my $code    = "$CWD/../code/docs/x_ite/$release";

// 	say "Uploading $release";

// 	system "rm -r '$code'";
// 	system "cp -r '$dist' '$code'";
// 	system "cp -r '$dist' '$code/dist'" if $release eq "latest";
// }

// sub upload
// {
// 	return if $NO_GIT;

// 	my $code = "$CWD/../code";

// 	chdir $code;

// 	system "git add -A";
// 	system "git commit -am 'Published version $VERSION'";
// 	system "git push origin";

// 	chdir $CWD;
// 	system "npm publish";
// }

// sub other {
// 	my $result = system "zenity --question '--text=Do want to publish new versions for x3d-tidy and Sunrize?' --ok-label=Yes --cancel-label=No";

// 	return unless $result == 0;

// 	chdir "$CWD/../media";
// 	system "npm run release";

// 	chdir "$CWD/../x3d-tidy";
// 	system "npm run release";

// 	chdir "$CWD/../x3d-image";
// 	system "npm run release";

// 	chdir "$CWD/../sunrize";
// 	system "npm run release";

// 	chdir $CWD;
// }
