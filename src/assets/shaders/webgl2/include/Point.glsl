#if defined (X3D_STYLE_PROPERTIES) && defined (X3D_GEOMETRY_0D)

in float pointSize;

void
setTexCoords ()
{
   vec4 texCoord = vec4 (gl_PointCoord .x, 1.0 - gl_PointCoord .y, 0.0, 1.0);

   #if x3d_MaxTextures > 0
      texCoord0 = texCoord;
   #endif

   #if x3d_MaxTextures > 1
      texCoord1 = texCoord;
   #endif
}

vec4
getPointColor (in vec4 color)
{
   if (pointSize > 1.0)
      color .a *= clamp (pointSize * (0.5 - distance (vec2 (0.5), gl_PointCoord)), 0.0, 1.0);

   else
      color .a *= pointSize;

   return color;
}

#endif
