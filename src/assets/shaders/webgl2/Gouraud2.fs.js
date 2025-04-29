export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
precision highp samplerCube;

#pragma X3D include "common/Material.glsl"

vec4
getMaterialColor ()
{
   return getGouraudColor ();
}
`;
