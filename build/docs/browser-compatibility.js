const
   json   = require ("./browser-compatibility.json"),
   { sh } = require ("shell-tools"),
   fs     = require ("fs");

function main ()
{
   console .log ("Update browser compatibility ...");

   const files = sh ("ls -C1 src/x_ite/Components/**/*.js") .trim () .split ("\n");

   files .forEach (filename => browserCompatibility (filename));
}

function browserCompatibility (filename)
{
   const [, component, typeName] = filename .match (/([^/]+?)\/([^/]+?)\.js$/);

   if (typeName .startsWith ("X3D"))
      return;

   console .log (component, typeName);

   let file = sh ("cat", filename);
}

main ();
