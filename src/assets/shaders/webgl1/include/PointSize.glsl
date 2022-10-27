#if defined (X3D_GEOMETRY_0D)
uniform x3d_PointPropertiesParameters x3d_PointProperties;
uniform int x3d_NumTextures;

varying float pointSize;

float
getPointSize (const in vec3 vertex)
{
   // Determine point size.

   float pointSizeMinValue    = x3d_PointProperties .pointSizeMinValue;
   float pointSizeMaxValue    = x3d_PointProperties .pointSizeMaxValue;
   vec3  pointSizeAttenuation = x3d_PointProperties .pointSizeAttenuation;
   float dL                   = length (vertex);
   float pointSize            = 0.0;

   pointSize  = x3d_PointProperties .pointSizeScaleFactor;
   pointSize /= dot (pointSizeAttenuation, vec3 (1.0, dL, dL * dL));
   pointSize  = clamp (pointSize, pointSizeMinValue, pointSizeMaxValue);

   return pointSize > 1.0 && x3d_NumTextures == 0 ? pointSize + 1.0 : pointSize;
}
#endif
