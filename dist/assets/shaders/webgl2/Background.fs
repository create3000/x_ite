#version 300 es
// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

in vec4 color;  // color
in vec3 vertex; // point on geometry

out vec4 x3d_FragColor;

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

	x3d_FragColor = color;
}
