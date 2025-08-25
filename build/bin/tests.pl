#!/usr/bin/perl
use strict;
use warnings;
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use File::Basename;
use JSON::Parse qw(parse_json);

my $json   = `cat ../media/docs/examples/config.json`;
my $config = parse_json ($json);
my $tree   = { };

$tree -> {$_ -> {component}} = { } foreach @$config;
$tree -> {$_ -> {component}} -> {$_ -> {name}} = $_ foreach @$config;

sub examples
{
   my @folders = sort { "\U$a" cmp "\U$b" } `find ../media/docs/examples -type d -maxdepth 2`;

   chomp @folders;

   open FILE, ">", "src/examples.js";
   say FILE "const X_ITE_EXAMPLES = [";

   for my $folder (@folders)
   {
      my $basename = basename $folder;

      next unless -f "$folder/$basename.x3d";

      $folder =~ s|../media/docs/examples/||;
      $folder =~ m|^([^/]+)/([^/]+)|;

      my $component = $1;
      my $typeName  = $2;
      my $extra     = "";

      $extra .= ", xrButtonPosition: \"$tree->{$component}->{$typeName}->{xrButtonPosition}\""
         if $tree -> {$component} -> {$typeName} -> {"xrButtonPosition"};

      say FILE "   { component: \"$component\", test: \"$typeName\"$extra },",
   }

   say FILE  <<EOT;
];
X_ITE_EXAMPLES .server = "https://create3000.github.io/media/examples";
EOT

   close FILE
}

sub tests
{
   my @files = sort { "\U$a" cmp "\U$b" } grep !m|/\.|, `find /Volumes/Home/Projekte/Library/Tests -type f -name "*.x3d" -o -name "*.x3dz" -o -name "*.x3dj" -o -name "*.x3djz" -o -name "*.x3dv" -o -name "*.x3dvz" -o -name "*.wrl"`;

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
X_ITE_TESTS .server = "https://create3000.github.io/Library/Tests/Components";
EOT

   close FILE
}

sub menu {
   my @files = sort `find -L src/tests -type f -name "*.x3d" -o -name "*.x3dz" -o -name "*.x3dv" -o -name "*.x3dvz" -o -name "*.x3dj" -o -name "*.x3djz" -o -name "*.gltf" -o -name "*.glb" -o -name "*.obj" -o -name "*.stl" -o -name "*.svg"`;

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
      say $file;

      ++ $n;

      $file =~ s|src/||;

      my $basename = basename $file;
      my $dirname  = basename dirname $file;

      say FILE <<EOT;
"file-$n": {
   "name": "$dirname/$basename",
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

# sub menu {
#    my $items = submenu ("src/tests");

#    open FILE, ">", "src/tests/menu.js";

#    say FILE <<EOT;
# function createTestMenu ()
# {
#    return {
#       "tests": {
# $items
#       }
#    };
# }
# EOT

#    close FILE;
# }

# sub submenu {
#    my $folder  = shift;
#    my @folders = sort { "\U$a" cmp "\U$b" } `find '$folder' -type d -maxdepth 1`;
#    my @files   = sort { "\U$a" cmp "\U$b" } `find -L '$folder' -type f -maxdepth 1 -name "*.x3d" -o -name "*.x3dz" -o -name "*.x3dv" -o -name "*.x3dvz" -o -name "*.x3dj" -o -name "*.x3djz" -o -name "*.gltf" -o -name "*.glb" -o -name "*.obj" -o -name "*.stl" -o -name "*.svg"`;

#    chomp @folders;
#    chomp @files;

#    my $title = ucfirst basename ($folder);
#    my $items = "";
#    my $n     = 0;

#    $items .= <<EOT;
# "name": "$title",
# "items": {
# EOT

#    for my $f (grep { $_ ne $folder } @folders)
#    {
#       my $item = submenu ($f);

#       ++ $n;

#       $items .= <<EOT;
# "item-$n": {
# $item
# },
# EOT
#    }

#    for my $file (@files)
#    {
#       ++ $n;

#       $file =~ s|src/||;

#       my $basename = basename $file;

#       $items .= <<EOT;
# "item-$n": {
#    "name": "$basename",
#    "callback": function (event)
#    {
#       X3D .getBrowser () .loadURL (new X3D .MFString ("$file"));
#    },
# },
# EOT
#    }

#    $items .= <<EOT;
# },
# EOT

#    return $items;
# }

examples;
tests;
menu;
