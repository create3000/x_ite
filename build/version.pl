#!/usr/bin/perl
# -*- Mode: Perl; coding: utf-8; tab-width: 3; indent-tabs-mode: t; c-basic-offset: 3 -*-

use strict;
use warnings;
use v5.10.0;
use open qw/:std :utf8/;

my $CWD = `pwd`;
chomp $CWD;

say $CWD;

my $VERSION;
$VERSION = `cat package.json`;
$VERSION =~ /"version":\s*"(.*?)"/;
$VERSION = $1;

my $REVISION;
$REVISION = `cat package.json`;
$REVISION =~ /"revision":\s*"(.*?)"/;
$REVISION = $1 + 1;

sub commit {
	my $version = shift;

	system "git", "commit", "-am", "Published version $VERSION-$REVISION";
	system "git", "push";
	system "git", "push", "origin";
	system "git", "push", "github";
}

sub publish {
	my $version = shift;

	system "git", "tag", "--delete", "$version";
	system "git", "push", "--delete", "origin", "$version";
	system "git", "push", "--delete", "github", "$version";

	system "git", "tag", "$version";
	system "git", "push", "origin", "--tags";
	system "git", "push", "github", "--tags";
}

if ($VERSION =~ /a$/)
{
	system "zenity", "--error", "--text=Cannot publish version $VERSION!", "--ok-label=Ok";
	exit;
}

my $result = system "zenity", "--question", "--text=Do you really want to publish X-ITE X3D v$VERSION-$REVISION now?", "--ok-label=Yes", "--cancel-label=No";

if ($result == 0)
{
	say "Publishing X-ITE X3D v$VERSION-$REVISION now.";

	system "perl", "-pi", "-e", "s|\"revision\":\\s*\"(.*?)\"|\"revision\": \"$REVISION\"|sg", "package.json";

	my $css = `cat dist/x-ite.css`;
	open CSS, ">", "dist/x-ite.css";
	print CSS "/* X-ITE v$VERSION-$REVISION */", $css;
	close CSS;

	my $js = `cat dist/x-ite.js`;
	open JS, ">", "dist/x-ite.js";
	print JS "/* X-ITE v$VERSION-$REVISION */\n\n", $js;
	close JS;

	my $js = `cat dist/x-ite.min.js`;
	open JS, ">", "dist/x-ite.min.js";
	print JS "/* X-ITE X3D v$VERSION-$REVISION\n * See LICENCES.txt for a detailed listing of used licences. */\n", $js;
	close JS;

	# GitHub

	commit;
	publish ("$VERSION");
	publish ("latest");

	# FTP

	my $ftp = "/run/user/1000/gvfs/ftp:host=create3000.de/html/create3000.de/code/htdocs/x-ite/$VERSION/dist/";

	system "mkdir", "-p", $ftp;
	system "rsync", "-r", "-x", "-c", "-v", "--progress", "--delete", "/home/holger/Projekte/X-ITE/dist/", $ftp;

	my $latest = "/run/user/1000/gvfs/ftp:host=create3000.de/html/create3000.de/code/htdocs/x-ite/latest/dist/";

	system "mkdir", "-p", $latest;
	system "rsync", "-r", "-x", "-c", "-v", "--progress", "--delete", "/home/holger/Projekte/X-ITE/dist/", $latest;
}
