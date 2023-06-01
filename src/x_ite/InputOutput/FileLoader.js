/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import X3DObject  from "../Base/X3DObject.js";
import Fields     from "../Fields.js";
import GoldenGate from "../Parser/GoldenGate.js";
import X3DWorld   from "../Execution/X3DWorld.js";
import DEBUG      from "../DEBUG.js";

const
   ECMAScript = /^\s*(?:vrmlscript|javascript|ecmascript)\:(.*)$/s,
   dataURL    = /^data:(.*?)(?:;charset=(.*?))?(?:;(base64))?,(.*)$/s;

const foreignExtensions = new RegExp ("\.(?:html|htm|xhtml)$");

const foreign = {
   "text/html":             true,
   "application/xhtml+xml": true,
};

const defaultParameter = new Fields .MFString ();

function FileLoader (node)
{
   X3DObject .call (this);

   this .node             = node;
   this .browser          = node .getBrowser ();
   this .external         = this .browser .isExternal ();
   this .executionContext = this .external ? node .getExecutionContext () : this .browser .currentScene;
   this .target           = "";
   this .url              = [ ];
   this .URL              = new URL (this .getReferer (), this .getReferer ());
   this .controller       = new AbortController ();
}

FileLoader .prototype = Object .assign (Object .create (X3DObject .prototype),
{
   constructor: FileLoader,
   abort: function ()
   {
      this .url .length = 0;

      this .controller .abort ();
   },
   getURL: function ()
   {
      return this .URL;
   },
   getReferer: function ()
   {
      if (this .node instanceof X3DWorld)
      {
         if (this .external)
            return this .browser .getBaseURL ();
      }

      return this .executionContext .getWorldURL ();
   },
   getTarget: function (parameters)
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
   createX3DFromString: function (worldURL, string = "", resolve, reject)
   {
      try
      {
         const scene = this .browser .createScene ();

         if (this .node instanceof X3DWorld)
            scene .loader = this;
         else
            scene .setExecutionContext (this .executionContext);

         scene .setWorldURL (new URL (worldURL, this .getReferer ()) .href);

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
   setScene: function (scene, resolve, reject)
   {
      scene ._initLoadCount .addInterest ("set_initLoadCount__", this, scene, resolve, reject);
      scene ._initLoadCount .addEvent ();
   },
   set_initLoadCount__: function (scene, resolve, reject, field)
   {
      // Wait for extern protos to be loaded.

      if (field .getValue ())
         return;

      scene ._initLoadCount .removeInterest ("set_initLoadCount__", this);

      delete scene .loader;

      // Wait for instances to be created.

      setTimeout (() =>
      {
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
      });

      if (DEBUG)
      {
         if (this .URL .protocol !== "data:")
            console .info (`Done loading scene '${decodeURI (this .URL .href)}'`);
      }
   },
   createX3DFromURL: function (url, parameter, callback, bindViewpoint, foreign)
   {
      this .bindViewpoint = bindViewpoint;
      this .foreign       = foreign;
      this .target        = this .getTarget (parameter || defaultParameter);

      return this .loadDocument (url, this .createX3DFromURLAsync .bind (this, callback));
   },
   createX3DFromURLAsync: function (callback, data)
   {
      if (data === null)
         callback (null);
      else
         this .createX3DFromString (this .URL, data, callback, this .loadDocumentError .bind (this));
   },
   loadDocument: function (url, callback)
   {
      this .url      = url .copy ();
      this .callback = callback;

      if (url .length === 0)
         return this .loadDocumentError (new Error ("No URL given."));

      this .loadDocumentAsync (this .url .shift ())
         .catch (this .loadDocumentError .bind (this));
   },
   loadDocumentAsync: async function (url)
   {
      if (url .length === 0)
      {
         this .loadDocumentError (new Error ("URL is empty."));
         return;
      }

      // Script
      {
         const result = ECMAScript .exec (url);

         if (result)
         {
            this .callback (result [1]);
            return;
         }
      }

      // Data URL
      {
         const result = dataURL .exec (url);

         if (result)
         {
            //const mimeType = result [1];

            // ??? If called from loadURL and mime type is text/html do a window.open or window.location=URL and return; ???

            let data = result [4];

            if (result [3] === "base64")
               data = atob (data);
            else
               data = unescape (data); // Don't use decodeURIComponent!

            this .callback (data);
            return;
         }
      }

      this .URL = new URL (url, this .getReferer ());

      if (this .bindViewpoint)
      {
			const referer = new URL (this .getReferer ());

         if (this .URL .protocol === referer .protocol &&
				 this .URL .hostname === referer .hostname &&
				 this .URL .port === referer .port &&
				 this .URL .pathname === referer .pathname &&
             this .URL .hash)
         {
            this .bindViewpoint (decodeURIComponent (this .URL .hash .substr (1)));
            return;
         }
      }

      if (this .foreign)
      {
         // Handle target

         if (this .target .length && this .target !== "_self")
            return this .foreign (this .URL .href, this .target);

         // Handle well known foreign content depending on extension or if path looks like directory.

         if (this .URL .href .match (foreignExtensions))
            return this .foreign (this .URL .href, this .target);
      }

      // Load URL async

      const
         options     = { cache: this .node .getCache () ? "default" : "reload", signal: this .controller .signal },
         response    = this .handleErrors (await fetch (this .URL .href, options)),
         contentType = response .headers .get ("content-type") ?.replace (/;.*$/, "");

      if (this .foreign)
      {
         // console .log (contentType);

         if (foreign [contentType])
            return this .foreign (this .URL .href, this .target);
      }

      this .callback ($.ungzip (await response .arrayBuffer ()), this .URL);
   },
   handleErrors: function (response)
   {
      if (response .ok)
         return response;

      throw Error (response .statusText || response .status);
   },
   loadDocumentError: function (error)
   {
      // Output error.

      this .setError (error);

      // Try to load next URL.

      if (this .url .length)
      {
         this .loadDocumentAsync (this .url .shift ())
            .catch (this .loadDocumentError .bind (this));
      }
      else
      {
         this .callback (null);
      }
   },
   setError: function (error)
   {
      if (this .URL .protocol === "data:")
         console .warn (`Couldn't load data URL: ${error .message}`);
      else
         console .warn (`Couldn't load URL '${decodeURI (this .URL .href)}': ${error .message}`);

      if (DEBUG)
         console .error (error);
   },
});

for (const key of Reflect .ownKeys (FileLoader .prototype))
   Object .defineProperty (FileLoader .prototype, key, { enumerable: false });

export default FileLoader;
