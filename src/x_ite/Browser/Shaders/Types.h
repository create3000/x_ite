// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

struct x3d_LightSourceParameters {
	mediump int   type;
	mediump vec3  color;
	mediump float intensity;
	mediump float ambientIntensity;
	mediump vec3  attenuation;
	mediump vec3  location;
	mediump vec3  direction;
	mediump float radius;
	mediump float beamWidth;
	mediump float cutOffAngle;
};
