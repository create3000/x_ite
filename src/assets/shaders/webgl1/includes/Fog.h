/* -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-*/

uniform x3d_FogParameters x3d_Fog;

float
getFogInterpolant ()
{
	// Returns 0.0 for fog color and 1.0 for material color.

	if (x3d_Fog .type == x3d_None)
		return 1.0;

	float visibilityRange = x3d_Fog .fogCoord ? fogDepth : x3d_Fog .visibilityRange;

	if (visibilityRange <= 0.0)
		return 1.0;

	float dV = length (x3d_Fog .matrix * vertex);

	if (dV >= visibilityRange)
		return 0.0;

	if (x3d_Fog .type == x3d_LinearFog)
		return (visibilityRange - dV) / visibilityRange;

	if (x3d_Fog .type == x3d_ExponentialFog)
		return exp (-dV / (visibilityRange - dV));

	return 1.0;
}

vec3
getFogColor (const in vec3 color)
{
	return mix (x3d_Fog .color, color, getFogInterpolant ());
}
