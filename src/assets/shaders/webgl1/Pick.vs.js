export default /* glsl */ `
precision highp float;
precision highp int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

attribute vec4 x3d_Vertex;
attribute vec3 x3d_Normal;
attribute vec4 x3d_TexCoord0;

varying vec3 vertex;
varying vec3 normal;
varying vec4 texCoord;

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

   vertex   = position .xyz;
   normal   = x3d_Normal;
   texCoord = x3d_TexCoord0;

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
