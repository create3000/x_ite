export default /* glsl */ `#version 300 es

precision highp float;

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
in vec3  x3d_Normal0;
in vec4  x3d_Vertex0;

in float x3d_CoordIndex1;
in float x3d_FogDepth1;
in vec4  x3d_Color1;
in vec3  x3d_Normal1;
in vec4  x3d_Vertex1;

// Registered in X3DShapeContext.
out float coordIndex0;
out vec3  lineStipple0;
out float fogDepth0;
out vec4  color0;
out vec3  normal0;
out vec4  vertex0;

out float coordIndex1;
out vec3  lineStipple1;
out float fogDepth1;
out vec4  color1;
out vec3  normal1;
out vec4  vertex1;

out float coordIndex2;
out vec3  lineStipple2;
out float fogDepth2;
out vec4  color2;
out vec3  normal2;
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
   #if defined (X3D_INSTANCING)
      vec3 projected0 = projectPoint (x3d_InstanceMatrix * x3d_Vertex0, modelViewProjectionMatrix, viewport);
      vec3 projected1 = projectPoint (x3d_InstanceMatrix * x3d_Vertex1, modelViewProjectionMatrix, viewport);
   #else
      vec3 projected0 = projectPoint (x3d_Vertex0, modelViewProjectionMatrix, viewport);
      vec3 projected1 = projectPoint (x3d_Vertex1, modelViewProjectionMatrix, viewport);
   #endif

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

   if (gl_InstanceID % 2 == 0)
   {
      vec2 pq0 = projected0 .xy + offset * neg1;
      vec2 pq1 = projected0 .xy - offset * neg1;
      vec2 pq2 = projected1 .xy - offset * neg1;

      vec4 p0 = unProjectPoint (vec3 (pq0 .xy, projected0 .z), invModelViewProjectionMatrix, viewport);
      vec4 p1 = unProjectPoint (vec3 (pq1 .xy, projected0 .z), invModelViewProjectionMatrix, viewport);
      vec4 p2 = unProjectPoint (vec3 (pq2 .xy, projected1 .z), invModelViewProjectionMatrix, viewport);

      coordIndex0  = x3d_CoordIndex0;
      lineStipple0 = l0;
      fogDepth0    = x3d_FogDepth0;
      color0       = x3d_Color0;
      normal0      = x3d_Normal0;
      vertex0      = p0;

      coordIndex1  = x3d_CoordIndex0;
      lineStipple1 = l0;
      fogDepth1    = x3d_FogDepth0;
      color1       = x3d_Color0;
      normal1      = x3d_Normal0;
      vertex1      = p1;

      coordIndex2  = x3d_CoordIndex1;
      lineStipple2 = l1;
      fogDepth2    = x3d_FogDepth1;
      color2       = x3d_Color1;
      normal2      = x3d_Normal1;
      vertex2      = p2;
   }
   else
   {
      vec2 pq0 = projected0 .xy + offset * neg0;
      vec2 pq2 = projected1 .xy - offset * neg0;
      vec2 pq3 = projected1 .xy + offset * neg0;

      vec4 p0 = unProjectPoint (vec3 (pq0 .xy, projected0 .z), invModelViewProjectionMatrix, viewport);
      vec4 p2 = unProjectPoint (vec3 (pq2 .xy, projected1 .z), invModelViewProjectionMatrix, viewport);
      vec4 p3 = unProjectPoint (vec3 (pq3 .xy, projected1 .z), invModelViewProjectionMatrix, viewport);

      coordIndex0  = x3d_CoordIndex0;
      lineStipple0 = l0;
      fogDepth0    = x3d_FogDepth0;
      color0       = x3d_Color0;
      normal0      = x3d_Normal0;
      vertex0      = p0;

      coordIndex1  = x3d_CoordIndex1;
      lineStipple1 = l1;
      fogDepth1    = x3d_FogDepth1;
      color1       = x3d_Color1;
      normal1      = x3d_Normal1;
      vertex1      = p2;

      coordIndex2  = x3d_CoordIndex1;
      lineStipple2 = l1;
      fogDepth2    = x3d_FogDepth1;
      color2       = x3d_Color1;
      normal2      = x3d_Normal1;
      vertex2      = p3;
   }
}
`;
