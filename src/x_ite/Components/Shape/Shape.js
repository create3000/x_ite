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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Shape/X3DShapeNode",
   "x_ite/Rendering/TraverseType",
   "x_ite/Base/X3DConstants",
   "standard/Math/Algorithm",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Geometry/Box3",
   "standard/Math/Geometry/Line3",
   "standard/Math/Algorithms/QuickSort",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DShapeNode,
          TraverseType,
          X3DConstants,
          Algorithm,
          Vector3,
          Matrix4,
          Box3,
          Line3,
          QuickSort)
{
"use strict";

   function Shape (executionContext)
   {
      X3DShapeNode .call (this, executionContext);

      this .addType (X3DConstants .Shape);
   }

   Shape .prototype = Object .assign (Object .create (X3DShapeNode .prototype),
   {
      constructor: Shape,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",    new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "Shape";
      },
      getComponentName: function ()
      {
         return "Shape";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DShapeNode .prototype .initialize .call (this);

         this ._transformSensors_changed .addInterest ("set_transformSensors__", this);

         this .set_transformSensors__ ();
      },
      set_geometry__: function ()
      {
         X3DShapeNode .prototype .set_geometry__ .call (this);

         if (this .getGeometry ())
            delete this .traverse;
         else
            this .traverse = Function .prototype;
      },
      set_transformSensors__: function ()
      {
         this .setPickableObject (this .getTransformSensors () .size);
      },
      intersectsBox: function (box, clipPlanes, modelViewMatrix)
      {
         return this .getGeometry () .intersectsBox (box, clipPlanes, modelViewMatrix);
      },
      traverse: function (type, renderObject)
      {
         // Always look at ParticleSystem if you do modify something here and there.

         switch (type)
         {
            case TraverseType .POINTER:
            {
               this .pointer (renderObject);
               break;
            }
            case TraverseType .PICKING:
            {
               this .picking (renderObject);
               break;
            }
            case TraverseType .COLLISION:
            {
               renderObject .addCollisionShape (this);
               break;
            }
            case TraverseType .SHADOW:
            {
               if (this ._castShadow .getValue ())
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

         this .getGeometry () .traverse (type, renderObject); // Currently used for ScreenText.
      },
      pointer: (function ()
      {
         const
            modelViewMatrix    = new Matrix4 (),
            invModelViewMatrix = new Matrix4 (),
            hitRay             = new Line3 (new Vector3 (0, 0, 0), new Vector3 (0, 0, 0)),
            intersections      = [ ],
            intersectionSorter = new QuickSort (intersections, function (lhs, rhs)
            {
               return lhs .point .z > rhs .point .z;
            });

         return function (renderObject)
         {
            const browser = renderObject .getBrowser ();

            if (browser .getPickOnlySensors () && browser .getSensors () .length === 1)
               return;

            const geometryNode = this .getGeometry ();

            modelViewMatrix    .assign (renderObject .getModelViewMatrix () .get ());
            invModelViewMatrix .assign (modelViewMatrix) .inverse ();

            hitRay .assign (browser .getHitRay ()) .multLineMatrix (invModelViewMatrix);

            if (geometryNode .intersectsLine (hitRay, renderObject .getLocalObjects (), modelViewMatrix, intersections))
            {
               // Finally we have intersections and must now find the closest hit in front of the camera.

               // Transform hitPoints to absolute space.
               for (const intersection of intersections)
                  modelViewMatrix .multVecMatrix (intersection .point);

               intersectionSorter .sort (0, intersections .length);

               // Find first point that is not greater than near plane;
               const index = Algorithm .lowerBound (intersections, 0, intersections .length, -renderObject .getNavigationInfo () .getNearValue (),
               function (lhs, rhs)
               {
                  return lhs .point .z > rhs;
               });

               // Are there intersections before the camera?
               if (index !== intersections .length)
               {
                  // Transform hitNormal to absolute space.
                  invModelViewMatrix .multMatrixDir (intersections [index] .normal) .normalize ();

                  browser .addHit (intersections [index], renderObject .getLayer (), this, modelViewMatrix .multRight (renderObject .getCameraSpaceMatrix () .get ()));
               }

               intersections .length = 0;
            }
         };
      })(),
      picking: function (renderObject)
      {
         if (this .getTransformSensors () .size)
         {
            const modelMatrix = renderObject .getModelViewMatrix () .get ();

            for (const transformSensorNode of this .getTransformSensors ())
               transformSensorNode .collect (modelMatrix);
         }

         const
            browser          = renderObject .getBrowser (),
            pickSensorStack  = browser .getPickSensors (),
            pickingHierarchy = browser .getPickingHierarchy ();

         pickingHierarchy .push (this);

         for (const pickSensor of pickSensorStack .at (-1))
         {
            pickSensor .collect (this .getGeometry (), renderObject .getModelViewMatrix () .get (), browser .getPickingHierarchy ());
         }

         pickingHierarchy .pop ();
      },
      depth: function (gl, context, shaderNode)
      {
         this .getGeometry () .depth (gl, context, shaderNode);
      },
      display: function (gl, context)
      {
         this .getGeometry () .display (gl, context);
      },
   });

   return Shape;
});
