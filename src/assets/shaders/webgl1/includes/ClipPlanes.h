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
