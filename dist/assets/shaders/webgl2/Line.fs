#version 300 es
precision highp float;
precision highp int;
uniform float x3d_AlphaCutoff;
uniform x3d_LinePropertiesParameters x3d_LineProperties;
uniform ivec4 x3d_Viewport;
flat in float lengthSoFar; 
flat in vec2 startPoint; 
in vec2 midPoint; 
in float fogDepth; 
in vec4 color; 
in vec3 vertex; 
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif
out vec4 x3d_FragColor;
uniform x3d_FogParameters x3d_Fog;
float
getFogInterpolant ()
{
if (x3d_Fog .type == x3d_None)
return 1.0;
if (x3d_Fog .fogCoord)
return clamp (1.0 - fogDepth, 0.0, 1.0);
float visibilityRange = x3d_Fog .visibilityRange;
if (visibilityRange <= 0.0)
return 1.0;
float dV = length (x3d_Fog .matrix * vertex);
if (dV >= visibilityRange)
return 0.0;
switch (x3d_Fog .type)
{
case x3d_LinearFog:
{
return (visibilityRange - dV) / visibilityRange;
}
case x3d_ExponentialFog:
{
return exp (-dV / (visibilityRange - dV));
}
default:
{
return 1.0;
}
}
}
vec3
getFogColor (const in vec3 color)
{
return mix (x3d_Fog .color, color, getFogInterpolant ());
}
uniform int x3d_NumClipPlanes;
uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];
void
clip ()
{
for (int i = 0; i < x3d_MaxClipPlanes; ++ i)
{
if (i == x3d_NumClipPlanes)
break;
if (dot (vertex, x3d_ClipPlane [i] .xyz) - x3d_ClipPlane [i] .w < 0.0)
discard;
}
}
struct Line2
{
vec2 point;
vec2 direction;
};
Line2
line2 (const in vec2 point1, const in vec2 point2)
{
return Line2 (point1, normalize (point2 - point1));
}
vec2
closest_point (const in Line2 line, const in vec2 point)
{
vec2 r = point - line .point;
float d = dot (r, line .direction);
return line .direction * d + line .point;
}
void
stipple ()
{
if (x3d_LineProperties .applied)
{
vec2 point = closest_point (line2 (startPoint, midPoint), gl_FragCoord .xy);
float s = (lengthSoFar + length (point - startPoint)) * x3d_LineProperties .lineStippleScale;
float alpha = texture (x3d_LineProperties .linetype, vec2 (s, 0.5)) .a;
if (alpha != 1.0)
discard;
}
}
void
main ()
{
clip ();
stipple ();
vec4 finalColor = vec4 (0.0);
finalColor .rgb = getFogColor (color .rgb);
finalColor .a = color .a;
if (finalColor .a < x3d_AlphaCutoff)
{
discard;
}
x3d_FragColor = finalColor;
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
if (x3d_LogarithmicFarFactor1_2 > 0.0)
gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
else
gl_FragDepth = gl_FragCoord .z;
#endif
}
