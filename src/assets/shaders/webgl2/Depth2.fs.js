export default () => /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform int x3d_Id;

layout(location = 0) out vec4 x3d_FragData0;

in vec3 vertex;

#if defined (X3D_NORMAL_BUFFER)
   #if defined (X3D_NORMALS)
      in vec3 normal;
   #else
      const vec3 normal = vec3 (0.0, 0.0, 1.0);
   #endif

   layout(location = 1) out vec4 x3d_FragData1;
#endif

#pragma X3D include "common/ClipPlanes.glsl"
#pragma X3D include "common/Point.glsl"

void
main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      #if !(defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES))
         if (getPointColor (vec4 (1.0), gl_PointCoord) .a < 0.5)
            discard;
      #endif
   #endif

   #if defined (X3D_NORMAL_BUFFER)
      x3d_FragData0 = vec4 (gl_FragCoord .z, vec3 (x3d_Id)); // depth, id
      x3d_FragData1 = vec4 (normal, float (gl_FrontFacing)); // local normal, front face
   #else
      x3d_FragData0 = vec4 (gl_FragCoord .z); // depth
   #endif
}
`;
