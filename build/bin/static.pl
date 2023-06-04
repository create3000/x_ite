#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use File::Basename qw(basename);

sub static {
   $filename = shift;
   chomp $filename;

   return unless basename ($filename) =~ /^X3D/;
   return if $filename =~ /X3DPrototypeInstance/;
   say $filename;

   $filename =~/([^\/]+)\/([^\/]+)\.js/;

   $componentName = $1;
   $typeName      = $2;

   $file = `cat '$filename'`;

   $statics = <<EOT;
Object .defineProperties ($typeName,
{
   typeName:
   {
      value: "$typeName",
   },
   componentName:
   {
      value: "$componentName",
   },
});
EOT

   $file =~ s/export default/$statics\nexport default/s;

   open FILE, ">", $filename;
   print FILE $file;
   close FILE;
}

static $_ foreach sort `find /Users/holger/Desktop/X_ITE/x_ite/src/x_ite/Components -type f -mindepth 2`;
