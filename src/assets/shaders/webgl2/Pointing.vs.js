export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in vec4 x3d_Vertex;
in vec3 x3d_Normal;

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

#pragma X3D include "include/Particle.glsl"
#pragma X3D include "include/PointSize.glsl"

void
main ()
{
   #if defined (X3D_GEOMETRY_0D)
      #if defined (X3D_STYLE_PROPERTIES)
         gl_PointSize = max (pointSize = getPointSize (vertex), 2.0);
      #else
         gl_PointSize = 2.0;
      #endif
   #endif

   #if defined (X3D_GEOMETRY_1D) && defined (X3D_STYLE_PROPERTIES)
      lengthSoFar = x3d_LineStipple .z;
      startPoint  = x3d_LineStipple .xy;
      midPoint    = x3d_LineStipple .xy;
   #endif

   vec4 position = x3d_ModelViewMatrix * getVertex (x3d_Vertex);

   vertex = position .xyz;
   normal = x3d_Normal;

   #if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
      texCoord0 = x3d_TexCoord0;
   #endif

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
