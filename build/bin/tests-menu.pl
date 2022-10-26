#!/usr/bin/perl
use strict;
use warnings;
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use File::Basename;

my @files = sort { "\U$a" cmp "\U$b" } `find src/tests -type f -name "*.x3d" -o -name "*.x3dv"`;

chomp @files;

open FILE, ">", "src/tests/menu.js";

say FILE <<EOT;
(async function ()
{
   const menu = {
      "tests": {
         "name": "Tests",
         "items": {
EOT

my $n = 0;

for my $file (@files)
{
   ++ $n;

   $file =~ s|src/||;

   my $basename = basename $file;

   say FILE <<EOT;
"file-$n": {
   "name": "$basename",
   "callback": function (event)
   {
      window .loadURL ("$file");
   },
},
EOT
}

say FILE <<EOT;
         },
      }
   };

   await X3D ();

   X3D .getBrowser () .getContextMenu () .setUserMenu (() => menu);
})();
EOT

close FILE;
