export default /* glsl */ `
precision highp float;
precision highp int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat3 x3d_NormalMatrix;

attribute vec4 x3d_Vertex;
attribute vec3 x3d_Normal;

varying vec3 vertex;
varying vec3 normal;

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

   vertex = position .xyz;
   normal = x3d_NormalMatrix * x3d_Normal;

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
