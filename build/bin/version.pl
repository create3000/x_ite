#!/usr/bin/perl
use strict;
use warnings;
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;

my $NO_GIT = 0;

# https://github.com/desktop/desktop/issues/14331#issuecomment-1286747195
# Set post buffer to 250 MiB.
system "git config --global http.postBuffer 262144000";

my $CWD = cwd;
say $CWD;

my $VERSION = `npm pkg get version | sed 's/"//g'`;
chomp $VERSION;

exit 1 unless $VERSION;

my $ALPHA = $VERSION =~ /a$/;

sub docs
{
	my $VERSION = shift;

	my $config        = `cat '$CWD/docs/_config.yml'`;
	my $contentLength = `gzip -5 dist/x_ite.min.js --stdout | wc -c`;

	$contentLength =~ s/^\s+|\s+$//sg;
	$contentLength = int ($contentLength / 1000);

	$config =~ s|\bversion:\s*[\d\.]+|version: $VERSION|sgo;
	$config =~ s|\bsize:\s*[\d\.]+|size: $contentLength|sgo;

	open CONFIG, ">", "$CWD/docs/_config.yml";
	print CONFIG $config;
	close CONFIG;
}

sub commit
{
	return if $NO_GIT;

	my $version = shift;

	system "git commit -am 'Published version $VERSION'";
	system "git push origin";
}

sub publish
{
	return if $NO_GIT;

	my $version = shift;

	system "git tag --delete $version";
	system "git push --delete origin $version";

	system "git tag $version";
	system "git push origin --tags";
}

sub update
{
	my $release = shift;
	my $dist    = "$CWD/dist";
	my $code    = "$CWD/../code/docs/x_ite/$release";

	say "Uploading $release";

	system "rm -r '$code'";
	system "cp -r '$dist' '$code'";
	system "cp -r '$dist' '$code/dist'" if $release eq "latest";
}

sub upload
{
	return if $NO_GIT;

	my $code = "$CWD/../code";

	chdir $code;

	system "git add -A";
	system "git commit -am 'Published version $VERSION'";
	system "git push origin";

	chdir $CWD;
	system "npm publish";
}

sub other {
	my $result = system "zenity --question '--text=Do want to publish new versions for x3d-tidy and Sunrize?' --ok-label=Yes --cancel-label=No";

	return unless $result == 0;

	chdir "$CWD/../media";
	system "make publish";

	chdir "$CWD/../x3d-tidy";
	system "npm run publish";

	chdir "$CWD/../x3d-image";
	system "npm run publish";

	chdir "$CWD/../sunrize";
	system "npm run publish";

	chdir $CWD;
}

if (`git branch --show-current` ne "development\n")
{
	say "Wrong branch, must be development, cannot release version!";
	exit 1;
}

say "Waiting for confirmation ...";

my $result = system "zenity --question '--text=Do you really want to publish X_ITE X3D v$VERSION now?' --ok-label=Yes --cancel-label=No";

exit 1 unless $result == 0;

say "Publishing X_ITE X3D v$VERSION now.";

system "npm run docs-components";
system "npm run docs-nodes";
system "npm run glTF-samples";
system "git add -A";
system "git commit -am 'Build version $VERSION'";
system "git push origin";
system "git checkout main";
system "git merge development";

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

# switch to development branch

system "git checkout development";
system "git merge main";
system "git push origin";

# publish x3d-tidy and sunrize

other unless $ALPHA;
