
precision mediump float;
precision mediump int;

varying vec4 color;  // color
varying vec3 vertex; // point on geometry

#pragma X3D include "include/ClipPlanes.glsl"

void
main ()
{
	clip ();

	gl_FragColor = color;
}
