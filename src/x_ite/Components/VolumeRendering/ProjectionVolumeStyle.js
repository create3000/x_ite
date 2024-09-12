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

import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DVolumeRenderStyleNode from "./X3DVolumeRenderStyleNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function ProjectionVolumeStyle (executionContext)
{
   X3DVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .ProjectionVolumeStyle);
}

Object .assign (Object .setPrototypeOf (ProjectionVolumeStyle .prototype, X3DVolumeRenderStyleNode .prototype),
{
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "intensityThreshold_" + this .getId (), this ._intensityThreshold .copy ());
   },
   getDefines (defines)
   {
      defines .add ("#define X3D_PLANE");
      defines .add ("#define X3D_RANDOM");
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// ProjectionVolumeStyle\n";
      string += "\n";
      string += "uniform float intensityThreshold_" + this .getId () + ";\n";

      string += "\n";
      string += "vec4\n";
      string += "getProjectionStyle_" + this .getId () + "(in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      switch (this ._type .getValue ())
      {
         default:
         case "MAX":
         {
            string += "   float  projectionColor = 0.0;\n";
            break;
         }
         case "MIN":
         {
            string += "   float  projectionColor = 1.0;\n";
            break;
         }
         case "AVERAGE":
         {
            string += "   float  projectionColor = 0.0;\n";
            break;
         }
      }

      string += "   const  int samples     = 16;\n";
      string += "   vec3   normal          = normalize (x3d_TextureNormalMatrix * vec3 (0.0, 0.0, 1.0));\n";
      string += "   Plane3 plane           = plane3 (vec3 (0.5), normal);\n";
      string += "   vec3   point           = texCoord + plane3_perpendicular_vector (plane, texCoord);\n";
      string += "   bool   first           = false;\n";
      string += "\n";
      string += "   srand (int (dot (texCoord, vertex)));\n";
      string += "\n";
      string += "   for (int i = 0; i < samples; ++ i)\n";
      string += "   {\n";
      string += "      vec3 ray = point + normal * (random () * M_SQRT2 - M_SQRT1_2);\n";
      string += "\n";
      string += "      if (any (greaterThan (abs (ray - 0.5), vec3 (0.5))))\n";
      string += "         continue;\n";
      string += "\n";
      string += "      float intensity = texture (x3d_Texture3D [0], ray) .r;\n";
      string += "\n";

      switch (this ._type .getValue ())
      {
         default:
         case "MAX":
         {
            string += "      if (intensity < intensityThreshold_" + this .getId () + ")\n";
            string += "         continue;\n";
            string += "\n";
            string += "      if (first && intensityThreshold_" + this .getId () + " > 0.0)\n";
            string += "         break;\n";
            string += "\n";
            string += "      if (intensity <= projectionColor)\n";
            string += "      {\n";
            string += "         first = true;\n";
            string += "         continue;\n";
            string += "      }\n";
            string += "\n";
            string += "      projectionColor = intensity;\n";
            break;
         }
         case "MIN":
         {
            string += "      if (intensity < intensityThreshold_" + this .getId () + ")\n";
            string += "         continue;\n";
            string += "\n";
            string += "      if (first && intensityThreshold_" + this .getId () + " > 0.0)\n";
            string += "         break;\n";
            string += "\n";
            string += "      if (intensity >= projectionColor)\n";
            string += "      {\n";
            string += "         first = true;\n";
            string += "         continue;\n";
            string += "      }\n";
            string += "\n";
            string += "      projectionColor = intensity;\n";
            break;
         }
         case "AVERAGE":
         {
            string += "      projectionColor += intensity;\n";
            break;
         }
      }

      string += "   }\n";
      string += "\n";

      if (this ._type .getValue () === "AVERAGE")
         string += "   projectionColor /= float (samples);\n";

      string += "   return vec4 (vec3 (projectionColor), originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ProjectionVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getProjectionStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (ProjectionVolumeStyle,
{
   ... X3DNode .getStaticProperties ("ProjectionVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "type",               new Fields .SFString ("MAX")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "intensityThreshold", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default ProjectionVolumeStyle;
