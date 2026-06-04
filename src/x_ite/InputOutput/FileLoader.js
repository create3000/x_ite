import X3DObject    from "../Base/X3DObject.js";
import Fields       from "../Fields.js";
import GoldenGate   from "../Parser/GoldenGate.js";
import X3DWorld     from "../Execution/X3DWorld.js";
import X3DScene     from "../Execution/X3DScene.js";
import DEVELOPMENT  from "../DEVELOPMENT.js";

const foreignMimeType = new Set ([
   "text/html",
   "application/xhtml+xml",
])

function FileLoader (node, { cacheScene = false, dataAsString = true } = { })
{
   X3DObject .call (this);

   this .node             = node;
   this .cacheScene       = cacheScene;
   this .dataAsString     = dataAsString;
   this .browser          = node .getBrowser ();
   this .executionContext = node .getExecutionContext ();
   this .target           = "";
   this .url              = [ ];
   this .fileURL          = new URL (this .getBaseURL ());
   this .controller       = new AbortController ();
}

Object .assign (FileLoader,
{
   sceneCache: new Map (),
   loadDocument (node, url, options)
   {
      return new Promise ((resolve, reject) => new FileLoader (node, options) .loadDocument (url, (data, fileURL) =>
      {
         if (data)
            resolve (data, fileURL);

         reject ();
      }));
   },
});

Object .assign (Object .setPrototypeOf (FileLoader .prototype, X3DObject .prototype),
{
   abort ()
   {
      this .url .length = 0;

      this .controller .abort ();
   },
   getURL ()
   {
      return this .fileURL;
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

         resolve &&= this .setScene .bind (this, scene, resolve, reject);

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
   async set_loadCount__ (scene, resolve, reject)
   {
      try
      {
         if (scene ._loadCount .getValue ())
            return;

         scene ._loadCount .removeInterest ("set_loadCount__", this);

         // Wait for instances to be created and events to be processed.

         await this .browser .nextFrame ();

         if (this .cacheScene)
            scene .cache = true;

         this .resolve ?.(scene);
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
         if (this .fileURL .protocol !== "data:")
            console .info (`Done loading scene '${decodeURI (this .fileURL)}'.`);
      }
   },
   createX3DFromURL (url, parameter, callback, bindViewpoint, foreign)
   {
      this .sceneCallback = callback;
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
         this .createX3DFromString (this .fileURL, data, callback, this .loadDocumentError .bind (this));
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
      if (!url .length)
         return this .loadDocumentError (new Error ("URL is empty."));

      // Script:
      {
         const result = url .match (/^\s*(?:ecmascript|javascript|vrmlscript)\:/s);

         if (result)
            return await this .callback (url .substring (result [0] .length));
      }

      this .fileURL = new URL (url, this .getBaseURL ());

      // Data URL:
      if (this .dataAsString)
      {
         const result = url .match (/^\s*data:(.*?)(?:;charset=(.*?))?(?:;(base64))?,/s);

         if (result && result [3] !== "base64")
         {
            // const mimeType = result [1] || "text/plain"";

            let data = url .substring (result [0] .length);

            data = $.try (() => decodeURIComponent (data)) ?? data; // Decode data.
            data = data .replace (/^ï»¿/, "");                      // Remove BOM.

            return await this .callback (data);
         }
      }

      // Bind Viewpoint URLs:

      if (this .fileURL .protocol !== "data:" && this .bindViewpoint)
      {
         const referer = new URL (this .getBaseURL ());

         if (this .fileURL .protocol === referer .protocol &&
             this .fileURL .hostname === referer .hostname &&
             this .fileURL .port     === referer .port &&
             this .fileURL .pathname === referer .pathname &&
             this .fileURL .hash)
         {
            return this .bindViewpoint (decodeURIComponent (this .fileURL .hash .substring (1)));
         }
      }

      // Foreign targets:

      if (this .foreign)
      {
         // Handle target

         if (this .target .length && this .target !== "_self")
            return this .foreign (this .fileURL .href, this .target);

         // Handle well known foreign content depending on extension or if path looks like directory.

         if (this .fileURL .protocol !== "data:" && this .fileURL .href .match (/\.(?:html|htm|xhtml)$/))
            return this .foreign (this .fileURL .href, this .target);
      }

      // Cached scenes:

      if (this .sceneCallback && this .cacheScene && !this .fileURL .search .length)
      {
         const cacheURL = new URL (this .fileURL);

         cacheURL .hash = "";

         const promise = FileLoader .sceneCache .get (cacheURL .href);

         if (promise)
         {
            const scene = await promise;

            scene .setWorldURL (this .fileURL .href);

            return this .sceneCallback (scene);
         }
         else
         {
            const { promise, resolve } = Promise .withResolvers ();

            this .resolve = resolve;

            FileLoader .sceneCache .set (cacheURL .href, promise);
         }
      }

      // Load URL async:

      const
         options  = { cache: this .node .getCache () ? "default" : "reload", signal: this .controller .signal },
         response = this .checkResponse (await fetch (this .fileURL, options)),
         mimeType = response .headers .get ("Content-Type") ?.replace (/;.*$/, "");

      if (this .foreign)
      {
         // console .log (mimeType);

         if (foreignMimeType .has (mimeType))
            return this .foreign (this .fileURL .href, this .target);
      }

      await this .callback (await $.gunzip (await this .getBlob (response)), this .fileURL);
   },
   async getBlob (response)
   {
      const contentLength = +response .headers .get ("x-file-size") || +response .headers .get ("content-length");

      if (contentLength)
      {
         const
            browser = this .browser,
            reader  = response .body .getReader (),
            values  = [ ];

         let loadedBytes = 0;

         for (;;)
         {
            const { done, value } = await reader .read ();

            if (done)
               break;

            values .push (value)

            // We count decompressed bytes, but loadedBytes can be number of compressed bytes.
            loadedBytes += value .byteLength;

            browser .setLoadingFractions (this .node, Math .min (loadedBytes / contentLength, 1));
         }

         return await new Blob (values);
      }
      else
      {
         return await response .blob ()
      }
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
         this .resolve ?.(null);
         this .callback (null);
      }
   },
   printError (error)
   {
      const typeName = this .node instanceof X3DWorld ? "" : ` for ${this .node .getTypeName ()}`;

      if (this .fileURL .protocol === "data:")
         console .error (`Couldn't load data URL${typeName}.`);
      else
         console .error (`Couldn't load URL '${$.try (() => decodeURI (this .fileURL)) ?? this .fileURL}'${typeName}.`, error);

      console .error (error);
   },
});

for (const key of Object .keys (FileLoader .prototype))
   Object .defineProperty (FileLoader .prototype, key, { enumerable: false });

export default FileLoader;
