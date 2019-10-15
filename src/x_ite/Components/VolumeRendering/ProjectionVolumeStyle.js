/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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
	"x_ite/Components/VolumeRendering/X3DVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DVolumeRenderStyleNode,
          X3DConstants)
{
"use strict";

	function ProjectionVolumeStyle (executionContext)
	{
		X3DVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .ProjectionVolumeStyle);
	}

	ProjectionVolumeStyle .prototype = Object .assign (Object .create (X3DVolumeRenderStyleNode .prototype),
	{
		constructor: ProjectionVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",            new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "type",               new Fields .SFString ("MAX")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "intensityThreshold", new Fields .SFFloat (0)),
		]),
		getTypeName: function ()
		{
			return "ProjectionVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
		addShaderFields: function (shaderNode)
		{
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "intensityThreshold_" + this .getId (), this .intensityThreshold_ .copy ());
		},
		getUniformsText: function ()
		{
			var string = "";

			string += "\n";
			string += "// ProjectionVolumeStyle\n";
			string += "\n";
			string += "uniform float intensityThreshold_" + this .getId () + ";\n";

			return string;
		},
		getFunctionsText: function ()
		{
			var string = "";

			string += "\n";
			string += "	// ProjectionVolumeStyle\n";
			string += "\n";
			string += "	{\n";

			switch (this .type_ .getValue ())
			{
				default:
				case "MAX":
				{
					string += "		float projectionColor = 0.0;\n";
					break;
				}
				case "MIN":
				{
					string += "		float projectionColor = 1.0;\n";
					break;
				}
				case "AVERAGE":
				{
					string += "		float projectionColor = 0.0;\n";
					break;
				}
			}

			string += "		vec3  step            = normalize (x3d_TextureNormalMatrix * vec3 (0.0, 0.0, 1.0)) / 64.0;\n";
			string += "		vec3  ray             = texCoord - step * 32.0;\n";
			string += "		bool  first           = false;\n";
			string += "\n";
			string += "		for (int i = 0; i < 64; ++ i)\n";
			string += "		{\n";
			string += "			float intensity = texture (x3d_Texture3D [0], ray) .r;\n";
			string += "\n";

			switch (this .type_ .getValue ())
			{
				default:
				case "MAX":
				{
					string += "			if (intensity < intensityThreshold_" + this .getId () + ")\n";
					string += "				continue;\n";
					string += "\n";
					string += "			if (intensityThreshold_" + this .getId () + " > 0.0 && first)\n";
					string += "				break;\n";
					string += "\n";
					string += "			if (intensity <= projectionColor)\n";
					string += "			{\n";
					string += "				first = true;\n";
					string += "				continue;\n";
					string += "			}\n";
					string += "\n";
					string += "			projectionColor = intensity;\n";
					break;
				}
				case "MIN":
				{
					string += "			if (intensity < intensityThreshold_" + this .getId () + ")\n";
					string += "				continue;\n";
					string += "\n";
					string += "			if (intensityThreshold_" + this .getId () + " > 0.0 && first)\n";
					string += "				break;\n";
					string += "\n";
					string += "			if (intensity >= projectionColor)\n";
					string += "			{\n";
					string += "				first = true;\n";
					string += "				continue;\n";
					string += "			}\n";
					string += "\n";
					string += "			projectionColor = intensity;\n";
					break;
				}
				case "AVERAGE":
				{
					string += "			projectionColor += intensity;\n";
					break;
				}
			}

			string += "			ray += step;\n";
			string += "		}\n";
			string += "\n";

			if (this .type_ .getValue () === "AVERAGE")
				string += "		projectionColor /= 64.0;\n";

			string += "		textureColor .rgb = vec3 (projectionColor);\n"

			string += "	}\n";

			return string;
		},
	});

	return ProjectionVolumeStyle;
});
