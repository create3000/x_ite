// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;

uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];

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

vec4
pack (in float value)
{
	const vec4 bitSh = vec4 (256.0 * 256.0 * 256.0,
	                         256.0 * 256.0,
	                         256.0,
	                         1.0);

	const vec4 bitMsk = vec4 (0.0,
	                          1.0 / 256.0,
	                          1.0 / 256.0,
	                          1.0 / 256.0);

	vec4 comp = fract (value * bitSh);

	comp -= comp.xxyz * bitMsk;

	return comp;
}

void
main ()
{
	clip ();

	gl_FragColor = pack (gl_FragCoord .z);
}
