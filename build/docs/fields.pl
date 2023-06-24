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

sub node {
   $filename = shift;
   chomp $filename;

   $filename =~ m|([^/]+)/([^/]+)\.js$|o;

   $componentName = $1;
   $typeName      = $2;

   return if $componentName =~ /^Annotation$/o;
   return if $typeName =~ /^X3D/o;

   # return unless $typeName =~ /^Analyser$/o;
   say "$componentName $typeName";

   $md     = "$cwd/docs/_posts/components/$componentName/$typeName.md";
   $file   = `cat $md`;
   @fields = map { /\*\*(.*?)\*\*/o; $_ = $1 } $file =~ /###\s*[SM]F\w+.*/go;

   return unless grep /^$typeName$/, @td;

   @node = @td [(first_index { /^$typeName$/ } @td) .. $#td];
   @node = @node [0 .. (first_index { /^$/ } @node)];

   $file = field ($_, \@node, $file) foreach @fields;

   open FILE, ">", $md;
   print FILE $file;
   close FILE;
}

sub field {
   $name = shift;
   $node = shift;
   $file = shift;

   return $file unless grep /^$name$/, @$node;

   # return unless $name eq "frameDuration";
   say $name;

   @field = @$node [(first_index { /^$name$/ } @$node) + 1 .. $#$node];
   $field = shift @field;

   1 while $field =~ s/^\s*(?:\[.*?\]|\(.*?\))\s*//so;
   $field =~ s/^(\s*or)?\s*[\[\()].*?[\]\)]\s*//so;

   decode_entities $field;
   $field =~ s/([<>])/\\$1/sgo;
   $field =~ s/\b$name\b/*$name*/sg;

   # Special substitutions
   $field =~ s/\*next\* to/next to/sgo;
   $field =~ s/\[autoRefresh/autoRefresh/sgo;

   @description = @hints = @warnings = ();

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

   s/^(.*?)[\s,]+(https?:.*?$)/[$1]($2){:target="_blank"}/sgo foreach @hints;
   s/^(.*?)[\s,]+(https?:.*?$)/[$1]($2){:target="_blank"}/sgo foreach @warnings;

   $string = "";

   $string .= join " ", @description;
   $string .= "\n";
   $string .= "\n";

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
   # print $string;

   $file =~ s/(###.*?\*\*$name\*\*.*?\n+).*?(#{2,3}}\s+)/$1$bah$2/s;

   return $file;
}

$cwd = getcwd ();

system "git checkout -- docs/_posts/components/";

node $_ foreach sort `find $cwd/src/x_ite/Components -type f -mindepth 2`;
