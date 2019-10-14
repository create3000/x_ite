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

	function CartoonVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .CartoonVolumeStyle);
	}

	CartoonVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: CartoonVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "colorSteps",      new Fields .SFInt32 (4)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "orthogonalColor", new Fields .SFColorRGBA (1, 1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "parallelColor",   new Fields .SFColorRGBA (0, 0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceNormals",  new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "CartoonVolumeStyle";
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
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "colorSteps_"      + this .getId (), this .colorSteps_      .copy ());
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "orthogonalColor_" + this .getId (), this .orthogonalColor_ .copy ());
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "parallelColor_"   + this .getId (), this .parallelColor_   .copy ());

			if (this .surfaceNormalsNode)
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
		},
		getUniformsText: function ()
		{
			var string = "";

			string += "\n";
			string += "// CartoonVolumeStyle\n";
			string += "\n";
			string += "uniform int  colorSteps_" + this .getId () + ";\n";
			string += "uniform vec4 orthogonalColor_" + this .getId () + ";\n";
			string += "uniform vec4 parallelColor_" + this .getId () + ";\n";

			if (this .surfaceNormalsNode)
			{
				string += "uniform sampler3D surfaceNormals_" + this .getId () + ";\n";

				string += "\n";
				string += "vec4\n"
				string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
				string += "{\n";
				string += "	vec4 n = texture (surfaceNormals_" + this .getId () + ", texCoord) * 2.0 - 1.0\n";
				string += "	return vec4 (normalize (n .xyz), length (n .xyz));\n";
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
				string += "	return vec4 (normalize (n), length (n));\n";
	  			string += "}\n";
			}

			string += "\n";
			string += "vec4\n";
			string += "rgba2hsva" + this .getId () + " (in vec4 color)\n";
			string += "{\n";
			string += "	float h = 0.0;\n";
			string += "	float s = 0.0;\n";
			string += "	float v = 0.0;\n";
			string += "\n";
			string += "	float min = min (min (color .r, color .g), color .b);\n";
			string += "	float max = max (max (color .r, color .g), color .b);\n";
			string += "	v = max; // value\n";
			string += "\n";
			string += "	float delta = max - min;\n";
			string += "\n";
			string += "	if (max != 0.0 && delta != 0.0)\n";
			string += "	{\n";
			string += "		s = delta / max; // s\n";
			string += "\n";
			string += "		if (color .r == max)\n";
			string += "			h =     (color .g - color .b) / delta;  // between yellow & magenta\n";
			string += "		else if (color .g == max)\n";
			string += "			h = 2.0 + (color .b - color .r) / delta;  // between cyan & yellow\n";
			string += "		else\n";
			string += "			h = 4.0 + (color .r - color .g) / delta;  // between magenta & cyan\n";
			string += "\n";
			string += "		h *= M_PI / 3.0;  // radiants\n";
			string += "		if (h < 0.0)\n";
			string += "			h += M_PI * 2.0;\n";
			string += "	}\n";
			string += "	else\n";
			string += "		s = h = 0.0;         // s = 0, h is undefined\n";
			string += "\n";
			string += "	return vec4 (h, s, v, color .a);\n";
			string += "}\n";

			string += "\n";
			string += "vec4\n";
			string += "hsva2rgba_" + this .getId () + " (in vec4 hsva)\n";
			string += "{\n";
			string += "	float h = hsva [0];\n";
			string += "	float s = clamp (hsva [1], 0.0, 1.0);\n";
			string += "	float v = clamp (hsva [2], 0.0, 1.0);\n";
			string += "	float a = hsva [3];\n";
			string += "\n";
			string += "	// H is given on [0, 2 * Pi]. S and V are given on [0, 1].\n";
			string += "	// RGB are each returned on [0, 1].\n";
			string += "\n";
			string += "	if (s == 0.0)\n";
			string += "	{\n";
			string += "		// achromatic (grey)\n";
			string += "		return vec4 (v, v, v, a);\n";
			string += "	}\n";
			string += "	else\n";
			string += "	{\n";
			string += "		float w = (h * (180.0 / M_PI)) / 60.0;     // sector 0 to 5\n";
			string += "\n";
			string += "		float i = floor (w);\n";
			string += "		float f = w - i;                      // factorial part of h\n";
			string += "		float p = v * ( 1.0 - s );\n";
			string += "		float q = v * ( 1.0 - s * f );\n";
			string += "		float t = v * ( 1.0 - s * ( 1.0 - f ) );\n";
			string += "\n";
			string += "		switch (int (i) % 6)\n";
			string += "		{\n";
			string += "			case 0:  return vec4 (v, t, p, a);\n";
			string += "			case 1:  return vec4 (q, v, p, a);\n";
			string += "			case 2:  return vec4 (p, v, t, a);\n";
			string += "			case 3:  return vec4 (p, q, v, a);\n";
			string += "			case 4:  return vec4 (t, p, v, a);\n";
			string += "			default: return vec4 (v, p, q, a);\n";
			string += "		}\n";
			string += "	}\n";
			string += "}\n";

			string += "\n";
			string += "vec4\n";
			string += "mix_hsva" + this .getId () + " (in vec4 a, in vec4 b, in float t)\n";
			string += "{\n";
			string += "	// Linearely interpolate in HSV space between source color @a a and destination color @a b by an amount of @a t.\n";
			string += "	// Source and destination color must be in HSV space.\n";
			string += "\n";
			string += "	float ha = a [0];\n";
			string += "	float sa = a [1];\n";
			string += "	float va = a [2];\n";
			string += "\n";
			string += "	float hb = b [0];\n";
			string += "	float sb = b [1];\n";
			string += "	float vb = b [2];\n";
			string += "\n";
			string += "	if (sa == 0.0)\n";
			string += "		ha = hb;\n";
			string += "\n";
			string += "	if (sb == 0.0)\n";
			string += "		hb = ha;\n";
			string += "\n";
			string += "	float range = abs (hb - ha);\n";
			string += "\n";
			string += "	if (range <= M_PI)\n";
			string += "	{\n";
			string += "		float h = ha + t * (hb - ha);\n";
			string += "		float s = sa + t * (sb - sa);\n";
			string += "		float v = va + t * (vb - va);\n";
			string += "		return vec4 (h, s, v, mix (a .a, b .a, t));\n";
			string += "	}\n";
			string += "\n";
			string += "	float PI2  = M_PI * 2.0;\n";
			string += "	float step = (PI2 - range) * t;\n";
			string += "	float h    = ha < hb ? ha - step : ha + step;\n";
			string += "\n";
			string += "	if (h < 0.0)\n";
			string += "		h += PI2;\n";
			string += "\n";
			string += "	else if (h > PI2)\n";
			string += "		h -= PI2;\n";
			string += "\n";
			string += "	float s = sa + t * (sb - sa);\n";
			string += "	float v = va + t * (vb - va);\n";
			string += "	return vec4 (h, s, v, mix (a .a, b .a, t));\n";
			string += "}\n";

			string += "\n";
			string += "vec4
			string += "getCartoonStyle" + this .getId () + " (in vec4 orthogonalColor, in vec4 parallelColor, in int colorSteps, in vec4 surfaceNormal, vec3 lightDir)\n";
			string += "{\n";
			string += "	float steps     = clamp (float (colorSteps), 1.0, 64.0);\n";
			string += "	float rangeSize = M_PI / 2.0 / steps;\n";
			string += "	float cosTheta  = abs (dot (surfNormal .xyz, lightDir));\n";
			string += "	float t         = clamp (floor (cosTheta / rangeSize), 0.0, steps) * rangeSize;\n";
			string += "\n";
			string += "	return hsva2rgba (mix_hsva (rgba2hsva (orthogonalColor), rgba2hsva (parallelColor), t));\n";
			string += "}\n";

			return string;
		},
		getFunctionsText: function ()
		{
			var string = "";

			string += "\n";
			string += "	// CartoonVolumeStyle\n";
			string += "\n";
			string += "	{\n";

			string += "		vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
			string += "		vec4 cartoonColor = vec4 (0.0);\n";
			string += "\n";
			string += "		for (int i = 0; i < x3d_MaxLights; ++ i)\n";
			string += "		{\n";
			string += "			if (i == x3d_NumLights)\n";
			string += "				break;\n";
			string += "\n";
			string += "			x3d_LightSourceParameters light = x3d_LightSource [i];\n";
			string += "\n";
			string += "			vec3 L = light .type == x3d_DirectionalLight ? -light .direction : light .location - vertex;\n";
			string += "			cartoonColor += getCartoonStyle" + this .getId () + " (orthogonalColor_" + this .getId () + ", parallelColor_" + this .getId () + ", colorSteps_" + this .getId () + ", surfaceNormal, L);\n";
			string += "		}\n";
			string += "\n";
			string += "		textureColor = cartoonColor;\n"

			string += "	}\n";

			return string;
		},
	});

	return CartoonVolumeStyle;
});
