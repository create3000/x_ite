// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];

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

void
main ()
{
	clip ();

	gl_FragColor = C;
}
