/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import TextureBuffer from "./TextureBuffer.js";
import TraverseType  from "./TraverseType.js";
import Algorithm     from "../../standard/Math/Algorithm.js";
import MergeSort     from "../../standard/Math/Algorithms/MergeSort.js";
import Camera        from "../../standard/Math/Geometry/Camera.js";
import Box3          from "../../standard/Math/Geometry/Box3.js";
import Line3         from "../../standard/Math/Geometry/Line3.js";
import ViewVolume    from "../../standard/Math/Geometry/ViewVolume.js";
import Vector3       from "../../standard/Math/Numbers/Vector3.js";
import Vector4       from "../../standard/Math/Numbers/Vector4.js";
import Rotation4     from "../../standard/Math/Numbers/Rotation4.js";
import Matrix4       from "../../standard/Math/Numbers/Matrix4.js";
import MatrixStack   from "../../standard/Math/Utility/MatrixStack.js";

const
   DEPTH_BUFFER_WIDTH  = 16,
   DEPTH_BUFFER_HEIGHT = DEPTH_BUFFER_WIDTH;

function compareDistance (lhs, rhs) { return lhs .distance < rhs .distance; }

function X3DRenderObject (executionContext)
{
   this .viewVolumes              = [ ];
   this .cameraSpaceMatrix        = new MatrixStack (Matrix4);
   this .viewMatrix               = new MatrixStack (Matrix4);
   this .projectionMatrix         = new MatrixStack (Matrix4);
   this .modelViewMatrix          = new MatrixStack (Matrix4);
   this .viewportArray            = new Int32Array (4);
   this .projectionMatrixArray    = new Float32Array (16);
   this .cameraSpaceMatrixArray   = new Float32Array (16);
   this .hitRay                   = new Line3 (Vector3 .Zero, Vector3 .Zero);
   this .sensors                  = [[ ]];
   this .localObjectsCount        = [0, 0, 0];
   this .globalObjects            = [ ];
   this .localObjects             = [ ];
   this .lights                   = [ ];
   this .globalShadows            = [ false ];
   this .localShadows             = [ false ];
   this .localFogs                = [ null ];
   this .layouts                  = [ ];
   this .textureProjectors        = [ ];
   this .generatedCubeMapTextures = [ ];
   this .collisions               = [ ];
   this .numPointingShapes        = 0;
   this .numCollisionShapes       = 0;
   this .numShadowShapes          = 0;
   this .numOpaqueShapes          = 0;
   this .numTransparentShapes     = 0;
   this .pointingShapes           = [ ];
   this .collisionShapes          = [ ];
   this .activeCollisions         = new Set ();
   this .shadowShapes             = [ ];
   this .opaqueShapes             = [ ];
   this .transparentShapes        = [ ];
   this .transparencySorter       = new MergeSort (this .transparentShapes, compareDistance);
   this .speed                    = 0;

   try
   {
      this .depthBuffer = new TextureBuffer (executionContext .getBrowser (), DEPTH_BUFFER_WIDTH, DEPTH_BUFFER_HEIGHT, true);
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
   initialize: function ()
   { },
   isIndependent: function ()
   {
      return true;
   },
   getRenderTime: function ()
   {
      return this .renderTime;
   },
   getViewVolumes: function ()
   {
      return this .viewVolumes;
   },
   getViewVolume: function ()
   {
      return this .viewVolumes .at (-1);
   },
   getCameraSpaceMatrix: function ()
   {
      return this .cameraSpaceMatrix;
   },
   getViewMatrix: function ()
   {
      return this .viewMatrix;
   },
   getProjectionMatrix: function ()
   {
      return this .projectionMatrix;
   },
   getModelViewMatrix: function ()
   {
      return this .modelViewMatrix;
   },
   getViewportArray: function ()
   {
      return this .viewportArray;
   },
   getProjectionMatrixArray: function ()
   {
      return this .projectionMatrixArray;
   },
   getCameraSpaceMatrixArray: function ()
   {
      return this .cameraSpaceMatrixArray;
   },
   getHitRay: function ()
   {
      return this .hitRay;
   },
   getSensors: function ()
   {
      return this .sensors;
   },
   getGlobalObjects: function ()
   {
      return this .globalObjects;
   },
   getLocalObjects: function ()
   {
      return this .localObjects;
   },
   getLocalObjectsCount: function ()
   {
      return this .localObjectsCount;
   },
   getLights: function ()
   {
      return this .lights;
   },
   pushGlobalShadows: function (value)
   {
      this .globalShadows .push (value || this .globalShadows .at (-1));
   },
   getGlobalShadows: function ()
   {
      return this .globalShadows;
   },
   pushLocalShadows: function (value)
   {
      this .localShadows .push (value || this .localShadows .at (-1));
   },
   popLocalShadows: function ()
   {
      this .localShadows .pop ();
   },
   setGlobalFog: (function ()
   {
      const modelViewMatrix = new Matrix4 ();

      return function (fogNode)
      {
         if (fogNode .getFogType ())
         {
            const fogContainer = this .localFogs [0] || fogNode .getFogs () .pop ();

            modelViewMatrix .assign (fogNode .getModelMatrix ()) .multRight (this .getViewMatrix () .get ());
            fogContainer .set (fogNode, modelViewMatrix);

            this .localFogs [0] = fogContainer;
         }
         else
         {
            this .localFogs [0] = null;
         }
      };
   })(),
   getLocalFogs: function ()
   {
      return this .localFogs;
   },
   getLayouts: function ()
   {
      return this .layouts;
   },
   getParentLayout: function ()
   {
      return this .layouts .at (-1);
   },
   getTextureProjectors: function ()
   {
      return this .textureProjectors;
   },
   getGeneratedCubeMapTextures: function ()
   {
      return this .generatedCubeMapTextures;
   },
   getCollisions: function ()
   {
      return this .collisions;
   },
   setNumPointingShapes: function (value)
   {
      this .numPointingShapes = value;
   },
   getNumPointingShapes: function ()
   {
      return this .numPointingShapes;
   },
   getPointingShapes: function ()
   {
      return this .pointingShapes;
   },
   setNumCollisionShapes: function (value)
   {
      this .numCollisionShapes = value;
   },
   getNumCollisionShapes: function ()
   {
      return this .numCollisionShapes;
   },
   getCollisionShapes: function ()
   {
      return this .collisionShapes;
   },
   setNumShadowShapes: function (value)
   {
      this .numShadowShapes = value;
   },
   getNumShadowShapes: function ()
   {
      return this .numShadowShapes;
   },
   getShadowShapes: function ()
   {
      return this .shadowShapes;
   },
   setNumOpaqueShapes: function (value)
   {
      this .numOpaqueShapes = value;
   },
   getNumOpaqueShapes: function ()
   {
      return this .numOpaqueShapes;
   },
   getOpaqueShapes: function ()
   {
      return this .opaqueShapes;
   },
   setNumTransparentShapes: function (value)
   {
      this .numTransparentShapes = value;
   },
   getNumTransparentShapes: function ()
   {
      return this .numTransparentShapes;
   },
   getTransparentShapes: function ()
   {
      return this .transparentShapes;
   },
   constrainTranslation: function (translation, stepBack)
   {
      ///  Contrains @a translation to a possible value the avatar can move.  If the avatar reaches and intersects with an
      ///  and obstacle and @a stepBack is true a translation in the opposite directiion is returned.  Future implementation will
      ///  will then return a value where the avatar slides along the wall.  Modifies translation in place.

      // Constrain translation when the viewer collides with an obstacle.

      const distance = this .getDistance (translation) - this .getNavigationInfo () .getCollisionRadius ();

      if (distance > 0)
      {
         // Move.

         const length = translation .magnitude ();

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
   getDistance: (function ()
   {
      const
         projectionMatrix            = new Matrix4 (),
         cameraSpaceProjectionMatrix = new Matrix4 (),
         localOrientation            = new Rotation4 (0, 0, 1, 0),
         vector                      = new Vector3 (0, 0, 0),
         rotation                    = new Rotation4 (0, 0, 1, 0);

      return function (direction)
      {
         ///  Returns the distance to the closest object in @a direction.  The maximum determinable value is avatarHeight * 2.

         const t0 = Date .now ();

         const
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

         localOrientation .assign (viewpoint ._orientation .getValue ()) .inverse () .multRight (viewpoint .getOrientation ());
         rotation .setFromToVec (Vector3 .zAxis, vector .assign (direction) .negate ()) .multRight (localOrientation);
         viewpoint .straightenHorizon (rotation);

         cameraSpaceProjectionMatrix .assign (viewpoint .getModelMatrix ());
         cameraSpaceProjectionMatrix .translate (viewpoint .getUserPosition ());
         cameraSpaceProjectionMatrix .rotate (rotation);
         cameraSpaceProjectionMatrix .inverse ();

         cameraSpaceProjectionMatrix .multRight (projectionMatrix);
         cameraSpaceProjectionMatrix .multLeft (viewpoint .getCameraSpaceMatrix ());

         this .getProjectionMatrix () .pushMatrix (cameraSpaceProjectionMatrix);

         const depth = this .getDepth (projectionMatrix);

         this .getProjectionMatrix () .pop ();

         this .collisionTime += Date .now () - t0;
         return -depth;
      };
   })(),
   getDepth: (function ()
   {
      const
         depthBufferViewport   = new Vector4 (0, 0, DEPTH_BUFFER_WIDTH, DEPTH_BUFFER_HEIGHT),
         depthBufferViewVolume = new ViewVolume ();

      depthBufferViewVolume .set (Matrix4 .Identity, depthBufferViewport, depthBufferViewport);

      return function (projectionMatrix)
      {
         ///  Returns the depth value to the closest object.  The maximum determinable value is avatarHeight * 2.

         this .depthBuffer .bind ();
         this .viewVolumes .push (depthBufferViewVolume);

         this .depth (this .collisionShapes, this .numCollisionShapes);

         const depth = this .depthBuffer .getDepth (projectionMatrix, depthBufferViewport);

         this .viewVolumes .pop ();
         this .depthBuffer .unbind ();

         return depth;
      };
   })(),
   render: function (type, callback, group)
   {
      switch (type)
      {
         case TraverseType .POINTER:
         {
            this .numPointingShapes = 0;

            callback .call (group, type, this);
            this .pointing (this .pointingShapes, this .numPointingShapes);
            break;
         }
         case TraverseType .COLLISION:
         {
            // Collect for collide and gravite
            this .numCollisionShapes = 0;

            callback .call (group, type, this);
            this .collide ();
            this .gravite ();
            break;
         }
         case TraverseType .SHADOW:
         {
            this .numShadowShapes = 0;

            callback .call (group, type, this);
            this .depth (this .shadowShapes, this .numShadowShapes);
            break;
         }
         case TraverseType .DISPLAY:
         {
            this .lightIndex           = 0;
            this .numOpaqueShapes      = 0;
            this .numTransparentShapes = 0;

            this .setGlobalFog (this .getFog ());

            callback .call (group, type, this);
            this .draw ();
            break;
         }
      }
   },
   setHitRay: function (projectionMatrix, viewport, pointer)
   {
      ViewVolume .unProjectRay (pointer .x, pointer .y, Matrix4 .Identity, projectionMatrix, viewport, this .hitRay);
   },
   addPointingShape: (function ()
   {
      const
         bboxSize   = new Vector3 (0, 0, 0),
         bboxCenter = new Vector3 (0, 0, 0);

      return function (shapeNode)
      {
         const modelViewMatrix = this .getModelViewMatrix () .get ();

         modelViewMatrix .multDirMatrix (bboxSize   .assign (shapeNode .getBBoxSize ()));
         modelViewMatrix .multVecMatrix (bboxCenter .assign (shapeNode .getBBoxCenter ()));

         const
            radius     = bboxSize .magnitude () / 2,
            viewVolume = this .viewVolumes .at (-1);

         if (viewVolume .intersectsSphere (radius, bboxCenter))
         {
            const num = this .numPointingShapes ++;

            if (num === this .pointingShapes .length)
            {
               this .pointingShapes .push ({ renderObject: this, modelViewMatrix: new Float32Array (16), clipPlanes: [ ], sensors: [ ] });
            }

            const pointingContext = this .pointingShapes [num];

            pointingContext .modelViewMatrix .set (modelViewMatrix);
            pointingContext .shapeNode = shapeNode;
            pointingContext .scissor   = viewVolume .getScissor ();

            // Clip planes & sensors

            assign (pointingContext .clipPlanes, this .localObjects);
            assign (pointingContext .sensors,    this .sensors .at (-1));

            return true;
         }

         return false;
      };
   })(),
   addCollisionShape: (function ()
   {
      const
         bboxSize   = new Vector3 (0, 0, 0),
         bboxCenter = new Vector3 (0, 0, 0);

      return function (shapeNode)
      {
         const modelViewMatrix = this .getModelViewMatrix () .get ();

         modelViewMatrix .multDirMatrix (bboxSize   .assign (shapeNode .getBBoxSize ()));
         modelViewMatrix .multVecMatrix (bboxCenter .assign (shapeNode .getBBoxCenter ()));

         const
            radius     = bboxSize .magnitude () / 2,
            viewVolume = this .viewVolumes .at (-1);

         if (viewVolume .intersectsSphere (radius, bboxCenter))
         {
            const num = this .numCollisionShapes ++;

            if (num === this .collisionShapes .length)
            {
               this .collisionShapes .push ({ renderObject: this, modelViewMatrix: new Float32Array (16), collisions: [ ], clipPlanes: [ ] });
            }

            const collisionContext = this .collisionShapes [num];

            collisionContext .modelViewMatrix .set (modelViewMatrix);
            collisionContext .shapeNode = shapeNode;
            collisionContext .scissor   = viewVolume .getScissor ();

            // Collisions

            assign (collisionContext .collisions, this .collisions);

            // Clip planes

            assign (collisionContext .clipPlanes, this .localObjects);

            return true;
         }

         return false;
      };
   })(),
   addShadowShape: (function ()
   {
      const
         bboxSize   = new Vector3 (0, 0, 0),
         bboxCenter = new Vector3 (0, 0, 0);

      return function (shapeNode)
      {
         const modelViewMatrix = this .getModelViewMatrix () .get ();

         modelViewMatrix .multDirMatrix (bboxSize   .assign (shapeNode .getBBoxSize ()));
         modelViewMatrix .multVecMatrix (bboxCenter .assign (shapeNode .getBBoxCenter ()));

         const
            radius     = bboxSize .magnitude () / 2,
            viewVolume = this .viewVolumes .at (-1);

         if (viewVolume .intersectsSphere (radius, bboxCenter))
         {
            const num = this .numShadowShapes ++;

            if (num === this .shadowShapes .length)
            {
               this .shadowShapes .push ({ renderObject: this, modelViewMatrix: new Float32Array (16), clipPlanes: [ ] });
            }

            const depthContext = this .shadowShapes [num];

            depthContext .modelViewMatrix .set (modelViewMatrix);
            depthContext .shapeNode = shapeNode;
            depthContext .scissor   = viewVolume .getScissor ();

            // Clip planes

            assign (depthContext .clipPlanes, this .localObjects);

            return true;
         }

         return false;
      };
   })(),
   addDisplayShape: (function ()
   {
      const
         bboxSize   = new Vector3 (0, 0, 0),
         bboxCenter = new Vector3 (0, 0, 0);

      return function (shapeNode)
      {
         const modelViewMatrix = this .getModelViewMatrix () .get ();

         modelViewMatrix .multDirMatrix (bboxSize   .assign (shapeNode .getBBoxSize ()));
         modelViewMatrix .multVecMatrix (bboxCenter .assign (shapeNode .getBBoxCenter ()));

         const
            radius     = bboxSize .magnitude () / 2,
            viewVolume = this .viewVolumes .at (-1);

         if (viewVolume .intersectsSphere (radius, bboxCenter))
         {
            if (shapeNode .getTransparent ())
            {
               const num = this .numTransparentShapes ++;

               if (num === this .transparentShapes .length)
                  this .transparentShapes .push (this .createRenderContext (true));

               var renderContext = this .transparentShapes [num];
            }
            else
            {
               const num = this .numOpaqueShapes ++;

               if (num === this .opaqueShapes .length)
                  this .opaqueShapes .push (this .createRenderContext (false));

               var renderContext = this .opaqueShapes [num];
            }

            renderContext .modelViewMatrix .set (modelViewMatrix);
            renderContext .scissor .assign (viewVolume .getScissor ());
            renderContext .shadows         = this .localShadows .at (-1);
            renderContext .fogNode         = this .localFogs .at (-1);
            renderContext .shapeNode       = shapeNode;
            renderContext .appearanceNode  = shapeNode .getAppearance ();
            renderContext .distance        = bboxCenter .z;

            // Clip planes and local lights

            assign (renderContext .objectsCount, this .localObjectsCount);
            assign (renderContext .localObjects, this .localObjects);

            return true;
         }

         return false;
      };
   })(),
   createRenderContext: function (transparent)
   {
      return {
         renderObject: this,
         transparent: transparent,
         modelViewMatrix: new Float32Array (16),
         scissor: new Vector4 (0, 0, 0, 0),
         localObjects: [ ],
         objectsCount: [0, 0, 0],
      };
   },
   pointing: (function ()
   {
      const projectionMatrixArray = new Float32Array (16);

      return function (shapes, numShapes)
      {
         const
            browser  = this .getBrowser (),
            gl       = browser .getContext (),
            viewport = this .getViewVolume () .getViewport ();

         // Configure depth shaders.

         projectionMatrixArray .set (this .getProjectionMatrix () .get ());

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

         // Render all objects

         gl .depthMask (true);
         gl .enable (gl .DEPTH_TEST);
         gl .disable (gl .BLEND);
         gl .disable (gl .CULL_FACE);

         for (let s = 0; s < numShapes; ++ s)
         {
            const
               renderContext       = shapes [s],
               { scissor, clipPlanes, modelViewMatrix, shapeNode } = renderContext,
               appearanceNode      = shapeNode .getAppearance (),
               geometryContext     = shapeNode .getGeometryContext (),
               stylePropertiesNode = appearanceNode .getStyleProperties (geometryContext .geometryType),
               shaderNode          = browser .getPointingShader (clipPlanes .length, shapeNode),
               id                  = browser .addPointingShape (renderContext);

            gl .scissor (scissor .x,
                         scissor .y,
                         scissor .z,
                         scissor .w);
            // Draw

            shaderNode .enable (gl);
            shaderNode .setClipPlanes (gl, clipPlanes);

            gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrix);
            gl .uniform1f (shaderNode .x3d_Id, id);

            if (stylePropertiesNode)
               stylePropertiesNode .setShaderUniforms (gl, shaderNode);

            shapeNode .displaySimple (gl, renderContext, shaderNode);
         }
      };
   })(),
   collide: (function ()
   {
      const
         invModelViewMatrix = new Matrix4 (),
         modelViewMatrix    = new Matrix4 (),
         collisionBox       = new Box3 (Vector3 .Zero, Vector3 .Zero),
         collisionSize      = new Vector3 (0, 0, 0);

      return function ()
      {
         // Collision nodes are handled here.

         const
            activeCollisions = new Set (), // current active Collision nodes
            collisionRadius2 = 2.2 * this .getNavigationInfo () .getCollisionRadius (); // Make the radius a little bit larger.

         collisionSize .set (collisionRadius2, collisionRadius2, collisionRadius2);

         for (let i = 0, length = this .numCollisionShapes; i < length; ++ i)
         {
            const
               collisionContext = this .collisionShapes [i],
               collisions       = collisionContext .collisions;

            if (collisions .length)
            {
               collisionBox .set (collisionSize, Vector3 .Zero);
               collisionBox .multRight (invModelViewMatrix .assign (collisionContext .modelViewMatrix) .inverse ());

               if (collisionContext .shapeNode .intersectsBox (collisionBox, collisionContext .clipPlanes, modelViewMatrix .assign (collisionContext .modelViewMatrix)))
               {
                  for (const collision of collisions)
                     activeCollisions .add (collision);
               }
            }
         }

         // Set isActive to FALSE for affected nodes.

         if (this .activeCollisions .size)
         {
            const inActiveCollisions = activeCollisions .size
                                       ? Algorithm .set_difference (this .activeCollisions, activeCollisions, new Set ())
                                       : this .activeCollisions;

            for (const collision of inActiveCollisions)
               collision .set_active (false);
         }

         // Set isActive to TRUE for affected nodes.

         this .activeCollisions = activeCollisions;

         for (const collision of activeCollisions)
            collision .set_active (true);
      };
   })(),
   gravite: (function ()
   {
      const
         projectionMatrix            = new Matrix4 (),
         cameraSpaceProjectionMatrix = new Matrix4 (),
         translation                 = new Vector3 (0, 0, 0),
         rotation                    = new Rotation4 (0, 0, 1, 0);

      return function ()
      {
         const browser = this .getBrowser ();

         // Terrain following and gravitation.

         if (browser .getActiveLayer () === this)
         {
            if (browser .getCurrentViewer () !== "WALK")
               return;
         }
         else if (this .getNavigationInfo () .getViewer () !== "WALK")
         {
            return;
         }

         // Get NavigationInfo values.

         const
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
                        projectionMatrix);

         // Transform viewpoint to look down the up vector.

         const
            upVector = viewpoint .getUpVector (),
            down     = rotation .setFromToVec (Vector3 .zAxis, upVector);

         cameraSpaceProjectionMatrix .assign (viewpoint .getModelMatrix ());
         cameraSpaceProjectionMatrix .translate (viewpoint .getUserPosition ());
         cameraSpaceProjectionMatrix .rotate (down);
         cameraSpaceProjectionMatrix .inverse ();

         cameraSpaceProjectionMatrix .multRight (projectionMatrix);
         cameraSpaceProjectionMatrix .multLeft (viewpoint .getCameraSpaceMatrix ());

         this .getProjectionMatrix () .pushMatrix (cameraSpaceProjectionMatrix);

         let distance = -this .getDepth (projectionMatrix);

         this .getProjectionMatrix () .pop ();

         // Gravite or step up.

         distance -= avatarHeight;

         const up = rotation .setFromToVec (Vector3 .yAxis, upVector);

         if (distance > 0)
         {
            // Gravite and fall down the to the floor.

            const currentFrameRate = this .speed ? browser .getCurrentFrameRate () : 1000000;

            this .speed -= browser .getBrowserOptions () ._Gravity .getValue () / currentFrameRate;

            let y = this .speed / currentFrameRate;

            if (y < -distance)
            {
               // The ground is reached.
               y = -distance;
               this .speed = 0;
            }

            viewpoint ._positionOffset = viewpoint ._positionOffset .getValue () .add (up .multVecRot (translation .set (0, y, 0)));
         }
         else
         {
            this .speed = 0;

            distance = -distance;

            if (distance > 0.01 && distance < stepHeight)
            {
               // Step up.

               this .constrainTranslation (up .multVecRot (translation .set (0, distance, 0)), false);

               //if (getBrowser () -> getBrowserOptions () -> animateStairWalks ())
               //{
               //	float step = getBrowser () -> getCurrentSpeed () / getBrowser () -> getCurrentFrameRate ();
               //	step = abs (getViewMatrix () .mult_matrix_dir (Vector3f (0, step, 0) * up));
               //
               //	Vector3f offset = Vector3f (0, step, 0) * up;
               //
               //	if (math::abs (offset) > math::abs (translation) or getBrowser () -> getCurrentSpeed () == 0)
               //		offset = translation;
               //
               //	getViewpoint () -> positionOffset () += offset;
               //}
               //else
                  viewpoint ._positionOffset = translation .add (viewpoint ._positionOffset .getValue ());
            }
         }
      };
   })(),
   depth: (function ()
   {
      const projectionMatrixArray = new Float32Array (16);

      return function (shapes, numShapes)
      {
         const
            browser  = this .getBrowser (),
            gl       = browser .getContext (),
            viewport = this .getViewVolume () .getViewport ();

         // Configure depth shaders.

         projectionMatrixArray .set (this .getProjectionMatrix () .get ());

         // Configure viewport and background

         gl .viewport (viewport [0],
                       viewport [1],
                       viewport [2],
                       viewport [3]);

         gl .scissor (viewport [0],
                      viewport [1],
                      viewport [2],
                      viewport [3]);

         gl .clearColor (1, 0, 0, 0); // '1' for infinity, '0 0 0' for normal (TODO).
         gl .clear (gl .COLOR_BUFFER_BIT | gl .DEPTH_BUFFER_BIT);

         // Render all objects

         gl .depthMask (true);
         gl .enable (gl .DEPTH_TEST);
         gl .disable (gl .BLEND);
         gl .disable (gl .CULL_FACE);

         for (let s = 0; s < numShapes; ++ s)
         {
            const
               renderContext = shapes [s],
               { scissor, clipPlanes, modelViewMatrix, shapeNode } = renderContext,
               shaderNode = browser .getDepthShader (clipPlanes .length, shapeNode .getShapeKey () !== 0);

            gl .scissor (scissor .x,
                         scissor .y,
                         scissor .z,
                         scissor .w);
            // Draw

            shaderNode .enable (gl);
            shaderNode .setClipPlanes (gl, clipPlanes);

            gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrix);

            shapeNode .displaySimple (gl, renderContext, shaderNode);
         }
      };
   })(),
   draw: function ()
   {
      const
         browser                    = this .getBrowser (),
         gl                         = browser .getContext (),
         viewport                   = this .getViewVolume () .getViewport (),
         globalObjects              = this .globalObjects,
         lights                     = this .lights,
         textureProjectors          = this .textureProjectors,
         generatedCubeMapTextures   = this .generatedCubeMapTextures,
         globalShadows              = this .globalShadows,
         shadows                    = globalShadows .at (-1),
         headlight                  = this .getNavigationInfo () ._headlight .getValue (),
         numGlobalLights            = globalObjects .reduce ((n, c) => n + !!c .lightNode, 0),
         numGlobalTextureProjectors = globalObjects .reduce ((n, c) => n + !!c .textureProjectorNode, 0);


      this .renderTime = Date .now ();


      // PREPARATIONS


      if (this .isIndependent ())
      {
         // Render shadow maps.

         for (const light of lights)
            light .renderShadowMap (this);

         // Render GeneratedCubeMapTextures.

         for (const generatedCubeMapTexture of generatedCubeMapTextures)
            generatedCubeMapTexture .renderTexture (this);
      }

      // Set up shadow matrix for all lights, and matrix for all projective textures.

      if (headlight)
         browser .getHeadlight () .setGlobalVariables (this);

      for (const light of lights)
         light .setGlobalVariables (this);

      for (const textureProjector of textureProjectors)
         textureProjector .setGlobalVariables (this);

      // Set global uniforms.

      this .viewportArray          .set (viewport);
      this .cameraSpaceMatrixArray .set (this .getCameraSpaceMatrix () .get ());
      this .projectionMatrixArray  .set (this .getProjectionMatrix () .get ());


      // DRAW


      // Configure viewport and background

      gl .viewport (viewport .x,
                    viewport .y,
                    viewport .z,
                    viewport .w);

      gl .scissor (viewport .x,
                   viewport .y,
                   viewport .z,
                   viewport .w);

      // Draw background.

      gl .clear (gl .DEPTH_BUFFER_BIT);

      this .getBackground () .display (gl, this, viewport);

      // Sorted blend

      // Render opaque objects first

      gl .depthMask (true);
      gl .enable (gl .DEPTH_TEST);
      gl .disable (gl .BLEND);

      const opaqueShapes = this .opaqueShapes;

      for (let i = 0, length = this .numOpaqueShapes; i < length; ++ i)
      {
         const
            renderContext = opaqueShapes [i],
            scissor       = renderContext .scissor;

         gl .scissor (scissor .x,
                      scissor .y,
                      scissor .z,
                      scissor .w);

         renderContext .shadows           = renderContext .shadows || shadows;
         renderContext .objectsCount [1] += numGlobalLights;
         renderContext .objectsCount [2] += numGlobalTextureProjectors;

         renderContext .shapeNode .display (gl, renderContext);
         browser .resetTextureUnits ();
      }

      // Render transparent objects

      gl .depthMask (false);
      gl .enable (gl .BLEND);

      const transparentShapes = this .transparentShapes;

      this .transparencySorter .sort (0, this .numTransparentShapes);

      for (let i = 0, length = this .numTransparentShapes; i < length; ++ i)
      {
         const
            renderContext = transparentShapes [i],
            scissor       = renderContext .scissor;

         gl .scissor (scissor .x,
                      scissor .y,
                      scissor .z,
                      scissor .w);

         renderContext .shadows           = renderContext .shadows || shadows;
         renderContext .objectsCount [1] += numGlobalLights;
         renderContext .objectsCount [2] += numGlobalTextureProjectors;

         renderContext .shapeNode .display (gl, renderContext);
         browser .resetTextureUnits ();
      }

      gl .depthMask (true);
      gl .disable (gl .BLEND);


      // POST DRAW

      if (this .isIndependent ())
      {
         // Recycle clip planes, local fogs, local lights, and local projective textures.

         const localObjects = browser .getLocalObjects ();

         for (const localObject of localObjects)
            localObject .dispose ();

         localObjects .length = 0;

         // Recycle global lights and global projective textures.

         for (const globalObject of globalObjects)
            globalObject .dispose ();
      }

      // Reset containers.

      globalObjects            .length = 0;
      lights                   .length = 0;
      globalShadows            .length = 1;
      textureProjectors        .length = 0;
      generatedCubeMapTextures .length = 0;
   },
};

function assign (lhs, rhs)
{
   for (var i = 0, length = rhs .length; i < length; ++ i)
      lhs [i] = rhs [i];

   lhs .length = length;
}

export default X3DRenderObject;
