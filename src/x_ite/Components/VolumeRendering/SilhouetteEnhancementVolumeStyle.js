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
	"x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast)
{
"use strict";

	function SilhouetteEnhancementVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .SilhouetteEnhancementVolumeStyle);
	}

	SilhouetteEnhancementVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: SilhouetteEnhancementVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                  new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",                   new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "silhouetteRetainedOpacity", new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "silhouetteBoundaryOpacity", new Fields .SFFloat (0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "silhouetteSharpness",       new Fields .SFFloat (0.5)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceNormals",            new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "SilhouetteEnhancementVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
		initialize: function ()
		{
			X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			if (gl .getVersion () < 2)
				return;

			this .surfaceNormals_ .addInterest ("set_surfaceNormals__", this);

			this .set_surfaceNormals__ ();
		},
		set_surfaceNormals__: function ()
		{
			this .surfaceNormalsNode = X3DCast (X3DConstants .X3DTexture3DNode, this .surfaceNormals_);
		},
		addShaderFields: function (shaderNode)
		{
			if (! this .enabled_ .getValue ())
				return;

			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "silhouetteRetainedOpacity_" + this .getId (), this .silhouetteRetainedOpacity_ .copy ());
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "silhouetteBoundaryOpacity_" + this .getId (), this .silhouetteBoundaryOpacity_ .copy ());
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "silhouetteSharpness_"       + this .getId (), this .silhouetteSharpness_       .copy ());

			if (this .surfaceNormalsNode)
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
		},
		getUniformsText: function ()
		{
			if (! this .enabled_ .getValue ())
				return "";

			var string = "";

			string += "\n";
			string += "// SilhouetteEnhancementVolumeStyle\n";
			string += "\n";
			string += "uniform float silhouetteRetainedOpacity_" + this .getId () + ";\n";
			string += "uniform float silhouetteBoundaryOpacity_" + this .getId () + ";\n";
			string += "uniform float silhouetteSharpness_" + this .getId () + ";\n";

			string += this .getNormalText (this .surfaceNormalsNode);

			string += "\n";
			string += "float\n";
			string += "getSilhouetteEnhancementStyle_" + this .getId () + " (in float originalAlpha, in vec3 texCoord)\n";
			string += "{\n";
			string += "	vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
			string += "\n";
			string += "	if (surfaceNormal .w < 0.1)\n";
			string += "	{\n";
			string += "		return 0.0;\n";
			string += "	}\n";
			string += "	else\n";
			string += "	{\n";
			string += "		float silhouetteRetainedOpacity = silhouetteRetainedOpacity_" + this .getId () + ";\n";
			string += "		float silhouetteBoundaryOpacity = silhouetteBoundaryOpacity_" + this .getId () + ";\n";
			string += "		float silhouetteSharpness       = silhouetteSharpness_" + this .getId () + ";\n";
			string += "\n";
			string += "		return originalAlpha * silhouetteRetainedOpacity + pow (silhouetteBoundaryOpacity * (1.0 - dot (surfaceNormal .xyz, normalize (vertex))), silhouetteSharpness);\n";
			string += "	}\n";
			string += "}\n";

			return string;
		},
		getFunctionsText: function ()
		{
			if (! this .enabled_ .getValue ())
				return "";

			var string = "";

			string += "\n";
			string += "	// SilhouetteEnhancementVolumeStyle\n";
			string += "\n";
			string += "	textureColor .a = getSilhouetteEnhancementStyle_" + this .getId () + " (textureColor .a, texCoord);\n";

			return string;
		},
	});

	return SilhouetteEnhancementVolumeStyle;
});
