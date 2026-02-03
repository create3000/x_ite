export default () => /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in vec4 x3d_Vertex;

#if defined (X3D_CLIP_PLANES)
   out vec3 vertex;
#endif

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
   vec4 tVertex = x3d_Vertex;

   #if defined (X3D_NORMALS)
      vec3 tNormal  = x3d_Normal;

      tVertex = getInstanceVertex (getSkinVertex (tVertex, tNormal, vec3 (0.0)));
      tNormal = getInstanceNormal (getSkinNormal (tNormal));
   #else
      tVertex = getInstanceVertex (getSkinVertex (tVertex, vec3 (0.0), vec3 (0.0)));
   #endif

   tVertex = x3d_ModelViewMatrix * tVertex;

   #if defined (X3D_CLIP_PLANES)
      vertex = tVertex .xyz;
   #endif

   #if defined (X3D_NORMALS)
      normal = tNormal;
   #endif

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      gl_PointSize = pointSize = getPointSize (tVertex .xyz);
   #else
      gl_PointSize = 1.0;
   #endif

   gl_Position = x3d_ProjectionMatrix * tVertex;
}
`;
