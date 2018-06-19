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
