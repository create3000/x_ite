#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use File::Basename qw(basename);

sub static {
   $filename = shift;
   chomp $filename;

   return if basename ($filename) =~ /^X3D/;
   say $filename;

   $file = `cat '$filename'`;

   $file =~ /\[Symbol .for \("X_ITE.X3DBaseNode\.fieldDefinitions"\)\]:\s*(.*?\]\),)/s;
   $fieldDefinitions = $1;
   $fieldDefinitions =~ s/new X3DFieldDefinition/   new X3DFieldDefinition/sg;
   $fieldDefinitions =~ s/\]\),/   ]),/sg;

   $file =~ /getTypeName.*?"(.*?)"/s;
   $typeName = $1;

   $file =~ /getComponentName.*?"(.*?)"/s;
   $componentName = $1;

   $file =~ /getContainerField.*?"(.*?)"/s;
   $containerField = $1;

   $file =~ /getSpecificationRange.*?(\[.*?\])/s;
   $specificationRange = $1;

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
   containerField:
   {
      value: "$containerField",
   },
   specificationRange:
   {
      value: Object .freeze ($specificationRange)
   },
   fieldDefinitions:
   {
      value: $fieldDefinitions
   },
});
EOT

   $file =~ s/export default/$statics\nexport default/s;

   say $file;
   exit;
}

static $_ foreach sort `find /Users/holger/Desktop/X_ITE/x_ite/src/x_ite/Components -type f`;
