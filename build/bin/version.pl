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
	system "git", "push", "github";
}

sub publish
{
	my $version = shift;

	system "git", "tag", "--delete", "$version";
	system "git", "push", "--delete", "origin", "$version";
	system "git", "push", "--delete", "github", "$version";

	system "git", "tag", "$version";
	system "git", "push", "origin", "--tags";
	system "git", "push", "github", "--tags";
}

sub rsync
{
	my $release = shift;
	my $local   = "/home/holger/Projekte/X_ITE/dist";
	my $ftp     = "/html/create3000.de/code/htdocs/x_ite";
	my $host    = "alfa3008.alfahosting-server.de";
	my $user    = netruser ($host);

	say "Uploading $release";

	#system "mkdir", "-p", "$ftp/$release/dist/";
	#system "rsync", "-r", "-x", "-c", "-v", "--progress", "--delete", "$local/", "$ftp/$release/dist/";

	system "lftp", "-e", "mkdir -p $ftp/$release/dist; bye", "ftp://$user\@$host";
	system "lftp", "-e", "mirror --reverse --delete --use-cache --verbose $local $ftp/$release/dist; bye", "ftp://$user\@$host";
}

sub netuser
{
	my $host  = shift;
	my $netrc = `cat ~/.netrc`;

	$netrc =~ /machine\s+$host\s+login\s+(\w+)/;

	return $1;
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
		publish ("$VERSION");
		publish ("latest");
	}

	# FTP

	rsync ("alpha");

	unless ($ALPHA)
	{
		rsync ("latest");
		rsync ($VERSION);
	}
}
