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
import StopWatch     from "../../standard/Time/StopWatch.js";

const DEPTH_BUFFER_SIZE = 16;

function X3DRenderObject (executionContext)
{
   const browser = executionContext .getBrowser ();

   this .renderKey                = "";
   this .renderAndGlobalLightsKey = "";
   this .renderCount              = 0;
   this .view                     = null;
   this .viewVolumes              = [ ];
   this .projectionMatrix         = new MatrixStack (Matrix4);
   this .modelViewMatrix          = new MatrixStack (Matrix4);
   this .viewMatrix               = new MatrixStack (Matrix4);
   this .cameraSpaceMatrix        = new MatrixStack (Matrix4);
   this .viewportArray            = new Int32Array (4);
   this .projectionMatrixArray    = new Float32Array (16);
   this .viewMatrixArray          = new Float32Array (16);
   this .cameraSpaceMatrixArray   = new Float32Array (16);
   this .hitRay                   = new Line3 ();
   this .sensors                  = [[ ]];
   this .viewpointGroups          = [ ];
   this .lights                   = [ ];
   this .globalLightsKeys         = [ ];
   this .globalLights             = [ ];
   this .localObjectsKeys         = [ ];
   this .localObjects             = [ ];
   this .globalShadows            = [ false ];
   this .globalShadow             = false;
   this .localShadows             = [ false ];
   this .localFogs                = [ null ];
   this .layouts                  = [ ];
   this .hAnimNode                = [ null ];
   this .invHumanoidMatrix        = new MatrixStack (Matrix4);
   this .generatedCubeMapTextures = [ ];
   this .collisions               = [ ];
   this .collisionTime            = new StopWatch ();
   this .numPointingShapes        = 0;
   this .numCollisionShapes       = 0;
   this .numShadowShapes          = 0;
   this .numOpaqueShapes          = 0;
   this .numTransparentShapes     = 0;
   this .pointingShapes           = [ ];
   this .collisionShapes          = [ ];
   this .activeCollisions         = [ ];
   this .shadowShapes             = [ ];
   this .opaqueShapes             = [ ];
   this .transparentShapes        = [ ];
   this .transparencySorter       = new MergeSort (this .transparentShapes, (a, b) => a .distance < b .distance);
   this .transmission             = false;
   this .speed                    = 0;
   this .depthBuffer              = new TextureBuffer (browser, DEPTH_BUFFER_SIZE, DEPTH_BUFFER_SIZE, true);
}

