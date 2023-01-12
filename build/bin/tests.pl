#!/usr/bin/perl
use strict;
use warnings;
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use File::Basename;

sub examples
{
   my @folders = sort { "\U$a" cmp "\U$b" } `find ../media/docs/examples -type d -maxdepth 2`;

   chomp @folders;

   open FILE, ">", "src/examples.js";
   say FILE "const X_ITE_EXAMPLES = [";

   my $component = "";

   for my $folder (@folders)
   {
      my $basename = basename $folder;

      next unless -f "$folder/$basename.x3d";

      $folder =~ s|../media/docs/examples/||;
      $folder =~ m|^([^/]+)/([^/]+)|;

      say FILE "   { component: \"$1\", test: \"$2\" },",
   }

   say FILE  <<EOT;
];
X_ITE_EXAMPLES .server = "https://create3000.github.io/media/examples";
EOT

   close FILE
}

sub tests
{
   my @files = sort { "\U$a" cmp "\U$b" } `find /Volumes/Home/Projekte/Library/Tests -type f -name "*.x3d" -o -name "*.x3dz" -o -name "*.x3dj" -o -name "*.x3djz" -o -name "*.x3dv" -o -name "*.x3dvz" -o -name "*.wrl"`;

   chomp @files;

   open FILE, ">", "src/tests.js";
   say FILE "const X_ITE_TESTS = [";

   my $component = "";

   for my $file (@files)
   {
      next unless $file =~ /Components/;

      $file =~ s|/Volumes/Home/Projekte/Library/Tests/Components/||;
      $file =~ m|^([^/]+)|;

      if ($component ne $1)
      {
         $component = $1;
         say FILE "   { component: \"$component\" },";
      }

      say FILE "   { path: \"$file\" },";
   }

   say FILE  <<EOT;
];
X_ITE_TESTS .server = "https://rawgit.com/create3000/Library/main/Tests/Components";
EOT

   close FILE
}

sub menu {
   my @files = sort { "\U$a" cmp "\U$b" } `find src/tests -type f -name "*.x3d" -o -name "*.x3dv" -o -name "*.gltf"`;

   chomp @files;

   open FILE, ">", "src/tests/menu.js";

   say FILE <<EOT;
function createTestMenu ()
{
   return {
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
      X3D .getBrowser () .loadURL (new X3D .MFString ("$file"));
   },
},
EOT
   }

   say FILE <<EOT;
         },
      }
   };
}
EOT

   close FILE;
}

examples;
tests;
menu;
