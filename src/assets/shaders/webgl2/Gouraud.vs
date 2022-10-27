#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
precision highp samplerCube;

#pragma X3D include "include/Vertex.glsl"
#pragma X3D include "include/Material.glsl"

uniform bool x3d_ColorMaterial;

out vec4 frontColor;
out vec4 backColor;

vec4
getMaterialColor (const in vec3 N,
                  const in vec3 vertex,
                  const in x3d_MaterialParameters material)
{
   #if defined (X3D_NORMALS)
      float alpha        = (1.0 - material .transparency) * (x3d_ColorMaterial ? x3d_Color .a : 1.0);
      vec3  diffuseColor = x3d_ColorMaterial ? x3d_Color .rgb : material .diffuseColor;
      vec3  ambientColor = diffuseColor * material .ambientIntensity;

      vec3 finalColor = getMaterialColor (vertex, N, ambientColor, diffuseColor, material .specularColor, material .shininess);
   #else
      float alpha      = 1.0 - x3d_Material .transparency;
      vec3  finalColor = vec3 (0.0);

      if (x3d_ColorMaterial)
      {
         alpha      *= color .a;
         finalColor  = color .rgb;
      }
   #endif

   finalColor += material .emissiveColor;

   return vec4 (finalColor, alpha);
}

void
main ()
{
   vertex_main ();

   normal     = normalize (normal);
   frontColor = getMaterialColor ( normal, vertex, x3d_Material);
   backColor  = getMaterialColor (-normal, vertex, x3d_Material);
}
