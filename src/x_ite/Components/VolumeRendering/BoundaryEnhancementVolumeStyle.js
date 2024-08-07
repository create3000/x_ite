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

function BoundaryEnhancementVolumeStyle (executionContext)
{
   X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .BoundaryEnhancementVolumeStyle);
}

Object .assign (Object .setPrototypeOf (BoundaryEnhancementVolumeStyle .prototype, X3DComposableVolumeRenderStyleNode .prototype),
{
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "retainedOpacity_" + this .getId (), this ._retainedOpacity .copy ());
      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "boundaryOpacity_" + this .getId (), this ._boundaryOpacity .copy ());
      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "opacityFactor_"   + this .getId (), this ._opacityFactor   .copy ());
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// BoundaryEnhancementVolumeStyle\n";
      string += "\n";
      string += "uniform float retainedOpacity_" + this .getId () + ";\n";
      string += "uniform float boundaryOpacity_" + this .getId () + ";\n";
      string += "uniform float opacityFactor_" + this .getId () + ";\n";

      string += "\n";
      string += "vec4\n";
      string += "getBoundaryEnhancementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   float f0 = texture (x3d_Texture3D [0], texCoord) .r;\n";
      string += "   float f1 = texture (x3d_Texture3D [0], texCoord + vec3 (0.0, 0.0, 1.0 / float (textureSize (x3d_Texture3D [0], 0) .z))) .r;\n";
      string += "   float f  = abs (f0 - f1);\n";
      string += "\n";
      string += "   float retainedOpacity = retainedOpacity_" + this .getId () + ";\n";
      string += "   float boundaryOpacity = boundaryOpacity_" + this .getId () + ";\n";
      string += "   float opacityFactor   = opacityFactor_" + this .getId () + ";\n";
      string += "\n";
      string += "   return vec4 (originalColor .rgb, originalColor .a * (retainedOpacity + boundaryOpacity * pow (f, opacityFactor)));\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // BoundaryEnhancementVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getBoundaryEnhancementStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (BoundaryEnhancementVolumeStyle, X3DNode .getStaticProperties ("BoundaryEnhancementVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"));

Object .defineProperties (BoundaryEnhancementVolumeStyle,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "retainedOpacity", new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "boundaryOpacity", new Fields .SFFloat (0.9)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "opacityFactor",   new Fields .SFFloat (2)),
      ]),
      enumerable: true,
   },
});

export default BoundaryEnhancementVolumeStyle;
