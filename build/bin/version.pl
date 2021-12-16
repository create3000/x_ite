#!/usr/bin/perl
# -*- Mode: Perl; coding: utf-8; tab-width: 3; indent-tabs-mode: t; c-basic-offset: 3 -*-

use strict;
use warnings;
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;

my $CWD = cwd;
say $CWD;

my $VERSION;
$VERSION = `cat package.json`;
$VERSION =~ /"version":\s*"(.*?)"/;
$VERSION = $1;

my $ALPHA = $VERSION =~ /a$/;

my $REVISION;
$REVISION = `cat package.json`;
$REVISION =~ /"revision":\s*"(.*?)"/;
$REVISION = $1 + 1;

sub commit
{
	my $version = shift;

	system "git", "commit", "-am", "Published version $VERSION-$REVISION";
	system "git", "push";
	system "git", "push", "origin";
}

sub publish
{
	my $version = shift;

	system "git", "tag", "--delete", "$version";
	system "git", "push", "--delete", "origin", "$version";

	system "git", "tag", "$version";
	system "git", "push", "origin", "--tags";
}

sub update
{
	my $release = shift;
	my $dist    = "$CWD/dist";
	my $code    = "$CWD/../code/docs/x_ite/$release";

	say "Uploading $release";

	system "rm", "-r", "$code/dist";

	system "mkdir", "-p", $code;
	system "cp", "-r", $dist, "$code/dist";
}

sub upload
{
	my $code = "$CWD/../code";

	chdir $code;

	system "git", "add", "-A";
	system "git", "commit", "-am", "Published version $VERSION-$REVISION";
	system "git", "push";
	system "git", "push", "origin";
}

sub docs
{
	my $VERSION = shift;

	my $config = `cat '$CWD/docs/_config.yml'`;

	$config =~ s|/bio:\s*"Version .*?"|/bio: "Version $VERSION"|sgo;

	open CONFIG, ">", "$CWD/docs/_config.yml";
	print CONFIG $config;
	close CONFIG;
}

sub wiki
{
	my $VERSION = shift;

	chdir "$CWD/../x_ite.wiki/";

	my $home = `cat 'Home.md'`;

	$home =~ s|/x_ite/\d+\.\d+\.\d+/dist/|/x_ite/$VERSION/dist/|sgo;

	open HOME, ">", "Home.md";
	print HOME $home;
	close HOME;

	system "git", "add", "-A";
	system "git", "commit", "-am", "Updated Home.md because of new version '$VERSION'";
	system "git", "push";
	system "git", "push", "origin";
}

my $result = system "zenity", "--question", "--text=Do you really want to publish X_ITE X3D v$VERSION-$REVISION now?", "--ok-label=Yes", "--cancel-label=No";

if ($result == 0)
{
	say "Publishing X_ITE X3D v$VERSION-$REVISION now.";

	# Increment revision number.
	system "perl", "-pi", "-e", "s|\"revision\":\\s*\"(.*?)\"|\"revision\": \"$REVISION\"|sg", "package.json";

	# GitHub

	commit;

	unless ($ALPHA)
	{
		publish ($VERSION);
		publish ("latest");
	}

	# code

	update ("alpha");

	unless ($ALPHA)
	{
		update ("latest");
		update ($VERSION);
	}

	upload;

	# docs

	docs ($VERSION) unless $ALPHA;

	# Wiki

	wiki ($VERSION) unless $ALPHA;
}
