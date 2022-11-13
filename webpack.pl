#!/usr/bin/perl
use strict;
use warnings;
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use File::Basename qw (dirname basename);
use File::Slurper qw (read_text);
use File::Spec;
use List::Util qw (reduce);

my $CWD = `pwd`;
chomp $CWD;

say $CWD;

sub defines {
   my $filename = shift;
   my $dirname = dirname ($filename);
   my $string = shift;
   my @files = split /\s*,\s*/, $string;

   for (@files)
   {
      s/^"|"$//sg;

      /([^\/]+)$/;

      my $name = $1;
      my $def = "/Users/holger/Desktop/X_ITE/x_ite/src/" . $_;

      $_ = File::Spec -> abs2rel ($def, $dirname);

      $_ = "./" . $_ unless /^\./;

      $_ = "import " . $name . " from \"" . $_ . ".js\";";
   }

   return join "\n", @files;
}

sub convert {
   my $filename = shift;
   chomp $filename;
   #say $filename;

   my $file = read_text ($filename);

   $file =~s/"use strict";\s*//s;

   my @lines = split "\n", $file;
   s/^ {3}// for @lines;
   $file = join "\n", @lines;

   $file =~ s/\}\);\s*$//s;
   $file =~ s/(^.*)return\s+(.*?);\s*$/$1export default $2;/s;
   $file =~ s/function\s*\(.*?\)\s*\{\s*//s;

   $file =~ s/define\s*\(\s*\[\s*(.*?)\s*\]\s*,\s*/defines ($filename, $1) . "\n\n"/se;
   $file =~ s/define\s*\(\s*//s;

   $file .= "\n";

   open FILE, ">", $filename;
   print FILE $file;
   close FILE;

   print $file if $filename =~ /Bezier|Matrix4|DEBUG/;
}

sub tidy {
   my $filename = shift;
   chomp $filename;
   #say $filename;

   my $file = read_text ($filename);

   my @matches = ($file =~ /import\s+([^\s]+)\s*/sg);

   return unless @matches;

   my $l = reduce { $a > $b ? $a : $b } map { length } @matches;

   $file =~ s/import\s+([^\s]+)/"import " . $1 . " " x ($l - length ($1) + 1)/sge;

   open FILE, ">", $filename;
   print FILE $file;
   close FILE;

   say $file if $filename =~ /Bezier|Matrix4|DEBUG/;
}

#convert $_ foreach `find src/standard -type f -name "*.js"`;
#convert $_ foreach `find src/x_ite    -type f -name "*.js"`;
#convert $_ foreach `find src/lib/nurbs    -type f -name "*.js"`;

tidy $_ foreach `find src -type f -name "*.js"`;
