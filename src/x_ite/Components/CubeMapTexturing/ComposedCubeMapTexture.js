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

   this .addAlias ("front",  this ._frontTexture);
   this .addAlias ("back",   this ._backTexture);
   this .addAlias ("left",   this ._leftTexture);
   this .addAlias ("right",  this ._rightTexture);
   this .addAlias ("bottom", this ._bottomTexture);
   this .addAlias ("top",    this ._topTexture);

   this .textures      = [null, null, null, null, null, null];
   this .symbols       = [Symbol (), Symbol (), Symbol (), Symbol (), Symbol (), Symbol ()];
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

      // Upload default data.

      this .clearTexture ();

      // Initialize.

      this ._frontTexture  .addInterest ("set_texture__", this, 0);
      this ._backTexture   .addInterest ("set_texture__", this, 1);
      this ._leftTexture   .addInterest ("set_texture__", this, 2);
      this ._rightTexture  .addInterest ("set_texture__", this, 3);
      this ._topTexture    .addInterest ("set_texture__", this, 5);
      this ._bottomTexture .addInterest ("set_texture__", this, 4);

      this .set_texture__ (this ._frontTexture,  0);
      this .set_texture__ (this ._backTexture,   1);
      this .set_texture__ (this ._leftTexture,   2);
      this .set_texture__ (this ._rightTexture,  3);
      this .set_texture__ (this ._topTexture,    4);
      this .set_texture__ (this ._bottomTexture, 5);
   },
   set_texture__: function (node, index)
   {
      let texture = this .textures [index];

      if (texture)
      {
         texture .removeInterest ("set_loadState__", this);
         texture ._loadState .removeFieldCallback (this .symbols [index]);
      }

      texture = this .textures [index] = X3DCast (X3DConstants .X3DTexture2DNode, node);

      if (texture)
      {
         texture .addInterest ("set_loadState__", this, texture, index);
         texture ._loadState .addFieldCallback (this .symbols [index], this .set_loadState__ .bind (this, texture, index));
      }

      this .set_loadState__ (texture, index);
   },
   set_loadState__: function (texture, index)
   {
      if (texture)
         this .setLoadStateBit (index, texture .checkLoadState (), texture .getData ());
      else
         this .setLoadStateBit (index, X3DConstants .NOT_STARTED, null);

      this .updateTextures ();
   },
   setLoadStateBit: function (bit, loadState, data)
   {
      this .loadStateBits .set (bit, loadState === X3DConstants .COMPLETE_STATE || data);
   },
   isComplete: function ()
   {
      if (+this .loadStateBits !== 0b111111)
         return false;

      const
         textures = this .textures,
         size     = textures [0] .getWidth ();

      for (const texture of textures)
      {
         if (texture .getWidth () !== size)
            return false;

         if (texture .getHeight () !== size)
            return false;
      }

      return true;
   },
   updateTextures: function ()
   {
      const gl = this .getBrowser () .getContext ();

      gl .bindTexture (this .getTarget (), this .getTexture ());

      if (this .isComplete ())
      {
         const textures = this .textures;

         for (let i = 0; i < 6; ++ i)
         {
            const
               texture = textures [i],
               width   = texture .getWidth (),
               height  = texture .getHeight (),
               data    = texture .getData ();

            gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, !texture .getFlipY ());

            if (data instanceof Uint8Array)
            {
               gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width, height, false, gl .RGBA, gl .UNSIGNED_BYTE, data);
            }
            else
            {
               gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, gl .RGBA, gl .UNSIGNED_BYTE, data);
            }
         }

         gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, false);

         this .updateTextureParameters ();
      }
      else
      {
         this .clearTexture ();
      }

      this .set_transparent__ ();
   },
   set_transparent__: function ()
   {
      const transparent = false;

      if (this .isComplete ())
      {
         for (const texture of this .textures)
         {
            if (texture ._transparent .getValue ())
            {
               transparent = true;
               break;
            }
         }
      }

      this .setTransparent (transparent);
   },
});

export default ComposedCubeMapTexture;
