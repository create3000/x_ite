
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
precision highp int;
#else
precision mediump float;
precision mediump int;
#endif

varying vec3 vertex; // point on geometry

#pragma X3D include "include/Pack.glsl"
#pragma X3D include "include/ClipPlanes.glsl"

void
main ()
{
	clip ();

	gl_FragColor = pack (gl_FragCoord .z);
}
