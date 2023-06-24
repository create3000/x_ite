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

   return unless $typeName =~ /^Anchor$/o;
   say "$componentName $typeName";

   $md     = "$cwd/docs/_posts/components/$componentName/$typeName.md";
   $file   = `cat $md`;
   @fields = map { /\*\*(.*?)\*\*/o; $_ = $1 } $file =~ /###\s*[SM]F\w+.*/go;

   return unless grep /^$typeName$/, @td;

   @node = @td [(first_index { /^$typeName$/ } @td) .. $#td];
   @node = @node [0 .. (first_index { /^$/ } @node)];

   $file = fill_empty_field ($_, \@node, $file) foreach @fields;

}

sub fill_empty_field {
   $name = shift;
   $node = shift;
   $file = shift;

   # #return $file unless $file =~ /###.*?\*\*$name\*\*.*?[\s\n]+###/;
   return $file unless grep /^$name$/, @$node;

   @field = @$node [(first_index { /^$name$/ } @$node) + 1 .. $#$node];
   $field = shift @field;

   $field =~ s/^\[.*?\]\s*//so;
   $field =~ s/^[\[\()].*?[\]\)]\s*//so;

   decode_entities ($field);

   @description = @hints = @warnings = ();

   return unless $name eq "url";

   say $field;

   $field =~ s/(Hint\s*:)/$1 __HINT__/sg;
   $field =~ s/(Warning\s*:)/$1 __WARNING__/sg;

   @sentences = split (/\s*(Hint|Warning)\s*:/, $field);

   foreach (@sentences)
   {
      s/^\s+|\s+$//sgo;

      if ($_ =~ s/__HINT__//)
      {
         s/^\s+|\s+$//sgo;

         push @hints, ucfirst $_;
         next;
      }

      if ($_ =~ s/__WARNING__//)
      {
         s/^\s+|\s+$//sgo;

         push @warnings, ucfirst $_;
         next;
      }

      push @description, ucfirst $_;
   }

   $description = join " ", @description;
   $description =~ s/\b$name\b/*$name*/sg;

   $string = "";

   $string .= $description;
   $string .= "\n";
   $string .= "\n";

   if (@hints)
   {
      $string .= @hints == 1 ? "Hint:" : "Hints";
      $string .= "\n";
      $string .= "\n";
      $string .= "- $_\n" foreach @hints;
      $string .= "\n";
   }

   if (@warnings)
   {
      $string .= @warnings == 1 ? "Warning:" : "Warnings";
      $string .= "\n";
      $string .= "\n";
      $string .= "- $_\n" foreach @warnings;
      $string .= "\n";
   }

   print "\n'$name'\n";
   print $string;

   return $file;
}

$cwd = getcwd ();

node $_ foreach sort `find $cwd/src/x_ite/Components -type f -mindepth 2`;
