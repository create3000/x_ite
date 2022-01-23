precision highp float;
precision highp int;
varying vec4 color; 
varying vec3 vertex; 
uniform int x3d_NumClipPlanes;
uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];
void
clip ()
{
for (int i = 0; i < x3d_MaxClipPlanes; ++ i)
{
if (i == x3d_NumClipPlanes)
break;
if (dot (vertex, x3d_ClipPlane [i] .xyz) - x3d_ClipPlane [i] .w < 0.0)
discard;
}
}
void
main ()
{
clip ();
gl_FragColor = color;
}
