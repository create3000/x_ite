export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in vec4 x3d_Vertex;

out vec3 vertex;

#pragma X3D include "include/Utils.glsl"
#pragma X3D include "include/Skinning.glsl"
#pragma X3D include "include/Particle.glsl"
#pragma X3D include "include/PointSize.glsl"

void
main ()
{
   vec4 x3d_TransformedVertex = getParticleVertex (getSkinningVertex (x3d_Vertex));
   vec4 position              = x3d_ModelViewMatrix * x3d_TransformedVertex;

   vertex = position .xyz;

   #if defined (X3D_GEOMETRY_0D)
      #if defined (X3D_STYLE_PROPERTIES)
         gl_PointSize = max (pointSize = getPointSize (vertex), 2.0);
      #else
         gl_PointSize = 2.0;
      #endif
   #endif

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
