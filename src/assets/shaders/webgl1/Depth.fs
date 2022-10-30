precision highp float;
precision highp int;

varying vec3 vertex;

#pragma X3D include "include/ClipPlanes.glsl"
#pragma X3D include "include/Pack.glsl"

void
main ()
{
   clip ();

   gl_FragColor = pack (gl_FragCoord .z);
}
