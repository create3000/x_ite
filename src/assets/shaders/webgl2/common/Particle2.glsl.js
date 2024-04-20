export default /* glsl */ `
#if defined (X3D_PARTICLE_SYSTEM)
#if defined (X3D_TEX_COORD_RAMP)

uniform sampler2D x3d_TexCoordRamp;

in vec4 x3d_Particle;

vec4
getParticleTexCoord (const in vec4 texCoord)
{
   const int map [6] = int [6] (0, 1, 2, 0, 2, 3);

   int index0 = int (x3d_Particle [3]);

   return texelFetch (x3d_TexCoordRamp, index0 + map [gl_VertexID % 6], 0);
}
#else
   #define getParticleTexCoord(texCoord) (texCoord)
#endif

in mat4 x3d_ParticleMatrix;
in mat3 x3d_ParticleNormalMatrix;

vec4
getParticleVertex (const in vec4 vertex)
{
   return x3d_ParticleMatrix * vertex;
}

vec3
getParticleNormal (const in vec3 normal)
{
   return x3d_ParticleNormalMatrix * normal;
}

#else
   #define getParticleVertex(vertex) (vertex)
   #define getParticleNormal(normal) (normal)
   #define getParticleTexCoord(texCoord) (texCoord)
#endif
`;
