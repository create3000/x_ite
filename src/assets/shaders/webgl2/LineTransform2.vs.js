export default () => /* glsl */ `#version 300 es

precision highp float;

#if defined (X3D_PASS_0)

uniform vec4  viewport;
uniform mat4  modelViewProjectionMatrix;
uniform mat4  invModelViewProjectionMatrix;
uniform float linewidthScaleFactor1_2;

#if defined (X3D_INSTANCING)
   in mat4 x3d_InstanceMatrix;
#endif

in float x3d_LengthSoFar;

in float x3d_CoordIndex0;
in float x3d_FogDepth0;
in vec4  x3d_Color0;
in vec4  x3d_Vertex0;

in float x3d_CoordIndex1;
in float x3d_FogDepth1;
in vec4  x3d_Color1;
in vec4  x3d_Vertex1;

// Registered in X3DShapeContext, 3 * 13 = 39 floats.
out float coordIndex0;
out vec3  lineStipple0;
out float fogDepth0;
out vec4  color0;
out vec4  vertex0;

out float coordIndex1;
out vec3  lineStipple1;
out float fogDepth1;
out vec4  color1;
out vec4  vertex1;

out float coordIndex2;
out vec3  lineStipple2;
out float fogDepth2;
out vec4  color2;
out vec4  vertex2;

vec3
projectPoint (const in vec4 point, const in mat4 modelViewProjectionMatrix, const in vec4 viewport)
{
   vec4 vin = modelViewProjectionMatrix * point;

   vin .xyz = vin .xyz / (2.0 * vin .w) + 0.5;

   return vec3 (vin .xy * viewport .zw + viewport .xy, vin .z);
}

vec4
unProjectPoint (const in vec3 win, const in mat4 invModelViewProjection, const in vec4 viewport)
{
   vec4 vin = vec4 ((win .xy - viewport .xy) / viewport .zw, win .z, 1.0);

   vin .xyz = vin .xyz * 2.0 - 1.0;

   vin = invModelViewProjection * vin;

   return vec4 (vin .xyz / vin .w, 1.0);
}

void
main ()
{
   vec4 x3d_InVertex0 = x3d_Vertex0;
   vec4 x3d_InVertex1 = x3d_Vertex1;

   #if defined (X3D_INSTANCING)
      x3d_InVertex0 = x3d_InstanceMatrix * x3d_InVertex0;
      x3d_InVertex1 = x3d_InstanceMatrix * x3d_InVertex1;
   #endif

   vec3 projected0 = projectPoint (x3d_InVertex0, modelViewProjectionMatrix, viewport);
   vec3 projected1 = projectPoint (x3d_InVertex1, modelViewProjectionMatrix, viewport);

   // Test if point is behind zNear.
   float neg0 = projected0 .z > 1.0 ? -1.0 : 1.0;
   float neg1 = projected1 .z > 1.0 ? -1.0 : 1.0;

   vec2 direction = normalize (projected1 .xy - projected0 .xy);
   vec2 offset    = vec2 (-direction .y, direction .x) * linewidthScaleFactor1_2;

   vec3 l0 = vec3 (projected1 .xy, x3d_LengthSoFar);
   vec3 l1 = vec3 (projected0 .xy, x3d_LengthSoFar);

   // 0 --- 3
   // | \   |
   // 0  \  1 line points
   // |   \ |
   // 1 --- 2

   mat4 unProjectMatrix = invModelViewProjectionMatrix;

   #if defined (X3D_INSTANCING)
      unProjectMatrix = inverse (x3d_InstanceMatrix) * unProjectMatrix;
   #endif

   if (gl_InstanceID % 2 == 0)
   {
      vec2 pq0 = projected0 .xy + offset * neg1;
      vec2 pq1 = projected0 .xy - offset * neg1;
      vec2 pq2 = projected1 .xy - offset * neg1;

      vec4 p0 = unProjectPoint (vec3 (pq0 .xy, projected0 .z), unProjectMatrix, viewport);
      vec4 p1 = unProjectPoint (vec3 (pq1 .xy, projected0 .z), unProjectMatrix, viewport);
      vec4 p2 = unProjectPoint (vec3 (pq2 .xy, projected1 .z), unProjectMatrix, viewport);

      coordIndex0  = x3d_CoordIndex0;
      lineStipple0 = l0;
      fogDepth0    = x3d_FogDepth0;
      color0       = x3d_Color0;
      vertex0      = p0;

      coordIndex1  = x3d_CoordIndex0;
      lineStipple1 = l0;
      fogDepth1    = x3d_FogDepth0;
      color1       = x3d_Color0;
      vertex1      = p1;

      coordIndex2  = x3d_CoordIndex1;
      lineStipple2 = l1;
      fogDepth2    = x3d_FogDepth1;
      color2       = x3d_Color1;
      vertex2      = p2;
   }
   else
   {
      vec2 pq0 = projected0 .xy + offset * neg0;
      vec2 pq2 = projected1 .xy - offset * neg0;
      vec2 pq3 = projected1 .xy + offset * neg0;

      vec4 p0 = unProjectPoint (vec3 (pq0 .xy, projected0 .z), unProjectMatrix, viewport);
      vec4 p2 = unProjectPoint (vec3 (pq2 .xy, projected1 .z), unProjectMatrix, viewport);
      vec4 p3 = unProjectPoint (vec3 (pq3 .xy, projected1 .z), unProjectMatrix, viewport);

      coordIndex0  = x3d_CoordIndex0;
      lineStipple0 = l0;
      fogDepth0    = x3d_FogDepth0;
      color0       = x3d_Color0;
      vertex0      = p0;

      coordIndex1  = x3d_CoordIndex1;
      lineStipple1 = l1;
      fogDepth1    = x3d_FogDepth1;
      color1       = x3d_Color1;
      vertex1      = p2;

      coordIndex2  = x3d_CoordIndex1;
      lineStipple2 = l1;
      fogDepth2    = x3d_FogDepth1;
      color2       = x3d_Color1;
      vertex2      = p3;
   }
}
#endif

#if defined (X3D_PASS_1)

#if defined (X3D_INSTANCING)
   in mat4 x3d_InstanceMatrix;
#endif

// Registered in X3DShapeContext, 3 * 16 = 48 floats.
out mat4 instanceMatrix0;
out mat4 instanceMatrix1;
out mat4 instanceMatrix2;

void
main ()
{
   instanceMatrix0 = x3d_InstanceMatrix;
   instanceMatrix1 = x3d_InstanceMatrix;
   instanceMatrix2 = x3d_InstanceMatrix;
}
#endif

#if defined (X3D_PASS_2)

#if defined (X3D_INSTANCING)
   in mat3 x3d_InstanceNormalMatrix;
   in vec3 x3d_Normal0;
   in vec3 x3d_Normal1;
   in vec4 x3d_Tangent0;
   in vec4 x3d_Tangent1;
#endif

// Registered in X3DShapeContext, 3 * (9 + 4 + 3) = 48 floats.
out mat3 instanceNormalMatrix0;
out vec4 tangent0;
out vec3 normal0;
out mat3 instanceNormalMatrix1;
out vec4 tangent1;
out vec3 normal1;
out mat3 instanceNormalMatrix2;
out vec4 tangent2;
out vec3 normal2;

void
main ()
{
   if (gl_InstanceID % 2 == 0)
   {
      instanceNormalMatrix0 = x3d_InstanceNormalMatrix;
      tangent0              = x3d_Tangent0;
      normal0               = x3d_Normal0;
      instanceNormalMatrix1 = x3d_InstanceNormalMatrix;
      tangent1              = x3d_Tangent0;
      normal1               = x3d_Normal0;
      instanceNormalMatrix2 = x3d_InstanceNormalMatrix;
      tangent2              = x3d_Tangent1;
      normal2               = x3d_Normal1;
   }
   else
   {
      instanceNormalMatrix0 = x3d_InstanceNormalMatrix;
      tangent0              = x3d_Tangent0;
      normal0               = x3d_Normal0;
      instanceNormalMatrix1 = x3d_InstanceNormalMatrix;
      tangent1              = x3d_Tangent1;
      normal1               = x3d_Normal1;
      instanceNormalMatrix2 = x3d_InstanceNormalMatrix;
      tangent2              = x3d_Tangent1;
      normal2               = x3d_Normal1;
   }
}
#endif
`;
