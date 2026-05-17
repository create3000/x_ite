export default () => /* glsl */ `
#if defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
#if defined (X3D_FRAGMENT_SHADER)

layout(location = 0) out vec4 x3d_FragData0;
layout(location = 1) out vec4 x3d_FragData1;

// https://learnopengl.com/Guest-Articles/2020/OIT/Weighted-Blended
float
weight (const in float z, const in float a)
{
   return clamp (pow (min (1.0, a * 10.0) + 0.01, 3.0) * 1e8 * pow (1.0 - z * 0.9, 3.0), 1e-2, 3e3);
}

void
oit (in vec4 finalColor)
{
   float a = finalColor .a;
   float w = weight (gl_FragCoord .z, a);

   finalColor .rgb *= a;
   finalColor      *= w;

   x3d_FragData0 = vec4 (finalColor .rgb, a);
   x3d_FragData1 = vec4 (finalColor .a);
}
#endif
#endif
`;
