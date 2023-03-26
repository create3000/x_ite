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
import X3DCast                   from "../../Base/X3DCast.js";
import X3DConstants              from "../../Base/X3DConstants.js";
import BitSet                    from "../../../standard/Utility/BitSet.js";

function ComposedCubeMapTexture (executionContext)
{
   X3DEnvironmentTextureNode .call (this, executionContext);

   this .addType (X3DConstants .ComposedCubeMapTexture);

   if (executionContext .getSpecificationVersion () < 4)
   {
      this .addAlias ("front",  this ._frontTexture);
      this .addAlias ("back",   this ._backTexture);
      this .addAlias ("left",   this ._leftTexture);
      this .addAlias ("right",  this ._rightTexture);
      this .addAlias ("bottom", this ._bottomTexture);
      this .addAlias ("top",    this ._topTexture);
   }

   this .addChildObjects ("update", new Fields .SFTime ());

   this .textureNodes  = [null, null, null, null, null, null];
   this .loadStateBits = new BitSet ();
}

ComposedCubeMapTexture .prototype = Object .assign (Object .create (X3DEnvironmentTextureNode .prototype),
{
   constructor: ComposedCubeMapTexture,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "frontTexture",      new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "backTexture",       new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "leftTexture",       new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "rightTexture",      new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "bottomTexture",     new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "topTexture",        new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
   ]),
   getTypeName: function ()
   {
      return "ComposedCubeMapTexture";
   },
   getComponentName: function ()
   {
      return "CubeMapTexturing";
   },
   getContainerField: function ()
   {
      return "texture";
   },
   initialize: function ()
   {
      X3DEnvironmentTextureNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      this .frameBuffer = gl .createFramebuffer ();

      // Upload default data.

      this .clearTexture ();

      // Initialize.

      this ._frontTexture  .addInterest ("set_texture__", this, 0);
      this ._backTexture   .addInterest ("set_texture__", this, 1);
      this ._leftTexture   .addInterest ("set_texture__", this, 2);
      this ._rightTexture  .addInterest ("set_texture__", this, 3);
      this ._topTexture    .addInterest ("set_texture__", this, 5);
      this ._bottomTexture .addInterest ("set_texture__", this, 4);
      this ._update        .addInterest ("update",        this);

      this .set_texture__ (this ._frontTexture,  0);
      this .set_texture__ (this ._backTexture,   1);
      this .set_texture__ (this ._leftTexture,   2);
      this .set_texture__ (this ._rightTexture,  3);
      this .set_texture__ (this ._topTexture,    4);
      this .set_texture__ (this ._bottomTexture, 5);
   },
   set_texture__: function (node, index)
   {
      let textureNode = this .textureNodes [index];

      if (textureNode)
         textureNode .removeInterest ("set_loadState__", this);

      textureNode = this .textureNodes [index] = X3DCast (X3DConstants .X3DTexture2DNode, node);

      if (textureNode)
         textureNode .addInterest ("set_loadState__", this, textureNode, index);

      this .set_loadState__ (textureNode, index);
   },
   set_loadState__: function (textureNode, index)
   {
      if (textureNode)
         this .setLoadStateBit (index, textureNode, textureNode .checkLoadState ());
      else
         this .setLoadStateBit (index, textureNode, X3DConstants .NOT_STARTED);

      this ._update .addEvent ();
   },
   setLoadStateBit: function (bit, textureNode, loadState)
   {
      this .loadStateBits .set (bit, loadState === X3DConstants .COMPLETE_STATE || textureNode .getWidth ());
   },
   isComplete: function ()
   {
      if (+this .loadStateBits !== 0b111111)
         return false;

      const
         textureNodes = this .textureNodes,
         size         = textureNodes [0] .getWidth ();

      for (const textureNode of textureNodes)
      {
         if (textureNode .getWidth () !== size)
            return false;

         if (textureNode .getHeight () !== size)
            return false;
      }

      return true;
   },
   update: function ()
   {
      if (this .isComplete ())
      {
         const
            gl           = this .getBrowser () .getContext (),
            textureNodes = this .textureNodes,
            lastBuffer   = gl .getParameter (gl .FRAMEBUFFER_BINDING);

         gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

         for (let i = 0; i < 6; ++ i)
         {
            const
               textureNode = textureNodes [i],
               width       = textureNode .getWidth (),
               height      = textureNode .getHeight ();

            // Copy color texture.

            switch (textureNode .getType () .at (-1))
            {
               case X3DConstants .ImageTexture:
               case X3DConstants .MovieTexture:
               {
                  gl .bindTexture (this .getTarget (), this .getTexture ());
                  gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width, height, 0, gl .RGBA, gl .UNSIGNED_BYTE, textureNode .getElement ());
                  break;
               }
               default:
               {
                  gl .bindTexture (gl .TEXTURE_2D, textureNode .getTexture ());
                  gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, textureNode .getTexture (), 0);

                  gl .bindTexture (this .getTarget (), this .getTexture ());
                  gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width, height, 0, gl .RGBA, gl .UNSIGNED_BYTE, null);
                  gl .copyTexSubImage2D (this .getTargets () [i], 0, 0, 0, 0, 0, width, height);
                  break;
               }
            }
         }

         gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, false);
         gl .bindFramebuffer (gl .FRAMEBUFFER, lastBuffer);

         this .setTransparent (textureNodes .some (textureNode => textureNode .isTransparent ()));
         this .updateTextureParameters ();
      }
      else
      {
         this .clearTexture ();
      }
   },
});

export default ComposedCubeMapTexture;
