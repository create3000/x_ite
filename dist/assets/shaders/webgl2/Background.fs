#version 300 es
// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

in vec4 color;  // color
in vec3 vertex; // point on geometry

out vec4 x3d_FragColor;

#pragma X3D include "Include/ClipPlanes.h"

void
main ()
{
	clip ();

	x3d_FragColor = color;
}
