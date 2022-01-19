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
	"text!assets/shaders/webgl1/include/ClipPlanes.glsl",
	"text!assets/shaders/webgl1/include/Fog.glsl",
	"text!assets/shaders/webgl1/include/Hatch.glsl",
	"text!assets/shaders/webgl1/include/Pack.glsl",
	"text!assets/shaders/webgl1/include/Perlin.glsl",
	"text!assets/shaders/webgl1/include/Shadow.glsl",
	"text!assets/shaders/webgl1/include/Texture.glsl",
	"text!assets/shaders/webgl2/include/ClipPlanes.glsl",
	"text!assets/shaders/webgl2/include/Fog.glsl",
	"text!assets/shaders/webgl2/include/Hatch.glsl",
	"text!assets/shaders/webgl2/include/Pack.glsl",
	"text!assets/shaders/webgl2/include/Perlin.glsl",
	"text!assets/shaders/webgl2/include/Shadow.glsl",
	"text!assets/shaders/webgl2/include/Texture.glsl",
],
function (ClipPlanes1,
          Fog1,
          Hatch1,
          Pack1,
          Perlin1,
          Shadow1,
          Texture1,
          ClipPlanes2,
          Fog2,
          Hatch2,
          Pack2,
          Perlin2,
          Shadow2,
          Texture2)
{
"use strict";

	var include = /^#pragma\s+X3D\s+include\s+".*?([^\/]+)\.glsl"\s*$/;

	var ShaderSource =
	{
		get: function (gl, source)
		{
			if (gl .getVersion () <= 1)
			{
				var includes = {
					ClipPlanes: ClipPlanes1,
					Fog: Fog1,
					Hatch: Hatch1,
					Pack: Pack1,
					Perlin: Perlin1,
					Shadow: Shadow1,
					Texture: Texture1,
				};
			}
			else
			{
				var includes = {
					ClipPlanes: ClipPlanes2,
					Fog: Fog2,
					Hatch: Hatch2,
					Pack: Pack2,
					Perlin: Perlin2,
					Shadow: Shadow2,
					Texture: Texture2,
				};
			}

			var
				lines = source .split ("\n"),
				match = null;

			source = "";

			for (var i = 0, length = lines .length; i < length; ++ i)
			{
				var line = lines [i];

				if (match = line .match (include))
				{
					source += "#line 1\n";
					source += this .get (gl, includes [match [1]]);
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
	};

	return ShaderSource;
});
