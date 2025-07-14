import Fields                        from "../../Fields.js";
import X3DFieldDefinition            from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray          from "../../Base/FieldDefinitionArray.js";
import X3DNode                       from "../Core/X3DNode.js";
import X3DInterpolatorNode           from "./X3DInterpolatorNode.js";
import CatmullRomSplineInterpolator2 from "../../Browser/Interpolation/CatmullRomSplineInterpolator2.js";
import X3DConstants                  from "../../Base/X3DConstants.js";

function SplinePositionInterpolator2D (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .SplinePositionInterpolator2D);

   this .spline = new CatmullRomSplineInterpolator2 ();
}

Object .assign (Object .setPrototypeOf (SplinePositionInterpolator2D .prototype, X3DInterpolatorNode .prototype),
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
         keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new Fields .SFVec2f ());

      this .set_keyVelocity__ ();
   },
   set_keyVelocity__ ()
   {
      if (this ._keyVelocity .length)
      {
         if (this ._keyVelocity .length < this ._key .length)
            this ._keyVelocity .resize (this ._key .length, new Fields .SFVec2f ());
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

      if (this ._set_fraction .getModificationTime () >= this .getBrowser () .getCurrentTime ())
         this .set_fraction__ ();
   },
   interpolate (index0, index1, weight)
   {
      this ._value_changed = this .spline .interpolate (index0, index1, weight, this ._keyValue);
   },
});

Object .defineProperties (SplinePositionInterpolator2D,
{
   ... X3DNode .getStaticProperties ("SplinePositionInterpolator2D", "Interpolation", 4, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "closed",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",               new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",          new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyVelocity",       new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalizeVelocity", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed",     new Fields .SFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default SplinePositionInterpolator2D;
