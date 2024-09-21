#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;
use List::MoreUtils qw(first_index);
use HTML::Entities;
use JSON::Parse qw(parse_json);

$cwd = getcwd ();

say "Downloading X3dTooltips.html ..." if ! -f "/tmp/tooltips.html" || -M "/tmp/tooltips.html" > 1;
system "wget -q -O - https://www.web3d.org/x3d/content/X3dTooltips.html > /tmp/tooltips.html"
   if ! -f "/tmp/tooltips.html" || -M "/tmp/tooltips.html" > 1;
$tooltips = `cat /tmp/tooltips.html`;

@tooltips = $tooltips =~ m|<td.*?</td.*?>|sgo;

s|</?.*?>||sgo   foreach @tooltips;
s/&nbsp;/ /sgo   foreach @tooltips;
s/\s+/ /sgo      foreach @tooltips;
s/^\s+|\s+$//sgo foreach @tooltips;

#say @tooltips;

$fieldDescription = {
   " " => "",
   "in" => "Input ",
   "out" => "Output ",
   "in, out" => "Input/Output ",
};

$inOut = {
   "initializeOnly" => " ",
   "inputOnly" => "in",
   "outputOnly" => "out",
   "inputOutput" => "in, out",
};

%links = map { m|([^/]+)$|o; ($1, lc $_) }
   map { s|\.md$||or }
   map { s|$cwd/docs/_posts/components//||or }
   split "\n", `find $cwd/docs/_posts/components/ -type f -mindepth 2`;

sub node {
   $filename = shift;
   chomp $filename;

   $filename =~ m|([^/]+)/([^/]+)\.js$|o;

   $componentName = $1;
   $typeName      = $2;

   return if $componentName =~ /^Annotation$/o;
   return if $typeName =~ /^X3D/o;

   # return unless $typeName =~ /^CADAssembly$/o;
   say "$componentName $typeName";

   $md     = "$cwd/docs/_posts/components/$componentName/$typeName.md";
   $file   = `cat $md`;
   $file   = reorder_fields ($typeName, $componentName, $file);
   $file   = update_example ($typeName, $componentName, $file);
   @fields = map { /\*\*(.*?)\*\*/o; $_ = $1 } $file =~ /###\s*[SM]F\w+.*/go;

   if (grep /^$typeName$/, @tooltips)
   {
      $source = `cat $cwd/src/x_ite/Components/$componentName/$typeName.js`;

      @node = @tooltips [(first_index { /^$typeName$/ } @tooltips) .. $#tooltips];
      @node = @node [0 .. (first_index { /^$/ } @node)];

      $file = update_node ($typeName, $componentName, \@node, $file, $source);
   }

   $file = update_field ($typeName, $_, \@node, $file, $source) foreach @fields;
   $file = reorder_sections ($file);

   open FILE, ">", $md;
   print FILE $file;
   close FILE;
}

sub fix_links {
   @lines = @_;

   s|http://www.w3.org|https://www.w3.org|sgo foreach @lines;
   s|http://www.loc.gov|https://www.loc.gov|sgo foreach @lines;
   s|http://xml.coverpages.org|https://xml.coverpages.org|sgo foreach @lines;
   s|http://teem.sourceforge.net|https://teem.sourceforge.net|sgo foreach @lines;
   s|http://paulbourke.net|https://paulbourke.net|sgo foreach @lines;
   s|http://www.ecma-international.org|https://www.ecma-international.org|sgo foreach @lines;

   return @lines;
}

sub link_nodes {
   $typeName = shift;
   @lines    = @_;

   foreach $line (@lines)
   {
      next if $line =~ /^\[/;

      while (($key, $value) = each (%links))
      {
         next if $key eq $typeName;

         $line =~ s|(?<!name=')\b$key\b|[$key](/x_ite/components/$value/)|g;
      }
   }

   return @lines;
}

sub update_node {
   $typeName      = shift;
   $componentName = shift;
   $node          = shift;
   $file          = shift;
   $source        = shift;
   $node          = $node -> [1];

   $source =~ /getStaticProperties\s*\("(.*?)",\s*"(.*?)",\s*(\d+),\s*"(.*?)",\s*"(.*?)"(?:,\s*"(.*?)")?\)/;
   $componentLevel = $3;
   $containerField = $4;
   $from           = $5;
   $to             = $6 // "Infinity";

   1 while $node =~ s/^\s*(?:\[.*?\]|\(.*?\))\s*//so;
   1 while $node =~ s/^(?:\s*or)?\s*(?:[\[\()].*?[\]\)]|-1\.)\s*//so;

   decode_entities $node;
   $node =~ s/\s*\|\s*/ or /sgo;
   $node =~ s/([<>|])/\\$1/sgo;
   $node =~ s/&/&amp;/sgo;

   $node =~ s/(profile=\S+|\\<component.*?>|containerField=\S+)/"`" . code($1) . "`"/sgoe;

   # Special substitutions
   $node = spelling ($node);

   @description = @hints = @warnings = ();

   # Split node.

   $node =~ s/(Hint\s*:)/$1 __HINT__/sgo;
   $node =~ s/(Warning\s*:)/$1 __WARNING__/sgo;

   @sentences = split (/(?:Hint|Warning)\s*:/so, $node);

   foreach (@sentences)
   {
      s/^\s+|\s+$//sgo;

      if ($_ =~ s/__HINT__//o)
      {
         s/^\s+|\s+$//sgo;

         push @hints, $_ if $_;
         next;
      }

      if ($_ =~ s/__WARNING__//o)
      {
         s/^\s+|\s+$//sgo;

         push @warnings, $_ if $_;
         next;
      }

      push @description, $_ if $_;
   }

   $_ = ucfirst foreach @description;
   $_ = ucfirst foreach @hints;
   $_ = ucfirst foreach @warnings;

   s/(.*?)[\s,]+(https?:.*?)(\s+(?:or|and)\s+|\s+|$)/[$1]($2)$3/sgo foreach @hints;
   s/(.*?)[\s,]+(https?:.*?)(\s+(?:or|and)\s+|\s+|$)/[$1]($2)$3/sgo foreach @warnings;
   s/(:|\s*at)\]/]/sgo foreach @hints;
   s/(:|\s*at)\]/]/sgo foreach @warnings;

   @hints    = fix_links @hints;
   @warnings = fix_links @warnings;
   @hints    = link_nodes $typeName, @hints;
   @warnings = link_nodes $typeName, @warnings;

   # Overview

   $string = "";

   if (@description)
   {
      $string .= "\n";
      $string .= join " ", @description;
      $string .= "\n";
      $string .= "\n";
   }
   else
   {
      $string .= "\n";
      $string .= "$typeName ...";
      $string .= "\n";
      $string .= "\n";
   }

   $string .= "The $typeName node belongs to the **$componentName** component and requires at least level **$componentLevel,** its default container field is *$containerField.*";
   $string .= " ";
   $string .= "It is available from X3D version $from or higher." if $to eq "Infinity";
   $string .= "It is available from X3D version $from up to $to." if $to ne "Infinity";
   $string =~ s/It is available from X3D version 2.0/It is available since VRML 2.0 and from X3D version 3.0/sgo if $from eq "2.0";
   $string .= "\n";
   $string .= "\n";
   $string .= ">**Deprecated:** This node is **deprecated** as of X3D version $to. Future versions of the standard may remove this node.\n{: .prompt-danger }\n\n" if $to ne "Infinity";

   $file =~ s/(## Overview\n).*?\n(?=##\s+)/$1$string/s;

   # Advice

   $customs = $1 if $file =~ /## Advice\s*(.*?)\s*###?\s+/so;

   $string = "## Advice\n\n";
   $string .= $customs . "\n\n" if $customs;

   if (@hints)
   {
      $string .= "### ";
      $string .= @hints == 1 ? "Hint" : "Hints";
      $string .= "\n";
      $string .= "\n";
      $string .= "- $_\n" foreach @hints;
      $string .= "\n";
   }

   if (@warnings)
   {
      $string .= "### ";
      $string .= @warnings == 1 ? "Warning" : "Warnings";
      $string .= "\n";
      $string .= "\n";
      $string .= "- $_\n" foreach @warnings;
      $string .= "\n";
   }

   $file =~ s/## Advice\n.*?\n(?=##\s+|$)//so;

   if (@hints || @warnings)
   {
      $file =~ s/\s+$//so;
      $file .= "\n\n";
      $file .= $string;
   }

   return $file;
}

sub code {
   $string = shift;

   $string =~ s/\\//sgo;
   $string =~ s/`//sgo;
   $string =~ s/="(.*?)"/"='" . attrib($1) . "'"/sgoe;
   $string =~ s/\*(\w+)\*/$1/sgo;

   return $string;
}

sub attrib {
   $string = shift;

   $string =~ s/'/"/sgo;

   return $string;
}

sub spelling {
   $string = shift;

   $string =~ s/\*next\* to/next to/sgo;
   $string =~ s/\[autoRefresh\b/autoRefresh/sgo;
   $string =~ s/incldes/includes/sgo;
   $string =~ s/polgyonal/polygonal/sgo;
   $string =~ s/renderStryle/renderStyle/sgo;
   $string =~ s/utilitized/utilized/sgo;
   $string =~ s/gemoetry/geometry/sgo;
   $string =~ s/spedification/specification/sgo;
   $string =~ s/browsesr/browser/sgo;
   $string =~ s/Hanim/HAnim/sgo;
   $string =~ s/abitrary/arbitrary/sgo;

   $string =~ s|(https://en.wikipedia.org/wiki/Kilogram)|Kilogram $1|sgo;

   return $string;
}

sub reorder_fields {
   $typeName      = shift;
   $componentName = shift;
   $file          = shift;

   $source       = `cat $cwd/src/x_ite/Components/$componentName/$typeName.js`;
   @sourceFields = $source =~ /\bX3DFieldDefinition\s*\(.*/go;
   @sourceFields = map { /X3DConstants\s*\.(\w+),\s*"(.*?)",.*?([SM]F\w+)/o; $_ = [$1, $2, $3] } @sourceFields;

   $fields = { };

   foreach $field (@sourceFields)
   {
      if ($file =~ s/(###.*?\*\*$field->[1]\*\*.*?\n[\s\S\n]*?\n)(?=(?:###|##)\s+)//)
      {
         $fields -> {$field -> [1]} = $1;
      }
      else
      {
         $accesType = $inOut -> {$field -> [0]};

         $fields -> {$field -> [1]} = "### $field->[2] [$accessType] **$field->[1]**\n\n";
      }
   }

   $string = "";
   $string .= $fields -> {$_ -> [1]} foreach @sourceFields;

   $file =~ s/(## Fields\n+)/$1$string/so;

   return $file;
}

$json   = `cat ../media/docs/examples/config.json`;
$config = parse_json ($json);

use Data::Dumper;

sub update_example {
   $typeName      = shift;
   $componentName = shift;
   $file          = shift;

   return $file unless -d "../media/docs/examples/$componentName/$typeName";

   $xrButtonPosition  = "xr-button-" . ($config -> {$typeName} -> {"xrButtonPosition"} // "br");
   $xrMovementControl = $config -> {$typeName} -> {"xrMovementControl"} // "VIEWER_POSE";

   $string = "## Example\n";
   $string .= "\n";
   $string .= "<x3d-canvas class=\"$xrButtonPosition\" src=\"https://create3000.github.io/media/examples/$componentName/$typeName/$typeName.x3d\" contentScale=\"auto\" update=\"auto\" xrMovementControl=\"$xrMovementControl\"></x3d-canvas>\n";
   $string .= "\n";
   $string .= "- [Download ZIP Archive](https://create3000.github.io/media/examples/$componentName/$typeName/$typeName.zip)\n";
   $string .= "- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/$componentName/$typeName/$typeName.x3d)\n";
   $string .= "{: .example-links }\n";
   $string .= "\n";

   $file =~ s/## Example\n.*?\n(?=##\s+|$)//so;
   $file =~ s/\s+$//so;
   $file .= "\n\n";
   $file .= $string;

   return $file;
}

sub update_field {
   $typeName = shift;
   $name     = shift;
   $node     = shift;
   $file     = shift;
   $source   = shift;

   # return $file unless $name eq "tolerance";
   # say $name;

   # Update type and access type.

   $source =~ /X3DFieldDefinition \(X3DConstants \.(\w+),\s+"$name",\s+new Fields \.(\w+) \((.*?)\)\),/;
   $accessType = $1;
   $type       = $2;
   $value      = $3;

   $file =~ s/(###.*?)[SM]F\w+(.*?\[).*?(\].*?\*\*$name\*\*)/$1$type$2$inOut->{$accessType}$3/;

   # Description

   $file =~ /(###.*?\*\*$name\*\*.*?\n)/;
   $line = $1;

   $line =~ /###.*?\[(.*?)\].*?\*\*$name\*\*/;
   $accessType = $1;

   @description = @hints = @warnings = ();

   if (grep /^$name$/, @$node)
   {
      @field = @$node [(first_index { /^$name$/ } @$node) + 1 .. $#$node];
      $field = shift @field;

      1 while $field =~ s/^\s*(?:\[.*?\]|\(.*?\))\s*//so;
      1 while $field =~ s/^(?:\s*or)?\s*(?:[\[\()].*?[\]\)]|-1\.)\s*//so;

      decode_entities $field;
      $field =~ s/\s*\|\s*/ or /sgo;
      $field =~ s/([<>|])/\\$1/sgo;
      $field =~ s/&/&amp;/sgo;

      $field =~ s/\b$name\b/*$name*/sg;
      $n = $1, $field =~ s/\b$n\b/*$n*/sg if $name =~ /^set_(.*)$/;
      $field =~ s/(profile=\S+|\\<\w+.*?>|containerField=\S+)/"`" . code($1) . "`"/sgoe;

      # Special substitutions.
      $field = spelling ($field);

      # Split field.

      $field =~ s/(Hint\s*:)/$1 __HINT__/sgo;
      $field =~ s/(Warning\s*:)/$1 __WARNING__/sgo;

      @sentences = split (/(?:Hint|Warning)\s*:/so, $field);

      foreach (@sentences)
      {
         s/^\s+|\s+$//sgo;

         if ($_ =~ s/__HINT__//o)
         {
            s/^\s+|\s+$//sgo;

            push @hints, $_ if $_;
            next;
         }

         if ($_ =~ s/__WARNING__//o)
         {
            s/^\s+|\s+$//sgo;

            push @warnings, $_ if $_;
            next;
         }

         push @description, $_ if $_;
      }

      $_ = ucfirst foreach @description;
      $_ = ucfirst foreach @hints;
      $_ = ucfirst foreach @warnings;

      s/(.*?)[\s,]+(https?:.*?)(\s+(?:or|and)\s+|\s+|$)/[$1]($2)$3/sgo foreach @hints;
      s/(.*?)[\s,]+(https?:.*?)(\s+(?:or|and)\s+|\s+|$)/[$1]($2)$3/sgo foreach @warnings;
      s/(:|\s*at)\]/]/sgo foreach @hints;
      s/(:|\s*at)\]/]/sgo foreach @warnings;

      @hints       = fix_links @hints;
      @warnings    = fix_links @warnings;
      @description = link_nodes $typeName, @description;
      @hints       = link_nodes $typeName, @hints;
      @warnings    = link_nodes $typeName, @warnings;
   }
   else
   {
      return $file if $line =~ /non standard/;
   }

   $string = "";

   if (@description)
   {
      $string .= "\n";
      $string .= join " ", @description;
      $string .= "\n";
      $string .= "\n";
   }
   else
   {
      if ($file =~ /(?:###.*?\*\*$name\*\*.*?\n)(.*?\n)(?:(?:###|##)\s+)/s && $1 !~ /^\s*$/s)
      {
         $string .= $1;
      }
      else
      {
         $string .= "\n";
         $string .= ucfirst ($fieldDescription -> {$accessType} . "field *$name*.");
         $string .= "\n";
         $string .= "\n";
      }
   }

   if (@hints)
   {
      $string .= "#### ";
      $string .= @hints == 1 ? "Hint" : "Hints";
      $string .= "\n";
      $string .= "\n";
      $string .= "- $_\n" foreach @hints;
      $string .= "\n";
   }

   if (@warnings)
   {
      $string .= "#### ";
      $string .= @warnings == 1 ? "Warning" : "Warnings";
      $string .= "\n";
      $string .= "\n";
      $string .= "- $_\n" foreach @warnings;
      $string .= "\n";
   }

   # say $name;
   # print "'$string'";

   $file =~ s/(###.*?\*\*$name\*\*.*?\n).*?\n((?:###|##)\s+)/$1$string$2/s if $string;

   return $file;
}

sub reorder_sections {
   $file     = shift;
   @sections = ("Overview", "Hierarchy", "Fields", "Supported File Formats", "Advice", "Example", "See Also");
   $sections = { };

   foreach $s (@sections)
   {
      $file =~ s/(##\s+$s.*?\n)(?=##\s+|$)//s;
      $sections -> {$s} = $1;
      $sections -> {$s} =~ s/\s+$//so;
   }

   $file =~ s/\s+$/\n\n/so;

   $file .= $sections -> {$_} . "\n\n" foreach grep { $sections -> {$_} } @sections;
   $file =~ s/\s+$/\n/so;

   return $file;
}

system "git checkout -- docs/_posts/components/";

node $_ foreach sort `find $cwd/src/x_ite/Components -type f -mindepth 2`;
