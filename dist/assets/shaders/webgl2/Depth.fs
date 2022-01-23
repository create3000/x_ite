#version 300 es
precision highp float;
precision highp int;
in vec3 vertex; 
out vec4 x3d_FragColor;
#ifdef TITANIA
vec4
pack (const in float value)
{
return vec4 (0.0, 0.0, 0.0, 0.0);
}
float
unpack (const in vec4 color)
{
return color .r;
}
#endif
#ifdef X_ITE
vec4
pack (const in float value)
{
const vec3 bitShifts = vec3 (255.0,
255.0 * 255.0,
255.0 * 255.0 * 255.0);
return vec4 (value, fract (value * bitShifts));
}
#ifdef X3D_DEPTH_TEXTURE
float
unpack (const in vec4 color)
{
return color .r;
}
#else
float
unpack (const vec4 color)
{
const vec3 bitShifts = vec3 (1.0 / 255.0,
1.0 / (255.0 * 255.0),
1.0 / (255.0 * 255.0 * 255.0));
return color .x + dot (color .gba, bitShifts);
}
#endif
#endif
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
x3d_FragColor = pack (gl_FragCoord .z);
}
