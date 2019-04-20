// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

attribute vec4 x3d_Vertex;

varying vec3 vertex; // point on geometry

void
main ()
{
	vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

	vertex = position .xyz;

	gl_Position = x3d_ProjectionMatrix * position;
}
