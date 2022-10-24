#version 300 es
precision highp float;
uniform vec4 viewport;
uniform mat4 modelViewProjectionMatrix;
uniform mat4 invModelViewProjectionMatrix;
uniform float scale;
in float x3d_FogDepth0; in vec4 x3d_Color0; in vec4 x3d_TexCoord0; in vec4 x3d_Vertex0;
in float x3d_FogDepth1; in vec4 x3d_Color1; in vec4 x3d_TexCoord1; in vec4 x3d_Vertex1;
out float fogDepth0; out vec4 color0; out vec4 texCoord0; out vec4 vertex0;
out float fogDepth1; out vec4 color1; out vec4 texCoord1; out vec4 vertex1;
out float fogDepth2; out vec4 color2; out vec4 texCoord2; out vec4 vertex2;
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
vec4 vin = vec4 ((win .xy - viewport .xy) / viewport .zw * 2.0 - 1.0, 2.0 * win .z - 1.0, 1.0);
vin = invModelViewProjection * vin;
return vec4 (vin .xyz / vin .w, 1.0);
}
void
main ()
{
vec3 projected0 = projectPoint (x3d_Vertex0, modelViewProjectionMatrix, viewport);
vec3 projected1 = projectPoint (x3d_Vertex1, modelViewProjectionMatrix, viewport);
vec2 direction = normalize (projected1 .xy - projected0 .xy);
vec2 offset = vec2 (-direction .y, direction .x) * scale;
if (gl_InstanceID == 0)
{
vec2 pq0 = projected0 .xy + offset;
vec2 pq1 = projected0 .xy - offset;
vec2 pq2 = projected1 .xy - offset;
vec4 p0 = unProjectPoint (vec3 (pq0 .xy, projected0 .z), invModelViewProjectionMatrix, viewport);
vec4 p1 = unProjectPoint (vec3 (pq1 .xy, projected0 .z), invModelViewProjectionMatrix, viewport);
vec4 p2 = unProjectPoint (vec3 (pq2 .xy, projected1 .z), invModelViewProjectionMatrix, viewport);
fogDepth0 = x3d_FogDepth0; color0 = x3d_Color0; texCoord0 = x3d_TexCoord0; vertex0 = p0;
fogDepth1 = x3d_FogDepth0; color1 = x3d_Color0; texCoord1 = x3d_TexCoord0; vertex1 = p1;
fogDepth2 = x3d_FogDepth1; color2 = x3d_Color1; texCoord2 = x3d_TexCoord1; vertex2 = p2;
}
else
{
vec2 pq0 = projected0 .xy + offset;
vec2 pq2 = projected1 .xy - offset;
vec2 pq3 = projected1 .xy + offset;
vec4 p0 = unProjectPoint (vec3 (pq0 .xy, projected0 .z), invModelViewProjectionMatrix, viewport);
vec4 p2 = unProjectPoint (vec3 (pq2 .xy, projected1 .z), invModelViewProjectionMatrix, viewport);
vec4 p3 = unProjectPoint (vec3 (pq3 .xy, projected1 .z), invModelViewProjectionMatrix, viewport);
fogDepth0 = x3d_FogDepth0; color0 = x3d_Color0; texCoord0 = x3d_TexCoord0; vertex0 = p0;
fogDepth1 = x3d_FogDepth1; color1 = x3d_Color1; texCoord1 = x3d_TexCoord1; vertex1 = p2;
fogDepth2 = x3d_FogDepth1; color2 = x3d_Color1; texCoord2 = x3d_TexCoord1; vertex2 = p3;
}
}
