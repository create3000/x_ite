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
   "x_ite/Components/RigidBodyPhysics/X3DNBodyCollidableNode",
   "x_ite/Bits/X3DConstants",
   "x_ite/Bits/X3DCast",
   "x_ite/Bits/TraverseType",
   "lib/ammojs/AmmoJS",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNBodyCollidableNode,
          X3DConstants,
          X3DCast,
          TraverseType,
          Ammo)
{
"use strict";

   function CollidableShape (executionContext)
   {
      X3DNBodyCollidableNode .call (this, executionContext);

      this .addType (X3DConstants .CollidableShape);

      this .convex         = false;
      this .shapeNode      = null;
      this .visibleNode    = null;
      this .boundedObject  = null;
      this .geometryNode   = null;
      this .collisionShape = null;
      this .triangleMesh   = null;
   }

   CollidableShape .prototype = Object .assign (Object .create (X3DNBodyCollidableNode .prototype),
   {
      constructor: CollidableShape,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",    new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "shape",       new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "CollidableShape";
      },
      getComponentName: function ()
      {
         return "RigidBodyPhysics";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DNBodyCollidableNode .prototype .initialize .call (this);

         this .enabled_ .addInterest ("set_collidableGeometry__", this);
         this .shape_   .addInterest ("set_shape__",              this);

         this .set_shape__ ();
      },
      getBBox: function (bbox, shadow)
      {
         if (this .bboxSize_ .getValue () .equals (this .getDefaultBBoxSize ()))
         {
            const boundedObject = this .visibleNode;

            if (boundedObject)
               return boundedObject .getBBox (bbox, shadow);

            return bbox .set ();
         }

         return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
      },
      setConvex: function (value)
      {
         this .convex = value;
      },
      getConvex: function ()
      {
         return this .convex;
      },
      createConvexGeometry: (function ()
      {
         var p = new Ammo .btVector3 ();

         return function ()
         {
            var vertices = this .geometryNode .getVertices () .getValue ();

            if (vertices .length === 0)
               return null;

            var convexHull = new Ammo .btConvexHullShape ();

            for (var i = 0, length = vertices .length; i < length; i += 4)
            {
               p .setValue (vertices [i], vertices [i + 1], vertices [i + 2]);
               convexHull .addPoint (p, false);
            }

            convexHull .recalcLocalAabb ();

            return convexHull;
         };
      })(),
      createConcaveGeometry: (function ()
      {
         var
            p1 = new Ammo .btVector3 (),
            p2 = new Ammo .btVector3 (),
            p3 = new Ammo .btVector3 ();

         return function ()
         {
            var vertices = this .geometryNode .getVertices () .getValue ();

            if (vertices .length === 0)
               return null;

            this .triangleMesh = new Ammo .btTriangleMesh ();

            for (var i = 0, length = vertices .length; i < length; i += 12)
            {
               p1 .setValue (vertices [i],     vertices [i + 1], vertices [i + 2]);
               p2 .setValue (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
               p3 .setValue (vertices [i + 8], vertices [i + 9], vertices [i + 10]);

               this .triangleMesh .addTriangle (p1, p2, p3);
            }

            return new Ammo .btBvhTriangleMeshShape (this .triangleMesh, false);
         };
      })(),
      set_shape__: function ()
      {
         if (this .shapeNode)
         {
            this .shapeNode .isCameraObject_   .removeFieldInterest (this .isCameraObject_);
            this .shapeNode .isPickableObject_ .removeFieldInterest (this .isPickableObject_);

            this .shapeNode .visible_     .removeInterest ("set_visible__",     this);
            this .shapeNode .bboxDisplay_ .removeInterest ("set_bboxDisplay__", this);

            this .shapeNode .geometry_ .removeInterest ("set_geometry__", this);
         }

         this .shapeNode = X3DCast (X3DConstants .Shape, this .shape_);

         if (this .shapeNode)
         {
            this .shapeNode .isCameraObject_   .addFieldInterest (this .isCameraObject_);
            this .shapeNode .isPickableObject_ .addFieldInterest (this .isPickableObject_);

            this .shapeNode .visible_     .addInterest ("set_visible__",     this);
            this .shapeNode .bboxDisplay_ .addInterest ("set_bboxDisplay__", this);

            this .shapeNode .geometry_ .addInterest ("set_geometry__", this);

            this .setCameraObject   (this .shapeNode .getCameraObject ());
            this .setPickableObject (this .shapeNode .getPickableObject ());

            delete this .traverse;
         }
         else
         {
            this .setCameraObject   (false);
            this .setPickableObject (false);

            this .traverse = Function .prototype;
         }

         this .set_visible__ ();
         this .set_bboxDisplay__ ();
         this .set_geometry__ ();
      },
      set_cameraObject__: function ()
      {
         if (this .shapeNode && this .shapeNode .getCameraObject ())
         {
            this .setCameraObject (this .shapeNode .visible_ .getValue ());
         }
         else
         {
            this .setCameraObject (false);
         }
      },
      set_visible__: function ()
      {
         if (this .shapeNode)
         {
            this .visibleNode = this .shapeNode .visible_ .getValue () ? this .shapeNode : null;
         }
         else
         {
            this .visibleNode = this .shapeNode;
         }

         this .set_cameraObject__ ();
      },
      set_bboxDisplay__: function ()
      {
         if (this .shapeNode)
         {
            this .boundedObject = this .shapeNode .bboxDisplay_ .getValue () ? this .shapeNode : null;
         }
         else
         {
            this .boundedObject = null;
         }
      },
      set_geometry__: function ()
      {
         if (this .geometryNode)
            this .geometryNode .rebuild_ .removeInterest ("set_collidableGeometry__", this);

         if (this .shapeNode)
            this .geometryNode = this .shapeNode .getGeometry ();
         else
            this .geometryNode = null;

         if (this .geometryNode)
            this .geometryNode .rebuild_ .addInterest ("set_collidableGeometry__", this);

         this .set_collidableGeometry__ ();
      },
      set_collidableGeometry__: (function ()
      {
         var
            localScaling   = new Ammo .btVector3 (),
            defaultScaling = new Ammo .btVector3 (1, 1, 1);

         return function ()
         {
            var ls = this .getCompoundShape () .getLocalScaling ();
            localScaling .setValue (ls .x (), ls .y (), ls .z ());

            this .removeCollidableGeometry ();
            this .setOffset (0, 0, 0);
            this .getCompoundShape () .setLocalScaling (defaultScaling);

            if (this .enabled_ .getValue () && this .geometryNode && this .geometryNode .getGeometryType () > 1)
            {
               var type = this .geometryNode .getType ();

               for (var t = type .length - 1; t >= 0; -- t)
               {
                  switch (type [t])
                  {
                     case X3DConstants .Box:
                     {
                        var
                           box  = this .geometryNode,
                           size = box .size_ .getValue ();

                        this .collisionShape = new Ammo .btBoxShape (new Ammo .btVector3 (size .x / 2, size .y / 2, size .z / 2));
                        break;
                     }
                     case X3DConstants .Cone:
                     {
                        var cone = this .geometryNode;

                        if (cone .side_ .getValue () && cone .bottom_ .getValue ())
                           this .collisionShape = new Ammo .btConeShape (cone .bottomRadius_ .getValue (), cone .height_ .getValue ());
                        else
                           this .collisionShape = this .createConcaveGeometry ();

                        break;
                     }
                     case X3DConstants .Cylinder:
                     {
                        var
                           cylinder  = this .geometryNode,
                           radius    = cylinder .radius_ .getValue (),
                           height1_2 = cylinder .height_ .getValue () * 0.5;

                        if (cylinder .side_ .getValue () && cylinder .top_ .getValue () && cylinder .bottom_ .getValue ())
                           this .collisionShape = new Ammo .btCylinderShape (new Ammo .btVector3 (radius, height1_2, radius));
                        else
                           this .collisionShape = this .createConcaveGeometry ();

                        break;
                     }
                     case X3DConstants .ElevationGrid:
                     {
                        var elevationGrid = this .geometryNode;

                        if (elevationGrid .xDimension_ .getValue () > 1 && elevationGrid .zDimension_ .getValue () > 1)
                        {
                           var
                              min         = Number .POSITIVE_INFINITY,
                              max         = Number .NEGATIVE_INFINITY,
                              heightField = this .heightField = Ammo ._malloc (4 * elevationGrid .xDimension_ .getValue () * elevationGrid .zDimension_ .getValue ()),
                              i4          = 0;

                           for (var i = 0, length = elevationGrid .height_ .length; i < length; ++ i)
                           {
                              var value = elevationGrid .height_ [i];

                              min = Math .min (min, value);
                              max = Math .max (max, value);

                              Ammo .HEAPF32 [heightField + i4 >> 2] = elevationGrid .height_ [i];

                              i4 += 4;
                           }

                           this .collisionShape = new Ammo .btHeightfieldTerrainShape (elevationGrid .xDimension_ .getValue (),
                                                                                       elevationGrid .zDimension_ .getValue (),
                                                                                       heightField,
                                                                                       1,
                                                                                       min,
                                                                                       max,
                                                                                       1,
                                                                                       "PHY_FLOAT",
                                                                                       true);

                           this .collisionShape .setLocalScaling (new Ammo .btVector3 (elevationGrid .xSpacing_ .getValue (), 1, elevationGrid .zSpacing_ .getValue ()));

                           this .setOffset (elevationGrid .xSpacing_ .getValue () * (elevationGrid .xDimension_ .getValue () - 1) * 0.5,
                                            (min + max) * 0.5,
                                            elevationGrid .zSpacing_ .getValue () * (elevationGrid .zDimension_ .getValue () - 1) * 0.5);
                        }

                        break;
                     }
                     case X3DConstants .Sphere:
                     {
                        var sphere = this .geometryNode;

                        this .collisionShape = new Ammo .btSphereShape (sphere .radius_ .getValue ());
                        break;
                     }
                     case X3DConstants .X3DGeometryNode:
                     {
                        if (this .convex)
                           this .collisionShape = this .createConvexGeometry ();
                        else
                           this .collisionShape = this .createConcaveGeometry ();

                        break;
                     }
                     default:
                     {
                        continue;
                     }
                  }

                  break;
               }
            }
            else
            {
               this .collisionShape = null;
            }

            if (this .collisionShape)
               this .getCompoundShape () .addChildShape (this .getLocalTransform (), this .collisionShape);

            this .getCompoundShape () .setLocalScaling (localScaling);

            this .addNodeEvent ();
            this .compoundShape_changed_ = this .getBrowser () .getCurrentTime ();
         };
      })(),
      removeCollidableGeometry: function ()
      {
         if (this .collisionShape)
         {
            this .getCompoundShape () .removeChildShapeByIndex (0);
            Ammo .destroy (this .collisionShape);
            this .collisionShape = null;;
         }

         if (this .heightField)
         {
            Ammo ._free (this .heightField);
            this .heightField = null;
         }

         if (this .triangleMesh)
         {
            Ammo .destroy (this .triangleMesh);
            this .triangleMesh = null;
         }
      },
      traverse: function (type, renderObject)
      {
         switch (type)
         {
            case TraverseType .POINTER:
            case TraverseType .CAMERA:
            case TraverseType .SHADOW:
            {
               const modelViewMatrix = renderObject .getModelViewMatrix ();

               modelViewMatrix .push ();
               modelViewMatrix .multLeft (this .getMatrix ());

               const visibleNode = this .visibleNode;

               if (visibleNode)
                  visibleNode .traverse (type, renderObject);

               modelViewMatrix .pop ();
               return;
            }
            case TraverseType .PICKING:
            {
               const
                  browser          = renderObject .getBrowser (),
                  pickingHierarchy = browser .getPickingHierarchy (),
                  modelViewMatrix  = renderObject .getModelViewMatrix ();

               pickingHierarchy .push (this);
               modelViewMatrix .push ();
               modelViewMatrix .multLeft (this .getMatrix ());

               this .shapeNode .traverse (type, renderObject);

               modelViewMatrix .pop ();
               pickingHierarchy .pop ();
               return;
            }
            case TraverseType .COLLISION:
            {
               const modelViewMatrix = renderObject .getModelViewMatrix ();

               modelViewMatrix .push ();
               modelViewMatrix .multLeft (this .getMatrix ());

               this .shapeNode .traverse (type, renderObject);

               modelViewMatrix .pop ();
               return;
            }
            case TraverseType .DISPLAY:
            {
               const modelViewMatrix = renderObject .getModelViewMatrix ();

               modelViewMatrix .push ();
               modelViewMatrix .multLeft (this .getMatrix ());

               const visibleNode = this .visibleNode;

               if (visibleNode)
                  visibleNode .traverse (type, renderObject);

               const boundedObject = this .boundedObject;

               if (boundedObject)
                  boundedObject .displayBBox (type, renderObject);

               modelViewMatrix .pop ();
               return;
            }
         }
      },
      dispose: function ()
      {
         this .removeCollidableGeometry ();

         X3DNBodyCollidableNode .prototype .dispose .call (this);
      },
   });

   return CollidableShape;
});
