export default /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;

varying vec3 vertex;

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

   gl_FragColor = vec4 (gl_FragCoord .z);
}
`;
