import Fields                     from "../../Fields.js";
import X3DFieldDefinition         from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray       from "../../Base/FieldDefinitionArray.js";
import X3DNode                    from "../Core/X3DNode.js";
import X3DEnvironmentalSensorNode from "./X3DEnvironmentalSensorNode.js";
import X3DConstants               from "../../Base/X3DConstants.js";
import Vector3                    from "../../../standard/Math/Numbers/Vector3.js";
import Box3                       from "../../../standard/Math/Geometry/Box3.js";

function VisibilitySensor (executionContext)
{
   X3DEnvironmentalSensorNode .call (this, executionContext);

   this .addType (X3DConstants .VisibilitySensor);

   this .setZeroTest (false);

   this .visible = false;
}

Object .assign (Object .setPrototypeOf (VisibilitySensor .prototype, X3DEnvironmentalSensorNode .prototype),
{
   initialize ()
   {
      X3DEnvironmentalSensorNode .prototype .initialize .call (this);

      this ._enabled .addFieldInterest (this ._isVisibleObject);

      this .setVisibleObject (this ._enabled .getValue ());
   },
   update ()
   {
      if (this .visible && this .getTraversed ())
      {
         if (!this ._isActive .getValue ())
         {
            this ._isActive  = true;
            this ._enterTime = this .getBrowser () .getCurrentTime ();
         }

         this .visible = false;
      }
      else
      {
         if (this ._isActive .getValue ())
         {
            this ._isActive = false;
            this ._exitTime = this .getBrowser () .getCurrentTime ();
         }
      }

      this .setTraversed (false);
   },
   traverse: (() =>
   {
      const
         bbox     = new Box3 (),
         infinity = new Vector3 (-1);

      return function (type, renderObject)
      {
         this .setTraversed (true);

         if (this .visible)
            return;

         if (this ._size .getValue () .equals (infinity))
         {
            this .visible = true;
         }
         else
         {
            bbox
               .set (this ._size .getValue (), this ._center .getValue ())
               .multRight (renderObject .getModelViewMatrix () .get ());

            this .visible = renderObject .getViewVolume () .intersectsBox (bbox);
         }
      };
   })(),
});

Object .defineProperties (VisibilitySensor,
{
   ... X3DNode .getStaticProperties ("VisibilitySensor", "EnvironmentalSensor", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "size",        new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "center",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "enterTime",   new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "exitTime",    new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",    new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default VisibilitySensor;
