import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
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

   // Private properties

   this .picker         = new VolumePicker ();
   this .compoundShapes = [ ];
}

Object .assign (Object .setPrototypeOf (PointPickSensor .prototype, X3DPickSensorNode .prototype),
{
   initialize ()
   {
      X3DPickSensorNode .prototype .initialize .call (this);

      this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

      this .set_pickingGeometry__ ();
   },
   set_pickingGeometry__ ()
   {
      this .pickingGeometryNode ?._rebuild .removeInterest ("set_geometry__", this);

      this .pickingGeometryNode = X3DCast (X3DConstants .PointSet, this ._pickingGeometry);

      this .pickingGeometryNode ?._rebuild .addInterest ("set_geometry__", this);

      this .set_geometry__ ();
   },
   set_geometry__: (() =>
   {
      const
         defaultScale = new Ammo .btVector3 (1, 1, 1),
         o            = new Ammo .btVector3 (),
         t            = new Ammo .btTransform ();

      return function ()
      {
         const
            compoundShapes = this .compoundShapes,
            coord          = this .pickingGeometryNode ?.getCoord (),
            length         = coord ?.getSize () ?? 0;

         for (let i = 0; i < length; ++ i)
         {
            if (i < compoundShapes .length)
            {
               const
                  compoundShape = compoundShapes [i],
                  point         = coord .get1Point (i, compoundShape .point);

               o .setValue (point .x, point .y, point .z);
               t .setOrigin (o);

               compoundShape .setLocalScaling (defaultScale);
               compoundShape .updateChildTransform (0, t);
            }
            else
            {
               const
                  compoundShape = new Ammo .btCompoundShape (),
                  sphereShape   = new Ammo .btSphereShape (0),
                  point         = coord .get1Point (i, new Vector3 ());

               compoundShape .point = point;

               o .setValue (point .x, point .y, point .z);
               t .setOrigin (o);

               compoundShape .addChildShape (t, sphereShape);
               compoundShapes .push (compoundShape);
            }
         }

         compoundShapes .length = length;
      };
   })(),
   process: (() =>
   {
      const
         pickingBBox   = new Box3 (),
         targetBBox    = new Box3 (),
         pickingCenter = new Vector3 (),
         targetCenter  = new Vector3 (),
         transform     = new Ammo .btTransform (),
         localScaling  = new Ammo .btVector3 (),
         translation   = new Vector3 (),
         rotation      = new Rotation4 (),
         scale         = new Vector3 (1),
         pickedPoint   = new Fields .MFVec3f ();

      return function ()
      {
         if (this .pickingGeometryNode)
         {
            const
               modelMatrices = this .getModelMatrices (),
               targets       = this .getTargets ();

            switch (this .getIntersectionType ())
            {
               case IntersectionType .BOUNDS:
               {
                  // Intersect bboxes.

                  for (const modelMatrix of modelMatrices)
                  {
                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     for (const target of targets)
                     {
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

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .assign (pickedGeometries .filter (node => node));

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  break;
               }
               case IntersectionType .GEOMETRY:
               {
                  // Intersect geometry.

                  const
                     picker         = this .picker,
                     compoundShapes = this .compoundShapes;

                  for (const modelMatrix of modelMatrices)
                  {
                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     modelMatrix .get (translation, rotation, scale);

                     picker .getTransform (translation, rotation, transform);
                     localScaling .setValue (scale .x, scale .y, scale .z);

                     for (const compoundShape of compoundShapes)
                     {
                        picker .setChildShape1Components (transform, localScaling, compoundShape);

                        for (const target of targets)
                        {
                           const targetShape = this .getPickShape (target .geometryNode);

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

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .assign (pickedGeometries .filter (node => node));

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  const pickedTargets = this .getPickedTargets ();

                  pickedPoint .length = 0;

                  for (const pickedTarget of pickedTargets)
                  {
                     for (const pp of pickedTarget .pickedPoint)
                        pickedPoint .push (pp);
                  }

                  if (!this ._pickedPoint .equals (pickedPoint))
                     this ._pickedPoint = pickedPoint;

                  break;
               }
            }
         }

         X3DPickSensorNode .prototype .process .call (this);
      };
   })(),
});

Object .defineProperties (PointPickSensor,
{
   ... X3DNode .getStaticProperties ("PointPickSensor", "Picking", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "objectType",       new Fields .MFString ("ALL")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "matchCriterion",   new Fields .SFString ("MATCH_ANY")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "intersectionType", new Fields .SFString ("BOUNDS")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "sortOrder",        new Fields .SFString ("CLOSEST")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickingGeometry",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickTarget",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedPoint",      new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedGeometry",   new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default PointPickSensor;
