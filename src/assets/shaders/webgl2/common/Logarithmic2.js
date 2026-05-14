export default () => /* glsl */ `

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
#if defined (X3D_VERTEX_SHADER)

out float depth;

void
logarithmic (const in vec4 position)
{
   depth = 1.0 + gl_Position .w;
}
#endif
#if defined (X3D_FRAGMENT_SHADER)

uniform float x3d_LogarithmicFarFactor1_2;
in float depth;

void
logarithmic ()
{
   // https://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
   gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
}
#endif
#endif
`;
