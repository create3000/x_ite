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
	"jquery",
	"x_ite/Rendering/DepthBuffer",
	"x_ite/Bits/TraverseType",
	"standard/Math/Algorithm",
	"standard/Math/Algorithms/MergeSort",
	"standard/Math/Geometry/Camera",
	"standard/Math/Geometry/Box3",
	"standard/Math/Geometry/ViewVolume",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Vector4",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Utility/MatrixStack",
],
function ($,
          DepthBuffer,
	       TraverseType,
          Algorithm,
          MergeSort,
          Camera,
          Box3,
          ViewVolume,
          Vector3,
          Vector4,
          Rotation4,
          Matrix4,
          MatrixStack)
{
"use strict";

	var
		DEPTH_BUFFER_WIDTH          = 16,
		DEPTH_BUFFER_HEIGHT         = DEPTH_BUFFER_WIDTH,
		viewportArray               = new Int32Array (4),
		projectionMatrix            = new Matrix4 (),
		projectionMatrixArray       = new Float32Array (16),
		modelViewMatrix             = new Matrix4 (),
		cameraSpaceProjectionMatrix = new Matrix4 (),
		cameraSpaceMatrixArray      = new Float32Array (16),
		localOrientation            = new Rotation4 (0, 0, 1, 0),
		yAxis                       = new Vector3 (0, 1, 0),
		zAxis                       = new Vector3 (0, 0, 1),
		vector                      = new Vector3 (0, 0, 0),
		rotation                    = new Rotation4 (0, 0, 1, 0),
		depthBufferViewport         = new Vector4 (0, 0, DEPTH_BUFFER_WIDTH, DEPTH_BUFFER_HEIGHT),
		depthBufferViewVolume       = new ViewVolume (),
		collisionBox                = new Box3 (Vector3 .Zero, Vector3 .Zero),
		collisionSize               = new Vector3 (0, 0, 0);

	depthBufferViewVolume .set (Matrix4 .Identity, depthBufferViewport, depthBufferViewport);

	function compareDistance (lhs, rhs) { return lhs .distance < rhs .distance; }

	function X3DRenderObject (executionContext)
	{
		this .cameraSpaceMatrix        = new MatrixStack (Matrix4);
		this .inverseCameraSpaceMatrix = new MatrixStack (Matrix4);
		this .projectionMatrix         = new MatrixStack (Matrix4);
		this .modelViewMatrix          = new MatrixStack (Matrix4);
		this .viewVolumes              = [ ];
		this .shaderObjects            = [ ];
		this .globalLights             = [ ];
		this .lights                   = [ ];
		this .localFogs                = [ ];
		this .layouts                  = [ ];
		this .generatedCubeMapTextures = [ ];
		this .shaders                  = [ ];
		this .collisions               = [ ];
		this .numOpaqueShapes          = 0;
		this .numTransparentShapes     = 0;
		this .numCollisionShapes       = 0;
		this .numDepthShapes           = 0;
		this .opaqueShapes             = [ ];
		this .transparentShapes        = [ ];
		this .transparencySorter       = new MergeSort (this .transparentShapes, compareDistance);
		this .collisionShapes          = [ ];
		this .activeCollisions         = { };
		this .depthShapes              = [ ];
		this .invModelViewMatrix       = new Matrix4 ();
		this .speed                    = 0;

		try
		{
			this .depthBuffer = new DepthBuffer (executionContext .getBrowser (), DEPTH_BUFFER_WIDTH, DEPTH_BUFFER_HEIGHT);
		}
		catch (error)
		{
			console .error (error);

		   this .getDepth = function () { return 0; };
		}
	}

	X3DRenderObject .prototype =
	{
		constructor: X3DRenderObject,
		bboxSize: new Vector3 (0, 0, 0),
		bboxCenter: new Vector3 (0, 0, 0),
		translation: new Vector3 (0, 0, 0),
		initialize: function ()
		{ },
		isIndependent: function ()
		{
			return true;
		},
		getCameraSpaceMatrix: function ()
		{
			return this .cameraSpaceMatrix;
		},
		getInverseCameraSpaceMatrix: function ()
		{
			return this .inverseCameraSpaceMatrix;
		},
		getProjectionMatrix: function ()
		{
			return this .projectionMatrix;
		},
		getModelViewMatrix: function ()
		{
			return this .modelViewMatrix;
		},
		getViewVolumes: function ()
		{
			return this .viewVolumes;
		},
		getViewVolume: function ()
		{
			return this .viewVolumes [this .viewVolumes .length - 1];
		},
		getShaderObjects: function ()
		{
			return this .shaderObjects;
		},
		getGlobalLights: function ()
		{
			return this .globalLights;
		},
		getLights: function ()
		{
			return this .lights;
		},
		setGlobalFog: function (fog)
		{
			this .localFog = this .localFogs [0] = fog;
		},
		pushLocalFog: function (fog)
		{
			this .localFogs .push (fog);

			this .localFog = fog;
		},
		popLocalFog: function ()
		{
			this .localFogs .pop ();

			this .localFog = this .localFogs [this .localFogs .length - 1];
		},
		getLayouts: function ()
		{
			return this .layouts;
		},
		getParentLayout: function ()
		{
			return this .layouts .length ? this .layouts [this .layouts .length - 1] : null;
		},
		getGeneratedCubeMapTextures: function ()
		{
			return this .generatedCubeMapTextures;
		},
		getShaders: function ()
		{
			return this .shaders;
		},
		getCollisions: function ()
		{
			return this .collisions;
		},
		constrainTranslation: function (translation, stepBack)
		{
			///  Contrains @a translation to a possible value the avatar can move.  If the avatar reaches and intersects with an
			///  and obstacle and @a stepBack is true a translation in the opposite directiion is returned.  Future implementation will
			///  will then return a value where the avatar slides along the wall.  Modifies translation in place.

			var distance = this .getDistance (translation);

			// Constrain translation when the viewer collides with an obstacle.

			distance -= this .getNavigationInfo () .getCollisionRadius ();

			if (distance > 0)
			{
				// Move.
				
				var length = translation .abs ();

				if (length > distance)
				{
					// Collision, the avatar would intersect with the obstacle.
					
					return translation .normalize () .multiply (distance);
				}

				// Everything is fine.

				return translation;
			}

			// Collision, the avatar is already within an obstacle.

			if (stepBack)
				return this .constrainTranslation (translation .normalize () .multiply (distance), false);

			return translation .assign (Vector3 .Zero);
		},
		getDistance: function (direction)
		{
			///  Returns the distance to the closest object in @a direction.  The maximum determinable value is avatarHeight * 2.

			try
			{
			   var t0 = performance .now ();

				var
					viewpoint       = this .getViewpoint (),
					navigationInfo  = this .getNavigationInfo (),
					collisionRadius = navigationInfo .getCollisionRadius (),
					bottom          = navigationInfo .getStepHeight () - navigationInfo .getAvatarHeight (),
					nearValue       = navigationInfo .getNearValue (),
					avatarHeight    = navigationInfo .getAvatarHeight ();

				// Determine width and height of camera

				// Reshape camera

				Camera .ortho (-collisionRadius,
				               collisionRadius,
				               Math .min (bottom, -collisionRadius), /// TODO: bottom could be a positive value if stepHeight > avatarHeight.
				               collisionRadius,
				               nearValue,
				               Math .max (collisionRadius * 2, avatarHeight * 2),
				               projectionMatrix);

				// Translate camera to user position and to look in the direction of the direction.

				localOrientation .assign (viewpoint .orientation_ .getValue ()) .inverse () .multRight (viewpoint .getOrientation ());
				rotation .setFromToVec (zAxis, vector .assign (direction) .negate ()) .multRight (localOrientation);
				viewpoint .straightenHorizon (rotation);

				cameraSpaceProjectionMatrix .assign (viewpoint .getModelMatrix ());
				cameraSpaceProjectionMatrix .translate (viewpoint .getUserPosition ());
				cameraSpaceProjectionMatrix .rotate (rotation);
				cameraSpaceProjectionMatrix .inverse ();

				cameraSpaceProjectionMatrix .multRight (projectionMatrix);
				cameraSpaceProjectionMatrix .multLeft (viewpoint .getCameraSpaceMatrix ());

				this .getProjectionMatrix () .pushMatrix (cameraSpaceProjectionMatrix);

				var depth = this .getDepth (projectionMatrix);

				this .getProjectionMatrix () .pop ();

				this .collisionTime += performance .now () - t0;
				return -depth;
			}
			catch (error)
			{
				console .log (error);
			}
		},
		getDepth: function (projectionMatrix)
		{
			///  Returns the depth value to the closest object.  The maximum determinable value is avatarHeight * 2.

			this .depthBuffer .bind ();

			this .viewVolumes .push (depthBufferViewVolume);
			this .depth (this .collisionShapes, this .numCollisionShapes);
			this .viewVolumes .pop ();	

			var depth = this .depthBuffer .getDepth (projectionMatrix, depthBufferViewport);

			this .depthBuffer .unbind ();

			return depth;
		},
		render: function (type, group)
		{
			switch (type)
			{
				case TraverseType .COLLISION:
				{
					// Collect for collide and gravite
					this .numCollisionShapes = 0;

					group .traverse (type, this);
					this .collide ();
					this .gravite ();
					break;
				}
				case TraverseType .DEPTH:
				{
					this .numDepthShapes = 0;

					group .traverse (type, this);
					this .depth (this .depthShapes, this .numDepthShapes);
					break;
				}
				case TraverseType .DISPLAY:
				{
					this .lightIndex           = 0;
					this .numOpaqueShapes      = 0;
					this .numTransparentShapes = 0;

					this .setGlobalFog (this .getFog ());

					group .traverse (type, this);
					this .draw (group);
					break;
				}
			}
		},
		addCollisionShape: function (shapeNode)
		{
			var
				modelViewMatrix = this .getModelViewMatrix () .get (),
				bboxSize        = modelViewMatrix .multDirMatrix (this .bboxSize   .assign (shapeNode .getBBoxSize ())),
				bboxCenter      = modelViewMatrix .multVecMatrix (this .bboxCenter .assign (shapeNode .getBBoxCenter ())),
				radius          = bboxSize .abs () / 2,
				viewVolume      = this .viewVolumes [this .viewVolumes .length - 1];

			if (viewVolume .intersectsSphere (radius, bboxCenter))
			{
				if (this .numCollisionShapes === this .collisionShapes .length)
					this .collisionShapes .push ({ renderer: this, modelViewMatrix: new Float32Array (16), collisions: [ ], clipPlanes: [ ] });
	
				var context = this .collisionShapes [this .numCollisionShapes];
	
				++ this .numCollisionShapes;
	
				context .modelViewMatrix .set (modelViewMatrix);
				context .shapeNode = shapeNode;
				context .scissor   = viewVolume .getScissor ();
	
				// Collisions
	
				var
					sourceCollisions = this .getCollisions (),
					destCollisions   = context .collisions;
	
				for (var i = 0, length = sourceCollisions .length; i < length; ++ i)
				   destCollisions [i] = sourceCollisions [i];
				
				destCollisions .length = sourceCollisions .length;
	
				// Clip planes
	
				var
					sourcePlanes = this .getShaderObjects (),
					destPlanes   = context .clipPlanes;
	
				for (var i = 0, length = sourcePlanes .length; i < length; ++ i)
					destPlanes [i] = sourcePlanes [i];
				
				destPlanes .length = sourcePlanes .length;
	
				return true;
			}

			return false;
		},
		addDepthShape: function (shapeNode)
		{
			var
				modelViewMatrix = this .getModelViewMatrix () .get (),
				bboxSize        = modelViewMatrix .multDirMatrix (this .bboxSize   .assign (shapeNode .getBBoxSize ())),
				bboxCenter      = modelViewMatrix .multVecMatrix (this .bboxCenter .assign (shapeNode .getBBoxCenter ())),
				radius          = bboxSize .abs () / 2,
				viewVolume      = this .viewVolumes [this .viewVolumes .length - 1];

			if (viewVolume .intersectsSphere (radius, bboxCenter))
			{
				if (this .numDepthShapes === this .depthShapes .length)
					this .depthShapes .push ({ renderer: this, modelViewMatrix: new Float32Array (16), clipPlanes: [ ] });
	
				var context = this .depthShapes [this .numDepthShapes];
	
				++ this .numDepthShapes;
	
				context .modelViewMatrix .set (modelViewMatrix);
				context .shapeNode = shapeNode;
				context .scissor   = viewVolume .getScissor ();
	
				// Clip planes
	
				var
					sourcePlanes = this .getShaderObjects (),
					destPlanes   = context .clipPlanes;
	
				for (var i = 0, length = sourcePlanes .length; i < length; ++ i)
					destPlanes [i] = sourcePlanes [i];
				
				destPlanes .length = sourcePlanes .length;
	
				return true;
			}

			return false;
		},
		addDisplayShape: function (shapeNode)
		{
			var
				modelViewMatrix = this .getModelViewMatrix () .get (),
				bboxSize        = modelViewMatrix .multDirMatrix (this .bboxSize   .assign (shapeNode .getBBoxSize ())),
				bboxCenter      = modelViewMatrix .multVecMatrix (this .bboxCenter .assign (shapeNode .getBBoxCenter ())),
				radius          = bboxSize .abs () / 2,
				distance        = bboxCenter .z,
				viewVolume      = this .viewVolumes [this .viewVolumes .length - 1];

			if (viewVolume .intersectsSphere (radius, bboxCenter))
			{
				if (shapeNode .isTransparent ())
				{
					var num = this .numTransparentShapes;

					if (num === this .transparentShapes .length)
						this .transparentShapes .push (this .createShapeContext (true));

					var context = this .transparentShapes [num];

					++ this .numTransparentShapes;
				}
				else
				{
					var num = this .numOpaqueShapes;

					if (num === this .opaqueShapes .length)
						this .opaqueShapes .push (this .createShapeContext (false));

					var context = this .opaqueShapes [num];

					++ this .numOpaqueShapes;
				}

				context .modelViewMatrix .set (modelViewMatrix);
				context .scissor .assign (viewVolume .getScissor ());
				context .shapeNode = shapeNode;
				context .distance  = distance - radius;
				context .fogNode   = this .localFog;

				// Clip planes and local lights

				var
					sourceObjects = this .getShaderObjects (),
					destObjects   = context .shaderObjects;

				for (var i = 0, length = sourceObjects .length; i < length; ++ i)
					destObjects [i] = sourceObjects [i];
				
				destObjects .length = sourceObjects .length;

				return true;
			}

			return false;
		},
		createShapeContext: function (transparent)
		{
			return {
				renderer: this,
				transparent: true,
				geometryType: 3,
				colorMaterial: false,
				modelViewMatrix: new Float32Array (16),
				scissor: new Vector4 (0, 0, 0, 0),
				shaderObjects: [ ],
				linePropertiesNode: null,
				materialNode: null,
				textureNode: null,
				textureTransformNode: null,
				shaderNode: null,
			};
		},
		collide: function ()
		{
			// Collision nodes are handled here.

			var
				activeCollisions = { }, // current active Collision nodes
				collisionRadius2 = 2.2 * this .getNavigationInfo () .getCollisionRadius (); // Make the radius a little bit larger.

			collisionSize .set (collisionRadius2, collisionRadius2, collisionRadius2);

			for (var i = 0, length = this .numCollisionShapes; i < length; ++ i)
			{
				try
				{
					var
						context    = this .collisionShapes [i],
						collisions = context .collisions;

					if (collisions .length)
					{
					   collisionBox .set (collisionSize, Vector3 .Zero);
						collisionBox .multRight (this .invModelViewMatrix .assign (context .modelViewMatrix) .inverse ());

						if (context .shapeNode .intersectsBox (collisionBox, context .clipPlanes, modelViewMatrix .assign (context .modelViewMatrix)))
						{
						   for (var c = 0; c < collisions .length; ++ c)
								activeCollisions [collisions [c] .getId ()] = collisions [c];
						}
					}
				}
				catch (error)
				{
					console .log (error);
				}
			}

			// Set isActive to FALSE for affected nodes.

			if (! $.isEmptyObject (this .activeCollisions))
			{
				var inActiveCollisions = $.isEmptyObject (activeCollisions)
				                         ? this .activeCollisions
				                         : Algorithm .set_difference (this .activeCollisions, activeCollisions, { });
		
				for (var key in inActiveCollisions)
					inActiveCollisions [key] .set_active (false);
			}

			// Set isActive to TRUE for affected nodes.

			this .activeCollisions = activeCollisions;

			for (var key in activeCollisions)
				activeCollisions [key] .set_active (true);
		},
		gravite: function ()
		{
		   try
		   {
				// Terrain following and gravitation

				if (this .getBrowser () .getActiveLayer () === this)
				{
					if (this .getBrowser () .getCurrentViewer () !== "WALK")
						return;
				}
				else if (this .getNavigationInfo () .getViewer () !== "WALK")
					return;

				// Get NavigationInfo values

				var
					navigationInfo  = this .getNavigationInfo (),
					viewpoint       = this .getViewpoint (),
					collisionRadius = navigationInfo .getCollisionRadius (),
					nearValue       = navigationInfo .getNearValue (),
					avatarHeight    = navigationInfo .getAvatarHeight (),
					stepHeight      = navigationInfo .getStepHeight ();

				// Reshape viewpoint for gravite.

				Camera .ortho (-collisionRadius,
				               collisionRadius,
				               -collisionRadius,
				               collisionRadius,
				               nearValue,
				               Math .max (collisionRadius * 2, avatarHeight * 2),
				               projectionMatrix)

				// Transform viewpoint to look down the up vector

				var
					upVector = viewpoint .getUpVector (),
					down     = rotation .setFromToVec (zAxis, upVector);

				cameraSpaceProjectionMatrix .assign (viewpoint .getModelMatrix ());
				cameraSpaceProjectionMatrix .translate (viewpoint .getUserPosition ());
				cameraSpaceProjectionMatrix .rotate (down);
				cameraSpaceProjectionMatrix .inverse ();

				cameraSpaceProjectionMatrix .multRight (projectionMatrix);
				cameraSpaceProjectionMatrix .multLeft (viewpoint .getCameraSpaceMatrix ());

				this .getProjectionMatrix () .pushMatrix (cameraSpaceProjectionMatrix);

				var distance = -this .getDepth (projectionMatrix);

				this .getProjectionMatrix () .pop ();

				// Gravite or step up

				distance -= avatarHeight;

				var up = rotation .setFromToVec (yAxis, upVector);

				if (distance > 0)
				{
					// Gravite and fall down the to the floor

					var currentFrameRate = this .speed ? this .getBrowser () .getCurrentFrameRate () : 1000000;

					this .speed -= this .getBrowser () .getBrowserOptions () .Gravity_ .getValue () / currentFrameRate;

					var translation = this .speed / currentFrameRate;

					if (translation < -distance)
					{
						// The ground is reached.
						translation = -distance;
						this .speed = 0;
					}

					viewpoint .positionOffset_ = viewpoint .positionOffset_ .getValue () .add (up .multVecRot (vector .set (0, translation, 0)));
				}
				else
				{
					this .speed = 0;

					distance = -distance;

					if (distance > 0.01 && distance < stepHeight)
					{
						// Step up
						var translation = this .constrainTranslation (up .multVecRot (this .translation .set (0, distance, 0)), false);

						//if (getBrowser () -> getBrowserOptions () -> animateStairWalks ())
						//{
						//	float step = getBrowser () -> getCurrentSpeed () / getBrowser () -> getCurrentFrameRate ();
						//	step = abs (getInverseCameraSpaceMatrix () .mult_matrix_dir (Vector3f (0, step, 0) * up));
						//
						//	Vector3f offset = Vector3f (0, step, 0) * up;
						//
						//	if (math::abs (offset) > math::abs (translation) or getBrowser () -> getCurrentSpeed () == 0)
						//		offset = translation;
						//
						//	getViewpoint () -> positionOffset () += offset;
						//}
						//else
							viewpoint .positionOffset_ = translation .add (viewpoint .positionOffset_ .getValue ());
					}
				}
			}
			catch (error)
			{
			   console .log (error);
			}
		},
		depth: function (shapes, numShapes)
		{
			var
				browser    = this .getBrowser (),
				gl         = browser .getContext (),
				viewport   = this .getViewVolume () .getViewport (),
				shaderNode = browser .getDepthShader ();

			// Configure depth shader.

			shaderNode .useProgram (gl);

			projectionMatrixArray .set (this .getProjectionMatrix () .get ());

			gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);

			// Configure viewport and background

			gl .viewport (viewport [0],
			              viewport [1],
			              viewport [2],
			              viewport [3]);

			gl .scissor (viewport [0],
			             viewport [1],
			             viewport [2],
			             viewport [3]);

			gl .clearColor (1, 0, 0, 0);
			gl .clear (gl .COLOR_BUFFER_BIT | gl .DEPTH_BUFFER_BIT);

			// Render all objects

			gl .enable (gl .DEPTH_TEST);
			gl .depthMask (true);
			gl .disable (gl .BLEND);
			gl .disable (gl .CULL_FACE);

			for (var s = 0; s < numShapes; ++ s)
			{
				var
					context = shapes [s],
					scissor = context .scissor;

				// TODO: viewport must not be the browser or layer viewport.
				gl .scissor (scissor .x,
				             scissor .y,
				             scissor .z,
				             scissor .w);

				// Clip planes

				shaderNode .setShaderObjects (gl, context .clipPlanes);

				// modelViewMatrix
	
				gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix, false, context .modelViewMatrix);

				// Draw
	
				context .shapeNode .depth (context, shaderNode);
			}
		},
		draw: function (group)
		{
			var
				browser                  = this .getBrowser (),
				gl                       = browser .getContext (),
				viewport                 = this .getViewVolume () .getViewport (),
				shaders                  = this .shaders,
				lights                   = this .lights,
				generatedCubeMapTextures = this .generatedCubeMapTextures;


			// PREPARATIONS


			if (this .isIndependent ())
			{
				// Render shadow maps.

				for (var i = 0, length = lights .length; i < length; ++ i)
					lights [i] .renderShadowMap (this);
	
				// Render GeneratedCubeMapTextures.
			
				for (var i = 0, length = generatedCubeMapTextures .length; i < length; ++ i)
					generatedCubeMapTextures [i] .renderTexture (this, group);
			}


			// DRAW


			// Set shadow matrix for all lights.

			browser .getHeadlight () .setGlobalVariables (this);

			for (var i = 0, length = lights .length; i < length; ++ i)
				lights [i] .setGlobalVariables (this);

			// Configure viewport and background

			gl .viewport (viewport [0],
			              viewport [1],
			              viewport [2],
			              viewport [3]);

			gl .scissor (viewport [0],
			             viewport [1],
			             viewport [2],
			             viewport [3]);

			gl .clear (gl .DEPTH_BUFFER_BIT);

			this .getBackground () .display (this, viewport);

			// Sorted blend

			viewportArray          .set (viewport);
			cameraSpaceMatrixArray .set (this .getCameraSpaceMatrix () .get ());
			projectionMatrixArray  .set (this .getProjectionMatrix () .get ());

			browser .getPointShader   () .setGlobalUniforms (this, gl, cameraSpaceMatrixArray, projectionMatrixArray, viewportArray);
			browser .getLineShader    () .setGlobalUniforms (this, gl, cameraSpaceMatrixArray, projectionMatrixArray, viewportArray);
			browser .getDefaultShader () .setGlobalUniforms (this, gl, cameraSpaceMatrixArray, projectionMatrixArray, viewportArray);

			for (var id in shaders)
				shaders [id] .setGlobalUniforms (this, gl, cameraSpaceMatrixArray, projectionMatrixArray, viewportArray);

			// Render opaque objects first

			gl .enable (gl .DEPTH_TEST);
			gl .depthMask (true);
			gl .disable (gl .BLEND);

			for (var i = 0; i < this .numOpaqueShapes; ++ i)
			{
				var
					context = this .opaqueShapes [i],
					scissor = context .scissor;

				gl .scissor (scissor .x,
				             scissor .y,
				             scissor .z,
				             scissor .w);

				context .shapeNode .display (context);
			}

			// Render transparent objects

			gl .depthMask (false);
			gl .enable (gl .BLEND);

			this .transparencySorter .sort (0, this .numTransparentShapes);

			for (var i = 0; i < this .numTransparentShapes; ++ i)
			{
				var
					context = this .transparentShapes [i],
					scissor = context .scissor;

				gl .scissor (scissor .x,
				             scissor .y,
				             scissor .z,
				             scissor .w);

				context .shapeNode .display (context);
			}

			gl .depthMask (true);
			gl .disable (gl .BLEND);


			// POST DRAW


			gl .activeTexture (gl .TEXTURE0);

			// Reset GeneratedCubeMapTextures.

			generatedCubeMapTextures .length = 0;

			if (this .isIndependent ())
			{
				// Recycle clip planes.

				var clipPlanes = this .getBrowser () .getClipPlanes ();
	
				for (var i = 0, length = clipPlanes .length; i < length; ++ i)
				   clipPlanes [i] .dispose ();
	
				clipPlanes .length = 0;

				// Recycle global lights.
	
				var lights = this .globalLights;
	
				for (var i = 0, length = lights .length; i < length; ++ i)
				   lights [i] .dispose ();
	
				// Recycle local lights.
	
				var lights = this .getBrowser () .getLocalLights ();
	
				for (var i = 0, length = lights .length; i < length; ++ i)
				   lights [i] .dispose ();
	
				lights .length = 0;
			}

			this .globalLights .length = 0;
			this .lights       .length = 0;
		},
	};

	return X3DRenderObject;
});
