/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "x_ite/Fields",
   "x_ite/Basic/X3DFieldDefinition",
   "x_ite/Basic/FieldDefinitionArray",
   "x_ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode",
   "x_ite/Bits/X3DCast",
   "x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DEnvironmentTextureNode,
          X3DCast,
          X3DConstants)
{
"use strict";

   function ComposedCubeMapTexture (executionContext)
   {
      X3DEnvironmentTextureNode .call (this, executionContext);

      this .addType (X3DConstants .ComposedCubeMapTexture);

      this .addAlias ("front",  this .frontTexture_);
      this .addAlias ("back",   this .backTexture_);
      this .addAlias ("left",   this .leftTexture_);
      this .addAlias ("right",  this .rightTexture_);
      this .addAlias ("bottom", this .bottomTexture_);
      this .addAlias ("top",    this .topTexture_);

      this .textures   = [null, null, null, null, null, null];
      this .loadStates = 0;
   }

   ComposedCubeMapTexture .prototype = Object .assign (Object .create (X3DEnvironmentTextureNode .prototype),
   {
      constructor: ComposedCubeMapTexture,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
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

         this .frontTexture_  .addInterest ("set_texture__", this, 0);
         this .backTexture_   .addInterest ("set_texture__", this, 1);
         this .leftTexture_   .addInterest ("set_texture__", this, 2);
         this .rightTexture_  .addInterest ("set_texture__", this, 3);
         this .topTexture_    .addInterest ("set_texture__", this, 5);
         this .bottomTexture_ .addInterest ("set_texture__", this, 4);

         this .set_texture__ (this .frontTexture_,  0);
         this .set_texture__ (this .backTexture_,   1);
         this .set_texture__ (this .leftTexture_,   2);
         this .set_texture__ (this .rightTexture_,  3);
         this .set_texture__ (this .topTexture_,    4);
         this .set_texture__ (this .bottomTexture_, 5);
      },
      set_texture__: function (node, index)
      {
         var texture = this .textures [index];

         if (texture)
         {
            var callbackName = "set_loadState__" + texture .getId () + "_" + index;

            texture .removeInterest ("set_loadState__", this);
            texture .loadState_ .removeFieldCallback (callbackName);
         }

         var texture = this .textures [index] = X3DCast (X3DConstants .X3DTexture2DNode, node);

         if (texture)
         {
            var callbackName = "set_loadState__" + texture .getId () + "_" + index;

            texture .addInterest ("set_loadState__", this, texture, index);
            texture .loadState_ .addFieldCallback (callbackName, this .set_loadState__ .bind (this, null, texture, index));
         }

         this .set_loadState__ (null, texture, index);
      },
      set_loadState__: function (output, texture, index)
      {
         if (texture)
            this .setLoadStateBit (texture .checkLoadState (), texture .getData (), index);
         else
            this .setLoadStateBit (X3DConstants .NOT_STARTED, null, index);

         this .setTextures ();
      },
      setLoadStateBit: function (loadState, data, bit)
      {
         if (loadState === X3DConstants .COMPLETE_STATE || data)
            this .loadStates |= 1 << bit;
         else
            this .loadStates &= ~(1 << bit);
      },
      isComplete: function ()
      {
         if (this .loadStates !== 0x3f) // 0b111111
            return false;

         var
            textures = this .textures,
            size     = textures [0] .getWidth ();

         for (var i = 0; i < 6; ++ i)
         {
            var texture = textures [i];

            if (texture .getWidth () !== size)
               return false;

            if (texture .getHeight () !== size)
               return false;
         }

         return true;
      },
      setTextures: function ()
      {
         var gl = this .getBrowser () .getContext ();

         gl .bindTexture (this .getTarget (), this .getTexture ());
         gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, false);

         if (this .isComplete ())
         {
            var textures = this .textures;

            for (var i = 0; i < 6; ++ i)
            {
               var
                  gl      = this .getBrowser () .getContext (),
                  texture = textures [i],
                  width   = texture .getWidth (),
                  height  = texture .getHeight (),
                  data    = texture .getData ();

               gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, !texture .getFlipY ());
               gl .pixelStorei (gl .UNPACK_ALIGNMENT, 1);

               if (data instanceof Uint8Array)
               {
                  gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width, height, false, gl .RGBA, gl .UNSIGNED_BYTE, data);
               }
               else
               {
                  gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, gl .RGBA, gl .UNSIGNED_BYTE, data);
               }
            }

            this .updateTextureProperties ();
         }
         else
         {
            this .clearTexture ();
         }

         this .set_transparent__ ();
      },
      set_transparent__: function ()
      {
         var
            textures    = this .textures,
            transparent = false;

         if (this .isComplete ())
         {
            for (var i = 0; i < 6; ++ i)
            {
               if (textures [i] .transparent_ .getValue ())
               {
                  transparent = true;
                  break;
               }
            }
         }

         this .setTransparent (transparent);
      },
   });

   return ComposedCubeMapTexture;
});
