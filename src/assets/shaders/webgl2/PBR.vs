#version 300 es

// https://github.com/cx20/gltf-test/blob/master/examples/khronos-gltf-loader/shaders/pbr-vert.glsl

precision highp float;
precision highp int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat3 x3d_NormalMatrix;

in mat4 x3d_ParticleMatrix;
in vec4 x3d_Vertex;
in vec3 x3d_Normal;
in vec4 x3d_TexCoord0;
in vec4 x3d_TexCoord1;
in vec4 x3d_Color;

out vec3 vertex;
out vec3 normal;
out vec4 texCoord0;
out vec4 texCoord1;
out vec4 color;       // color from Color node
out vec3 localNormal; // normal vector at this point on geometry in local coordinates
out vec3 localVertex; // point on geometry in local coordinates

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
out float depth;
#endif

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * (x3d_ParticleMatrix * x3d_Vertex);

   vertex      = position .xyz;
   normal      = x3d_NormalMatrix * x3d_Normal;
   texCoord0   = x3d_TexCoord0;
   texCoord1   = x3d_TexCoord1;
   color       = x3d_Color;
   localNormal = x3d_Normal;
   localVertex = x3d_Vertex .xyz;

   gl_Position = x3d_ProjectionMatrix * position;

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   depth = 1.0 + gl_Position .w;
   #endif
}
