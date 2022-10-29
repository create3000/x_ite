#if defined (X3D_GEOMETRY_1D)

#pragma X3D include "Line2.glsl"

uniform x3d_LinePropertiesParameters x3d_LineProperties;

flat in float lengthSoFar; // in px, stipple support
flat in vec2  startPoint;  // in px, stipple support
in vec2       midPoint;    // in px, stipple support

void
setTexCoords ()
{
   if (x3d_LineProperties .applied)
   {
      vec2  point = closest_point (line2 (startPoint, midPoint), gl_FragCoord .xy);
      float s     = (lengthSoFar + length (point - startPoint)) * x3d_LineProperties .lineStippleScale;

      #if x3d_MaxTextures > 0
         texCoord0 = vec4 (s, 0.5, 0.0, 1.0);
      #endif

      #if x3d_MaxTextures > 1
         texCoord1 = vec4 (s, 0.5, 0.0, 1.0);
      #endif
   }
}

void
stipple ()
{
   if (x3d_LineProperties .applied && x3d_LineProperties .linetype != 16)
   {
      float t     = 1.0 - float (x3d_LineProperties .linetype * 2 + 1) / (float (textureSize (x3d_LineProperties .texture, 0) .y * 2));
      float alpha = texture (x3d_LineProperties .texture, vec2 (texCoord0 .s, t)) .a;

      if (alpha != 1.0)
         discard;
   }
}

#endif
