data:text/plain;charset=utf-8,
// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
//
//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
// 
//  Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
// 
//  All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
// 
//  The copyright notice above does not evidence any actual of intended
//  publication of such source code, and is an unpublished work by create3000.
//  This material contains CONFIDENTIAL INFORMATION that is the property of
//  create3000.
// 
//  No permission is granted to copy, distribute, or create derivative works from
//  the contents of this software, in whole or in part, without the prior written
//  permission of create3000.
// 
//  NON-MILITARY USE ONLY
// 
//  All create3000 software are effectively free software with a non-military use
//  restriction. It is free. Well commented source is provided. You may reuse the
//  source in any way you please with the exception anything that uses it must be
//  marked to indicate is contains 'non-military use only' components.
// 
//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
// 
//  Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
// 
//  This file is part of the Excite X3D Project.
// 
//  Excite X3D is free software: you can redistribute it and/or modify it under the
//  terms of the GNU General Public License version 3 only, as published by the
//  Free Software Foundation.
// 
//  Excite X3D is distributed in the hope that it will be useful, but WITHOUT ANY
//  WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
//  A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
//  details (a copy is included in the LICENSE file that accompanied this code).
// 
//  You should have received a copy of the GNU General Public License version 3
//  along with Excite X3D.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
//  copy of the GPLv3 License.
// 
//  For Silvio, Joy and Adi.


precision mediump float;

uniform mat4 x3d_TextureMatrix [1];
uniform mat3 x3d_NormalMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

uniform float x3d_LinewidthScaleFactor;
uniform bool  x3d_Lighting;      // true if a X3DMaterialNode is attached, otherwise false
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

uniform int   x3d_LightType [x3d_MaxLights];
uniform bool  x3d_LightOn [x3d_MaxLights];
uniform vec3  x3d_LightColor [x3d_MaxLights];
uniform float x3d_LightIntensity [x3d_MaxLights];
uniform float x3d_LightAmbientIntensity [x3d_MaxLights];
uniform vec3  x3d_LightAttenuation [x3d_MaxLights];
uniform vec3  x3d_LightLocation [x3d_MaxLights];
uniform vec3  x3d_LightDirection [x3d_MaxLights];
uniform float x3d_LightRadius [x3d_MaxLights];
uniform float x3d_LightBeamWidth [x3d_MaxLights];
uniform float x3d_LightCutOffAngle [x3d_MaxLights];

uniform bool x3d_SeparateBackColor;

uniform float x3d_AmbientIntensity;
uniform vec3  x3d_DiffuseColor;
uniform vec3  x3d_SpecularColor;
uniform vec3  x3d_EmissiveColor;
uniform float x3d_Shininess;
uniform float x3d_Transparency;

uniform float x3d_BackAmbientIntensity;
uniform vec3  x3d_BackDiffuseColor;
uniform vec3  x3d_BackSpecularColor;
uniform vec3  x3d_BackEmissiveColor;
uniform float x3d_BackShininess;
uniform float x3d_BackTransparency;

attribute vec4 x3d_Color;
attribute vec4 x3d_TexCoord;
attribute vec3 x3d_Normal;
attribute vec4 x3d_Vertex;

varying vec4  frontColor; // color
varying vec4  backColor;  // color
varying vec4  t;          // texCoord
varying vec3  v;          // point on geometry

