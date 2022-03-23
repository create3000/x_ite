#!/usr/bin/perl
# -*- Mode: Perl; coding: utf-8; tab-width: 3; indent-tabs-mode: t; c-basic-offset: 3 -*-

use strict;
use warnings;
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

sub check_version {
	my $VERSION = `cat package.json`;
	$VERSION =~ /"version":\s*"(.*?)"/;
	$VERSION = $1;

	say $VERSION;

	my $BROWSER = `cat src/x_ite/Browser/VERSION.js`;
	$BROWSER =~ s/"(.*?a?)"/"$VERSION"/;

	open BROWSER, ">", "src/x_ite/Browser/VERSION.js";
	print BROWSER $BROWSER;
	close $BROWSER;
}

check_version;
