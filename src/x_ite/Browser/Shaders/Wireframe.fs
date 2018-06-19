// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
#extension GL_EXT_frag_depth : enable
#endif

precision mediump float;
precision mediump int;

uniform int  x3d_NumClipPlanes;
uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];

uniform x3d_FogParameters x3d_Fog;

varying vec4 C; // color
varying vec3 v; // point on geometry

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
varying float depth;
#endif

void
clip ()
{
	#pragma unroll_loop
	for (int i = 0; i < x3d_MaxClipPlanes; ++ i)
	{
		if (i == x3d_NumClipPlanes)
			break;

		if (dot (v, x3d_ClipPlane [i] .xyz) - x3d_ClipPlane [i] .w < 0.0)
			discard;
	}
}

float
getFogInterpolant ()
{
	// Returns 0.0 for fog color and 1.0 for material color.

	if (x3d_Fog .type == x3d_None)
		return 1.0;

	if (x3d_Fog .visibilityRange <= 0.0)
		return 0.0;

	float dV = length (v);

	if (dV >= x3d_Fog .visibilityRange)
		return 0.0;

	if (x3d_Fog .type == x3d_LinearFog)
		return (x3d_Fog .visibilityRange - dV) / x3d_Fog .visibilityRange;

	if (x3d_Fog .type == x3d_ExponentialFog)
		return exp (-dV / (x3d_Fog .visibilityRange - dV));

	return 1.0;
}

vec3
getFogColor (const in vec3 color)
{
	return mix (x3d_Fog .color, color, getFogInterpolant ());
}

void
main ()
{
	clip ();

	gl_FragColor .rgb = getFogColor (C .rgb);
	gl_FragColor .a   = C .a;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
	if (x3d_LogarithmicFarFactor1_2 > 0.0)
		gl_FragDepthEXT = log2 (depth) * x3d_LogarithmicFarFactor1_2;
	else
		gl_FragDepthEXT = gl_FragCoord .z;
	#endif
}
