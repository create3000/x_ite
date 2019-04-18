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
	"standard/Math/Numbers/Matrix3",
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
          Matrix3,
          Matrix4,
          MatrixStack,
          Algorithm,
          ObjectCache)
{
"use strict";

	// Shadow map layout
	// Compact layout:
	//
	// xzXZ		Char: Axis
	// yyYY		Case: Sign

	var orientationMatrices = [
		new Matrix4 () .setRotation (new Rotation4 (new Vector3 ( 1,  0,  0), Vector3 .zAxis)), // left
		new Matrix4 () .setRotation (new Rotation4 (new Vector3 (-1,  0,  0), Vector3 .zAxis)), // right
		new Matrix4 () .setRotation (new Rotation4 (new Vector3 ( 0,  0, -1), Vector3 .zAxis)), // front
		new Matrix4 () .setRotation (new Rotation4 (new Vector3 ( 0,  0,  1), Vector3 .zAxis)), // back
		new Matrix4 () .setRotation (new Rotation4 (new Vector3 ( 0,  1,  0), Vector3 .zAxis)), // bottom
		new Matrix4 () .setRotation (new Rotation4 (new Vector3 ( 0, -1,  0), Vector3 .zAxis)), // top
	];

	var viewports = [
		new Vector4 (0,    0.5, 0.25, 0.5), // left
		new Vector4 (0.5,  0.5, 0.25, 0.5), // right
		new Vector4 (0.75, 0.5, 0.25, 0.5), // front
		new Vector4 (0.25, 0.5, 0.25, 0.5), // back
		new Vector4 (0.0,  0,   0.5,  0.5), // bottom
		new Vector4 (0.5,  0,   0.5,  0.5), // top   
	];

	var PointLights = ObjectCache (PointLightContainer);
	
	function PointLightContainer ()
	{
		this .location                      = new Vector3 (0, 0, 0);
		this .matrixArray                   = new Float32Array (9);
		this .shadowBuffer                  = null;
		this .viewVolume                    = new ViewVolume ();
		this .viewport                      = new Vector4 (0, 0, 0, 0);
		this .projectionMatrix              = new Matrix4 ();
		this .modelViewMatrix               = new MatrixStack (Matrix4);
		this .modelMatrix                   = new Matrix4 ();
		this .invLightSpaceMatrix           = new Matrix4 ();
		this .invLightSpaceProjectionMatrix = new Matrix4 ();
		this .shadowMatrix                  = new Matrix4 ();
		this .shadowMatrixArray             = new Float32Array (16);
		this .rotation                      = new Rotation4 ();
		this .rotationMatrix                = new Matrix4 ();
		this .textureUnit                   = 0;
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

			try
			{
				this .matrixArray .set (modelViewMatrix .submatrix .inverse ());
			}
			catch (error)
			{
				this .matrixArray .set (Matrix3 .Identity);
			}

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

						if (gl .getVersion () >= 2 || browser .getExtension ("WEBGL_depth_texture"))
							gl .bindTexture (gl .TEXTURE_2D, this .shadowBuffer .getDepthTexture ());
						else
							gl .bindTexture (gl .TEXTURE_2D, this .shadowBuffer .getColorTexture ());

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
					lightNode           = this .lightNode,
					cameraSpaceMatrix   = renderObject .getCameraSpaceMatrix () .get (),
					modelMatrix         = this .modelMatrix .assign (this .modelViewMatrix .get ()) .multRight (cameraSpaceMatrix),
					invLightSpaceMatrix = this .invLightSpaceMatrix .assign (lightNode .getGlobal () ? modelMatrix : Matrix4 .Identity);

				invLightSpaceMatrix .translate (lightNode .getLocation ());
				invLightSpaceMatrix .inverse ();

				var shadowMapSize  = lightNode .getShadowMapSize ();

				this .shadowBuffer .bind ();

				for (var i = 0; i < 6; ++ i)
				{
					var
						v                = viewports [i],
						viewport         = this .viewport .set (v [0] * shadowMapSize, v [1] * shadowMapSize, v [2] * shadowMapSize, v [3] * shadowMapSize),
						projectionMatrix = Camera .perspective2 (Algorithm .radians (90), 0.125, 10000, viewport [2], viewport [3], this .projectionMatrix); // Use higher far value for better precision.

					renderObject .getViewVolumes      () .push (this .viewVolume .set (projectionMatrix, viewport, viewport));
					renderObject .getProjectionMatrix () .pushMatrix (this .projectionMatrix);
					renderObject .getModelViewMatrix  () .pushMatrix (orientationMatrices [i]);
					renderObject .getModelViewMatrix  () .multLeft (invLightSpaceMatrix);
	
					renderObject .render (TraverseType .DEPTH, X3DGroupingNode .prototype .traverse, this .groupNode);
	
					renderObject .getModelViewMatrix  () .pop ();
					renderObject .getProjectionMatrix () .pop ();
					renderObject .getViewVolumes () .pop ();
				}

				this .shadowBuffer .unbind ();
	
				if (! lightNode .getGlobal ())
					invLightSpaceMatrix .multLeft (modelMatrix .inverse ());

				this .invLightSpaceProjectionMatrix .assign (invLightSpaceMatrix);
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

			this .shadowMatrix .assign (renderObject .getCameraSpaceMatrix () .get ()) .multRight (this .invLightSpaceProjectionMatrix);
			this .shadowMatrixArray .set (this .shadowMatrix);
		},
		setShaderUniforms: function (gl, shaderObject)
		{
			var i = shaderObject .numLights ++;

			if (shaderObject .hasLight (i, this))
				return;

			var 
				lightNode   = this .lightNode,
				color       = lightNode .getColor (),
				attenuation = lightNode .getAttenuation (),
				location    = this .location;

			gl .uniform1i        (shaderObject .x3d_LightType [i],             2);
			gl .uniform3f        (shaderObject .x3d_LightColor [i],            color .r, color .g, color .b);
			gl .uniform1f        (shaderObject .x3d_LightIntensity [i],        lightNode .getIntensity ());
			gl .uniform1f        (shaderObject .x3d_LightAmbientIntensity [i], lightNode .getAmbientIntensity ());
			gl .uniform3f        (shaderObject .x3d_LightAttenuation [i],      Math .max (0, attenuation .x), Math .max (0, attenuation .y), Math .max (0, attenuation .z));
			gl .uniform3f        (shaderObject .x3d_LightLocation [i],         location .x, location .y, location .z);
			gl .uniform1f        (shaderObject .x3d_LightRadius [i],           lightNode .getRadius ());
			gl .uniformMatrix3fv (shaderObject .x3d_LightMatrix [i], false,    this .matrixArray);

			if (this .textureUnit)
			{
				var shadowColor = lightNode .getShadowColor ();

				gl .uniform3f        (shaderObject .x3d_ShadowColor [i],         shadowColor .r, shadowColor .g, shadowColor .b);
				gl .uniform1f        (shaderObject .x3d_ShadowIntensity [i],     lightNode .getShadowIntensity ());
				gl .uniform1f        (shaderObject .x3d_ShadowBias [i],          lightNode .getShadowBias ());
				gl .uniformMatrix4fv (shaderObject .x3d_ShadowMatrix [i], false, this .shadowMatrixArray);
				gl .uniform1i        (shaderObject .x3d_ShadowMapSize [i],       lightNode .getShadowMapSize ());
				gl .uniform1i        (shaderObject .x3d_ShadowMap [i],           this .textureUnit);
			}
			else
			{
				// Must be set to zero in case of multiple lights.
				gl .uniform1f (shaderObject .x3d_ShadowIntensity [i], 0);			
			}
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
		getLights: function ()
		{
			return PointLights;
		},
	});

	return PointLight;
});


