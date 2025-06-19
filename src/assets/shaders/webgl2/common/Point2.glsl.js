import { maxTexCoords } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

export default () => /* glsl */ `
#if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
#if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
#if !defined (X3D_DEPTH_SHADER)
void
setPointTexCoords ()
{
   vec4 texCoord = vec4 (gl_PointCoord .x, 1.0 - gl_PointCoord .y, 0.0, 1.0);

   ${Array .from ({ length: maxTexCoords }, (_, i) => /* glsl */ `

   #if X3D_NUM_TEXTURE_COORDINATES > ${i}
      #if __VERSION__ == 100
         texCoord${i} = texCoord;
      #else
         texCoords [${i}] = texCoord;
      #endif
   #endif

   `) .join ("\n")}
}
#endif
#define getPointColor(color) (color)

#else

#if __VERSION__ == 100
   varying float pointSize;
#else
   in float pointSize;
#endif

#define setPointTexCoords()

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
