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

import Fields                             from "../../Fields.js";
import X3DFieldDefinition                 from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray               from "../../Base/FieldDefinitionArray.js";
import X3DNode                            from "../Core/X3DNode.js";
import X3DComposableVolumeRenderStyleNode from "./X3DComposableVolumeRenderStyleNode.js";
import X3DConstants                       from "../../Base/X3DConstants.js";
import X3DCast                            from "../../Base/X3DCast.js";

function CartoonVolumeStyle (executionContext)
{
   X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .CartoonVolumeStyle);
}

Object .assign (Object .setPrototypeOf (CartoonVolumeStyle .prototype, X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_surfaceNormals__ ();
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "colorSteps_"      + this .getId (), this ._colorSteps      .copy ());
      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "orthogonalColor_" + this .getId (), this ._orthogonalColor .copy ());
      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "parallelColor_"   + this .getId (), this ._parallelColor   .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// CartoonVolumeStyle\n";
      string += "\n";
      string += "uniform int  colorSteps_" + this .getId () + ";\n";
      string += "uniform vec4 orthogonalColor_" + this .getId () + ";\n";
      string += "uniform vec4 parallelColor_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec3\n";
      string += "rgb2hsv_" + this .getId () + " (in vec3 color)\n";
      string += "{\n";
      string += "   float h = 0.0;\n";
      string += "   float s = 0.0;\n";
      string += "   float v = 0.0;\n";
      string += "\n";
      string += "   float min = min (min (color .r, color .g), color .b);\n";
      string += "   float max = max (max (color .r, color .g), color .b);\n";
      string += "   v = max; // value\n";
      string += "\n";
      string += "   float delta = max - min;\n";
      string += "\n";
      string += "   if (max != 0.0 && delta != 0.0)\n";
      string += "   {\n";
      string += "      s = delta / max; // s\n";
      string += "\n";
      string += "      if (color .r == max)\n";
      string += "         h =     (color .g - color .b) / delta;  // between yellow & magenta\n";
      string += "      else if (color .g == max)\n";
      string += "         h = 2.0 + (color .b - color .r) / delta;  // between cyan & yellow\n";
      string += "      else\n";
      string += "         h = 4.0 + (color .r - color .g) / delta;  // between magenta & cyan\n";
      string += "\n";
      string += "      h *= M_PI / 3.0;  // radiants\n";
      string += "      if (h < 0.0)\n";
      string += "         h += M_PI * 2.0;\n";
      string += "   }\n";
      string += "   else\n";
      string += "      s = h = 0.0;         // s = 0, h is undefined\n";
      string += "\n";
      string += "   return vec3 (h, s, v);\n";
      string += "}\n";

      string += "\n";
      string += "vec3\n";
      string += "hsv2rgb_" + this .getId () + " (in vec3 hsv)\n";
      string += "{\n";
      string += "   float h = hsv [0];\n";
      string += "   float s = clamp (hsv [1], 0.0, 1.0);\n";
      string += "   float v = clamp (hsv [2], 0.0, 1.0);\n";
      string += "\n";
      string += "   // H is given on [0, 2 * Pi]. S and V are given on [0, 1].\n";
      string += "   // RGB are each returned on [0, 1].\n";
      string += "\n";
      string += "   if (s == 0.0)\n";
      string += "   {\n";
      string += "      // achromatic (grey)\n";
      string += "      return vec3 (v, v, v);\n";
      string += "   }\n";
      string += "   else\n";
      string += "   {\n";
      string += "      float w = (h * (180.0 / M_PI)) / 60.0;     // sector 0 to 5\n";
      string += "\n";
      string += "      float i = floor (w);\n";
      string += "      float f = w - i;                      // factorial part of h\n";
      string += "      float p = v * ( 1.0 - s );\n";
      string += "      float q = v * ( 1.0 - s * f );\n";
      string += "      float t = v * ( 1.0 - s * ( 1.0 - f ) );\n";
      string += "\n";
      string += "      switch (int (i) % 6)\n";
      string += "      {\n";
      string += "         case 0:  return vec3 (v, t, p);\n";
      string += "         case 1:  return vec3 (q, v, p);\n";
      string += "         case 2:  return vec3 (p, v, t);\n";
      string += "         case 3:  return vec3 (p, q, v);\n";
      string += "         case 4:  return vec3 (t, p, v);\n";
      string += "         default: return vec3 (v, p, q);\n";
      string += "      }\n";
      string += "   }\n";
      string += "\n";
      string += "   return vec3 (0.0);\n";
      string += "}\n";

      string += "\n";
      string += "vec3\n";
      string += "mix_hsv_" + this .getId () + " (in vec3 a, in vec3 b, in float t)\n";
      string += "{\n";
      string += "   // Linearely interpolate in HSV space between source color @a a and destination color @a b by an amount of @a t.\n";
      string += "   // Source and destination color must be in HSV space.\n";
      string += "\n";
      string += "   float ha = a [0];\n";
      string += "   float sa = a [1];\n";
      string += "   float va = a [2];\n";
      string += "\n";
      string += "   float hb = b [0];\n";
      string += "   float sb = b [1];\n";
      string += "   float vb = b [2];\n";
      string += "\n";
      string += "   if (sa == 0.0)\n";
      string += "      ha = hb;\n";
      string += "\n";
      string += "   if (sb == 0.0)\n";
      string += "      hb = ha;\n";
      string += "\n";
      string += "   float range = abs (hb - ha);\n";
      string += "\n";
      string += "   if (range <= M_PI)\n";
      string += "   {\n";
      string += "      float h = ha + t * (hb - ha);\n";
      string += "      float s = sa + t * (sb - sa);\n";
      string += "      float v = va + t * (vb - va);\n";
      string += "      return vec3 (h, s, v);\n";
      string += "   }\n";
      string += "\n";
      string += "   float PI2  = M_PI * 2.0;\n";
      string += "   float step = (PI2 - range) * t;\n";
      string += "   float h    = ha < hb ? ha - step : ha + step;\n";
      string += "\n";
      string += "   if (h < 0.0)\n";
      string += "      h += PI2;\n";
      string += "\n";
      string += "   else if (h > PI2)\n";
      string += "      h -= PI2;\n";
      string += "\n";
      string += "   float s = sa + t * (sb - sa);\n";
      string += "   float v = va + t * (vb - va);\n";
      string += "   return vec3 (h, s, v);\n";
      string += "}\n";

      string += "\n";
      string += "vec4\n";
      string += "getCartoonStyle_" + this .getId () + " (in vec4 originalColor, vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec4 orthogonalColor = orthogonalColor_" + this .getId () + ";\n";
      string += "   vec4 parallelColor   = parallelColor_" + this .getId () + ";\n";
      string += "   int  colorSteps      = colorSteps_" + this .getId () + ";\n";
      string += "\n";
      string += "   float steps    = clamp (float (colorSteps), 1.0, 64.0);\n";
      string += "   float step     = M_PI / 2.0 / steps;\n";
      string += "   float cosTheta = min (dot (surfaceNormal .xyz, normalize (vertex)), 1.0);\n";
      string += "\n";
      string += "   if (cosTheta < 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   float t             = cos (min (floor (acos (cosTheta) / step) * (steps > 1.0 ? steps / (steps - 1.0) : 1.0), steps) * step);\n";
      string += "   vec3  orthogonalHSV = rgb2hsv_" + this .getId () + " (orthogonalColor .rgb);\n";
      string += "   vec3  parallelHSV   = rgb2hsv_" + this .getId () + " (parallelColor .rgb);\n";
      string += "\n";
      string += "   return vec4 (hsv2rgb_" + this .getId () + " (mix_hsv_" + this .getId () + " (orthogonalHSV, parallelHSV, t)), originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // CartoonVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getCartoonStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (CartoonVolumeStyle, X3DNode .staticProperties ("CartoonVolumeStyle", "VolumeRendering", 3, "renderStyle", "3.3", "Infinity"));

Object .defineProperties (CartoonVolumeStyle,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "colorSteps",      new Fields .SFInt32 (4)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "orthogonalColor", new Fields .SFColorRGBA (1, 1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "parallelColor",   new Fields .SFColorRGBA (0, 0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceNormals",  new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default CartoonVolumeStyle;
