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

import X3DObject       from "../Base/X3DObject.js";
import Fields          from "../Fields.js";
import GoldenGate      from "../Parser/GoldenGate.js";
import X3DWorld        from "../Execution/X3DWorld.js";
import BinaryTransport from "../../standard/Networking/BinaryTransport.js";
import DEBUG           from "../DEBUG.js";

BinaryTransport ($);

const
   ECMAScript    = /^\s*(?:vrmlscript|javascript|ecmascript)\:(.*)$/s,
   dataURL       = /^data:(.*?)(?:;charset=(.*?))?(?:;(base64))?,(.*)$/s,
   contentTypeRx = /^(?:(.*?);(.*?)$)/;

const foreignExtensions = new RegExp ("\.(?:html|xhtml)$");

const foreign = {
   "text/html":             true,
   "application/xhtml+xml": true,
};

const defaultParameter = new Fields .MFString ();

function FileLoader (node, external)
{
   X3DObject .call (this);

   this .node             = node;
   this .browser          = node .getBrowser ();
   this .external         = external === undefined ? this .browser .isExternal () : external;
   this .executionContext = this .external ? node .getExecutionContext () : this .browser .currentScene;
   this .userAgent        = this .browser .getName () + "/" + this .browser .getVersion () + " (X3D Browser; +" + this .browser .getProviderUrl () + ")";
   this .target           = "";
   this .url              = [ ];
   this .URL              = new URL (this .getReferer (), this .getReferer ());
   this .fileReader       = new FileReader ();
   this .text             = true;
}

