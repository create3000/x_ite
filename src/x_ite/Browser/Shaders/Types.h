// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

struct x3d_FogParameters {
	mediump int   type;
	mediump vec3  color;
	mediump float visibilityRange;
	mediump mat3  matrix;
	bool          fogCoord;
};

//uniform x3d_FogParameters x3d_Fog;

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
	mediump mat3  matrix;
	#ifdef X3D_SHADOWS
	mediump vec3  shadowColor;
	mediump float shadowIntensity;
	mediump float shadowBias;
	mediump mat4  shadowMatrix;
	mediump int   shadowMapSize;
	#endif
};

//uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];

struct x3d_MaterialParameters  
{   
	mediump float ambientIntensity;
	mediump vec3  diffuseColor;
	mediump vec3  specularColor;
	mediump vec3  emissiveColor;
	mediump float shininess;
	mediump float transparency;
};

//uniform x3d_MaterialParameters x3d_FrontMaterial;
//uniform x3d_MaterialParameters x3d_BackMaterial;
    
struct x3d_MultiTextureParameters  
{   
	mediump int mode;
	mediump int alphaMode;
	mediump int source;
	mediump int function;
};

//uniform x3d_MultiTextureParameters x3d_MultiTexture [x3d_MaxTextures];

struct x3d_TextureCoordinateGeneratorParameters  
{   
	mediump int   mode;
	mediump float parameter [6];
};

//uniform x3d_TextureCoordinateGeneratorParameters x3d_TextureCoordinateGenerator [x3d_MaxTextures;

struct x3d_FillParameters  
{   
	bool         filled;
	bool         hatched;
	mediump vec3 hatchColor;
	sampler2D    hatchStyle;
};

//uniform x3d_FillParameters x3d_FillProperties;

struct x3d_ParticleParameters  
{   
	mediump int   id;
	mediump int   life;
	mediump float elapsedTime;
};

//uniform x3d_ParticleParameters x3d_Particle;
