#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;

sub node {
   $filename = shift;
   chomp $filename;

   $filename =~ m|([^/]+)/([^/]+)\.js$|;

   $componentName = $1;
   $typeName      = $2;

   return if $componentName =~ /^Annotation$/;
   return if $typeName =~ /^X3D/;

   return unless $typeName =~ /^Transform$/;
   say "$componentName $typeName";

}

$cwd = getcwd ();

node $_ foreach sort `find $cwd/src/x_ite/Components -type f -mindepth 2`;
