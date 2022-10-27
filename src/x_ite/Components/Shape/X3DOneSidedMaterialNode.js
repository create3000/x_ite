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
   "x_ite/Components/Shape/X3DMaterialNode",
   "x_ite/Base/X3DCast",
   "x_ite/Base/X3DConstants",
   "standard/Math/Algorithm",
   "standard/Utility/BitSet",
],
function (Fields,
          X3DMaterialNode,
          X3DCast,
          X3DConstants,
          Algorithm,
          BitSet)
{
"use strict";

   function X3DOneSidedMaterialNode (executionContext)
   {
      X3DMaterialNode .call (this, executionContext);

      this .addType (X3DConstants .X3DOneSidedMaterialNode);

      this .addChildObjects ("textures", new Fields .SFTime ());

      this .emissiveColor = new Float32Array (3);
      this .textureBits   = new BitSet ();
   }

   X3DOneSidedMaterialNode .prototype = Object .assign (Object .create (X3DMaterialNode .prototype),
   {
      constructor: X3DOneSidedMaterialNode,
      initialize: function ()
      {
         X3DMaterialNode .prototype .initialize .call (this);

         this ._emissiveColor   .addInterest ("set_emissiveColor__",   this);
         this ._emissiveTexture .addInterest ("set_emissiveTexture__", this);
         this ._normalTexture   .addInterest ("set_normalTexture__",   this);
         this ._transparency    .addInterest ("set_transparency__",    this);
         this ._transparency    .addInterest ("set_transparent__",     this);

         this .set_emissiveColor__ ();
         this .set_emissiveTexture__ ();
         this .set_normalTexture__ ();
         this .set_transparency__ ();
      },
      set_emissiveColor__: function ()
      {
         //We cannot use this in Windows Edge:
         //this .emissiveColor .set (this ._emissiveColor .getValue ());

         const
            emissiveColor  = this .emissiveColor,
            emissiveColor_ = this ._emissiveColor .getValue ();

         emissiveColor [0] = emissiveColor_ .r;
         emissiveColor [1] = emissiveColor_ .g;
         emissiveColor [2] = emissiveColor_ .b;
      },
      set_emissiveTexture__: function ()
      {
         this .emissiveTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._emissiveTexture);

         this .setTexture (this .getTextureIndices () .EMISSIVE_TEXTURE, this .emissiveTextureNode);
      },
      set_normalTexture__: function ()
      {
         this .normalTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._normalTexture);

         this .setTexture (this .getTextureIndices () .NORMAL_TEXTURE, this .normalTextureNode);
      },
      set_transparency__: function ()
      {
         this .transparency = Algorithm .clamp (this ._transparency .getValue (), 0, 1);
      },
      set_transparent__: function ()
      {
         this .setTransparent (Boolean (this .transparency));
      },
      getEmissiveTexture: function ()
      {
         return this .emissiveTextureNode;
      },
      getNormalTexture: function ()
      {
         return this .normalTextureNode;
      },
      getTransparency: function ()
      {
         return this .transparency;
      },
      getTextureIndices: (function ()
      {
         const textureIndices = {
            EMISSIVE_TEXTURE: 0,
            NORMAL_TEXTURE: 1,
         };

         return function ()
         {
            return textureIndices;
         };
      })(),
      setTexture: function (index, textureNode)
      {
         const textureType = textureNode ? textureNode .getTextureType () - 1 : 0;

         this .textureBits .set (index * 2 + 0, textureType & 0b01);
         this .textureBits .set (index * 2 + 1, textureType & 0b10);
      },
      getTextureBits: function ()
      {
         return this .textureBits;
      },
      getShader: function (geometryContext, shadow)
      {
         // Bit Schema of Shader Key
         //
         // 0  - 13 -> textures
         // 14 - 15 -> shader type
         // 16      -> shadow
         // 17 - 18 -> geometry type
         // 19      -> normals

         let key = this .textureBits .valueOf ();

         key |= this .getMaterialType ()      << 14;
         key |= shadow                        << 16;
         key |= geometryContext .geometryMask << 17;

         const
            browser    = this .getBrowser (),
            shaderNode = browser .getShader (key) || this .createShader (key, geometryContext, shadow);

         if (shaderNode .isValid ())
         {
            geometryContext .shaderNode = shaderNode;

            return shaderNode;
         }
         else
         {
            const shaderNode = geometryContext .shaderNode;

            if (shaderNode && shaderNode .isValid ())
               return shaderNode;

            return browser .getDefaultShader ();
         }
      },
      createShader: function (key, geometryContext, shadow)
      { },
      getGeometryTypes: (function ()
      {
         const geometryTypes = [
            "X3D_GEOMETRY_0D",
            "X3D_GEOMETRY_1D",
            "X3D_GEOMETRY_2D",
            "X3D_GEOMETRY_3D",
         ];

         return function ()
         {
            return geometryTypes;
         }
      })(),
      setShaderUniforms: function (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
      {
         gl .uniform3fv (shaderObject .x3d_EmissiveColor, this .emissiveColor);
         gl .uniform1f  (shaderObject .x3d_Transparency,  this .transparency);

         if (this .textureBits .valueOf ())
         {
            // Emissive parameters

            if (this .emissiveTextureNode)
            {
               const emissiveTexture = shaderObject .x3d_EmissiveTexture;

               this .emissiveTextureNode .setShaderUniformsToChannel (gl, shaderObject, renderObject, emissiveTexture);

               gl .uniform1i (emissiveTexture .textureTransformMapping,  textureTransformMapping  .get (this ._emissiveTextureMapping .getValue ()) || 0);
               gl .uniform1i (emissiveTexture .textureCoordinateMapping, textureCoordinateMapping .get (this ._emissiveTextureMapping .getValue ()) || 0);
            }

            // Normal parameters

            if (this .normalTextureNode)
            {
               const normalTexture = shaderObject .x3d_NormalTexture;

               this .normalTextureNode .setShaderUniformsToChannel (gl, shaderObject, renderObject, normalTexture);

               gl .uniform1i (normalTexture .textureTransformMapping,  textureTransformMapping  .get (this ._normalTextureMapping .getValue ()) || 0);
               gl .uniform1i (normalTexture .textureCoordinateMapping, textureCoordinateMapping .get (this ._normalTextureMapping .getValue ()) || 0);

               gl .uniform1f (shaderObject .x3d_NormalScale, this ._normalScale .getValue ());
            }
         }
      },
   });

   return X3DOneSidedMaterialNode;
});
