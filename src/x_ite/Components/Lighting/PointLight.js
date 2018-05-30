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

	var biasMatrix = new Matrix4 (1.0 / 6.0, 0.0,  0.0, 0.0,
	                              0.0,  0.25, 0.0, 0.0,
	                              0.0,  0.0,  0.5, 0.0,
	                              1.0 / 6.0, 0.25, 0.5, 1.0);

	// Negated directions
	var directions = [
		new Vector3 ( 1,  0,  0), // left
		new Vector3 (-1,  0,  0), // right
		new Vector3 ( 0,  0,  1), // back
		new Vector3 ( 0,  0, -1), // front
		new Vector3 ( 0,  1,  0), // bottom
		new Vector3 ( 0, -1,  0), // top
	];

	var PointLights = ObjectCache (PointLightContainer);
	
	function PointLightContainer ()
	{
		var
			nearValue        = 0.125,
			farValue         = 1000,
			projectionMatrix = Camera .perspective (Algorithm .radians (120), nearValue, farValue, 1, 1, new Matrix4 ());

		this .location             = new Vector3 (0, 0, 0);
		this .direction            = new Vector3 (0, 0, 0);
		this .shadowBuffer         = null;
		this .viewVolume           = new ViewVolume ();
		this .viewport             = new Vector4 (0, 0, 0, 0);
		this .projectionMatrix     = projectionMatrix;
		this .modelViewMatrix      = new MatrixStack (Matrix4);
		this .modelMatrix          = new Matrix4 ();
		this .invLightSpaceMatrix  = new Matrix4 ();
		this .shadowMatrix         = new Matrix4 ();
		this .shadowMatrixArray    = new Float32Array (16);
		this .invGroupMatrix       = new Matrix4 ();
		this .rotation             = new Rotation4 ();
		this .rotationMatrix       = new Matrix4 ();
		this .textureUnit          = 0;
	}

	PointLightContainer .prototype =
	{
		constructor: PointLightContainer,
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
				invLightSpaceMatrix .inverse ();

				var
					shadowMapSize1_2 = lightNode .getShadowMapSize () / 2,
					shadowMapSize1_3 = lightNode .getShadowMapSize () / 3,
					projectionMatrix = this .projectionMatrix,
					invGroupMatrix   = this .invGroupMatrix .assign (this .groupNode .getMatrix ()) .inverse ();

				this .shadowBuffer .bind ();
				renderObject .getProjectionMatrix () .pushMatrix (this .projectionMatrix);

				for (var y = 0; y < 2; ++ y)
				{
					for (var x = 0; x < 3; ++ x)
					{
						var
							rotation = this .rotation .setFromToVec (this .direction .assign (directions [y * 3 + x]), Vector3 .zAxis), // inversed rotation
							viewport = this .viewport .set (x * shadowMapSize1_3, y * shadowMapSize1_2, shadowMapSize1_3, shadowMapSize1_2);
		
						renderObject .getViewVolumes () .push (this .viewVolume .set (projectionMatrix, viewport, viewport));

						renderObject .getModelViewMatrix  () .pushMatrix (this .rotationMatrix .setRotation (rotation));
						renderObject .getModelViewMatrix  () .multLeft (invLightSpaceMatrix);
						renderObject .getModelViewMatrix  () .multLeft (invGroupMatrix);
		
						renderObject .render (TraverseType .DEPTH, this .groupNode);
		
						renderObject .getModelViewMatrix  () .pop ();
						renderObject .getViewVolumes () .pop ();

						//console .log (y * 3 + x, this .rotationMatrix .multRight (this .projectionMatrix) .multRight (biasMatrix) .toString ());
					}
				}

				renderObject .getProjectionMatrix () .pop ();
				this .shadowBuffer .unbind ();
	
				if (! lightNode .getGlobal ())
					invLightSpaceMatrix .multLeft (modelMatrix .inverse ());
			}
			catch (error)
			{
				// Catch error from matrix inverse.
				console .log (error);
			}
		},
		setGlobalVariables: function (renderObject)
		{
			this .modelViewMatrix .get () .multVecMatrix (this .location .assign (this .lightNode .location_ .getValue ()));

			this .shadowMatrix .assign (renderObject .getCameraSpaceMatrix () .get ()) .multRight (this .invLightSpaceMatrix);
			this .shadowMatrixArray .set (this .shadowMatrix);
		},
		setShaderUniforms: function (gl, shaderObject)
		{
			// For correct results the radius must be transform by the modelViewMatrix. This can only be done in the shader.
			// distanceOfLightToFragmentInLightSpace = |(FragmentPosition - LightPosition) * inverseModelViewMatrixOfLight|
			// distanceOfLightToFragmentInLightSpace can then be compared with radius.

			var 
				lightNode   = this .lightNode,
				color       = lightNode .getColor (),
				attenuation = lightNode .getAttenuation (),
				location    = this .location,
				shadowColor = lightNode .getShadowColor (),
				i           = shaderObject .numLights ++;

			gl .uniform1i (shaderObject .x3d_LightType [i],             2);
			gl .uniform3f (shaderObject .x3d_LightColor [i],            color .r, color .g, color .b);
			gl .uniform1f (shaderObject .x3d_LightIntensity [i],        lightNode .getIntensity ());
			gl .uniform1f (shaderObject .x3d_LightAmbientIntensity [i], lightNode .getAmbientIntensity ());
			gl .uniform3f (shaderObject .x3d_LightAttenuation [i],      Math .max (0, attenuation .x), Math .max (0, attenuation .y), Math .max (0, attenuation .z));
			gl .uniform3f (shaderObject .x3d_LightLocation [i],         location .x, location .y, location .z);
			gl .uniform1f (shaderObject .x3d_LightRadius [i],           lightNode .getRadius ());

			if (this .textureUnit)
			{
				gl .uniform1f        (shaderObject .x3d_ShadowIntensity [i],     lightNode .getShadowIntensity ());
				gl .uniform3f        (shaderObject .x3d_ShadowColor [i],         shadowColor .r, shadowColor .g, shadowColor .b);
				gl .uniform1f        (shaderObject .x3d_ShadowBias [i],          lightNode .getShadowBias ());
				gl .uniformMatrix4fv (shaderObject .x3d_ShadowMatrix [i], false, this .shadowMatrixArray);
				gl .uniform1i        (shaderObject .x3d_ShadowMapSize [i],       lightNode .getShadowMapSize ());
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

		   PointLights .push (this);
		},
	};

	function PointLight (executionContext)
	{
		X3DLightNode .call (this, executionContext);

		this .addType (X3DConstants .PointLight);

		this .location_ .setUnit ("length");
		this .radius_   .setUnit ("length");
	}

	PointLight .prototype = Object .assign (Object .create (X3DLightNode .prototype),
	{
		constructor: PointLight,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "global",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "on",               new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "color",            new Fields .SFColor (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",        new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "ambientIntensity", new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "attenuation",      new Fields .SFVec3f (1, 0, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "location",         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "radius",           new Fields .SFFloat (100)),
																				   
			new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowColor",     new  Fields .SFColor ()),        // Color of shadow.
			new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowIntensity", new  Fields .SFFloat ()),        // Intensity of shadow color in the range (0, 1).
			new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowBias",      new  Fields .SFFloat (0.005)),   // Bias of the shadow.
			new X3DFieldDefinition (X3DConstants .initializeOnly, "shadowMapSize",   new  Fields .SFInt32 (1024)),    // Size of the shadow map in pixels in the range (0, inf).
		]),
		getTypeName: function ()
		{
			return "PointLight";
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
		getBiasMatrix: function ()
		{
			return biasMatrix;
		},
		getLights: function ()
		{
			return PointLights;
		},
	});

	return PointLight;
});


