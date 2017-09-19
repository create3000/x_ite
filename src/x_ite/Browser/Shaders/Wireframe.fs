// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;

uniform float x3d_LinewidthScaleFactor;

uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];

uniform int   x3d_FogType;
uniform vec3  x3d_FogColor;
uniform float x3d_FogVisibilityRange;

varying vec4 C; // color
varying vec3 v; // point on geometry

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

void
main ()
{
	clip ();

	gl_FragColor .rgb = mix (x3d_FogColor, C .rgb, getFogInterpolant ());
	gl_FragColor .a   = C .a;
}
