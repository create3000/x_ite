import Features        from "../../Features.js";
import BROWSER_VERSION from "../../BROWSER_VERSION.js";

const URLs =
{
   getScriptURL: (() =>
   {
      switch (Features .ENVIRONMENT)
      {
         case "NODE":
         {
            var src = global .require ("url") .pathToFileURL (__filename) .href;
            break;
         }
         case "BROWSER":
         {
            var src = document .currentScript ?.src ?? document .location .href;
            break;
         }
         case "MODULE":
         {
            // var src = import .meta .url;
            break;
         }
      }

      // Prevent caching issues with jsDelivr and UNPKG.
      src = src .replace ("/x_ite@latest/", `/x_ite@${BROWSER_VERSION}/`);

      return function ()
      {
         return src;
      };
   })(),
   getProviderURL (component)
   {
      if (!component)
         return "https://create3000.github.io/x_ite/";

      const min = this .getScriptURL () .match (/\.min\.m?js$/) ? ".min" : "";

      return new URL (`assets/components/${component}Component${min}.js`, this .getScriptURL ()) .href;
   },
   getFontsURL (file)
   {
      return new URL (`assets/fonts/${file}`, this .getScriptURL ()) .href;
   },
   getLinetypeURL ()
   {
      return new URL ("assets/linetype/linetypes.png", this .getScriptURL ()) .href;
   },
   getHatchingURL (index)
   {
      return new URL (`assets/hatching/${index}.png`, this .getScriptURL ()) .href;
   },
   getLibraryURL (file)
   {
      return new URL (`assets/lib/${file}`, this .getScriptURL ()) .href;
   },
};

export default URLs;
