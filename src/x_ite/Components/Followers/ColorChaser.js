import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChaserNode        from "./X3DChaserNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Color3               from "../../../standard/Math/Numbers/Color3.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

const
   initialValue       = new Vector3 (),
   initialDestination = new Vector3 (),
   deltaOut           = new Vector3 (),
   vector             = new Vector3 ();

function ColorChaser (executionContext)
{
   X3DChaserNode .call (this, executionContext);

   this .addType (X3DConstants .ColorChaser);
}

Object .assign (Object .setPrototypeOf (ColorChaser .prototype, X3DChaserNode .prototype),
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
   interpolate (source, destination, weight)
   {
      return Color3 .lerp (source, destination, weight, vector);
   },
   step (value1, value2, t)
   {
      deltaOut .assign (this .output) .add (value1) .subtract (value2);

      //step .x = Algorithm .interval (step .x, 0, 2 * Math .PI);

      Color3 .lerp (this .output, deltaOut, t, this .output);
   },
});

Object .defineProperties (ColorChaser,
{
   ... X3DNode .getStaticProperties ("ColorChaser", "Followers", 1, "children", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .SFColor (0.8, 0.8, 0.8)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .SFColor (0.8, 0.8, 0.8)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "duration",           new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .SFColor ()),
      ]),
      enumerable: true,
   },
});

export default ColorChaser;
