#if defined (X3D_GEOMETRY_0D)
in float pointSize;
vec4 texCoord0 = vec4 (0.0);
vec4 texCoord1 = vec4 (0.0);

void
setTexCoords ()
{
   vec4 texCoord = vec4 (gl_PointCoord .x, 1.0 - gl_PointCoord .y, 0.0, 1.0);

   texCoord0 = texCoord;
   texCoord1 = texCoord;
}

vec4
getPointColor (in vec4 color)
{
   if (pointSize > 1.0)
   {
      float t = max (distance (vec2 (0.5), gl_PointCoord) * pointSize - max (pointSize / 2.0 - 1.0, 0.0), 0.0);

      color .a = mix (color .a, 0.0, t);
   }
   else
   {
      color .a *= pointSize;
   }

   return color;
}
#endif
