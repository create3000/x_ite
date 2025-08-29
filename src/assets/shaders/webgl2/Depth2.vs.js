export default () => /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in vec4 x3d_Vertex;

#if defined (X3D_NORMAL_BUFFER)
   #if defined (X3D_NORMALS)
      in vec3 x3d_Normal;
   #endif

   out vec3 normal;
#endif

#pragma X3D include "common/Utils.glsl"
#pragma X3D include "common/Skin.glsl"
#pragma X3D include "common/Instancing.glsl"
#pragma X3D include "common/PointSize.glsl"

void
main ()
{
   #if defined (X3D_NORMALS)
      vec4 x3d_TransformedVertex = getInstanceVertex (getSkinVertex (x3d_Vertex, x3d_Normal, x3d_Tangent .xyz));
      vec3 x3d_TransformedNormal = getInstanceNormal (getSkinNormal (x3d_Normal));
   #else
      vec4 x3d_TransformedVertex = getInstanceVertex (getSkinVertex (x3d_Vertex, vec3 (0.0), vec3 (0.0)));
   #endif

   vec4 position = x3d_ModelViewMatrix * x3d_TransformedVertex;

   #if defined (X3D_NORMALS)
      normal = x3d_TransformedNormal;
   #endif

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      gl_PointSize = pointSize = getPointSize (position .xyz);
   #else
      gl_PointSize = 1.0;
   #endif

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
