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

import Fields                    from "../../Fields.js";
import X3DFieldDefinition        from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray      from "../../Base/FieldDefinitionArray.js";
import X3DEnvironmentTextureNode from "./X3DEnvironmentTextureNode.js";
import X3DUrlObject              from "../Networking/X3DUrlObject.js";
import X3DConstants              from "../../Base/X3DConstants.js";
import Vector2                   from "../../../standard/Math/Numbers/Vector2.js";
import Algorithm                 from "../../../standard/Math/Algorithm.js";
import DEBUG                     from "../../DEBUG.js";

const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

const offsets = [
   new Vector2 (1, 1), // Front
   new Vector2 (3, 1), // Back
   new Vector2 (0, 1), // Left
   new Vector2 (2, 1), // Right
   new Vector2 (1, 0), // Bottom, must be exchanged with top
   new Vector2 (1, 2), // Top, must be exchanged with bottom
];

function ImageCubeMapTexture (executionContext)
{
   X3DEnvironmentTextureNode .call (this, executionContext);
   X3DUrlObject .call (this, executionContext);

   this .addType (X3DConstants .ImageCubeMapTexture);

   this .image    = $("<img></img>");
   this .canvas   = $("<canvas></canvas>");
   this .urlStack = new Fields .MFString ();
}

ImageCubeMapTexture .prototype = Object .assign (Object .create (X3DEnvironmentTextureNode .prototype),
   X3DUrlObject .prototype,
{
   constructor: ImageCubeMapTexture,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties",    new Fields .SFNode ()),
   ]),
   getTypeName: function ()
   {
      return "ImageCubeMapTexture";
   },
   getComponentName: function ()
   {
      return "CubeMapTexturing";
   },
   getContainerField: function ()
   {
      return "texture";
   },
   getSpecificationRange: function ()
   {
      return ["3.0", "Infinity"];
   },
   initialize: function ()
   {
      X3DEnvironmentTextureNode .prototype .initialize .call (this);
      X3DUrlObject              .prototype .initialize .call (this);

      // Upload default data.

      const gl = this .getBrowser () .getContext ();

      gl .bindTexture (this .getTarget (), this .getTexture ());

      for (let i = 0; i < 6; ++ i)
         gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

      // Initialize.

      this .image .on ("load",        this .setImage .bind (this));
      this .image .on ("abort error", this .setError .bind (this));
      this .image .prop ("crossOrigin", "Anonymous");

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   unloadData: function ()
   {
      this .clearTexture ();
   },
   loadData: function ()
   {
      this .urlStack .setValue (this ._url);
      this .loadNext ();
   },
   loadNext: function ()
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
   setError: function ()
   {
      if (this .URL .protocol !== "data:")
         console .warn (`Error loading image '${decodeURI (this .URL .href)}'`);

      this .loadNext ();
   },
   setImage: function ()
   {
      if (DEBUG)
      {
          if (this .URL .protocol !== "data:")
            console .info (`Done loading image cube map texture '${decodeURI (this .URL .href)}'`);
      }

      try
      {
         const
            image  = this .image [0],
            canvas = this .canvas [0],
            cx     = canvas .getContext ("2d", { willReadFrequently: true });

         let
            width     = image .width,
            height    = image .height,
            width1_4  = Math .floor (width / 4),
            height1_3 = Math .floor (height / 3);

         // Scale image.

         if (! Algorithm .isPowerOfTwo (width1_4) || ! Algorithm .isPowerOfTwo (height1_3) || width1_4 * 4 !== width || height1_3 * 3 !== height)
         {
            width1_4  = Algorithm .nextPowerOfTwo (width1_4);
            height1_3 = Algorithm .nextPowerOfTwo (height1_3);
            width     = width1_4  * 4;
            height    = height1_3 * 3;

            canvas .width  = width;
            canvas .height = height;

            cx .drawImage (image, 0, 0, image .width, image .height, 0, 0, width, height);
         }
         else
         {
            canvas .width  = width;
            canvas .height = height;

            cx .drawImage (image, 0, 0);
         }

         // Extract images.

         const gl = this .getBrowser () .getContext ();

         let opaque = true;

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (let i = 0; i < 6; ++ i)
         {
            const data = cx .getImageData (offsets [i] .x * width1_4, offsets [i] .y * height1_3, width1_4, height1_3) .data;

            // Determine image alpha.

            if (opaque)
            {
               for (let a = 3; a < data .length; a += 4)
               {
                  if (data [a] !== 255)
                  {
                     opaque = false;
                     break;
                  }
               }
            }

            // Transfer image.

            gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width1_4, height1_3, false, gl .RGBA, gl .UNSIGNED_BYTE, new Uint8Array (data .buffer));
         }

         this .updateTextureParameters ();

         // Update transparent field.

         this .setTransparent (! opaque);

         // Update load state.

         this .setLoadState (X3DConstants .COMPLETE_STATE);
      }
      catch (error)
      {
         // Catch security error from cross origin requests.
         console .log (error .message);
         this .setError ();
      }
   },
   dispose: function ()
   {
      X3DUrlObject              .prototype .dispose .call (this);
      X3DEnvironmentTextureNode .prototype .dispose .call (this);
   },
});

export default ImageCubeMapTexture;
