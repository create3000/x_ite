#version 300 es
// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform sampler2D tex [2];

out vec4 x3d_FragColor;

vec4
getColor ()
{
	vec4 textureColor = vec4 (0.0);

	for (int i = 0; i < 2; ++ i)
		textureColor += texture (tex [i], vec2 (0.0));

	return textureColor;
}

void
main ()
{
	x3d_FragColor = getColor ();
}
