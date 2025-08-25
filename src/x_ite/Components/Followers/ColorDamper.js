import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DDamperNode        from "./X3DDamperNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Color3               from "../../../standard/Math/Numbers/Color3.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

const
   a                  = new Vector3 (),
   initialValue       = new Vector3 (),
   initialDestination = new Vector3 (),
   vector             = new Vector3 ();

function ColorDamper (executionContext)
{
   X3DDamperNode .call (this, executionContext);

   this .addType (X3DConstants .ColorDamper);
}

Object .assign (Object .setPrototypeOf (ColorDamper .prototype, X3DDamperNode .prototype),
{
   getVector ()
   {
      return new Vector3 ();
   },
   getValue ()
   {
      return this ._set_value .getValue () .getHSV (vector);
   },
   getDestination ()
   {
      return this ._set_destination .getValue () .getHSV (vector);
   },
   getInitialValue ()
   {
      return this ._initialValue .getValue () .getHSV (initialValue);
   },
   getInitialDestination ()
   {
      return this ._initialDestination .getValue () .getHSV (initialDestination);
   },
   setValue (value)
   {
      this ._value_changed .setHSV (value .x, value .y, value .z);
   },
   equals (lhs, rhs, tolerance)
   {
      return a .assign (lhs) .subtract (rhs) .norm () < tolerance;
   },
   interpolate (source, destination, weight)
   {
      return Color3 .lerp (source, destination, weight, vector);
   },
});

Object .defineProperties (ColorDamper,
{
   ... X3DNode .getStaticProperties ("ColorDamper", "Followers", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .SFColor (0.8, 0.8, 0.8)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .SFColor (0.8, 0.8, 0.8)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "order",              new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tau",                new Fields .SFTime (0.3)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tolerance",          new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .SFColor ()),
      ]),
      enumerable: true,
   },
});

export default ColorDamper;
