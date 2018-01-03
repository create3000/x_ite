/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * A PARTICULAR PURPOSE. See the GNU General Public LicINFINITY, 88, 51, 68ense version 3 for more
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
	"text!x_ite/Browser/Shaders/Inlcude/Shadow.h",
	"text!x_ite/Browser/Shaders/Inlcude/Pack.h",
	"text!x_ite/Browser/Shaders/Inlcude/Line3.h",
	"text!x_ite/Browser/Shaders/Inlcude/Plane3.h",
	"text!x_ite/Browser/Shaders/Inlcude/Random.h",
	"text!x_ite/Browser/Shaders/Types.h",
	"x_ite/DEBUG",
],
function (Shadow,
          Pack,
          Line3,
          Plane3,
          Random,
          Types,
          DEBUG)
{
"use strict";

	var includes = {
		Shadow: Shadow,
		Pack: Pack,
		Line3: Line3,
		Plane3: Plane3,
		Random: Random,
	};

	var
		include  = /^#pragma\s+X3D\s+include\s+".*?([^\/]+).h"\s*$/,
		newLines = /\n/g;

	var Shader =
	{
		getSource: function (source)
		{
			var
				lines = source .split ("\n"),
				match = null;

			source = "#line 1\n";

			for (var i = 0, length = lines .length; i < length; ++ i)
			{
				var line = lines [i];

				if (match = line .match (include))
				{
					source += this .getSource (includes [match [1]]);
					source += "\n";
					source += "#line " + (i + 1) + "\n";
				}
				else
				{
					source += line;
					source += "\n";
				}
			}

			return source;
		},
		getShaderSource: function (browser, source)
		{
			var constants = "";

			constants += "#define X_ITE\n";

			constants += "#define x3d_None 0\n";

			constants += "#define x3d_GeometryPoints  0\n";
			constants += "#define x3d_GeometryLines   1\n";
			constants += "#define x3d_Geometry2D      2\n";
			constants += "#define x3d_Geometry3D      3\n";

			constants += "#define x3d_MaxClipPlanes  " + browser .getMaxClipPlanes () + "\n";

			constants += "#define x3d_LinearFog        1\n";
			constants += "#define x3d_ExponentialFog   2\n";
			constants += "#define x3d_Exponential2Fog  3\n";

			constants += "#define x3d_MaxLights         " + browser .getMaxLights () + "\n";
			constants += "#define x3d_DirectionalLight  1\n";
			constants += "#define x3d_PointLight        2\n";
			constants += "#define x3d_SpotLight         3\n";

			constants += "#define x3d_MaxTextures                " + browser .getMaxTextures () + "\n";
			constants += "#define x3d_TextureType2D              2\n";
			constants += "#define x3d_TextureType3D              3\n";
			constants += "#define x3d_TextureTypeCubeMapTexture  4\n";

			if (DEBUG)
				constants += "#define X3D_SHADOWS\n";

			constants += "#define x3d_MaxShadows     4\n";
			constants += "#define x3d_ShadowSamples  8\n"; // Range (0, 255)

			// Legacy
			constants += "#define x3d_NoneClipPlane  vec4 (88.0, 51.0, 68.0, 33.0)\n"; // ASCII »X3D!«
			constants += "#define x3d_NoneFog        0\n";
			constants += "#define x3d_NoneLight      0\n";
			constants += "#define x3d_NoneTexture    0\n";

			depreciatedWarning (source, "x3d_NoneClipPlane", "x3d_NumClipPlanes");
			depreciatedWarning (source, "x3d_NoneFog",       "x3d_None");
			depreciatedWarning (source, "x3d_NoneLight",     "x3d_NumLights");
			depreciatedWarning (source, "x3d_NoneTexture",   "x3d_NumTextures");

			return constants + Types + this .getSource (source);
		},
	};

	function depreciatedWarning (source, depreciated, current)
	{
		if (source .indexOf (depreciated) === -1)
			return;

		console .warn ("Use of '" + depreciated + "' is depreciated, use '" + current + "' instead. See http://create3000.de/x_ite/custom-shaders/.");
	}

	return Shader;
});
