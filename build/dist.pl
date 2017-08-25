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

sub check_version {
	$VERSION = `cat package.json`;
	$VERSION =~ /"version":\s*"(.*?)"/;
	$VERSION = $1;

	say "VERSION »$VERSION«";

	my $BROWSER = `cat src/excite/Browser/VERSION.js`;
	$BROWSER =~ s/"(.*?)"/"$VERSION"/;

	open BROWSER, ">", "src/excite/Browser/VERSION.js";
	print BROWSER $BROWSER;
	close $BROWSER;
}

sub dist {
	system "cp", "-v", "-r", "src/images",  "dist/";
	system "cp", "-v", "src/example.html",  "dist/";
	system "perl", "-pi", "-e", "s|/latest/|/$VERSION/|sg", "dist/example.html";
}

sub licenses {
	my $min = `cat 'dist/excite.min.js'`;

	$min =~ m!^((?:\s+|/\*.*?\*/|//.*?\n)+)!sg;

	my $licenses = $1;

	$min =~ s!^((?:\s+|/\*.*?\*/|//.*?\n)+)!!sg;

	open MIN, ">", "dist/excite.min.js";
	print MIN $min;
	close MIN;

	open LICENCES, ">", "dist/LICENCES.txt";
	say LICENCES `cat src/LICENSE.txt`;
	print LICENCES $licenses;
	close LICENCES;
}

sub zip {
	my $ZIP_DIR = "excite-$VERSION";

	system "cp", "-r", "dist", $ZIP_DIR;

	system "zip", "-x", "*.mdproj", "-x", "*.zip", "-r", "$ZIP_DIR.zip", $ZIP_DIR;
	system "mv", "-v", "$ZIP_DIR.zip", "dist/excite.zip";

	system "rm", "-v", "-r", $ZIP_DIR;
}

check_version;
exit if $VERSION =~ /a$/;

say "Making version '$VERSION' now.";

dist;
licenses;
zip;
