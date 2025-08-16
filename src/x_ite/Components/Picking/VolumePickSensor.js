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
import Box3                 from "../../../standard/Math/Geometry/Box3.js";

function VolumePickSensor (executionContext)
{
   X3DPickSensorNode .call (this, executionContext);

   this .addType (X3DConstants .VolumePickSensor);

   // Private properties

   this .picker = new VolumePicker ();
}

Object .assign (Object .setPrototypeOf (VolumePickSensor .prototype, X3DPickSensorNode .prototype),
{
   initialize ()
   {
      X3DPickSensorNode .prototype .initialize .call (this);

      this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

      this .set_pickingGeometry__ ();
   },
   set_pickingGeometry__ ()
   {
      this .pickingGeometryNode = X3DCast (X3DConstants .X3DGeometryNode, this ._pickingGeometry);
   },
   process: (() =>
   {
      const
         pickingBBox   = new Box3 (),
         targetBBox    = new Box3 (),
         pickingCenter = new Vector3 (),
         targetCenter  = new Vector3 ();

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

                  const picker = this .picker;

                  for (const modelMatrix of modelMatrices)
                  {
                     const pickingShape = this .getPickShape (this .pickingGeometryNode);

                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     picker .setChildShape1 (modelMatrix, pickingShape .getCompoundShape ());

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
            }
         }

         X3DPickSensorNode .prototype .process .call (this);
      };
   })(),
});

Object .defineProperties (VolumePickSensor,
{
   ... X3DNode .getStaticProperties ("VolumePickSensor", "Picking", 3, "children", "3.2"),
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
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedGeometry",   new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default VolumePickSensor;
