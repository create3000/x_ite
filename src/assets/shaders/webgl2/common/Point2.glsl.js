import { maxTexCoords } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

export default () => /* glsl */ `
#if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
#if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
#if !defined (X3D_DEPTH_SHADER)
void
setPointTexCoords (const in vec2 pointCoord)
{
   vec4 texCoord = vec4 (pointCoord .x, 1.0 - pointCoord .y, 0.0, 1.0);

   ${Array .from ({ length: maxTexCoords }, (_, i) => /* glsl */ `

   #if X3D_NUM_TEXTURE_COORDINATES > ${i}
      texCoords [${i}] = texCoord;
   #endif

   `) .join ("\n")}
}
#endif
#define getPointColor(color,pointCoord) (color)

#else

in float pointSize;

#define setPointTexCoords(pointCoord)

vec4
getPointColor (in vec4 color, const in vec2 pointCoord)
{
   if (pointSize > 1.0)
      color .a *= clamp (pointSize * (0.5 - distance (vec2 (0.5), pointCoord)), 0.0, 1.0);

   else
      color .a *= pointSize;

   return color;
}
#endif
#endif
`;
