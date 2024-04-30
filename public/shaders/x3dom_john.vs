precision highp float;

/*
The MIT License (MIT)
Copyright (c) 2011 Authors of J3D. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the Software), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
attribute vec3 position;
attribute vec3 normal;
attribute vec2 texcoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelViewMatrixInverse;

varying vec3 t;
varying vec3 tr;
varying vec3 tg;
varying vec3 tb;
varying float rfac;

uniform vec3 chromaticDispertion;
uniform float bias;
uniform float scale;
uniform float power;


void main()
{
    vec4 eye = vec4(modelViewMatrixInverse * vec4(0,0,0,1));
    vec3 fragEyeVector = position - eye.xyz;
                            
    vec3 i = normalize(fragEyeVector);
    t = reflect(i, normal);
    tr = refract(i, normal, chromaticDispertion.x);
    tg = refract(i, normal, chromaticDispertion.y);
    tb = refract(i, normal, chromaticDispertion.z);
    rfac = bias + scale * pow(0.5+0.5*dot(i, normal), power);

    gl_Position = modelViewProjectionMatrix*vec4(position, 1);
}
