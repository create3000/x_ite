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

import Fields                 from "../../Fields.js";
import X3DAppearanceChildNode from "./X3DAppearanceChildNode.js";
import AlphaMode              from "../../Browser/Shape/AlphaMode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import BitSet                 from "../../../standard/Utility/BitSet.js";

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
      this .logarithmicDepthBuffer = this .getBrowser () .getRenderingProperty ("LogarithmicDepthBuffer");
   },
   setTransparent: function (value)
   {
      if (value !== this ._transparent .getValue ())
         this ._transparent = value;
   },
   isTransparent: function ()
   {
      return this ._transparent .getValue ();
   },
   getBaseTexture: function ()
   {
      return null;
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
      let key = "";

      key += this .textureBits .toString (4);
      key += ".";
      key += geometryContext .geometryKey;

      if (renderContext)
      {
         const { renderObject, transparent, shadows, fogNode, shapeNode, appearanceNode, textureNode, objectsCount } = renderContext;

         key += this .logarithmicDepthBuffer || renderObject .getViewpoint () .getLogarithmicDepthBuffer () ? 1 : 0;
         key += appearanceNode .getNormalizedAlphaMode (transparent);
         key += this .getMaterialKey (shadows);
         key += shadows ? 1 : 0;
         key += fogNode ?.getFogType () ?? 0;
         key += shapeNode .getShapeKey ();
         key += appearanceNode .getStyleProperties (geometryContext .geometryType) ? 1 : 0;
         key += appearanceNode .getTextureTransformMapping () .size || 1;
         key += geometryContext .textureCoordinateMapping .size || 1;
         key += ".";
         key += objectsCount [0]; // Clip planes
         key += ".";
         key += objectsCount [1]; // Lights
         key += ".";
         key += objectsCount [2]; // Texture projectors
         key += ".";
         key += textureNode ? 1 : appearanceNode .getTextureBits () .toString (4);
      }
      else
      {
         const { textureNode, objectsCount } = geometryContext;

         key += this .logarithmicDepthBuffer ? 1 : 0;
         key += geometryContext .alphaMode;
         key += this .getMaterialKey (false);
         key += "000011";
         key += ".";
         key += objectsCount [0]; // Clip planes
         key += ".";
         key += objectsCount [1]; // Lights
         key += ".";
         key += objectsCount [2]; // Texture projectors
         key += ".";
         key += textureNode ? 1 : 0;
      }

      return this .shaderNodes .get (key) || this .createShader (key, geometryContext, renderContext);
   },
   getShaderOptions: function (geometryContext, renderContext)
   {
      const
         browser = this .getBrowser (),
         options = [ ];

      options .push (`X3D_GEOMETRY_${geometryContext .geometryType}D`);

      if (geometryContext .hasFogCoords)
         options .push ("X3D_FOG_COORDS");

      if (geometryContext .colorMaterial)
         options .push ("X3D_COLOR_MATERIAL");

      if (geometryContext .hasNormals)
         options .push ("X3D_NORMALS");

      if (renderContext)
      {
         const { renderObject, shapeNode, appearanceNode, objectsCount } = renderContext;

         if (this .logarithmicDepthBuffer || renderObject .getViewpoint () .getLogarithmicDepthBuffer ())
            options .push ("X3D_LOGARITHMIC_DEPTH_BUFFER");

         switch (appearanceNode .getNormalizedAlphaMode (renderContext .transparent))
         {
            case AlphaMode .OPAQUE:
               options .push ("X3D_ALPHA_MODE_OPAQUE");
               break;
            case AlphaMode .MASK:
               options .push ("X3D_ALPHA_MODE_MASK");
               break;
            case AlphaMode .BLEND:
               options .push ("X3D_ALPHA_MODE_BLEND");
               break;
         }

         if (renderContext .shadows)
            options .push ("X3D_SHADOWS", "X3D_PCF_FILTERING");

         if (renderContext .fogNode)
         {
            options .push ("X3D_FOG");

            switch (renderContext .fogNode .getFogType ())
            {
               case 1:
                  options .push ("X3D_FOG_LINEAR");
                  break;
               case 2:
                  options .push ("X3D_FOG_EXPONENTIAL");
                  break;
            }
         }

         if (objectsCount [0])
         {
            options .push ("X3D_CLIP_PLANES")
            options .push ("X3D_NUM_CLIP_PLANES " + Math .min (objectsCount [0], browser .getMaxClipPlanes ()));
         }

         if (objectsCount [1])
         {
            options .push ("X3D_LIGHTING")
            options .push ("X3D_NUM_LIGHTS " + Math .min (objectsCount [1], browser .getMaxLights ()));
         }

         if (objectsCount [2])
         {
            options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
            options .push ("X3D_NUM_TEXTURE_PROJECTORS " + Math .min (objectsCount [2], browser .getMaxTextures ()));
         }

         if (appearanceNode .getStyleProperties (geometryContext .geometryType))
            options .push ("X3D_STYLE_PROPERTIES");

         if (+this .textureBits)
            options .push ("X3D_MATERIAL_TEXTURES");

         if (renderContext .textureNode)
         {
            // ScreenText

            options .push ("X3D_TEXTURE",
                           "X3D_NUM_TEXTURES 1",
                           "X3D_NUM_TEXTURE_TRANSFORMS 1",
                           "X3D_NUM_TEXTURE_COORDINATES 1",
                           "X3D_TEXTURE0_2D");
         }
         else
         {
            if (+appearanceNode .getTextureBits () && !this .getBaseTexture ())
            {
               const textureNode = appearanceNode .getTexture ();

               options .push ("X3D_TEXTURE");
               options .push ("X3D_NUM_TEXTURES " + textureNode .getCount ());

               if (textureNode .getType () .includes (X3DConstants .MultiTexture))
                  options .push ("X3D_MULTI_TEXTURING");

               textureNode .getShaderOptions (options);
            }

            options .push ("X3D_NUM_TEXTURE_TRANSFORMS " + (appearanceNode .getTextureTransformMapping () .size || 1));
            options .push ("X3D_NUM_TEXTURE_COORDINATES " + (geometryContext .textureCoordinateMapping .size || 1));
         }

         switch (shapeNode .getShapeKey ())
         {
            case 1:
               options .push ("X3D_PARTICLE_SYSTEM");
               break;
            case 2:
               options .push ("X3D_PARTICLE_SYSTEM", "X3D_TEX_COORD_RAMP");
               break;
         }
      }
      else
      {
         const { textureNode, objectsCount } = geometryContext;

         if (this .logarithmicDepthBuffer)
            options .push ("X3D_LOGARITHMIC_DEPTH_BUFFER");

         if (objectsCount [0])
         {
            options .push ("X3D_CLIP_PLANES")
            options .push ("X3D_NUM_CLIP_PLANES " + Math .min (objectsCount [0], browser .getMaxClipPlanes ()));
         }

         if (objectsCount [1])
         {
            options .push ("X3D_LIGHTING")
            options .push ("X3D_NUM_LIGHTS " + Math .min (objectsCount [1], browser .getMaxLights ()));
         }

         if (objectsCount [2])
         {
            options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
            options .push ("X3D_NUM_TEXTURE_PROJECTORS " + Math .min (objectsCount [2], browser .getMaxTextures ()));
         }

         if (textureNode)
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
   },
});

export default X3DMaterialNode;
