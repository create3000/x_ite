#!/usr/bin/env node
"use strict";

const { sh, systemSync } = require ("shell-tools");

function main ()
{
   const
      readme = sh (`wget -O - -o /dev/null https://github.com/create3000/x_ite/blob/main/README.md`),
      regex  = /"(https:\/\/camo.githubusercontent.com\/.*?)"/g;

   let matches;

   while (matches = regex .exec (readme))
      systemSync (`curl -X PURGE ${matches [1]}`);
}

main ();