FileLoader .prototype = Object .assign (Object .create (X3DObject .prototype),
{
   constructor: FileLoader,
   abort: function ()
   {
      this .callback      = Function .prototype;
      this .bindViewpoint = Function .prototype;
      this .foreign       = Function .prototype;
   },
   isPrivate: function ()
   {
      return true;
   },
   getWorldURL: function ()
   {
      return this .URL;
   },
   createX3DFromString: function (worldURL, string = "", success, error)
   {
      try
      {
         const scene = this .browser .createScene ();

         if (this .node instanceof X3DWorld)
            scene .loader = this;
         else
            scene .setExecutionContext (this .executionContext);

         scene .setWorldURL (decodeURI (new URL (worldURL, this .getReferer ()) .href));

         if (success)
            success = this .setScene .bind (this, scene, success, error);

         new GoldenGate (scene) .parseIntoScene (string, success, error);

         return scene;
      }
      catch (exception)
      {
         if (error)
            error (exception);
         else
            throw error;
      }
   },
   setScene: function (scene, success, error)
   {
      scene ._initLoadCount .addInterest ("set_initLoadCount__", this, scene, success, error);
      scene ._initLoadCount .addEvent ();
   },
   set_initLoadCount__: function (scene, success, error, field)
   {
      if (field .getValue ())
         return;

      scene ._initLoadCount .removeInterest ("set_initLoadCount__", this);

      delete scene .loader;

      try
      {
         success (scene);
      }
      catch (exception)
      {
         if (error)
            error (exception);
         else
            throw exception;
      }

      if (DEBUG)
      {
         if (this .URL .protocol !== "data:")
            console .info ("Done loading scene " + decodeURI (this .URL .href));
      }
   },
   createX3DFromURL: function (url, parameter, callback, bindViewpoint, foreign)
   {
      this .bindViewpoint = bindViewpoint;
      this .foreign       = foreign;
      this .target        = this .getTarget (parameter || defaultParameter);

      if (callback)
         return this .loadDocument (url, this .createX3DFromURLAsync .bind (this, callback));

      return this .createX3DFromURLSync (url);
   },
   createX3DFromURLAsync: function (callback, data)
   {
      if (data === null)
         callback (null, this .URL);
      else
         this .createX3DFromString (this .URL, data, callback, this .loadDocumentError .bind (this));
   },
   createX3DFromURLSync: function (urls)
   {
      if (urls .length === 0)
         throw new Error ("No URL given.");

      let
         scene   = null,
         success = false;

      for (const url of urls)
      {
         this .URL = new URL (url, this .getReferer ());

         $.ajax ({
            url: decodeURI (this .URL .href),
            dataType: "text",
            async: false,
            cache: this .node .getCache (),
            //timeout: 15000,
            global: false,
            context: this,
            success: function (data)
            {
               try
               {
                  scene   = this .createX3DFromString (this .URL, data);
                  success = true;
               }
               catch (exception)
               {
                  this .error (exception);
               }
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
               //console .warn ("Couldn't load URL '" + this .URL .href + "': " + errorThrown + ".");
            },
         });

         if (success)
            return scene;
      }

      throw new Error ("Couldn't load any url of '" + Array .prototype .join .call (urls, ", ") + "'.");
   },
   loadScript: function (url, callback)
   {
      this .script = true;

      this .loadDocument (url, callback);
   },
   loadDocument: function (url, callback)
   {
      this .url       = url .copy ();
      this .callback  = callback;

      if (url .length === 0)
         return this .loadDocumentError (new Error ("No URL given."));

      this .loadDocumentAsync (this .url .shift ());
   },
   loadBinaryDocument: function (url, callback)
   {
      this .url       = url .copy ();
      this .callback  = callback;
      this .text      = false;

      if (url .length === 0)
         return this .loadDocumentError (new Error ("No URL given."));

      this .loadDocumentAsync (this .url .shift ());
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
   loadDocumentAsync: function (url)
   {
      try
      {
         if (url .length === 0)
         {
            this .loadDocumentError (new Error ("URL is empty."));
            return;
         }

         // Script

         if (this .script)
         {
            const result = ECMAScript .exec (url);

            if (result)
            {
               this .callback (result [1]);
               return;
            }
         }

         // Test for data URL here.

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
                  data = unescape (data);

               this .callback (data);
               return;
            }
         }

         this .URL = new URL (url, this .getReferer ());

         if (this .bindViewpoint)
         {
            if (this .URL .href .substr (0, this .getReferer () .length) === this .getReferer ())
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

         $.ajax ({
            url: decodeURI (this .URL .href),
            dataType: "binary",
            async: true,
            cache: this .node .getCache (),
            //timeout: 15000,
            global: false,
            context: this,
            success: function (blob, status, xhr)
            {
               if (this .foreign)
               {
                  //console .log (this .getContentType (xhr));

                  if (foreign [this .getContentType (xhr)])
                     return this .foreign (this .URL .href, this .target);
               }

               if (this .text)
               {
                  this .fileReader .onload = this .readAsArrayBuffer .bind (this, blob);

                  this .fileReader .readAsArrayBuffer (blob);
               }
               else
               {
                  this .fileReader .onload = this .readAsBinaryString .bind (this);

                  this .fileReader .readAsBinaryString (blob);
               }
            },
            error: function (xhr, textStatus, exception)
            {
               this .loadDocumentError (new Error (exception));
            },
         });
      }
      catch (exception)
      {
         this .loadDocumentError (exception);
         return;
      }
   },
   readAsArrayBuffer: function (blob)
   {
      try
      {
         this .callback (pako .ungzip (this .fileReader .result, { to: "string" }), this .URL);
      }
      catch (exception)
      {
         this .fileReader .onload = this .readAsText .bind (this, blob);

         this .fileReader .readAsText (blob);
      }
   },
   readAsText: function (blob)
   {
      try
      {
         this .callback (this .fileReader .result, this .URL);
      }
      catch (exception)
      {
         this .loadDocumentError (exception);
      }
   },
   readAsBinaryString: function ()
   {
      try
      {
         this .callback (this .fileReader .result, this .URL);
      }
      catch (exception)
      {
         this .loadDocumentError (exception);
      }
   },
   loadDocumentError: function (exception)
   {
      // Output exception.

      this .error (exception);

      // Try to load next URL.

      if (this .url .length)
         this .loadDocumentAsync (this .url .shift ());

      else
         this .callback (null);
   },
   error: function (exception)
   {
      if (this .URL .protocol === "data:")
         console .warn ("Couldn't load URL 'data':", exception .message);
      else
         console .warn ("Couldn't load URL '" + decodeURI (this .URL .href) + "':", exception .message);

      if (DEBUG)
         console .error (exception);
   },
   getReferer: function ()
   {
      if (this .node .getTypeName () === "X3DWorld")
      {
         if (this .external)
            return this .browser .getLocation ();
      }

      return this .executionContext .getWorldURL ();
   },
   getContentType: function (xhr)
   {
      const
         contentType = xhr .getResponseHeader ("Content-Type"),
         result      = contentTypeRx .exec (contentType);

      if (result)
         return result [1];

      return "";
   },
});

for (const key of Reflect .ownKeys (FileLoader .prototype))
   Object .defineProperty (FileLoader .prototype, key, { enumerable: false });

export default FileLoader;
