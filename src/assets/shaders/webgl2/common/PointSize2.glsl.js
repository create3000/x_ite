export default /* glsl */ `
#if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)

uniform x3d_PointPropertiesParameters x3d_PointProperties;

#if __VERSION__ == 100
   varying float pointSize;
#else
   out float pointSize;
#endif

float
getPointSize (const in vec3 vertex)
{
   // Determine point size.

   float pointSizeMinValue = x3d_PointProperties .pointSizeMinValue;
   float pointSizeMaxValue = x3d_PointProperties .pointSizeMaxValue;
   vec3  attenuation       = x3d_PointProperties .attenuation;
   float dL                = length (vertex);
   float pointSize         = 0.0;

   pointSize  = x3d_PointProperties .pointSizeScaleFactor;
   pointSize /= dot (attenuation, vec3 (1.0, dL, dL * dL));
   pointSize  = clamp (pointSize, pointSizeMinValue, pointSizeMaxValue);

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURE)
      return pointSize;
   #else
      return pointSize + 1.0 - step (pointSize, 1.0);
   #endif
}

#endif
`;
