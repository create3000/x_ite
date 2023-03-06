export default /* glsl */ `
#if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
#if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
void
setPointTexCoords ()
{
   vec4 texCoord = vec4 (gl_PointCoord .x, 1.0 - gl_PointCoord .y, 0.0, 1.0);

   #if X3D_NUM_TEXTURE_COORDINATES > 0
      texCoords [0] = texCoord;
   #endif

   #if X3D_NUM_TEXTURE_COORDINATES > 1
      texCoords [1] = texCoord;
   #endif

   #if X3D_NUM_TEXTURE_COORDINATES > 2
      texCoords [2] = texCoord;
   #endif

   #if X3D_NUM_TEXTURE_COORDINATES > 3
      texCoords [3] = texCoord;
   #endif
}

#define getPointColor(color) (color)

#else

#define setTexCoords()

in float pointSize;

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
