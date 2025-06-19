export default () => /* glsl */ `
#if defined (X3D_SKINNING) || defined (X3D_INSTANCING)
vec4
texelFetch (const in sampler2D _sampler, const in int index, const in int lod)
{
   int   x = textureSize (_sampler, lod) .x;
   ivec2 p = ivec2 (index % x, index / x);
   vec4  t = texelFetch (_sampler, p, lod);

   return t;
}
#endif
`;
