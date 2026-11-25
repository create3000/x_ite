// import { maxTexCoords } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

export default () => /* glsl */ `
#if defined (X3D_MORPH_TARGETS)

uniform float     x3d_MorphWeights [X3D_NUM_MORPH_WEIGHTS];
uniform sampler2D x3d_MorphTargetsTexture;

#if defined (X3D_MORPH_TARGET_COLOR)
vec4
getTargetColor (in vec4 color, const in int vertexID)
{
   return color;
}
#else
   #define getTargetColor(color,vertexID) (color)
#endif

#if defined (X3D_MORPH_TARGET_TANGENT)
vec3
getTargetTangent (in vec3 tangent, const in int vertexID)
{
   return tangent;
}
#else
   #define getTargetTangent(tangent,vertexID) (tangent)
#endif

#if defined (X3D_MORPH_TARGET_NORMAL)
vec3
getTargetNormal (in vec3 normal, const in int vertexID)
{
   return normal;
}
#else
   #define getTargetNormal(normal,vertexID) (normal)
#endif

#if defined (X3D_MORPH_TARGET_POSITION)
vec4
getTargetVertex (in vec4 vertex, const in int vertexID)
{
   return vertex;
}
#else
   #define getTargetVertex(vertex,vertexID) (vertex)
#endif

#else
   #define getTargetColor(color,vertexID) (color)
   #define getTargetTangent(tangent,vertexID) (tangent)
   #define getTargetNormal(normal,vertexID) (normal)
   #define getTargetVertex(vertex,vertexID) (vertex)
#endif
`;
