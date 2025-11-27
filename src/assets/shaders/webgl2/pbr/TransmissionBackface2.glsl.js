export default () => /* glsl */ `

vec4
getMaterialColor (const in vec4 fragCoord)
{
   vec4 frontColor = vec4 (0.0);

   #if defined (X3D_TRANSMISSION_MATERIAL_EXT)
      frontColor = getBaseColor ();
   #endif

   #if defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
      MaterialInfo materialInfo;

      materialInfo = getDiffuseTransmissionInfo (materialInfo);

      frontColor += vec4 (materialInfo .diffuseTransmissionColorFactor, 1.0);
   #endif

   return frontColor;
}
`;
