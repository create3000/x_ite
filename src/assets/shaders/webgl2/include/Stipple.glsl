#if defined (X3D_GEOMETRY_1D)
#pragma X3D include "include/Line2.glsl"

uniform x3d_LinePropertiesParameters x3d_LineProperties;

flat in float lengthSoFar; // in px, stipple support
flat in vec2  startPoint;  // in px, stipple support
in vec2       midPoint;    // in px, stipple support

void
stipple ()
{
   if (x3d_LineProperties .applied)
   {
      vec2  point = closest_point (line2 (startPoint, midPoint), gl_FragCoord .xy);
      float s     = (lengthSoFar + length (point - startPoint)) * x3d_LineProperties .lineStippleScale;
      float alpha = texture (x3d_LineProperties .linetype, vec2 (s, 0.5)) .a;

      if (alpha != 1.0)
         discard;
   }
}
#endif
