export default () => /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform int x3d_Id;

in vec3 vertex;

layout(location = 0) out vec4 x3d_FragData0;

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
         if (getPointColor (vec4 (1.0)) .a < 0.5)
            discard;
      #endif
   #endif

   x3d_FragData0 = vec4 (gl_FragCoord .z, float (x3d_Id), 0.0, 0.0); // depth, normal
}
`;
