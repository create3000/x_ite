precision highp float;
precision highp int;
uniform x3d_MaterialParameters x3d_Material;
uniform int x3d_NumTextures;
uniform sampler2D x3d_Texture2D [1];
varying vec4 texCoord;
varying vec4 color;
void
main ()
{
vec4 finalColor = x3d_NumTextures > 0 ? texture2D (x3d_Texture2D [0], texCoord .st) : vec4 (1.0);
finalColor .rgb *= x3d_Material .emissiveColor;
finalColor .a *= color .a * (1.0 - x3d_Material .transparency);
gl_FragColor = finalColor;
}
