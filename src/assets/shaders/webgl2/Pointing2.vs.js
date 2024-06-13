export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in vec4 x3d_Vertex;

#if defined (X3D_NORMALS)
   in vec3 x3d_Normal;
#else
   const vec3 x3d_Normal = vec3 (0.0, 0.0, 1.0);
#endif

#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
   in vec4 x3d_TexCoord0;
#endif

#if defined (X3D_GEOMETRY_1D) && defined (X3D_STYLE_PROPERTIES)
   in vec3 x3d_LineStipple;
#endif

out vec3 vertex;
out vec3 normal;

#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
   out vec4 texCoord0;
#endif

#if defined (X3D_GEOMETRY_1D) && defined (X3D_STYLE_PROPERTIES)
   flat out float lengthSoFar;
   flat out vec2  startPoint;
   out vec2       midPoint;
#endif

#pragma X3D include "common/Utils.glsl"
#pragma X3D include "common/Skin.glsl"
#pragma X3D include "common/Instancing.glsl"
#pragma X3D include "common/PointSize.glsl"

void
main ()
{
   #if defined (X3D_GEOMETRY_1D) && defined (X3D_STYLE_PROPERTIES)
      lengthSoFar = x3d_LineStipple .z;
      startPoint  = x3d_LineStipple .xy;
      midPoint    = x3d_LineStipple .xy;
   #endif

   vec4 x3d_TransformedVertex = getInstanceVertex (getSkinVertex (x3d_Vertex, x3d_Normal, vec3 (0.0)));
   vec4 position              = x3d_ModelViewMatrix * x3d_TransformedVertex;

   vertex = position .xyz;
   normal = getInstanceNormal (getSkinNormal (x3d_Normal));

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      gl_PointSize = pointSize = max (getPointSize (vertex), 2.0);
   #else
      gl_PointSize = 2.0;
   #endif

   #if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
      texCoord0 = x3d_TexCoord0;
   #endif

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
