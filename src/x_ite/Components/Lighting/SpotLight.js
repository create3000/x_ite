/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Lighting/X3DLightNode",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Box3",
	"standard/Math/Geometry/Camera",
	"standard/Math/Geometry/ViewVolume",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Vector4",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Utility/MatrixStack",
	"standard/Math/Algorithm",
	"standard/Utility/ObjectCache",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLightNode, 
          X3DGroupingNode, 
          TraverseType,
          X3DConstants,
          Box3,
          Camera,
          ViewVolume,
          Vector3,
          Vector4,
          Rotation4,
          Matrix4,
          MatrixStack,
          Algorithm,
          ObjectCache)
{
"use strict";

	var SpotLights = ObjectCache (SpotLightContainer);
	
	function SpotLightContainer ()
	{
		this .location                      = new Vector3 (0, 0, 0);
		this .direction                     = new Vector3 (0, 0, 0);
		this .renderShadow                  = true; 
		this .shadowBuffer                  = null;
		this .bbox                          = new Box3 ();
		this .viewVolume                    = new ViewVolume ();
		this .viewport                      = new Vector4 (0, 0, 0, 0);
		this .projectionMatrix              = new Matrix4 ();
		this .modelViewMatrix               = new MatrixStack (Matrix4);
		this .modelMatrix                   = new Matrix4 ();
		this .invLightSpaceMatrix           = new Matrix4 ();
		this .invLightSpaceProjectionMatrix = new Matrix4 ();
		this .shadowMatrix                  = new Matrix4 ();
		this .shadowMatrixArray             = new Float32Array (16);
		this .invGroupMatrix                = new Matrix4 ();
		this .rotation                      = new Rotation4 ();
		this .lightBBoxMin                  = new Vector3 (0, 0, 0);
		this .lightBBoxMax                  = new Vector3 (0, 0, 0);
		this .textureUnit                   = 0;
	}

	SpotLightContainer .prototype =
	{
		constructor: SpotLightContainer,
		getModelViewMatrix: function ()
		{
			return this .modelViewMatrix;
		},
	   set: function (browser, lightNode, groupNode, modelViewMatrix)
	   {
			var
				gl            = browser .getContext (),
				shadowMapSize = lightNode .getShadowMapSize ();

			this .browser   = browser;
			this .lightNode = lightNode;
			this .groupNode = groupNode;

			this .modelViewMatrix .pushMatrix (modelViewMatrix);

			// Get shadow buffer from browser.

			if (lightNode .getShadowIntensity () > 0 && shadowMapSize > 0)
			{
				this .shadowBuffer = browser .popShadowBuffer (shadowMapSize);

				if (this .shadowBuffer)
				{
					if (browser .getCombinedTextureUnits () .length)
					{
						this .textureUnit = browser .getCombinedTextureUnits () .pop ();

						gl .activeTexture (gl .TEXTURE0 + this .textureUnit);
						gl .bindTexture (gl .TEXTURE_2D, this .shadowBuffer .getDepthTexture ());
						gl .activeTexture (gl .TEXTURE0);
					}
					else
					{
						console .warn ("Not enough combined texture units for shadow map available.");
					}
				}
				else
				{
					console .warn ("Couldn't create shadow buffer.");
				}
			}
	   },
		renderShadowMap: function (renderObject)
		{
			try
			{
				if (! this .shadowBuffer)
					return;

				var
					lightNode            = this .lightNode,
					cameraSpaceMatrix    = renderObject .getCameraSpaceMatrix () .get (),
					modelMatrix          = this .modelMatrix .assign (this .modelViewMatrix .get ()) .multRight (cameraSpaceMatrix),
					invLightSpaceMatrix  = this .invLightSpaceMatrix  .assign (lightNode .getGlobal () ? modelMatrix : Matrix4 .Identity);

				invLightSpaceMatrix .translate (lightNode .getLocation ());
				invLightSpaceMatrix .rotate (this .rotation .setFromToVec (Vector3 .zAxis, this .direction .assign (lightNode .getDirection ()) .negate ()));
				invLightSpaceMatrix .inverse ();

				var
					groupBBox        = X3DGroupingNode .prototype .getBBox .call (this .groupNode, this .bbox), // Group bbox.
					lightBBox        = groupBBox .multRight (invLightSpaceMatrix),                              // Group bbox from the perspective of the light.
					shadowMapSize    = lightNode .getShadowMapSize (),
					lightBBoxExtents = lightBBox .getExtents (this .lightBBoxMin, this .lightBBoxMax),
					farValue         = Math .min (lightNode .getRadius (), -this .lightBBoxMin .z),
					viewport         = this .viewport .set (0, 0, shadowMapSize, shadowMapSize),
					projectionMatrix = Camera .perspective (lightNode .getCutOffAngle () * 2, 0.125, farValue, shadowMapSize, shadowMapSize, this .projectionMatrix),
					invGroupMatrix   = this .invGroupMatrix .assign (this .groupNode .getMatrix ()) .inverse ();

				this .renderShadow = farValue > 0;

				this .shadowBuffer .bind ();

				renderObject .getViewVolumes      () .push (this .viewVolume .set (projectionMatrix, viewport, viewport));
				renderObject .getProjectionMatrix () .pushMatrix (projectionMatrix);
				renderObject .getModelViewMatrix  () .pushMatrix (invLightSpaceMatrix);
				renderObject .getModelViewMatrix  () .multLeft (invGroupMatrix);

				renderObject .render (TraverseType .DEPTH, this .groupNode);

				renderObject .getModelViewMatrix  () .pop ();
				renderObject .getProjectionMatrix () .pop ();
				renderObject .getViewVolumes      () .pop ();

				this .shadowBuffer .unbind ();
	
				if (! lightNode .getGlobal ())
					invLightSpaceMatrix .multLeft (modelMatrix .inverse ());

				this .invLightSpaceProjectionMatrix .assign (invLightSpaceMatrix) .multRight (projectionMatrix) .multRight (lightNode .getBiasMatrix ());
			}
			catch (error)
			{
				// Catch error from matrix inverse.
				console .log (error);
			}
		},
		setGlobalVariables: function (renderObject)
		{
			var 
				lightNode       = this .lightNode,
				modelViewMatrix = this .modelViewMatrix .get ();

			modelViewMatrix .multVecMatrix (this .location  .assign (lightNode .location_  .getValue ()));
			modelViewMatrix .multDirMatrix (this .direction .assign (lightNode .direction_ .getValue ())) .normalize ();

			this .shadowMatrix .assign (renderObject .getCameraSpaceMatrix () .get ()) .multRight (this .invLightSpaceProjectionMatrix);
			this .shadowMatrixArray .set (this .shadowMatrix);
		},
		setShaderUniforms: function (gl, shaderObject)
		{
			var 
				lightNode       = this .lightNode,
				color           = lightNode .getColor (),
				attenuation     = lightNode .getAttenuation (),
				modelViewMatrix = this .modelViewMatrix .get (),
				location        = this .location,
				direction       = this .direction,
				shadowColor     = lightNode .getShadowColor (),
				i               = shaderObject .numLights ++;

			gl .uniform1i (shaderObject .x3d_LightType [i],             3);
			gl .uniform3f (shaderObject .x3d_LightColor [i],            color .r, color .g, color .b);
			gl .uniform1f (shaderObject .x3d_LightIntensity [i],        lightNode .getIntensity ());
			gl .uniform1f (shaderObject .x3d_LightAmbientIntensity [i], lightNode .getAmbientIntensity ());
			gl .uniform3f (shaderObject .x3d_LightAttenuation [i],      Math .max (0, attenuation .x), Math .max (0, attenuation .y), Math .max (0, attenuation .z));
			gl .uniform3f (shaderObject .x3d_LightLocation [i],         location .x, location .y, location .z);
			gl .uniform3f (shaderObject .x3d_LightDirection [i],        direction .x, direction .y, direction .z);
			gl .uniform1f (shaderObject .x3d_LightRadius [i],           lightNode .getRadius ());
			gl .uniform1f (shaderObject .x3d_LightBeamWidth [i],        lightNode .getBeamWidth ());
			gl .uniform1f (shaderObject .x3d_LightCutOffAngle [i],      lightNode .getCutOffAngle ());

			if (this .renderShadow && this .textureUnit)
			{
				this .shadowMatrixArray .set (this .shadowMatrix);

				gl .uniform1f        (shaderObject .x3d_ShadowIntensity [i],     lightNode .getShadowIntensity ());
				gl .uniform1f        (shaderObject .x3d_ShadowDiffusion [i],     lightNode .getShadowDiffusion ());
				gl .uniform3f        (shaderObject .x3d_ShadowColor [i],         shadowColor .r, shadowColor .g, shadowColor .b);
				gl .uniformMatrix4fv (shaderObject .x3d_ShadowMatrix [i], false, this .shadowMatrixArray);
				gl .uniform1i        (shaderObject .x3d_ShadowMap [i],           this .textureUnit);
			}
			else
				gl .uniform1f (shaderObject .x3d_ShadowIntensity [i], 0);
		},
		dispose: function ()
		{
			// Return shadowBuffer and textureUnit.

			if (this .textureUnit)
				this .browser .getCombinedTextureUnits () .push (this .textureUnit);

			this .browser .pushShadowBuffer (this .shadowBuffer);
			this .modelViewMatrix .clear ();

			this .browser      = null;
			this .lightNode    = null;
			this .groupNode    = null;
			this .shadowBuffer = null;
			this .textureUnit  = 0;

			// Return container

		   SpotLights .push (this);
		},
	};

	function SpotLight (executionContext)
	{
		X3DLightNode .call (this, executionContext);

		this .addType (X3DConstants .SpotLight);

		this .location_    .setUnit ("length");
		this .radius_      .setUnit ("length");
		this .beamWidth_   .setUnit ("angle");
		this .cutOffAngle_ .setUnit ("angle");
	}

	SpotLight .prototype = Object .assign (Object .create (X3DLightNode .prototype),
	{
		constructor: SpotLight,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "global",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "on",               new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "color",            new Fields .SFColor (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",        new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "ambientIntensity", new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "attenuation",      new Fields .SFVec3f (1, 0, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "location",         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",        new Fields .SFVec3f (0, 0, -1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "radius",           new Fields .SFFloat (100)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "beamWidth",        new Fields .SFFloat (0.785398)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "cutOffAngle",      new Fields .SFFloat (1.5708)),
																				   
			new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowColor",      new  Fields .SFColor ()),        // Color of shadow.
			new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowIntensity",  new  Fields .SFFloat ()),        // Intensity of shadow color in the range (0, 1).
			new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowDiffusion",  new  Fields .SFFloat ()),        // Diffusion of the shadow in length units in the range (0, inf).
			new X3DFieldDefinition (X3DConstants .initializeOnly, "shadowMapSize",    new  Fields .SFInt32 (1024)),    // Size of the shadow map in pixels in the range (0, inf).
		]),
		getTypeName: function ()
		{
			return "SpotLight";
		},
		getComponentName: function ()
		{
			return "Lighting";
		},
		getContainerField: function ()
		{
			return "children";
		},
		getAttenuation: function ()
		{
			return this .attenuation_ .getValue ();
		},
		getLocation: function ()
		{
			return this .location_ .getValue ();
		},
		getRadius: function ()
		{
			return Math .max (0, this .radius_ .getValue ());
		},
		getBeamWidth: function ()
		{
			// If the beamWidth is greater than the cutOffAngle, beamWidth is defined to be equal to the cutOffAngle.

			var
				beamWidth   = this .beamWidth_ .getValue (),
				cutOffAngle = this .getCutOffAngle ();

			if (beamWidth > cutOffAngle)
				return cutOffAngle;

			return Algorithm .clamp (beamWidth, 0, Math .PI / 2);
		},
		getCutOffAngle: function ()
		{
			return Algorithm .clamp (this .cutOffAngle_ .getValue (), 0, Math .PI / 2);
		},
		getLights: function ()
		{
			return SpotLights;
		},
	});

	return SpotLight;
});


