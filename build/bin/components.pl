#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use File::Basename;

$ref = "/Users/holger/Desktop/X_ITE/x_ite/docs/_posts/components";

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

   $fmatter = "---
title: $node
date: 2022-01-06
nav: components
categories: [Components]
tags: [$node, $component]
---";

   $text =~ s|---.*?---|$fmatter|s;
   $text =~ s|$node\n=+|## Overview|;
   $text =~ s|\n(.+?)\n=+|\n## $1|g;
   $text =~ s/\n(Hints|Examples?)\n-+/\n### $1/g;
   $text =~ s|H-Anim|HAnim|g;
   $text =~ s|Hanim|HAnim|g;
   $text =~ s|</div></section><section><div>||g;
   $text =~ s|<section><div>||g;
   $text =~ s|</div></section>||g;
   $text =~ s|\\\[mwm-aal-display\\\]\n\n||g;
   $text =~ s|<pre class="">||g;
   $text =~ s|</div></section><section><div>||g;
   $text =~ s|</article><article class="function">||g;
   $text =~ s|<article class="function">||g;
   $text =~ s|</article>||g;
   #$text =~ s|</?small>||g;
   $text =~ s|\\([\[\]])|$1|g;
   $text =~ s|&lt;|\\<|g;
   $text =~ s|&gt;|\\>|g;
   $text =~ s|## Browser Compatibility.*?</table>\n\n||s;
   $text =~ s|http://www.web3d.org|https://www.web3d.org|s;

   $text =~ m|#### See Also\s+?((?:\[.*?\]\(.*?\)\s*)+)|;
   $links = $1;
   $links =~ s|\[|\n- [|sg;
   $text =~ s|#### See Also.*?###|### See Also\n$links###|s;

   system "mkdir -p '$ref/$component'";
   open FILE, ">", "$ref/$component/$node.md";
   print FILE $text;
   close FILE;
}

$components = "/Volumes/Home/Projekte/Server/create3000.de/www.md/users-guide/components";

node $_ foreach sort `find $components -maxdepth 2 -mindepth 2 -type f`;
