export default /* glsl */ `
#if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
#if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
void
setPointTexCoords ()
{
   vec4 texCoord = vec4 (gl_PointCoord .x, 1.0 - gl_PointCoord .y, 0.0, 1.0);

   #if X3D_NUM_TEXTURE_COORDINATES > 0
      texCoord0 = texCoord;
   #endif

   #if X3D_NUM_TEXTURE_COORDINATES > 1
      texCoord1 = texCoord;
   #endif

   #if X3D_NUM_TEXTURE_COORDINATES > 2
      texCoord2 = texCoord;
   #endif

   #if X3D_NUM_TEXTURE_COORDINATES > 3
      texCoord3 = texCoord;
   #endif
}

#define getPointColor(color) (color)

#else

#define setPointTexCoords()

varying float pointSize;

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
#endif
`;
