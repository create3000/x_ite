#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;

say "Updating glTF examples ...";

$cwd = getcwd ();

$script  = $cwd . "/docs/assets/laboratory/gltf-sample-viewer/gltf-sample-viewer.mjs";
$viewer  = `cat $script`;
$random  = $cwd . "/../media/docs/glTF/";
$samples = "/Volumes/Home/X3D/glTF/";
$media   = "https://create3000.github.io/media/glTF";
$khronos = "https://raw.githubusercontent.com/KhronosGroup";

sub media {
   say "Getting media files ...";

   @files = `find '$random' -type f  -name "*.gltf" -o -name "*.glb" | sort`;

   my $string = "const models = [\n";

   foreach (map { s|$random||r } @files)
   {
      chomp;
      $string .= "   \"$media/$_\",\n";
   }

   $string .= "];\n";

   return $string;
}

sub glTF {
   my $folders = shift;
   my $suffix  = shift;
   my $var    = shift;

   @all = ();

   foreach $folder (@$folders)
   {
      say "Getting $folder files ...";

      @models = `find '$samples/glTF-Sample-Models/2.0'    -type f -name "*$suffix" -not -path '*/\.*' | grep -i "/$folder/" | sort`;
      @assets = `find '$samples/glTF-Sample-Assets/Models' -type f -name "*$suffix" -not -path '*/\.*' | grep -i "/$folder/" | sort`;
      @files  = (@models, @assets);

      s|/glTF-Sample-Models/|/glTF-Sample-Models/master/| foreach @files;
      s|/glTF-Sample-Assets/|/glTF-Sample-Assets/master/| foreach @files;
      s|$samples/|| foreach @files;

      @files = grep { m|/$folder/|i } @files;
      @all   = (@all, @files);
   }

   my $string = "const $var = [\n";

   foreach (@all)
   {
      chomp;
      $string .= "   \"$khronos/$_\",\n";
   }

   $string .= "];\n";

   return $string;
}

# chdir "$samples/glTF-Sample-Models";
# system "git pull origin";
# chdir "$samples/glTF-Sample-Assets";
# system "git pull origin";

$string = "";
$string .= "// SAMPLES_BEGIN\n\n";
$string .= media;
$string .= "\n";
$string .= glTF (["glTF"], ".gltf", "glTF");
$string .= "\n";
$string .= glTF (["glTF-Binary"], ".glb", "glb");
$string .= "\n";
$string .= glTF (["glTF-Quantized"], ".gltf", "quantized");
$string .= "\n";
$string .= glTF (["glTF-Draco"], ".gltf", "draco");
$string .= "\n";
$string .= glTF (["glTF-Embedded"], ".gltf", "embedded");
$string .= "\n";
$string .= glTF (["glTF-IBL"], ".gltf", "ibl");
$string .= "\n";
$string .= glTF (["glTF-WebP"], ".gltf", "webp");
$string .= "\n";
$string .= glTF (["glTF-KTX", "glTF-KTX-BasisU"], ".gltf", "ktx");
$string .= "\n";
$string .= glTF (["glTF-JPG-PNG"], ".gltf", "jpg");
$string .= "\n// SAMPLES_END";

$viewer =~ s|// SAMPLES_BEGIN.*?// SAMPLES_END|$string|s;

open SCRIPT, ">", $script;
print SCRIPT $viewer;
close PASCRIPTGE;
