
precision mediump float;
precision mediump int;

varying vec3 vertex; // point on geometry

#pragma X3D include "include/Pack.glsl"
#pragma X3D include "include/ClipPlanes.glsl"

void
main ()
{
	clip ();

	gl_FragColor = pack (gl_FragCoord .z);
}
