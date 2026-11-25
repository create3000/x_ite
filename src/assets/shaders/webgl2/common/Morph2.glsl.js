// import { maxTexCoords } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

export default () => /* glsl */ `
#if defined (X3D_MORPH_TARGETS)
vec4
getTargetColor (in vec4 color, const in int vertexID)
{
   return color;
}

vec3
getTargetTangent (in vec3 tangent, const in int vertexID)
{
   return tangent;
}

vec3
getTargetNormal (in vec3 normal, const in int vertexID)
{
   return normal;
}

vec4
getTargetVertex (in vec4 vertex, const in int vertexID)
{
   return vertex;
}
#else
   #define getTargetColor(color,vertexID) (color)
   #define getTargetTangent(tangent,vertexID) (tangent)
   #define getTargetNormal(normal,vertexID) (normal)
   #define getTargetVertex(vertex,vertexID) (vertex)
#endif
`;
