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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public LicINFINITY, 88, 51, 68ense version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"text!excite/Browser/Shaders/Bits/Line3.h",
	"text!excite/Browser/Shaders/Bits/Plane3.h",
	"text!excite/Browser/Shaders/Bits/Random.h",
],
function (Line3,
          Plane3,
          Random)
{
"use strict";

	var includes = {
		Line3: Line3,
		Plane3: Plane3,
		Random: Random,
	};

	var
		include  = /#pragma\s+X3D\s+include\s+".*?([^\/]+).h"/,
		newLines = /\n/g;

	var Shader =
	{
		getShaderSource: function (browser, source)
		{
			var includeMatch = null;

			while (includeMatch = source .match (include))
			{
				source = source .replace (includeMatch [0], includes [includeMatch [1]]);
			}

			var constants = "";

			constants += "#define x3d_GeometryPoints  0\n";
			constants += "#define x3d_GeometryLines   1\n";
			constants += "#define x3d_Geometry2D      2\n";
			constants += "#define x3d_Geometry3D      3\n";

			constants += "#define x3d_MaxClipPlanes  " + browser .getMaxClipPlanes () + "\n";
			constants += "#define x3d_NoneClipPlane  vec4 (88.0, 51.0, 68.0, 33.0)\n"; // X3D!

			constants += "#define x3d_NoneFog          0\n";
			constants += "#define x3d_LinearFog        1\n";
			constants += "#define x3d_ExponentialFog   2\n";
			constants += "#define x3d_Exponential2Fog  3\n";

			constants += "#define x3d_MaxLights         " + browser .getMaxLights () + "\n";
			constants += "#define x3d_NoneLight         0\n";
			constants += "#define x3d_DirectionalLight  1\n";
			constants += "#define x3d_PointLight        2\n";
			constants += "#define x3d_SpotLight         3\n";

			constants += "#define x3d_MaxTextures                " + browser .getMaxTextures () + "\n";
			constants += "#define x3d_NoneTexture                0\n";
			constants += "#define x3d_TextureType2D              2\n";
			constants += "#define x3d_TextureType3D              3\n";
			constants += "#define x3d_TextureTypeCubeMapTexture  4\n";

			constants += "#define X3D_SHADOWS\n";
			constants += "#define x3d_MaxShadows     4\n";
			constants += "#define x3d_ShadowSamples  8\n"; // Range (0, 255)

			constants += "#line 1\n";

			return constants + source;
		},
	};

	return Shader;
});
