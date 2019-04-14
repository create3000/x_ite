// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
#extension GL_EXT_frag_depth : enable
#endif

precision mediump float;
precision mediump int;

uniform int x3d_GeometryType;

uniform bool  x3d_Lighting;      // true if a X3DMaterialNode is attached, otherwise false
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

varying float fogDepth;    // fog depth
varying vec4  frontColor;  // color
varying vec4  backColor;   // color
varying vec4  texCoord0;   // texCoord0
varying vec4  texCoord1;   // texCoord1
varying vec3  normal;      // normal vector at this point on geometry
varying vec3  vertex;      // point on geometry
varying vec3  localNormal; // normal vector at this point on geometry in local coordinates
varying vec3  localVertex; // point on geometry in local coordinates

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
varying float depth;
#endif

#pragma X3D include "Include/Texture.h"
#pragma X3D include "Include/Hatch.h"
#pragma X3D include "Include/Fog.h"
#pragma X3D include "Include/ClipPlanes.h"

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

	finalColor        = getHatchColor (finalColor);
	gl_FragColor .rgb = getFogColor (finalColor .rgb);
	gl_FragColor .a   = finalColor .a;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
	if (x3d_LogarithmicFarFactor1_2 > 0.0)
		gl_FragDepthEXT = log2 (depth) * x3d_LogarithmicFarFactor1_2;
	else
		gl_FragDepthEXT = gl_FragCoord .z;
	#endif
}
