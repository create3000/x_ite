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

import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DNBodyCollidableNode from "./X3DNBodyCollidableNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import X3DCast                from "../../Base/X3DCast.js";
import TraverseType           from "../../Rendering/TraverseType.js";
import Ammo                   from "../../../lib/ammojs/AmmoClass.js";

function CollidableShape (executionContext)
{
   X3DNBodyCollidableNode .call (this, executionContext);

   this .addType (X3DConstants .CollidableShape);

   this .addChildObjects (X3DConstants .outputOnly, "rebuild", new Fields .SFBool ());

   this .convex = false;
}

Object .assign (Object .setPrototypeOf (CollidableShape .prototype, X3DNBodyCollidableNode .prototype),
{
   initialize ()
   {
      X3DNBodyCollidableNode .prototype .initialize .call (this);

      this ._enabled .addInterest ("set_collidableGeometry__", this);

      this ._shape .addFieldInterest (this ._rebuild);

      this ._rebuild .addInterest ("set_shape__", this);

      this .set_shape__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .visibleNode ?.getBBox (bbox, shadows) .multRight (this .getMatrix ()) ?? bbox .set ();

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   setConvex (value)
   {
      this .convex = value;
   },
   getConvex ()
   {
      return this .convex;
   },
   createConvexGeometry: (() =>
   {
      const p = new Ammo .btVector3 ();

      return function ()
      {
         const vertices = this .geometryNode .getVertices () .getValue ();

         if (vertices .length === 0)
            return null;

         const convexHull = new Ammo .btConvexHullShape ();

         for (let i = 0, length = vertices .length; i < length; i += 4)
         {
            p .setValue (vertices [i], vertices [i + 1], vertices [i + 2]);
            convexHull .addPoint (p, false);
         }

         convexHull .recalcLocalAabb ();

         return convexHull;
      };
   })(),
   createConcaveGeometry: (() =>
   {
      const
         p1 = new Ammo .btVector3 (),
         p2 = new Ammo .btVector3 (),
         p3 = new Ammo .btVector3 ();

      return function ()
      {
         const vertices = this .geometryNode .getVertices () .getValue ();

         if (vertices .length === 0)
            return null;

         this .triangleMesh = new Ammo .btTriangleMesh ();

         for (let i = 0, length = vertices .length; i < length; i += 12)
         {
            p1 .setValue (vertices [i],     vertices [i + 1], vertices [i + 2]);
            p2 .setValue (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
            p3 .setValue (vertices [i + 8], vertices [i + 9], vertices [i + 10]);

            this .triangleMesh .addTriangle (p1, p2, p3);
         }

         return new Ammo .btBvhTriangleMeshShape (this .triangleMesh, false);
      };
   })(),
   set_shape__ ()
   {
      // Remove node.

      if (this .shapeNode)
      {
         const shapeNode = this .shapeNode;

         shapeNode ._geometry .removeInterest ("set_geometry__", this);

         shapeNode ._isPointingObject .removeFieldInterest (this ._rebuild);
         shapeNode ._isCameraObject   .removeFieldInterest (this ._rebuild);
         shapeNode ._isPickableObject .removeFieldInterest (this ._rebuild);
         shapeNode ._isVisibleObject  .removeFieldInterest (this ._rebuild);

         if (X3DCast (X3DConstants .X3DBoundedObject, shapeNode))
         {
            shapeNode ._display     .removeFieldInterest (this ._rebuild);
            shapeNode ._bboxDisplay .removeFieldInterest (this ._rebuild);
         }
      }

      // Clear node.

      this .shapeNode      = null;
      this .pointingNode   = null;
      this .cameraObject   = null;
      this .pickableObject = null;
      this .visibleNode    = null;
      this .boundedObject  = null;

      // Add node.

      const shapeNode = X3DCast (X3DConstants .Shape, this ._shape);

      if (shapeNode)
      {
         shapeNode ._geometry .addInterest ("set_geometry__", this);

         shapeNode ._isPointingObject .addFieldInterest (this ._rebuild);
         shapeNode ._isCameraObject   .addFieldInterest (this ._rebuild);
         shapeNode ._isPickableObject .addFieldInterest (this ._rebuild);
         shapeNode ._isVisibleObject  .addFieldInterest (this ._rebuild);

         this .shapeNode = shapeNode;

         if (shapeNode .isVisible ())
         {
            if (shapeNode .isPointingObject ())
               this .pointingNode = shapeNode;

            if (shapeNode .isCameraObject ())
               this .cameraObject = shapeNode;

            if (shapeNode .isPickableObject ())
               this .pickableObject = shapeNode;

            if (shapeNode .isVisibleObject ())
               this .visibleNode = shapeNode;
         }

         if (X3DCast (X3DConstants .X3DBoundedObject, shapeNode))
         {
            shapeNode ._display     .addFieldInterest (this ._rebuild);
            shapeNode ._bboxDisplay .addFieldInterest (this ._rebuild);

            if (shapeNode .isBBoxVisible ())
               this .boundedObject = shapeNode;
         }

         delete this .traverse;
      }
      else
      {
         this .traverse = Function .prototype;
      }

      this .setPointingObject (this .pointingNode);
      this .setCameraObject   (this .cameraObject);
      this .setPickableObject (this .pickableObject);
      this .setVisibleObject  (this .visibleNode);

      this .set_geometry__ ();
   },
   set_geometry__ ()
   {
      this .geometryNode ?._rebuild .removeInterest ("set_collidableGeometry__", this);

      this .geometryNode = this .shapeNode ?.getGeometry () ?? null;

      this .geometryNode ?._rebuild .addInterest ("set_collidableGeometry__", this);

      this .set_collidableGeometry__ ();
   },
   set_collidableGeometry__: (() =>
   {
      const
         localScaling   = new Ammo .btVector3 (),
         defaultScaling = new Ammo .btVector3 (1, 1, 1);

      return function ()
      {
         const ls = this .getCompoundShape () .getLocalScaling ();
         localScaling .setValue (ls .x (), ls .y (), ls .z ());

         this .removeCollidableGeometry ();
         this .setOffset (0, 0, 0);
         this .getCompoundShape () .setLocalScaling (defaultScaling);

         if (this ._enabled .getValue () && this .geometryNode && this .geometryNode .getGeometryType () > 1)
         {
            const type = this .geometryNode .getType ();

            for (let t = type .length - 1; t >= 0; -- t)
            {
               switch (type [t])
               {
                  case X3DConstants .Box:
                  {
                     const
                        box  = this .geometryNode,
                        size = box ._size .getValue ();

                     this .collisionShape = new Ammo .btBoxShape (new Ammo .btVector3 (size .x / 2, size .y / 2, size .z / 2));
                     break;
                  }
                  case X3DConstants .Cone:
                  {
                     const cone = this .geometryNode;

                     if (cone ._side .getValue () && cone ._bottom .getValue ())
                        this .collisionShape = new Ammo .btConeShape (cone ._bottomRadius .getValue (), cone ._height .getValue ());
                     else
                        this .collisionShape = this .createConcaveGeometry ();

                     break;
                  }
                  case X3DConstants .Cylinder:
                  {
                     const
                        cylinder  = this .geometryNode,
                        radius    = cylinder ._radius .getValue (),
                        height1_2 = cylinder ._height .getValue () * 0.5;

                     if (cylinder ._side .getValue () && cylinder ._top .getValue () && cylinder ._bottom .getValue ())
                        this .collisionShape = new Ammo .btCylinderShape (new Ammo .btVector3 (radius, height1_2, radius));
                     else
                        this .collisionShape = this .createConcaveGeometry ();

                     break;
                  }
                  case X3DConstants .ElevationGrid:
                  {
                     const elevationGrid = this .geometryNode;

                     if (elevationGrid ._xDimension .getValue () > 1 && elevationGrid ._zDimension .getValue () > 1)
                     {
                        const heightField = this .heightField = Ammo ._malloc (4 * elevationGrid ._xDimension .getValue () * elevationGrid ._zDimension .getValue ());

                        let
                           min = Number .POSITIVE_INFINITY,
                           max = Number .NEGATIVE_INFINITY;

                        for (let i = 0, i4 = 0, length = elevationGrid ._height .length; i < length; ++ i)
                        {
                           const value = elevationGrid ._height [i];

                           min = Math .min (min, value);
                           max = Math .max (max, value);

                           Ammo .HEAPF32 [heightField + i4 >>> 2] = elevationGrid ._height [i];

                           i4 += 4;
                        }

                        this .collisionShape = new Ammo .btHeightfieldTerrainShape (elevationGrid ._xDimension .getValue (),
                                                                                    elevationGrid ._zDimension .getValue (),
                                                                                    heightField,
                                                                                    1,
                                                                                    min,
                                                                                    max,
                                                                                    1,
                                                                                    "PHY_FLOAT",
                                                                                    true);

                        this .collisionShape .setLocalScaling (new Ammo .btVector3 (elevationGrid ._xSpacing .getValue (), 1, elevationGrid ._zSpacing .getValue ()));

                        this .setOffset (elevationGrid ._xSpacing .getValue () * (elevationGrid ._xDimension .getValue () - 1) * 0.5,
                                         (min + max) * 0.5,
                                         elevationGrid ._zSpacing .getValue () * (elevationGrid ._zDimension .getValue () - 1) * 0.5);
                     }

                     break;
                  }
                  case X3DConstants .Sphere:
                  {
                     const sphere = this .geometryNode;

                     this .collisionShape = new Ammo .btSphereShape (sphere ._radius .getValue ());
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
         this ._compoundShape_changed = this .getBrowser () .getCurrentTime ();
      };
   })(),
   removeCollidableGeometry ()
   {
      if (this .collisionShape)
      {
         this .getCompoundShape () .removeChildShapeByIndex (0);
         Ammo .destroy (this .collisionShape);
         this .collisionShape = null;
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
   traverse (type, renderObject)
   {
      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .getMatrix ());

      switch (type)
      {
         case TraverseType .POINTER:
         {
            this .pointingNode ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .CAMERA:
         {
            this .cameraObject ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .SHADOW:
         {
            this .visibleNode ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .PICKING:
         {
            const
               browser          = this .getBrowser (),
               pickingHierarchy = browser .getPickingHierarchy ();

            pickingHierarchy .push (this);

            if (browser .getPickable () .at (-1))
               this .visibleNode ?.traverse (type, renderObject);
            else
               this .pickableObject ?.traverse (type, renderObject);

            pickingHierarchy .pop ();
            break;
         }
         case TraverseType .COLLISION:
         {
            this .visibleNode ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .DISPLAY:
         {
            this .visibleNode   ?.traverse (type, renderObject);
            this .boundedObject ?.displayBBox (type, renderObject);
            break;
         }
      }

      modelViewMatrix .pop ();
   },
   dispose ()
   {
      this .removeCollidableGeometry ();

      X3DNBodyCollidableNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (CollidableShape,
{
   ... X3DNode .getStaticProperties ("CollidableShape", "RigidBodyPhysics", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
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
      enumerable: true,
   },
});

export default CollidableShape;
