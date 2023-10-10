export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat4 x3d_TextureTransformMatrix [1];

in vec4  x3d_TexCoord0;
in vec4  x3d_Vertex;

out vec3 vertex;
out vec4 texCoord;

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

   vertex   = position .xyz;
   texCoord = x3d_TextureTransformMatrix [0] * x3d_TexCoord0;

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
