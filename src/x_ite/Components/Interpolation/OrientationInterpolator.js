import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInterpolatorNode  from "./X3DInterpolatorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";

function OrientationInterpolator (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .OrientationInterpolator);

   // Units

   this ._keyValue      .setUnit ("angle");
   this ._value_changed .setUnit ("angle");
}

Object .assign (Object .setPrototypeOf (OrientationInterpolator .prototype, X3DInterpolatorNode .prototype),
{
   initialize ()
   {
      X3DInterpolatorNode .prototype .initialize .call (this);

      this ._keyValue .addInterest ("set_keyValue__", this);
   },
   set_keyValue__ ()
   {
      const
         key      = this ._key,
         keyValue = this ._keyValue;

      if (keyValue .length < key .length)
         keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new Fields .SFRotation ());

      // If there was already an set_fraction event in this frame, send a new value_changed to prevent glitches.
      if (this ._set_fraction .getModificationTime () >= this .getBrowser () .getCurrentTime ())
         this .set_fraction__ ();
   },
   interpolate: (() =>
   {
      const
         keyValue0 = new Rotation4 (),
         keyValue1 = new Rotation4 ();

      return function (index0, index1, weight)
      {
         // Both values can change in slerp.
         keyValue0 .assign (this ._keyValue [index0] .getValue ());
         keyValue1 .assign (this ._keyValue [index1] .getValue ());

         this ._value_changed = keyValue0 .slerp (keyValue1, weight);
      };
   })(),
});

Object .defineProperties (OrientationInterpolator,
{
   ... X3DNode .getStaticProperties ("OrientationInterpolator", "Interpolation", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFRotation ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFRotation ()),
      ]),
      enumerable: true,
   },
});

export default OrientationInterpolator;
