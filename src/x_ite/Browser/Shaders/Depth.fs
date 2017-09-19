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
pack (in float f)
{
	vec4 color;

	f *= 255.0;
	color .r = floor (f);

	f -= color .r;
	f *= 255.0;
	color .g = floor (f);

	f -= color .g;
	f *= 255.0;
	color .b = floor (f);

	f -= color .b;
	f *= 255.0;
	color .a = floor (f);

	return color / 255.0;
}

void
main ()
{
	clip ();

	gl_FragColor = pack (gl_FragCoord .z);
}
