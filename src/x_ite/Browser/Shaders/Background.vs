// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

attribute vec4 x3d_Color;
attribute vec4 x3d_Vertex;

varying vec4 C; // color
varying vec3 v; // point on geometry

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
varying float depth;
#endif

void
main ()
{
	vec4 p = x3d_ModelViewMatrix * x3d_Vertex;

	v           = p .xyz;
	gl_Position = x3d_ProjectionMatrix * p;
	C           = x3d_Color;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	depth = 1.0 + gl_Position .w;
	#endif
}
