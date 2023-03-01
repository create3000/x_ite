export default /* glsl */ `
#if defined (X3D_PHYSICAL_MATERIAL)
#define getTexCoord(texCoord) vec4(texCoord .x, 1.0 - texCoord .y, texCoord .z, texCoord .w);
#else
#define getTexCoord(texCoord) (texCoord)
#endif
`;
