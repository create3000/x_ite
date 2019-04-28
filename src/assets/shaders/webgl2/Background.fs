#version 300 es

precision mediump float;
precision mediump int;

in vec4 color;  // color
in vec3 vertex; // point on geometry

out vec4 x3d_FragColor;

#pragma X3D include "include/ClipPlanes.glsl"

void
main ()
{
	clip ();

	x3d_FragColor = color;
}
