// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

varying vec4 color;  // color
varying vec3 vertex; // point on geometry

#pragma X3D include "Include/ClipPlanes.h"

void
main ()
{
	clip ();

	gl_FragColor = color;
}
