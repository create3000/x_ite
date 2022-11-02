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
   "x_ite/Components/Shape/X3DAppearanceChildNode",
   "x_ite/Base/X3DConstants",
   "standard/Utility/BitSet",
],
function (Fields,
          X3DAppearanceChildNode,
          X3DConstants,
          BitSet)
{
"use strict";

   function X3DMaterialNode (executionContext)
   {
      X3DAppearanceChildNode .call (this, executionContext);

      this .addType (X3DConstants .X3DMaterialNode);

      this .addChildObjects ("transparent", new Fields .SFBool ());

      this ._transparent .setAccessType (X3DConstants .outputOnly);

      this .textureBits = new BitSet ();
      this .shaderNodes = this .getBrowser () .getShaders ();
   }

   X3DMaterialNode .prototype = Object .assign (Object .create (X3DAppearanceChildNode .prototype),
   {
      constructor: X3DMaterialNode,
      initialize: function ()
      {
         X3DAppearanceChildNode .prototype .initialize .call (this);

         this .getBrowser () .getRenderingProperties () ._LogarithmicDepthBuffer .addInterest ("set_logarithmicDepthBuffer__", this);

         this .set_logarithmicDepthBuffer__ ();
      },
      set_logarithmicDepthBuffer__: function ()
      {
         this .logarithmicDepthBuffer = String (this .getBrowser () .getRenderingProperty ("LogarithmicDepthBuffer") ? 1 : 0);
      },
      setTransparent: function (value)
      {
         if (value !== this ._transparent .getValue ())
            this ._transparent = value;
      },
      getTransparent: function ()
      {
         return this ._transparent .getValue ();
      },
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
      getShader: function (geometryContext, renderContext)
      {
         let key = this .textureBits .toString (4);

         key += ".";
         key += this .logarithmicDepthBuffer;
         key += geometryContext .geometryKey;

         if (renderContext)
         {
            const appearanceNode = renderContext .appearanceNode;

            key += ".";
            key += renderContext .shadows ? "1" : "0";
            key += renderContext .fogNode ? renderContext .fogNode .getFogKey () : "0";
            key += renderContext .shapeNode .getShapeKey ();
            key += appearanceNode .getStyleProperties (geometryContext .geometryType) ? "1" : "0";
            key += ".";
            key += renderContext .textureNode ? "1" : appearanceNode .getTextureBits () .toString (4);
            key += ".";
            key += appearanceNode .getTextureTransformMapping () .size || "1";
            key += geometryContext .textureCoordinateMapping .size || "1";
            key += this .getMaterialKey (renderContext .shadows);
         }
         else
         {
            key += ".0000.";
            key += geometryContext .textureNode ? "1" : "0";
            key += ".11";
            key += this .getMaterialKey (false);
         }

         const shaderNode = this .shaderNodes .get (key) || this .createShader (key, geometryContext, renderContext);

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

            return this .getBrowser () .getDefaultShader ();
         }
      },
      getShaderOptions: (function ()
      {
         const geometryTypes = [
            "X3D_GEOMETRY_0D",
            "X3D_GEOMETRY_1D",
            "X3D_GEOMETRY_2D",
            "X3D_GEOMETRY_3D",
         ];

         return function (geometryContext, renderContext)
         {
            const
               browser = this .getBrowser (),
               options = [ ];

            if (browser .getRenderingProperty ("LogarithmicDepthBuffer"))
               options .push ("X3D_LOGARITHMIC_DEPTH_BUFFER");

            options .push (geometryTypes [geometryContext .geometryType]);

            if (geometryContext .hasFogCoords)
               options .push ("X3D_FOG_COORDS");

            if (geometryContext .colorMaterial)
               options .push ("X3D_COLOR_MATERIAL");

            if (geometryContext .hasNormals)
               options .push ("X3D_NORMALS");

            if (renderContext)
            {
               const appearanceNode = renderContext .appearanceNode;

               if (renderContext .shadows)
                  options .push ("X3D_SHADOWS", "X3D_PCF_FILTERING");

               if (renderContext .fogNode)
               {
                  options .push ("X3D_FOG");

                  switch (renderContext .fogNode .getFogKey ())
                  {
                     case "1":
                        options .push ("X3D_FOG_LINEAR");
                        break;
                     case "2":
                        options .push ("X3D_FOG_EXPONENTIAL");
                        break;
                  }
               }

               if (appearanceNode .getStyleProperties (geometryContext .geometryType))
                  options .push ("X3D_STYLE_PROPERTIES");

               if (+this .textureBits)
               {
                  options .push ("X3D_MATERIAL_TEXTURES");
                  options .push ("X3D_NUM_TEXTURE_TRANSFORMS " + (appearanceNode .getTextureTransformMapping () .size || "1"));
                  options .push ("X3D_NUM_TEXTURE_COORDINATES " + (geometryContext .textureCoordinateMapping .size || "1"));
               }
               else
               {
                  if (renderContext .textureNode)
                  {
                     // ScreenText

                     options .push ("X3D_TEXTURE",
                                    "X3D_NUM_TEXTURES 1",
                                    "X3D_NUM_TEXTURE_TRANSFORMS 1",
                                    "X3D_NUM_TEXTURE_COORDINATES 1",
                                    "X3D_TEXTURE0_2D");
                  }
                  else if (+appearanceNode .getTextureBits ())
                  {
                     const textureNode = appearanceNode .getTexture ();

                     options .push ("X3D_TEXTURE");
                     options .push ("X3D_NUM_TEXTURES "            + textureNode .getCount ());
                     options .push ("X3D_NUM_TEXTURE_TRANSFORMS "  + textureNode .getCount ());
                     options .push ("X3D_NUM_TEXTURE_COORDINATES " + textureNode .getCount ());

                     textureNode .getShaderOptions (options);

                     if (textureNode .getType () .includes (X3DConstants .MultiTexture))
                        options .push ("X3D_MULTI_TEXTURING");
                  }
               }

               switch (renderContext .shapeNode .getShapeKey ())
               {
                  case "1":
                     options .push ("X3D_PARTICLE");
                     break;
                  case "2":
                     options .push ("X3D_PARTICLE", "X3D_TEX_COORD_RAMP");
                     break;
               }
            }
            else
            {
               if (geometryContext .textureNode)
               {
                  // X3DBackgroundNode textures

                  options .push ("X3D_TEXTURE",
                                 "X3D_NUM_TEXTURES 1",
                                 "X3D_NUM_TEXTURE_TRANSFORMS 1",
                                 "X3D_NUM_TEXTURE_COORDINATES 1",
                                 "X3D_TEXTURE0_2D");
               }
            }

            return options;
         };
      })(),
   });

   return X3DMaterialNode;
});
