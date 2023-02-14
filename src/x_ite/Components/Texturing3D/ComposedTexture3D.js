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
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";

function ComposedTexture3D (executionContext)
{
   X3DTexture3DNode .call (this, executionContext);

   this .addType (X3DConstants .ComposedTexture3D);

   this .addChildObjects ("loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE),
                          "update",    new Fields .SFTime ());

   this .textureNodes = [ ];
}

ComposedTexture3D .prototype = Object .assign (Object .create (X3DTexture3DNode .prototype),
{
   constructor: ComposedTexture3D,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",           new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "texture",           new Fields .MFNode ()),
   ]),
   getTypeName: function ()
   {
      return "ComposedTexture3D";
   },
   getComponentName: function ()
   {
      return "Texturing3D";
   },
   getContainerField: function ()
   {
      return "texture";
   },
   initialize: function ()
   {
      X3DTexture3DNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      this .frameBuffer = gl .createFramebuffer ();

      this ._texture .addInterest ("set_texture__", this);
      this ._update  .addInterest ("update",        this);

      this .set_texture__ ();
   },
   checkLoadState: function ()
   {
      return this ._loadState .getValue ();
   },
   set_texture__: function ()
   {
      const textureNodes = this .textureNodes;

      for (const textureNode of textureNodes)
         textureNode .removeInterest ("set_update__", this);

      textureNodes .length = 0;

      for (const node of this ._texture)
      {
         const textureNode = X3DCast (X3DConstants .X3DTexture2DNode, node);

         if (textureNode)
            textureNodes .push (textureNode);
      }

      for (const textureNode of textureNodes)
         textureNode .addInterest ("set_update__", this);

      this .set_update__ ();
   },
   set_update__: function ()
   {
      this ._update .addEvent ();
   },
   isComplete: function ()
   {
      return this .textureNodes .every (textureNode => textureNode .checkLoadState () === X3DConstants .COMPLETE_STATE || textureNode .getWidth ());
   },
   update: function ()
   {
      const textureNodes = this .textureNodes

      if (textureNodes .length === 0 || !this .isComplete ())
      {
         this .clearTexture ();

         this ._loadState = X3DConstants .FAILED_STATE;
      }
      else
      {
         const
            gl         = this .getBrowser () .getContext (),
            width      = textureNodes [0] .getWidth (),
            height     = textureNodes [0] .getHeight (),
            depth      = textureNodes .length,
            lastBuffer = gl .getParameter (gl .FRAMEBUFFER_BINDING);

         gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);
         gl .texImage3D (gl .TEXTURE_3D, 0, gl .RGBA, width, height, depth, 0, gl .RGBA, gl .UNSIGNED_BYTE, null);

         for (const [i, textureNode] of this .textureNodes .entries ())
         {
            if (textureNode .getWidth () === width && textureNode .getHeight () === height)
            {
               gl .bindTexture (gl .TEXTURE_2D, textureNode .getTexture ());
               gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, textureNode .getTexture (), 0);

               gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
               gl .copyTexSubImage3D (gl .TEXTURE_3D, 0, 0, 0, i, 0, 0, width, height);
            }
            else
            {
               console .log ("ComposedTexture3D: all textures must have same size.");
            }
         }

         gl .bindFramebuffer (gl .FRAMEBUFFER, lastBuffer);

         this .setTransparent (textureNodes .some (textureNode => textureNode .isTransparent ()));
         this .updateTextureParameters ();

         this ._loadState = X3DConstants .COMPLETE_STATE;
      }
   },
});

export default ComposedTexture3D;
