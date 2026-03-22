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

   console .log (component, typeName);

   if (component .includes ("Annotation"))
      return;

   const
      js_f = sh ("cat", js),
      md   = `docs/_posts/components/${component}/${typeName}.md`;

   let md_f = sh ("cat", md);

   let
      x_ite   = js_f .match (/THIS NODE IS NOT SUPPORTED/) ? false : true,
      castle  = undefined,
      x3dom   = undefined,
      freewrl = undefined;

   const map = new Map ([
      [undefined, `<i class="fa-solid fa-circle-question blue" title="Unknown Support"></i>`],
      [true,      `<i class="fa-solid fa-circle-check green" title="Supported"></i>`],
      [false,     `<i class="fa-solid fa-circle-xmark red" title="Not Supported"></i>`],
   ]);

   x_ite   = map .get (x_ite);
   castle  = map .get (castle);
   x3dom   = map .get (x3dom);
   freewrl = map .get (freewrl);

   const replacement = () => `## Browser Compatibility

| X_ITE X3D Browser | Castle Game Engine | X3DOM | FreeWRL |
|-------|--------|-------|
| ${x_ite} | ${castle} | ${x3dom} | ${freewrl} |
{: .browser-compatibility }

## `;

   md_f = md_f .replace (/## Browser Compatibility.*?##\s/s, replacement);

   fs .writeFileSync (md, md_f);
}
