
precision mediump float;
precision mediump int;

varying vec3 vertex; // point on geometry

#pragma X3D include "include/Pack.h"
#pragma X3D include "include/ClipPlanes.h"

void
main ()
{
	clip ();

	gl_FragColor = pack (gl_FragCoord .z);
}
