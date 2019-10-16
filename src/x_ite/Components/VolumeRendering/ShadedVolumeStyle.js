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

	function ShadedVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .ShadedVolumeStyle);
	}

	ShadedVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: ShadedVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",        new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "lighting",       new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",        new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "phaseFunction",  new Fields .SFString ("Henyey-Greenstein")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "material",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceNormals", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "ShadedVolumeStyle";
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

			this .material_       .addInterest ("set_material__",       this);
			this .surfaceNormals_ .addInterest ("set_surfaceNormals__", this);

			this .set_material__ ();
			this .set_surfaceNormals__ ();
		},
		set_material__: function ()
		{
			if (this .materialNode)
				this .materialNode .removeInterest ("addNodeEvent", this);

			this .materialNode = X3DCast (X3DConstants .X3DMaterialNode, this .material_);

			if (this .materialNode)
				this .materialNode .addInterest ("addNodeEvent", this);
		},
		set_surfaceNormals__: function ()
		{
			this .surfaceNormalsNode = X3DCast (X3DConstants .X3DTexture3DNode, this .surfaceNormals_);
		},
		addShaderFields: function (shaderNode)
		{
			if (! this .enabled_ .getValue ())
				return;

			if (this .materialNode)
			{
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "ambientIntensity_" + this .getId (), this .materialNode .ambientIntensity_ .copy ());
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "diffuseColor_"     + this .getId (), this .materialNode .diffuseColor_     .copy ());
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "specularColor_"    + this .getId (), this .materialNode .specularColor_    .copy ());
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "emissiveColor_"    + this .getId (), this .materialNode .emissiveColor_    .copy ());
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "shininess_"        + this .getId (), this .materialNode .shininess_        .copy ());
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "transparency_"     + this .getId (), this .materialNode .transparency_     .copy ());
			}

			if (this .surfaceNormalsNode)
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
		},
		getUniformsText: function ()
		{
			if (! this .enabled_ .getValue ())
				return "";

			var string = "";

			string += "\n";
			string += "// ShadedVolumeStyle\n";
			string += "\n";
			string += "uniform float ambientIntensity_" + this .getId () + ";\n";
			string += "uniform vec3  diffuseColor_" + this .getId () + ";\n";
			string += "uniform vec3  specularColor_" + this .getId () + ";\n";
			string += "uniform vec3  emissiveColor_" + this .getId () + ";\n";
			string += "uniform float shininess_" + this .getId () + ";\n";
			string += "uniform float transparency_" + this .getId () + ";\n";

			if (this .surfaceNormalsNode)
			{
				string += "uniform sampler3D surfaceNormals_" + this .getId () + ";\n";

				string += "\n";
				string += "vec4\n"
				string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
				string += "{\n";
				string += "	vec4 n = texture (surfaceNormals_" + this .getId () + ", texCoord) * 2.0 - 1.0\n";
				string += "\n";
				string += "	return vec4 (normalize (x3d_TextureNormalMatrix * n .xyz), length (n .xyz));\n";
				string += "}\n";
			}
			else
			{
				string += "\n";
				string += "vec4\n"
				string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
				string += "{\n";
				string += "	vec4  offset = vec4 (1.0 / x3d_TextureSize .x, 1.0 / x3d_TextureSize .y, 1.0 / x3d_TextureSize .z, 0.0);\n";
				string += "	float i0     = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
				string += "	float i1     = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
				string += "	float i2     = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
				string += "	float i3     = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
				string += "	float i4     = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
				string += "	float i5     = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
				string += "	vec3  n      = vec3 (i1 - i0, i3 - i2, i5 - i4);\n";
				string += "\n";
				string += "	return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
				string += "}\n";
			}

			string += "\n";
			string += "float\n";
			string += "getSpotFactor_" + this .getId () + " (const in float cutOffAngle, const in float beamWidth, const in vec3 L, const in vec3 d)\n";
			string += "{\n";
			string += "	float spotAngle = acos (clamp (dot (-L, d), -1.0, 1.0));\n";
			string += "\n";
			string += "	if (spotAngle >= cutOffAngle)\n";
			string += "		return 0.0;\n";
			string += "	else if (spotAngle <= beamWidth)\n";
			string += "		return 1.0;\n";
			string += "\n";
			string += "	return (spotAngle - cutOffAngle) / (beamWidth - cutOffAngle);\n";
			string += "}\n";

			return string;
		},
		getFunctionsText: function ()
		{
			if (! this .enabled_ .getValue ())
				return "";

			var string = "";

			string += "\n";
			string += "	// ShadedVolumeStyle\n";
			string += "\n";
			string += "	{\n";

			string += "		vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
			string += "		vec4 shadedColor   = vec4 (0.0);\n";
			string += "\n";
			string += "		if (surfaceNormal .w == 0.0)\n"
			string += "		{\n";
			string += "			textureColor = vec4 (0.0);\n"
			string += "		}\n";
			string += "		else\n";
			string += "		{\n";

			if (this .lighting_ .getValue ())
			{
				if (this .materialNode)
				{
					string += "			vec3 diffuseFactor = diffuseColor_" + this .getId () + ";\n";
					string += "			vec3 ambientTerm   = diffuseFactor * ambientIntensity_" + this .getId () + ";\n";
					string += "\n";
					string += "			shadedColor .a = textureColor .a * (1.0 - transparency_" + this .getId () + ");\n";
				}
				else
				{
					string += "			vec3 diffuseFactor = textureColor .rgb;\n";
					string += "			vec3 ambientTerm   = vec3 (0.0);\n";
					string += "\n";
					string += "			shadedColor .a = textureColor .a;\n";
				}

				string += "\n";
				string += "			vec3  N  = surfaceNormal .xyz;\n";
				string += "			vec3  V  = normalize (-vertex); // normalized vector from point on geometry to viewer's position\n";
				string += "			float dV = length (vertex);\n";
				string += "\n";
				string += "			for (int i = 0; i < x3d_MaxLights; ++ i)\n";
				string += "			{\n";
				string += "				if (i == x3d_NumLights)\n";
				string += "					break;\n";
				string += "\n";
				string += "				x3d_LightSourceParameters light = x3d_LightSource [i];\n";
				string += "\n";
				string += "				vec3  vL = light .location - vertex; // Light to fragment\n";
				string += "				float dL = length (light .matrix * vL);\n";
				string += "				bool  di = light .type == x3d_DirectionalLight;\n";
				string += "\n";
				string += "				if (di || dL <= light .radius)\n";
				string += "				{\n";
				string += "					vec3 d = light .direction;\n";
				string += "					vec3 c = light .attenuation;\n";
				string += "					vec3 L = di ? -d : normalize (vL);      // Normalized vector from point on geometry to light source i position.\n";
				string += "					vec3 H = normalize (L + V);             // Specular term\n";
				string += "\n";
				string += "					float lightAngle     = dot (N, L);      // Angle between normal and light ray.\n";
				string += "					vec3  diffuseTerm    = diffuseFactor * clamp (lightAngle, 0.0, 1.0);\n";
				string += "					float specularFactor = shininess_" + this .getId () + " > 0.0 ? pow (max (dot (N, H), 0.0), shininess_" + this .getId () + " * 128.0) : 1.0;\n";
				string += "					vec3  specularTerm   = light .intensity * specularColor_" + this .getId () + " * specularFactor;\n";
				string += "\n";
				string += "					float attenuationFactor     = di ? 1.0 : 1.0 / max (c [0] + c [1] * dL + c [2] * (dL * dL), 1.0);\n";
				string += "					float spotFactor            = light .type == x3d_SpotLight ? getSpotFactor_" + this .getId () + " (light .cutOffAngle, light .beamWidth, L, d) : 1.0;\n";
				string += "					float attenuationSpotFactor = attenuationFactor * spotFactor;\n";
				string += "					vec3  ambientColor          = light .ambientIntensity * ambientTerm;\n";
				string += "					vec3  diffuseColor          = light .intensity * diffuseTerm * max (dot (N, L), 0.0);\n";
				string += "\n";
				string += "					shadedColor .rgb += attenuationSpotFactor * light .color * (ambientColor + diffuseColor + specularTerm);\n";
				string += "				}\n";
				string += "\n";
				string += "				shadedColor .rgb += emissiveColor_" + this .getId () + ";\n";
				string += "				shadedColor .rgb  = getFogColor (shadedColor .rgb);\n";
				string += "			}\n";
			}
			else
			{
				if (this .materialNode)
				{
					string += "			shadedColor .rgb = diffuseColor_" + this .getId () + ";\n";
					string += "			shadedColor .a   = textureColor .a * (1.0 - transparency_" + this .getId () + ");\n";
				}
				else
				{
					string += "			shadedColor = textureColor;\n";
				}
			}

			string += "\n";
			string += "			textureColor = shadedColor;\n"
			string += "		}\n";

			string += "	}\n";

			return string;
		},
	});

	return ShadedVolumeStyle;
});
