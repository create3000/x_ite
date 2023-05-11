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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DPickSensorNode    from "./X3DPickSensorNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import IntersectionType     from "../../Browser/Picking/IntersectionType.js";
import VolumePicker         from "../../Browser/Picking/VolumePicker.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Box3                 from "../../../standard/Math/Geometry/Box3.js";
import Ammo                 from "../../../lib/ammojs/AmmoClass.js";

function PointPickSensor (executionContext)
{
   X3DPickSensorNode .call (this, executionContext);

   this .addType (X3DConstants .PointPickSensor);

   this .pickingGeometryNode = null;
   this .picker              = new VolumePicker ();
   this .compoundShapes      = [ ];
}

PointPickSensor .prototype = Object .assign (Object .create (X3DPickSensorNode .prototype),
{
   constructor: PointPickSensor,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",          new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "objectType",       new Fields .MFString ("ALL")),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "matchCriterion",   new Fields .SFString ("MATCH_ANY")),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "intersectionType", new Fields .SFString ("BOUNDS")),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "sortOrder",        new Fields .SFString ("CLOSEST")),
      new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",         new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedPoint",      new Fields .MFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "pickingGeometry",  new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "pickTarget",       new Fields .MFNode ()),
      new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedGeometry",   new Fields .MFNode ()),
   ]),
   getTypeName: function ()
   {
      return "PointPickSensor";
   },
   getComponentName: function ()
   {
      return "Picking";
   },
   getContainerField: function ()
   {
      return "children";
   },
   getSpecificationRange: function ()
   {
      return ["3.2", "Infinity"];
   },
   initialize: function ()
   {
      X3DPickSensorNode .prototype .initialize .call (this);

      this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

      this .set_pickingGeometry__ ();
   },
   set_pickingGeometry__: function ()
   {
      if (this .pickingGeometryNode)
         this .pickingGeometryNode ._rebuild .removeInterest ("set_geometry__", this);

      this .pickingGeometryNode = X3DCast (X3DConstants .PointSet, this ._pickingGeometry);

      if (this .pickingGeometryNode)
         this .pickingGeometryNode ._rebuild .addInterest ("set_geometry__", this);

      this .set_geometry__ ();
   },
   set_geometry__: (function ()
   {
      var
         defaultScale = new Ammo .btVector3 (1, 1, 1),
         o            = new Ammo .btVector3 (),
         t            = new Ammo .btTransform ();

      return function ()
      {
         var compoundShapes = this .compoundShapes;

         if (this .pickingGeometryNode)
         {
            var coord = this .pickingGeometryNode .getCoord ();

            if (coord)
            {
               for (var i = 0, length = coord .getSize (); i < length; ++ i)
               {
                  if (i < compoundShapes .length)
                  {
                     var
                        compoundShape = compoundShapes [i],
                        point         = coord .get1Point (i, compoundShape .point);

                     o .setValue (point .x, point .y, point .z);
                     t .setOrigin (o);

                     compoundShape .setLocalScaling (defaultScale);
                     compoundShape .updateChildTransform (0, t);
                  }
                  else
                  {
                     var
                        compoundShape = new Ammo .btCompoundShape (),
                        sphereShape   = new Ammo .btSphereShape (0),
                        point         = coord .get1Point (i, new Vector3 (0, 0, 0));

                     compoundShape .point = point;

                     o .setValue (point .x, point .y, point .z);
                     t .setOrigin (o);

                     compoundShape .addChildShape (t, sphereShape);
                     compoundShapes .push (compoundShape);
                  }
               }

               compoundShapes .length = length;
            }
            else
            {
               compoundShapes .length = 0;
            }
         }
         else
         {
            compoundShapes .length = 0;
         }
      };
   })(),
   process: (function ()
   {
      var
         pickingBBox   = new Box3 (),
         targetBBox    = new Box3 (),
         pickingCenter = new Vector3 (0, 0, 0),
         targetCenter  = new Vector3 (0, 0, 0),
         transform     = new Ammo .btTransform (),
         localScaling  = new Ammo .btVector3 (),
         translation   = new Vector3 (0, 0, 0),
         rotation      = new Rotation4 (0, 0, 1, 0),
         scale         = new Vector3 (1, 1, 1),
         pickedPoint   = new Fields .MFVec3f ();

      return function ()
      {
         if (this .pickingGeometryNode)
         {
            var
               modelMatrices = this .getModelMatrices (),
               targets       = this .getTargets ();

            switch (this .getIntersectionType ())
            {
               case IntersectionType .BOUNDS:
               {
                  // Intersect bboxes.

                  for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                  {
                     var modelMatrix = modelMatrices [m];

                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     for (var t = 0, tLength = targets .size; t < tLength; ++ t)
                     {
                        var target = targets [t];

                        targetBBox .assign (target .geometryNode .getBBox ()) .multRight (target .modelMatrix);

                        if (pickingBBox .intersectsBox (targetBBox))
                        {
                           pickingCenter .assign (pickingBBox .center);
                           targetCenter  .assign (targetBBox .center);

                           target .intersected = true;
                           target .distance    = pickingCenter .distance (targetCenter);
                        }
                     }
                  }

                  // Send events.

                  var
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .remove (0, pickedGeometries .length, null);

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (! this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  break;
               }
               case IntersectionType .GEOMETRY:
               {
                  // Intersect geometry.

                  var
                     picker         = this .picker,
                     compoundShapes = this .compoundShapes;

                  for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                  {
                     var modelMatrix = modelMatrices [m];

                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     modelMatrix .get (translation, rotation, scale);

                     picker .getTransform (translation, rotation, transform);
                     localScaling .setValue (scale .x, scale .y, scale .z);

                     for (var c = 0, cLength = compoundShapes .length; c < cLength; ++ c)
                     {
                        var compoundShape = compoundShapes [c];

                        picker .setChildShape1Components (transform, localScaling, compoundShape);

                        for (var t = 0, tLength = targets .size; t < tLength; ++ t)
                        {
                           var
                              target      = targets [t],
                              targetShape = this .getPickShape (target .geometryNode);

                           targetBBox .assign (target .geometryNode .getBBox ()) .multRight (target .modelMatrix);

                           picker .setChildShape2 (target .modelMatrix, targetShape .getCompoundShape ());

                           if (picker .contactTest ())
                           {
                              pickingCenter .assign (pickingBBox .center);
                              targetCenter  .assign (targetBBox .center);

                              target .intersected = true;
                              target .distance    = pickingCenter .distance (targetCenter);
                              target .pickedPoint .push (compoundShape .point);
                           }
                        }
                     }
                  }

                  // Send events.

                  var
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .remove (0, pickedGeometries .length, null);

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (! this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  var pickedTargets = this .getPickedTargets ();

                  pickedPoint .length = 0;

                  for (var t = 0, tLength = pickedTargets .length; t < tLength; ++ t)
                  {
                     var pp = pickedTargets [t] .pickedPoint;

                     for (var p = 0, pLength = pp .length; p < pLength; ++ p)
                        pickedPoint .push (pp [p]);
                  }

                  if (! this ._pickedPoint .equals (pickedPoint))
                     this ._pickedPoint = pickedPoint;

                  break;
               }
            }
         }

         X3DPickSensorNode .prototype .process .call (this);
      };
   })(),
});

export default PointPickSensor;
