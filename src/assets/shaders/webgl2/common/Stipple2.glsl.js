export default () => /* glsl */ `
#if defined (X3D_GEOMETRY_1D) && defined (X3D_STYLE_PROPERTIES)

#pragma X3D include "Line2.glsl"

uniform x3d_LinePropertiesParameters x3d_LineProperties;

flat in float lengthSoFar; // in px
flat in vec2  startPoint;  // in px
in vec2       midPoint;    // in px

void
stipple ()
{
   vec2  point = closest_point (line2 (startPoint, midPoint), gl_FragCoord .xy);
   float s     = (lengthSoFar + length (point - startPoint)) * x3d_LineProperties .lineStippleScale;

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      #if X3D_NUM_TEXTURE_COORDINATES > 0
         texCoord0 = vec4 (s, 0.0, 0.0, 1.0);
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 1
         texCoord1 = vec4 (s, 0.0, 0.0, 1.0);
      #endif
   #endif

   #if defined (X3D_STYLE_PROPERTIES_TEXTURE)
      if (x3d_LineProperties .linetype == 16)
         return;

      int   linetype = x3d_LineProperties .linetype;
      int   height   = textureSize (x3d_LineProperties .texture, 0) .y;
      float t        = 1.0 - float (linetype * 2 + 1) / float (height * 2);
      float alpha    = texture (x3d_LineProperties .texture, vec2 (s, 1.0 - t)) .a;

      if (alpha != 1.0)
         discard;
   #endif
}

#endif
`;
