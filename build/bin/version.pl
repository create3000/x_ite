#!/usr/bin/perl
use strict;
use warnings;
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;

my $NO_GIT = 0;

# https://github.com/desktop/desktop/issues/14331#issuecomment-1286747195
# Set post buffer to 150 MiB.
system "git", "config", "--global", "http.postBuffer", "157286400";

my $CWD = cwd;
say $CWD;

my $VERSION = `npm pkg get version | sed 's/"//g'`;
chomp $VERSION;

exit 1 unless $VERSION;

my $ALPHA = $VERSION =~ /a$/;

sub commit
{
	return if $NO_GIT;

	my $version = shift;

	system "git", "commit", "-am", "Published version $VERSION";
	system "git", "push", "origin";
}

sub publish
{
	return if $NO_GIT;

	my $version = shift;

	system "git", "tag", "--delete", $version;
	system "git", "push", "--delete", "origin", $version;

	system "git", "tag", $version;
	system "git", "push", "origin", "--tags";
}

sub update
{
	my $release = shift;
	my $dist    = "$CWD/dist";
	my $code    = "$CWD/../code/docs/x_ite/$release";

	say "Uploading $release";

	system "rm", "-r", $code;
	system "cp", "-r", $dist, $code;
	system "ln", "-s", $code, "$code/dist" if $release eq "latest";
}

sub upload
{
	return if $NO_GIT;

	my $code = "$CWD/../code";

	chdir $code;

	system "git", "add", "-A";
	system "git", "commit", "-am", "Published version $VERSION";
	system "git", "push", "origin";
}

sub docs
{
	my $VERSION = shift;

	my $config = `cat '$CWD/docs/_config.yml'`;

	$config =~ s|version:\s*[\d\.]+|version: $VERSION|sgo;

	open HOME, ">", "$CWD/docs/_config.yml";
	print HOME $config;
	close HOME;
}

say "Waiting for confirmation ...";

my $result = system "zenity", "--question", "--text=Do you really want to publish X_ITE X3D v$VERSION now?", "--ok-label=Yes", "--cancel-label=No";

if ($result == 0)
{
	say "Publishing X_ITE X3D v$VERSION now.";

	# docs

	docs ($VERSION) unless $ALPHA;

	# tags

	commit;

	publish ("alpha");
	publish ($VERSION) unless $ALPHA;
	publish ("latest") unless $ALPHA;

	# code

	update ("alpha");
	update ("latest") unless $ALPHA;

	upload;
}
