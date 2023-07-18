#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;

say "Updating glTF examples ...";

$cwd = getcwd ();

$page    = $cwd . "/docs/laboratory/gltf-sample-viewer.html";
$viewer  = `cat $page`;
$random  = $cwd . "/../media/docs/glTF/";
$samples = "/Volumes/Home/X3D/glTF/";
$media   = "https://create3000.github.io/media/glTF";
$khronos = "https://raw.githubusercontent.com/KhronosGroup";

sub media {
   say "Getting media files ...";

   @files = `find '$random' -type f  -name "*.gltf" -o -name "*.glb" | sort`;

   my $string = "const models = [\n";

   foreach (map { s|$random/||r } @files)
   {
      chomp;
      $string .= "   \"$media/$_\",\n";
   }

   $string .= "];\n";

   return $string;
}

sub glTF {
   say "Getting glTF files ...";

   @models = `find '$samples/glTF-Sample-Models/2.0'    -type f -name "*.gltf" -not -path '*/\.*' | grep "/glTF/" | sort`;
   @assets = `find '$samples/glTF-Sample-Assets/Models' -type f -name "*.gltf" -not -path '*/\.*' | grep "/glTF/" | sort`;
   @files  = (@models, @assets);

   s|/glTF-Sample-Models/|/glTF-Sample-Models/master/| foreach @files;
   s|/glTF-Sample-Assets/|/glTF-Sample-Assets/master/| foreach @files;

   my $string = "const glTF = [\n";

   foreach (map { s|$samples/||r } @files)
   {
      chomp;
      $string .= "   \"$khronos/$_\",\n";
   }

   $string .= "];\n";

   return $string;
}

sub glb {
   say "Getting glTF-Binary files ...";

   @models = `find '$samples/glTF-Sample-Models/2.0'    -type f -name "*.glb" -not -path '*/\.*' | grep "/glTF-Binary/" | sort`;
   @assets = `find '$samples/glTF-Sample-Assets/Models' -type f -name "*.glb" -not -path '*/\.*' | grep "/glTF-Binary/" | sort`;
   @files  = (@models, @assets);

   s|/glTF-Sample-Models/|/glTF-Sample-Models/master/| foreach @files;
   s|/glTF-Sample-Assets/|/glTF-Sample-Assets/master/| foreach @files;

   my $string = "const glb = [\n";

   foreach (map { s|$samples/||r } @files)
   {
      chomp;
      $string .= "   \"$khronos/$_\",\n";
   }

   $string .= "];\n";

   return $string;
}

sub draco {
   say "Getting glTF-Draco files ...";

   @models = `find '$samples/glTF-Sample-Models/2.0'    -type f -name "*.gltf" -not -path '*/\.*' | grep "/glTF-Draco/" | sort`;
   @assets = `find '$samples/glTF-Sample-Assets/Models' -type f -name "*.gltf" -not -path '*/\.*' | grep "/glTF-Draco/" | sort`;
   @files  = (@models, @assets);

   s|/glTF-Sample-Models/|/glTF-Sample-Models/master/| foreach @files;
   s|/glTF-Sample-Assets/|/glTF-Sample-Assets/master/| foreach @files;

   my $string = "const draco = [\n";

   foreach (map { s|$samples/||r } @files)
   {
      chomp;
      $string .= "   \"$khronos/$_\",\n";
   }

   $string .= "];\n";

   return $string;
}

sub embedded {
   say "Getting glTF-Embedded files ...";

   @models = `find '$samples/glTF-Sample-Models/2.0'    -type f -name "*.gltf" -not -path '*/\.*' | grep "/glTF-Embedded/" | sort`;
   @assets = `find '$samples/glTF-Sample-Assets/Models' -type f -name "*.gltf" -not -path '*/\.*' | grep "/glTF-Embedded/" | sort`;
   @files  = (@models, @assets);

   s|/glTF-Sample-Models/|/glTF-Sample-Models/master/| foreach @files;
   s|/glTF-Sample-Assets/|/glTF-Sample-Assets/master/| foreach @files;

   my $string = "const embedded = [\n";

   foreach (map { s|$samples/||r } @files)
   {
      chomp;
      $string .= "   \"$khronos/$_\",\n";
   }

   $string .= "];\n";

   return $string;
}

chdir "$samples/glTF-Sample-Models";
system "git pull origin";
chdir "$samples/glTF-Sample-Assets";
system "git pull origin";

$string = "";
$string .= "// TESTS_BEGIN\n\n";
$string .= media;
$string .= "\n";
$string .= glTF;
$string .= "\n";
$string .= glb;
$string .= "\n";
$string .= draco;
$string .= "\n";
$string .= embedded;
$string .= "\n// TESTS_END";

$viewer =~ s|// TESTS_BEGIN.*?// TESTS_END|$string|s;

open PAGE, ">", $page;
print PAGE $viewer;
close PAGE;
