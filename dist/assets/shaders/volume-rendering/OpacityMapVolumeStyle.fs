#version 300 es
precision mediump float;
precision mediump int;
precision mediump sampler3D;
uniform int x3d_NumTextures;
uniform sampler3D x3d_Texture3D [1];
uniform sampler2D transferFunction;
in vec3 vertex;
in vec4 texCoord;
out vec4 x3d_FragColor;
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
vec4
getTextureColor (in vec3 texCoord)
{
if (x3d_NumTextures == 0)
discard;
if (texCoord .s < 0.0 || texCoord .s > 1.0)
discard;
if (texCoord .t < 0.0 || texCoord .t > 1.0)
discard;
if (texCoord .p < 0.0 || texCoord .p > 1.0)
discard;
vec4 voxelColor = texture (x3d_Texture3D [0], texCoord);
vec4 textureColor = texture (transferFunction, voxelColor .ra);
return textureColor;
}
void
main ()
{
clip ();
x3d_FragColor = getTextureColor (texCoord .stp / texCoord .q);
}