vec4
getMaterialColor (in vec3 N,
                  in vec3 v,
                  in float x3d_AmbientIntensity,
                  in vec3  x3d_DiffuseColor,
                  in vec3  x3d_SpecularColor,
                  in vec3  x3d_EmissiveColor,
                  in float x3d_Shininess,
                  in float x3d_Transparency)
{
	vec3 V = normalize (-v); // normalized vector from point on geometry to viewer's position

	// Calculate diffuseFactor & alpha

	vec3  diffuseFactor = vec3 (1.0, 1.0, 1.0);
	float alpha         = 1.0 - x3d_Transparency;

	if (x3d_ColorMaterial)
	{
		diffuseFactor  = x3d_Color .rgb;
		alpha         *= x3d_Color .a;
	}
	else
		diffuseFactor = x3d_DiffuseColor;

	vec3 ambientTerm = diffuseFactor * x3d_AmbientIntensity;

	// Apply light sources

	vec3 finalColor = vec3 (0.0, 0.0, 0.0);

	for (int i = 0; i < x3d_MaxLights; ++ i)
	{
		int lightType = x3d_LightType [i];

		if (lightType == x3d_NoneLight)
			break;

		vec3  vL = x3d_LightLocation [i] - v;
		float dL = length (vL);
		bool  di = lightType == x3d_DirectionalLight;

		if (di || dL <= x3d_LightRadius [i])
		{
			vec3 d = x3d_LightDirection [i];
			vec3 c = x3d_LightAttenuation [i];
			vec3 L = di ? -d : normalize (vL);
			vec3 H = normalize (L + V); // specular term

			vec3  diffuseTerm    = diffuseFactor * max (dot (N, L), 0.0);
			float specularFactor = x3d_Shininess > 0.0 ? pow (max (dot (N, H), 0.0), x3d_Shininess * 128.0) : 1.0;
			vec3  specularTerm   = x3d_SpecularColor * specularFactor;

			float attenuation = di ? 1.0 : 1.0 / max (c [0] + c [1] * dL + c [2] * (dL * dL), 1.0);
			float spot        = 1.0;

			if (lightType == x3d_SpotLight)
			{
				float spotAngle   = acos (clamp (dot (-L, d), -1.0, 1.0));
				float cutOffAngle = x3d_LightCutOffAngle [i];
				float beamWidth   = x3d_LightBeamWidth [i];
				
				if (spotAngle >= cutOffAngle)
					spot = 0.0;
				else if (spotAngle <= beamWidth)
					spot = 1.0;
				else
					spot = (spotAngle - cutOffAngle) / (beamWidth - cutOffAngle);
			}
		
			vec3 lightFactor  = (attenuation * spot) * x3d_LightColor [i];
			vec3 ambientLight = (lightFactor * x3d_LightAmbientIntensity [i]) * ambientTerm;

			lightFactor *= x3d_LightIntensity [i];
			finalColor  += ambientLight + lightFactor * (diffuseTerm + specularTerm);
		}
	}

	finalColor += x3d_EmissiveColor;

	return vec4 (clamp (finalColor, 0.0, 1.0), alpha);
}

void
main ()
{
	gl_PointSize = x3d_LinewidthScaleFactor;

	vec4 p = x3d_ModelViewMatrix * x3d_Vertex;

	t = x3d_TextureMatrix [0] * x3d_TexCoord;
	v = p .xyz;

	gl_Position = x3d_ProjectionMatrix * p;

	if (x3d_Lighting)
	{
		vec3 N = normalize (x3d_NormalMatrix * x3d_Normal);

		float ambientIntensity = x3d_AmbientIntensity;
		vec3  diffuseColor     = x3d_DiffuseColor;
		vec3  specularColor    = x3d_SpecularColor;
		vec3  emissiveColor    = x3d_EmissiveColor;
		float shininess        = x3d_Shininess;
		float transparency     = x3d_Transparency;

		frontColor = getMaterialColor (N, v,
		                               ambientIntensity,
		                               diffuseColor,
		                               specularColor,
		                               emissiveColor,
		                               shininess,
		                               transparency);

		if (x3d_SeparateBackColor)
		{
			ambientIntensity = x3d_BackAmbientIntensity;
			diffuseColor     = x3d_BackDiffuseColor;
			specularColor    = x3d_BackSpecularColor;
			emissiveColor    = x3d_BackEmissiveColor;
			shininess        = x3d_BackShininess;
			transparency     = x3d_BackTransparency;
		}

		backColor = getMaterialColor (-N, v,
		                              ambientIntensity,
		                              diffuseColor,
		                              specularColor,
		                              emissiveColor,
		                              shininess,
		                              transparency);
	}
	else
	{
	   frontColor = backColor = x3d_ColorMaterial ? x3d_Color : vec4 (1.0, 1.0, 1.0, 1.0);
	}
}
