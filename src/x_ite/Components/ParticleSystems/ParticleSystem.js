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
	"x_ite/Components/Shape/X3DShapeNode",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"x_ite/Browser/Shape/AlphaMode",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Vector4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Numbers/Matrix3",
	"standard/Math/Algorithms/QuickSort",
	"standard/Math/Algorithm",
	"standard/Math/Utility/BVH",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DShapeNode,
          TraverseType,
          X3DConstants,
          X3DCast,
			 AlphaMode,
          Vector3,
          Vector4,
          Matrix4,
          Matrix3,
          QuickSort,
          Algorithm,
          BVH)
{
"use strict";

	var i = 0;

	const
		POINT    = i ++,
		LINE     = i ++,
		TRIANGLE = i ++,
		QUAD     = i ++,
		GEOMETRY = i ++,
		SPRITE   = i ++;

	const GeometryTypes = {
		POINT:    POINT,
		LINE:     LINE,
		TRIANGLE: TRIANGLE,
		QUAD:     QUAD,
		GEOMETRY: GEOMETRY,
		SPRITE:   SPRITE,
	};

	const
		invModelViewMatrix = new Matrix4 (),
		billboardToScreen  = new Vector3 (0, 0, 0),
		viewerYAxis        = new Vector3 (0, 0, 0),
		vector             = new Vector3 (0, 0, 0),
		normal             = new Vector3 (0, 0, 0),
		s1                 = new Vector3 (0, 0, 0),
		s2                 = new Vector3 (0, 0, 0),
		s3                 = new Vector3 (0, 0, 0),
		s4                 = new Vector3 (0, 0, 0),
		x                  = new Vector3 (0, 0, 0),
		y                  = new Vector3 (0, 0, 0);

	function compareDistance (lhs, rhs) { return lhs .distance < rhs .distance; }

	function ParticleSystem (executionContext)
	{
		X3DShapeNode .call (this, executionContext);

		this .addType (X3DConstants .ParticleSystem);

		this .particleSize_ .setUnit ("length");

		this .createParticles          = true;
		this .particles                = [ ];
		this .velocities               = [ ];
		this .speeds                   = [ ];
		this .turbulences              = [ ];
		this .geometryType             = POINT;
		this .maxParticles             = 0;
		this .numParticles             = 0;
		this .particleLifetime         = 0;
		this .lifetimeVariation        = 0;
		this .emitterNode              = null;
		this .forcePhysicsModelNodes   = [ ];
		this .boundedPhysicsModelNodes = [ ];
		this .boundedNormals           = [ ];
		this .boundedVertices          = [ ];
		this .boundedVolume            = null;
		this .creationTime             = 0;
		this .pauseTime                = 0;
		this .deltaTime                = 0;
		this .numForces                = 0;
		this .colorKeys                = [ ];
		this .colorRamppNode           = null;
		this .colorRamp                = [ ];
		this .texCoordKeys             = [ ];
		this .texCoordRampNode         = null;
		this .texCoordRamp             = [ ];
		this .texCoordAnim             = false;
		this .vertexCount              = 0;
		this .shaderNode               = null;
		this .rotation                 = new Matrix3 ();
		this .particleSorter           = new QuickSort (this .particles, compareDistance);
		this .sortParticles            = false;
		this .geometryContext          = { };
	}

	ParticleSystem .prototype = Object .assign (Object .create (X3DShapeNode .prototype),
	{
		constructor: ParticleSystem,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "createParticles",   new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geometryType",      new Fields .SFString ("QUAD")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "maxParticles",      new Fields .SFInt32 (200)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "particleLifetime",  new Fields .SFFloat (5)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "lifetimeVariation", new Fields .SFFloat (0.25)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "particleSize",      new Fields .SFVec2f (0.02, 0.02)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "emitter",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "physics",           new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "colorKey",          new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "colorRamp",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoordKey",       new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoordRamp",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",          new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",        new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",       new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",          new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",        new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",          new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "ParticleSystem";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DShapeNode .prototype .initialize .call (this);

			const
				browser = this .getBrowser (),
				gl      = browser .getContext ();

			this .isLive () .addInterest ("set_live__", this);

			browser .getBrowserOptions () .Shading_ .addInterest ("set_shader__", this);

			this .enabled_           .addInterest ("set_enabled__",           this);
			this .createParticles_   .addInterest ("set_createParticles__",   this);
			this .geometryType_      .addInterest ("set_geometryType__",      this);
			this .maxParticles_      .addInterest ("set_enabled__",           this);
			this .particleLifetime_  .addInterest ("set_particleLifetime__",  this);
			this .lifetimeVariation_ .addInterest ("set_lifetimeVariation__", this);
			this .emitter_           .addInterest ("set_emitter__",           this);
			this .physics_           .addInterest ("set_physics__",           this);
			this .colorKey_          .addInterest ("set_color__",             this);
			this .colorRamp_         .addInterest ("set_colorRamp__",         this);
			this .texCoordKey_       .addInterest ("set_texCoord__",          this);
			this .texCoordRamp_      .addInterest ("set_texCoordRamp__",      this);

			this .idBuffer           = gl .createBuffer ();
			this .positionBuffer     = gl .createBuffer ();
			this .elapsedTimeBuffer  = gl .createBuffer ();
			this .lifeBuffer         = gl .createBuffer ();
			this .colorBuffer        = gl .createBuffer ();
			this .texCoordBuffers    = [ gl .createBuffer () ];
			this .normalBuffer       = gl .createBuffer ();
			this .vertexBuffer       = gl .createBuffer ();

			for (var i = 1, channels = this .getBrowser () .getMaxTextures (); i < channels; ++ i)
				this .texCoordBuffers .push (this .texCoordBuffers [0]);

			this .idArray          = new Float32Array ();
			this .positionArray    = new Float32Array ();
			this .elapsedTimeArray = new Float32Array ();
			this .lifeArray        = new Float32Array ();
			this .colorArray       = new Float32Array ();
			this .texCoordArray    = new Float32Array ();
			this .normalArray      = new Float32Array ();
			this .vertexArray      = new Float32Array ();

			this .primitiveMode = gl .TRIANGLES;

			// Geometry context

			this .geometryContext .fogCoords             = false;
			this .geometryContext .textureCoordinateNode = browser .getDefaultTextureCoordinate ();

			// Call order is higly important at startup.
			this .set_emitter__ ();
			this .set_enabled__ ();
			this .set_createParticles__ ();
			this .set_particleLifetime__ ();
			this .set_lifetimeVariation__ ();
			this .set_physics__ ();
			this .set_colorRamp__ ();
			this .set_texCoordRamp__ ();
		},
		set_bbox__: function ()
		{
			if (this .bboxSize_ .getValue () .equals (this .getDefaultBBoxSize ()))
				this .bbox .set ();
			else
				this .bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());

			this .bboxSize   .assign (this .bbox .size);
			this .bboxCenter .assign (this .bbox .center);
		},
		set_transparent__: function ()
		{
			if (this .getAppearance () .getAlphaMode () === AlphaMode .AUTO)
			{
				switch (this .geometryType)
				{
					case POINT:
					{
						this .setTransparent (true);
						break;
					}
					default:
					{
						this .setTransparent (this .getAppearance () .getTransparent () ||
													 (this .colorRampNode && this .colorRampNode .getTransparent ()) ||
													 (this .geometryType === GEOMETRY && this .geometryNode && this .geometryNode .getTransparent ()));
						break;
					}
				}
			}
			else
			{
				this .setTransparent (this .getAppearance () .getTransparent ());
			}
		},
		set_live__: function ()
		{
			if (this .isLive () .getValue ())
			{
				if (this .isActive_ .getValue () && this .maxParticles_ .getValue ())
				{
					this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

					if (this .pauseTime)
					{
						this .creationTime += performance .now () / 1000 - this .pauseTime;
						this .pauseTime     = 0;
					}
				}
			}
			else
			{
				if (this .isActive_ .getValue () && this .maxParticles_ .getValue ())
				{
					this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);

					if (this .pauseTime === 0)
						this .pauseTime = performance .now () / 1000;
				}
			}
		},
		set_enabled__: function ()
		{
			if (this .enabled_ .getValue () && this .maxParticles_ .getValue ())
			{
				if (! this .isActive_ .getValue ())
				{
					if (this .isLive () .getValue ())
					{
						this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

						this .pauseTime = 0;
					}
					else
						this .pauseTime = performance .now () / 1000;

					this .isActive_ = true;
				}
			}
			else
			{
				if (this .isActive_ .getValue ())
				{
					if (this .isLive () .getValue ())
					{
						this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);
					}

					this .isActive_ = false;

					this .numParticles = 0;
				}
			}

			this .set_maxParticles__ ();
		},
		set_createParticles__: function ()
		{
			this .createParticles = this .createParticles_ .getValue ();
		},
		set_geometryType__: function ()
		{
			var
				gl           = this .getBrowser () .getContext (),
				maxParticles = this .maxParticles;

			// geometryType

			this .geometryType = GeometryTypes [this .geometryType_ .getValue ()];

			if (! this .geometryType)
				this .geometryType = POINT;

			// Create buffers

			switch (this .geometryType)
			{
				case POINT:
				{
					this .idArray          = new Float32Array (maxParticles);
					this .positionArray    = new Float32Array (3 * maxParticles);
					this .elapsedTimeArray = new Float32Array (maxParticles);
					this .lifeArray        = new Float32Array (maxParticles);
					this .colorArray       = new Float32Array (4 * maxParticles);
					this .texCoordArray    = new Float32Array ();
					this .normalArray      = new Float32Array ();
					this .vertexArray      = new Float32Array (4 * maxParticles);

					for (var i = 0, a = this .idArray, l = a .length; i < l; ++ i)
						a [i] = i;

					this .colorArray  .fill (1);
					this .vertexArray .fill (1);

					this .testWireframe = false;
					this .primitiveMode = gl .POINTS;
					this .texCoordCount = 0;
					this .vertexCount   = 1;

					this .geometryContext .geometryType = 0;
					break;
				}
				case LINE:
				{
					this .idArray          = new Float32Array (2 * maxParticles);
					this .positionArray    = new Float32Array (2 * 3 * maxParticles);
					this .elapsedTimeArray = new Float32Array (2 * maxParticles);
					this .lifeArray        = new Float32Array (2 * maxParticles);
					this .colorArray       = new Float32Array (2 * 4 * maxParticles);
					this .texCoordArray    = new Float32Array ();
					this .normalArray      = new Float32Array ();
					this .vertexArray      = new Float32Array (2 * 4 * maxParticles);

					for (var i = 0, a = this .idArray, l = a .length; i < l; ++ i)
						a [i] = Math .floor (i / 2);

					this .colorArray  .fill (1);
					this .vertexArray .fill (1);

					this .testWireframe = false;
					this .primitiveMode = gl .LINES;
					this .texCoordCount = 2;
					this .vertexCount   = 2;

					this .geometryContext .geometryType = 1;
					break;
				}
				case TRIANGLE:
				case QUAD:
				case SPRITE:
				{
					this .idArray          = new Float32Array (6 * maxParticles);
					this .positionArray    = new Float32Array (6 * 3 * maxParticles);
					this .elapsedTimeArray = new Float32Array (6 * maxParticles);
					this .lifeArray        = new Float32Array (6 * maxParticles);
					this .colorArray       = new Float32Array (6 * 4 * maxParticles);
					this .texCoordArray    = new Float32Array (6 * 4 * maxParticles);
					this .normalArray      = new Float32Array (6 * 3 * maxParticles);
					this .vertexArray      = new Float32Array (6 * 4 * maxParticles);

					for (var i = 0, a = this .idArray, l = a .length; i < l; ++ i)
						a [i] = Math .floor (i / 6);

					this .colorArray  .fill (1);
					this .vertexArray .fill (1);

					var
						texCoordArray = this .texCoordArray,
						normalArray   = this .normalArray;

					for (var i = 0, length = 6 * 3 * maxParticles; i < length; i += 3)
					{
						normalArray [i]     = 0;
						normalArray [i + 1] = 0;
						normalArray [i + 2] = 1;
					}

					gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
					gl .bufferData (gl .ARRAY_BUFFER, this .normalArray, gl .STATIC_DRAW);

					for (var i = 0; i < maxParticles; ++ i)
					{
						var i24 = i * 24;

						// p4 ------ p3
						// |       / |
						// |     /   |
						// |   /     |
						// | /       |
						// p1 ------ p2

						// p1
						texCoordArray [i24]     = texCoordArray [i24 + 12] = 0;
						texCoordArray [i24 + 1] = texCoordArray [i24 + 13] = 0;
						texCoordArray [i24 + 2] = texCoordArray [i24 + 14] = 0;
						texCoordArray [i24 + 3] = texCoordArray [i24 + 15] = 1;

						// p2
						texCoordArray [i24 + 4] = 1;
						texCoordArray [i24 + 5] = 0;
						texCoordArray [i24 + 6] = 0;
						texCoordArray [i24 + 7] = 1;

						// p3
						texCoordArray [i24 + 8]  = texCoordArray [i24 + 16] = 1;
						texCoordArray [i24 + 9]  = texCoordArray [i24 + 17] = 1;
						texCoordArray [i24 + 10] = texCoordArray [i24 + 18] = 0;
						texCoordArray [i24 + 11] = texCoordArray [i24 + 19] = 1;

						// p4
						texCoordArray [i24 + 20] = 0;
						texCoordArray [i24 + 21] = 1;
						texCoordArray [i24 + 22] = 0;
						texCoordArray [i24 + 23] = 1;
					}

					gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [0]);
					gl .bufferData (gl .ARRAY_BUFFER, this .texCoordArray, gl .STATIC_DRAW);

					this .testWireframe = true;
					this .primitiveMode = gl .TRIANGLES;
					this .texCoordCount = 4;
					this .vertexCount   = 6;

					this .geometryContext .geometryType = 2;
					break;
				}
				case GEOMETRY:
				{
					this .texCoordCount = 0;
					this .vertexCount   = 0;
					break;
				}
			}

			gl .bindBuffer (gl .ARRAY_BUFFER, this .idBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .idArray, gl .STATIC_DRAW);

			this .set_shader__ ();
			this .set_transparent__ ();
		},
		set_shader__: function ()
		{
			switch (this .geometryType)
			{
				case POINT:
				{
					this .shaderNode = this .getBrowser () .getPointShader ();
					break;
				}
				case LINE:
				{
					this .shaderNode = this .getBrowser () .getLineShader ();
					break;
				}
				case TRIANGLE:
				case QUAD:
				case SPRITE:
				{
					this .shaderNode = this .getBrowser () .getDefaultShader ();
					break;
				}
				case GEOMETRY:
				{
					break;
				}
			}
		},
		set_maxParticles__: function ()
		{
			var
				particles    = this .particles,
				maxParticles = Math .max (0, this .maxParticles_ .getValue ());

			for (var i = this .numParticles, length = Math .min (particles .length, maxParticles); i < length; ++ i)
			{
				particles [i] .life     = 1;
				particles [i] .lifetime = -1;
			}

			for (var i = particles .length, length = maxParticles; i < length; ++ i)
			{
				particles [i] = {
					life: 1,
					lifetime: -1,
					elapsedTime: 0,
					position: new Vector3 (0, 0, 0),
					velocity: new Vector3 (0, 0, 0),
					color:    new Vector4 (1, 1, 1, 1),
					distance: 0,
				};
			}

			this .maxParticles = maxParticles;
			this .numParticles = Math .min (this .numParticles, maxParticles);

			if (! this .emitterNode .isExplosive ())
				this .creationTime = performance .now () / 1000;

			this .set_geometryType__ ();
		},
		set_particleLifetime__: function ()
		{
			this .particleLifetime = this .particleLifetime_ .getValue ();
		},
		set_lifetimeVariation__: function ()
		{
			this .lifetimeVariation = this .lifetimeVariation_ .getValue ();
		},
		set_emitter__: function ()
		{
			this .emitterNode = X3DCast (X3DConstants .X3DParticleEmitterNode, this .emitter_);

			if (! this .emitterNode)
				this .emitterNode = this .getBrowser () .getDefaultEmitter ();

			this .createParticles = this .createParticles_ .getValue ();
		},
		set_physics__: function ()
		{
			var
				physics                  = this .physics_ .getValue (),
				forcePhysicsModelNodes   = this .forcePhysicsModelNodes,
				boundedPhysicsModelNodes = this .boundedPhysicsModelNodes;

			for (var i = 0, length = boundedPhysicsModelNodes .length; i < length; ++ i)
				boundedPhysicsModelNodes [i] .removeInterest ("set_boundedPhysics__", this);

			forcePhysicsModelNodes   .length = 0;
			boundedPhysicsModelNodes .length = 0;

			for (var i = 0, length = physics .length; i < length; ++ i)
			{
				try
				{
					var
						innerNode = physics [i] .getValue () .getInnerNode (),
						type      = innerNode .getType ();

					for (var t = type .length - 1; t >= 0; -- t)
					{
						switch (type [t])
						{
							case X3DConstants .ForcePhysicsModel:
							case X3DConstants .WindPhysicsModel:
							{
								forcePhysicsModelNodes .push (innerNode);
								break;
							}
							case X3DConstants .BoundedPhysicsModel:
							{
								innerNode .addInterest ("set_boundedPhysics__", this);
								boundedPhysicsModelNodes .push (innerNode);
								break;
							}
							default:
								continue;
						}

						break;
					}
				}
				catch (error)
				{ }
			}

			this .set_boundedPhysics__ ();
		},
		set_boundedPhysics__: function ()
		{
			var
				boundedPhysicsModelNodes = this .boundedPhysicsModelNodes,
				boundedNormals           = this .boundedNormals,
				boundedVertices          = this .boundedVertices;

			boundedNormals  .length = 0;
			boundedVertices .length = 0;

			for (var i = 0, length = boundedPhysicsModelNodes .length; i < length; ++ i)
			{
				boundedPhysicsModelNodes [i] .addGeometry (boundedNormals, boundedVertices);
			}

			this .boundedVolume = new BVH (boundedVertices, boundedNormals);
		},
		set_colorRamp__: function ()
		{
			if (this .colorRampNode)
				this .colorRampNode .removeInterest ("set_color__", this);

			this .colorRampNode = X3DCast (X3DConstants .X3DColorNode, this .colorRamp_);

			if (this .colorRampNode)
				this .colorRampNode .addInterest ("set_color__", this);

			this .set_color__ ();
			this .set_transparent__ ();
		},
		set_color__: function ()
		{
			var
				colorKey  = this .colorKey_,
				colorKeys = this .colorKeys,
				colorRamp = this .colorRamp;

			for (var i = 0, length = colorKey .length; i < length; ++ i)
				colorKeys [i] = colorKey [i];

			colorKeys .length = length;

			if (this .colorRampNode)
				this .colorRampNode .getVectors (this .colorRamp);

			for (var i = colorRamp .length, length = colorKey .length; i < length; ++ i)
				colorRamp [i] = new Vector4 (1, 1, 1, 1);

			colorRamp .length = length;

			this .geometryContext .colorMaterial = !! (colorKeys .length && this .colorRampNode);
		},
		set_texCoordRamp__: function ()
		{
			if (this .texCoordRampNode)
				this .texCoordRampNode .removeInterest ("set_texCoord__", this);

			this .texCoordRampNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this .texCoordRamp_);

			if (this .texCoordRampNode)
				this .texCoordRampNode .addInterest ("set_texCoord__", this);

			this .set_texCoord__ ();
		},
		set_texCoord__: function ()
		{
			var
				texCoordKey  = this .texCoordKey_,
				texCoordKeys = this .texCoordKeys,
				texCoordRamp = this .texCoordRamp;

			for (var i = 0, length = texCoordKey .length; i < length; ++ i)
				texCoordKeys [i] = texCoordKey [i];

			texCoordKeys .length = length;

			if (this .texCoordRampNode)
				this .texCoordRampNode .getTexCoord (texCoordRamp);

			for (var i = texCoordRamp .length, length = texCoordKey .length * this .texCoordCount; i < length; ++ i)
				texCoordRamp [i] = new Vector4 (0, 0, 0, 0);

			texCoordRamp .length = length;

			this .texCoordAnim = !! (texCoordKeys .length && this .texCoordRampNode);
		},
		intersectsBox: function (box, clipPlanes)
		{
			// TODO: implement me.
		},
		animateParticles: function ()
		{
			var emitterNode = this .emitterNode;

			// Determine delta time

			var
				DELAY = 15, // Delay in frames when dt full applys.
				dt    = 1 / Math .max (10, this .getBrowser () .getCurrentFrameRate ());

			// var deltaTime is only for the emitter, this.deltaTime is for the forces.
			var deltaTime = this .deltaTime = ((DELAY - 1) * this .deltaTime + dt) / DELAY; // Moving average about DELAY frames.

			// Determine numParticles

			if (emitterNode .isExplosive ())
			{
				var
					now              = performance .now () / 1000,
					particleLifetime = this .particleLifetime + this .particleLifetime * this .lifetimeVariation;

				if (this .numParticles === 0 || now - this .creationTime > particleLifetime)
				{
					this .creationTime    = now;
					this .numParticles    = this .maxParticles;
					this .createParticles = this .createParticles_ .getValue ();

					deltaTime = Number .POSITIVE_INFINITY;
				}
				else
					this .createParticles = false;
			}
			else
			{
				if (this .numParticles < this .maxParticles)
				{
					var
						now          = performance .now () / 1000,
						newParticles = Math .max (0, Math .floor ((now - this .creationTime) * this .maxParticles / this .particleLifetime));

					if (newParticles)
						this .creationTime = now;

					this .numParticles = Math .floor (Math .min (this .maxParticles, this .numParticles + newParticles));
				}
			}

			// Apply forces.

			if (emitterNode .getMass ())
			{
				var
					forcePhysicsModelNodes = this .forcePhysicsModelNodes,
					velocities             = this .velocities,
					speeds                 = this .speeds,
					turbulences            = this .turbulences,
					deltaMass              = this .deltaTime / emitterNode .getMass ();

				// Collect forces in velocities and collect turbulences.

				for (var i = velocities .length, length = forcePhysicsModelNodes .length; i < length; ++ i)
					velocities [i] = new Vector3 (0, 0, 0);

				for (var i = 0, length = forcePhysicsModelNodes .length; i < length; ++ i)
					forcePhysicsModelNodes [i] .addForce (i, emitterNode, velocities, turbulences);

				// Determine velocities from forces and determine speed.

				for (var i = 0, length = velocities .length; i < length; ++ i)
				{
					velocities [i] .multiply (deltaMass);
					speeds [i] = velocities [i] .abs ();
				}

				this .numForces = length;
			}
			else
			{
				this .numForces = 0;
			}

			// Determine particle position, velocity and colors

			emitterNode .animate (this, deltaTime);

			this .updateGeometry (null);

			this .getBrowser () .addBrowserEvent ();
		},
		updateGeometry: function (modelViewMatrix)
		{
			switch (this .geometryType)
			{
				case POINT:
					if (! modelViewMatrix)
						this .updatePoint ();
					break;
				case LINE:
					if (! modelViewMatrix)
						this .updateLine ();
					break;
				case TRIANGLE:
				case QUAD:
				case SPRITE:
					this .updateQuad (modelViewMatrix);
					break;
				case GEOMETRY:
					break;
			}
		},
		updatePoint: function ()
		{
			var
				gl               = this .getBrowser () .getContext (),
				particles        = this .particles,
				numParticles     = this .numParticles,
				positionArray    = this .positionArray,
				elapsedTimeArray = this .elapsedTimeArray,
				lifeArray        = this .lifeArray,
				colorArray       = this .colorArray,
				vertexArray      = this .vertexArray;

			// Colors

			if (this .geometryContext .colorMaterial)
			{
				for (var i = 0; i < numParticles; ++ i)
				{
					var
						color = particles [i] .color,
						i4    = i * 4;

					colorArray [i4]     = color .x;
					colorArray [i4 + 1] = color .y;
					colorArray [i4 + 2] = color .z;
					colorArray [i4 + 3] = color .w;
				}

				gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
				gl .bufferData (gl .ARRAY_BUFFER, this .colorArray, gl .STATIC_DRAW);
			}

			// Vertices

			for (var i = 0; i < numParticles; ++ i)
			{
				var
					position    = particles [i] .position,
					elapsedTime = particles [i] .elapsedTime / particles [i] .lifetime,
					i3          = i * 3,
					i4          = i * 4;

				positionArray [i3]     = position .x;
				positionArray [i3 + 1] = position .y;
				positionArray [i3 + 2] = position .z;

				elapsedTimeArray [i] = elapsedTime;
				lifeArray [i]        = particles [i] .life;

				vertexArray [i4]     = position .x;
				vertexArray [i4 + 1] = position .y;
				vertexArray [i4 + 2] = position .z;
			}

			gl .bindBuffer (gl .ARRAY_BUFFER, this .positionBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .positionArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .elapsedTimeBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .elapsedTimeArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .lifeBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .lifeArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .vertexArray, gl .STATIC_DRAW);
		},
		updateLine: function ()
		{
			var
				gl               = this .getBrowser () .getContext (),
				particles        = this .particles,
				numParticles     = this .numParticles,
				positionArray    = this .positionArray,
				elapsedTimeArray = this .elapsedTimeArray,
				lifeArray        = this .lifeArray,
				colorArray       = this .colorArray,
				vertexArray      = this .vertexArray,
				sy1_2            = this .particleSize_ .y / 2;

			// Colors

			if (this .geometryContext .colorMaterial)
			{
				for (var i = 0; i < numParticles; ++ i)
				{
					var
						color = particles [i] .color,
						i8    = i * 8;

					colorArray [i8]     = color .x;
					colorArray [i8 + 1] = color .y;
					colorArray [i8 + 2] = color .z;
					colorArray [i8 + 3] = color .w;

					colorArray [i8 + 4] = color .x;
					colorArray [i8 + 5] = color .y;
					colorArray [i8 + 6] = color .z;
					colorArray [i8 + 7] = color .w;
				}

				gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
				gl .bufferData (gl .ARRAY_BUFFER, this .colorArray, gl .STATIC_DRAW);
			}

			// Vertices

			for (var i = 0; i < numParticles; ++ i)
			{
				var
					particle    = particles [i],
					position    = particle .position,
					elapsedTime = particles [i] .elapsedTime / particles [i] .lifetime,
					life        = particles [i] .life,
					x           = position .x,
					y           = position .y,
					z           = position .z,
					i2          = i * 2,
					i6          = i * 6,
					i8          = i * 8;

				positionArray [i6]     = x;
				positionArray [i6 + 1] = y;
				positionArray [i6 + 2] = z;
				positionArray [i6 + 3] = x;
				positionArray [i6 + 4] = y;
				positionArray [i6 + 5] = z;

				elapsedTimeArray [i2]     = elapsedTime;
				elapsedTimeArray [i2 + 1] = elapsedTime;

				lifeArray [i2]     = life;
				lifeArray [i2 + 1] = life;

				// Length of line / 2.
				normal .assign (particle .velocity) .normalize () .multiply (sy1_2);

				vertexArray [i8]     = x - normal .x;
				vertexArray [i8 + 1] = y - normal .y;
				vertexArray [i8 + 2] = z - normal .z;

				vertexArray [i8 + 4] = x + normal .x;
				vertexArray [i8 + 5] = y + normal .y;
				vertexArray [i8 + 6] = z + normal .z;
			}

			gl .bindBuffer (gl .ARRAY_BUFFER, this .positionBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .positionArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .elapsedTimeBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .elapsedTimeArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .lifeBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .lifeArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .vertexArray, gl .STATIC_DRAW);
		},
		updateQuad: function (modelViewMatrix)
		{
			try
			{
				var
					gl               = this .getBrowser () .getContext (),
					particles        = this .particles,
					maxParticles     = this .maxParticles,
				   numParticles     = this .numParticles,
					positionArray    = this .positionArray,
					elapsedTimeArray = this .elapsedTimeArray,
					lifeArray        = this .lifeArray,
					colorArray       = this .colorArray,
					texCoordArray    = this .texCoordArray,
					normalArray      = this .normalArray,
					vertexArray      = this .vertexArray,
					sx1_2            = this .particleSize_ .x / 2,
					sy1_2            = this .particleSize_ .y / 2;

				// Sort particles

//				if (this .sortParticles) // always false
//				{
//					for (var i = 0; i < numParticles; ++ i)
//					{
//						var particle = particles [i];
//						particle .distance = modelViewMatrix .getDepth (particle .position);
//					}
//
//					// Expensisive function!!!
//					this .particleSorter .sort (0, numParticles);
//				}

				// Colors

				if (! modelViewMatrix) // if called from animateParticles
				{
					if (this .geometryContext .colorMaterial)
					{
						for (var i = 0; i < maxParticles; ++ i)
						{
							var
								color = particles [i] .color,
								i24   = i * 24;

							// p4 ------ p3
							// |       / |
							// |     /   |
							// |   /     |
							// | /       |
							// p1 ------ p2

							// p1, p2, p3; p1, p3, p4
							colorArray [i24]     = colorArray [i24 + 4] = colorArray [i24 + 8]  = colorArray [i24 + 12] = colorArray [i24 + 16] = colorArray [i24 + 20] = color .x;
							colorArray [i24 + 1] = colorArray [i24 + 5] = colorArray [i24 + 9]  = colorArray [i24 + 13] = colorArray [i24 + 17] = colorArray [i24 + 21] = color .y;
							colorArray [i24 + 2] = colorArray [i24 + 6] = colorArray [i24 + 10] = colorArray [i24 + 14] = colorArray [i24 + 18] = colorArray [i24 + 22] = color .z;
							colorArray [i24 + 3] = colorArray [i24 + 7] = colorArray [i24 + 11] = colorArray [i24 + 15] = colorArray [i24 + 19] = colorArray [i24 + 23] = color .w;
						}

						gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .colorArray, gl .STATIC_DRAW);
					}

					if (this .texCoordAnim && this .texCoordArray .length)
					{
						var
							texCoordKeys = this .texCoordKeys,
							texCoordRamp = this .texCoordRamp;

						var
							length = texCoordKeys .length,
							index0 = 0;

						for (var i = 0; i < maxParticles; ++ i)
						{
							// Determine index0.

							var
								particle = particles [i],
								fraction = particle .elapsedTime / particle .lifetime;

							if (length == 1 || fraction <= texCoordKeys [0])
							{
								index0 = 0;
							}
							else if (fraction >= texCoordKeys .at (-1))
							{
								index0 = length - 2;
							}
							else
							{
								var index = Algorithm .upperBound (texCoordKeys, 0, length, fraction, Algorithm .less);

								if (index < length)
									index0 = index - 1;
								else
									index0 = 0;
							}

							// Set texCoord.

							index0 *= this .texCoordCount;

							var
								texCoord1 = texCoordRamp [index0],
								texCoord2 = texCoordRamp [index0 + 1],
								texCoord3 = texCoordRamp [index0 + 2],
								texCoord4 = texCoordRamp [index0 + 3],
								i24 = i * 24;

							// p4 ------ p3
							// |       / |
							// |     /   |
							// |   /     |
							// | /       |
							// p1 ------ p2

							// p1
							texCoordArray [i24]     = texCoordArray [i24 + 12] = texCoord1 .x;
							texCoordArray [i24 + 1] = texCoordArray [i24 + 13] = texCoord1 .y;
							texCoordArray [i24 + 2] = texCoordArray [i24 + 14] = texCoord1 .z;
							texCoordArray [i24 + 3] = texCoordArray [i24 + 15] = texCoord1 .w;

							// p2
							texCoordArray [i24 + 4] = texCoord2 .x;
							texCoordArray [i24 + 5] = texCoord2 .y;
							texCoordArray [i24 + 6] = texCoord2 .z;
							texCoordArray [i24 + 7] = texCoord2 .w;

							// p3
							texCoordArray [i24 + 8]  = texCoordArray [i24 + 16] = texCoord3 .x;
							texCoordArray [i24 + 9]  = texCoordArray [i24 + 17] = texCoord3 .y;
							texCoordArray [i24 + 10] = texCoordArray [i24 + 18] = texCoord3 .z;
							texCoordArray [i24 + 11] = texCoordArray [i24 + 19] = texCoord3 .w;

							// p4
							texCoordArray [i24 + 20] = texCoord4 .x;
							texCoordArray [i24 + 21] = texCoord4 .y;
							texCoordArray [i24 + 22] = texCoord4 .z;
							texCoordArray [i24 + 23] = texCoord4 .w;
						}

						gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [0]);
						gl .bufferData (gl .ARRAY_BUFFER, this .texCoordArray, gl .STATIC_DRAW);
					}
				}

				// Vertices

				if (this .geometryType === SPRITE)
				{
					if (modelViewMatrix) // if called from depth or draw
					{
						// Normals

						var rotation = this .getScreenAlignedRotation (modelViewMatrix);

						normal
							.set (rotation [0], rotation [1], rotation [2])
							.cross (vector .set (rotation [3], rotation [4], rotation [5]))
							.normalize ();

						var
							nx = normal .x,
							ny = normal .y,
							nz = normal .z;

						for (var i = 0, length = 6 * 3 * maxParticles; i < length; i += 3)
						{
							normalArray [i]     = nx;
							normalArray [i + 1] = ny;
							normalArray [i + 2] = nz;
						}

						gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .normalArray, gl .STATIC_DRAW);

						// Vertices

						s1 .set (-sx1_2, -sy1_2, 0);
						s2 .set ( sx1_2, -sy1_2, 0);
						s3 .set ( sx1_2,  sy1_2, 0);
						s4 .set (-sx1_2,  sy1_2, 0);

						rotation .multVecMatrix (s1);
						rotation .multVecMatrix (s2);
						rotation .multVecMatrix (s3);
						rotation .multVecMatrix (s4);

						for (var i = 0; i < numParticles; ++ i)
						{
							var
								position    = particles [i] .position,
								elapsedTime = particles [i] .elapsedTime / particles [i] .lifetime,
								x           = position .x,
								y           = position .y,
								z           = position .z,
								i6          = i * 6,
								i18         = i * 18,
								i24         = i * 24;

							// p4 ------ p3
							// |       / |
							// |     /   |
							// |   /     |
							// | /       |
							// p1 ------ p2


							positionArray [i18]     = positionArray [i18 + 3] = positionArray [i18 + 6] = positionArray [i18 +  9] = positionArray [i18 + 12] = positionArray [i18 + 15] = x;
							positionArray [i18 + 1] = positionArray [i18 + 4] = positionArray [i18 + 7] = positionArray [i18 + 10] = positionArray [i18 + 13] = positionArray [i18 + 16] = y;
							positionArray [i18 + 2] = positionArray [i18 + 5] = positionArray [i18 + 8] = positionArray [i18 + 11] = positionArray [i18 + 14] = positionArray [i18 + 17] = z;

							elapsedTimeArray [i6] = elapsedTimeArray [i6 + 1] = elapsedTimeArray [i6 + 2] = elapsedTimeArray [i6 + 3] = elapsedTimeArray [i6 + 4] = elapsedTimeArray [i6 + 5] = elapsedTime;
							lifeArray [i6]        = lifeArray [i6 + 1]        = lifeArray [i6 + 2]        = lifeArray [i6 + 3]        = lifeArray [i6 + 4]        = lifeArray [i6 + 5]        = particles [i] .life;

							// p1
							vertexArray [i24]     = vertexArray [i24 + 12] = x + s1 .x;
							vertexArray [i24 + 1] = vertexArray [i24 + 13] = y + s1 .y;
							vertexArray [i24 + 2] = vertexArray [i24 + 14] = z + s1 .z;

							// p2
							vertexArray [i24 + 4] = x + s2 .x;
							vertexArray [i24 + 5] = y + s2 .y;
							vertexArray [i24 + 6] = z + s2 .z;

							// p3
							vertexArray [i24 + 8]  = vertexArray [i24 + 16] = x + s3 .x;
							vertexArray [i24 + 9]  = vertexArray [i24 + 17] = y + s3 .y;
							vertexArray [i24 + 10] = vertexArray [i24 + 18] = z + s3 .z;

							// p4
							vertexArray [i24 + 20] = x + s4 .x;
							vertexArray [i24 + 21] = y + s4 .y;
							vertexArray [i24 + 22] = z + s4 .z;
						}

						gl .bindBuffer (gl .ARRAY_BUFFER, this .positionBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .positionArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .elapsedTimeBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .elapsedTimeArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .lifeBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .lifeArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .vertexArray, gl .STATIC_DRAW);
					}
				}
				else
				{
					if (! modelViewMatrix) // if called from animateParticles
					{
						for (var i = 0; i < numParticles; ++ i)
						{
							var
								position    = particles [i] .position,
								elapsedTime = particles [i] .elapsedTime / particles [i] .lifetime,
								x           = position .x,
								y           = position .y,
								z           = position .z,
								i6          = i * 6,
								i18         = i * 18,
								i24         = i * 24;

							// p4 ------ p3
							// |       / |
							// |     /   |
							// |   /     |
							// | /       |
							// p1 ------ p2

							positionArray [i18]     = positionArray [i18 + 3] = positionArray [i18 + 6] = positionArray [i18 +  9] = positionArray [i18 + 12] = positionArray [i18 + 15] = x;
							positionArray [i18 + 1] = positionArray [i18 + 4] = positionArray [i18 + 7] = positionArray [i18 + 10] = positionArray [i18 + 13] = positionArray [i18 + 16] = y;
							positionArray [i18 + 2] = positionArray [i18 + 5] = positionArray [i18 + 8] = positionArray [i18 + 11] = positionArray [i18 + 14] = positionArray [i18 + 17] = z;

							elapsedTimeArray [i6] = elapsedTimeArray [i6 + 1] = elapsedTimeArray [i6 + 2] = elapsedTimeArray [i6 + 3] = elapsedTimeArray [i6 + 4] = elapsedTimeArray [i6 + 5] = elapsedTime;
							lifeArray [i6]        = lifeArray [i6 + 1]        = lifeArray [i6 + 2]        = lifeArray [i6 + 3]        = lifeArray [i6 + 4]        = lifeArray [i6 + 5]        = particles [i] .life;

							// p1
							vertexArray [i24]     = vertexArray [i24 + 12] = x - sx1_2;
							vertexArray [i24 + 1] = vertexArray [i24 + 13] = y - sy1_2;
							vertexArray [i24 + 2] = vertexArray [i24 + 14] = z;

							// p2
							vertexArray [i24 + 4] = x + sx1_2;
							vertexArray [i24 + 5] = y - sy1_2;
							vertexArray [i24 + 6] = z;

							// p3
							vertexArray [i24 + 8]  = vertexArray [i24 + 16] = x + sx1_2;
							vertexArray [i24 + 9]  = vertexArray [i24 + 17] = y + sy1_2;
							vertexArray [i24 + 10] = vertexArray [i24 + 18] = z;

							// p4
							vertexArray [i24 + 20] = x - sx1_2;
							vertexArray [i24 + 21] = y + sy1_2;
							vertexArray [i24 + 22] = z;
						}

						gl .bindBuffer (gl .ARRAY_BUFFER, this .positionBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .positionArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .elapsedTimeBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .elapsedTimeArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .lifeBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .lifeArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .vertexArray, gl .STATIC_DRAW);
					}
				}
			}
			catch (error)
			{
				console .log (error);
			}
		},
		traverse: function (type, renderObject)
		{
			if (! this .isActive_ .getValue ())
				return;

			switch (type)
			{
				case TraverseType .POINTER:
				{
					break;
				}
				case TraverseType .PICKING:
				{
					break;
				}
				case TraverseType .COLLISION:
				{
					// TODO: to be implemented.
					break;
				}
				case TraverseType .SHADOW:
				{
					if (this .castShadow_ .getValue ())
						renderObject .addDepthShape (this);

					break;
				}
				case TraverseType .DISPLAY:
				{
					if (renderObject .addDisplayShape (this))
						this .getAppearance () .traverse (type, renderObject); // Currently used for GeneratedCubeMapTexture.

					break;
				}
			}

			if (this .geometryType === GEOMETRY)
			{
				if (this .getGeometry ())
					this .getGeometry () .traverse (type, renderObject); // Currently used for ScreenText.
			}
		},
		depth: function (gl, context, shaderNode)
		{
			// Update geometry if SPRITE.

			this .updateGeometry (context .modelViewMatrix);

			// Display geometry.

			if (this .geometryType === GEOMETRY)
			{
				var geometryNode = this .getGeometry ();

				if (geometryNode)
					geometryNode .displayParticlesDepth (gl, context, shaderNode, this .particles, this .numParticles);
			}
			else
			{
				if (this .numParticles <= 0)
					return;

				if (shaderNode .getValid ())
				{
					// Setup vertex attributes.

					shaderNode .enableFloatAttrib (gl, "x3d_ParticleId",          this .idBuffer,          1);
					shaderNode .enableFloatAttrib (gl, "x3d_ParticlePosition",    this .positionBuffer,    3);
					shaderNode .enableFloatAttrib (gl, "x3d_ParticleElapsedTime", this .elapsedTimeBuffer, 1);
					shaderNode .enableFloatAttrib (gl, "x3d_ParticleLife",        this .lifeBuffer,        1);
					shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

					gl .drawArrays (this .primitiveMode, 0, this .numParticles * this .vertexCount);

					shaderNode .disableFloatAttrib (gl, "x3d_ParticleId");
					shaderNode .disableFloatAttrib (gl, "x3d_ParticlePosition");
					shaderNode .disableFloatAttrib (gl, "x3d_ParticleElapsedTime");
					shaderNode .disableFloatAttrib (gl, "x3d_ParticleLife");
				}
			}
		},
		display: function (gl, context)
		{
			try
			{
				if (this .numParticles <= 0)
					return;

				// Update geometry if SPRITE.

				this .updateGeometry (context .modelViewMatrix);

				// Display geometry.

				if (this .geometryType === GEOMETRY)
				{
					const geometryNode = this .getGeometry ();

					if (geometryNode)
					{
						context .geometryContext = null;

						geometryNode .displayParticles (gl, context, this .particles, this .numParticles);
					}
				}
				else
				{
					const
						appearanceNode = this .getAppearance (),
						shaderNode     = appearanceNode .shaderNode || this .shaderNode;

					// Setup shader.

					if (shaderNode .getValid ())
					{
						const blendModeNode = appearanceNode .blendModeNode;

						if (blendModeNode)
							blendModeNode .enable (gl);

						context .geometryContext = this .geometryContext;

						shaderNode .enable (gl);
						shaderNode .setLocalUniforms (gl, context);

						// Setup vertex attributes.

						shaderNode .enableFloatAttrib (gl, "x3d_ParticleId",          this .idBuffer,          1);
						shaderNode .enableFloatAttrib (gl, "x3d_ParticlePosition",    this .positionBuffer,    3);
						shaderNode .enableFloatAttrib (gl, "x3d_ParticleElapsedTime", this .elapsedTimeBuffer, 1);
						shaderNode .enableFloatAttrib (gl, "x3d_ParticleLife",        this .lifeBuffer,        1);

						if (this .geometryContext .colorMaterial)
							shaderNode .enableColorAttribute (gl, this .colorBuffer);

						if (this .texCoordArray .length)
							shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers);

						if (this .normalArray .length)
							shaderNode .enableNormalAttribute (gl, this .normalBuffer);

						shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

						if (shaderNode .wireframe && this .testWireframe)
						{
							// Wireframes are always solid so only one drawing call is needed.

							for (var i = 0, length = this .numParticles * this .vertexCount; i < length; i += 3)
								gl .drawArrays (shaderNode .primitiveMode, i, 3);
						}
						else
						{
							const positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;

							gl .frontFace (positiveScale ? gl .CCW : gl .CW);
							gl .enable (gl .CULL_FACE);
							gl .cullFace (gl .BACK);

							gl .drawArrays (this .primitiveMode, 0, this .numParticles * this .vertexCount);
						}

						shaderNode .disableFloatAttrib (gl, "x3d_ParticleId");
						shaderNode .disableFloatAttrib (gl, "x3d_ParticlePosition");
						shaderNode .disableFloatAttrib (gl, "x3d_ParticleElapsedTime");
						shaderNode .disableFloatAttrib (gl, "x3d_ParticleLife");

						shaderNode .disableColorAttribute    (gl);
						shaderNode .disableTexCoordAttribute (gl);
						shaderNode .disableNormalAttribute   (gl);
						shaderNode .disable                  (gl);

						if (blendModeNode)
							blendModeNode .disable (gl);
					}
				}
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
		getScreenAlignedRotation: function (modelViewMatrix)
		{
			invModelViewMatrix .assign (modelViewMatrix) .inverse ();

			invModelViewMatrix .multDirMatrix (billboardToScreen .assign (Vector3 .zAxis));
			invModelViewMatrix .multDirMatrix (viewerYAxis .assign (Vector3 .yAxis));

			x .assign (viewerYAxis) .cross (billboardToScreen);
			y .assign (billboardToScreen) .cross (x);
			var z = billboardToScreen;

			// Compose rotation

			x .normalize ();
			y .normalize ();
			z .normalize ();

			return this .rotation .set (x .x, x .y, x .z,
			                            y .x, y .y, y .z,
			                            z .x, z .y, z .z);
		},
	});

	return ParticleSystem;
});
