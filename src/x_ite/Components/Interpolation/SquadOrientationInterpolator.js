import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInterpolatorNode  from "./X3DInterpolatorNode.js";
import SquadInterpolator    from "../../Browser/Interpolation/SquadInterpolator.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function SquadOrientationInterpolator (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .SquadOrientationInterpolator);

   // Units

   this ._keyValue      .setUnit ("angle");
   this ._value_changed .setUnit ("angle");

   // Private properties

   this .squad = new SquadInterpolator ();
}

Object .assign (Object .setPrototypeOf (SquadOrientationInterpolator .prototype, X3DInterpolatorNode .prototype),
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

      this .squad .generate (this ._closed .getValue (),
                             this ._key,
                             this ._keyValue);

      // If there was already an set_fraction event in this frame, send a new value_changed to prevent glitches.
      if (this ._set_fraction .getModificationTime () >= this .getBrowser () .getCurrentTime ())
         this .set_fraction__ ();
   },
   interpolate (index0, index1, weight)
   {
      this ._value_changed = this .squad .interpolate (index0, index1, weight, this ._keyValue);
   },
});

Object .defineProperties (SquadOrientationInterpolator,
{
   ... X3DNode .getStaticProperties ("SquadOrientationInterpolator", "Interpolation", 5, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "closed",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",               new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",          new Fields .MFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalizeVelocity", new Fields .SFBool ()), // not supported
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed",     new Fields .SFRotation ()),
      ]),
      enumerable: true,
   },
});

export default SquadOrientationInterpolator;
