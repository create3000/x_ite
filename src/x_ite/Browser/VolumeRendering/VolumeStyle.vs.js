export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat4 x3d_TextureMatrix [1];

#if defined (X3D_XR_SESSION)
   uniform mat4 x3d_EyeMatrix;
#endif

in vec4 x3d_TexCoord0;
in vec4 x3d_Vertex;

out vec3 vertex;
out vec4 texCoord;

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   out float depth;
#endif

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

   #if defined (X3D_XR_SESSION)
      position = x3d_EyeMatrix * position;
   #endif

   vertex   = position .xyz;
   texCoord = x3d_TextureMatrix [0] * x3d_TexCoord0;

   gl_Position = x3d_ProjectionMatrix * position;

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      depth = 1.0 + gl_Position .w;
   #endif
}
`;
