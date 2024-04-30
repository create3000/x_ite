#version 300 es
precision highp float;

/*
The MIT License (MIT)
Copyright (c) 2011 Authors of J3D. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the Software), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
uniform samplerCube x3d_TextureCube [x3d_MaxTextures];

in vec3 t;
in vec3 tr;
in vec3 tg;
in vec3 tb;
in float rfac;

out vec4 x3d_FragColor;

void main()
{
    vec4 refracted = texture(x3d_TextureCube [0], t);
    vec4 reflected = vec4(1.0);

    reflected.r = texture(x3d_TextureCube [0], tr).r;
    reflected.g = texture(x3d_TextureCube [0], tg).g;
    reflected.b = texture(x3d_TextureCube [0], tb).b;

    x3d_FragColor = mix (refracted, reflected, rfac);
}
