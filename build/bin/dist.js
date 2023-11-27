#!/usr/bin/env node
"use strict";

const
   fs             = require ("fs"),
   path           = require ("path"),
   { sh, system } = require ("shell-tools");

async function copy_files ()
{
   await system ("rsync -q -r -x -c -v -t --progress --delete src/assets/fonts    dist/assets/");
   await system ("rsync -q -r -x -c -v -t --progress --delete src/assets/hatching dist/assets/");
   await system ("rsync -q -r -x -c -v -t --progress --delete src/assets/images   dist/assets/");
   await system ("rsync -q -r -x -c -v -t --progress --delete src/assets/lib      dist/assets/");
   await system ("rsync -q -r -x -c -v -t --progress --delete src/assets/linetype dist/assets/");
   await system ("cp src/example.html dist/");
}

async function main ()
{
   await copy_files ();
}

main ();
