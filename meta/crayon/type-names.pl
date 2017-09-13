#!/usr/bin/perl
# -*- Mode: Perl; coding: utf-8; tab-width: 3; indent-tabs-mode: t; c-basic-offset: 3 -*-

use strict;
use warnings;
use v5.10.0;
use open qw/:std :utf8/;

use Glib;

sub main
{
	my $keyfile = new Glib::KeyFile ();

	$keyfile -> load_from_data (join ("", `titania --list=nodes 2>/dev/null`), "none");

	my @typeNames = grep { $keyfile -> get_string ($_, "componentName") ne "Titania" } $keyfile -> get_groups ();

	say "Generating type-names.txt";
	print `pwd`;

	open FILE, ">", "type-names.txt";

	say FILE $_
		foreach @typeNames;

	say scalar @typeNames, " types";

	close FILE;
}

main ();

