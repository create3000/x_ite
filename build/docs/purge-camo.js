#!/usr/bin/env node
"use strict";

const { sh, systemSync } = require ("shell-tools");

function main ()
{
   const
      readme = sh (`wget -O - -o /dev/null https://github.com/create3000/x_ite/blob/main/README.md`),
      regex  = /"(https:\/\/camo.githubusercontent.com\/.*?)"/g,
      result = [ ];

   let matches;

   while (matches = regex .exec (readme))
      result .push (sh (`curl -s -X PURGE ${matches [1]}`));

   if (result .every (r => r .match (/"ok"/)))
      console .log ("Purging camo ok.");
   else
      console .log ("Purging camo failed.");
}

main ();
