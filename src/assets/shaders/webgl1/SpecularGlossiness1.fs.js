export default /* glsl */ `

#extension GL_OES_standard_derivatives : enable
#extension GL_EXT_frag_depth : enable
#extension GL_EXT_shader_texture_lod : enable

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp samplerCube;

#pragma X3D include "pbr/SpecularGlossiness.glsl"
`;
