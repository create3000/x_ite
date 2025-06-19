export default () => /* glsl */ `

#extension GL_OES_standard_derivatives : enable
#extension GL_EXT_frag_depth : enable

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp samplerCube;

#pragma X3D include "common/Material.glsl"
`;
