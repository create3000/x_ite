import X3DObject    from "../Base/X3DObject.js";
import Fields       from "../Fields.js";
import GoldenGate   from "../Parser/GoldenGate.js";
import X3DWorld     from "../Execution/X3DWorld.js";
import X3DScene     from "../Execution/X3DScene.js";
import X3DConstants from "../Base/X3DConstants.js";
import DEVELOPMENT  from "../DEVELOPMENT.js";

const foreignMimeType = new Set ([
   "text/html",
   "application/xhtml+xml",
])

function FileLoader (node)
{
   X3DObject .call (this);

   this .node             = node;
   this .browser          = node .getBrowser ();
   this .executionContext = node .getExecutionContext ();
   this .target           = "";
   this .url              = [ ];
   this .URL              = new URL (this .getBaseURL ());
   this .controller       = new AbortController ();
}

Object .assign (Object .setPrototypeOf (FileLoader .prototype, X3DObject .prototype),
{
   abort ()
   {
      this .url .length = 0;

      this .controller .abort ();
   },
   getURL ()
   {
      return this .URL;
   },
   getBaseURL ()
   {
      if (this .node instanceof X3DWorld)
         return this .browser .getBaseURL ();

      return this .executionContext .getBaseURL ();
   },
   getTarget (parameters)
   {
      for (const parameter of parameters)
      {
         const pair = parameter .split ("=");

         if (pair .length !== 2)
            continue;

         if (pair [0] === "target")
            return pair [1];
      }

      return "";
   },
   createX3DFromString (worldURL, string = "", resolve, reject)
   {
      try
      {
         const scene = new X3DScene (this .browser);

         if (!(this .node instanceof X3DWorld))
            scene .setExecutionContext (this .executionContext);

         scene .setWorldURL (new URL (worldURL, this .getBaseURL ()));
         scene .setup ();

         if (resolve)
            resolve = this .setScene .bind (this, scene, resolve, reject);

         new GoldenGate (scene) .parseIntoScene (string, resolve, reject);

         return scene;
      }
      catch (error)
      {
         if (reject)
            reject (error);
         else
            throw error;
      }
   },
   setScene (scene, resolve, reject)
   {
      scene ._loadCount .addInterest ("set_loadCount__", this, scene, resolve, reject);
      scene ._loadCount .addEvent ();
   },
   async set_loadCount__ (scene, resolve, reject, field)
   {
      // Wait for X3DExternprotoDeclaration and Script nodes to be loaded or failed.

      if (scene .externprotos .some (node => node .checkLoadState () === X3DConstants .IN_PROGRESS_STATE))
         return;

      const scripts = Array .from (scene .getLoadingObjects ())
         .filter (node => node .getType () .includes (X3DConstants .Script));

      if (scripts .some (node => node .checkLoadState () === X3DConstants .IN_PROGRESS_STATE))
         return;

      scene ._loadCount .removeInterest ("set_loadCount__", this);

      // Wait for instances to be created.

      await this .browser .nextFrame ();

      try
      {
         resolve (scene);
      }
      catch (error)
      {
         if (reject)
            reject (error);
         else
            throw error;
      }

      if (DEVELOPMENT)
      {
         if (this .URL .protocol !== "data:")
            console .info (`Done loading scene '${decodeURI (this .URL)}'.`);
      }
   },
   createX3DFromURL (url, parameter, callback, bindViewpoint, foreign)
   {
      this .bindViewpoint = bindViewpoint;
      this .foreign       = foreign;
      this .target        = this .getTarget (parameter || new Fields .MFString ());

      return this .loadDocument (url, this .createX3DFromURLAsync .bind (this, callback));
   },
   createX3DFromURLAsync (callback, data)
   {
      if (data === null)
         callback (null);
      else
         this .createX3DFromString (this .URL, data, callback, this .loadDocumentError .bind (this));
   },
   loadDocument (url, callback)
   {
      this .url      = url .slice ();
      this .callback = callback;

      if (url .length === 0)
         return this .loadDocumentError (new Error ("No URL given."));

      this .loadDocumentAsync (String (this .url .shift ()))
         .catch (this .loadDocumentError .bind (this));
   },
   async loadDocumentAsync (url)
   {
      if (url .length === 0)
      {
         this .loadDocumentError (new Error ("URL is empty."));
         return;
      }

      // Script
      {
         const result = url .match (/^\s*(?:ecmascript|javascript|vrmlscript)\:/s);

         if (result)
         {
            await this .callback (url .substring (result [0] .length));
            return;
         }
      }

      this .URL = new URL (url, this .getBaseURL ());

      // Data URL
      {
         const result = url .match (/^\s*data:(.*?)(?:;charset=(.*?))?(?:;(base64))?,/s);

         if (result && result [3] !== "base64")
         {
            // const mimeType = result [1] || "text/plain"";

            let data = url .substring (result [0] .length);

            data = $.try (() => decodeURIComponent (data)) ?? data; // Decode data.
            data = data .replace (/^ï»¿/, "");                      // Remove BOM.

            await this .callback (data);
            return;
         }
      }

      if (this .URL .protocol !== "data:" && this .bindViewpoint)
      {
         const referer = new URL (this .getBaseURL ());

         if (this .URL .protocol === referer .protocol &&
             this .URL .hostname === referer .hostname &&
             this .URL .port     === referer .port &&
             this .URL .pathname === referer .pathname &&
             this .URL .hash)
         {
            this .bindViewpoint (decodeURIComponent (this .URL .hash .substring (1)));
            return;
         }
      }

      if (this .foreign)
      {
         // Handle target

         if (this .target .length && this .target !== "_self")
            return this .foreign (this .URL .href, this .target);

         // Handle well known foreign content depending on extension or if path looks like directory.

         if (this .URL .protocol !== "data:" && this .URL .href .match (/\.(?:html|htm|xhtml)$/))
            return this .foreign (this .URL .href, this .target);
      }

      // Load URL async

      const
         options  = { cache: this .node .getCache () ? "default" : "reload", signal: this .controller .signal },
         response = this .checkResponse (await fetch (this .URL, options)),
         mimeType = response .headers .get ("content-type") ?.replace (/;.*$/, "");

      if (this .foreign)
      {
         // console .log (mimeType);

         if (foreignMimeType .has (mimeType))
            return this .foreign (this .URL .href, this .target);
      }

      await this .callback ($.ungzip (await response .arrayBuffer ()), this .URL);
   },
   checkResponse (response)
   {
      if (response .ok)
         return response;

      throw Error (response .statusText || response .status);
   },
   loadDocumentError (error)
   {
      // Output error.

      this .printError (error);

      // Try to load next URL.

      if (this .url .length)
      {
         this .loadDocumentAsync (String (this .url .shift ()))
            .catch (this .loadDocumentError .bind (this));
      }
      else
      {
         this .callback (null);
      }
   },
   printError (error)
   {
      const typeName = this .node instanceof X3DWorld ? "" : ` of ${this .node .getTypeName()}`;

      if (this .URL .protocol === "data:")
         console .error (`Couldn't load data URL${typeName}.`, error);
      else
         console .error (`Couldn't load URL '${$.try (() => decodeURI (this .URL)) ?? this .URL}'${typeName}.`, error);
   },
});

for (const key of Object .keys (FileLoader .prototype))
   Object .defineProperty (FileLoader .prototype, key, { enumerable: false });

export default FileLoader;
