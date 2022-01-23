precision highp float;
precision highp int;
uniform x3d_MaterialParameters x3d_Material;
uniform int x3d_NumTextures;
uniform sampler2D x3d_Texture2D [1];
varying vec3 vertex;
varying vec3 normal;
varying vec4 texCoord;
varying vec4 color;
void
main ()
{
vec4 textureColor = x3d_NumTextures > 0 ? texture2D (x3d_Texture2D [0], texCoord .st) : vec4 (1.0);
vec4 finalColor = vec4 (0.0);
vec3 N = normalize (gl_FrontFacing ? normal : -normal);
vec3 V = normalize (-vertex); 
vec3 d = vec3 (0.0, 0.0, -1.0); 
vec3 L = -d;
vec3 H = normalize (L + V); 
vec3 diffuseColor = textureColor .rgb * color .rgb * x3d_Material .diffuseColor;
vec3 diffuseTerm = diffuseColor * max (dot (N, L), 0.0);
float specularFactor = bool (x3d_Material .shininess) ? pow (max (dot (N, H), 0.0), x3d_Material .shininess * 128.0) : 1.0;
vec3 specularTerm = x3d_Material .specularColor * specularFactor;
finalColor .rgb += diffuseTerm + specularTerm;
finalColor .rgb += x3d_Material .emissiveColor;
finalColor .a = textureColor .a * color .a * (1.0 - x3d_Material .transparency);
gl_FragColor = finalColor;
}
