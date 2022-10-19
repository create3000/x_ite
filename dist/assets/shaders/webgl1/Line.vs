precision highp float;
precision highp int;
uniform bool x3d_ColorMaterial; 
uniform x3d_UnlitMaterialParameters x3d_Material;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
attribute float x3d_FogDepth;
attribute vec4 x3d_Color;
attribute vec4 x3d_Vertex;
varying float fogDepth; 
varying vec4 color; 
varying vec3 vertex; 
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
varying float depth;
#endif
void
main ()
{
vec4 position = x3d_ModelViewMatrix * x3d_Vertex;
fogDepth = x3d_FogDepth;
vertex = position .xyz;
gl_Position = x3d_ProjectionMatrix * position;
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
depth = 1.0 + gl_Position .w;
#endif
float alpha = 1.0 - x3d_Material .transparency;
if (x3d_ColorMaterial)
{
color .rgb = x3d_Color .rgb;
color .a = x3d_Color .a * alpha;
}
else
{
color .rgb = x3d_Material .emissiveColor;
color .a = alpha;
}
}
