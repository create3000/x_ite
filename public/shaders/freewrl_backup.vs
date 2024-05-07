precision highp float;

/*
The MIT License (MIT)
Copyright (c) 2011 Authors of J3D. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the Software), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Modified by Doug Sanden
*/

uniform vec3 chromaticDispertion;
uniform float bias;
uniform float scale;
uniform float power;
varying vec3 t;
varying vec3 tr;
varying vec3 tg;
varying vec3 tb;
varying float rfac;
void main()
{
    vec3 fragNormal = (fw_ModelViewMatrix * vec4(fw_Normal,1.0)).xyz;
    gl_Position = fw_ProjectionMatrix * fw_ModelViewMatrix * fw_Vertex;
    vec3 incident = normalize((fw_ModelViewMatrix * fw_Vertex).xyz)*chromaticDispertion;
    t = (vec4(reflect(incident, fragNormal),1.0)*fw_ModelViewMatrix).xyz;
    tr = (vec4(refract(incident, fragNormal, chromaticDispertion.x),1.0)*fw_ModelViewMatrix).xyz;
    tg = (vec4(refract(incident, fragNormal, chromaticDispertion.y),1.0)*fw_ModelViewMatrix).xyz;
    tb = (vec4(refract(incident, fragNormal, chromaticDispertion.z),1.0)*fw_ModelViewMatrix).xyz;
   
    rfac = bias + scale * pow(0.5+0.5*dot(incident, fragNormal), power);    
}
