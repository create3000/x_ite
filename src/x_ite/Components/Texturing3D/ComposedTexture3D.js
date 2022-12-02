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

   this .addChildObjects ("loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE));

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

      this ._texture .addInterest ("set_texture__", this);

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
         textureNode .removeInterest ("update", this);

      textureNodes .length = 0;

      for (const node of this ._texture)
      {
         const textureNode = X3DCast (X3DConstants .X3DTexture2DNode, node);

         if (textureNode)
            textureNodes .push (textureNode);
      }

      for (const textureNode of textureNodes)
         textureNode .addInterest ("update", this);

      this .update ();
   },
   update: function ()
   {
      const
         textureNodes = this .textureNodes,
         complete     = textureNodes .every (function (textureNode) { return textureNode .checkLoadState () === X3DConstants .COMPLETE_STATE; });

      if (textureNodes .length === 0 || !complete)
      {
         this .clearTexture ();

         this ._loadState = X3DConstants .FAILED_STATE;
      }
      else
      {
         const
            gl           = this .getBrowser () .getContext (),
            textureNode0 = textureNodes [0],
            width        = textureNode0 .getWidth (),
            height       = textureNode0 .getHeight (),
            depth        = textureNodes .length,
            size         = width * height * 4,
            data         = new Uint8Array (size * depth);

         let transparent = 0;

         for (let i = 0, d = 0; i < depth; ++ i, d += size)
         {
            const
               textureNode = this .textureNodes [i],
               tData       = textureNode .getData ();

            if (textureNode .getWidth () === width && textureNode .getHeight () === height)
            {
               transparent += textureNode .getTransparent ();

               data .set (tData, d);
            }
            else
            {
               console .log ("ComposedTexture3D: all textures must have same size.");
            }
         }

         this .setTexture (width, height, depth, !!transparent, gl .RGBA, data);
         this ._loadState = X3DConstants .COMPLETE_STATE;
      }
   },
});

export default ComposedTexture3D;
