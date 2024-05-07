#version 300 es
precision highp float;

/*
The MIT License (MIT)
Copyright (c) 2011 Authors of J3D. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the Software), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
uniform mat4 x3d_ModelViewMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat3 x3d_NormalMatrix;

uniform vec3  chromaticDispertion;
uniform float bias;
uniform float scale;
uniform float power;

in vec3 x3d_Normal;
in vec4 x3d_Vertex;

out vec3  t;
out vec3  tr;
out vec3  tg;
out vec3  tb;
out float rfac;

void main()
{
  vec3 fragNormal = normalize (x3d_NormalMatrix * x3d_Normal);
  vec3 incident   = normalize ((x3d_ModelViewMatrix * x3d_Vertex) .xyz);

  t    = reflect (incident, fragNormal) * x3d_NormalMatrix;
  tr   = refract (incident, fragNormal, chromaticDispertion .x) * x3d_NormalMatrix;
  tg   = refract (incident, fragNormal, chromaticDispertion .y) * x3d_NormalMatrix;
  tb   = refract (incident, fragNormal, chromaticDispertion .z) * x3d_NormalMatrix;
  rfac = bias + scale * pow (clamp (0.5 + 0.5 * dot (incident, fragNormal), 0.0, 1.0), power);

  gl_Position = x3d_ProjectionMatrix * x3d_ModelViewMatrix * x3d_Vertex;
}
