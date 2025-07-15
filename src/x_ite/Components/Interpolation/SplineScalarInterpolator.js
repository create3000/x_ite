import Fields                        from "../../Fields.js";
import X3DFieldDefinition            from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray          from "../../Base/FieldDefinitionArray.js";
import X3DNode                       from "../Core/X3DNode.js";
import X3DInterpolatorNode           from "./X3DInterpolatorNode.js";
import CatmullRomSplineInterpolator1 from "../../Browser/Interpolation/CatmullRomSplineInterpolator1.js";
import X3DConstants                  from "../../Base/X3DConstants.js";

function SplineScalarInterpolator (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .SplineScalarInterpolator);

   this .spline = new CatmullRomSplineInterpolator1 ();
}

Object .assign (Object .setPrototypeOf (SplineScalarInterpolator .prototype, X3DInterpolatorNode .prototype),
{
   initialize ()
   {
      X3DInterpolatorNode .prototype .initialize .call (this);

      this ._keyValue          .addInterest ("set_keyValue__",          this);
      this ._keyVelocity       .addInterest ("set_keyVelocity__",       this);
      this ._normalizeVelocity .addInterest ("set_normalizeVelocity__", this);
   },
   set_keyValue__ ()
   {
      const
         key      = this ._key,
         keyValue = this ._keyValue;

      if (keyValue .length < key .length)
         keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new Fields .SFFloat ());

      this .set_keyVelocity__ ();
   },
   set_keyVelocity__ ()
   {
      if (this ._keyVelocity .length)
      {
         if (this ._keyVelocity .length < this ._key .length)
            this ._keyVelocity .resize (this ._key .length, new Fields .SFFloat ());
      }

      this .set_normalizeVelocity__ ();
   },
   set_normalizeVelocity__ ()
   {
      this .spline .generate (this ._closed .getValue (),
                              this ._key,
                              this ._keyValue,
                              this ._keyVelocity,
                              this ._normalizeVelocity .getValue ());

      // If there was already an set_fraction event in this frame, send a new value_changed to prevent glitches.
      if (this ._set_fraction .getModificationTime () >= this .getBrowser () .getCurrentTime ())
         this .set_fraction__ ();
   },
   interpolate (index0, index1, weight)
   {
      this ._value_changed = this .spline .interpolate (index0, index1, weight, this ._keyValue);
   },
});

Object .defineProperties (SplineScalarInterpolator,
{
   ... X3DNode .getStaticProperties ("SplineScalarInterpolator", "Interpolation", 4, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "closed",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",               new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",          new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyVelocity",       new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalizeVelocity", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed",     new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default SplineScalarInterpolator;
