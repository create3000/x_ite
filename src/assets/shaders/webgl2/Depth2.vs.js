export default () => /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in vec4 x3d_Vertex;

out vec3 vertex;

#pragma X3D include "common/Utils.glsl"
#pragma X3D include "common/Skin.glsl"
#pragma X3D include "common/Instancing.glsl"
#pragma X3D include "common/PointSize.glsl"

void
main ()
{
   vec4 x3d_TransformedVertex = getInstanceVertex (getSkinVertex (x3d_Vertex, vec3 (0.0), vec3 (0.0)));
   vec4 position              = x3d_ModelViewMatrix * x3d_TransformedVertex;

   vertex = position .xyz;

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      gl_PointSize = pointSize = getPointSize (vertex);
   #else
      gl_PointSize = 1.0;
   #endif

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