Object .assign (X3DRenderObject .prototype,
{
   initialize ()
   {
      const browser = this .getBrowser ();

      browser .getRenderingProperties () ._LogarithmicDepthBuffer  .addInterest ("set_renderKey__", this);
      browser .getBrowserOptions () ._ColorSpace                   .addInterest ("set_renderKey__", this);
      browser .getBrowserOptions () ._OrderIndependentTransparency .addInterest ("set_renderKey__", this);
      browser .getBrowserOptions () ._ToneMapping                  .addInterest ("set_renderKey__", this);

      this .getViewpointStack ()  .addInterest ("set_renderKey__", this);

      this .set_renderKey__ ();
   },
   isIndependent ()
   {
      return true;
   },
   getNode ()
   {
      return null;
   },
   set_renderKey__ ()
   {
      const browser = this .getBrowser ();

      this .logarithmicDepthBuffer       = browser .getRenderingProperty ("LogarithmicDepthBuffer")
         || this .getViewpoint () .getLogarithmicDepthBuffer ();
      this .orderIndependentTransparency = browser .getBrowserOption ("OrderIndependentTransparency");

      let renderKey = "";

      renderKey += this .logarithmicDepthBuffer       ? 1 : 0;
      renderKey += this .orderIndependentTransparency ? 1 : 0;

      switch (browser .getBrowserOption ("ColorSpace"))
      {
         case "SRGB":
            renderKey += 0;
            break;
         default: // LINEAR_WHEN_PHYSICAL_MATERIAL
            renderKey += 1;
            break;
         case "LINEAR":
            renderKey += 2;
            break;
      }

      switch (browser .getBrowserOption ("ToneMapping"))
      {
         default: // NONE
            renderKey += 0;
            break;
         case "ACES_NARKOWICZ":
            renderKey += 1;
            break;
         case "ACES_HILL":
            renderKey += 2;
            break;
         case "ACES_HILL_EXPOSURE_BOOST":
            renderKey += 3;
            break;
         case "KHR_PBR_NEUTRAL":
            renderKey += 4;
            break;
      }

      this .renderKey = renderKey;
   },
   getLogarithmicDepthBuffer ()
   {
      return this .logarithmicDepthBuffer ;
   },
   getOrderIndependentTransparency ()
   {
      return this .orderIndependentTransparency;
   },
   getRenderKey ()
   {
      return this .renderKey;
   },
   getRenderAndGlobalLightsKey ()
   {
      return this .renderAndGlobalLightsKey;
   },
   getRenderCount ()
   {
      return this .renderCount;
   },
   advanceRenderCount: (function ()
   {
      let renderCount = 0;

      return function ()
      {
         renderCount >>>= 0; // convert to uint
         this .renderCount = ++ renderCount;
      }
   })(),
   getFrameBuffers ()
   {
      return this .getBrowser () .getFrameBuffers ();
   },
   getView ()
   {
      return this .view;
   },
   getViewVolumes ()
   {
      return this .viewVolumes;
   },
   getViewVolume ()
   {
      return this .viewVolumes .at (-1);
   },
   getProjectionMatrix ()
   {
      return this .projectionMatrix;
   },
   getProjectionMatrixWithLimits (nearValue, farValue, viewport)
   {
      return this .getViewpoint () .getProjectionMatrixWithLimits (nearValue, farValue, viewport);
   },
   getModelViewMatrix ()
   {
      return this .modelViewMatrix;
   },
   getViewMatrix ()
   {
      return this .viewMatrix;
   },
   getCameraSpaceMatrix ()
   {
      return this .cameraSpaceMatrix;
   },
   getViewportArray ()
   {
      return this .viewportArray;
   },
   getProjectionMatrixArray ()
   {
      return this .projectionMatrixArray;
   },
   getViewMatrixArray ()
   {
      return this .viewMatrixArray;
   },
   getCameraSpaceMatrixArray ()
   {
      return this .cameraSpaceMatrixArray;
   },
   getHitRay ()
   {
      return this .hitRay;
   },
   getSensors ()
   {
      return this .sensors;
   },
   getViewpointGroups ()
   {
      return this .viewpointGroups;
   },
   getLights ()
   {
      return this .lights;
   },
   getGlobalLights ()
   {
      return this .globalLights;
   },
   getGlobalLightsKeys ()
   {
      return this .globalLightsKeys;
   },
   getLocalObjects ()
   {
      return this .localObjects;
   },
   getLocalObjectsKeys ()
   {
      return this .localObjectsKeys;
   },
   pushGlobalShadows (value)
   {
      this .globalShadows .push (value || this .globalShadows .at (-1));
   },
   getGlobalShadows ()
   {
      return this .globalShadows;
   },
   getGlobalShadow ()
   {
      return this .globalShadow;
   },
   pushLocalShadows (value)
   {
      this .localShadows .push (value || this .localShadows .at (-1));
   },
   popLocalShadows ()
   {
      this .localShadows .pop ();
   },
   setGlobalFog: (() =>
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
   getLocalFogs ()
   {
      return this .localFogs;
   },
   getLayouts ()
   {
      return this .layouts;
   },
   getParentLayout ()
   {
      return this .layouts .at (-1);
   },
   getHAnimNode ()
   {
      return this .hAnimNode;
   },
   getInvHumanoidMatrix ()
   {
      return this .invHumanoidMatrix;
   },
   getGeneratedCubeMapTextures ()
   {
      return this .generatedCubeMapTextures;
   },
   getCollisions ()
   {
      return this .collisions;
   },
   getCollisionTime ()
   {
      return this .collisionTime;
   },
   setNumPointingShapes (value)
   {
      this .numPointingShapes = value;
   },
   getNumPointingShapes ()
   {
      return this .numPointingShapes;
   },
   getPointingShapes ()
   {
      return this .pointingShapes;
   },
   setNumCollisionShapes (value)
   {
      this .numCollisionShapes = value;
   },
   getNumCollisionShapes ()
   {
      return this .numCollisionShapes;
   },
   getCollisionShapes ()
   {
      return this .collisionShapes;
   },
   setNumShadowShapes (value)
   {
      this .numShadowShapes = value;
   },
   getNumShadowShapes ()
   {
      return this .numShadowShapes;
   },
   getShadowShapes ()
   {
      return this .shadowShapes;
   },
   getNumOpaqueShapes ()
   {
      return this .numOpaqueShapes;
   },
   setNumOpaqueShapes (value)
   {
      // Needed for StaticGroup.
      this .numOpaqueShapes = value;
   },
   getOpaqueShapes ()
   {
      return this .opaqueShapes;
   },
   getNumTransparentShapes ()
   {
      return this .numTransparentShapes;
   },
   setNumTransparentShapes (value)
   {
      // Needed for StaticGroup.
      this .numTransparentShapes = value;
   },
   getTransparentShapes ()
   {
      return this .transparentShapes;
   },
   isTransmission ()
   {
      return this .transmission;
   },
   constrainTranslation (translation, stepBack)
   {
      ///  Constrains @a translation to a possible value the avatar can move.  If the avatar reaches and intersects with an
      ///  and obstacle and @a stepBack is true a translation in the opposite direction is returned.  Future implementation will
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
   getDistance: (() =>
   {
      const
         projectionMatrix            = new Matrix4 (),
         cameraSpaceProjectionMatrix = new Matrix4 (),
         localOrientation            = new Rotation4 (),
         vector                      = new Vector3 (),
         rotation                    = new Rotation4 ();

      return function (direction)
      {
         ///  Returns the distance to the closest object in @a direction.  The maximum determinable value is avatarHeight * 2.

         this .collisionTime .start ();

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

         cameraSpaceProjectionMatrix
            .assign (viewpoint .getModelMatrix ())
            .translate (viewpoint .getUserPosition ())
            .rotate (rotation)
            .inverse ()
            .multRight (projectionMatrix)
            .multLeft (viewpoint .getCameraSpaceMatrix ());

         this .getProjectionMatrix () .push (cameraSpaceProjectionMatrix);

         const depth = this .getDepth (projectionMatrix);

         this .getProjectionMatrix () .pop ();

         this .collisionTime .stop ();
         return -depth;
      };
   })(),
   getDepth: (() =>
   {
      const
         depthBufferViewport   = new Vector4 (0, 0, DEPTH_BUFFER_SIZE, DEPTH_BUFFER_SIZE),
         depthBufferViewVolume = new ViewVolume ();

      depthBufferViewVolume .set (Matrix4 .Identity, depthBufferViewport, depthBufferViewport);

      return function (projectionMatrix)
      {
         ///  Returns the depth value to the closest object.  The maximum determinable value is avatarHeight * 2.

         this .depthBuffer .bind ();
         this .viewVolumes .push (depthBufferViewVolume);

         this .depth (this .collisionShapes, this .numCollisionShapes);

         const depth = this .depthBuffer .readDepth (projectionMatrix, depthBufferViewport);

         this .viewVolumes .pop ();

         return depth;
      };
   })(),
   render (type, callback, group)
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
            // Collect for collide and gravitate
            this .numCollisionShapes = 0;

            callback .call (group, type, this);
            this .collide ();
            this .gravitate ();
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
   setHitRay (projectionMatrix, viewport, pointer)
   {
      ViewVolume .unProjectRay (pointer .x, pointer .y, Matrix4 .Identity, projectionMatrix, viewport, this .hitRay);
   },
   addPointingShape: (() =>
   {
      const
         bboxSize   = new Vector3 (),
         bboxCenter = new Vector3 ();

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
               this .pointingShapes .push ({
                  renderObject: this,
                  modelViewMatrix: new Float32Array (16),
                  clipPlanes: [ ],
                  sensors: [ ],
               });
            }

            const pointingContext = this .pointingShapes [num];

            pointingContext .modelViewMatrix .set (modelViewMatrix);
            pointingContext .scissor      = viewVolume .getScissor ();
            pointingContext .hAnimNode    = this .hAnimNode .at (-1);
            pointingContext .shapeNode    = shapeNode;

            // Clip planes & sensors

            assign (pointingContext .clipPlanes, this .localObjects);
            assign (pointingContext .sensors,    this .sensors .at (-1));

            return true;
         }

         return false;
      };
   })(),
   addCollisionShape: (() =>
   {
      const
         bboxSize   = new Vector3 (),
         bboxCenter = new Vector3 ();

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
               this .collisionShapes .push ({
                  renderObject: this,
                  modelViewMatrix: new Float32Array (16),
                  collisions: [ ],
                  clipPlanes: [ ]
               });
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
   addShadowShape: (() =>
   {
      const
         bboxSize   = new Vector3 (),
         bboxCenter = new Vector3 ();

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
               this .shadowShapes .push ({
                  renderObject: this,
                  modelViewMatrix: new Float32Array (16),
                  clipPlanes: [ ]
               });
            }

            const depthContext = this .shadowShapes [num];

            depthContext .modelViewMatrix .set (modelViewMatrix);
            depthContext .scissor      = viewVolume .getScissor ();
            depthContext .hAnimNode    = this .hAnimNode .at (-1);
            depthContext .shapeNode    = shapeNode;

            // Clip planes

            assign (depthContext .clipPlanes, this .localObjects);

            return true;
         }

         return false;
      };
   })(),
   addDisplayShape: (() =>
   {
      const
         bboxSize   = new Vector3 (),
         bboxCenter = new Vector3 ();

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
            if (shapeNode .isTransparent ())
            {
               const num = this .numTransparentShapes ++;

               if (num === this .transparentShapes .length)
                  this .transparentShapes .push (this .createRenderContext (true));

               var renderContext = this .transparentShapes [num];

               renderContext .distance = bboxCenter .z;
            }
            else
            {
               const num = this .numOpaqueShapes ++;

               if (num === this .opaqueShapes .length)
                  this .opaqueShapes .push (this .createRenderContext (false));

               var renderContext = this .opaqueShapes [num];
            }

            this .transmission ||= shapeNode .isTransmission ();

            renderContext .modelViewMatrix .set (modelViewMatrix);
            renderContext .scissor .assign (viewVolume .getScissor ());
            renderContext .shadows        = this .localShadows .at (-1);
            renderContext .fogNode        = this .localFogs .at (-1);
            renderContext .hAnimNode      = this .hAnimNode .at (-1);
            renderContext .shapeNode      = shapeNode;
            renderContext .appearanceNode = shapeNode .getAppearance ();

            // Clip planes and local lights

            assign (renderContext .localObjects,     this .localObjects); // Fog, ClipPane, X3DLightNode
            assign (renderContext .localObjectsKeys, this .localObjectsKeys);

            return true;
         }

         return false;
      };
   })(),
   createRenderContext (transparent)
   {
      return {
         renderObject: this,
         transparent: transparent,
         modelViewMatrix: new Float32Array (16),
         scissor: new Vector4 (),
         localObjects: [ ],
         localObjectsKeys: [ ], // [clip planes, lights]
      };
   },
   pointing: (() =>
   {
      const projectionMatrixArray = new Float32Array (16);

      return function (shapes, numShapes)
      {
         const
            browser  = this .getBrowser (),
            gl       = browser .getContext (),
            viewport = this .viewVolumes .at (-1) .getViewport (),
            [x, y]   = browser .getPointer ();

         // Configure depth shaders.

         projectionMatrixArray .set (this .getProjectionMatrix () .get ());

         // Configure viewport and background.

         gl .viewport (viewport .x - x,
                       viewport .y - y,
                       viewport .z,
                       viewport .w);

         gl .scissor (0, 0, 1, 1);
         gl .clear (gl .DEPTH_BUFFER_BIT);

         // Render all objects.

         gl .disable (gl .CULL_FACE);

         for (let s = 0; s < numShapes; ++ s)
         {
            const
               renderContext       = shapes [s],
               { scissor, clipPlanes, modelViewMatrix, shapeNode, hAnimNode } = renderContext,
               appearanceNode      = shapeNode .getAppearance (),
               geometryContext     = shapeNode .getGeometryContext (),
               depthModeNode       = appearanceNode .getDepthMode (),
               stylePropertiesNode = appearanceNode .getStyleProperties (geometryContext .geometryType),
               shaderNode          = browser .getPointingShader (clipPlanes .length, shapeNode, hAnimNode),
               id                  = browser .addPointingShape (renderContext);

            gl .scissor (scissor .x - x,
                         scissor .y - y,
                         scissor .z,
                         scissor .w);

            // Draw shape.

            shaderNode .enable (gl);
            shaderNode .setClipPlanes (gl, clipPlanes);

            gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrix);
            gl .uniform1f (shaderNode .x3d_Id, id);

            depthModeNode       ?.enable (gl);
            stylePropertiesNode ?.setShaderUniforms (gl, shaderNode);
            hAnimNode           ?.setShaderUniforms (gl, shaderNode);

            shapeNode .displaySimple (gl, renderContext, shaderNode);

            depthModeNode ?.disable (gl);
            browser .resetTextureUnits ();
         }
      };
   })(),
   collide: (() =>
   {
      const
         invModelViewMatrix = new Matrix4 (),
         modelViewMatrix    = new Matrix4 (),
         collisionBox       = new Box3 (Vector3 .Zero, Vector3 .Zero),
         collisionSize      = new Vector3 ();

      return function ()
      {
         // Collision nodes are handled here.

         const
            activeCollisions = [ ], // current active Collision nodes
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
                     activeCollisions .push (collision);
               }
            }
         }

         // Set isActive to FALSE for affected nodes.

         if (this .activeCollisions .length)
         {
            const inActiveCollisions = activeCollisions .length
                                       ? this .activeCollisions .filter (a => !activeCollisions .includes (a))
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
   gravitate: (() =>
   {
      const
         projectionMatrix            = new Matrix4 (),
         cameraSpaceProjectionMatrix = new Matrix4 (),
         translation                 = new Vector3 (),
         rotation                    = new Rotation4 ();

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

         // Reshape viewpoint for gravitate.

         Camera .ortho (-collisionRadius,
                        collisionRadius,
                        -collisionRadius,
                        collisionRadius,
                        nearValue,
                        Math .max (collisionRadius, avatarHeight) * 2,
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

         this .getProjectionMatrix () .push (cameraSpaceProjectionMatrix);

         let distance = -this .getDepth (projectionMatrix);

         this .getProjectionMatrix () .pop ();

         // gravitate or step up.

         distance -= avatarHeight;

         const up = rotation .setFromToVec (Vector3 .yAxis, upVector);

         if (distance > 0)
         {
            // gravitate and fall down the to the floor.

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
               //   float step = getBrowser () -> getCurrentSpeed () / getBrowser () -> getCurrentFrameRate ();
               //   step = abs (getViewMatrix () .mult_matrix_dir (Vector3f (0, step, 0) * up));
               //
               //   Vector3f offset = Vector3f (0, step, 0) * up;
               //
               //   if (math::abs (offset) > math::abs (translation) or getBrowser () -> getCurrentSpeed () == 0)
               //      offset = translation;
               //
               //   getViewpoint () -> positionOffset () += offset;
               //}
               //else
                  viewpoint ._positionOffset = translation .add (viewpoint ._positionOffset .getValue ());
            }
         }
      };
   })(),
   depth: (() =>
   {
      const projectionMatrixArray = new Float32Array (16);

      return function (shapes, numShapes)
      {
         const
            browser  = this .getBrowser (),
            gl       = browser .getContext (),
            viewport = this .viewVolumes .at (-1) .getViewport ();

         // Configure depth shaders.

         projectionMatrixArray .set (this .getProjectionMatrix () .get ());

         // Configure viewport and background

         gl .viewport (... viewport);
         gl .scissor (... viewport);

         gl .clearColor (1, 0, 0, 0); // '1' for infinity, '0 0 0' for normal (TODO).
         gl .clear (gl .COLOR_BUFFER_BIT | gl .DEPTH_BUFFER_BIT);

         // Render all objects

         gl .disable (gl .CULL_FACE);

         for (let s = 0; s < numShapes; ++ s)
         {
            const
               renderContext       = shapes [s],
               { scissor, clipPlanes, modelViewMatrix, shapeNode, hAnimNode } = renderContext,
               appearanceNode      = shapeNode .getAppearance (),
               geometryContext     = shapeNode .getGeometryContext (),
               stylePropertiesNode = appearanceNode .getStyleProperties (geometryContext .geometryType),
               shaderNode          = browser .getDepthShader (clipPlanes .length, shapeNode, hAnimNode);

            gl .scissor (... scissor);

            // Draw

            shaderNode .enable (gl);
            shaderNode .setClipPlanes (gl, clipPlanes);

            gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrix);

            stylePropertiesNode ?.setShaderUniforms (gl, shaderNode);
            hAnimNode           ?.setShaderUniforms (gl, shaderNode);

            shapeNode .displaySimple (gl, renderContext, shaderNode);
            browser .resetTextureUnits ();
         }
      };
   })(),
   draw ()
   {
      const
         independent              = this .isIndependent (),
         browser                  = this .getBrowser (),
         gl                       = browser .getContext (),
         frameBuffers             = this .getFrameBuffers (),
         numFrameBuffers          = frameBuffers .length,
         viewport                 = this .viewVolumes .at (-1) .getViewport (),
         lights                   = this .lights,
         globalLightsKeys         = this .globalLightsKeys,
         globalLights             = this .globalLights,
         generatedCubeMapTextures = this .generatedCubeMapTextures,
         globalShadows            = this .globalShadows,
         headlight                = this .getNavigationInfo () ._headlight .getValue ();

      // PREPARATIONS

      if (independent)
      {
         // Render shadow maps.

         for (const light of lights)
            light .renderShadowMap (this);

         // Render GeneratedCubeMapTextures.

         for (const generatedCubeMapTexture of generatedCubeMapTextures)
            generatedCubeMapTexture .renderTexture (this);
      }

      this .renderAndGlobalLightsKey = `.${this .renderKey}.${globalLightsKeys .sort () .join ("")}.`;
      this .globalShadow             = globalShadows .at (-1);

      // DRAW

      this .viewportArray .set (viewport);

      for (let i = 0; i < numFrameBuffers; ++ i)
      {
         const frameBuffer = frameBuffers [i];

         // XR support

         const view = this .view = browser .getPose () ?.views [i];

         if (view)
         {
            this .projectionMatrixArray .set (view .projectionMatrix);

            if (this .getLayer () === browser .getActiveLayer ())
            {
               this .cameraSpaceMatrixArray .set (view .cameraSpaceMatrix);
               this .viewMatrixArray        .set (view .viewMatrix);
            }
            else
            {
               this .cameraSpaceMatrixArray .set (this .getCameraSpaceMatrix () .get ());
               this .viewMatrixArray        .set (this .getViewMatrix ()        .get ());

               Matrix4 .prototype .multLeft  (this .cameraSpaceMatrixArray, view .inverse);
               Matrix4 .prototype .multRight (this .viewMatrixArray,        view .matrix);
            }
         }
         else
         {
            this .projectionMatrixArray  .set (this .getProjectionMatrix ()  .get ());
            this .cameraSpaceMatrixArray .set (this .getCameraSpaceMatrix () .get ());
            this .viewMatrixArray        .set (this .getViewMatrix ()        .get ());
         }

         // Set up shadow matrix for all lights, and matrix for all projective textures.

         if (headlight)
            browser .getHeadlight () .setGlobalVariables (this);

         for (const light of lights)
            light .setGlobalVariables (this);

         // Draw shapes.

         if (independent && this .transmission)
         {
            // Render to transmission buffer.

            const transmissionBuffer = browser .getTransmissionBuffer ();

            this .drawShapes (gl, browser, transmissionBuffer, gl .COLOR_BUFFER_BIT, false, viewport, this .opaqueShapes, this .numOpaqueShapes, this .transparentShapes, this .numTransparentShapes, this .transparencySorter);

            gl .bindTexture (gl .TEXTURE_2D, transmissionBuffer .getColorTexture ());
            gl .generateMipmap (gl .TEXTURE_2D);

            this .transmission = false;
         }

         // Draw with sorted blend or OIT.

         this .drawShapes (gl, browser, frameBuffer, 0, frameBuffer .getOIT (), viewport, this .opaqueShapes, this .numOpaqueShapes, this .transparentShapes, this .numTransparentShapes, this .transparencySorter);
      }

      // POST DRAW

      if (independent)
      {
         // Recycle clip planes, local fogs, local lights, and local projective textures.

         const localObjects = browser .getLocalObjects ();

         for (const localObject of localObjects)
            localObject .dispose ();

         localObjects .length = 0;

         // Recycle global lights and global projective textures.

         for (const globalObject of globalLights)
            globalObject .dispose ();
      }

      // Reset containers.

      globalLightsKeys         .length = 0;
      globalLights             .length = 0;
      lights                   .length = 0;
      globalShadows            .length = 1;
      generatedCubeMapTextures .length = 0;
   },
   drawShapes (gl, browser, frameBuffer, clearBits, oit, viewport, opaqueShapes, numOpaqueShapes, transparentShapes, numTransparentShapes, transparencySorter)
   {
      frameBuffer .bind ();

      // Configure viewport and background

      gl .viewport (... viewport);
      gl .scissor (... viewport);

      // Draw background.

      this .advanceRenderCount ();

      gl .clearColor (0, 0, 0, 0);
      gl .clear (gl .DEPTH_BUFFER_BIT | clearBits);
      gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);

      this .getBackground () .display (gl, this);

      // Sorted blend or order independent transparency

      this .advanceRenderCount ();

      // Render opaque objects first

      for (let i = 0; i < numOpaqueShapes; ++ i)
      {
         const renderContext = opaqueShapes [i];

         gl .scissor (... renderContext .scissor);

         renderContext .shapeNode .display (gl, renderContext);
         browser .resetTextureUnits ();
      }

      // Render transparent objects

      if (oit)
         frameBuffer .bindTransparency ();
      else
         transparencySorter .sort (0, numTransparentShapes);

      gl .depthMask (false);
      gl .enable (gl .BLEND);

      for (let i = 0; i < numTransparentShapes; ++ i)
      {
         const renderContext = transparentShapes [i];

         gl .scissor (... renderContext .scissor);

         renderContext .shapeNode .display (gl, renderContext);
         browser .resetTextureUnits ();
      }

      gl .depthMask (true);
      gl .disable (gl .BLEND);

      if (oit)
         frameBuffer .compose ();
   },
});

function assign (lhs, rhs)
{
   const length = rhs .length;

   for (let i = 0; i < length; ++ i)
      lhs [i] = rhs [i];

   lhs .length = length;
}

export default X3DRenderObject;
