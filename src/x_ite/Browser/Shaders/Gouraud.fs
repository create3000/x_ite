data:text/plain;charset=utf-8,
// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
//
//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
// 
//  Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
// 
//  All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
// 
//  The copyright notice above does not evidence any actual of intended
//  publication of such source code, and is an unpublished work by create3000.
//  This material contains CONFIDENTIAL INFORMATION that is the property of
//  create3000.
// 
//  No permission is granted to copy, distribute, or create derivative works from
//  the contents of this software, in whole or in part, without the prior written
//  permission of create3000.
// 
//  NON-MILITARY USE ONLY
// 
//  All create3000 software are effectively free software with a non-military use
//  restriction. It is free. Well commented source is provided. You may reuse the
//  source in any way you please with the exception anything that uses it must be
//  marked to indicate is contains 'non-military use only' components.
// 
//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
// 
//  Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
// 
//  This file is part of the X_ITE Project.
// 
//  X_ITE is free software: you can redistribute it and/or modify it under the
//  terms of the GNU General Public License version 3 only, as published by the
//  Free Software Foundation.
// 
//  X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
//  WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
//  A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
//  details (a copy is included in the LICENSE file that accompanied this code).
// 
//  You should have received a copy of the GNU General Public License version 3
//  along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
//  copy of the GPLv3 License.
// 
//  For Silvio, Joy and Adi.


precision mediump float;

uniform int x3d_GeometryType;

uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];

uniform int   x3d_FogType;
uniform vec3  x3d_FogColor;
uniform float x3d_FogVisibilityRange;

uniform float x3d_LinewidthScaleFactor;
uniform bool  x3d_Lighting;      // true if a X3DMaterialNode is attached, otherwise false
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

uniform int         x3d_TextureType [x3d_MaxTextures]; // x3d_NoneTexture, x3d_TextureType2D or x3d_TextureTypeCubeMapTexture
uniform sampler2D   x3d_Texture2D [x3d_MaxTextures];
uniform samplerCube x3d_CubeMapTexture [x3d_MaxTextures];

varying vec4 frontColor; // color
varying vec4 backColor;  // color
varying vec4 t;          // texCoord
varying vec3 v;          // point on geometry

void
clip ()
{
	for (int i = 0; i < x3d_MaxClipPlanes; ++ i)
	{
		if (x3d_ClipPlane [i] == x3d_NoneClipPlane)
			break;

		if (dot (v, x3d_ClipPlane [i] .xyz) - x3d_ClipPlane [i] .w < 0.0)
			discard;
	}
}

float
getFogInterpolant ()
{
	if (x3d_FogType == x3d_NoneFog)
		return 1.0;

	float dV = length (v);

	if (dV >= x3d_FogVisibilityRange)
		return 0.0;

	if (x3d_FogType == x3d_LinearFog)
		return (x3d_FogVisibilityRange - dV) / x3d_FogVisibilityRange;

	if (x3d_FogType == x3d_ExponentialFog)
		return exp (-dV / (x3d_FogVisibilityRange - dV));

	return 1.0;
}

vec4
getTextureColor ()
{
	if (x3d_TextureType [0] == x3d_TextureType2D)
	{
		if (x3d_GeometryType == x3d_Geometry3D || gl_FrontFacing)
			return texture2D (x3d_Texture2D [0], vec2 (t));
		
		// If dimension is x3d_Geometry2D the texCoords must be flipped.
		return texture2D (x3d_Texture2D [0], vec2 (1.0 - t .s, t .t));
	}

 	if (x3d_TextureType [0] == x3d_TextureTypeCubeMapTexture)
	{
		if (x3d_GeometryType == x3d_Geometry3D || gl_FrontFacing)
			return textureCube (x3d_CubeMapTexture [0], vec3 (t));
		
		// If dimension is x3d_Geometry2D the texCoords must be flipped.
		return textureCube (x3d_CubeMapTexture [0], vec3 (1.0 - t .s, t .t, t .z));
	}
 
	return vec4 (1.0, 1.0, 1.0, 1.0);
}

void
main ()
{
 	clip ();

	float f0 = getFogInterpolant ();

	vec4 finalColor = gl_FrontFacing ? frontColor : backColor;

	if (x3d_TextureType [0] != x3d_NoneTexture)
	{
		if (x3d_Lighting)
			finalColor *= getTextureColor ();
		else
		{
			if (x3d_ColorMaterial)
				finalColor *= getTextureColor ();
			else
				finalColor = getTextureColor ();
		}
	}

	gl_FragColor .rgb = mix (x3d_FogColor, finalColor .rgb, f0);
	gl_FragColor .a   = finalColor .a;
}
