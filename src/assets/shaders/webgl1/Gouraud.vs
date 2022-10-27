precision highp float;
precision highp int;
precision highp sampler2D;
precision highp samplerCube;

#pragma X3D include "include/Vertex.glsl"
#pragma X3D include "include/Material.glsl"

uniform bool x3d_ColorMaterial;

varying vec4 frontColor;

#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
   varying vec4 backColor;
#endif

vec4
getMaterialColor (const in vec3 N,
                  const in vec3 vertex,
                  const in x3d_MaterialParameters material)
{
   float alpha        = 1.0 - x3d_Material .transparency;
   vec4  diffuseAlpha = x3d_ColorMaterial ? vec4 (x3d_Color .rgb, x3d_Color .a * alpha) : vec4 (material .diffuseColor, alpha);
   vec3  ambientColor = diffuseAlpha .rgb * material .ambientIntensity;
   vec3  finalColor   = getMaterialColor (vertex, N, ambientColor, diffuseAlpha .rgb, material .specularColor, material .shininess);

   finalColor += material .emissiveColor;

   return vec4 (finalColor, diffuseAlpha .a);
}

void
main ()
{
   vertex_main ();

   normal     = normalize (normal);
   frontColor = getMaterialColor (normal, vertex, x3d_Material);

   #if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
      backColor = getMaterialColor (-normal, vertex, x3d_Material);
   #endif
}
