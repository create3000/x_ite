import { maxTexCoords } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

const targets = [
   { name: "COLOR",    type: "vec4", fn: "Color",   components: "rgba" },
   { name: "TANGENT",  type: "vec3", fn: "Tangent", components: "xyz" },
   { name: "NORMAL",   type: "vec3", fn: "Normal",  components: "xyz" },
   { name: "POSITION", type: "vec4", fn: "Vertex",  components: "xyz" },
   ... Array .from ({ length: maxTexCoords }, (_, i) =>
   {
      return { name: `TEXCOORD_${i}`, type: "vec4", fn: `TexCoord${i}`, components: "xyz" };
   }),
];

export default () => /* glsl */ `
#if defined (X3D_MORPH_TARGETS)

uniform float x3d_MorphWeights [X3D_NUM_MORPH_WEIGHTS];
uniform sampler2DArray x3d_MorphTargetsTexture;

${targets .map (({ name, type, fn, components }) =>
{
   return /* glsl */ `
#if defined (X3D_MORPH_TARGET_${name})
${type}
getTarget${fn} (in ${type} vector)
{
   int index = X3D_MORPH_TARGET_${name}_OFFSET + int (x3d_CoordIndex);

   for (int i = 0; i < X3D_NUM_MORPH_WEIGHTS; ++ i)
   {
      vec4 displacement = texelFetch (x3d_MorphTargetsTexture, index, i, 0);

      vector .${components} += x3d_MorphWeights [i] * displacement .${components};
   }

   return vector;
}
#else
   #define getTarget${fn}(vector) (vector)
#endif
`;
})
.join ("\n")}

#else

${targets .map (({ fn }) => /* glsl */ `#define getTarget${fn}(vector) (vector)`) .join ("\n")}

#endif
`;
