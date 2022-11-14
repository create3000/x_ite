#!/usr/bin/perl
use strict;
use warnings;
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use File::Basename qw (dirname basename);
use File::Slurper qw (read_text);
use List::Util qw (reduce any);

my @components = map { chomp; s/\.js$//; $_ } `ls -C1 src/assets/components/`;

sub includes {
   my $v = shift;

   return unless $v;
   return any { $v eq $_ } @components;
}

my $keys = { };

sub r { $keys = { }; }

sub k {
   my $v = shift;
   $keys -> {$v} = 0 unless exists $keys -> {$v};
   $keys -> {$v} ++;
   return $v . $keys -> {$v};
}

sub namepace {
   my @filenames = @_;
   chomp @filenames;

   @filenames = map { s|src/x_ite|.|; $_ } sort @filenames;

   @filenames = grep { !/IcoSphere/ } @filenames;
   @filenames = grep { !/(Namespace|X3D|X3DCanvas)\.js$/ } @filenames;
   @filenames = grep { !/\.[^.\/]+\.js$/ } @filenames;
   @filenames = grep { m|Components/([^/]+)|; ! includes $1 } @filenames;
   @filenames = grep { m|Browser/([^/]+)|; ! includes $1 } @filenames;

   my $l1      = reduce { $a > $b ? $a : $b } map { length } map { m|.*/([^.]+)|; $1 } @filenames;
   my $file    = read_text ("src/x_ite/Namespace.js");
   my $imports = join "\n", map { m|.*/([^.]+)|; "import " . k($1) . " " x ($l1 - length ($1)) . " from \"$_\";" } @filenames; r ();
   my $l2      = reduce { $a > $b ? $a : $b } map { length } @filenames;
   my $values  = join ",\n   ", map { s/^\./x_ite/; s/\.js$//; m|.*/([^.]+)|; "[\"$_\"," . " " x ($l2 - length ($_) + 1) . " " . k($1) . "]" } @filenames;
   my $text    = <<EOT;
$imports

const Namespace = new Map ([
   $values,
]);

export default Namespace;
EOT

   $file =~ s|(/\*.*?\*/).*|$1\n\n\n$text|sg;

   open FILE, ">", "src/x_ite/Namespace.js";
   print FILE $file;
   close FILE;
}

namepace (`find src/x_ite -type f -name "*.js"`);
