#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use File::Basename;

sub tags {
   $filename = shift;
   chomp $filename;

   return unless $filename =~ /\.md$/;

   say $filename;

   $text = `cat "$filename"`;
   $text =~ /tags:\s*\[(.*?)\]/;
   $tags = join ", ", map {lc} split /,\s*/, $1;
   $text =~s/tags:\s*\[(.*?)\]/tags: [$tags]/;

   open FILE, ">", $filename;
   print FILE $text;
   close FILE;
}

$posts = "/Users/holger/Desktop/X_ITE/x_ite/docs/_posts";

tags $_ foreach sort `find $posts -type f`;
