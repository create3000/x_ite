// import { maxTexCoords } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

const targets = [
   { name: "COLOR",    type: "vec4", fn: "Color",   swizzle: "rgba" },
   { name: "TANGENT",  type: "vec3", fn: "Tangent", swizzle: "xyz" },
   { name: "NORMAL",   type: "vec3", fn: "Normal",  swizzle: "xyz" },
   { name: "POSITION", type: "vec4", fn: "Vertex",  swizzle: "xyz" },
];

export default () => /* glsl */ `
#if defined (X3D_MORPH_TARGETS)

uniform float     x3d_MorphWeights [X3D_NUM_MORPH_WEIGHTS];
uniform sampler2D x3d_MorphTargetsTexture;

${targets .map (({ name, type, fn, swizzle }, i) =>
{
   return /* glsl */ `
#if defined (X3D_MORPH_TARGET_${name})
vec4
getTarget${fn} (in ${type} vector)
{
   int size = (X3D_MORPH_TARGET_${targets [i + 1] ?.name ?? "LAST"}_OFFSET - X3D_MORPH_TARGET_${name}_OFFSET)
      / X3D_NUM_MORPH_WEIGHTS;

   for (int i = 0; i < X3D_NUM_MORPH_WEIGHTS; ++ i)
   {
      int  index        = X3D_MORPH_TARGET_${name}_OFFSET + size * i + int (x3d_CoordIndex);
      vec4 displacement = texelFetch (x3d_MorphTargetsTexture, index, 0);

      vector .${swizzle} += x3d_MorphWeights [i] * displacement .${swizzle};
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
