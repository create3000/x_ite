#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use File::Basename;

$ref   = "/Users/holger/Desktop/X_ITE/x_ite/docs/_posts/components";
$tut   = "/Users/holger/Desktop/X_ITE/x_ite/docs/_posts/tutorials";
$nav   = "/Users/holger/Desktop/X_ITE/x_ite/docs/_data/nav";
$tabs  = "/Users/holger/Desktop/X_ITE/x_ite/docs/_tabs";
$posts = "/Users/holger/Desktop/X_ITE/x_ite/docs/_posts";

$components = {};

sub node {
   $file = shift;
   chomp $file;

   $text = `cat '$file'`;

   $text =~ /belongs to the \*\*(.*?)\*\*/;
   $component = $1;
   $component =~ s/[\\-]//;

   $text =~ /title: ([^\s]+)/;
   $node = $1;

   say $component, " ", $node;

   $components -> {$component} = [ ] unless $components -> {$component};

   push @{$components -> {$component}}, $node;

#    $fmatter = "---
# title: $node
# date: 2022-01-07
# nav: components-$component
# categories: [components, $component]
# tags: [$node, $component]
# ---
# <style>
# .post h3 {
#   word-spacing: 0.2em;
# }
# </style>
# ";

#    $text =~ s|---.*?---|$fmatter|s;
#    $text =~ s|$node\n=+|## Overview|;
#    $text =~ s|\n(.+?)\n=+|\n## $1|g;
#    $text =~ s/\n(Hints?|Examples?)\n-+/\n### $1/g;
#    $text =~ s|H-Anim|HAnim|g;
#    $text =~ s|Hanim|HAnim|g;
#    $text =~ s|</div></section><section><div>||g;
#    $text =~ s|<section><div>||g;
#    $text =~ s|</div></section>||g;
#    $text =~ s|\\\[mwm-aal-display\\\]\n\n||g;
#    $text =~ s|<pre class="">||g;
#    $text =~ s|</div></section><section><div>||g;
#    $text =~ s|</article><article class="function">||g;
#    $text =~ s|<article class="function">||g;
#    $text =~ s|</article>||g;
#    #$text =~ s|</?small>||g;
#    $text =~ s|\\([\[\]])|$1|g;
#    $text =~ s|&lt;|\\<|g;
#    $text =~ s|&gt;|\\>|g;
#    $text =~ s|\\<(.*?)\\>|`<$1>`|sg;
#    $text =~ s|[\s\n]*$||sg;
#    $text =~ s|(\w)\\(_\w)|$1$2|g;
#    #$text =~ s/"\s*\|\s*"/" | "/g;
#    #$text =~ s/\s*\|\s*\.\.\./ | .../g;
#    #$text =~ s/"\s*,\s*"/", "/g;
#    #$text =~ s/\s*,\s*\.\.\./, .../g;
#    $text =~ s|\bX3DAppearanceChild\b|X3DAppearanceChildNode|g;
#    $text =~ s|Value_changed|value_changed|g;
#    $text =~ s|\[c3-source-example.*?url="(.*?)"\]|<x3d-canvas src="https://create3000.github.io/media/examples/$component/$node/$node.x3d"></x3d-canvas>|g;
#    1 while $text =~ s|\n(\[.*?\]\(.*?\))[ \t]*|\n- $1\n|sg;
#    $text =~ s|\n{2,}|\n\n|sg;
#    $text =~ s|(\[.*?\]\(.*?\))|$1\{:target="_blank"\}|g;
#    $text =~ s|## Browser Compatibility.*?</table>\n\n||s;
#    $text =~ s/http:\/\/(www.web3d.org|www.w3.org|x3dgraphics.com|www.loc.gov|tools.ietf.org|en.wikipedia.org|www.bitmanagement.com|www.iso.org|teem.sourceforge.net)/https:\/\/$1/sg;
#    $text =~ s|\[X3D Specification\]|[X3D Specification of $node]|s;
#    $text =~ s|http://create3000.de/users-guide/components/(.*?)/?\)|/x_ite/components/$1)|sg;
#    $text =~ s|(\[.*?\]\(/x_ite/.*?\))\{.*?\}|$1|sg;
#    $text =~ s|Lineset|LineSet|sg;

#    $text =~ s|https://www.web3d.org/documents/specifications/19775-1/V3.3/|https://www.web3d.org/documents/specifications/19775-1/V4.0/|sg;
#    $text =~s|/Part01/components/env_texture.html|/Part01/components/environmentalTexturing.html|sg;
#    $text =~s|/Part01/components/enveffects.html|/Part01/components/environmentalEffects.html|sg;
#    $text =~s|/Part01/components/envsensor.html|/Part01/components/environmentalSensor.html|sg;
#    $text =~s|/Part01/components/utils.html|/Part01/components/eventUtilities.html|sg;
#    $text =~s|/Part01/components/geodata.html|/Part01/components/geospatial.html|sg;
#    $text =~s|/Part01/components/group.html|/Part01/components/grouping.html|sg;
#    $text =~s|/Part01/components/interp.html|/Part01/components/interpolators.html|sg;
#    $text =~s|/Part01/components/keyDeviceSensor.html|/Part01/components/keyboard.html|sg;
#    $text =~s|/Part01/components/particle_systems.html|/Part01/components/particleSystems.html|sg;
#    $text =~s|/Part01/components/pointingsensor.html|/Part01/components/pointingDeviceSensor.html|sg;
#    $text =~s|/Part01/components/rigid_physics.html|/Part01/components/rigidBodyPhysics.html|sg;

#    system "mkdir -p '$ref/$component'";
#    open FILE, ">", "$ref/$component/$node.md";
#    say FILE $text;
#    close FILE;
}

