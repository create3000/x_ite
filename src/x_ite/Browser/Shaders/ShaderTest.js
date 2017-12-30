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
	"x_ite/Rendering/DepthBuffer",
	"standard/Math/Numbers/Vector4",
	"standard/Math/Numbers/Matrix3",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Camera",
],
function (DepthBuffer,
          Vector4,
          Matrix3,
          Matrix4,
          Camera)
{
"use strict";

	var normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
	];

	var vertices = [
		 2,  2, 0, 1,
		-2,  2, 0, 1,
		-2, -2, 0, 1,
		 2,  2, 0, 1,
		-2, -2, 0, 1,
		 2, -2, 0, 1,
	];

	function verifyShader (browser, shaderNode)
	{
		var
			gl           = browser .getContext (),
			frameBuffer  = new DepthBuffer (browser, 16, 16),
         normalBuffer = gl .createBuffer (),
         vertexBuffer = gl .createBuffer ();

		frameBuffer .bind ();
		shaderNode .useProgram (gl);
		gl .viewport (0, 0, 16, 16);

		gl .bindBuffer (gl .ARRAY_BUFFER, vertexBuffer);
		gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (vertices), gl .STATIC_DRAW);
		gl .bindBuffer (gl .ARRAY_BUFFER, normalBuffer);
		gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (normals), gl .STATIC_DRAW);

		// Set clip planes and lights to none.
		shaderNode .setShaderObjects (gl, [ ]);

		gl .uniform1i (shaderNode .x3d_FogType,       0);
		gl .uniform1i (shaderNode .x3d_ColorMaterial, false);
		gl .uniform1i (shaderNode .x3d_Lighting,      true);

		gl .uniform1i (shaderNode .x3d_SeparateBackColor, false);
		gl .uniform1f (shaderNode .x3d_AmbientIntensity,  0);
		gl .uniform3f (shaderNode .x3d_DiffuseColor,      1, 0, 0);
		gl .uniform3f (shaderNode .x3d_SpecularColor,     1, 0, 0);
		gl .uniform3f (shaderNode .x3d_EmissiveColor,     1, 0, 0);
		gl .uniform1f (shaderNode .x3d_Shininess,         0);
		gl .uniform1f (shaderNode .x3d_Transparency,      0);

		shaderNode .textureTypeArray [0] = 0;
		gl .uniform1iv (shaderNode .x3d_TextureType, shaderNode .textureTypeArray);

		gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, new Float32Array (Camera .ortho (-1, 1, -1, 1, -1, 1, new Matrix4 ())));
		gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, new Float32Array (new Matrix4 ()));
		gl .uniformMatrix3fv (shaderNode .x3d_NormalMatrix,     false, new Float32Array (new Matrix3 ()));

		gl .disable (gl .BLEND);
		gl .frontFace (gl .CCW);
		gl .enable (gl .CULL_FACE);
		gl .cullFace (gl .BACK);

		shaderNode .enableNormalAttribute (gl, normalBuffer);
		shaderNode .enableVertexAttribute (gl, vertexBuffer);

		gl .drawArrays (gl .TRIANGLES, 0, 6);

		var data = frameBuffer .readPixels ();

		frameBuffer .unbind ();

		return data [0] == 255 && data [1] == 0 && data [2] == 0 && data [3] == 255;
	}

	return verifyShader;
});
