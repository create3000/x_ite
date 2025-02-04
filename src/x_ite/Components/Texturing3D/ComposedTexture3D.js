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
import X3DCast              from "../../Base/X3DCast.js";

function ComposedTexture3D (executionContext)
{
   X3DTexture3DNode .call (this, executionContext);

   this .addType (X3DConstants .ComposedTexture3D);

   this .addChildObjects (X3DConstants .outputOnly, "update", new Fields .SFTime ());

   this .textureNodes = [ ];
}

Object .assign (Object .setPrototypeOf (ComposedTexture3D .prototype, X3DTexture3DNode .prototype),
{
   initialize ()
   {
      X3DTexture3DNode .prototype .initialize .call (this);

      this ._texture .addInterest ("set_texture__", this);
      this ._update  .addInterest ("update",        this);

      this .set_texture__ ();
   },
   set_texture__ ()
   {
      const textureNodes = this .textureNodes;

      for (const textureNode of textureNodes)
         textureNode .removeInterest ("addEvent", this ._update);

      textureNodes .length = 0;

      for (const node of this ._texture)
      {
         const textureNode = X3DCast (X3DConstants .X3DTexture2DNode, node);

         if (textureNode)
            textureNodes .push (textureNode);
      }

      for (const textureNode of textureNodes)
         textureNode .addInterest ("addEvent", this ._update);

      this ._update .addEvent ();
   },
   isComplete ()
   {
      return this .textureNodes .every (textureNode => textureNode .checkLoadState () === X3DConstants .COMPLETE_STATE);
   },
   update ()
   {
      const textureNodes = this .textureNodes

      if (textureNodes .length === 0 || !this .isComplete ())
      {
         this .clearTexture ();
      }
      else
      {
         const
            gl          = this .getBrowser () .getContext (),
            width       = textureNodes [0] .getWidth (),
            height      = textureNodes [0] .getHeight (),
            depth       = textureNodes .length,
            frameBuffer = gl .createFramebuffer ();

         gl .bindFramebuffer (gl .FRAMEBUFFER, frameBuffer);
         gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());

         if (width !== this .getWidth () || height !== this .getHeight () || depth !== this .getDepth ())
         {
            const defaultData = new Uint8Array (width * height * depth * 4);

            gl .texImage3D (gl .TEXTURE_3D, 0, gl .RGBA, width, height, depth, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         }

         for (const [i, textureNode] of this .textureNodes .entries ())
         {
            if (textureNode .getWidth () === width && textureNode .getHeight () === height)
            {
               gl .bindTexture (gl .TEXTURE_2D, textureNode .getTexture ());
               gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, textureNode .getTexture (), 0);

               if (textureNode .getTextureType () === 1)
               {
                  // Copy and flip Y.
                  for (let y = 0; y < height; ++ y)
                     gl .copyTexSubImage3D (gl .TEXTURE_3D, 0, 0, height - y - 1, i, 0, y, width, 1);
               }
               else
               {
                  gl .copyTexSubImage3D (gl .TEXTURE_3D, 0, 0, 0, i, 0, 0, width, height);
               }
            }
            else
            {
               console .warn ("ComposedTexture3D: all textures must have same size.");
            }
         }

         gl .deleteFramebuffer (frameBuffer);

         this .setWidth (width);
         this .setHeight (height);
         this .setDepth (depth);
         this .setTransparent (textureNodes .some (textureNode => textureNode .isTransparent ()));
         this .setLinear (textureNodes .some (textureNode => textureNode .isLinear ()));
         this .setMipMaps (textureNodes .every (textureNode => textureNode .canMipMaps ()));
         this .updateTextureParameters ();
      }
   },
});

Object .defineProperties (ComposedTexture3D,
{
   ... X3DNode .getStaticProperties ("ComposedTexture3D", "Texturing3D", 1, "texture", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texture",           new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ComposedTexture3D;
