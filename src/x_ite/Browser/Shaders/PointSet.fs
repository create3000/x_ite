// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform int  x3d_NumClipPlanes;
uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];

uniform float x3d_LinewidthScaleFactor;
uniform x3d_FogParameters x3d_Fog;

varying vec4 C; // color
varying vec3 v; // point on geometry

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

	float lw = (x3d_LinewidthScaleFactor + 1.0) / 2.0;
	float t  = distance (vec2 (0.5, 0.5), gl_PointCoord) * 2.0 * lw - lw + 1.0;

	gl_FragColor .rgb = getFogColor (C .rgb);
	gl_FragColor .a   = mix (C .a, 0.0, clamp (t, 0.0, 1.0));
}
