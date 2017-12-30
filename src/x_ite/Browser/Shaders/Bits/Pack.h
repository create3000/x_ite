/* -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-*/

#ifdef TITANIA
float
unpack (in vec4 color)
{
	return color .z;
}
#endif

#ifdef X_ITE
vec4
pack (in float value)
{
	const vec4 bitShifts = vec4 (1.0,
	                             255.0,
	                             255.0 * 255.0,
	                             255.0 * 255.0 * 255.0);

	return fract (value * bitShifts);
}

float
unpack (vec4 color)
{
	const vec4 bitShifts = vec4 (1.0,
	                             1.0 / 255.0,
	                             1.0 / (255.0 * 255.0),
	                             1.0 / (255.0 * 255.0 * 255.0));

	return dot (color, bitShifts);
}
#endif
