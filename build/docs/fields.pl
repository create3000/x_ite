#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;
use List::MoreUtils qw(first_index);
use HTML::Entities;


system "wget -q --output-document - https://www.web3d.org/x3d/content/X3dTooltips.html > /tmp/tooltips.html"
   unless -f "/tmp/tooltips.html";
$tooltips = `cat /tmp/tooltips.html`;

@td = $tooltips =~ m|<td.*?</td.*?>|sgo;

s|</?.*?>||sgo   foreach @td;
s/&nbsp;/ /sgo   foreach @td;
s/\s+/ /sgo      foreach @td;
s/^\s+|\s+$//sgo foreach @td;

#say @td;

$fieldDescription = {
   " " => "",
   "in" => "Input ",
   "out" => "Output ",
   "in, out" => "Input/Output ",
};

sub node {
   $filename = shift;
   chomp $filename;

   $filename =~ m|([^/]+)/([^/]+)\.js$|o;

   $componentName = $1;
   $typeName      = $2;

   return if $componentName =~ /^Annotation$/o;
   return if $typeName =~ /^X3D/o;

   # return unless $typeName =~ /^TransmitterPdu$/o;
   say "$componentName $typeName";

   $md     = "$cwd/docs/_posts/components/$componentName/$typeName.md";
   $file   = `cat $md`;
   $file   = reorder_fields ($typeName, $componentName, $file);
   @fields = map { /\*\*(.*?)\*\*/o; $_ = $1 } $file =~ /###\s*[SM]F\w+.*/go;

   return unless grep /^$typeName$/, @td;

   @node = @td [(first_index { /^$typeName$/ } @td) .. $#td];
   @node = @node [0 .. (first_index { /^$/ } @node)];

   $file = update_node ($typeName, $componentName, \@node, $file);
   $file = update_field ($_, \@node, $file) foreach @fields;

   open FILE, ">", $md;
   print FILE $file;
   close FILE;
}

sub update_node {
   $typeName      = shift;
   $componentName = shift;
   $node          = shift;
   $file          = shift;
   $node          = $node -> [1];

   $source = `cat $cwd/src/x_ite/Components/$componentName/$typeName.js`;
   $source =~ /Object\s*\.freeze\s*\(\["(.*?)", "(.*?)"\]\)/;
   $from   = $1;
   $to     = $2;

   $source =~ /containerField:.*?value:\s*"(.*?)"/s;
   $containerField = $1;

   1 while $node =~ s/^\s*(?:\[.*?\]|\(.*?\))\s*//so;
   1 while $node =~ s/^(?:\s*or)?\s*(?:[\[\()].*?[\]\)]|-1\.)\s*//so;

   decode_entities $node;
   $field =~ s/([<>|])/\\$1/sgo;
   $field =~ s/&/&amp;/sgo;

   # Special substitutions
   $node =~ s/incldes/includes/sgo;
   $node =~ s/polgyonal/polygonal/sgo;

   @description = @hints = @warnings = ();

   # Split node.

   $node =~ s/(Hint\s*:)/$1 __HINT__/sgo;
   $node =~ s/(Warning\s*:)/$1 __WARNING__/sgo;

   @sentences = split (/(?:Hint|Warning)\s*:/so, $node);

   foreach (@sentences)
   {
      s/^\s+|\s+$//sgo;

      if ($_ =~ s/__HINT__//)
      {
         s/^\s+|\s+$//sgo;

         push @hints, $_;
         next;
      }

      if ($_ =~ s/__WARNING__//)
      {
         s/^\s+|\s+$//sgo;

         push @warnings, $_;
         next;
      }

      push @description, $_;
   }

   $_ = ucfirst foreach @description;
   $_ = ucfirst foreach @hints;
   $_ = ucfirst foreach @warnings;

   s/(.*?)[\s,]+(https?:.*?)(\s+(?:or|and)\s+|\s+|$)/[$1]($2){:target="_blank"}$3/sgo foreach @hints;
   s/(.*?)[\s,]+(https?:.*?)(\s+(?:or|and)\s+|\s+|$)/[$1]($2){:target="_blank"}$3/sgo foreach @warnings;
   s/:\]/]/sgo foreach @hints;
   s/:\]/]/sgo foreach @warnings;

   # Top

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

   $string .= "The $typeName node belongs to the **$componentName** component and its default container field is *$containerField.*";
   $string .= " ";
   $string .= "It is available since X3D version $from or later."  if $to eq "Infinity";
   $string .= "It is available since X3D version $from until $to." if $to ne "Infinity";
   $string .= "\n";
   $string .= "\n";
   $string .= ">Deprecated: This node is deprecated since X3D version $to. Future versions of the standard may remove this node.\n{: .prompt-danger }\n\n" if $to ne "Infinity";

   $file =~ s/(## Overview\n).*?\n(?=##\s+)/$1$string/s;

   # Description

   $string = "";

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

   $file =~ s/(## (?:Description|Information)\n).*?\n(?=##\s+|\s+$)/## Information\n\n$string/s;

   return $file;
}

sub reorder_fields {
   $typeName      = shift;
   $componentName = shift;
   $file          = shift;

   $source       = `cat $cwd/src/x_ite/Components/$componentName/$typeName.js`;
   @sourceFields = $source =~ /\bX3DFieldDefinition\s*\(.*/go;
   @sourceFields = map { /"(.*?)"/o; $_ = $1 } @sourceFields;

   $fields = { };

   foreach $name (@sourceFields)
   {
      $file =~ s/(###.*?\*\*$name\*\*.*?\n[\s\S\n]*?\n)(?=(?:###|##)\s+)//;
      $fields -> {$name} = $1;
   }

   $string = "";
   $string .= $fields -> {$_} foreach @sourceFields;

   $file =~ s/(## Fields\n+)/$1$string/so;

   return $file;
}

sub update_field {
   $name = shift;
   $node = shift;
   $file = shift;

   # return $file unless $name eq "tolerance";
   # say $name;

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
      $field =~ s/([<>|])/\\$1/sgo;
      $field =~ s/&/&amp;/sgo;

      # Special substitutions.
      $field =~ s/\*next\* to/next to/sgo;
      $field =~ s/\[autoRefresh\b/autoRefresh/sgo;

      $field =~ s/\b$name\b/*$name*/sg;
      $n = $1, $field =~ s/\b$n\b/*$n*/sg if $name =~ /^set_(.*)$/;

      # Split field.

      $field =~ s/(Hint\s*:)/$1 __HINT__/sgo;
      $field =~ s/(Warning\s*:)/$1 __WARNING__/sgo;

      @sentences = split (/(?:Hint|Warning)\s*:/so, $field);

      foreach (@sentences)
      {
         s/^\s+|\s+$//sgo;

         if ($_ =~ s/__HINT__//)
         {
            s/^\s+|\s+$//sgo;

            push @hints, $_;
            next;
         }

         if ($_ =~ s/__WARNING__//)
         {
            s/^\s+|\s+$//sgo;

            push @warnings, $_;
            next;
         }

         push @description, $_;
      }

      $_ = ucfirst foreach @description;
      $_ = ucfirst foreach @hints;
      $_ = ucfirst foreach @warnings;

      s/(.*?)[\s,]+(https?:.*?)(\s+(?:or|and)\s+|\s+|$)/[$1]($2){:target="_blank"}$3/sgo foreach @hints;
      s/(.*?)[\s,]+(https?:.*?)(\s+(?:or|and)\s+|\s+|$)/[$1]($2){:target="_blank"}$3/sgo foreach @warnings;
      s/:\]/]/sgo foreach @hints;
      s/:\]/]/sgo foreach @warnings;
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
      $string .= "\n";
      $string .= ucfirst ($fieldDescription -> {$accessType} . "field *$name*.");
      $string .= "\n";
      $string .= "\n";
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

$cwd = getcwd ();

system "git checkout -- docs/_posts/components/";

node $_ foreach sort `find $cwd/src/x_ite/Components -type f -mindepth 2`;
