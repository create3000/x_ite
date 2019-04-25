#!/usr/bin/perl
# -*- Mode: Perl; coding: utf-8; tab-width: 3; indent-tabs-mode: t; c-basic-offset: 3 -*-

use strict;
use warnings;
use v5.10.0;
use open qw/:std :utf8/;

use File::Basename qw (dirname basename);

my $CWD = `pwd`;
chomp $CWD;

say $CWD;

my $VERSION;
my $ALPHA;
my $REVISION;

sub check_version {
	$VERSION = `cat package.json`;
	$VERSION =~ /"version":\s*"(.*?)"/;
	$VERSION = $1;

	$ALPHA = $VERSION =~ /a$/;

	$REVISION = `cat package.json`;
	$REVISION =~ /"revision":\s*"(.*?)"/;
	$REVISION = $1 + 1;

	say "VERSION »$VERSION«";

	my $BROWSER = `cat src/x_ite/Browser/VERSION.js`;
	$BROWSER =~ s/"(.*?a?)"/"$VERSION"/;

	open BROWSER, ">", "src/x_ite/Browser/VERSION.js";
	print BROWSER $BROWSER;
	close $BROWSER;
}

sub shader_source {
	my $filename = shift;

	my $dirname = dirname ($filename);
	my @lines   = `cat $filename`;
	my $source  = "";

	foreach my $line (@lines)
	{
		if ($line =~ /^#pragma\s+X3D\s+include\s+"(.*?[^\/]+\.h)"\s*$/)
		{
			$source .= shader_source ("$dirname/$1");
		}
		else
		{
			$line =~ s|^\s+||;

			$source .= $line;
		}
	}

	$source =~ s|//.*?\n|\n|sg;
	$source =~ s|/\*.*?\*/||sg;
	$source =~ s|[ \t]+| |sg;
	$source =~ s|\n+|\n|sg;

	return $source;
}

sub shader {
	my $filename = shift;
	my $dist     = shift;
	chomp $filename;

	return if -d $filename;

	my $basename = basename ($filename);
	my $source   = shader_source $filename;

	open FILE, ">", "$dist/$basename";
	print FILE $source;
	close FILE;
}

sub shaders {
	shader ("src/assets/shaders/webgl1/$_", "dist/assets/shaders/webgl1") foreach `ls -C1 src/assets/shaders/webgl1`;
	shader ("src/assets/shaders/webgl2/$_", "dist/assets/shaders/webgl2") foreach `ls -C1 src/assets/shaders/webgl2`;
}

sub dist {
	my $css = `cat dist/x_ite.css`;
	open CSS, ">", "dist/x_ite.css";
	print CSS "/* X_ITE v$VERSION-$REVISION */", $css;
	close CSS;

	my $js = `cat dist/x_ite.js`;
	open JS, ">", "dist/x_ite.js";
	print JS "/* X_ITE v$VERSION-$REVISION */\n\n", $js;
	close JS;

	my $js_min = `cat dist/x_ite.min.js`;
	open JS, ">", "dist/x_ite.min.js";
	print JS "/* X_ITE X3D v$VERSION-$REVISION\n * See LICENSE.txt for a detailed listing of used licences. */\n", $js_min;
	close JS;

	$css = `cat dist/x_ite.css`;
	open CSS, ">", "dist/x_ite.css";
	$css =~ s/content: "X_ITE Browser";/content: "X_ITE Browser v$VERSION";/;
	print CSS $css;
	close CSS;

	say "Copying files";
	system "rsync", "-r", "-x", "-c", "-v", "-t", "--progress", "--delete", "src/assets/fonts",    "dist/assets/";
	system "rsync", "-r", "-x", "-c", "-v", "-t", "--progress", "--delete", "src/assets/hatching", "dist/assets/";
	system "rsync", "-r", "-x", "-c", "-v", "-t", "--progress", "--delete", "src/assets/images",   "dist/assets/";
	system "rsync", "-r", "-x", "-c", "-v", "-t", "--progress", "--delete", "src/assets/linetype", "dist/assets/";
	system "cp", "-v", "src/example.html",  "dist/";

	system "perl", "-pi", "-e", "s|/latest/|/alpha/|sg", "dist/example.html" if $ALPHA;
	system "perl", "-pi", "-e", "s|/latest/|/$VERSION/|sg", "dist/example.html" unless $ALPHA;

	shaders;
}

sub licenses {
	my $min = `cat 'dist/x_ite.min.js'`;

	$min =~ m!^((?:\s+|/\*.*?\*/|//.*?\n)+)!sg;

	my $licenses = $1;

	$min =~ s!^((?:\s+|/\*.*?\*/|//.*?\n)+)!!sg;

	open MIN, ">", "dist/x_ite.min.js";
	print MIN $min;
	close MIN;

	open LICENSE, ">", "dist/LICENSE.txt";
	say LICENSE `cat src/LICENSE.txt`;
	print LICENSE $licenses;
	close LICENSE;
}

sub zip {
	my $ZIP_DIR = "x_ite-$VERSION";

	system "cp", "-r", "dist", $ZIP_DIR;

	system "zip", "-x", "*.mdproj", "-x", "*.zip", "-r", "$ZIP_DIR.zip", $ZIP_DIR;
	system "mv", "-v", "$ZIP_DIR.zip", "dist/x_ite.zip";

	system "rm", "-v", "-r", $ZIP_DIR;
}

check_version;

say "Making version '$VERSION' now.";

shaders;
exit;

licenses;
dist;
zip;
