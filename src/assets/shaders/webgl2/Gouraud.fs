#version 300 es
// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform int  x3d_GeometryType;
uniform bool x3d_Lighting;      // true if a X3DMaterialNode is attached, otherwise false
uniform bool x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

in float fogDepth;    // fog depth
in vec4  frontColor;  // color
in vec4  backColor;   // color
in vec4  texCoord0;   // texCoord0
in vec4  texCoord1;   // texCoord1
in vec3  normal;      // normal vector at this point on geometry
in vec3  vertex;      // point on geometry
in vec3  localNormal; // normal vector at this point on geometry in local coordinates
in vec3  localVertex; // point on geometry in local coordinates

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "include/Texture.h"
#pragma X3D include "include/Hatch.h"
#pragma X3D include "include/Fog.h"
#pragma X3D include "include/ClipPlanes.h"

void
main ()
{
 	clip ();

	vec4 finalColor = gl_FrontFacing ? frontColor : backColor;

	if (x3d_NumTextures > 0)
	{
		if (x3d_Lighting)
		{
			finalColor = getTextureColor (finalColor, vec4 (1.0));
		}
		else
		{
			if (x3d_ColorMaterial)
			{
				finalColor = getTextureColor (finalColor, vec4 (1.0));
			}
			else
			{
				finalColor = getTextureColor (vec4 (1.0), vec4 (1.0));
			}
		}
	}

	finalColor      = getHatchColor (finalColor);
	finalColor .rgb = getFogColor (finalColor .rgb);
	x3d_FragColor   = finalColor;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
	if (x3d_LogarithmicFarFactor1_2 > 0.0)
		gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
	else
		gl_FragDepth = gl_FragCoord .z;
	#endif
}
