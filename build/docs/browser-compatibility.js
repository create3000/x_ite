const
   json   = require ("./browser-compatibility.json"),
   { sh } = require ("shell-tools"),
   fs     = require ("fs");

main ();

function main ()
{
   console .log ("Update browser compatibility ...");

   const files = sh ("ls -C1 src/x_ite/Components/**/*.js") .trim () .split ("\n");

   files .forEach (filename => browserCompatibility (filename));
}

function browserCompatibility (js)
{
   const [, component, typeName] = js .match (/([^/]+?)\/([^/]+?)\.js$/);

   if (typeName .startsWith ("X3D"))
      return;

   if (component .includes ("Annotation"))
      return;

   const
      js_f = sh ("cat", js),
      md   = `docs/_posts/components/${component}/${typeName}.md`;

   const map = new Map ([
      [undefined, `<i class="fa-solid fa-circle-question blue" title="Unknown Support"></i>`],
      [true,      `<i class="fa-solid fa-circle-check green" title="Supported"></i>`],
      [false,     `<i class="fa-solid fa-circle-xmark red" title="Not Supported"></i>`],
   ]);

   const
      x_ite    = map .get (js_f .match (/THIS NODE IS NOT SUPPORTED/) ? false : true),
      castle   = map .get (json [typeName] ?.["castle"]),
      freewrl  = map .get (json [typeName] ?.["freewrl"]),
      x3d_edit = map .get (json [typeName] ?.["x3d-edit"]),
      x3dom    = map .get (json [typeName] ?.["x3dom"]);

   const replacement = `## Browser Compatibility

| Castle Game Engine | FreeWRL | X_ITE X3D Browser | X3D-Edit | X3DOM |
|-------|--------|-------|
| ${castle} | ${freewrl} | ${x_ite} | ${x3d_edit} | ${x3dom} |
{: .browser-compatibility }

## `;

   let md_f = sh ("cat", md);

   md_f = md_f .replace (/## Browser Compatibility.*?##\s/s, replacement);

   fs .writeFileSync (md, md_f);
}

/*
Warp prompt:

Please make a json file from comparison.csv with the following objects "{ "node name": { "x3d-edit", true/false, castle": true/false, "x3dom": true/false, "freewrl": true/false }, "next node name": ... }"
*/
