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

	function ToneMappedVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .ToneMappedVolumeStyle);
	}

	ToneMappedVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: ToneMappedVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",        new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "coolColor",      new Fields .SFColorRGBA (0, 0, 1, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "warmColor",      new Fields .SFColorRGBA (1, 1, 0, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceNormals", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "ToneMappedVolumeStyle";
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
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "coolColor_" + this .getId (), this .coolColor_ .copy ());
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "warmColor_" + this .getId (), this .warmColor_ .copy ());

			if (this .surfaceNormalsNode)
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
		},
		getUniformsText: function ()
		{
			var string = "";

			string += "\n";
			string += "// ToneMappedVolumeStyle\n";
			string += "\n";
			string += "uniform vec4 coolColor_" + this .getId () + ";\n";
			string += "uniform vec4 warmColor_" + this .getId () + ";\n";

			if (this .surfaceNormalsNode)
			{
				string += "uniform sampler3D surfaceNormals_" + this .getId () + ";\n";

				string += "\n";
				string += "vec4\n"
				string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
				string += "{\n";
				string += "	vec4 n = texture (surfaceNormals_" + this .getId () + ", texCoord) * 2.0 - 1.0\n";
				string += "	return vec4 (normalize (x3d_NormalMatrix * n .xyz), length (n .xyz));\n";
				string += "}\n";
			}
			else
			{
				string += "\n";
				string += "vec4\n"
				string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
				string += "{\n";
				string += "	vec4 offset = vec4 (1.0 / x3d_TextureSize .x, 1.0 / x3d_TextureSize .y, 1.0 / x3d_TextureSize .z, 0.0);\n";
				string += "	float v0 = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
				string += "	float v1 = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
				string += "	float v2 = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
				string += "	float v3 = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
				string += "	float v4 = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
				string += "	float v5 = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
				string += "	vec3 n = vec3 (v0 - v1, v2 - v3, v4 - v5) * 0.5;\n";
				string += "	return vec4 (normalize (x3d_NormalMatrix * n), length (n));\n";
	  			string += "}\n";
			}

			string += "\n";
			string += "vec4\n";
			string += "getToneMappedStyle_" + this .getId () + " (in vec4 coolColor, in vec4 warmColor, in vec4 surfaceNormal, in vec3 lightDir)\n"
			string += "{\n"
			string += "	float colorFactor = (1.0 + dot (lightDir, surfaceNormal .xyz)) * 0.5;\n"
			string += "	return mix (warmColor, coolColor, colorFactor);\n"
			string += "}\n";

			return string;
		},
		getFunctionsText: function ()
		{
			var string = "";

			string += "\n";
			string += "	// ToneMappedVolumeStyle\n";
			string += "\n";
			string += "	{\n";

			string += "		vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
			string += "		vec4 toneColor     = vec4 (0.0);\n";
			string += "\n";
			string += "		for (int i = 0; i < x3d_MaxLights; ++ i)\n";
			string += "		{\n";
			string += "			if (i == x3d_NumLights)\n";
			string += "				break;\n";
			string += "\n";
			string += "			x3d_LightSourceParameters light = x3d_LightSource [i];\n";
			string += "\n";
			string += "			vec3 L = light .type == x3d_DirectionalLight ? -light .direction : normalize (light .location - vertex);\n";
			string += "			toneColor += getToneMappedStyle_" + this .getId () + " (coolColor_" + this .getId () + ", warmColor_" + this .getId () + ", surfaceNormal, L);\n";
			string += "		}\n";
			string += "\n";
			string += "		textureColor = toneColor;\n"

			string += "	}\n";

			return string;
		},
	});

	return ToneMappedVolumeStyle;
});
