#!/usr/bin/perl
# -*- Mode: Perl; coding: utf-8; tab-width: 3; indent-tabs-mode: t; c-basic-offset: 3 -*-

use strict;
use warnings;
use v5.10.0;
use open qw/:std :utf8/;

my $VERSION = `cat package.json`;
$VERSION =~ /"version":\s*"(.*?)"/;
$VERSION = $1;

my $BROWSER = `cat src/excite/Browser/VERSION.js`;
$BROWSER =~ s/"(.*?)"/"$VERSION "/;

open BROWSER, ">", "src/excite/Browser/VERSION.js";
print BROWSER $BROWSER;
close $BROWSER;
