#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;

say "Downloading DTD ..." unless -f "/tmp/x3d-4.0.dtd";
system "wget -q --output-document - http://www.web3d.org/specifications/x3d-4.0.dtd > /tmp/x3d-4.0.dtd"
   unless -f "/tmp/x3d-4.0.dtd";
$dtd = `cat /tmp/x3d-4.0.dtd`;

sub node {
   $filename = shift;
   chomp $filename;

   $filename =~ m|([^/]+)/([^/]+)\.js$|o;

   $componentName = $1;
   $typeName      = $2;

   return if $componentName =~ /^Annotation$/o;
   return if $typeName =~ /^X3D/o;

   return unless $dtd =~ /ATTLIST\s+$typeName.*?containerField.*?"(.*?)"/s;

   $containerField = $1;

   say "$componentName $typeName $containerField";

   $file = `cat '$filename'`;
   $file =~ s/(containerField:.*?)".*?"/$1"$containerField"/s;

   open FILE, ">", $filename;
   print FILE $file;
   close FILE;
}

$cwd = getcwd ();

node $_ foreach sort `find $cwd/src/x_ite/Components -type f -mindepth 2`;
