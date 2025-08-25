import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DDamperNode        from "./X3DDamperNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";

const
   a        = new Rotation4 (),
   rotation = new Rotation4 ();

function OrientationDamper (executionContext)
{
   X3DDamperNode .call (this, executionContext);

   this .addType (X3DConstants .OrientationDamper);

   // Units

   this ._set_value          .setUnit ("angle");
   this ._set_destination    .setUnit ("angle");
   this ._initialValue       .setUnit ("angle");
   this ._initialDestination .setUnit ("angle");
   this ._value_changed      .setUnit ("angle");
}

Object .assign (Object .setPrototypeOf (OrientationDamper .prototype, X3DDamperNode .prototype),
{
   getVector ()
   {
      return new Rotation4 ();
   },
   equals (lhs, rhs, tolerance)
   {
      a .assign (lhs) .inverse () .multRight (rhs);

      return Math .abs (a .angle) < tolerance;
   },
   interpolate (source, destination, weight)
   {
      return rotation .assign (source) .slerp (destination, weight);
   },
});

Object .defineProperties (OrientationDamper,
{
   ... X3DNode .getStaticProperties ("OrientationDamper", "Followers", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .SFRotation (0, 1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .SFRotation (0, 1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "order",              new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tau",                new Fields .SFTime (0.3)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tolerance",          new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .SFRotation ()),
      ]),
      enumerable: true,
   },
});

export default OrientationDamper;
