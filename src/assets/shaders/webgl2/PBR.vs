#version 300 es

// https://github.com/cx20/gltf-test/blob/master/examples/khronos-gltf-loader/shaders/pbr-vert.glsl

precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat3 x3d_NormalMatrix;

in vec4 x3d_Color;
in vec4 x3d_TexCoord0;
in vec4 x3d_TexCoord1;
in vec3 x3d_Normal;
in vec4 x3d_Vertex;

out vec3 vertex;
out vec3 normal;
out vec4 texCoord0;
out vec4 texCoord1;
out vec4 color;       // color from Color node
out vec3 localNormal; // normal vector at this point on geometry in local coordinates
out vec3 localVertex; // point on geometry in local coordinates

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
out float depth;
#endif

#pragma X3D include "include/Particle.glsl"

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * getVertex (x3d_Vertex);

   vertex      = position .xyz;
   normal      = x3d_NormalMatrix * x3d_Normal;
   texCoord0   = getTexCoord (x3d_TexCoord0);
   texCoord1   = getTexCoord (x3d_TexCoord1);
   color       = x3d_Color;
   localNormal = x3d_Normal;
   localVertex = x3d_Vertex .xyz;

   gl_Position = x3d_ProjectionMatrix * position;

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   depth = 1.0 + gl_Position .w;
   #endif
}
