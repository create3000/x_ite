#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;

sub node {
   $filename = shift;
   chomp $filename;

   $filename =~ m|([^/]+)/([^/]+)\.js$|o;

   $componentName = $1;
   $typeName      = $2;

   return if $componentName =~ /^Annotation$/o;
   return if $typeName =~ /^X3D/o;

   #return unless $typeName =~ /^Delay$/o;
   say "$componentName $typeName";

   $md     = "$cwd/docs/_posts/components/$componentName/$typeName.md";
   $file   = `cat $md`;
   @fields = map { /\*\*(.*?)\*\*/o; $_ = $1 } $file =~ /###\s*[SM]F\w+.*/go;

   fill_empty_field ($_, $file) foreach @fields;
}

sub fill_empty_field {
   $name = shift;
   $file = shift;

   return unless $file =~ m|###.*?\*\*$name\*\*.*?[\s\n]+###|;

   say "  $name";
}

$cwd = getcwd ();

node $_ foreach sort `find $cwd/src/x_ite/Components -type f -mindepth 2`;
