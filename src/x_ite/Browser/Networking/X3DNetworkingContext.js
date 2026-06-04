import X3DConstants from "../../Base/X3DConstants.js";
import Fields       from "../../Fields.js";
import URLs         from "./URLs.js";
import X3DScene     from "../../Execution/X3DScene.js";
import _            from "../../../locale/gettext.js";

const
   _baseURL        = Symbol (),
   _loadingDisplay = Symbol (),
   _loadingTotal   = Symbol (),
   _loadingObjects = Symbol (),
   _browserLoading = Symbol (),
   _set_loadCount  = Symbol (),
   _loadFractions  = Symbol (),
   _defaultScene   = Symbol ();

function getBaseURI (element)
{
   const baseURI = element .prop ("baseURI");

   // Fix for Edge.
   if (baseURI .startsWith ("about:"))
      return document .baseURI;

   return baseURI;
}

function X3DNetworkingContext ()
{
   this .addChildObjects (X3DConstants .outputOnly, "loadCount", new Fields .SFInt32 ());

   this [_baseURL]        = getBaseURI (this .getElement ());
   this [_browserLoading] = false;
   this [_loadingDisplay] = 0;
   this [_loadingTotal]   = 0;
   this [_loadingObjects] = new Set ();
   this [_loadFractions]  = new Map ();
}

Object .assign (X3DNetworkingContext .prototype,
{
   initialize ()
   {
      this ._loadCount .addInterest (_set_loadCount, this);
   },
   getScriptURL ()
   {
      return URLs .getScriptURL ();
   },
   getProviderURL ()
   {
      return URLs .getProviderURL ();
   },
   getBaseURL ()
   {
      return this [_baseURL];
   },
   setBaseURL (value)
   {
      const
         base = getBaseURI (this .getElement ()),
         url  = new URL (value, base);

      this [_baseURL] = url .protocol .match (/^(?:data|blob):$/) ? base : url .href;
   },
   getBrowserLoading ()
   {
      return this [_browserLoading];
   },
   setBrowserLoading (value)
   {
      this [_browserLoading] = value;

      if (value)
      {
         if (!this [_loadingObjects] .has (this))
            this .resetLoadCount ();

         this .getShadow () .find (".x_ite-private-world-info") .remove ();

         if (this .getBrowserOption ("SplashScreen"))
         {
            this .getContextMenu () .hide ();
            this .getCanvas () .hide ();
            this .getSplashScreen () .removeClass (["x_ite-private-fade-out-splash-screen", "x_ite-private-hidden"]);
         }
      }
      else
      {
         this .resetLoadCount ();

         if (this .getBrowserOption ("SplashScreen"))
         {
            this .getCanvas () .show ();

            // Defer until promises are resolved.
            setTimeout (() =>
            {
               if (!this [_browserLoading])
                  this .getSplashScreen () .addClass ("x_ite-private-fade-out-splash-screen");
            });
         }
      }
   },
   getLoadingObjects ()
   {
      return this [_loadingObjects];
   },
   addLoadingObject (object)
   {
      if (!this [_loadingObjects] .has (object))
         ++ this [_loadingTotal];

      this [_loadingObjects] .add (object);

      this ._loadCount = this [_loadingObjects] .size;
   },
   removeLoadingObject (object)
   {
      this [_loadingObjects] .delete (object);

      this ._loadCount = this [_loadingObjects] .size;
   },
   getDisplayLoadCount ()
   {
      return Array .from (this [_loadingObjects]) .reduce ((v, o) => v + !o .isPrivate ?.(), 0);
   },
   resetLoadCount ()
   {
      this ._loadCount       = 0;
      this [_loadingDisplay] = 0;
      this [_loadingTotal]   = 0;

      this [_loadingObjects] .clear ();
      this [_loadFractions]  .clear ();

      for (const object of this .getPrivateScene () .getLoadingObjects ())
         this .addLoadingObject (object);
   },
   setLoadingFractions (object, fractions)
   {
      if (!this [_browserLoading])
         return;

      // Let fractions go from 1 to 0.
      this [_loadFractions] .set (object, 1 - fractions);
      this [_set_loadCount] ();
   },
   [_set_loadCount] ()
   {
      const loadingDisplay = this .getDisplayLoadCount ();

      let string;

      if (this ._loadCount .getValue () || this [_browserLoading])
      {
         string = ((loadingDisplay || 1) === 1
            ? _ ("Loading %1 file")
            : _ ("Loading %1 files")) .replace ("%1", loadingDisplay || 1);
      }
      else
      {
         string = _("Loading done");
      }

      this .updateCursor ();

      if (this [_browserLoading])
      {
         const loadFractions = Array .from (this [_loadFractions] .values ())
            .reduce ((p, c) => p + c, 0);

         // Let the loading fractions 1/2 of the count.
         const fractions = 1 - (this ._loadCount .getValue () + loadFractions)
            / (this [_loadingTotal] + this [_loadFractions] .size);

         this .getSplashScreen () .find (".x_ite-private-spinner-text") .text (string);
         this .getSplashScreen () .find (".x_ite-private-progressbar div")
            .css ("width", `${100 * fractions}%`);
      }
      else
      {
         if (loadingDisplay !== this [_loadingDisplay])
            this .setDescription (string);
      }

      this [_loadingDisplay] = loadingDisplay;
   },
   getDefaultScene ()
   {
      // Inline node's empty scene.

      return this [_defaultScene] ??= (() =>
      {
         const defaultScene = new X3DScene (this);

         defaultScene .setup ();
         defaultScene .setLive (this .isLive ());

         return defaultScene;
      })();
   },
});

export default X3DNetworkingContext;