$components = "/Volumes/Home/Projekte/Server/create3000.de/www.md/users-guide/components";

node $_ foreach sort `find $components -maxdepth 2 -mindepth 2 -type f`;

sub nav {
   $component = shift;
   @nodes     = @{$components -> {$component}};

   say $component;

   $text = "- title: \"$component\"
  children:
";

   foreach $node (sort @nodes)
   {
      $text .= "    - title: \"$node\"
      url: /components/$component/$node
";
   }

   open FILE, ">", "$nav/components-$component.yml";
   print FILE $text;
   close FILE;
}

nav $_ foreach keys %{$components};

sub components {
   $text = "---
title: Components
order: 1
icon: fas fa-th-large
---
";

   foreach $component (sort keys %{$components})
   {
      @nodes = sort @{$components -> {$component}};

      $text .= "## $component\n\n";

      foreach $node (@nodes)
      {
         $text .= "- [$node](\L$component/\L$node)\n";
      }

      $text .= "\n";
   }

   open FILE, ">", "$tabs/components.md";
   print FILE $text;
   close FILE;
}

#components;

sub supported {
   $text = `cat '$posts/supported-nodes.md'`;
   %c    = ();

   foreach $component (sort keys %{$components})
   {
      $c{$_} = lc $component foreach @{$components -> {$component}};
   }

   $text =~ s|\[([a-zA-Z0-9]+)\]\(.*?\)|[$1](components/$c{$1}/\L$1)|sg;

   open FILE, ">", "$posts/supported-nodes.md";
   print FILE $text;
   close FILE;
}

# supported;

sub tutorials {
   $filename = shift;
   chomp $filename;

   $text = `cat '$filename'`;

   %c = ();

   foreach $component (sort keys %{$components})
   {
      $c{$_}    = lc $component foreach @{$components -> {$component}};
      $c{lc $_} = lc $component foreach @{$components -> {$component}};
   }

   $text =~ s|\[([a-zA-Z0-9]+)\]\(https://www.web3d.org/documents/specifications.*?\){.*?}|[$1](../components/$c{$1}/\L$1)|sg;

   open FILE, ">", "$filename";
   print FILE $text;
   close FILE;
}

#tutorials $_ foreach sort `find $tut -type f`;
