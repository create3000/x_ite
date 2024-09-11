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
   getDefines (defines)
   {
      defines .add ("#define X3D_HSV")
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
      string += "   vec3  orthogonalHSV = rgb2hsv (orthogonalColor .rgb);\n";
      string += "   vec3  parallelHSV   = rgb2hsv (parallelColor .rgb);\n";
      string += "\n";
      string += "   return vec4 (hsv2rgb (mix_hsv (orthogonalHSV, parallelHSV, t)), originalColor .a);\n";
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

Object .defineProperties (CartoonVolumeStyle,
{
   ... X3DNode .getStaticProperties ("CartoonVolumeStyle", "VolumeRendering", 3, "renderStyle", "3.3"),
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
