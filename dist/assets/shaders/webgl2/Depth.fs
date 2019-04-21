#version 300 es
// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

in vec3 vertex; // point on geometry

out vec4 x3d_FragColor;

#line 1
/* -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-*/

#ifdef TITANIA

vec4
pack (const in float value)
{
	return vec4 (0.0, 0.0, 0.0, 0.0);
}

float
unpack (const in vec4 color)
{
	return color .r;
}

#endif

#ifdef X_ITE

vec4
pack (const in float value)
{
	const vec3 bitShifts = vec3 (255.0,
	                             255.0 * 255.0,
	                             255.0 * 255.0 * 255.0);

	return vec4 (value, fract (value * bitShifts));
}

#ifdef X3D_DEPTH_TEXTURE

float
unpack (const in vec4 color)
{
	return color .r;
}

#else

float
unpack (const vec4 color)
{
	const vec3 bitShifts = vec3 (1.0 / 255.0,
	                             1.0 / (255.0 * 255.0),
	                             1.0 / (255.0 * 255.0 * 255.0));

	return color .x + dot (color .gba, bitShifts);
}

#endif
#endif

#line 11
#line 1
/* -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-*/

uniform int  x3d_NumClipPlanes;
uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];

void
clip ()
{
	for (int i = 0; i < x3d_MaxClipPlanes; ++ i)
	{
		if (i == x3d_NumClipPlanes)
			break;

		if (dot (vertex, x3d_ClipPlane [i] .xyz) - x3d_ClipPlane [i] .w < 0.0)
			discard;
	}
}

#line 12

void
main ()
{
	clip ();

	x3d_FragColor = pack (gl_FragCoord .z);
}
