import X3DObject    from "../Base/X3DObject.js";
import Fields       from "../Fields.js";
import GoldenGate   from "../Parser/GoldenGate.js";
import X3DWorld     from "../Execution/X3DWorld.js";
import X3DScene     from "../Execution/X3DScene.js";
import $            from "../../lib/helper.js";
import DEVELOPMENT  from "../DEVELOPMENT.js";

const foreignMimeType = new Set ([
   "text/html",
   "application/xhtml+xml",
]);

const _cache = Symbol .for ("X_ITE.cache");

// Keep diagnostics readable when a candidate is a long data URL.
function truncate (string, length = 120)
{
   return string .length > length ? `${string .substring (0, length)}…` : string;
}

// Not every thrown value is an Error, so don't summarize one as [object Object].
function describe (error)
{
   return error ?.message ?? (typeof error === "object" ? $.try (() => JSON .stringify (error)) : null) ?? String (error);
}

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
   this .candidateURL     = "";
   this .resolvedURL      = null;
   this .attempts         = [ ];
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
   isPrivate ()
   {
      // Don't count for loading objects.
      return true;
   },
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
            scene [_cache] = true;

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

      this .attempts .length = 0;

      if (url .length === 0)
         return this .loadDocumentError ();

      this .loadDocumentAsync (String (this .url .shift ()))
         .catch (this .loadDocumentError .bind (this));
   },
   async loadDocumentAsync (url)
   {
      // Not every candidate reaches URL resolution, so resolvedURL stays null until it
      // does. Diagnostics must not attribute the previous candidate's resolved URL to
      // this one.

      this .candidateURL = url;
      this .resolvedURL  = null;

      if (!url .length)
         return this .loadDocumentError (Error ("Empty URL."));

      // Script:
      {
         const result = url .match (/^\s*(?:ecmascript|javascript|vrmlscript):/s);

         if (result)
            return await this .callback (url .substring (result [0] .length));
      }

      this .fileURL     = new URL (url, this .getBaseURL ());
      this .resolvedURL = this .fileURL;

      // Handle data URLs that are not base64 decoded here:
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
      const contentLength = parseInt (response .headers .get ("x-file-size"))
         || parseInt (response .headers .get ("content-length"));

      // Check getReader because x_ite-node has no getReader.
      if (!contentLength || !response .body .getReader)
         return await response .blob ();

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

         values .push (value);

         // We count decompressed bytes, but loadedBytes can be number of compressed bytes.
         loadedBytes += value .byteLength;

         browser .setLoadingFractions (this .node, Math .min (loadedBytes / contentLength, 1));
      }

      return await new Blob (values);
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
      if (!error)
         return;

      // Candidates that are evaluated rather than fetched — an empty string, or a
      // script URL — have no resolved URL, and are reported by their authored value.

      const
         typeName = this .node instanceof X3DWorld ? "" : ` for ${this .node .getTypeName ()}`,
         dataURL  = this .resolvedURL ?.protocol === "data:",
         resolved = this .resolvedURL && !dataURL ? `${$.try (() => decodeURI (this .resolvedURL)) ?? this .resolvedURL}` : "",
         subject  = !this .candidateURL .length ? "empty URL"
            : dataURL ? "data URL"
            : `URL '${resolved || truncate (this .candidateURL)}'`;

      this .attempts .push ({ url: this .candidateURL, resolved, error });

      // A url field is a fallback list, so a failed candidate is not yet a failure of
      // the resource: a later candidate may still succeed. Report the resource as
      // failed only once every candidate has been tried.

      if (this .url .length)
         return console .warn (`Couldn't load ${subject}${typeName}, trying next of ${this .attempts .length + this .url .length} URLs.`, error);

      if (this .attempts .length === 1)
         return console .error (`Couldn't load ${subject}${typeName}.`, error);

      // Pass the errors themselves along with the summary, so their stacks and context
      // stay inspectable.

      console .error (`Couldn't load any of the ${this .attempts .length} URLs${typeName}, tried in this order:\n`
         + this .attempts
            .map (({ url, resolved, error }, i) =>
               `  ${i + 1}. '${truncate (url)}'${resolved && resolved !== url ? ` → ${truncate (resolved)}` : ""}: ${describe (error)}`)
            .join ("\n"),
         ... this .attempts .map (({ error }) => error));
   },
});

for (const key of Object .keys (FileLoader .prototype))
   Object .defineProperty (FileLoader .prototype, key, { enumerable: false });

export default FileLoader;
