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
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture3DNode     from "./X3DTexture3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function PixelTexture3D (executionContext)
{
   X3DTexture3DNode .call (this, executionContext);

   this .addType (X3DConstants .PixelTexture3D);
}

Object .assign (Object .setPrototypeOf (PixelTexture3D .prototype, X3DTexture3DNode .prototype),
{
   initialize ()
   {
      X3DTexture3DNode .prototype .initialize .call (this);

      this ._image .addInterest ("set_image__", this);

      this .set_image__ ();
   },
   set_image__: (() =>
   {
      const
         OFFSET     = 4,
         COMPONENTS = 0,
         WIDTH      = 1,
         HEIGHT     = 2,
         DEPTH      = 3;

      return function ()
      {
         const image = this ._image;

         if (image .length < OFFSET)
         {
            this .clearTexture ();
            return;
         }

         const
            gl          = this .getBrowser () .getContext (),
            components  = image [COMPONENTS],
            width       = image [WIDTH],
            height      = image [HEIGHT],
            depth       = image [DEPTH],
            transparent = !(components & 1),
            size3D      = width * height * depth;

         let data, format;

         switch (components)
         {
            case 1:
            {
               data   = new Uint8Array (size3D);
               format = gl .LUMINANCE;

               for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
               {
                  data [d ++] = image [i];
               }

               break;
            }
            case 2:
            {
               data   = new Uint8Array (size3D * 2);
               format = gl .LUMINANCE_ALPHA;

               for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
               {
                  const p = image [i];

                  data [d ++] = (p >>> 8) & 0xff;
                  data [d ++] = p & 0xff;
               }

               break;
            }
            case 3:
            {
               data   = new Uint8Array (size3D * 3);
               format = gl .RGB;

               for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
               {
                  const p = image [i];

                  data [d ++] = (p >>> 16) & 0xff;
                  data [d ++] = (p >>> 8)  & 0xff;
                  data [d ++] = p & 0xff;
               }

               break;
            }
            case 4:
            {
               data   = new Uint8Array (size3D * 4);
               format = gl .RGBA;

               for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
               {
                  const p = image [i];

                  data [d ++] = (p >>> 24) & 0xff;
                  data [d ++] = (p >>> 16) & 0xff;
                  data [d ++] = (p >>> 8)  & 0xff;
                  data [d ++] = p & 0xff;
               }

               break;
            }
            default:
            {
               this .clearTexture ();
               return;
            }
         }

         this .setTextureData (width, height, depth, transparent, format, data);
      };
   })(),
});

Object .defineProperties (PixelTexture3D, X3DNode .getStaticProperties ("PixelTexture3D", "Texturing3D", 1, "texture", "3.1"));

Object .defineProperties (PixelTexture3D,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "image",             new Fields .MFInt32 (0, 0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default PixelTexture3D;
