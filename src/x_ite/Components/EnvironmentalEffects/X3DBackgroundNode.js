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
	"x_ite/Components/Core/X3DBindableNode",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/ViewVolume",
	"standard/Math/Numbers/Complex",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Algorithm",
],
function (X3DBindableNode,
          TraverseType,
          X3DConstants,
          ViewVolume,
          Complex,
          Vector3,
          Rotation4,
          Matrix4,
          Algorithm)
{
"use strict";
	var
		RADIUS      = 1,
		SIZE        = Math .sqrt (RADIUS * RADIUS / 2),
		U_DIMENSION = 20;

	var s = SIZE;

	var texCoords = [
		1, 1, 0, 1,
		0, 1, 0, 1,
		0, 0, 0, 1,
		1, 1, 0, 1,
		0, 0, 0, 1,
		1, 0, 0, 1,
	];

	var frontVertices = [
		 s,  s, -s, 1,
		-s,  s, -s, 1,
		-s, -s, -s, 1,
		 s,  s, -s, 1,
		-s, -s, -s, 1,
		 s, -s, -s, 1,
	];

	var backVertices = [
		-s,  s,  s, 1,
		 s,  s,  s, 1,
		 s, -s,  s, 1,
		-s,  s,  s, 1,
		 s, -s,  s, 1,
		-s, -s,  s, 1,
	];

	var leftVertices = [
		-s,  s, -s, 1,
		-s,  s,  s, 1,
		-s, -s,  s, 1,
		-s,  s, -s, 1,
		-s, -s,  s, 1,
		-s, -s, -s, 1,
	];

	var rightVertices = [
		s,  s,  s, 1,
		s,  s, -s, 1,
		s, -s, -s, 1,
		s,  s,  s, 1,
		s, -s, -s, 1,
		s, -s,  s, 1,
	];

	var topVertices = [
		 s, s,  s, 1,
		-s, s,  s, 1,
		-s, s, -s, 1,
		 s, s,  s, 1,
		-s, s, -s, 1,
		 s, s, -s, 1,
	];

	var bottomVertices = [
		 s, -s, -s, 1,
		-s, -s, -s, 1,
		-s, -s,  s, 1,
		 s, -s, -s, 1,
		-s, -s,  s, 1,
		 s, -s,  s, 1,
	];

	var
		z1 = new Complex (0, 0),
		z2 = new Complex (0, 0),
		y1 = new Complex (0, 0),
		y2 = new Complex (0, 0),
		y3 = new Complex (0, 0),
		y4 = new Complex (0, 0);

	var
		farVector         = new Vector3 (0, 0, 0),
		projectionMatrix  = new Matrix4 ();

	function X3DBackgroundNode (executionContext)
	{
		X3DBindableNode .call (this, executionContext);

		this .addType (X3DConstants .X3DBackgroundNode);

		this .skyAngle_    .setUnit ("angle");
		this .groundAngle_ .setUnit ("angle");

		this .hidden                = false;
		this .projectionMatrixArray = new Float32Array (16);
		this .modelMatrix           = new Matrix4 ();
		this .modelViewMatrixArray  = new Float32Array (16);
		this .shaderObjects         = [ ];
		this .colors                = [ ];
		this .sphere                = [ ];
		this .textures              = 0;
	}

	X3DBackgroundNode .prototype = Object .assign (Object .create (X3DBindableNode .prototype),
	{
		constructor: X3DBackgroundNode,
		modelViewMatrix: new Matrix4 (),
		rotation: new Rotation4 (),
		scale: new Vector3 (0, 0, 0),
		textureMatrixArray: new Float32Array (new Matrix4 ()),
		rectangleCount: 6,
		initialize: function ()
		{
			X3DBindableNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			this .colorBuffer     = gl .createBuffer ();
			this .sphereBuffer    = gl .createBuffer ();
			this .texCoordBuffer  = gl .createBuffer ();
			this .cubeBuffer      = gl .createBuffer ();
			this .texCoordBuffers = [ gl .createBuffer () ];
			this .frontBuffer     = gl .createBuffer ();
			this .backBuffer      = gl .createBuffer ();
			this .leftBuffer      = gl .createBuffer ();
			this .rightBuffer     = gl .createBuffer ();
			this .topBuffer       = gl .createBuffer ();
			this .bottomBuffer    = gl .createBuffer ();

			this .groundAngle_  .addInterest ("build", this);
			this .groundColor_  .addInterest ("build", this);
			this .skyAngle_     .addInterest ("build", this);
			this .skyColor_     .addInterest ("build", this);
			this .transparency_ .addInterest ("build", this);

			this .build ();
			this .transferRectangle ();
		},
		set_frontTexture__: function (value)
		{
			this .setTexture ("frontTexture", value, 0);
		},
		set_backTexture__: function (value)
		{
			this .setTexture ("backTexture", value, 1);
		},
		set_leftTexture__: function (value)
		{
			this .setTexture ("leftTexture", value, 2);
		},
		set_rightTexture__: function (value)
		{
			this .setTexture ("rightTexture", value, 3);
		},
		set_topTexture__: function (value)
		{
			this .setTexture ("topTexture", value, 4);
		},
		set_bottomTexture__: function (value)
		{
			this .setTexture ("bottomTexture", value, 5);
		},
		setTexture: function (key, texture, bit)
		{
			if (this [key])
				this [key] .loadState_ .removeInterest ("setTextureBit", this);

			this [key] = texture;

			if (texture)
			{
				texture .loadState_ .addInterest ("setTextureBit", this, bit);
				this .setTextureBit (texture .loadState_, bit);
			}
			else
				this .textures &= ~(1 << bit);
		},
		setTextureBit: function (loadState, bit)
		{
			if (loadState .getValue () === X3DConstants .COMPLETE_STATE)
				this .textures |= 1 << bit;
			else
				this .textures &= ~(1 << bit);
		},
		bindToLayer: function (layer)
		{
			layer .getBackgroundStack () .push (this);
		},
		unbindFromLayer: function (layer)
		{
			layer .getBackgroundStack () .pop (this);
		},
		removeFromLayer: function (layer)
		{
			layer .getBackgroundStack () .remove (this);
		},
		setHidden: function (value)
		{
			this .hidden = value;

			this .getBrowser () .addBrowserEvent ();
		},
		getHidden: function ()
		{
			return this .hidden;
		},
		isTransparent: function ()
		{
			if (this .hidden)
				return true;

			if (this .transparency_ .getValue () === 0)
				return false;

			if (! this .frontTexture  || this .frontTexture  .transparent_ .getValue ())
					return true;

			if (! this .backTexture   || this .backTexture   .transparent_ .getValue ())
					return true;

			if (! this .leftTexture   || this .leftTexture   .transparent_ .getValue ())
					return true;

			if (! this .rightTexture  || this .rightTexture  .transparent_ .getValue ())
					return true;

			if (! this .topTexture    || this .topTexture    .transparent_ .getValue ())
					return true;

			if (! this .bottomTexture || this .bottomTexture .transparent_ .getValue ())
					return true;

			return false;
		},
		getColor: function (theta, color, angle)
		{
			var index = Algorithm .upperBound (angle, 0, angle .length, theta, Algorithm .less);

			return color [index];
		},
		build: function ()
		{
			this .colors .length = 0;
			this .sphere .length = 0;

			if (this .transparency_ .getValue () >= 1)
				return;

			var alpha = 1 - Algorithm .clamp (this .transparency_ .getValue (), 0, 1);

			if (this .groundColor_ .length === 0 && this .skyColor_ .length == 1)
			{
				var s = SIZE;

				// Build cube

				this .sphere .vertices = 36;

				this .sphere .push ( s,  s, -s, 1, -s,  s, -s, 1, -s, -s, -s, 1, // Back
				                     s,  s, -s, 1, -s, -s, -s, 1,  s, -s, -s, 1,
				                    -s,  s,  s, 1,  s,  s,  s, 1, -s, -s,  s, 1, // Front
				                    -s, -s,  s, 1,  s,  s,  s, 1,  s, -s,  s, 1,
				                    -s,  s, -s, 1, -s,  s,  s, 1, -s, -s,  s, 1, // Left	
				                    -s,  s, -s, 1, -s, -s,  s, 1, -s, -s, -s, 1,
				                    	s,  s,  s, 1,  s,  s, -s, 1,  s, -s,  s, 1, // Right		
				                     s, -s,  s, 1,  s,  s, -s, 1,  s, -s, -s, 1,
				                    	s,  s,  s, 1, -s,  s,  s, 1, -s,  s, -s, 1, // Top		
				                     s,  s,  s, 1, -s,  s, -s, 1,  s,  s, -s, 1,
				                    -s, -s,  s, 1,  s, -s,  s, 1, -s, -s, -s, 1, // Bottom	
				                    -s, -s, -s, 1,  s, -s,  s, 1,  s, -s, -s, 1);

				var c = this .skyColor_ [0];

				for (var i = 0, vertices = this .sphere .vertices; i < vertices; ++ i)
					this .colors .push (c .r, c .g, c .b, alpha);
			}
			else
			{
				// Build sphere

				if (this .skyColor_ .length > this .skyAngle_ .length)
				{
					var vAngle = [ ];
					
					for (var i = 0, length = this .skyAngle_ .length; i < length; ++ i)
						vAngle .push (this .skyAngle_ [i]);

					if (vAngle .length === 0 || vAngle [0] > 0)
						vAngle .unshift (0);

					var vAngleMax = this .groundColor_ .length > this .groundAngle_ .length ? Math .PI / 2 : Math .PI;

					if (vAngle [vAngle .length - 1] < vAngleMax)
						vAngle .push (vAngleMax);

					this .buildSphere (RADIUS, vAngle, this .skyAngle_, this .skyColor_, alpha, false);
				}

				if (this .groundColor_ .length > this .groundAngle_ .length)
				{
					var vAngle = [ ];
					
					for (var i = 0, length = this .groundAngle_ .length; i < length; ++ i)
						vAngle .push (this .groundAngle_ [i]);

					vAngle .reverse ();

					if (vAngle .length === 0 || vAngle [0] < Math .PI / 2)
						vAngle .unshift (Math .PI / 2);

					if (vAngle [vAngle .length - 1] > 0)
						vAngle .push (0);

					this .buildSphere (RADIUS, vAngle, this .groundAngle_, this .groundColor_, alpha, true);
				}
			}

			this .transferSphere ();
		},
		buildSphere: function (radius, vAngle, angle, color, alpha, bottom)
		{
			var
				phi         = 0,
				vAngleMax   = bottom ? Math .PI / 2 : Math .PI,
				V_DIMENSION = vAngle .length - 1;
			
			for (var v = 0; v < V_DIMENSION; ++ v)
			{
				var
					theta1 = Algorithm .clamp (vAngle [v],     0, vAngleMax),
					theta2 = Algorithm .clamp (vAngle [v + 1], 0, vAngleMax);

				if (bottom)
				{
					theta1 = Math .PI - theta1;
					theta2 = Math .PI - theta2;
				}

				z1 .setPolar (radius, theta1);
				z2 .setPolar (radius, theta2);
				
				var
					c1 = this .getColor (vAngle [v],     color, angle),
					c2 = this .getColor (vAngle [v + 1], color, angle);
				
				for (var u = 0; u < U_DIMENSION; ++ u)
				{
					// p4 --- p1
					//  |   / |
					//  | /   |
					// p3 --- p2

					// The last point is the first one.
					var u1 = u < U_DIMENSION - 1 ? u + 1 : 0;
			
					// p1, p2
					phi = 2 * Math .PI * (u / U_DIMENSION);
					y1  .setPolar (-z1 .imag, phi);
					y2  .setPolar (-z2 .imag, phi);

					// p3, p4
					phi = 2 * Math .PI * (u1 / U_DIMENSION);
					y3  .setPolar (-z2 .imag, phi);
					y4  .setPolar (-z1 .imag, phi);
					
					// Triangle 1 and 2

					this .colors .push (c1 .r, c1 .g, c1 .b, alpha,
					                    c2 .r, c2 .g, c2 .b, alpha,
					                    c2 .r, c2 .g, c2 .b, alpha,
					                    // Triangle 2
					                    c1 .r, c1 .g, c1 .b, alpha,
					                    c1 .r, c1 .g, c1 .b, alpha,
					                    c2 .r, c2 .g, c2 .b, alpha);

					this .sphere .push (y1 .imag, z1 .real, y1 .real, 1,
					                    y3 .imag, z2 .real, y3 .real, 1,
					                    y2 .imag, z2 .real, y2 .real, 1,
					                    // Triangle 2
					                    y1 .imag, z1 .real, y1 .real, 1,
					                    y4 .imag, z1 .real, y4 .real, 1,
					                    y3 .imag, z2 .real, y3 .real, 1);	
				}
			}
		},
		transferSphere: function ()
		{
			var gl = this .getBrowser () .getContext ();

			// Transfer colors.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (this .colors), gl .STATIC_DRAW);

			// Transfer sphere.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .sphereBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (this .sphere), gl .STATIC_DRAW);
			this .sphereCount = this .sphere .length / 4;
		},
		transferRectangle: function ()
		{
			var gl = this .getBrowser () .getContext ();

			// Transfer texCoords.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [0]);
			gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (texCoords), gl .STATIC_DRAW);

			// Transfer rectangle.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .frontBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (frontVertices), gl .STATIC_DRAW);

			gl .bindBuffer (gl .ARRAY_BUFFER, this .backBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (backVertices), gl .STATIC_DRAW);

			gl .bindBuffer (gl .ARRAY_BUFFER, this .leftBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (leftVertices), gl .STATIC_DRAW);

			gl .bindBuffer (gl .ARRAY_BUFFER, this .rightBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (rightVertices), gl .STATIC_DRAW);

			gl .bindBuffer (gl .ARRAY_BUFFER, this .topBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (topVertices), gl .STATIC_DRAW);

			gl .bindBuffer (gl .ARRAY_BUFFER, this .bottomBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (bottomVertices), gl .STATIC_DRAW);
		},
		traverse: function (type, renderObject)
		{
			switch (type)
			{
				case TraverseType .CAMERA:
				{
					renderObject .getLayer () .getBackgrounds () .push (this);

					this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());
					break;
				}
				case TraverseType .DISPLAY:
				{
					var
						sourceObjects = renderObject .getShaderObjects (),
						destObjects   = this .shaderObjects;

					for (var i = 0, length = sourceObjects .length; i < length; ++ i)
						destObjects [i] = sourceObjects [i];

					destObjects .length = sourceObjects .length;
					break;
				}
			}
		},
		display: function (gl, renderObject, viewport)
		{
			try
			{
				if (this .hidden)
					return;

				// Setup context.
	
				gl .disable (gl .DEPTH_TEST);
				gl .depthMask (false);
				gl .enable (gl .CULL_FACE);
				gl .frontFace (gl .CCW);

				// Get background scale.

				var
					farValue        = -ViewVolume .unProjectPointMatrix (0, 0, 1, projectionMatrix .assign (renderObject .getProjectionMatrix () .get ()) .inverse (), viewport, farVector) .z * 0.8,
					rotation        = this .rotation,
					modelViewMatrix = this .modelViewMatrix .assign (this .modelMatrix);

				// Get projection matrix.

				this .projectionMatrixArray .set (renderObject .getProjectionMatrix () .get ());	

				// Rotate and scale background.

				modelViewMatrix .multRight (renderObject .getInverseCameraSpaceMatrix () .get ());
				modelViewMatrix .get (null, rotation);
				modelViewMatrix .identity ();
				modelViewMatrix .rotate (rotation);
				modelViewMatrix .scale (this .scale .set (farValue, farValue, farValue));

				this .modelViewMatrixArray .set (modelViewMatrix);

				// Draw background sphere and texture cube.

				this .drawSphere (renderObject);

				if (this .textures)
					this .drawCube (renderObject);
			}
			catch (error)
			{ }
		},
		drawSphere: function (renderObject)
		{
			var transparency = this .transparency_ .getValue ();
		
			if (transparency >= 1)
				return;
	
			var
				browser    = renderObject .getBrowser (),
				gl         = browser .getContext (),
				shaderNode = browser .getBackgroundSphereShader ();

			shaderNode .enable (gl);

			// Clip planes

			shaderNode .setShaderObjects (gl, this .shaderObjects);

			// Enable vertex attribute arrays.

			shaderNode .enableColorAttribute  (gl, this .colorBuffer);
			shaderNode .enableVertexAttribute (gl, this .sphereBuffer);

			// Uniforms

			gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, this .projectionMatrixArray);
			gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, this .modelViewMatrixArray);

			// Setup context.
	
			if (transparency)
				gl .enable (gl .BLEND);
			else
				gl .disable (gl .BLEND);

			// Draw.

			gl .drawArrays (gl .TRIANGLES, 0, this .sphereCount);

			// Disable vertex attribute arrays.

			shaderNode .disableColorAttribute (gl);
			shaderNode .disable (gl);
		},
		drawCube: function (renderObject)
		{
			var
				browser    = renderObject .getBrowser (),
				gl         = browser .getContext (),
				shaderNode = browser .getGouraudShader ();

			shaderNode .enable (gl);

			// Clip planes

			shaderNode .setShaderObjects (gl, this .shaderObjects);

			// Enable vertex attribute arrays.

			shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers);

			// Uniforms

			gl .uniform1i (shaderNode .x3d_FogType,       0);
			gl .uniform1i (shaderNode .x3d_ColorMaterial, false);
			gl .uniform1i (shaderNode .x3d_Lighting,      false);

			gl .uniformMatrix4fv (shaderNode .x3d_TextureMatrix,    false, this .textureMatrixArray);
			gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, this .projectionMatrixArray);
			gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, this .modelViewMatrixArray);

			// Draw.

			this .drawRectangle (gl, shaderNode, this .frontTexture,  this .frontBuffer);
			this .drawRectangle (gl, shaderNode, this .backTexture,   this .backBuffer);
			this .drawRectangle (gl, shaderNode, this .leftTexture,   this .leftBuffer);
			this .drawRectangle (gl, shaderNode, this .rightTexture,  this .rightBuffer);
			this .drawRectangle (gl, shaderNode, this .topTexture,    this .topBuffer);
			this .drawRectangle (gl, shaderNode, this .bottomTexture, this .bottomBuffer);

			// Disable vertex attribute arrays.

			shaderNode .disableTexCoordAttribute (gl);
			shaderNode .disable (gl);
		},
		drawRectangle: function (gl, shaderNode, texture, buffer)
		{
			if (texture && texture .checkLoadState () === X3DConstants .COMPLETE_STATE)
			{
				texture .setShaderUniforms (gl, shaderNode, 0);

				if (texture .transparent_ .getValue ())
					gl .enable (gl .BLEND);
				else
					gl .disable (gl .BLEND);

				shaderNode .enableVertexAttribute (gl, buffer);

				// Draw.

				gl .drawArrays (gl .TRIANGLES, 0, this .rectangleCount);
			}
		},
	});

	return X3DBackgroundNode;
});


