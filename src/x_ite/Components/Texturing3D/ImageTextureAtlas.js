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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DTexture3DNode     from "./X3DTexture3DNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import DEVELOPMENT          from "../../DEVELOPMENT.js";

function ImageTextureAtlas (executionContext)
{
   X3DTexture3DNode .call (this, executionContext);
   X3DUrlObject     .call (this, executionContext);

   this .addType (X3DConstants .ImageTextureAtlas);

   this .image    = $("<img></img>");
   this .canvas   = $("<canvas></canvas>");
   this .urlStack = new Fields .MFString ();
}

Object .assign (Object .setPrototypeOf (ImageTextureAtlas .prototype, X3DTexture3DNode .prototype),
   X3DUrlObject .prototype,
{
   constructor: ImageTextureAtlas,
   initialize ()
   {
      X3DTexture3DNode .prototype .initialize .call (this);
      X3DUrlObject     .prototype .initialize .call (this);

      this .image .on ("load",        this .setImage .bind (this));
      this .image .on ("abort error", this .setError .bind (this));
      this .image .prop ("crossOrigin", "Anonymous");

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   unloadData ()
   {
      this .clearTexture ();
   },
   loadData ()
   {
      this .urlStack .setValue (this ._url);
      this .loadNext ();
   },
   loadNext ()
   {
      if (this .urlStack .length === 0)
      {
         this .clearTexture ();
         this .setLoadState (X3DConstants .FAILED_STATE);
         return;
      }

      // Get URL.

      this .URL = new URL (this .urlStack .shift (), this .getExecutionContext () .getWorldURL ());

      if (this .URL .protocol !== "data:")
      {
         if (!this .getCache ())
            this .URL .searchParams .set ("_", Date .now ());
      }

      this .image .attr ("src", this .URL .href);
   },
   setError (event)
   {
      if (this .URL .protocol !== "data:")
         console .warn (`Error loading image '${decodeURI (this .URL .href)}'`, event .type);

      this .loadNext ();
   },
   setImage ()
   {
      if (DEVELOPMENT)
      {
         if (this .URL .protocol !== "data:")
            console .info (`Done loading image '${decodeURI (this .URL .href)}'`);
      }

      try
      {
         const
            gl     = this .getBrowser () .getContext (),
            image  = this .image [0],
            canvas = this .canvas [0],
            cx     = canvas .getContext ("2d", { willReadFrequently: true });

         const
            width  = image .width,
            height = image .height;

         // Slice me nice.

         const
            slicesOverX    = this ._slicesOverX .getValue (),
            slicesOverY    = this ._slicesOverY .getValue (),
            maxSlices      = slicesOverX * slicesOverY,
            numberOfSlices = Math .min (this ._numberOfSlices .getValue (), maxSlices),
            w              = Math .floor (width / slicesOverX),
            h              = Math .floor (height / slicesOverY),
            data           = new Uint8Array (w * h * numberOfSlices * 4);

         canvas .width  = w;
         canvas .height = h;

         for (let y = 0, i = 0; y < slicesOverY && i < numberOfSlices; ++ y)
         {
            for (let x = 0; x < slicesOverX && i < numberOfSlices; ++ x, ++ i)
            {
               const
                  sx = Math .floor (x * width / slicesOverX),
                  sy = Math .floor (y * height / slicesOverY);

               cx .clearRect (0, 0, w, h);
               cx .drawImage (image, sx, sy, w, h, 0, 0, w, h);

               const d = cx .getImageData (0, 0, w, h) .data;

               data .set (d, w * h * i * 4);
            }
         }

         // Determine image alpha.

         let transparent = true;

         for (let i = 3, length = data .length; i < length; i += 4)
         {
            if (data [i] !== 255)
            {
               transparent = true;
               break;
            }
         }

         this .setTexture (w, h, numberOfSlices, transparent, gl .RGBA, data);
         this .setLoadState (X3DConstants .COMPLETE_STATE);
      }
      catch (error)
      {
         if (DEVELOPMENT)
            console .log (error)

         // Catch security error from cross origin requests.
         this .setError ({ type: error .message });
      }
   },
   dispose ()
   {
      X3DUrlObject     .prototype .dispose .call (this);
      X3DTexture3DNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (ImageTextureAtlas,
{
   typeName:
   {
      value: "ImageTextureAtlas",
      enumerable: true,
   },
   componentName:
   {
      value: "Texturing3D",
      enumerable: true,
   },
   containerField:
   {
      value: "texture",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze (["4.0", "Infinity"]),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "slicesOverX",          new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "slicesOverY",          new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "numberOfSlices",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default ImageTextureAtlas;
